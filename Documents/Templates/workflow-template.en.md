# Workflow name

A reusable GitHub Actions Workflow that [describe the workflow].

## Process

1. [Describe the first step.]
2. [Describe the second step.]

## Usage

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

## Actions used

- `action-name`
