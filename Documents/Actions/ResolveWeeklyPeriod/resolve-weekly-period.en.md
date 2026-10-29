# resolve-weekly-period

Resolve a weekly date range from an optional Monday, stopping at yesterday in the selected timezone. The output label contains only the period; callers add their own report suffix.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `week-start` | No | Empty | Monday in `YYYY-MM-DD` |
| `timezone` | No | `Asia/Seoul` | IANA timezone |
| `period-format` | No | `{start-date}~{end-date}` | Display template. Supports `{start-date}`, `{end-date}`, and `{start-year}`, `{start-month}`, `{start-day}`, `{end-year}`, `{end-month}`, `{end-day}`. Date placeholders use `YYYY-MM-DD`; numeric month/day are not zero-padded. |

## Outputs

| Output | Description |
|---|---|
| `start-date` | First date |
| `end-date` | Last date |
| `period-label` | Formatted period without a report suffix |

## Input example

```yaml
- id: period
  uses: Sunnymoon724/kozae-forge/actions/resolve-weekly-period@main
  with:
    week-start: '2026-10-19'
```

## Output example

```yaml
start-date: '2026-10-19'
end-date: '2026-10-25'
period-label: 2026-10-19~2026-10-25
```

For a Korean-style label, use `period-format: '{start-month}월 {start-day}일~{end-month}월 {end-day}일'`. A caller can append its own suffix: `${{ format('{0} 주간보고', steps.period.outputs.period-label) }}`.
