# Changelog

## 0.16.4

- Moved Notion database upsert steps into the file-summary Workflow and removed the unused composite publishing Action.

## 0.16.3

- Removed the project-specific blog title Action; Durian now sets generated daily post titles in its own workflow.

## 0.16.2

- Changed the default weekly period label to `YYYY-MM-DD~YYYY-MM-DD` while retaining custom display templates.

## 0.16.1

- Made `resolve-weekly-period` return a format-configurable period label without a report suffix; Durian and Rabbit now append their own weekly-report title.

## 0.16.0

- Converted `publish-notion-database` from a reusable Workflow to a composite Action and updated the file-summary Workflow to publish within its summarization job.

## 0.15.0

- Renamed the reusable commit-based AI content generation Workflow to `generate-content-from-commits` and updated Durian and Rabbit callers without changing behavior.

## 0.14.0

- Moved weekly-log collection and missing-weekday alerts into Durian and Rabbit, reused the file-summary-to-Notion Workflow for publishing, and removed the redundant weekly Workflow.
- Added optional Notion upsert, date, and image inputs to preserve weekly report behavior.

## 0.13.0

- Renamed the file-summary-to-Notion Workflow and its combining Action to reflect support for arbitrary UTF-8 text filenames, and updated Durian and Rabbit callers.

## 0.12.1

- Combined selected Markdown files into one AI summary and Notion entry using a caller-provided title, without requiring dates in filenames.
- Exposed display-formatted commit-log dates for callers that still want date-based titles.

## 0.12.0

- Renamed the Markdown-to-AI-summary-to-Notion workflow and clarified its general purpose while preserving its existing date-based file handling.

## 0.11.0

- Moved the Durian-specific mirrored-issue-to-Notion and orchestration Workflows into Project Durian; kept issue mirroring reusable in Forge.

## 0.10.5

- Split pull-request publishing into commit, guarded push, PR creation, and label Actions; updated Durian and Rabbit callers.
- Split blog title preparation from media linking.
- Split weekly report period resolution and media lookup from daily log collection.

## 0.10.4

- Extracted commit-log date resolution and multi-day commit collection into focused Actions without adding checkouts.
- Moved public image link preparation and orphaned mirror comparison from reusable Workflows into Actions.

## 0.10.3

- Composed focused branch-merge, pull-request, and webhook Actions in the reusable merge-or-PR Workflow instead of embedding API and Discord scripts.

## 0.10.2

- Allowed pull-request creation to stage selected paths and protected remote branches from concurrent force-push overwrites.

## 0.10.1

- Added distinct artifact prefixes for concurrent author-filtered commit-log calls.
- Kept an empty generated-content artifact when an author has no commits, avoiding missing-artifact download errors.
- Packaged only files downloaded in the current run, preventing stale self-hosted workspace files from appearing in reports.
- Allowed weekly reports to combine daily posts from multiple member folders.

## 0.10.0

- Added a reusable weekly development log workflow and a focused daily-log collection action, including missing-weekday alerts and Notion publication.

## 0.9.0

- Added a reusable workflow that coordinates issue mirroring, Notion synchronization, and full-refresh deletion handling for caller repositories.

## 0.8.0

- Added a reusable mirrored-issue Notion workflow so event, single-issue, and full-refresh callers share the same synchronization steps.

## 0.7.1

- Summarized oversized AI inputs in UTF-8-safe chunks before generating one final document, and applied this to daily commit logs.

## 0.7.0

- Added a reusable workflow that summarizes generated Markdown files and publishes dated Notion reports.
- Allowed commit-log callers to provide prompt and template file paths, avoiding separate prompt preparation jobs.
- Exposed resolved dates and an optional branch name from the existing commit-log workflow so callers do not resolve the same dates twice.
- Added a reusable action to set generated blog post titles and append links to matching date-based media files.

## 0.6.7

- Removed the GitHub issue-comment webhook Worker and disabled issue-comment events in the reusable issue-mirroring workflow.

## 0.6.6

- Added an option to exclude merge commits from reusable commit-log generation.

## 0.6.5

- Used the caller's automatically issued `GITHUB_TOKEN` directly in the reusable workflow, retaining the custom token secret only for caller compatibility.

## 0.6.4

- Removed CommonJS `require()` from the reusable workflow's ESM-detected Node.js script to prevent ambiguous module format errors.

## 0.6.3

- Fixed Node.js workflow scripts failing on Node.js 22+ by keeping `require()` and `await` inside async functions.

