require('../_shared/retry-fetch').installFetchRetry();
const fs = require('node:fs');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

async function main() {
  const p = process.env;
  if (!/^[^/]+\/[^/]+$/.test(p.INPUT_REPOSITORY || '')) throw new Error(`Invalid repository: ${p.INPUT_REPOSITORY}`);
  const [owner] = p.INPUT_REPOSITORY.split('/');
  const apiBase = `${p.INPUT_API_URL.replace(/\/+$/, '')}/repos/${p.INPUT_REPOSITORY}`;
  async function request(url, options = {}) {
    const response = await fetch(`${apiBase}${url}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${p.INPUT_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.body ? {'Content-Type': 'application/json'} : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; }
    catch { data = {message: text}; }
    return {status: response.status, ok: response.ok, data};
  }

  const query = new URLSearchParams({
    state: 'open',
    head: `${owner}:${p.INPUT_SOURCE_BRANCH}`,
    base: p.INPUT_TARGET_BRANCH,
    per_page: '1',
  });
  const listed = await request(`/pulls?${query}`);
  if (!listed.ok) throw new Error(`Could not search pull requests (${listed.status}): ${JSON.stringify(listed.data)}`);
  let pullRequest = listed.data[0];
  if (!pullRequest) {
    const created = await request('/pulls', {
      method: 'POST',
      body: {
        title: p.INPUT_TITLE,
        body: p.INPUT_BODY,
        head: p.INPUT_SOURCE_BRANCH,
        base: p.INPUT_TARGET_BRANCH,
      },
    });
    if (!created.ok) throw new Error(`Could not create pull request (${created.status}): ${JSON.stringify(created.data)}`);
    pullRequest = created.data;
  }
  console.log(`Pull request: ${pullRequest.html_url}`);
  fs.appendFileSync(p.GITHUB_OUTPUT, `pull-request-url=${pullRequest.html_url}\n`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
