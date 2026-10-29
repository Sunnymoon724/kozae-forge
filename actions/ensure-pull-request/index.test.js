const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

for (const existing of [true, false]) {
  test(`ensure-pull-request ${existing ? 'reuses' : 'creates'} a PR`, () => {
    const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
    try {
      const output = path.join(root, 'output');
      const script = `
        global.fetch = async (url, options = {}) => {
          const body = options.method === 'POST'
            ? {html_url: 'https://github.test/owner/repository/pull/1'}
            : process.env.TEST_EXISTING === 'true'
              ? [{html_url: 'https://github.test/owner/repository/pull/1'}] : [];
          return {status: 200, ok: true, text: async () => JSON.stringify(body)};
        };
        require(${JSON.stringify(path.join(__dirname, 'index.js'))});
      `;
      const result = spawnSync(process.execPath, ['-e', script], {
        encoding: 'utf8',
        env: {
          ...process.env,
          TEST_EXISTING: String(existing),
          GITHUB_OUTPUT: output,
          INPUT_TOKEN: 'test-token',
          INPUT_REPOSITORY: 'owner/repository',
          INPUT_API_URL: 'https://api.github.test',
          INPUT_SOURCE_BRANCH: 'feature/example',
          INPUT_TARGET_BRANCH: 'main',
          INPUT_TITLE: 'Test PR',
          INPUT_BODY: 'Test body',
        },
      });
      assert.equal(result.status, 0, result.stderr);
      assert.match(fs.readFileSync(output, 'utf8'), /pull-request-url=https:\/\/github\.test\/owner\/repository\/pull\/1/);
    } finally {
      fs.rmSync(root, {recursive: true, force: true});
    }
  });
}
