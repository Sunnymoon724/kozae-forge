const fs = require('node:fs');
const path = require('node:path');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

function main() {
  const p = process.env;
  if (!p.INPUT_PUBLIC_BASE_URL) throw new Error('public-base-url is required.');
  new URL(p.INPUT_PUBLIC_BASE_URL);
  const target = p.INPUT_OUTPUT_FILE || '.generated-content/notion-entry-with-images.md';
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.copyFileSync(p.INPUT_SOURCE_FILE, target);
  const base = p.INPUT_PUBLIC_BASE_URL.replace(/\/+$/, '');
  const imagePath = `/${(p.INPUT_PUBLIC_PATH || '/media').replace(/^\/+|\/+$/g, '')}`;
  const links = p.INPUT_IMAGE_FILES.split(/\r?\n/).map((file) => file.trim()).filter(Boolean)
    .map((file) => `- [${path.basename(file)}](${base}${imagePath}/${encodeURIComponent(path.basename(file))})`);
  fs.appendFileSync(target, `\n\n## 🖼️ 참고 이미지\n${links.join('\n')}\n`);
  fs.appendFileSync(p.GITHUB_OUTPUT, `content-file=${target}\n`);
}

if (require.main === module) main();
