# clone-destination-repository

A GitHub Action that clones a destination repository using a GitHub token and initializes Git LFS.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `token` | Yes | - | GitHub token used to access the destination repository |
| `repository` | Yes | - | Destination repository (`owner/name`) |
| `destination-directory` | Yes | - | Directory where the repository is cloned |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/clone-destination-repository@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
    destination-directory: destination-repo
```
