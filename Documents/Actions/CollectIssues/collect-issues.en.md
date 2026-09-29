# collect-issues

A GitHub Action that collects issues selected by a label.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with source issue read access |
| `source-repository` | Yes | - | Source repository in `owner/name` format |
| `mirror-label` | Yes | - | Label that selects issues for mirroring |
| `include-unlabeled` | No | `false` | Include issues without the visibility label |
| `issue-number` | No | Empty | Collect one issue by number |
| `output-mode` | No | `full` | Use `numbers` to output only issue numbers |

## Outputs

| Output | Default | Description |
|---|---|---|
| `issues` | - | JSON array of selected issues |
| `issue` | - | Selected issue as a JSON object when `issue-number` is set |

## Input example

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-issues@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    source-repository: OWNER/PRIVATE-REPOSITORY
    mirror-label: mirror:sync
```

## Output example

```yaml
issues: '[{"number":1,"title":"Example issue"}]'
```
