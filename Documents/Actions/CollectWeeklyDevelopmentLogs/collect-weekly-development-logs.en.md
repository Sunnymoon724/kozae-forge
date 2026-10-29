# Collect weekly development logs

Collects daily Markdown logs and detects missing dates within a resolved period. Resolve dates with `resolve-weekly-period` and find images with `find-referenced-media`.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `start-date` | Yes | First date in `YYYY-MM-DD` |
| `end-date` | Yes | Last date in `YYYY-MM-DD` |
| `log-directory` | Yes | Directory containing dated Markdown logs |
| `log-file-suffix` | No | Suffix after the date; default `-development-log.md` |
| `log-subdirectories` | No | Comma-separated member folders to scan under `log-directory`; use `.` to include root-level logs |

Missing weekdays are reported separately from missing weekend dates. Embedded image Markdown is removed from the combined source. The resolved period determines the upper date limit.
When member folders are configured, all existing posts for a date are combined; that date counts as missing only when none of those folders has a post.

## Outputs

| Output | Description |
|---|---|
| `has-content` | Whether at least one daily log was found |
| `source-files` | Newline-delimited collected Markdown file paths |
| `missing-dates` | Comma-separated missing dates |
| `missing-weekdays` | Comma-separated missing Monday–Friday dates |
| `source` | Combined daily log text without image Markdown |

## Input example

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-weekly-development-logs@main
  with:
    start-date: ${{ steps.period.outputs.start-date }}
    end-date: ${{ steps.period.outputs.end-date }}
    log-directory: Chronicle/blog
```

## Output example

```yaml
has-content: 'true'
missing-weekdays: 2026-10-20, 2026-10-22
```
