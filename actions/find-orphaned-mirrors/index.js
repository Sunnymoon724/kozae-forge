const fs = require('node:fs');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

function findOrphans(sourceIssues, mirroredIssues) {
  const sourceNumbers = new Set(sourceIssues.map((issue) => String(issue.number)));
  return mirroredIssues.filter((mirror) => !sourceNumbers.has(String(mirror.sourceIssueNumber)));
}

function main() {
  const orphans = findOrphans(JSON.parse(process.env.INPUT_SOURCE_ISSUES), JSON.parse(process.env.INPUT_MIRRORED_ISSUES));
  const titles = orphans.map((mirror) => ({title: mirror.title}));
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `mirrors=${JSON.stringify(orphans)}\ntitles=${JSON.stringify(titles)}\n`);
  console.log(`Found ${orphans.length} mirrored issue(s) whose source was deleted.`);
}

if (require.main === module) main();
module.exports = {findOrphans};
