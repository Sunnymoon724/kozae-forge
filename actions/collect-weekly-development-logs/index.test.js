const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {collect} = require('./index');
const {resolvePeriod} = require('../resolve-weekly-period/index');

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'weekly-logs-'));
  const logDirectory = path.join(root, 'blog');
  const mediaDirectory = path.join(root, 'media');
  fs.mkdirSync(logDirectory);
  fs.mkdirSync(mediaDirectory);
  try { return run({logDirectory, mediaDirectory}); }
  finally { fs.rmSync(root, {recursive: true, force: true}); }
}

test('scheduled Monday collects the previous week and reports missing weekdays', () => fixture(({logDirectory, mediaDirectory}) => {
  fs.writeFileSync(path.join(logDirectory, '2026-10-19-development-log.md'), '# Monday\n![screen](/media/screen.png)');
  fs.writeFileSync(path.join(logDirectory, '2026-10-21-development-log.md'), '# Wednesday');
  fs.writeFileSync(path.join(mediaDirectory, 'screen.png'), 'image');
  const period = resolvePeriod('', 'Asia/Seoul', new Date('2026-10-25T16:00:00Z'));
  const result = collect({...period, logDirectory, logFileSuffix: '-development-log.md'});
  assert.equal(period.periodLabel, '2026-10-19~2026-10-25');
  assert.equal(period.endDate, '2026-10-25');
  assert.equal(result.hasContent, true);
  assert.deepEqual(result.missingWeekdays, ['2026-10-20', '2026-10-22', '2026-10-23']);
  assert.equal(result.sourceFiles.length, 2);
  assert.ok(result.source.includes('# Monday'));
  assert.ok(!result.source.includes('![screen]'));
}));

test('manual current week stops at yesterday and accepts an empty week', () => fixture(({logDirectory, mediaDirectory}) => {
  const period = resolvePeriod('2026-10-26', 'Asia/Seoul', new Date('2026-10-28T16:00:00Z'));
  const result = collect({...period, logDirectory, logFileSuffix: '-development-log.md'});
  assert.equal(period.endDate, '2026-10-28');
  assert.equal(result.hasContent, false);
  assert.deepEqual(result.missingDates, ['2026-10-26', '2026-10-27', '2026-10-28']);
  assert.deepEqual(result.missingWeekdays, result.missingDates);
}));

test('manual week-start must be a past or current Monday', () => {
  const now = new Date('2026-10-28T16:00:00Z');
  assert.throws(() => resolvePeriod('2026-10-27', 'Asia/Seoul', now), /Monday/);
  assert.throws(() => resolvePeriod('2026-11-02', 'Asia/Seoul', now), /future/);
  assert.throws(() => resolvePeriod('2026-02-30', 'Asia/Seoul', now), /YYYY-MM-DD/);
});

test('formats the period with a caller-provided template', () => {
  const now = new Date('2026-10-25T16:00:00Z');
  const period = resolvePeriod('2026-10-19', 'Asia/Seoul', now, '{start-date} to {end-date}');
  assert.equal(period.periodLabel, '2026-10-19 to 2026-10-25');
  const korean = resolvePeriod('2026-10-19', 'Asia/Seoul', now, '{start-month}월 {start-day}일~{end-month}월 {end-day}일');
  assert.equal(korean.periodLabel, '10월 19일~10월 25일');
  assert.throws(() => resolvePeriod('2026-10-19', 'Asia/Seoul', now, '{unknown}'), /Unknown period-format placeholder/);
});

test('combines member posts for each date and treats the date as present', () => fixture(({logDirectory, mediaDirectory}) => {
  fs.mkdirSync(path.join(logDirectory, 'member1'));
  fs.mkdirSync(path.join(logDirectory, 'member2'));
  fs.writeFileSync(path.join(logDirectory, 'member1', '2026-10-19-development-log.md'), '# First member');
  fs.writeFileSync(path.join(logDirectory, 'member2', '2026-10-19-development-log.md'), '# Second member');
  const result = collect({startDate: '2026-10-19', endDate: '2026-10-25', logDirectory, logFileSuffix: '-development-log.md', logSubdirectories: '.,member1,member2'});
  assert.equal(result.hasContent, true);
  assert.ok(!result.missingDates.includes('2026-10-19'));
  assert.match(result.source, /First member[\s\S]*Second member/);
}));
