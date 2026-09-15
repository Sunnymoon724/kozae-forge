# create-issue

Creates one destination issue from source issue data.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `issue` | Yes | - | Source issue JSON object |

## Outputs

| Output | Default | Description |
|---|---|---|
| `issue-number` | - | Created issue number |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-issue@main
```

## Output example

```yaml
issue-number: 42
```
