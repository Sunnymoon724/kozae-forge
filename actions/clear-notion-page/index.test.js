const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('clears paginated blocks sequentially and retries a Notion conflict', () => {
  const script = `
    const ids = Array.from({length: 101}, (_, index) => String(index));
    const patched = [];
    let conflictCount = 0;
    global.setTimeout = (callback) => { callback(); };
    global.fetch = async (url, options = {}) => {
      if (options.method === 'PATCH') {
        const id = url.split('/').at(-1);
        if (id === '3' && conflictCount++ === 0) {
          return {status: 409, ok: false, text: async () => 'conflict'};
        }
        patched.push(id);
        return {status: 200, ok: true, json: async () => ({id})};
      }
      const secondPage = url.includes('start_cursor=next');
      return {status: 200, ok: true, json: async () => ({
        results: secondPage ? ids.slice(100).map((id) => ({id})) : ids.slice(0, 100).map((id) => ({id})),
        has_more: !secondPage,
        next_cursor: secondPage ? null : 'next',
      })};
    };
    process.on('exit', () => console.log(JSON.stringify({patched, conflictCount})));
    require(${JSON.stringify(path.join(__dirname, 'index.js'))});
  `;
  const result = spawnSync(process.execPath, ['-e', script], {
    encoding: 'utf8',
    env: {...process.env, INPUT_PAGE_ID: 'page-id', INPUT_NOTION_TOKEN: 'test-token'},
  });
  assert.equal(result.status, 0, result.stderr);
  const {patched, conflictCount} = JSON.parse(result.stdout.trim().split('\n').at(-1));
  assert.deepEqual(patched, Array.from({length: 101}, (_, index) => String(index)));
  assert.equal(conflictCount, 2);
});
