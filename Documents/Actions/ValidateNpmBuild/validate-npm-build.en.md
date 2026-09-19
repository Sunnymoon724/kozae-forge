# validate-npm-build

Installs npm dependencies with `npm ci` and validates the project by running `npm run build`.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `working-directory` | Yes | - | Directory containing `package.json` and `package-lock.json` |
| `node-version` | No | `20` | Node.js version to use |

## Example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/validate-npm-build@main
  with:
    working-directory: Chronicle
```
