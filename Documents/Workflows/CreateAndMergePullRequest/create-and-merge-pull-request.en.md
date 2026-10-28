# Merge branches and create a pull request on conflict

This reusable Workflow attempts to merge the source branch directly into the target branch. It creates a pull request only when GitHub reports a merge conflict, then sends the PR link to an optional Discord webhook. This Workflow does not run a build.

## 1. Process

1. If `source-sha` is provided, verify that the source branch still points to that commit. Skip stale runs when a newer push has advanced the branch.
2. Ask GitHub to merge the source branch into the target. On success, no pull request is created.
3. If GitHub reports a merge conflict, reuse an open pull request or create one, then notify Discord if a webhook is configured.

Text conflicts may be resolved in the pull request interface. Binary assets such as Unreal `.uasset` files usually need to be resolved locally and pushed to the source branch.

## 2. Usage

Grant `contents: write` and `pull-requests: write` to the calling Workflow, and pass a token that can merge branches and create pull requests. If repository rules block direct merges, configure the token or rules to permit this operation. Permission or branch-protection errors fail the Workflow; they are not treated as merge conflicts.

To enable Discord notifications, register this repository secret:

```text
Settings → Secrets and variables → Actions → DISCORD_WEBHOOK_URL
```

If the webhook URL is omitted or empty, only the Discord notification is skipped.

### Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-branch` | Yes | - | Branch to merge into the target |
| `source-sha` | No | - | Expected source commit. Skip stale runs if the branch has advanced beyond this SHA. |
| `target-branch` | No | `main` | Destination branch |
| `build-result` | No | `success` | Compatibility input for existing callers. Any value other than `success` skips merging, creates a PR, and sends a notification. Omit it for new callers. |
| `pull-request-title` | No | `Merge changes into main` | PR title used when a conflict occurs |
| `pull-request-body` | No | Conflict notice | PR body used when a conflict occurs |

### Secrets

| Secret | Required | Description |
|---|---:|---|
| `token` | Yes | Token with `contents: write` and `pull-requests: write` permissions |
| `discord_webhook_url` | No | Discord webhook for conflict PR links |

```yaml
name: Merge branches

on:
  push:
    branches-ignore: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  merge:
    if: github.ref_type == 'branch' && github.ref != 'refs/heads/main'
    uses: Sunnymoon724/kozae-forge/.github/workflows/create-and-merge-pull-request.yml@main
    with:
      source-branch: ${{ github.ref_name }}
      source-sha: ${{ github.sha }}
      target-branch: main
      pull-request-title: Merge ${{ github.ref_name }} into main
    secrets:
      token: ${{ github.token }}
      discord_webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

## 3. Notes

- The embedded Node.js scripts run their asynchronous logic inside an async function for compatibility with Node.js 22 and later.
- This Workflow does not build or test the project. If there is no merge conflict, it updates the target branch directly.
- Only merge conflicts create a pull request. Other errors, including token permissions or branch protection, fail the Workflow.
- The `build-result` input remains for compatibility with existing callers. Passing `failure` creates a PR and sends a Discord notification, as before.
- Discord notifications include the created or reused pull request URL.
