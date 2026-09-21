# collect-commits-by-time

Collects Git commits in a selected time range.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `start-time` | Yes | - | Start time in `YYYY-MM-DD HH:mm` format |
| `end-time` | Yes | - | End time in `YYYY-MM-DD HH:mm` format |
| `timezone` | Yes | - | IANA timezone |
| `authors` | No | Empty | Comma-separated author filters |

## Outputs

| Output | Description |
|---|---|
| `has-content` | Whether commits were found |
| `commits` | Collected commit messages |

## Input example

```yaml
- id: commits
  uses: Sunnymoon724/kozae-forge/actions/collect-commits-by-time@main
  with:
    start-time: 2026-09-18 00:00
    end-time: 2026-09-19 00:00
    timezone: Asia/Seoul
    authors: 홍길동
```

## Output example

```yaml
has-content: true
commits: '- Add development log (abc123) [author: Jane Doe]'
```
