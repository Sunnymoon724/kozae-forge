# Issue mirroring

Synchronizes issues with the `mirror:public` label from a private source repository to a public destination repository.

## 1. Process

The source issues are read, and only issues with the configured visibility label are selected. The destination issue is created or updated using an internal source issue marker. Titles, bodies, states, and labels are synchronized, except for the visibility label. Attachments are not copied.

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
| `visibility-label` | No | `mirror:public` | Source label that selects issues |
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

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-issues.yml@main
    with:
      runner: self-hosted
      destination-repository: OWNER/PUBLIC-REPOSITORY
      visibility-label: mirror:public
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
