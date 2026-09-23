for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

const p = process.env;
const headers = {Authorization: `Bearer ${p.INPUT_TOKEN}`, Accept: 'application/vnd.github+json'};
const marker = `<!-- kozae-forge-mirror:source-issue=${p.INPUT_SOURCE_ISSUE_NUMBER} -->`;

async function main() {
  const url = `https://api.github.com/repos/${p.INPUT_DESTINATION_REPOSITORY}/issues/${p.INPUT_ISSUE_NUMBER}`;
  const found = await fetch(url, {headers});
  if (!found.ok) throw new Error(await found.text());
  const issue = await found.json();
  if (issue.pull_request || !(issue.body || '').includes(marker)) {
    throw new Error(`Refused to delete destination issue ${p.INPUT_ISSUE_NUMBER}: mirror marker did not match source issue ${p.INPUT_SOURCE_ISSUE_NUMBER}.`);
  }

  console.log(`Deleting mirrored issue: source #${p.INPUT_SOURCE_ISSUE_NUMBER} -> destination #${p.INPUT_ISSUE_NUMBER}`);
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {...headers, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `mutation DeleteIssue($input: DeleteIssueInput!) { deleteIssue(input: $input) { repository { nameWithOwner } } }`,
      variables: {input: {issueId: issue.node_id}},
    }),
  });
  const result = await response.json();
  if (!response.ok || result.errors?.length) throw new Error(JSON.stringify(result));
}

main().catch((error) => { console.error(error); process.exit(1); });
