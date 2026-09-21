for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const {appendFileSync} = require('node:fs');
const {GITHUB_OUTPUT, GITHUB_REPOSITORY, INPUT_MAX_ISSUES: maxIssuesInput, INPUT_TOKEN: token} = process.env;
if (!token) throw new Error('token input is required.');
if (!GITHUB_REPOSITORY || !/^[^/]+\/[^/]+$/.test(GITHUB_REPOSITORY)) throw new Error('GITHUB_REPOSITORY must use owner/repository format.');

const maxIssues = Number(maxIssuesInput);
if (!Number.isInteger(maxIssues) || maxIssues < 1 || maxIssues > 100) throw new Error('max-issues must be an integer between 1 and 100.');

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function getJson(url) {
  const response = await fetch(url, {headers});
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status}): ${await response.text()}`);
  return response.json();
}

async function main() {
  const encodedRepository = GITHUB_REPOSITORY.split('/').map(encodeURIComponent).join('/');
  const listed = await getJson(`https://api.github.com/repos/${encodedRepository}/issues?state=open&per_page=${maxIssues}`);
  const issues = [];
  for (const issue of listed.filter((value) => !value.pull_request)) {
    const comments = issue.comments > 0 ? await getJson(`${issue.comments_url}?per_page=100`) : [];
    issues.push({
      number: issue.number,
      title: issue.title,
      body: issue.body,
      labels: issue.labels.map((label) => ({name: label.name})),
      comments: comments.map((comment) => ({
        author: comment.user?.login || null,
        body: comment.body,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      })),
    });
  }
  const delimiter = `KOZAE_ISSUES_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  appendFileSync(GITHUB_OUTPUT, `issues<<${delimiter}\n${JSON.stringify(issues)}\n${delimiter}\nhas-issues=${issues.length > 0}\n`);
  console.log(`Collected ${issues.length} open issue(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
