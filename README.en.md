# KoZae Forge

Reusable Actions run as Node.js 24 Actions on Linux and Windows runners.

Reusable GitHub Actions and Workflows for KoZae projects.

## ✨ Available features

- Workflow
  - Content generation and publishing
    - [Generate content from commits](Documents/Workflows/GenerateContentFromCommits/generate-content-from-commits.en.md)
      - Supports concurrent author-specific runs with distinct artifact prefixes.
      - Resolves dates and collects all selected days with one checkout.
    - [Summarize files to Notion](Documents/Workflows/SummarizeFilesToNotion/summarize-files-to-notion.en.md)
      - Supports optional upsert, Notion dates, and image links for weekly reports.
    - [Refine documents](Documents/Workflows/RefineDocuments/refine-documents.en.md)
    - [Publish Notion page](Documents/Workflows/PublishNotionPage/publish-notion-page.en.md)
  - Repository and issue automation
    - [Repository mirroring](Documents/Workflows/MirrorRepository/mirror-repository.en.md)
    - [Merge branches](Documents/Workflows/MergeBranches/merge-branches.en.md)
    - [Merge branches and create a pull request on conflict](Documents/Workflows/CreateAndMergePullRequest/create-and-merge-pull-request.en.md) (composes focused merge, PR, and notification Actions)
    - [Issue mirroring](Documents/Workflows/MirrorIssues/mirror-issues.en.md)

- Action
  - Content and files
    - [Prepare content](Documents/Actions/PrepareContent/prepare-content.en.md)
    - [Combine text files](Documents/Actions/CombineTextFiles/combine-text-files.en.md)
    - [Append blog media links](Documents/Actions/AppendBlogMediaLinks/append-blog-media-links.en.md)
    - [Resolve weekly period](Documents/Actions/ResolveWeeklyPeriod/resolve-weekly-period.en.md)
      - Returns an ISO date-range label by default, with a configurable display format.
    - [Collect weekly development logs](Documents/Actions/CollectWeeklyDevelopmentLogs/collect-weekly-development-logs.en.md)
    - [Find referenced media](Documents/Actions/FindReferencedMedia/find-referenced-media.en.md)
    - [Validate content size](Documents/Actions/ValidateContentSize/validate-content-size.en.md)
    - [Request content](Documents/Actions/RequestContent/request-content.en.md) (optional chunked summarization)
    - [Save content](Documents/Actions/SaveContent/save-content.en.md)
    - [Copy file](Documents/Actions/CopyFile/copy-file.en.md)
    - [Copy folder](Documents/Actions/CopyFolder/copy-folder.en.md)
    - [Publish content](Documents/Actions/PublishContent/publish-content.en.md)
  - Git and repository
    - [Calculate date range](Documents/Actions/CalculateDateRange/calculate-date-range.en.md)
    - [Resolve commit log dates](Documents/Actions/ResolveCommitLogDates/resolve-commit-log-dates.en.md)
    - [Collect dated commits](Documents/Actions/CollectDatedCommits/collect-dated-commits.en.md)
    - [Clone destination repository](Documents/Actions/CloneDestinationRepository/clone-destination-repository.en.md)
    - [Configure Git LFS remote](Documents/Actions/ConfigureLfsRemote/configure-lfs-remote.en.md)
    - [Collect Git diff](Documents/Actions/CollectGitDiff/collect-git-diff.en.md)
    - [Collect commits by time](Documents/Actions/CollectCommitsByTime/collect-commits-by-time.en.md)
    - [Collect commits by SHA](Documents/Actions/CollectCommitsBySha/collect-commits-by-sha.en.md)
    - [Commit changes](Documents/Actions/CommitChanges/commit-changes.en.md)
    - [Push changes](Documents/Actions/PushChanges/push-changes.en.md)
    - [Upload Git LFS objects](Documents/Actions/UploadGitLfsObjects/upload-git-lfs-objects.en.md)
    - [Verify repository access](Documents/Actions/VerifyRepository/verify-repository.en.md)
  - Document mapping
    - [Collect document sources](Documents/Actions/CollectDocumentSources/collect-document-sources.en.md)
    - [Map document targets](Documents/Actions/MapDocumentTargets/map-document-targets.en.md)
  - Notion
    - [Append external image links](Documents/Actions/AppendExternalImageLinks/append-external-image-links.en.md)
    - [Append Notion page content](Documents/Actions/AppendNotionPageContent/append-notion-page-content.en.md)
    - [Upload Notion file](Documents/Actions/UploadNotionFile/upload-notion-file.en.md)
    - [Clear Notion page](Documents/Actions/ClearNotionPage/clear-notion-page.en.md)
    - [Update Notion database entry properties](Documents/Actions/UpdateNotionDatabaseEntryProperties/update-notion-database-entry-properties.en.md)
    - [Create Notion page](Documents/Actions/CreateNotionPage/create-notion-page.en.md)
    - [Resolve Notion data source](Documents/Actions/ResolveNotionDataSource/resolve-notion-data-source.en.md)
    - [Find Notion database entry](Documents/Actions/FindNotionDatabaseEntry/find-notion-database-entry.en.md)
    - [Find Notion page](Documents/Actions/FindNotionPage/find-notion-page.en.md)
    - [Create Notion database entry](Documents/Actions/CreateNotionDatabaseEntry/create-notion-database-entry.en.md)
    - [Archive Notion database entry](Documents/Actions/ArchiveNotionDatabaseEntry/archive-notion-database-entry.en.md)
  - Issues
    - [Check review branch](Documents/Actions/CheckReviewBranch/check-review-branch.en.md)
    - [Collect issues](Documents/Actions/CollectIssues/collect-issues.en.md)
    - [Collect open issues](Documents/Actions/CollectOpenIssues/collect-open-issues.en.md)
    - [Find mirrored issue](Documents/Actions/FindMirroredIssue/find-mirrored-issue.en.md)
    - [Collect mirrored issues](Documents/Actions/CollectMirroredIssues/collect-mirrored-issues.en.md)
    - [Find orphaned mirrors](Documents/Actions/FindOrphanedMirrors/find-orphaned-mirrors.en.md)
    - [Delete mirrored issue](Documents/Actions/DeleteMirroredIssue/delete-mirrored-issue.en.md)
    - [Create issue](Documents/Actions/CreateIssue/create-issue.en.md)
    - [Update issue](Documents/Actions/UpdateIssue/update-issue.en.md)
    - [Synchronize issue labels](Documents/Actions/SyncIssueLabels/sync-issue-labels.en.md)
    - [Synchronize issue state](Documents/Actions/SyncIssueState/sync-issue-state.en.md)
  - Validation and notifications
    - [Validate npm build](Documents/Actions/ValidateNpmBuild/validate-npm-build.en.md)
    - [Build Unreal project](Documents/Actions/BuildUnrealProject/build-unreal-project.en.md)
    - [Notify webhook](Documents/Actions/NotifyWebhook/notify-webhook.en.md)
  - Pull requests
    - [Commit pull request changes](Documents/Actions/CommitPullRequestChanges/commit-pull-request-changes.en.md)
    - [Push pull request branch](Documents/Actions/PushPullRequestBranch/push-pull-request-branch.en.md)
    - [Create pull request](Documents/Actions/CreatePullRequest/create-pull-request.en.md)
    - [Label pull request](Documents/Actions/LabelPullRequest/label-pull-request.en.md)
    - [Merge branch](Documents/Actions/MergeBranch/merge-branch.en.md)
    - [Ensure pull request](Documents/Actions/EnsurePullRequest/ensure-pull-request.en.md)
