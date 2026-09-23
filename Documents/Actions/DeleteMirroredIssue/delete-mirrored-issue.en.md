# Delete mirrored issue

Deletes a destination issue only after verifying the expected KoZae Forge mirror marker.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | Destination repository token with issue delete access |
| `destination-repository` | Yes | - | Destination repository |
| `issue-number` | Yes | - | Destination issue number |
| `source-issue-number` | Yes | - | Expected source issue number in the marker |
