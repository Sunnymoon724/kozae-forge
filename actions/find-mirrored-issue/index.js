for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const fs = require('node:fs');
const p = process.env;
const marker = `<!-- kozae-forge-mirror:source-issue=${p.INPUT_SOURCE_ISSUE_NUMBER} -->`;

async function main() {
  for (let page = 1; ; page += 1) {
    const response = await fetch(`https://api.github.com/repos/${p.INPUT_DESTINATION_REPOSITORY}/issues?state=all&per_page=100&page=${page}`, {headers: {Authorization: `Bearer ${p.INPUT_TOKEN}`, Accept: 'application/vnd.github+json'}});
    if (!response.ok) throw new Error(await response.text());
    const issues = await response.json();
    const issue = issues.find((item) => !item.pull_request && (item.body || '').includes(marker));
    if (issue || issues.length < 100) {
      fs.appendFileSync(p.GITHUB_OUTPUT, `issue-number=${issue?.number || ''}\n`);
      return;
    }
  }
}

main().catch((error) => { console.error(error); process.exit(1); });
