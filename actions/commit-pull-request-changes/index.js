const fs = require('node:fs');
const {spawnSync} = require('node:child_process');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

function git(args) {
  const result = spawnSync('git', args, {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`git ${args[0]} failed (${result.status}).`);
}

const branch = process.env.INPUT_BRANCH;
git(['check-ref-format', '--branch', branch]);
const paths = (process.env.INPUT_PATHS || '.').split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
git(['add', '-A', '--', ...paths]);
const changed = spawnSync('git', ['diff', '--cached', '--quiet']);
if (changed.error) throw changed.error;
if (changed.status === 0) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changed=false\n');
} else if (changed.status === 1) {
  git(['config', 'user.name', 'forge-bot']);
  git(['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
  git(['checkout', '-B', branch]);
  git(['commit', '-m', process.env.INPUT_MESSAGE]);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'changed=true\n');
} else throw new Error(`git diff failed (${changed.status}).`);
