# create-pull-request

이미 push된 브랜치의 Pull Request를 생성하거나 기존 PR을 재사용하는 GitHub Action입니다.

작업 공간 변경사항은 `commit-pull-request-changes`와 `push-pull-request-branch`로 먼저 반영합니다. 라벨은 `label-pull-request`로 별도 지정합니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | Pull Request 생성에 사용할 GitHub 토큰 |
| `branch` | 아니오 | `automation/update-content` | Pull Request에 사용할 브랜치 |
| `title` | 아니오 | `docs: update generated content` | Pull Request 제목 |
| `body` | 아니오 | 생성 콘텐츠 검토 안내 | Pull Request 본문 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `pull-request-number` | 생성 또는 재사용한 PR 번호 |
| `pull-request-url` | 생성 또는 재사용한 PR URL |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    branch: automation/sync-wiki
    title: 'docs: sync wiki pages'
    body: |
      This pull request contains generated Chronicle pages.
```

## 출력 예시

```yaml
pull-request-number: '42'
pull-request-url: https://github.com/owner/repository/pull/42
```
