const {appendFileSync} = require('node:fs');
const {spawnSync} = require('node:child_process');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const {
  GITHUB_OUTPUT,
  GITHUB_REPOSITORY,
  GITHUB_SHA,
  INPUT_AFTER_SHA: inputAfter,
  INPUT_BEFORE_SHA: inputBefore,
  INPUT_MAX_DIFF_BYTES: maxDiffBytesInput,
  INPUT_REPOSITORY: inputRepository,
} = process.env;

const after = inputAfter || GITHUB_SHA;
if (!after) throw new Error('after-sha input or GITHUB_SHA must be set.');

const maxDiffBytes = Number(maxDiffBytesInput);
if (!Number.isSafeInteger(maxDiffBytes) || maxDiffBytes < 1) throw new Error('max-diff-bytes must be a positive integer.');

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

const diffArgs = base
  ? ['diff', '--no-ext-diff', '--unified=20', base, after]
  : ['diff', '--no-ext-diff', '--root', '--unified=20', after];
let diff = runGit(diffArgs).stdout;
const originalBytes = Buffer.byteLength(diff, 'utf8');
const truncated = originalBytes > maxDiffBytes;
if (truncated) {
  diff = Buffer.from(diff, 'utf8').subarray(0, maxDiffBytes).toString('utf8')
    + `\n\n[Diff truncated because it exceeded ${maxDiffBytes.toLocaleString()} bytes. Do not infer facts from omitted content.]`;
}

const repository = inputRepository || GITHUB_REPOSITORY;
const sourceUrl = repository
  ? base
    ? `https://github.com/${repository}/compare/${base}...${after}`
    : `https://github.com/${repository}/commit/${after}`
  : '';
const range = base ? `${base}..${after}` : after;
const content = [
  `Commit range: ${range}`,
  sourceUrl ? `Source diff: ${sourceUrl}` : '',
  `Original diff bytes: ${originalBytes}`,
  `Truncated: ${truncated}`,
  '',
  diff,
].filter((line, index) => line || index > 1).join('\n');

appendFileSync(GITHUB_OUTPUT, [
  `base-sha=${base}`,
  `head-sha=${after}`,
  `has-diff=${diff.trim() ? 'true' : 'false'}`,
  `source-url=${sourceUrl}`,
  `truncated=${truncated}`,
  'diff<<EOF',
  content,
  'EOF',
  '',
].join('\n'));
