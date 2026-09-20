for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

const {readFileSync,appendFileSync} = require('node:fs'); async function main() { const content = readFileSync(process.env.INPUT_CONTENT_FILE,'utf8'); const body={parent:{page_id:process.env.INPUT_PARENT_PAGE_ID},properties:{title:{title:[{type:'text',text:{content:process.env.INPUT_TITLE}}]}},children:[{object:'block',type:'paragraph',paragraph:{rich_text:[{type:'text',text:{content}}]}}]}; const r=await fetch('https://api.notion.com/v1/pages',{method:'POST',headers:{Authorization:`Bearer ${process.env.INPUT_NOTION_TOKEN}`,'Content-Type':'application/json','Notion-Version':'2022-06-28'},body:JSON.stringify(body)}); if(!r.ok)throw new Error(await r.text()); appendFileSync(process.env.GITHUB_OUTPUT,`page-id=${(await r.json()).id}\n`); } main().catch(e=>{console.error(e);process.exit(1)});
