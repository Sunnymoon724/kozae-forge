const {appendFileSync} = require('node:fs');
const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const {
  GITHUB_OUTPUT,
  GITHUB_REPOSITORY,
  GITHUB_SHA,
  INPUT_AFTER_SHA: inputAfter,
  INPUT_BEFORE_SHA: inputBefore,
} = process.env;

const after = inputAfter || GITHUB_SHA;
if (!after) throw new Error('after-sha input or GITHUB_SHA must be set.');

function runGit(args, allowFailure = false) {
  const result = spawnSync('git', args, {encoding: 'utf8'});
  if (result.status !== 0 && !allowFailure) throw new Error(result.stderr || `git ${args.join(' ')} failed.`);
  return result;
}

const isEmptySha = !inputBefore || /^0+$/.test(inputBefore);
let base = isEmptySha ? '' : inputBefore;
if (!base) {
  const parent = runGit(['rev-parse', '--verify', `${after}^`], true);
  if (parent.status === 0) base = parent.stdout.trim();
}

const format = 'commit %H%nAuthor: %an%nSubject: %s%nBody: %b%n---';
const logArgs = base ? ['log', `--format=${format}`, `${base}..${after}`] : ['log', `--format=${format}`, after];
const commits = runGit(logArgs).stdout.trim();
const repository = GITHUB_REPOSITORY;
const sourceUrl = repository
  ? base
    ? `https://github.com/${repository}/compare/${base}...${after}`
    : `https://github.com/${repository}/commit/${after}`
  : '';
const range = base ? `${base}..${after}` : after;
const content = [
  `Commit range: ${range}`,
  sourceUrl ? `Source comparison: ${sourceUrl}` : '',
  '',
  commits,
].filter((line, index) => line || index > 0).join('\n');

appendFileSync(GITHUB_OUTPUT, [
  `base-sha=${base}`,
  `head-sha=${after}`,
  `has-commits=${commits ? 'true' : 'false'}`,
  `source-url=${sourceUrl}`,
  'commits<<EOF',
  content,
  'EOF',
  '',
].join('\n'));
