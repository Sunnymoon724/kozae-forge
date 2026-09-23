# 이슈 미러링

Private 원본 저장소에서 `mirror:public` 라벨이 붙은 이슈를 Public 대상 저장소로 동기화합니다. 단일 이슈 이벤트와 전체 대조를 모두 지원합니다.

## 1. 처리 방법

이슈 이벤트가 발생하면 해당 이슈 하나만 처리합니다. `mirror:public`이 있을 때만 대상 이슈를 만들거나 수정합니다. 기존 미러에서 이 라벨이 사라지면 대상 이슈는 유지하고 닫은 뒤 `mirror:missing`을 추가합니다.

`workflow_dispatch`와 `schedule`에서는 원본 이슈 전체와 `kozae-forge-mirror` 표시가 있는 대상 이슈 전체를 비교합니다. 원본 이슈가 실제로 삭제된 경우에만 대상 미러를 삭제합니다. 원본 이슈는 남아 있지만 `mirror:public`만 사라진 경우에는 대상 이슈를 유지하고 `closed + mirror:missing`으로 처리합니다.

## 2. 사용 방법

### 토큰 등록

원본 저장소에 `DESTINATION_REPO_TOKEN` Actions Secret을 등록합니다. 이 Token은 대상 이슈 쓰기 권한이 필요하며, 원본 이슈는 호출 저장소의 `GITHUB_TOKEN`으로 조회합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
DESTINATION_REPO_TOKEN
```

호출하는 저장소의 Workflow에서 이 Secret을 재사용 Workflow에 전달합니다.

```yaml
secrets:
  DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

### 입력값 설정

| 인자 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | Workflow Job에 사용할 Runner 레이블 |
| `destination-repository` | 예 | - | `OWNER/REPOSITORY` 형식의 대상 저장소 |
| `visibility-label` | 아니오 | `mirror:public` | 미러링 대상을 선택하는 원본 라벨 |
| `missing-label` | 아니오 | `mirror:missing` | 기존 미러에서 공개 라벨이 사라졌을 때 추가할 라벨 |
| `source-issue-number` | 아니오 | 빈 값 | 단일 이슈 동기화에 사용할 원본 이슈 번호 |
| `sync-comments` | 아니오 | `false` | 댓글 동기화용 예약 옵션 |
| `sync-milestones` | 아니오 | `false` | 마일스톤 동기화용 예약 옵션 |
| `sync-assignees` | 아니오 | `false` | 담당자 동기화용 예약 옵션 |

### Workflow 설정

원본 저장소에 `.github/workflows/mirror-issues.yml`을 만들고 다음을 작성합니다.

```yaml
name: Mirror issues

on:
  issues:
    types: [opened, edited, labeled, unlabeled, closed, reopened]
  workflow_dispatch:
  schedule:
    - cron: '17 * * * *'

jobs:
  mirror:
    uses: Sunnymoon724/kozae-forge/.github/workflows/mirror-issues.yml@main
    with:
      runner: self-hosted
      destination-repository: OWNER/PUBLIC-REPOSITORY
      visibility-label: mirror:public
      missing-label: mirror:missing
      source-issue-number: ${{ github.event.issue.number }}
      sync-comments: false
      sync-milestones: false
      sync-assignees: false
    secrets:
      DESTINATION_REPO_TOKEN: ${{ secrets.DESTINATION_REPO_TOKEN }}
```

## 3. 사용 Action

- `collect-issues`
- `find-mirrored-issue`
- `create-issue`
- `update-issue`
- `sync-issue-labels`
- `sync-issue-state`
- `collect-mirrored-issues`
- `delete-mirrored-issue`
