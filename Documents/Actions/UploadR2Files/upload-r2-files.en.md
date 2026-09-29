# upload-r2-files

Uploads files to Cloudflare R2 and returns public URLs and Markdown links.

## Inputs

| Input | Required | Description |
|---|---:|---|
| `file-paths` | Yes | Newline-delimited file paths |
| `endpoint` | Yes | R2 S3 API endpoint |
| `bucket` | Yes | R2 bucket name |
| `public-base-url` | Yes | Public URL base for the bucket |
| `access-key-id` | Yes | R2 access key ID |
| `secret-access-key` | Yes | R2 secret access key |
| `key-prefix` | No | Object key prefix |

The action returns `file-urls` and `markdown-links` outputs.
