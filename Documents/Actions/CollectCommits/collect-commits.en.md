# collect-commits

A GitHub Action that collects the actual Git diff from commits in a specified time range and timezone.

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
| `changes-file` | - | Path to the collected Git diff file |

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

Collected changes are written to a temporary patch file. Use the `changes-file` output as the `source-file` input of the next step. This avoids GitHub Actions output-size limits for large diffs.

## Output example

```yaml
has-content: true
changes-file: /tmp/kozae-forge-git-diff.patch
```
