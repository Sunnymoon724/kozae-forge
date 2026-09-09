# AGENTS.md

## Project overview

KoZae Forge is a collection of reusable GitHub Actions for KoZae projects.

## Repository structure

- `actions/`: Reusable GitHub Actions
- `Documents/`: Action documentation
- `.github/workflows/`: Repository workflows
- `README.md`: Project overview
- `README.en.md`: English documentation
- `README.ko.md`: Korean documentation
- `VERSION`: Current project version
- `CHANGEDLOG.md`: Change history

## Change guidelines

- Keep reusable actions self-contained under `actions/`.
- Automatically update the related documentation whenever a Workflow or Action is added, removed, or changed.
- Create the corresponding documentation file when a new Workflow or Action is added.
- When a `.ko.md` document is added or modified, add or modify its matching `.en.md` document as well.
- Keep Korean and English documentation structurally consistent.
- Update README links when Workflows, Actions, or their documentation are added, removed, renamed, or moved.
- Keep `VERSION` and the latest `CHANGEDLOG.md` entry in sync for releases.
- Preserve both English and Korean README files when updating project-level documentation.
