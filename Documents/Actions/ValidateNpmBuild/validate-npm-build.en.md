# validate-npm-build

Installs npm dependencies with Node.js 24 and validates the project by running `npm run build`.

## Inputs

| Input | Required | Default | Description |
|---|---:|---|---|
| `working-directory` | Yes | - | Directory containing `package.json` and `package-lock.json` |

## Input example

```yaml
- uses: Sunnymoon724/kozae-forge/actions/validate-npm-build@main
  with:
    working-directory: Chronicle
```
