# Pull Request 확인 또는 생성

원본·대상 브랜치에 대한 열린 Pull Request를 찾고, 없으면 새로 만듭니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | `pull-requests: write` 권한이 있는 GitHub 토큰 |
| `repository` | 예 | - | `owner/name` 형식의 저장소 |
| `api-url` | 아니오 | `https://api.github.com` | GitHub API 기본 URL |
| `source-branch` | 예 | - | PR 원본 브랜치 |
| `target-branch` | 예 | - | PR 대상 브랜치 |
| `title` | 예 | - | 새 PR을 만들 때 사용할 제목 |
| `body` | 예 | - | 새 PR을 만들 때 사용할 본문 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `pull-request-url` | - | 기존 또는 새 PR의 URL |

## 입력 예시

```yaml
- id: pr
  uses: Sunnymoon724/kozae-forge/actions/ensure-pull-request@main
  with:
    token: ${{ github.token }}
    repository: ${{ github.repository }}
    api-url: ${{ github.api_url }}
    source-branch: feature/example
    target-branch: main
    title: Merge feature/example into main
    body: Created after a merge conflict.
```

## 출력 예시

```yaml
pull-request-url: https://github.com/owner/repository/pull/1
```
