# Issue mirroring

Synchronizes issues with the `mirror:sync` label from a source repository to a destination repository. It works regardless of repository visibility and supports single-issue event synchronization and full reconciliation.

## 1. Process

For an issue event, only the event issue is processed. An issue is created or updated only when it has the `mirror:sync` label. If an existing mirror loses that label, the destination issue is kept, closed, and marked with `mirror:missing`.

For `workflow_dispatch` and `schedule`, the workflow compares all source issues with all destination issues carrying the `kozae-forge-mirror` marker. A source issue that no longer exists causes its destination mirror to be deleted. A source issue that still exists but only lost `mirror:sync` is kept and marked `closed + mirror:missing`.

Temporary GitHub API failures such as rate limits and server errors are retried with a short backoff. Create requests are not automatically retried to avoid duplicate issues.

## 2. Usage

### Token registration

Register the `DESTINATION_REPO_TOKEN` Actions secret in the source repository. The token must write destination issues. The calling repository's `GITHUB_TOKEN` reads source issues.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
DESTINATION_REPO_TOKEN
```

Pass this Secret to the reusable Workflow from the calling repository:

```yaml
secrets:
  DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `runner` | No | `ubuntu-latest` | Runner label used for workflow jobs |
| `destination-repository` | Yes | - | Destination repository in `OWNER/REPOSITORY` format |
| `mirror-label` | No | `mirror:sync` | Source label that selects issues for mirroring |
| `missing-label` | No | `mirror:missing` | Label added when an existing mirror loses the mirror label |
| `source-issue-number` | No | Empty | Optional source issue number for single-issue synchronization |
| `issue-only` | No | `true` | Ignore pull request comments when the event is `issue_comment` |
| `sync-comments` | No | `false` | Reserved comment synchronization option |
| `sync-milestones` | No | `false` | Reserved milestone synchronization option |
| `sync-assignees` | No | `false` | Reserved assignee synchronization option |

### Workflow configuration

Create `.github/workflows/mirror-issues.yml` in the source repository:

```yaml
name: Mirror issues

on:
  issues:
    types: [opened, edited, labeled, unlabeled, closed, reopened]
  workflow_dispatch:
  schedule:
    - cron: '17 * * * *'

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-issues.yml@main
    with:
      runner: self-hosted
      destination-repository: OWNER/DESTINATION-REPOSITORY
      mirror-label: mirror:sync
      missing-label: mirror:missing
      source-issue-number: ${{ github.event.issue.number }}
      issue-only: true
      sync-comments: false
      sync-milestones: false
      sync-assignees: false
    secrets:
      DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

## 3. Actions used

- `collect-issues`
- `find-mirrored-issue`
- `create-issue`
- `update-issue`
- `sync-issue-labels`
- `sync-issue-state`
- `collect-mirrored-issues`
- `delete-mirrored-issue`
