require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}
async function main() {
  const p = process.env;
  if (Boolean(p.INPUT_GROUP_PROPERTY) !== Boolean(p.INPUT_GROUP_VALUE)) throw new Error('group-property and group-value must be provided together');
  if (Boolean(p.INPUT_STATUS_PROPERTY) !== Boolean(p.INPUT_STATUS_VALUE)) throw new Error('status-property and status-value must be provided together');
  if (Boolean(p.INPUT_DATE_PROPERTY) !== Boolean(p.INPUT_DATE)) throw new Error('date-property and date must be provided together');
  if (Boolean(p.INPUT_TITLE_PROPERTY) !== Boolean(p.INPUT_TITLE)) throw new Error('title-property and title must be provided together');
  const properties = {};
  if (p.INPUT_TITLE_PROPERTY) properties[p.INPUT_TITLE_PROPERTY] = {title: [{type: 'text', text: {content: p.INPUT_TITLE}}]};
  if (p.INPUT_GROUP_PROPERTY) properties[p.INPUT_GROUP_PROPERTY] = {select: {name: p.INPUT_GROUP_VALUE}};
  if (p.INPUT_STATUS_PROPERTY) properties[p.INPUT_STATUS_PROPERTY] = {status: {name: p.INPUT_STATUS_VALUE}};
  if (p.INPUT_DATE_PROPERTY) properties[p.INPUT_DATE_PROPERTY] = {date: {start: p.INPUT_DATE}};
  if (Object.keys(properties).length === 0) throw new Error('Provide at least one property to update.');
  const response = await fetch(`https://api.notion.com/v1/pages/${p.INPUT_PAGE_ID}`, {
    method: 'PATCH',
    headers: {Authorization: `Bearer ${p.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2026-03-11'},
    body: JSON.stringify({properties}),
  });
  if (!response.ok) throw new Error(await response.text());
}
main().catch((error) => { console.error(error); process.exit(1); });
