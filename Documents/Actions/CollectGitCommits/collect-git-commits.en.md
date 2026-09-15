# collect-git-commits

Collects Git commits in a selected time range.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `start-time` | Yes | - | Start time in `YYYY-MM-DD HH:mm` format |
| `end-time` | Yes | - | End time in `YYYY-MM-DD HH:mm` format |
| `timezone` | Yes | - | IANA timezone |
| `author` | No | Empty | Author name or email filter |
| `authors` | No | Empty | Comma-separated author filters |

## Outputs

| Output | Description |
|---|---|
| `has-content` | Whether commits were found |
| `commits` | Collected commit messages |
