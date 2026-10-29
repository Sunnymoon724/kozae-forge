require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
async function main() {
  const labels = process.env.INPUT_LABELS.split(',').map((label) => label.trim()).filter(Boolean);
  if (!labels.length) return;
  const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues/${process.env.INPUT_PULL_REQUEST_NUMBER}/labels`, {
    method: 'POST',
    headers: {Authorization: `Bearer ${process.env.INPUT_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json'},
    body: JSON.stringify({labels}),
  });
  if (!response.ok) throw new Error(await response.text());
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
