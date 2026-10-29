# append-blog-media-links

Add date-matched media links to Markdown posts without changing their titles.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `directory` | Yes | - | Dated Markdown posts |
| `media-directory` | Yes | - | Dated image files |
| `media-url-prefix` | No | `/media` | Public image URL prefix |

## Outputs

This Action has no outputs.

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/append-blog-media-links@main
  with:
    directory: Chronicle/blog
    media-directory: Chronicle/static/media
```

## Output example

Matching posts contain a `## 🖼️ 참고 이미지` section.
