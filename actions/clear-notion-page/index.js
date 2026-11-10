require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

async function request(url, options) {
  for (let attempt = 0; ; attempt += 1) {
    const response = await fetch(url, options);
    if (response.status === 409 && options.method === 'PATCH' && attempt < 3) {
      const wait = 1000 * (2 ** attempt);
      console.log(`Notion block update conflicted; retrying in ${wait}ms.`);
      await new Promise((resolve) => setTimeout(resolve, wait));
      continue;
    }
    if (!response.ok) throw new Error(`Notion request failed: ${response.status} ${await response.text()}`);
    return response.json();
  }
}
async function main() {
  const headers = {Authorization: `Bearer ${process.env.INPUT_NOTION_TOKEN}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'};
  const baseUrl = `https://api.notion.com/v1/blocks/${process.env.INPUT_PAGE_ID}/children?page_size=100`;
  const blocks = [];
  let cursor;
  do {
    const data = await request(cursor ? `${baseUrl}&start_cursor=${encodeURIComponent(cursor)}` : baseUrl, {headers});
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
    if (data.has_more && !cursor) throw new Error('Notion did not return the next block cursor.');
  } while (cursor);
  for (const block of blocks) {
    await request(`https://api.notion.com/v1/blocks/${block.id}`, {
      method: 'PATCH', headers, body: JSON.stringify({in_trash: true}),
    });
  }
}
main().catch((error) => { console.error(error); process.exit(1); });
