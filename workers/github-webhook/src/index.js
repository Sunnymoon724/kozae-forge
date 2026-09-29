const encoder = new TextEncoder();

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    if (!(await verifySignature(body, signature, env.WEBHOOK_SECRET))) {
      return json({ error: 'Invalid webhook signature' }, 401);
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      return json({ error: 'Invalid JSON payload' }, 400);
    }

    const event = request.headers.get('x-github-event');
    if (event === 'ping') {
      return json({ ok: true, message: 'pong' });
    }

    if (event !== 'issue_comment') {
      return json({ ok: true, ignored: 'unsupported event' });
    }

    const repository = payload.repository?.full_name;
    if (!repository || !getAllowedRepositories(env).has(repository)) {
      return json({ ok: true, ignored: 'repository is not allowed' });
    }

    if (payload.issue?.pull_request) {
      return json({ ok: true, ignored: 'pull request comment' });
    }

    const issueNumber = payload.issue?.number;
    if (!issueNumber) {
      return json({ ok: true, ignored: 'issue number is missing' });
    }

    const workflow = getWorkflow(repository, env);
    const installationToken = await createInstallationToken(repository, env);
    await dispatchWorkflow(repository, workflow, installationToken, {
      'source-issue-number': String(issueNumber),
    });

    return json({
      ok: true,
      dispatched: true,
      repository,
      workflow,
      issueNumber,
    });
  },
};

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function getAllowedRepositories(env) {
  return new Set(
    (env.ALLOWED_REPOSITORIES || '')
      .split(',')
      .map((repository) => repository.trim())
      .filter(Boolean),
  );
}

function getWorkflow(repository, env) {
  let workflowMap = {};
  if (env.WORKFLOW_MAP) {
    try {
      workflowMap = JSON.parse(env.WORKFLOW_MAP);
    } catch {
      throw new Error('WORKFLOW_MAP must be valid JSON.');
    }
  }

  return workflowMap[repository] || env.DEFAULT_WORKFLOW || 'mirror-issues.yml';
}

async function verifySignature(body, header, secret) {
  if (!header || !secret) {
    return false;
  }

  const expected = await hmacSha256(body, secret);
  const actual = header.startsWith('sha256=') ? header.slice(7) : '';
  return constantTimeEqual(actual, expected);
}

async function hmacSha256(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return toHex(signature);
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
}

async function createInstallationToken(repository, env) {
  const appToken = await createAppToken(env);
  const installationResponse = await githubFetch(
    `/repos/${repository}/installation`,
    appToken,
  );
  const installation = await readGithubJson(installationResponse);

  const tokenResponse = await fetch(
    `https://api.github.com/app/installations/${installation.id}/access_tokens`,
    {
      method: 'POST',
      headers: githubHeaders(appToken),
    },
  );
  const token = await readGithubJson(tokenResponse);
  return token.token;
}

async function createAppToken(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = encodeBase64Url(JSON.stringify({
    iat: now - 60,
    exp: now + 9 * 60,
    iss: env.GITHUB_APP_ID,
  }));
  const data = `${header}.${claims}`;
  const key = await importPrivateKey(env.GITHUB_APP_PRIVATE_KEY);
  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    encoder.encode(data),
  );
  return `${data}.${encodeBase64UrlBytes(signature)}`;
}

async function importPrivateKey(privateKey) {
  const normalized = privateKey
    .replace(/\\n/g, '\n')
    .replace(/\r/g, '')
    .trim();
  const isPkcs1 = normalized.includes('BEGIN RSA PRIVATE KEY');
  const base64 = normalized
    .replace(/-----BEGIN (RSA )?PRIVATE KEY-----/g, '')
    .replace(/-----END (RSA )?PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');

  const privateKeyDer = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
  const binary = isPkcs1 ? wrapPkcs1AsPkcs8(privateKeyDer) : privateKeyDer;
  return crypto.subtle.importKey(
    'pkcs8',
    binary,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

function wrapPkcs1AsPkcs8(pkcs1) {
  const algorithm = new Uint8Array([
    0x30, 0x0d,
    0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01,
    0x05, 0x00,
  ]);
  const version = new Uint8Array([0x02, 0x01, 0x00]);
  const privateKey = new Uint8Array([0x04, ...derLength(pkcs1.length), ...pkcs1]);
  const body = new Uint8Array([...version, ...algorithm, ...privateKey]);
  return new Uint8Array([0x30, ...derLength(body.length), ...body]);
}

function derLength(length) {
  if (length < 0x80) {
    return [length];
  }

  const bytes = [];
  let remaining = length;
  while (remaining > 0) {
    bytes.unshift(remaining & 0xff);
    remaining >>= 8;
  }
  return [0x80 | bytes.length, ...bytes];
}

async function dispatchWorkflow(repository, workflow, token, inputs) {
  const response = await fetch(
    `https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(workflow)}/dispatches`,
    {
      method: 'POST',
      headers: githubHeaders(token),
      body: JSON.stringify({ ref: 'main', inputs }),
    },
  );
  await readGithubJson(response);
}

async function githubFetch(path, token) {
  return fetch(`https://api.github.com${path}`, {
    headers: githubHeaders(token),
  });
}

function githubHeaders(token) {
  return {
    accept: 'application/vnd.github+json',
    authorization: `Bearer ${token}`,
    'x-github-api-version': '2022-11-28',
    'user-agent': 'kozae-forge-github-webhook',
  };
}

async function readGithubJson(response) {
  if (response.status === 204) {
    return null;
  }

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}): ${body}`);
  }

  return body ? JSON.parse(body) : null;
}

function encodeBase64Url(value) {
  return encodeBase64UrlBytes(encoder.encode(value));
}

function encodeBase64UrlBytes(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}
