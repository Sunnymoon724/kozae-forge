require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}
const {appendFileSync} = require('node:fs');
async function main() {
  const p = process.env;
  const headers = {Authorization: `Bearer ${p.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2026-03-11'};
  let titleProperty = p.INPUT_TITLE_PROPERTY;
  if (!titleProperty) {
    const schemaResponse = await fetch(`https://api.notion.com/v1/data_sources/${p.INPUT_DATA_SOURCE_ID}`, {headers});
    if (!schemaResponse.ok) throw new Error(await schemaResponse.text());
    const schema = await schemaResponse.json();
    titleProperty = Object.entries(schema.properties || {}).find(([, property]) => property.type === 'title')?.[0];
    if (!titleProperty) throw new Error('Notion data source does not have a title property.');
  }
  const response = await fetch(`https://api.notion.com/v1/data_sources/${p.INPUT_DATA_SOURCE_ID}/query`, {
    method: 'POST', headers,
    body: JSON.stringify({page_size: 100, filter: {property: titleProperty, title: {equals: p.INPUT_TITLE}}}),
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  const page = data.results.find((item) => !item.in_trash && !item.archived);
  appendFileSync(p.GITHUB_OUTPUT, `page-id=${page?.id || ''}\ntitle-property=${titleProperty}\n`);
}
main().catch((error) => { console.error(error); process.exit(1); });
