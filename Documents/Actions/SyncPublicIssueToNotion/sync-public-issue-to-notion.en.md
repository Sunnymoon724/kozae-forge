# sync-public-issue-to-notion

Finds the mirrored public issue and creates or updates its entry in a Notion database.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `github-token` | Yes | - | Token with read access to the destination repository |
| `destination-repository` | Yes | - | Destination repository in `owner/name` format |
| `source-issue-number` | Yes | - | Source issue number |
| `issue-title` | Yes | - | Issue title used as the Notion entry title |
| `issue-body` | No | Empty | Issue body published as Markdown |
| `issue-state` | Yes | - | Issue state used to resolve the Notion Status value |
| `issue-labels` | No | `[]` | JSON array of issue labels used to resolve the Status value |
| `data-source-url` | Yes | - | Notion database URL |
| `status-property` | Yes | - | Notion Status property name |
| `notion-token` | Yes | - | Notion integration token |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-public-issue-to-notion@main
  with:
    github-token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-repository: OWNER/REPOSITORY
    source-issue-number: 12
    issue-title: Example issue
    issue-body: Issue description
    issue-state: open
    issue-labels: '[]'
    data-source-url: ${{ vars.NOTION_ISSUE_DATA_SOURCE_URL }}
    status-property: 상태
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
