const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

test('image Action appends matching media without changing the blog title', () => {
  const root = fs.mkdtempSync(path.join(__dirname, '.test-'));
  try {
    const blog = path.join(root, 'blog');
    const media = path.join(root, 'media');
    fs.mkdirSync(blog);
    fs.mkdirSync(media);
    const post = path.join(blog, '2026-10-28-development-log.md');
    fs.writeFileSync(post, '---\ntitle: 2026년 10월 28일\n---\n\n# Work\n');
    fs.writeFileSync(path.join(media, '2026-10-28-01.png'), 'image');
    const result = spawnSync(process.execPath, [path.join(__dirname, 'index.js')], {
      cwd: root,
      encoding: 'utf8',
      env: {...process.env, INPUT_DIRECTORY: blog, INPUT_MEDIA_DIRECTORY: media, INPUT_MEDIA_URL_PREFIX: '/media'},
    });
    assert.equal(result.status, 0, result.stderr);
    const content = fs.readFileSync(post, 'utf8');
    assert.match(content, /title: 2026년 10월 28일/);
    assert.match(content, /## 🖼️ 참고 이미지/);
    assert.match(content, /!\[2026-10-28-01\.png\]\(\/media\/2026-10-28-01\.png\)/);
  } finally { fs.rmSync(root, {recursive: true, force: true}); }
});
