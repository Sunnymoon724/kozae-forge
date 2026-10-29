# collect-dated-commits

A GitHub Action that collects commit messages for multiple dates from one checked-out repository. It writes `.commit-data/YYYY-MM-DD.txt` for dates with commits. When no date has commits, it writes `.commit-data/no-commits.txt` so artifact upload still succeeds.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `dates` | Yes | - | JSON array of `YYYY-MM-DD` dates |
| `timezone` | Yes | - | IANA timezone for day boundaries |
| `authors` | No | Empty | Comma-separated Git author filters |
| `exclude-merge-commits` | No | `false` | Exclude merge commits |

## Outputs

| Output | Default | Description |
|---|---|---|
| `has-content` | - | Whether any date has commits |

## Input example

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- id: commits
  uses: Sunnymoon724/kozae-forge/actions/collect-dated-commits@main
  with:
    dates: '["2026-10-01","2026-10-02"]'
    timezone: Asia/Seoul
    authors: KoZae_home,KoZae_out_1
    exclude-merge-commits: 'true'
```

## Output example

```yaml
has-content: 'true'
```
