# clone-destination-repository

A GitHub Action that clones a destination repository to a selected depth using a GitHub token and initializes Git LFS without downloading LFS file contents during clone.

Authentication is passed through Git's temporary authorization configuration, and interactive credential prompts are disabled.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token used to access the destination repository |
| `repository` | Yes | - | Destination repository (`owner/name`) |
| `destination-directory` | Yes | - | Directory where the repository is cloned |
| `depth` | No | `1` | Clone depth. Use `0` to clone the full history. |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/clone-destination-repository@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
    destination-directory: destination-repo
    depth: 1
```
