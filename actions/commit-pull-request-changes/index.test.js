const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

function git(cwd, ...args) {
  const result = spawnSync('git', args, {cwd, encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

test('commits selected paths and safely updates an existing review branch', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    const remote = path.join(root, 'remote.git');
    const work = path.join(root, 'work');
    const output = path.join(root, 'output');
    git(root, 'init', '--bare', remote);
    git(root, 'init', work);
    git(work, 'config', 'user.name', 'test');
    git(work, 'config', 'user.email', 'test@example.com');
    fs.writeFileSync(path.join(work, 'README.md'), 'base\n');
    git(work, 'add', 'README.md');
    git(work, 'commit', '-m', 'base');
    git(work, 'branch', '-M', 'main');
    git(work, 'remote', 'add', 'origin', remote);
    git(work, 'push', 'origin', 'main');
    fs.writeFileSync(path.join(work, 'daily.md'), 'first\n');
    fs.writeFileSync(path.join(work, 'unrelated.md'), 'ignore\n');

    for (const value of ['first', 'second']) {
      if (value === 'second') fs.writeFileSync(path.join(work, 'daily.md'), 'second\n');
      const committed = spawnSync(process.execPath, [path.join(__dirname, 'index.js')], {cwd: work, encoding: 'utf8', env: {
        ...process.env, GITHUB_OUTPUT: output, INPUT_BRANCH: 'automation/test', INPUT_PATHS: 'daily.md', INPUT_MESSAGE: 'docs: daily',
      }});
      assert.equal(committed.status, 0, committed.stderr);
      const pushed = spawnSync(process.execPath, [path.join(__dirname, '..', 'push-pull-request-branch', 'index.js')], {cwd: work, encoding: 'utf8', env: {...process.env, INPUT_BRANCH: 'automation/test'}});
      assert.equal(pushed.status, 0, pushed.stderr);
      assert.equal(git(root, '--git-dir', remote, 'show', 'refs/heads/automation/test:daily.md'), value);
      assert.equal(git(root, '--git-dir', remote, 'ls-tree', '-r', '--name-only', 'refs/heads/automation/test').includes('unrelated.md'), false);
    }
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});
