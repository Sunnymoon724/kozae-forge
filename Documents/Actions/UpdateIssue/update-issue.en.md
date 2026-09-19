# update-issue

Updates one destination issue title and body.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `issue-number` | Yes | - | Destination issue number |
| `issue` | Yes | - | Source issue JSON object |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/update-issue@main
```
