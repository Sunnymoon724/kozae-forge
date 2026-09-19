const fs = require('node:fs');
const path = require('node:path');

const {INPUT_FILE_PATH: filePath, INPUT_CONTENT: content, INPUT_SOURCE_FILE: sourceFile} = process.env;
if (content && sourceFile) throw new Error('Specify either content or source-file, not both.');
if (!content && !sourceFile) throw new Error('Specify content or source-file.');
fs.mkdirSync(path.dirname(filePath), {recursive: true});
if (sourceFile) fs.copyFileSync(sourceFile, filePath);
else fs.writeFileSync(filePath, `${content}\n`);
