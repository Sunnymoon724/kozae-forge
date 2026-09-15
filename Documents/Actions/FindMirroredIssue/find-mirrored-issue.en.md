# find-mirrored-issue

Finds a destination issue from its internal source issue marker.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `source-issue-number` | Yes | - | Source issue number |

## Outputs

| Output | Default | Description |
|---|---|---|
| `issue-number` | - | Matching destination issue number |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/find-mirrored-issue@main
```

## Output example

```yaml
issue-number: 42
```
