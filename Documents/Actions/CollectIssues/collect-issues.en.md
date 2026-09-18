# collect-issues

A GitHub Action that collects issues selected by a label.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token with source issue read access |
| `source-repository` | Yes | - | Source repository in `owner/name` format |
| `visibility-label` | Yes | - | Label that selects issues |

## Outputs

| Output | Default | Description |
|---|---|---|
| `issues` | - | JSON array of selected issues |

## Input example

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-issues@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    source-repository: OWNER/PRIVATE-REPOSITORY
    visibility-label: mirror:public
```

## Output example

```yaml
issues: '[{"number":1,"title":"Example issue"}]'
```
