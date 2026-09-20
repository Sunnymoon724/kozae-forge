for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const {readFileSync} = require('node:fs');
async function main() {
  const content = readFileSync(process.env.INPUT_CONTENT_FILE, 'utf8');
  const payload = {children: [{object: 'block', type: 'paragraph', paragraph: {rich_text: [{type: 'text', text: {content}}]}}]};
  const response = await fetch(`https://api.notion.com/v1/blocks/${process.env.INPUT_PAGE_ID}/children`, {method: 'PATCH', headers: {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}, body: JSON.stringify(payload)});
  if (!response.ok) throw new Error(`Notion request failed: ${response.status} ${await response.text()}`);
}
main().catch((error) => { console.error(error); process.exit(1); });
