const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

function run(action, scenario, overrides = {}) {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    const output = path.join(root, 'output');
    const script = `
      global.fetch = async (url, options = {}) => {
        const scenario = process.env.TEST_SCENARIO;
        const isMerge = url.endsWith('/merges');
        let status = isMerge ? 201 : 200;
        let body = isMerge ? {sha: 'merged-sha'} : {object: {sha: 'source-sha'}};
        if (isMerge && scenario === 'conflict') { status = 409; body = {message: 'Conflict'}; }
        if (isMerge && scenario === 'forbidden') { status = 403; body = {message: 'Forbidden'}; }
        if (isMerge && scenario === 'already-merged') { status = 204; body = null; }
        return {status, ok: status >= 200 && status < 300, text: async () => body ? JSON.stringify(body) : ''};
      };
      require(${JSON.stringify(action)});
    `;
    const result = spawnSync(process.execPath, ['-e', script], {
      encoding: 'utf8',
      env: {
        ...process.env,
        TEST_SCENARIO: scenario,
        GITHUB_OUTPUT: output,
        INPUT_TOKEN: 'test-token',
        INPUT_REPOSITORY: 'owner/repository',
        INPUT_API_URL: 'https://api.github.test',
        INPUT_SOURCE_BRANCH: 'feature/example',
        INPUT_SOURCE_SHA: 'source-sha',
        INPUT_TARGET_BRANCH: 'main',
        ...overrides,
      },
    });
    return {result, output: fs.existsSync(output) ? fs.readFileSync(output, 'utf8') : ''};
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
}

const action = path.join(__dirname, 'index.js');
for (const [scenario, outcome] of [['merged', 'merged'], ['already-merged', 'merged'], ['conflict', 'conflict']]) {
  test(`merge-branch returns ${outcome} for ${scenario}`, () => {
    const {result, output} = run(action, scenario);
    assert.equal(result.status, 0, result.stderr);
    assert.match(output, new RegExp(`outcome=${outcome}`));
  });
}

test('merge-branch skips a stale source commit', () => {
  const {result, output} = run(action, 'merged', {INPUT_SOURCE_SHA: 'old-sha'});
  assert.equal(result.status, 0, result.stderr);
  assert.match(output, /outcome=stale/);
});

test('merge-branch does not mistake permission failures for conflicts', () => {
  const {result, output} = run(action, 'forbidden');
  assert.equal(result.status, 1);
  assert.equal(output, '');
  assert.match(result.stderr, /Could not merge branch \(403\)/);
});
