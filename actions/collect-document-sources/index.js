const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

const mode = process.env.INPUT_SYNC_MODE;
if (!['changed', 'full'].includes(mode)) throw new Error('sync-mode must be `changed` or `full`.');

let files = process.env.INPUT_CHANGED_FILES.split(/\r?\n/).filter(Boolean);
if (mode === 'full') {
  const config = JSON.parse(fs.readFileSync(process.env.INPUT_MAPPING_FILE, 'utf8'));
  if (!Array.isArray(config.mappings) || config.mappings.length === 0) throw new Error('The mapping file must contain a non-empty `mappings` array.');
  const walk = (directory) => fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const item = path.posix.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : entry.isFile() && /\.md$/i.test(entry.name) ? [item] : [];
  });
  files = config.mappings.flatMap(({source}, index) => {
    if (typeof source !== 'string' || source.trim() === '') throw new Error(`Mapping ${index + 1} requires a non-empty \`source\` value.`);
    const directory = source.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) throw new Error(`Source directory not found: ${directory}`);
    return walk(directory);
  });
} else if (files.length === 0) {
  const base = process.env.INPUT_BASE_REF;
  const head = process.env.INPUT_HEAD_REF || 'HEAD';
  if (!base) throw new Error('base-ref is required in changed mode when changed-files is empty.');
  files = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', base, head, '--'], {encoding: 'utf8'}).split(/\r?\n/).filter(Boolean);
}

const sourceFiles = [...new Set(files.map((file) => file.replace(/\\/g, '/')).filter((file) => /\.md$/i.test(file)))].join('\n');
fs.appendFileSync(process.env.GITHUB_OUTPUT, `source-files<<EOF\n${sourceFiles}\nEOF\n`);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
