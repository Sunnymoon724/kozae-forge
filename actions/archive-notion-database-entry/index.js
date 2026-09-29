require('../_shared/retry-fetch').installFetchRetry();
for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

async function main() {
  const p = process.env;
  const response = await fetch(`https://api.notion.com/v1/pages/${p.INPUT_PAGE_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${p.INPUT_NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2026-03-11',
    },
    body: JSON.stringify({archived: true}),
  });
  if (!response.ok) throw new Error(await response.text());
}

main().catch((error) => { console.error(error); process.exit(1); });
