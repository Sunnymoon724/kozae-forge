for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}
const {readFileSync} = require('node:fs');
const {contentToNotionBlocks} = require('../_shared/notion-content');
async function main() {
  const content = readFileSync(process.env.INPUT_CONTENT_FILE, 'utf8');
  const imageIds = JSON.parse(process.env.INPUT_IMAGE_FILE_UPLOADS || '[]');
  const children = contentToNotionBlocks(content, process.env.INPUT_CONTENT_FORMAT || 'plain');
  for (const id of imageIds) children.push({object: 'block', type: 'image', image: {type: 'file_upload', file_upload: {id}}});
  if (children.length === 0) return;
  const response = await fetch(`https://api.notion.com/v1/blocks/${process.env.INPUT_PAGE_ID}/children`, {
    method: 'PATCH',
    headers: {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2026-03-11'},
    body: JSON.stringify({children}),
  });
  if (!response.ok) throw new Error(`Notion request failed: ${response.status} ${await response.text()}`);
}
main().catch((error) => { console.error(error); process.exit(1); });
