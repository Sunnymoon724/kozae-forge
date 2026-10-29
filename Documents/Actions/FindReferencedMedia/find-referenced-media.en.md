# find-referenced-media

Find local PNG/GIF files referenced by Markdown images in selected files.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `source-files` | Yes | - | Newline-separated Markdown files |
| `media-directory` | Yes | - | Local image directory |

## Outputs

| Output | Description |
|---|---|
| `image-files` | Newline-separated matching local image paths |

## Input example

```yaml
- id: media
  uses: Sunnymoon724/kozae-forge/actions/find-referenced-media@main
  with:
    source-files: ${{ steps.collect-logs.outputs.source-files }}
    media-directory: Chronicle/static/media
```

## Output example

```yaml
image-files: Chronicle/static/media/2026-10-19-01.png
```
