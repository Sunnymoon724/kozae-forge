const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

function git(args) {
  const result = spawnSync('git', args, {stdio: 'inherit'});
  if (result.status !== 0) process.exit(result.status || 1);
}

async function main() {
  const p = process.env;
  git(['add', '-A']);
  const changed = spawnSync('git', ['diff', '--cached', '--quiet']);
  if (changed.status === 0) return;
  if (changed.status !== 1) process.exit(changed.status || 1);
  git(['config', 'user.name', 'forge-bot']);
  git(['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
  git(['checkout', '-B', p.INPUT_BRANCH]);
  git(['commit', '-m', p.INPUT_COMMIT_MESSAGE]);
  git(['push', '--force', 'origin', p.INPUT_BRANCH]);

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
  if (!p.INPUT_LABELS) return;

  const labelsResponse = await fetch(`https://api.github.com/repos/${repository}/issues/${pullRequest.number}/labels`, {method: 'POST', headers, body: JSON.stringify({labels: p.INPUT_LABELS.split(',').map((label) => label.trim()).filter(Boolean)})});
  if (!labelsResponse.ok) throw new Error(await labelsResponse.text());
}

main().catch((error) => { console.error(error); process.exit(1); });
