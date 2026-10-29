const test = require('node:test');
const assert = require('node:assert/strict');
const {resolveDates} = require('./index');

test('resolves a date range and branch name', () => {
  const result = resolveDates({startInput: '2026-10-01', endInput: '2026-10-03', timezone: 'Asia/Seoul', branchPrefix: 'chronicle-log'});
  assert.deepEqual(result.dates, ['2026-10-01', '2026-10-02', '2026-10-03']);
  assert.equal(result.branchName, 'chronicle-log-2026-10-01-2026-10-03');
});

test('defaults to yesterday in the selected timezone', () => {
  const result = resolveDates({timezone: 'Asia/Seoul'}, new Date('2026-10-03T16:00:00Z'));
  assert.deepEqual(result.dates, ['2026-10-03']);
});

test('rejects invalid and oversized ranges', () => {
  assert.throws(() => resolveDates({startInput: '2026-02-30', timezone: 'Asia/Seoul'}), /valid calendar date/);
  assert.throws(() => resolveDates({startInput: '2026-10-01', endInput: '2026-11-01', timezone: 'Asia/Seoul'}), /31 days/);
  assert.throws(() => resolveDates({endInput: '2026-10-01', timezone: 'Asia/Seoul'}), /without start-date/);
});
