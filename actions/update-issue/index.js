for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

async function main() { const issue = JSON.parse(process.env.INPUT_ISSUE); const body = `${issue.body || ''}\n\n<!-- kozae-forge-mirror:source-issue=${issue.number} -->`; const r = await fetch(`https://api.github.com/repos/${process.env.INPUT_DESTINATION_REPOSITORY}/issues/${process.env.INPUT_ISSUE_NUMBER}`, {method: 'PATCH', headers: {Authorization: `Bearer ${process.env.INPUT_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json'}, body: JSON.stringify({title: issue.title, body})}); if (!r.ok) throw new Error(await r.text()); } main().catch((e) => { console.error(e); process.exit(1); });
