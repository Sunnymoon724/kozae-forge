# KoZae Forge

재사용 Action은 Linux와 Windows Runner에서 실행되는 Node.js 24 Action입니다.

KoZae 프로젝트에서 재사용할 수 있는 GitHub Actions와 Workflow 모음입니다.

## ✨ 제공 기능

- Workflow
  - 콘텐츠 생성·게시
    - [커밋 로그 생성](Documents/Workflows/GenerateCommitLog/generate-commit-log.ko.md)
    - [문서 정제](Documents/Workflows/RefineDocuments/refine-documents.ko.md)
    - [Notion 페이지 게시](Documents/Workflows/PublishNotionPage/publish-notion-page.ko.md)
    - [Notion 데이터베이스 항목 게시](Documents/Workflows/PublishNotionDatabase/publish-notion-database.ko.md)
  - 저장소·이슈 자동화
    - [저장소 미러링](Documents/Workflows/MirrorRepository/mirror-repository.ko.md)
    - [이슈 미러링](Documents/Workflows/MirrorIssues/mirror-issues.ko.md)

- Action
  - 콘텐츠·파일
    - [콘텐츠 준비](Documents/Actions/PrepareContent/prepare-content.ko.md)
    - [콘텐츠 크기 검증](Documents/Actions/ValidateContentSize/validate-content-size.ko.md)
    - [콘텐츠 요청](Documents/Actions/RequestContent/request-content.ko.md)
    - [콘텐츠 저장](Documents/Actions/SaveContent/save-content.ko.md)
    - [파일 복사](Documents/Actions/CopyFile/copy-file.ko.md)
    - [폴더 복사](Documents/Actions/CopyFolder/copy-folder.ko.md)
    - [콘텐츠 게시](Documents/Actions/PublishContent/publish-content.ko.md)
  - Git·저장소
    - [날짜 범위 계산](Documents/Actions/CalculateDateRange/calculate-date-range.ko.md)
    - [대상 저장소 Clone](Documents/Actions/CloneDestinationRepository/clone-destination-repository.ko.md)
    - [Git LFS 원격 구성](Documents/Actions/ConfigureLfsRemote/configure-lfs-remote.ko.md)
    - [Git diff 수집](Documents/Actions/CollectGitDiff/collect-git-diff.ko.md)
    - [기간별 커밋 수집](Documents/Actions/CollectCommitsByTime/collect-commits-by-time.ko.md)
    - [SHA 범위 커밋 수집](Documents/Actions/CollectCommitsBySha/collect-commits-by-sha.ko.md)
    - [변경사항 커밋](Documents/Actions/CommitChanges/commit-changes.ko.md)
    - [변경사항 push](Documents/Actions/PushChanges/push-changes.ko.md)
    - [Git LFS 객체 업로드](Documents/Actions/UploadGitLfsObjects/upload-git-lfs-objects.ko.md)
    - [저장소 권한 확인](Documents/Actions/VerifyRepository/verify-repository.ko.md)
  - 문서 매핑
    - [문서 원본 수집](Documents/Actions/CollectDocumentSources/collect-document-sources.ko.md)
    - [문서 대상 매핑](Documents/Actions/MapDocumentTargets/map-document-targets.ko.md)
  - Notion
    - [Notion 페이지 콘텐츠 추가](Documents/Actions/AppendNotionPageContent/append-notion-page-content.ko.md)
    - [Notion 페이지 비우기](Documents/Actions/ClearNotionPage/clear-notion-page.ko.md)
    - [Notion 데이터베이스 항목 속성 갱신](Documents/Actions/UpdateNotionDatabaseEntryProperties/update-notion-database-entry-properties.ko.md)
    - [Notion 페이지 생성](Documents/Actions/CreateNotionPage/create-notion-page.ko.md)
    - [Notion 데이터 소스 조회](Documents/Actions/ResolveNotionDataSource/resolve-notion-data-source.ko.md)
    - [Notion 데이터베이스 항목 찾기](Documents/Actions/FindNotionDatabaseEntry/find-notion-database-entry.ko.md)
    - [Notion 페이지 찾기](Documents/Actions/FindNotionPage/find-notion-page.ko.md)
    - [Notion 데이터베이스 항목 생성](Documents/Actions/CreateNotionDatabaseEntry/create-notion-database-entry.ko.md)
  - 이슈
    - [검토 브랜치 확인](Documents/Actions/CheckReviewBranch/check-review-branch.ko.md)
    - [이슈 수집](Documents/Actions/CollectIssues/collect-issues.ko.md)
    - [열린 이슈 수집](Documents/Actions/CollectOpenIssues/collect-open-issues.ko.md)
    - [미러링 이슈 찾기](Documents/Actions/FindMirroredIssue/find-mirrored-issue.ko.md)
    - [미러 이슈 수집](Documents/Actions/CollectMirroredIssues/collect-mirrored-issues.ko.md)
    - [미러 이슈 삭제](Documents/Actions/DeleteMirroredIssue/delete-mirrored-issue.ko.md)
    - [이슈 생성](Documents/Actions/CreateIssue/create-issue.ko.md)
    - [이슈 갱신](Documents/Actions/UpdateIssue/update-issue.ko.md)
    - [이슈 라벨 동기화](Documents/Actions/SyncIssueLabels/sync-issue-labels.ko.md)
    - [이슈 상태 동기화](Documents/Actions/SyncIssueState/sync-issue-state.ko.md)
  - 검증·알림
    - [npm 빌드 검증](Documents/Actions/ValidateNpmBuild/validate-npm-build.ko.md)
    - [Webhook 알림](Documents/Actions/NotifyWebhook/notify-webhook.ko.md)
  - Pull Request
    - [Pull Request 생성](Documents/Actions/CreatePullRequest/create-pull-request.ko.md)
