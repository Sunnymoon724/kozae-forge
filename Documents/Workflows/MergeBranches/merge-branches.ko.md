# 브랜치 병합

여러 원격 브랜치의 최신 내용을 지정한 대상 브랜치에 순서대로 병합하는 재사용 Workflow입니다. 실행 시간과 저장소별 브랜치 목록은 호출하는 저장소에서 정합니다.

## 1. 처리 방법

1. 대상 브랜치를 Checkout합니다.
2. 입력된 브랜치를 위에서부터 하나씩 대상 브랜치에 병합합니다.
3. 병합이 끝나면 대상 브랜치에 Push합니다.

충돌이 발생하면 Workflow를 실패시키고 Push하지 않습니다. 대상 브랜치의 최신 원격 변경사항을 먼저 반영하므로 오래된 Checkout으로 덮어쓰지 않습니다.

## 2. 사용 방법

호출하는 저장소에서 Workflow 실행 시간과 브랜치를 정합니다.

### 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | 병합 Job에 사용할 Runner 레이블 |
| `target-branch` | 아니오 | `main` | 병합 결과를 받을 브랜치 |
| `source-branches` | 예 | - | 병합할 브랜치 이름. 한 줄에 하나씩 작성 |

호출하는 Workflow에는 대상 브랜치에 Push할 수 있는 `contents: write` 권한이 필요합니다.

```yaml
name: Scheduled branch merge

on:
  schedule:
    # Asia/Seoul 04:00 = UTC 전날 19:00
    - cron: '0 19 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  merge:
    uses: Sunnymoon724/kozae-forge/.github/workflows/merge-branches.yml@main
    with:
      target-branch: main
      source-branches: |
        develop
        chronicle
        release
```

## 3. 주의 사항

- 브랜치는 입력 순서대로 병합합니다.
- 충돌이 발생하면 자동으로 해결하지 않고 실행을 실패시킵니다.
- `source-branches`에는 `target-branch`를 넣을 수 없습니다.
- 대상 브랜치 보호 규칙이 직접 Push를 막으면 이 Workflow도 실패합니다.
- `schedule` 실행은 GitHub Actions 사정에 따라 약간 늦어질 수 있습니다.
