const fs = require('node:fs');

let content = process.env.INPUT_CONTENT || '';
if (process.env.INPUT_SOURCE_FILE) content = fs.readFileSync(process.env.INPUT_SOURCE_FILE, 'utf8');
if (process.env.INPUT_TEMPLATE_FILE) content += `\n\n## Template\n\n${fs.readFileSync(process.env.INPUT_TEMPLATE_FILE, 'utf8')}`;
fs.appendFileSync(process.env.GITHUB_OUTPUT, `content<<EOF\n${content}\nEOF\n`);
