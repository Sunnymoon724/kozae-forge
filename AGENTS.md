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
- Update the relevant documentation when an action changes.
- Keep `VERSION` and the latest `CHANGEDLOG.md` entry in sync for releases.
- Preserve both English and Korean README files when updating project-level documentation.
