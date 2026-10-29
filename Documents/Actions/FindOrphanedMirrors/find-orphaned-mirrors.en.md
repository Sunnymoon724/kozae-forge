# find-orphaned-mirrors

A GitHub Action that compares source issues with mirrored issues and returns mirrors whose source issue is missing. It also returns their titles for Notion cleanup.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-issues` | Yes | - | JSON array of source issues containing `number` |
| `mirrored-issues` | Yes | - | JSON array of mirrors containing `sourceIssueNumber` |

## Outputs

| Output | Default | Description |
|---|---|---|
| `mirrors` | - | JSON array of orphaned mirrored issues |
| `titles` | - | JSON array of `{title}` objects for Notion cleanup |

## Input example

```yaml
- id: orphans
  uses: Sunnymoon724/kozae-forge/actions/find-orphaned-mirrors@main
  with:
    source-issues: '[{"number":1}]'
    mirrored-issues: '[{"sourceIssueNumber":2,"destinationIssueNumber":20,"title":"Old issue"}]'
```

## Output example

```yaml
mirrors: '[{"sourceIssueNumber":2,"destinationIssueNumber":20,"title":"Old issue"}]'
titles: '[{"title":"Old issue"}]'
```
