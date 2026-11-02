const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {main} = require('./index');

async function run(content, limit, {provider = 'openai-compatible', apiBase = 'http://localhost:11434/v1', apiKey = 'test-key'} = {}) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'request-content-test-'));
  const output = path.join(folder, 'output.txt');
  const originalFetch = globalThis.fetch;
  const originalEnv = Object.fromEntries(['INPUT_PROVIDER', 'INPUT_API_BASE', 'INPUT_MODEL', 'INPUT_PROMPT', 'INPUT_CONTENT', 'INPUT_API_KEY', 'INPUT_MAX_CONTENT_BYTES', 'GITHUB_OUTPUT'].map(key => [key, process.env[key]]));
  const calls = [];
  Object.assign(process.env, {
    INPUT_PROVIDER: provider,
    INPUT_API_BASE: apiBase,
    INPUT_MODEL: 'test-model',
    INPUT_PROMPT: 'Write the final document.',
    INPUT_CONTENT: content,
    INPUT_API_KEY: apiKey,
    INPUT_MAX_CONTENT_BYTES: String(limit),
    GITHUB_OUTPUT: output,
  });
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    calls.push({body, headers: options.headers});
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
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(folder, {recursive: true, force: true});
  }
}

test('small input uses one request with the original prompt', async () => {
  const result = await run('- one commit', 20);
  assert.equal(result.calls.length, 1);
  assert.equal(result.calls[0].body.messages[0].content, 'Write the final document.');
  assert.equal(result.calls[0].headers.Authorization, 'Bearer test-key');
  assert.match(result.output, /final document/);
});

test('large input summarizes chunks before one final request', async () => {
  const result = await run('- first commit\n- second commit\n', 20);
  assert.equal(result.calls.length, 3);
  assert.ok(result.calls.slice(0, 2).every((call) => call.body.messages[0].content.includes('Summarize')));
  assert.equal(result.calls[2].body.messages[0].content, 'Write the final document.');
  assert.equal(result.calls[2].body.messages[1].content, 'note\n\nnote');
  assert.match(result.output, /final document/);
});

test('local OpenAI-compatible API works without a key', async () => {
  const result = await run('- one commit', 0, {apiBase: 'http://127.0.0.1:11434/v1', apiKey: ''});
  assert.equal(result.calls[0].headers.Authorization, undefined);
  assert.match(result.output, /final document/);
});

test('remote OpenAI-compatible API still requires a key', async () => {
  await assert.rejects(run('- one commit', 0, {apiBase: 'https://example.com/v1', apiKey: ''}), /Missing required input: api-key/);
});

test('OpenAI provider still requires a key', async () => {
  await assert.rejects(run('- one commit', 0, {provider: 'openai', apiKey: ''}), /Missing required input: api-key/);
});
