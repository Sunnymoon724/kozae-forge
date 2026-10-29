# 브랜치 병합 시도

원본 브랜치를 대상 브랜치에 병합합니다. 충돌은 결과로만 알리며 Pull Request 생성 여부는 호출 Workflow가 결정합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | `contents: write` 권한이 있는 GitHub 토큰 |
| `repository` | 예 | - | `owner/name` 형식의 저장소 |
| `api-url` | 아니오 | `https://api.github.com` | GitHub API 기본 URL |
| `source-branch` | 예 | - | 병합할 원본 브랜치 |
| `source-sha` | 아니오 | 빈 값 | 예상 원본 커밋. 브랜치가 변경되면 `stale` 반환 |
| `target-branch` | 예 | - | 병합 대상 브랜치 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `outcome` | - | `merged`, `conflict`, `stale` 중 한 값 |

## 입력 예시

```yaml
- id: merge
  uses: Sunnymoon724/kozae-forge/actions/merge-branch@main
  with:
    token: ${{ github.token }}
    repository: ${{ github.repository }}
    api-url: ${{ github.api_url }}
    source-branch: feature/example
    source-sha: ${{ github.sha }}
    target-branch: main
```

## 출력 예시

```yaml
outcome: conflict
```

HTTP 409만 병합 충돌로 취급합니다. 권한 및 브랜치 규칙 오류는 Action을 실패시킵니다.
