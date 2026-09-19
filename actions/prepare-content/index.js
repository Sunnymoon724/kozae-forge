const fs = require('node:fs');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

let content = process.env.INPUT_CONTENT || '';
if (process.env.INPUT_SOURCE_FILE) content = fs.readFileSync(process.env.INPUT_SOURCE_FILE, 'utf8');
if (process.env.INPUT_TEMPLATE_FILE) content += `\n\n## Template\n\n${fs.readFileSync(process.env.INPUT_TEMPLATE_FILE, 'utf8')}`;
fs.appendFileSync(process.env.GITHUB_OUTPUT, `content<<EOF\n${content}\nEOF\n`);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
