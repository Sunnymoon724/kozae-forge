const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('finds existing image references without changing Markdown', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    const media = path.join(root, 'media');
    fs.mkdirSync(media);
    const image = path.join(media, 'image.png');
    const post = path.join(root, 'post.md');
    const output = path.join(root, 'output');
    const markdown = '![screen](/media/image.png)\n![missing](/media/missing.gif)\n';
    fs.writeFileSync(image, 'image');
    fs.writeFileSync(post, markdown);
    const result = spawnSync(process.execPath, [path.join(__dirname, 'index.js')], {cwd: root, encoding: 'utf8', env: {
      ...process.env, INPUT_SOURCE_FILES: post, INPUT_MEDIA_DIRECTORY: media, GITHUB_OUTPUT: output,
    }});
    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(output, 'utf8'), /image\.png/);
    assert.doesNotMatch(fs.readFileSync(output, 'utf8'), /missing\.gif/);
    assert.equal(fs.readFileSync(post, 'utf8'), markdown);
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});
