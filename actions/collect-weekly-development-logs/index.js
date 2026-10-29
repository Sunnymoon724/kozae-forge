const fs = require('node:fs');
const path = require('node:path');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

function formatDate(date) { return date.toISOString().slice(0, 10); }

function collect(options) {
  const {startDate: startInput, endDate: endInput, logDirectory, logFileSuffix, logSubdirectories = ''} = options;
  if (!logDirectory) throw new Error('log-directory is required.');
  const startDate = new Date(`${startInput}T00:00:00Z`);
  const endDate = new Date(`${endInput}T00:00:00Z`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || formatDate(startDate) !== startInput || formatDate(endDate) !== endInput || startDate > endDate) {
    throw new Error('start-date and end-date must be valid ascending YYYY-MM-DD dates.');
  }
  const sections = [];
  const sourceFiles = [];
  const missingDates = [];
  const missingWeekdays = [];
  const subdirectories = logSubdirectories.split(',').map(value => value.trim()).filter(Boolean);
  if (subdirectories.some(value => value === '..' || value.includes('/') || value.includes('\\'))) {
    throw new Error('log-subdirectories must contain folder names only.');
  }
  for (let current = new Date(startDate); current <= endDate; current.setUTCDate(current.getUTCDate() + 1)) {
    const date = formatDate(current);
    const files = (subdirectories.length ? subdirectories : [''])
      .map(subdirectory => ({subdirectory, file: path.join(logDirectory, subdirectory, `${date}${logFileSuffix}`)}))
      .filter(({file}) => fs.existsSync(file));
    const dayOfWeek = current.getUTCDay();
    if (!files.length) {
      missingDates.push(date);
      if (dayOfWeek >= 1 && dayOfWeek <= 5) missingWeekdays.push(date);
      console.log(`${date} ❌ missing${dayOfWeek >= 1 && dayOfWeek <= 5 ? ' (weekday)' : ' (weekend)'}`);
      continue;
    }
    for (const {subdirectory, file} of files) {
      console.log(`${date} ✅ found ${file}`);
      sourceFiles.push(file);
      const content = fs.readFileSync(file, 'utf8').trim();
      const imagePattern = /!\[([^\]]*)\]\(([^)]+\.(?:png|gif)(?:\?[^)]*)?)\)/gi;
      sections.push(`## ${date}${subdirectory ? ` (${subdirectory})` : ''}\n${content.replace(imagePattern, '').trim()}\n`);
    }
  }
  console.log(`Missing dates: ${missingDates.join(', ') || '(none)'}`);
  console.log(`Missing weekdays: ${missingWeekdays.join(', ') || '(none)'}`);
  if (!sections.length) console.log(`No daily development logs found for ${formatDate(startDate)} through ${formatDate(endDate)}.`);
  return {
    hasContent: sections.length > 0,
    sourceFiles,
    missingDates,
    missingWeekdays,
    source: sections.join('\n'),
  };
}

function main() {
  const result = collect({
    startDate: process.env.INPUT_START_DATE,
    endDate: process.env.INPUT_END_DATE,
    logDirectory: process.env.INPUT_LOG_DIRECTORY,
    logFileSuffix: process.env.INPUT_LOG_FILE_SUFFIX || '-development-log.md',
    logSubdirectories: process.env.INPUT_LOG_SUBDIRECTORIES || '',
  });
  const output = [
    `has-content=${result.hasContent}`,
    `missing-dates=${result.missingDates.join(', ')}`,
    `missing-weekdays=${result.missingWeekdays.join(', ')}`,
    result.sourceFiles.length ? `source-files<<EOF\n${result.sourceFiles.join('\n')}\nEOF` : 'source-files=',
    result.hasContent ? `source<<EOF\n${result.source}\nEOF` : 'source=',
  ];
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${output.join('\n')}\n`);
}

if (require.main === module) main();
module.exports = {collect};
