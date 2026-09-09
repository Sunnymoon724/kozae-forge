# commit-changes

A GitHub Action that commits changes in a specified directory.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `destination-directory` | No | `public-repo` | Repository directory containing the changes |
| `message` | No | `Update files` | Commit message |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/commit-changes@main
  with:
    destination-directory: destination-repo
    message: Update generated content
```
