const fs = require('node:fs');
const path = require('node:path');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const directory = process.env.INPUT_DIRECTORY;
const mediaDirectory = process.env.INPUT_MEDIA_DIRECTORY;
const mediaUrlPrefix = (process.env.INPUT_MEDIA_URL_PREFIX || '/media').replace(/\/+$/, '');
if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) throw new Error(`Blog directory was not found: ${directory}`);
if (!fs.existsSync(mediaDirectory)) return;
for (const file of fs.readdirSync(directory).filter((name) => name.endsWith('.md') && /\d{4}-\d{2}-\d{2}/.test(name)).sort()) {
  const date = file.match(/(\d{4}-\d{2}-\d{2})/)[1];
  const mediaPattern = new RegExp(`^${date}-\\d+\\.(png|gif|jpe?g|webp)$`, 'i');
  const mediaFiles = fs.readdirSync(mediaDirectory).filter((name) => mediaPattern.test(name)).sort();
  if (!mediaFiles.length) continue;
  const links = mediaFiles.map((name) => `![${name}](${mediaUrlPrefix}/${encodeURIComponent(name)})`).join('\n\n');
  const section = `## 🖼️ 참고 이미지\n\n${links}`;
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = /^## 🖼️ 참고 이미지\s*$/m.test(content)
    ? content.replace(/^## 🖼️ 참고 이미지\s*$[\s\S]*$/m, section)
    : `${content.trimEnd()}\n\n${section}\n`;
  fs.writeFileSync(filePath, content);
  console.log(`${file}: added media links for ${mediaFiles.join(', ')}`);
}
