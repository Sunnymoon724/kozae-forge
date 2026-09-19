# Validate content size

Fails when content exceeds the configured byte limit.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `content` | Yes | Content to validate |
| `max-content-bytes` | Yes | Maximum permitted content size in bytes |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/validate-content-size@main
  with:
    content: Source content
    max-content-bytes: 100000
```
