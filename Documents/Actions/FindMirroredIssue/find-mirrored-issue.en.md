# find-mirrored-issue

Finds a destination issue from its internal source issue marker.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `destination-repository` | Yes | - | Destination repository |
| `source-issue-number` | Yes | - | Source issue number |
| `mirrors` | No | Empty | Optional JSON list of previously collected mirror mappings |

## Outputs

| Output | Default | Description |
|---|---|---|
| `issue-number` | - | Matching destination issue number |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/find-mirrored-issue@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-repository: OWNER/REPOSITORY
    source-issue-number: 12
    mirrors: '[{"sourceIssueNumber":12,"destinationIssueNumber":3}]'
```

## Output example

```yaml
issue-number: 42
```
