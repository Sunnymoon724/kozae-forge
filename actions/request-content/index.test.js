const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {main} = require('./index');

async function run(content, limit) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'request-content-test-'));
  const output = path.join(folder, 'output.txt');
  const originalFetch = globalThis.fetch;
  const calls = [];
  Object.assign(process.env, {
    INPUT_PROVIDER: 'openai-compatible',
    INPUT_API_BASE: 'http://localhost:11434/v1',
    INPUT_MODEL: 'test-model',
    INPUT_PROMPT: 'Write the final document.',
    INPUT_CONTENT: content,
    INPUT_API_KEY: 'test-key',
    INPUT_MAX_CONTENT_BYTES: String(limit),
    GITHUB_OUTPUT: output,
  });
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    calls.push(body);
    return {
      ok: true,
      json: async () => ({choices: [{message: {content: body.messages[0].content === 'Write the final document.' ? 'final document' : 'note'}}]}),
    };
  };
  try {
    await main();
    return {calls, output: fs.readFileSync(output, 'utf8')};
  } finally {
    globalThis.fetch = originalFetch;
    fs.rmSync(folder, {recursive: true, force: true});
  }
}

test('small input uses one request with the original prompt', async () => {
  const result = await run('- one commit', 20);
  assert.equal(result.calls.length, 1);
  assert.equal(result.calls[0].messages[0].content, 'Write the final document.');
  assert.match(result.output, /final document/);
});

test('large input summarizes chunks before one final request', async () => {
  const result = await run('- first commit\n- second commit\n', 20);
  assert.equal(result.calls.length, 3);
  assert.ok(result.calls.slice(0, 2).every((call) => call.messages[0].content.includes('Summarize')));
  assert.equal(result.calls[2].messages[0].content, 'Write the final document.');
  assert.equal(result.calls[2].messages[1].content, 'note\n\nnote');
  assert.match(result.output, /final document/);
});
