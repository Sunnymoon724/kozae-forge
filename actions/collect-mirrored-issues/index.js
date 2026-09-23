for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

const {appendFileSync} = require('node:fs');
const p = process.env;
const headers = {Authorization: `Bearer ${p.INPUT_TOKEN}`, Accept: 'application/vnd.github+json'};
const markerPattern = /<!--\s*kozae-forge-mirror:source-issue=(\d+)\s*-->/;

async function main() {
  const issues = [];
  let url = `https://api.github.com/repos/${p.INPUT_DESTINATION_REPOSITORY}/issues?state=all&per_page=100`;
  while (url) {
    const response = await fetch(url, {headers});
    if (!response.ok) throw new Error(await response.text());
    for (const issue of await response.json()) {
      if (issue.pull_request) continue;
      const match = (issue.body || '').match(markerPattern);
      if (match) issues.push({sourceIssueNumber: Number(match[1]), destinationIssueNumber: issue.number});
    }
    url = response.headers.get('link')?.match(/<([^>]+)>; rel="next"/)?.[1];
  }
  appendFileSync(p.GITHUB_OUTPUT, `issues<<EOF\n${JSON.stringify(issues)}\nEOF\n`);
}

main().catch((error) => { console.error(error); process.exit(1); });
