# commit-pull-request-changes

Stage selected paths and commit changes on a review branch. No remote push or PR API call is made.

Git trusts only the current checkout for these commands, so the Action also works when a self-hosted runner service uses an account different from the checkout owner.

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
