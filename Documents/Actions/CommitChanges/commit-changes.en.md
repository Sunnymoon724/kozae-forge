# commit-changes

A GitHub Action that commits changes in a specified directory.

The commit author name is shown as `forge-bot`; authentication and the profile image still use the default GitHub Actions account.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `destination-directory` | Yes | - | Repository directory containing the changes |
| `message` | No | `Update files` | Commit message |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/commit-changes@main
  with:
    destination-directory: destination-repo
    message: Update generated content
```
