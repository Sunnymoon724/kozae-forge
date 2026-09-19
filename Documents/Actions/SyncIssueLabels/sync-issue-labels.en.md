# synchronize-issue-labels

Synchronizes labels to one destination issue.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `issue-number` | Yes | - | Destination issue number |
| `issue` | Yes | - | Source issue JSON object |
| `excluded-label` | Yes | - | Label not copied |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-issue-labels@main
```
