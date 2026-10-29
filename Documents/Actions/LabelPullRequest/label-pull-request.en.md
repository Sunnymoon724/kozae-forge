# label-pull-request

Add labels to an existing pull request.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token |
| `pull-request-number` | Yes | - | PR number |
| `labels` | Yes | - | Comma-separated label names |

## Outputs

This Action has no outputs.

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/label-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    pull-request-number: ${{ steps.pull-request.outputs.pull-request-number }}
    labels: documentation, automated
```

## Output example

Successful completion means the labels were applied.
