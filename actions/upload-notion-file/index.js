for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

const {readFile, stat} = require('node:fs/promises');
const {basename, extname} = require('node:path');
const p = process.env;
const notionVersion = '2026-03-11';
const types = {'.png': 'image/png', '.gif': 'image/gif'};

async function request(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!response.ok) throw new Error(`Notion request failed (${response.status}): ${text}`);
  return body;
}

async function upload(filePath) {
  const extension = extname(filePath).toLowerCase();
  const contentType = types[extension];
  if (!contentType) throw new Error(`Only .png and .gif files are supported: ${filePath}`);
  const fileInfo = await stat(filePath);
  if (fileInfo.size > 20 * 1024 * 1024) throw new Error(`File is larger than 20 MiB: ${filePath}`);
  const headers = {Authorization: `Bearer ${p.INPUT_NOTION_TOKEN}`, Accept: 'application/json', 'Notion-Version': notionVersion};
  const created = await request('https://api.notion.com/v1/file_uploads', {
    method: 'POST',
    headers: {...headers, 'Content-Type': 'application/json'},
    body: JSON.stringify({mode: 'single_part', filename: basename(filePath), content_type: contentType}),
  });
  const form = new FormData();
  form.append('file', new Blob([await readFile(filePath)], {type: contentType}), basename(filePath));
  await request(`https://api.notion.com/v1/file_uploads/${created.id}/send`, {method: 'POST', headers, body: form});
  return created.id;
}

async function main() {
  const filePaths = p.INPUT_FILE_PATHS.split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
  if (filePaths.length === 0) throw new Error('file-paths must contain at least one file path.');
  const ids = [];
  for (const filePath of filePaths) {
    const id = await upload(filePath);
    ids.push(id);
    console.log(`Uploaded Notion file: ${filePath}`);
  }
  const fs = require('node:fs');
  fs.appendFileSync(p.GITHUB_OUTPUT, `file-upload-id=${ids[0]}\nfile-upload-ids=${JSON.stringify(ids)}\n`);
}

main().catch((error) => { console.error(error); process.exit(1); });
