# 이슈 미러링

Private 원본 저장소에서 `mirror:public` 라벨이 붙은 이슈를 Public 대상 저장소로 동기화합니다.

## 1. 처리 방법

원본 이슈를 조회하고 공개 라벨이 있는 이슈만 선택합니다. 내부 원본 이슈 식별자로 대상 이슈를 생성하거나 갱신합니다. 공개 제어 라벨을 제외한 제목·본문·상태·라벨을 동기화하며 첨부 파일은 복사하지 않습니다.

## 2. 사용 방법

### Token 등록

원본 저장소에 `PUBLIC_REPO_TOKEN` Actions Secret을 등록합니다. 이 Token은 대상 이슈 쓰기 권한이 필요하며, 원본 이슈는 호출 저장소의 `GITHUB_TOKEN`으로 조회합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
PUBLIC_REPO_TOKEN
```

### 인자 설정

| 인자 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `destination-repository` | 예 | - | `OWNER/REPOSITORY` 형식의 대상 저장소 |
| `visibility-label` | 아니오 | `mirror:public` | 미러링 대상을 선택하는 원본 라벨 |
| `sync-comments` | 아니오 | `false` | 댓글 동기화용 예약 옵션 |
| `sync-milestones` | 아니오 | `false` | 마일스톤 동기화용 예약 옵션 |
| `sync-assignees` | 아니오 | `false` | 담당자 동기화용 예약 옵션 |

### Workflow 추가

원본 저장소에 `.github/workflows/mirror-issues.yml`을 만들고 다음을 작성합니다.

```yaml
name: Mirror issues

on:
  issues:
    types: [opened, edited, labeled, unlabeled, closed, reopened]
  workflow_dispatch:

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-issues.yml@main
    with:
      destination-repository: OWNER/PUBLIC-REPOSITORY
      visibility-label: mirror:public
      sync-comments: false
      sync-milestones: false
      sync-assignees: false
    secrets:
      PUBLIC_REPO_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
```

## 3. 사용 Action

- `collect-issues`
- `find-mirrored-issue`
- `create-issue`
- `update-issue`
- `sync-issue-labels`
- `sync-issue-state`
