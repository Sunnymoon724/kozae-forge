require('../_shared/retry-fetch').installFetchRetry();
const fs = require('node:fs');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

async function main() {
  const p = process.env;
  if (!/^[^/]+\/[^/]+$/.test(p.INPUT_REPOSITORY || '')) throw new Error(`Invalid repository: ${p.INPUT_REPOSITORY}`);
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

  const ref = p.INPUT_SOURCE_BRANCH.split('/').map(encodeURIComponent).join('/');
  const source = await request(`/git/ref/heads/${ref}`);
  if (!source.ok) throw new Error(`Could not read source branch (${source.status}): ${JSON.stringify(source.data)}`);
  const sourceSha = source.data.object.sha;
  if (p.INPUT_SOURCE_SHA && sourceSha !== p.INPUT_SOURCE_SHA) {
    console.log(`Source branch advanced to ${sourceSha}; skipping this stale run.`);
    fs.appendFileSync(p.GITHUB_OUTPUT, 'outcome=stale\n');
    return;
  }

  const merged = await request('/merges', {
    method: 'POST',
    body: {
      base: p.INPUT_TARGET_BRANCH,
      head: sourceSha,
      commit_message: `Merge ${p.INPUT_SOURCE_BRANCH} into ${p.INPUT_TARGET_BRANCH}`,
    },
  });
  if (merged.status === 201 || merged.status === 204) {
    console.log(merged.status === 204
      ? `The source branch is already included in ${p.INPUT_TARGET_BRANCH}.`
      : `Merged ${p.INPUT_SOURCE_BRANCH} into ${p.INPUT_TARGET_BRANCH} at ${merged.data.sha}.`);
    fs.appendFileSync(p.GITHUB_OUTPUT, 'outcome=merged\n');
    return;
  }
  if (merged.status !== 409) {
    throw new Error(`Could not merge branch (${merged.status}): ${JSON.stringify(merged.data)}. Check token permissions and target branch rules.`);
  }
  console.log('GitHub reports a merge conflict.');
  fs.appendFileSync(p.GITHUB_OUTPUT, 'outcome=conflict\n');
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
