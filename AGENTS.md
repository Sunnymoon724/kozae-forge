# AGENTS.md

## Project overview

KoZae Forge is a collection of reusable GitHub Actions for KoZae projects.

## Repository structure

- `actions/`: Reusable GitHub Actions
- `Documents/`: Action documentation
- `Documents/Templates/`: English templates for Action and Workflow documentation
- `.github/workflows/`: Repository workflows
- `README.md`: Project overview
- `README.en.md`: English documentation
- `README.ko.md`: Korean documentation
- `VERSION`: Current project version
- `CHANGEDLOG.md`: Change history

## Change guidelines

- Keep reusable actions self-contained under `actions/`.
- Start each Action `name` with a verb and capitalize only its first word (for example, `Generate content`).
- Use the corresponding file in `Documents/Templates/` as the structure for new Action and Workflow documentation.
- Use `Documents/Templates/action.yml` as the structure for new composite Action definitions.
- Write the English documentation first using the applicable template, then create the matching Korean documentation with the same structure when documentation is required.
- When an Action or Workflow is added, removed, renamed, or changed, update its related documentation and the appropriate README entries in the same change.
- After adding or modifying documentation, update the related Workflow or README when the documented usage, links, or feature list is affected.
- Keep `VERSION` and the latest `CHANGEDLOG.md` entry in sync for releases.
- Preserve both English and Korean README files when updating project-level documentation.

## Read-only work

- Do not ask for confirmation before reading files, searching the repository, checking status, or performing other read-only inspection that does not change repository state.
