const fs = require('node:fs');
const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

function git(args, message) {
  const result = spawnSync('git', args, {encoding: 'utf8'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || message);
  return result.stdout.trim();
}

function main() {
  const p = process.env;
  process.env.TZ = p.INPUT_TIMEZONE;
  fs.mkdirSync('.commit-data', {recursive: true});
  const authors = (p.INPUT_AUTHORS || '').trim();
  const dates = JSON.parse(p.INPUT_DATES);
  if (!Array.isArray(dates)) throw new Error('dates must be a JSON array.');
  console.log(`Collection timezone: ${p.INPUT_TIMEZONE}`);
  console.log(`Collection authors: ${authors || '(all authors)'}`);
  console.log(`Collection dates: ${dates.join(', ')}`);
  const head = git(['rev-parse', 'HEAD'], 'Unable to find the checked out commit.');
  for (const date of dates) {
    const start = new Date(`${date}T00:00:00`);
    if (Number.isNaN(start.getTime())) throw new Error(`Invalid date: ${date}`);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const args = ['log', `--since=${start.toISOString()}`, `--until=${end.toISOString()}`];
    if (p.INPUT_EXCLUDE_MERGE_COMMITS === 'true') args.push('--no-merges');
    if (authors) args.push(`--author=${authors.split(',').map((author) => author.trim()).filter(Boolean).join('\\|')}`);
    args.push('--format=- %s (%h) [author: %an]', head);
    const commits = git(args, `Unable to collect commits for ${date}.`);
    if (commits) {
      const outputPath = `.commit-data/${date}.txt`;
      fs.writeFileSync(outputPath, commits);
      console.log(`${date}: commits found (${commits.split('\n').length}), output=${outputPath}, bytes=${Buffer.byteLength(commits)}`);
    } else {
      console.log(`${date}: no commits, git log output bytes=0`);
    }
  }
  const files = fs.readdirSync('.commit-data');
  const hasContent = files.length > 0;
  console.log(`Collected files: ${files.join(', ') || '(none)'}`);
  console.log(`Collected content found: ${hasContent}`);
  fs.appendFileSync(p.GITHUB_OUTPUT, `has-content=${hasContent}\n`);
  if (!hasContent) fs.writeFileSync('.commit-data/no-commits.txt', '');
}

if (require.main === module) main();
