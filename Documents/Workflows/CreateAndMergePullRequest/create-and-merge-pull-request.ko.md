# Pull Request 생성 및 병합

호출한 저장소의 빌드 결과에 따라 Pull Request를 만들거나 기존 항목을 재사용하고, 빌드가 성공하면 자동 병합하는 재사용 Workflow입니다. 빌드 실패나 병합 실패처럼 확인이 필요한 경우에만 Discord 알림을 보냅니다.

## 1. 처리 방법

1. 원본 브랜치와 대상 브랜치 사이에 열린 Pull Request가 있는지 찾고, 없으면 새로 만듭니다.
2. 호출한 빌드가 성공했고 빌드한 커밋이 최신이며 GitHub가 충돌이 없다고 판단하면 Pull Request를 병합합니다.
3. 빌드 실패 또는 실제 병합 충돌일 때만 Pull Request나 실행 기록 링크가 포함된 Discord 알림을 보냅니다. Webhook URL이 없으면 알림만 건너뜁니다.

GitHub 웹에서 처리할 수 있는 텍스트 충돌은 Pull Request 화면에서 해결할 수 있습니다. Unreal `.uasset` 같은 바이너리 파일은 보통 로컬 편집기에서 해결한 뒤 원본 브랜치에 다시 Push해야 합니다.

## 2. 사용 방법

### 권한 및 선택 Discord Webhook

호출하는 Workflow에 `contents: write`, `pull-requests: write` 권한이 필요합니다. Pull Request를 만들고 병합할 권한이 있는 토큰을 전달합니다. 예외 알림을 사용하려면 저장소에 다음 시크릿을 등록합니다.

```text
Settings → Secrets and variables → Actions → DISCORD_WEBHOOK_URL
```

Discord 시크릿이 없거나 값이 비어 있으면 알림을 보내지 않고 계속 진행합니다.

### 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-branch` | 예 | - | 대상 브랜치에 병합할 원본 브랜치 |
| `source-sha` | 예 | - | 호출한 빌드가 검사한 커밋 SHA |
| `target-branch` | 아니오 | `main` | 변경사항을 받을 브랜치 |
| `build-result` | 예 | - | 호출한 빌드 결과. 예: `success`, `failure` |
| `pull-request-title` | 아니오 | `Merge changes into main` | Pull Request 제목 |
| `pull-request-body` | 아니오 | `Created automatically after a branch update.` | Pull Request 설명 |

### 필요한 시크릿

| 시크릿 | 필수 | 설명 |
|---|---:|---|
| `token` | 예 | Pull Request 생성 및 병합 권한이 있는 토큰 |
| `discord_webhook_url` | 아니오 | 빌드 또는 병합 예외를 알릴 Discord Webhook |

```yaml
name: Build and merge

on:
  push:
    branches-ignore: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  build:
    runs-on: self-hosted
    steps:
      # 이 저장소에 필요한 빌드 작업을 작성합니다.
      - run: echo "빌드 단계로 바꾸세요"

  create-and-merge:
    if: always() && needs.build.result != 'cancelled'
    needs: build
    uses: Sunnymoon724/kozae-forge/.github/workflows/create-and-merge-pull-request.yml@main
    with:
      source-branch: ${{ github.ref_name }}
      source-sha: ${{ github.sha }}
      target-branch: main
      build-result: ${{ needs.build.result }}
      pull-request-title: Merge ${{ github.ref_name }} into main
    secrets:
      token: ${{ github.token }}
      discord_webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

## 3. 참고 사항

- 병합 전에 새 Push가 들어와 브랜치가 바뀌면 검사하지 않은 커밋은 병합하지 않습니다. 새 Push에서 빌드를 다시 실행해야 합니다.
- 빌드가 실패해도 Pull Request는 열린 상태로 두고 예외 알림을 보냅니다.
- 충돌이 발생하면 Pull Request는 열린 상태로 두고 예외 알림을 보냅니다. 충돌을 자동으로 해결하지 않습니다.
- 권한이나 브랜치 보호 규칙 등 다른 병합 오류는 Workflow를 실패시키지만 Discord 알림은 보내지 않습니다.
- 호출한 저장소의 토큰에 적용되는 브랜치 보호와 저장소 규칙은 그대로 적용됩니다.
