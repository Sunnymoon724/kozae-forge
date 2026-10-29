const fs = require('node:fs');
const path = require('node:path');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
const mediaFiles = new Set();
for (const file of process.env.INPUT_SOURCE_FILES.split(/\r?\n/).filter(Boolean)) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/!\[([^\]]*)\]\(([^)]+\.(?:png|gif)(?:\?[^)]*)?)\)/gi)) {
    const localPath = path.join(process.env.INPUT_MEDIA_DIRECTORY, path.basename(match[2].split('?')[0]));
    if (fs.existsSync(localPath)) mediaFiles.add(localPath);
    else console.log(`Skipping missing daily log image: ${localPath}`);
  }
}
const files = [...mediaFiles];
fs.appendFileSync(process.env.GITHUB_OUTPUT, files.length ? `image-files<<EOF\n${files.join('\n')}\nEOF\n` : 'image-files=\n');
