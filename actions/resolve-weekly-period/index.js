const fs = require('node:fs');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
function formatDate(date) { return date.toISOString().slice(0, 10); }
function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && formatDate(date) === value ? date : null;
}
const defaultPeriodFormat = '{start-date}~{end-date}';
function formatPeriod(startDate, endDate, periodFormat) {
  if (!periodFormat.trim()) throw new Error('period-format must not be empty.');
  const values = {
    'start-date': formatDate(startDate), 'end-date': formatDate(endDate),
    'start-year': startDate.getUTCFullYear(), 'end-year': endDate.getUTCFullYear(),
    'start-month': startDate.getUTCMonth() + 1, 'end-month': endDate.getUTCMonth() + 1,
    'start-day': startDate.getUTCDate(), 'end-day': endDate.getUTCDate(),
  };
  const label = periodFormat.replace(/\{([^{}]+)\}/g, (match, key) => {
    if (!(key in values)) throw new Error(`Unknown period-format placeholder: ${match}`);
    return values[key];
  });
  if (/[{}]/.test(label)) throw new Error('Invalid period-format placeholder.');
  return label;
}
function resolvePeriod(weekStart, timezone, now = new Date(), periodFormat = defaultPeriodFormat) {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now);
  const values = Object.fromEntries(parts.map(({type, value}) => [type, value]));
  const yesterday = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day) - 1));
  let startDate;
  if (weekStart) {
    startDate = parseDate(weekStart);
    if (!startDate) throw new Error('week-start must use YYYY-MM-DD format.');
    if (startDate.getUTCDay() !== 1) throw new Error('week-start must be a Monday.');
    if (startDate > yesterday) throw new Error('week-start cannot be in the future.');
  } else {
    startDate = new Date(yesterday);
    startDate.setUTCDate(startDate.getUTCDate() - (startDate.getUTCDay() + 6) % 7);
  }
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 6);
  if (endDate > yesterday) endDate.setTime(yesterday.getTime());
  return {
    startDate: formatDate(startDate), endDate: formatDate(endDate),
    periodLabel: formatPeriod(startDate, endDate, periodFormat),
  };
}
if (require.main === module) {
  const result = resolvePeriod(process.env.INPUT_WEEK_START || '', process.env.INPUT_TIMEZONE || 'Asia/Seoul', new Date(), process.env.INPUT_PERIOD_FORMAT || defaultPeriodFormat);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `start-date=${result.startDate}\nend-date=${result.endDate}\nperiod-label=${result.periodLabel}\n`);
}
module.exports = {resolvePeriod, defaultPeriodFormat};
