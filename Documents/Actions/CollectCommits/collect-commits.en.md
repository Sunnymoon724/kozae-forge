# collect-commits

A GitHub Action that collects Git commits in a specified time range and timezone.

## Inputs

| Name | Required | Default | Description |
|---|---:|---|---|
| `author` | No | Empty | Author name or email filter; empty collects commits from all authors |
| `start-time` | Yes | - | Start time in `YYYY-MM-DD HH:mm` format |
| `end-time` | Yes | - | End time in `YYYY-MM-DD HH:mm` format |
| `timezone` | Yes | - | IANA timezone used to interpret the time range |

## Outputs

| Output | Default | Description |
|---|---|---|
| `has-content` | `false` | `true` when commits were found |
| `commits` | - | Collected commit message text |

## Input example

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-commits@main
  with:
    start-time: '2026-09-01 00:00'
    end-time: '2026-09-08 00:00'
    timezone: Asia/Seoul
    author: Jane Doe
```

Collected commits are passed to the next step as text through the `commits` output.

## Output example

```yaml
has-content: true
commits: |
  - Fix login error (a1b2c3d)
  - Update documentation (e4f5g6h)
```
