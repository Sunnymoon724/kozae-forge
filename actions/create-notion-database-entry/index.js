require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}
const {readFileSync, appendFileSync} = require('node:fs');
const {contentToNotionBlocks} = require('../_shared/notion-content');
async function main() {
  const p = process.env;
  const content = readFileSync(p.INPUT_CONTENT_FILE, 'utf8');
  const imageIds = JSON.parse(p.INPUT_IMAGE_FILE_UPLOADS || '[]');
  if (Boolean(p.INPUT_GROUP_PROPERTY) !== Boolean(p.INPUT_GROUP_VALUE)) throw new Error('group-property and group-value must be provided together');
  if (Boolean(p.INPUT_STATUS_PROPERTY) !== Boolean(p.INPUT_STATUS_VALUE)) throw new Error('status-property and status-value must be provided together');
  if (Boolean(p.INPUT_DATE_PROPERTY) !== Boolean(p.INPUT_DATE)) throw new Error('date-property and date must be provided together');
  const properties = {[p.INPUT_TITLE_PROPERTY]: {title: [{type: 'text', text: {content: p.INPUT_TITLE}}]}};
  if (p.INPUT_GROUP_PROPERTY) properties[p.INPUT_GROUP_PROPERTY] = {select: {name: p.INPUT_GROUP_VALUE}};
  if (p.INPUT_STATUS_PROPERTY) properties[p.INPUT_STATUS_PROPERTY] = {status: {name: p.INPUT_STATUS_VALUE}};
  if (p.INPUT_DATE_PROPERTY) properties[p.INPUT_DATE_PROPERTY] = {date: {start: p.INPUT_DATE}};
  const children = contentToNotionBlocks(content, p.INPUT_CONTENT_FORMAT || 'plain');
  for (const id of imageIds) children.push({object: 'block', type: 'image', image: {type: 'file_upload', file_upload: {id}}});
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {Authorization: `Bearer ${p.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2026-03-11'},
    body: JSON.stringify({parent: {data_source_id: p.INPUT_DATA_SOURCE_ID}, properties, children}),
  });
  if (!response.ok) throw new Error(await response.text());
  appendFileSync(p.GITHUB_OUTPUT, `page-id=${(await response.json()).id}\n`);
}
main().catch((error) => { console.error(error); process.exit(1); });
