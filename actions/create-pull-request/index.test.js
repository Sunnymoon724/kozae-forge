const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('creates a pull request for an already pushed branch without running Git', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'forge-pr-'));
  try {
    const output = path.join(root, 'output');
    const action = path.join(__dirname, 'index.js');
    const script = `global.fetch = async (url) => ({ok: true, status: 201, json: async () => url.endsWith('/pulls') ? {number: 7, html_url: 'https://github.test/pr/7'} : {default_branch: 'main'}}); require(${JSON.stringify(action)});`;
    const result = spawnSync(process.execPath, ['-e', script], {cwd: root, encoding: 'utf8', env: {
      ...process.env, GITHUB_OUTPUT: output, GITHUB_REPOSITORY: 'owner/repository', INPUT_TOKEN: 'test',
      INPUT_BRANCH: 'automation/test', INPUT_TITLE: 'Test', INPUT_BODY: 'Body',
    }});
    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(output, 'utf8'), /pull-request-number=7/);
    assert.match(fs.readFileSync(output, 'utf8'), /pull-request-url=https:\/\/github.test\/pr\/7/);
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});
