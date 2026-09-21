const {appendFileSync} = require('node:fs');
const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const {INPUT_START_TIME: startTime, INPUT_END_TIME: endTime, INPUT_TIMEZONE: timezone, INPUT_AUTHORS: authors, GITHUB_OUTPUT, GITHUB_SHA} = process.env;
process.env.TZ = timezone;

function asUtc(value) {
  const date = new Date(`${value.replace(' ', 'T')}:00`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date or timezone: ${value} (${timezone})`);
  return date.toISOString();
}

const args = ['log', `--since=${asUtc(startTime)}`, `--until=${asUtc(endTime)}`];
if (authors) args.push(`--author=${authors.split(',').map((author) => author.trim()).filter(Boolean).join('\\|')}`);
args.push('--format=- %s (%h) [author: %an]', GITHUB_SHA);
const result = spawnSync('git', args, {encoding: 'utf8'});
if (result.status !== 0) throw new Error(result.stderr || 'Unable to collect Git commits.');
const commits = result.stdout.trim();
appendFileSync(GITHUB_OUTPUT, `commits<<EOF\n${commits}\nEOF\nhas-content=${commits ? 'true' : 'false'}\n`);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
