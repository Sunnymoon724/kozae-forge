# check-review-branch

Checks whether the current branch is enabled in `.github/review-config.json`.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `config-path` | No | `.github/review-config.json` | Repository-relative review configuration path |
| `branch` | No | `GITHUB_REF_NAME` | Branch to check |

The configuration file must contain a string array named `branches`.

## Outputs

| Output | Description |
|---|---|
| `branch` | Checked branch |
| `enabled` | Whether review is enabled for the branch |

## Input example

```yaml
- id: config
  uses: Sunnymoon724/kozae-forge/actions/check-review-branch@main
```

## Configuration example

```json
{"branches":["develop","main"]}
```
