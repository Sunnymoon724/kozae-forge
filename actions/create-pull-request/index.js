require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

async function main() {
  const p = process.env;
  const headers = {Authorization: `Bearer ${p.INPUT_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json'};
  const repository = p.GITHUB_REPOSITORY;
  const repositoryResponse = await fetch(`https://api.github.com/repos/${repository}`, {headers});
  if (!repositoryResponse.ok) throw new Error(await repositoryResponse.text());
  const {default_branch: base} = await repositoryResponse.json();
  const pullResponse = await fetch(`https://api.github.com/repos/${repository}/pulls`, {method: 'POST', headers, body: JSON.stringify({title: p.INPUT_TITLE, body: p.INPUT_BODY, head: p.INPUT_BRANCH, base})});
  let pullRequest;
  if (pullResponse.ok) pullRequest = await pullResponse.json();
  else if (pullResponse.status === 422) {
    const owner = repository.split('/')[0];
    const existingResponse = await fetch(`https://api.github.com/repos/${repository}/pulls?state=open&head=${encodeURIComponent(`${owner}:${p.INPUT_BRANCH}`)}&base=${encodeURIComponent(base)}`, {headers});
    if (!existingResponse.ok) throw new Error(await existingResponse.text());
    [pullRequest] = await existingResponse.json();
    if (!pullRequest) throw new Error(await pullResponse.text());
  } else throw new Error(await pullResponse.text());
  require('node:fs').appendFileSync(p.GITHUB_OUTPUT, `pull-request-number=${pullRequest.number}\npull-request-url=${pullRequest.html_url}\n`);
}

main().catch((error) => { console.error(error); process.exit(1); });
