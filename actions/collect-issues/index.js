require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const {appendFileSync} = require('node:fs');
const p = process.env;
const headers = {Authorization: `Bearer ${p.INPUT_TOKEN}`, Accept: 'application/vnd.github+json'};

async function getIssues() {
  if (p.INPUT_ISSUE_NUMBER) {
    const response = await fetch(`https://api.github.com/repos/${p.INPUT_SOURCE_REPOSITORY}/issues/${p.INPUT_ISSUE_NUMBER}`, {headers});
    if (!response.ok) throw new Error(await response.text());
    return [await response.json()];
  }

  const issues = [];
  let url = `https://api.github.com/repos/${p.INPUT_SOURCE_REPOSITORY}/issues?state=all&per_page=100`;
  while (url) {
    const response = await fetch(url, {headers});
    if (!response.ok) throw new Error(await response.text());
    issues.push(...await response.json());
    url = response.headers.get('link')?.match(/<([^>]+)>; rel="next"/)?.[1];
  }
  return issues;
}

async function main() {
  const includeUnlabeled = p.INPUT_INCLUDE_UNLABELED === 'true';
  const selected = (await getIssues())
    .filter((issue) => p.INPUT_ISSUE_NUMBER || !issue.pull_request)
    .map((issue) => ({
      ...issue,
      shouldMirror: issue.labels.some((label) => label.name === p.INPUT_MIRROR_LABEL),
    }))
    .filter((issue) => p.INPUT_ISSUE_NUMBER || includeUnlabeled || issue.shouldMirror);
  const output = p.INPUT_OUTPUT_MODE === 'numbers' ? selected.map(({number}) => ({number})) : selected;
  const issue = p.INPUT_ISSUE_NUMBER ? selected[0] || null : null;
  appendFileSync(p.GITHUB_OUTPUT, `issues<<EOF\n${JSON.stringify(output)}\nEOF\nissue=${JSON.stringify(issue)}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
