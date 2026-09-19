async function request(url, options) { const response = await fetch(url, options); if (!response.ok) throw new Error(`Notion request failed: ${response.status} ${await response.text()}`); return response.json(); }
async function main() {
  const headers = {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'};
  let url = `https://api.notion.com/v1/blocks/${process.env.INPUT_PAGE_ID}/children?page_size=100`;
  while (url) { const data = await request(url, {headers}); await Promise.all(data.results.map((block) => request(`https://api.notion.com/v1/blocks/${block.id}`, {method: 'PATCH', headers, body: JSON.stringify({archived: true})}))); url = data.has_more ? `${data.next_cursor ? `https://api.notion.com/v1/blocks/${process.env.INPUT_PAGE_ID}/children?page_size=100&start_cursor=${data.next_cursor}` : ''}` : ''; }
}
main().catch((error) => { console.error(error); process.exit(1); });
