# synchronize-issue-state

Synchronizes the state of one destination issue.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `issue-number` | Yes | - | Destination issue number |
| `issue` | Yes | - | Source issue JSON object |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-issue-state@main
```
