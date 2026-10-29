const fs = require('node:fs');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

const maxDays = 31;
const dayMs = 24 * 60 * 60 * 1000;

function parseDate(value, name) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${name} must use YYYY-MM-DD format.`);
  const [year, month, day] = value.split('-').map(Number);
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`${name} is not a valid calendar date.`);
  }
  return timestamp;
}

function formatDate(timestamp) { return new Date(timestamp).toISOString().slice(0, 10); }

function yesterdayInTimezone(timezone, now = new Date()) {
  let parts;
  try {
    parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(now);
  } catch {
    throw new Error(`Invalid IANA timezone: ${timezone}`);
  }
  const values = Object.fromEntries(parts.map(({type, value}) => [type, value]));
  return Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)) - dayMs;
}

function resolveDates({startInput = '', endInput = '', timezone, branchPrefix = ''}, now = new Date()) {
  let startTimestamp;
  let endTimestamp;
  if (!startInput && !endInput) {
    startTimestamp = yesterdayInTimezone(timezone, now);
    endTimestamp = startTimestamp;
  } else if (!startInput && endInput) {
    throw new Error('end-date cannot be used without start-date.');
  } else {
    startTimestamp = parseDate(startInput, 'start-date');
    endTimestamp = endInput ? parseDate(endInput, 'end-date') : startTimestamp;
  }
  if (startTimestamp > endTimestamp) throw new Error('start-date must not be later than end-date.');
  const dayCount = Math.floor((endTimestamp - startTimestamp) / dayMs) + 1;
  if (dayCount > maxDays) throw new Error(`The date range cannot be longer than ${maxDays} days.`);
  const dates = [];
  for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += dayMs) dates.push(formatDate(timestamp));
  const startDate = formatDate(startTimestamp);
  const endDate = formatDate(endTimestamp);
  if (branchPrefix && /\s/.test(branchPrefix)) throw new Error('branch-prefix must not contain whitespace.');
  const branchName = branchPrefix ? `${branchPrefix}-${startDate}${startDate === endDate ? '' : `-${endDate}`}` : '';
  return {dates, startDate, endDate, branchName};
}

function main() {
  const p = process.env;
  const result = resolveDates({
    startInput: (p.INPUT_START_DATE || '').trim(),
    endInput: (p.INPUT_END_DATE || '').trim(),
    timezone: (p.INPUT_TIMEZONE || '').trim(),
    branchPrefix: (p.INPUT_BRANCH_PREFIX || '').trim(),
  });
  fs.appendFileSync(p.GITHUB_OUTPUT,
    `dates=${JSON.stringify(result.dates)}\nstart-date=${result.startDate}\nend-date=${result.endDate}\nstart-date-display=${result.startDate.replaceAll('-', '/')}\nend-date-display=${result.endDate.replaceAll('-', '/')}\nbranch-name=${result.branchName}\n`);
  console.log(`Processing ${result.dates.length} day(s): ${result.dates.join(', ')}`);
}

if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = {resolveDates};
