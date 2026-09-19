const {appendFileSync} = require('node:fs');

process.env.TZ = process.env.INPUT_TIMEZONE;
const targetDate = process.env.INPUT_TARGET_DATE;
const date = new Date(`${targetDate}T00:00:00`);
if (Number.isNaN(date.getTime())) throw new Error(`Invalid target date or timezone: ${targetDate} (${process.env.INPUT_TIMEZONE})`);
const next = new Date(date);
next.setDate(next.getDate() + 1);
const format = (value) => {
  const pad = (number) => String(number).padStart(2, '0');
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())} ${pad(value.getHours())}:${pad(value.getMinutes())}`;
};
appendFileSync(process.env.GITHUB_OUTPUT, `start-time=${format(date)}\nend-time=${format(next)}\ndate=${targetDate}\n`);
