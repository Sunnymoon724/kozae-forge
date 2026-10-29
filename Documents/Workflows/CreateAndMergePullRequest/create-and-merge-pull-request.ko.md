# 브랜치 자동 병합 및 충돌 시 Pull Request 생성

호출한 Workflow가 지정한 원본 브랜치를 대상 브랜치에 바로 병합합니다. 병합 충돌이 있을 때만 Pull Request를 만들고, 선택한 Discord Webhook으로 PR 링크를 보냅니다. 빌드는 이 Workflow에서 실행하지 않습니다.

## 1. 처리 방법

1. `source-sha`가 지정된 경우 원본 브랜치가 해당 커밋과 같은지 확인합니다. 새 Push로 브랜치가 바뀌었다면 오래된 실행은 건너뜁니다.
2. GitHub에 대상 브랜치로 병합을 요청합니다. 성공하면 PR을 만들지 않습니다.
3. GitHub가 병합 충돌을 반환하면 열린 PR을 재사용하거나 새로 만들고, Discord Webhook이 설정되어 있으면 PR 링크를 알립니다.

텍스트 충돌은 PR 화면에서 해결할 수 있습니다. Unreal `.uasset` 같은 바이너리 파일은 보통 로컬 편집기에서 해결한 뒤 원본 브랜치에 다시 Push해야 합니다.

## 2. 사용 방법

호출 Workflow에 `contents: write`와 `pull-requests: write` 권한을 지정합니다. 재사용 Workflow는 호출 저장소에서 자동 발급한 `GITHUB_TOKEN`을 사용하므로 토큰을 직접 만들거나 입력할 필요가 없습니다. 기존 호출부 호환을 위해 선택 입력으로 남긴 `token` 시크릿은 받기만 하고 사용하지 않습니다. 저장소 규칙에서 직접 병합을 막고 있다면 토큰 권한이나 규칙을 조정해야 합니다. 권한이나 브랜치 보호로 직접 병합이 거부되는 경우에는 충돌 PR로 처리하지 않고 Workflow가 실패합니다.

Discord 알림을 사용하려면 저장소에 다음 시크릿을 등록합니다.

```text
Settings → Secrets and variables → Actions → DISCORD_WEBHOOK_URL
```

Webhook URL이 없거나 비어 있으면 Discord 알림만 건너뜁니다.

### 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-branch` | 예 | - | 대상 브랜치에 병합할 원본 브랜치 |
| `source-sha` | 아니오 | - | 실행 시점의 원본 커밋 SHA. 브랜치가 이 SHA보다 앞서 있으면 오래된 실행을 건너뜁니다. |
| `target-branch` | 아니오 | `main` | 변경사항을 받을 브랜치 |
| `build-result` | 아니오 | `success` | 이전 호출과의 호환 입력. `success`가 아니면 병합하지 않고 PR 생성 및 알림을 합니다. 새 사용에서는 생략할 수 있습니다. |
| `pull-request-title` | 아니오 | `Merge changes into main` | 충돌 시 만들 PR 제목 |
| `pull-request-body` | 아니오 | 충돌 안내 문구 | 충돌 시 만들 PR 설명 |

### 필요한 시크릿

| 시크릿 | 필수 | 설명 |
|---|---:|---|
| `token` | 아니오 | 이전 호출부 호환용 시크릿. 사용하지 않으며 호출 저장소의 `GITHUB_TOKEN`을 사용합니다. |
| `discord_webhook_url` | 아니오 | 충돌 PR 링크를 보낼 Discord Webhook |

```yaml
name: Merge branches

on:
  push:
    branches-ignore: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  merge:
    if: github.ref_type == 'branch' && github.ref != 'refs/heads/main'
    uses: Sunnymoon724/kozae-forge/.github/workflows/create-and-merge-pull-request.yml@main
    with:
      source-branch: ${{ github.ref_name }}
      source-sha: ${{ github.sha }}
      target-branch: main
      pull-request-title: Merge ${{ github.ref_name }} into main
    secrets:
      discord_webhook_url: ${{ secrets.DISCORD_WEBHOOK_URL }}
```

## 3. 참고 사항

- Workflow는 `merge-branch`, `ensure-pull-request` Action을 조합합니다. Discord 전송에는 `notify-webhook`을 사용합니다.
- 이 Workflow는 빌드나 테스트를 하지 않습니다. 병합 충돌이 없으면 곧바로 대상 브랜치에 반영합니다.
- 병합 충돌만 PR 생성 사유로 취급합니다. 권한 오류, 브랜치 보호 규칙 등 다른 오류는 Workflow를 실패시킵니다.
- 이전 호출부 호환을 위해 `build-result` 입력은 남아 있습니다. `failure`를 넘기면 기존처럼 PR을 만들고 Discord 알림을 보냅니다.
- Discord 알림에는 생성되거나 재사용된 PR 링크가 포함됩니다.

## 4. 사용하는 Action

- `merge-branch`
- `ensure-pull-request`
- `notify-webhook`
