const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

function git(cwd, args, env = {}) {
  const result = spawnSync('git', args, {cwd, encoding: 'utf8', env: {...process.env, ...env}});
  assert.equal(result.status, 0, result.stderr);
}

test('collects several dates in one checkout and preserves the no-commits artifact', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    git(root, ['init']);
    git(root, ['config', 'user.name', 'Test Author']);
    git(root, ['config', 'user.email', 'test@example.com']);
    for (const [date, name] of [['2026-10-01', 'First'], ['2026-10-02', 'Second']]) {
      fs.writeFileSync(path.join(root, `${name}.txt`), name);
      git(root, ['add', `${name}.txt`]);
      const when = `${date}T04:00:00Z`;
      git(root, ['commit', '-m', name], {GIT_AUTHOR_DATE: when, GIT_COMMITTER_DATE: when});
    }
    const action = path.join(__dirname, 'index.js');
    function run(dates) {
      const output = path.join(root, 'output');
      const result = spawnSync(process.execPath, [action], {
        cwd: root,
        encoding: 'utf8',
        env: {
          ...process.env,
          GITHUB_OUTPUT: output,
          INPUT_DATES: JSON.stringify(dates),
          INPUT_TIMEZONE: 'Asia/Seoul',
          INPUT_AUTHORS: 'Test Author',
          INPUT_EXCLUDE_MERGE_COMMITS: 'true',
        },
      });
      assert.equal(result.status, 0, result.stderr);
      return fs.readFileSync(output, 'utf8');
    }
    assert.match(run(['2026-10-01', '2026-10-02']), /has-content=true/);
    assert.match(fs.readFileSync(path.join(root, '.commit-data/2026-10-01.txt'), 'utf8'), /First/);
    assert.match(fs.readFileSync(path.join(root, '.commit-data/2026-10-02.txt'), 'utf8'), /Second/);
    fs.rmSync(path.join(root, '.commit-data'), {recursive: true, force: true});
    assert.match(run(['2026-10-03']), /has-content=false/);
    assert.ok(fs.existsSync(path.join(root, '.commit-data/no-commits.txt')));
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
});
