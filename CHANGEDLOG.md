# Changelog

## 0.4.1

- Fixed GitHub Token input forwarding and replaced token-bearing Git URLs with authorization headers for clone, LFS upload, and push operations.
- Renamed the destination repository Secret from `PUBLIC_REPO_TOKEN` to `DESTINATION_REPO_TOKEN` for public and private destinations.
- Reused an existing open pull request when generated-content synchronization runs again for the same branch.
- Updated related English and Korean documentation.

## 0.4.0

- Replaced the `sync-files` Action with `copy-folder` and added exclusion-list support.
- Converted all reusable Actions to single Node.js 24 Actions that run on Linux and Windows.
- Added an optional `runner` input to every reusable Workflow, defaulting to `ubuntu-latest`.
- Replaced the remaining Bash file staging step in `refine-documents` with the cross-platform `copy-file` Action.
- Fixed hyphenated input handling across all Node.js Actions and added a non-interactive push timeout.
- Replaced token-bearing Git URLs with HTTP authorization headers for clone, LFS upload, and push operations.
- Updated related workflows, English and Korean documentation, and README entries.

## 0.3.16

- Added `copy-file`, `copy-folder`, `validate-npm-build`, and `notify-webhook` Actions.
- Updated `generate-commit-log` to create generated files in the job workspace root and pass them through the `generated-content` artifact.
- Organized the English and Korean README feature lists by category.

## 0.3.15

- Removed the single-author input from Git commit collection and commit log generation.

## 0.3.14

- Used a non-hidden directory for refined document artifacts.

## 0.3.13

- Used the calling repository token when collecting source issues for issue mirroring.

## 0.3.12

- Fixed YAML input metadata for the Git commit collection Action.

## 0.3.11

- Removed the redundant content artifact download Action.

## 0.3.10

- Consolidated Git LFS initialization into remote configuration.

## 0.3.9

- Consolidated file reading into content preparation and file writing or copying into content saving.

## 0.3.8

- Removed duplicate commit collection and content file copy Actions.

## 0.3.7

- Fixed YAML output metadata for the Git commit collection Action.

## 0.3.6

- Added metadata descriptions for the Git commit collection Action inputs and outputs.

## 0.3.5

- Added metadata descriptions for content request, content preparation, and Notion page lookup Actions.

## 0.3.4

- Added descriptions for content-size validation Action inputs.

## 0.3.3

- Standardized Action metadata descriptions in English.

## 0.3.2

- Renamed `upload-lfs` to `upload-git-lfs-objects`.

## 0.3.1

- Renamed focused Actions to match their responsibilities and removed the duplicate `generate-content` Action.

## 0.3.0

- Added reusable Notion page and database entry publishing Workflows.

## 0.2.11

- Separated document source collection from document target mapping.

## 0.2.10

- Separated content generation, Notion publishing, and Git LFS remote configuration responsibilities.

## 0.2.9

- Separated Git commit collection from date-range calculation.

## 0.2.8

- Separated destination repository cloning from Git LFS initialization.
- Added focused content preparation, content-size validation, and AI request Actions.

## 0.2.6

- Renamed the Notion URL input to `source-url`.

## 0.2.5

- Renamed the Notion URL input to `data-source-url` to match the public Action interface.

## 0.2.4

- Replaced `publish-notion-database`'s `data-source-id` input with a Notion `database-url` input.

## 0.2.3

- Replaced `generate-commit-log`'s `output-file` input with `output-directory` and `tag` inputs.

## 0.2.2

- Updated `save-content` to save a provided source file without downloading artifacts.

## 0.2.1

- Always upload generated commit logs as the `generated-content` artifact, including when `output-file` is set.

## 0.2.0

- Updated repository Workflows and Actions.

## 0.1.2

- Improved `publish-notion-database` to create or update entries by title.
- Added grouping and optional date property inputs for Notion database entries.
- Added trash-page handling and detailed Notion API error diagnostics.
- Updated Notion API block handling for `2026-03-11`.
- Added author filtering and author names to `collect-commits` output.
- Updated commit author display to `forge-bot`.

## 0.1.1

- Added reusable commit log generation and content saving Workflows.
- Added reusable content, commit, push, copy, and commit collection Actions.
- Added Korean and English documentation for Workflows and Actions.
- Added configurable AI API, model, prompt, time range, and output options.

## 0.1.0

- Initial release
- Added reusable GitHub Actions for repository mirroring and file synchronization
