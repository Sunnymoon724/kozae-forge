const fs = require('node:fs');
const path = require('node:path');

fs.mkdirSync(path.dirname(process.env.INPUT_DESTINATION_FILE), {recursive: true});
fs.copyFileSync(process.env.INPUT_SOURCE_FILE, process.env.INPUT_DESTINATION_FILE);