## 0.6.2

- Merged source branches directly into the target when conflict-free, creating a pull request and optional Discord alert only when a merge conflict occurs.
- Kept the previous build-result input for compatibility while making it optional for new callers.

## 0.6.1

- Added a reusable Windows Action for building Unreal project targets with configurable engine, project, platform, and configuration inputs.

## 0.6.0

- Added a reusable Workflow that creates or reuses a pull request, merges it after a successful caller build, and sends optional Discord notifications for build or merge exceptions.

## 0.5.0

- Added a reusable Workflow for merging multiple branches into a target branch in order.

## 0.4.24

- Disabled reasoning output for OpenAI-compatible content requests so the generated content is returned in the expected response field.

## 0.4.23

- Included the hidden `.commit-data` directory when uploading the collected commits artifact.

## 0.4.22

- Added diagnostic logs for commit collection and generated commit files.

## 0.4.21

- Always created the commit collection artifact with an empty marker when the selected range has no commits.

## 0.4.20

- Skipped downloading the commit collection artifact when the selected date range has no commits.

## 0.4.19

- Skipped Git LFS file downloads while cloning destination repositories to reduce mirror time and memory use.

## 0.4.18

- Made mirrored issue collection include the destination issue title so Notion entries can be found without a missing source-issue property.
- Updated the Project Durian mirror workflow to use the existing Notion title property.

## 0.4.17

- Changed the mirrored issue link label in Notion entries to [이슈 링크].
- Added stable source issue number lookup for Notion entries.
- Added Notion entry archiving for removed or deleted mirrored issues.
- Removed the issue-specific Notion publishing wrapper; workflows now compose the existing Notion actions directly.

## 0.4.16

- Added a composite action to sync mirrored public issues to Notion.

## 0.4.15

- Extended Notion database publishing with inferred title properties, Status fields, inline content, and Markdown block conversion.
- Kept existing plain-text publishing behavior as the default.

## 0.4.14

- Added the `issue-only` option for filtering pull request comments from `issue_comment` workflows.

## 0.4.13

- Added Notion PNG/GIF uploads and image blocks for database entries.

## 0.4.12

- Added single-issue mirroring, missing-label handling, full mirror reconciliation, and safe deletion of mirrors whose source issues were deleted.

## 0.4.11

- Fixed the `find-mirrored-issue` output description YAML so the Action can load correctly.
- Quoted comma-containing flow-style YAML descriptions so all reusable Actions load correctly.

## 0.4.10

- Added reusable review Actions for Git diffs, SHA-range commits, branch configuration checks, and open-issue collection.
- Renamed Git commit collection Actions to `collect-commits-by-time` and `collect-commits-by-sha`.
- Removed the redundant repository input from `collect-commits-by-sha`; source URLs use the running repository.

## 0.4.9

- Extended `generate-commit-log` to process one date or a date range and combine generated files into one artifact.

## 0.4.8

- Fixed input normalization order in 20 Actions so hyphenated inputs are available before each Action reads them.

## 0.4.7

- Fixed `request-content` input normalization so hyphenated inputs such as `api-base` and `api-key` are available before the API request starts.

## 0.4.6

- Scoped Git LFS authorization headers to `github.com` so GitHub credentials are not sent to presigned S3 upload URLs.

## 0.4.5

- Forced the Git LFS upload process to use HTTP/1.1 to avoid self-hosted Runner S3 upload failures caused by HTTP/2 transport incompatibility.

## 0.4.4

- Increased the default Git LFS concurrent uploads to five while keeping three retries per object.

## 0.4.3

- Set balanced Git LFS upload defaults of three concurrent transfers and three retries per object to avoid long-running failed mirror jobs.

## 0.4.2

- Reduced Git LFS uploads to one concurrent transfer, increased per-object retry handling, and extended the upload timeout for unreliable self-hosted Runner networks.

## 0.4.1

- Fixed GitHub Token input forwarding and replaced token-bearing Git URLs with authorization headers for clone, LFS upload, and push operations.
- Renamed the destination repository Secret from `PUBLIC_REPO_TOKEN` to `DESTINATION_REPO_TOKEN` for public and private destinations.
- Reused an existing open pull request when generated-content synchronization runs again for the same branch.
- Added non-interactive authentication and a timeout to destination repository cloning.
- Changed Git HTTPS authentication to Basic authorization headers for GitHub token compatibility without exposing the token in repository URLs.
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
