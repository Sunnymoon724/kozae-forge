const fs = require('node:fs');
const path = require('node:path');

for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

fs.mkdirSync(path.dirname(process.env.INPUT_DESTINATION_FILE), {recursive: true});
fs.copyFileSync(process.env.INPUT_SOURCE_FILE, process.env.INPUT_DESTINATION_FILE);
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
