const fs = require('node:fs');
const path = require('node:path');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const names = JSON.parse(process.env.INPUT_FILE_NAMES);
if (!Array.isArray(names) || !names.length) throw new Error('file-names must be a non-empty JSON array.');
const directory = process.env.INPUT_DIRECTORY;
const outputFile = process.env.INPUT_OUTPUT_FILE || '.generated-content/combined-content.md';
const contents = names.map((name) => {
  if (typeof name !== 'string' || !name || path.basename(name) !== name || name === '..' || name === '.') {
    throw new Error(`Invalid text filename: ${name}`);
  }
  const content = new TextDecoder('utf-8', {fatal: true}).decode(fs.readFileSync(path.join(directory, name))).trim();
  if (!content) throw new Error(`Text file is empty: ${name}`);
  return names.length === 1 ? content : `## ${name}\n\n${content}`;
});
fs.mkdirSync(path.dirname(outputFile), {recursive: true});
fs.writeFileSync(outputFile, `${contents.join('\n\n---\n\n')}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `content-file=${outputFile}\n`);
console.log(`Combined ${names.length} text file(s) into ${outputFile}.`);
