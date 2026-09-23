for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

async function main() { const sourceLabels = JSON.parse(process.env.INPUT_ISSUE).labels.map((v) => v.name).filter((v) => v !== process.env.INPUT_EXCLUDED_LABEL); const additionalLabels = (process.env.INPUT_ADDITIONAL_LABELS || '').split(',').map((v) => v.trim()).filter(Boolean); const labels = [...new Set([...sourceLabels, ...additionalLabels])]; const r = await fetch(`https://api.github.com/repos/${process.env.INPUT_DESTINATION_REPOSITORY}/issues/${process.env.INPUT_ISSUE_NUMBER}/labels`, {method: 'PUT', headers: {Authorization: `Bearer ${process.env.INPUT_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json'}, body: JSON.stringify({labels})}); if (!r.ok) throw new Error(await r.text()); } main().catch((e) => { console.error(e); process.exit(1); });
