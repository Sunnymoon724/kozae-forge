# calculate-date-range

Calculates a time range for GitHub Actions using the specified date and timezone.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `timezone` | Yes | - | IANA timezone used to calculate the time range |
| `target-date` | Yes | - | Date to calculate (`YYYY-MM-DD`) |

## Outputs

| Output | Default | Description |
|---|---|---|
| `start-time` | - | Start time (`YYYY-MM-DD HH:mm`) |
| `end-time` | - | End time (`YYYY-MM-DD HH:mm`) |
| `date` | - | Calculated target date (`YYYY-MM-DD`) |

## Input example

```yaml
- id: time-range
  uses: Sunnymoon724/kozae-forge/actions/calculate-date-range@main
  with:
    timezone: Asia/Seoul
    target-date: 2026-09-08
```


## Output example

```yaml
start-time: '2026-09-08 00:00'
end-time: '2026-09-09 00:00'
date: '2026-09-08'
```
