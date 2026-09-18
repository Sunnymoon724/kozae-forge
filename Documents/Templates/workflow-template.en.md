# Workflow name

A reusable GitHub Actions Workflow that [describe the workflow].

## 1. Process

1. [Describe the first step.]
2. [Describe the second step.]

## 2. Usage

### Token registration

Register the required Actions secrets in the source repository.

```text
Settings → Secrets and variables → Actions
```

Secret name:

```text
SECRET_NAME
```

### Input configuration

| Input | Required | Default | Description |
|---|---:|---|---|
| `input-name` | Yes | - | Description of the input |

### Workflow configuration

```yaml
name: Workflow name

on:
  push:
    branches:
      - main

jobs:
  job-name:
    uses: Sunnymoon724/kozae-forge/.github/workflows/workflow-name.yml@main
    with:
      input-name: value
    secrets:
      SECRET_NAME: ${{ secrets.SECRET_NAME }}
```

## 3. Actions used

- `action-name`
