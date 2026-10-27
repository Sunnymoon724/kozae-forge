# Create and merge pull request

A reusable Workflow that creates or reuses a pull request after the calling repository's build, merges it automatically when the tested commit is still current, and sends a Discord notification only when the build or merge needs attention.

## 1. Process

1. Find an open pull request for the source and target branches, or create one.
2. If the caller's build succeeded, merge the pull request when its head still matches the tested commit and GitHub reports no conflict.
3. Send a Discord message only when the build fails or GitHub reports a merge conflict. If no webhook URL is provided, skip the notification.

Text conflicts that GitHub can resolve may be fixed in the pull request's web interface. Binary assets such as Unreal `.uasset` files usually need to be resolved locally and pushed to the source branch.

## 2. Usage

### Permissions and optional Discord webhook

The calling Workflow must grant `contents: write` and `pull-requests: write`. Pass a token with permission to create and merge pull requests. To enable exception messages, register this repository secret:

```text
Settings → Secrets and variables → Actions → DISCORD_WEBHOOK_URL
```

If the Discord secret is omitted or empty, the workflow continues without sending a message.

### Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-branch` | Yes | - | Branch to merge into the target |
| `source-sha` | Yes | - | Commit SHA that the caller's build tested |
| `target-branch` | No | `main` | Destination branch |
| `build-result` | Yes | - | Caller build result, such as `success` or `failure` |
| `pull-request-title` | No | `Merge changes into main` | Pull request title |
| `pull-request-body` | No | `Created automatically after a branch update.` | Pull request description |

### Secrets

| Secret | Required | Description |
|---|---:|---|
| `token` | Yes | Token with pull request create and merge permissions |
| `discord_webhook_url` | No | Discord webhook for build or merge exceptions |

```yaml
name: Build and merge

on:
  push:
    branches-ignore: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  build:
    runs-on: self-hosted
    steps:
      # Add this repository's build steps here.
      - run: echo "replace with build steps"

  create-and-merge:
    if: always() && needs.build.result != 'cancelled'
    needs: build
    uses: Sunnymoon724/kozae-forge/.github/workflows/create-and-merge-pull-request.yml@main
    with:
      source-branch: ${{ github.ref_name }}
      source-sha: ${{ github.sha }}
      target-branch: main
      build-result: ${{ needs.build.result }}
      pull-request-title: Merge ${{ github.ref_name }} into main
    secrets:
      token: ${{ github.token }}
      discord_webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

## 3. Notes

- A newer push before merge prevents this run from merging an untested commit; the newer push should run the build again.
- A failed build leaves the pull request open and sends an exception notification.
- A merge conflict leaves the pull request open and sends an exception notification. Conflicts are not resolved automatically.
- Other merge errors, such as a permission or branch-protection restriction, fail the workflow but do not send a Discord message.
- Branch protection and repository rules still apply to the token used by the caller.
