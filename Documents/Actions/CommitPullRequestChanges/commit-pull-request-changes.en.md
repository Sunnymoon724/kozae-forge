# commit-pull-request-changes

Stage selected paths and commit changes on a review branch. No remote push or PR API call is made.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `branch` | Yes | - | Review branch |
| `paths` | No | `.` | Newline-separated paths to stage |
| `message` | Yes | - | Commit message |

## Outputs

| Output | Description |
|---|---|
| `changed` | `true` when a commit was created |

## Input example

```yaml
- id: commit
  uses: Sunnymoon724/kozae-forge/actions/commit-pull-request-changes@main
  with:
    branch: automation/update
    paths: Chronicle/blog
    message: 'docs: update blog'
```

## Output example

```yaml
changed: 'true'
```
