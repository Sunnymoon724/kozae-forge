for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const {appendFileSync} = require('node:fs');
async function main() { const id = new URL(process.env.INPUT_SOURCE_URL).pathname.split('/').pop().replace(/[^0-9a-f-].*$/i, '').replaceAll('-', ''); if (!/^[0-9a-f]{32}$/i.test(id)) throw new Error('Invalid Notion database URL.'); const response = await fetch(`https://api.notion.com/v1/databases/${id}`, {headers: {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Notion-Version': '2026-03-11'}}); if (!response.ok) throw new Error(await response.text()); const data = await response.json(); appendFileSync(process.env.GITHUB_OUTPUT, `data-source-id=${data.data_sources[0].id.replaceAll('-', '')}\n`); }
main().catch((error) => { console.error(error); process.exit(1); });
