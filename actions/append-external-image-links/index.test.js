const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('copies content and appends encoded public image links', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    fs.writeFileSync(path.join(root, 'source.md'), 'Report\n');
    const output = path.join(root, 'output');
    const result = spawnSync(process.execPath, [path.join(__dirname, 'index.js')], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        GITHUB_OUTPUT: output,
        INPUT_SOURCE_FILE: 'source.md',
        INPUT_IMAGE_FILES: 'media/a b.png\nmedia/c.gif',
        INPUT_PUBLIC_BASE_URL: 'https://example.pages.dev/',
        INPUT_PUBLIC_PATH: '/media/',
        INPUT_OUTPUT_FILE: 'result/report.md',
      },
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(path.join(root, 'result/report.md'), 'utf8'), /https:\/\/example\.pages\.dev\/media\/a%20b\.png/);
    assert.match(fs.readFileSync(output, 'utf8'), /content-file=result\/report\.md/);
  } finally {
    fs.rmSync(root, {recursive: true, force: true});
  }
});
