# collect-open-issues

Collects open issues and their comments from the current GitHub repository.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with permission to read issues |
| `max-issues` | No | `100` | Maximum number of issues to collect |

Pull requests are excluded. The repository is read from `GITHUB_REPOSITORY`.

## Outputs

| Output | Description |
|---|---|
| `issues` | JSON array containing issue number, title, body, labels, and comments |
| `has-issues` | Whether at least one issue was found |

## Input example

```yaml
- id: issues
  uses: Sunnymoon724/kozae-forge/actions/collect-open-issues@main
  with:
    token: ${{ github.token }}
```
