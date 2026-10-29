const test = require('node:test');
const assert = require('node:assert/strict');
const {splitIntoChunks} = require('./chunks');

test('keeps commit lines together when they fit and preserves all content', () => {
  const input = '- first commit\n- second commit\n- third commit';
  const chunks = splitIntoChunks(input, 30);
  assert.equal(chunks.join(''), input);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk, 'utf8') <= 30));
  assert.equal(chunks[0], '- first commit\n');
});

test('splits oversized lines without breaking UTF-8 characters', () => {
  const input = '가나다라마바사아자차카타파하';
  const chunks = splitIntoChunks(input, 10);
  assert.equal(chunks.join(''), input);
  assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk, 'utf8') <= 10));
});

test('rejects a limit smaller than one character', () => {
  assert.throws(() => splitIntoChunks('가', 2), /too small/);
});
