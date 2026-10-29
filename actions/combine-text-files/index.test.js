const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('combines selected UTF-8 text files without requiring dates or Markdown extensions', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    fs.writeFileSync(path.join(root, 'alpha.txt'), 'First');
    fs.writeFileSync(path.join(root, 'beta.md'), 'Second');
    const output = path.join(root, 'output');
    const combined = path.join(root, 'combined.md');
    const result = spawnSync(process.execPath, [path.join(__dirname, 'index.js')], {encoding: 'utf8', env: {
      ...process.env, INPUT_DIRECTORY: root, INPUT_FILE_NAMES: '["alpha.txt","beta.md"]', INPUT_OUTPUT_FILE: combined, GITHUB_OUTPUT: output,
    }});
    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(combined, 'utf8'), /alpha\.txt[\s\S]*First[\s\S]*beta\.md[\s\S]*Second/);
    assert.match(fs.readFileSync(output, 'utf8'), /content-file=/);
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});
