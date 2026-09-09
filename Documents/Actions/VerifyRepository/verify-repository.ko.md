# verify-repository

GitHub 저장소에 대한 push 권한을 확인하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `token` | 예 | - | 저장소 접근에 사용할 GitHub 토큰 |
| `repository` | 예 | - | `owner/name` 형식의 대상 저장소 |

push 권한이 없거나 저장소에 접근할 수 없으면 Action이 실패합니다.

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/verify-repository@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
```
