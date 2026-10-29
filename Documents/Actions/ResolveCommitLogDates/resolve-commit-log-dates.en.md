# resolve-commit-log-dates

A GitHub Action that resolves one to 31 dates for commit-log generation and optionally names the output branch. Without a start date, it selects yesterday in the configured timezone.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `start-date` | No | Empty | First date, `YYYY-MM-DD`; empty selects yesterday |
| `end-date` | No | Empty | Last date, `YYYY-MM-DD`; empty selects the start date |
| `timezone` | Yes | - | IANA timezone for yesterday |
| `branch-prefix` | No | Empty | Optional output branch prefix |

## Outputs

| Output | Default | Description |
|---|---|---|
| `dates` | - | JSON array of dates |
| `start-date` | - | Resolved first date |
| `end-date` | - | Resolved last date |
| `start-date-display` | - | First date in `YYYY/MM/DD` format |
| `end-date-display` | - | Last date in `YYYY/MM/DD` format |
| `branch-name` | Empty | Prefix and dates when a prefix is supplied |

## Input example

```yaml
- id: dates
  uses: Sunnymoon724/kozae-forge/actions/resolve-commit-log-dates@main
  with:
    start-date: '2026-10-01'
    end-date: '2026-10-07'
    timezone: Asia/Seoul
    branch-prefix: chronicle-log
```

## Output example

```yaml
dates: '["2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07"]'
start-date: '2026-10-01'
end-date: '2026-10-07'
start-date-display: '2026/10/01'
end-date-display: '2026/10/07'
branch-name: chronicle-log-2026-10-01-2026-10-07
```
