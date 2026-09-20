for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const {appendFileSync} = require('node:fs');
async function main() { const headers = {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}; const response = await fetch('https://api.notion.com/v1/search', {method: 'POST', headers, body: JSON.stringify({query: process.env.INPUT_TITLE, page_size: 100})}); if (!response.ok) throw new Error(await response.text()); const data = await response.json(); const page = data.results.find((item) => item.object === 'page' && item.parent.page_id === process.env.INPUT_PARENT_PAGE_ID && item.properties.title?.title?.[0]?.plain_text === process.env.INPUT_TITLE); appendFileSync(process.env.GITHUB_OUTPUT, `page-id=${page?.id || ''}\n`); }
main().catch((error) => { console.error(error); process.exit(1); });
