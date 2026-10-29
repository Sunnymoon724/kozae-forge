# push-pull-request-branch

Push the current commit to a review branch with a remote-ref lease, failing when another run changed that branch.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `branch` | Yes | - | Remote review branch |

## Outputs

This Action has no outputs.

## Input example

```yaml
- if: steps.commit.outputs.changed == 'true'
  uses: Sunnymoon724/kozae-forge/actions/push-pull-request-branch@main
  with:
    branch: automation/update
```

## Output example

Successful completion means the branch was pushed.
