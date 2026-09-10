# clone-destination-repository

GitHub 토큰을 사용해 대상 저장소를 Clone하고 Git LFS를 초기화하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | 대상 저장소 접근에 사용할 GitHub 토큰 |
| `repository` | 예 | - | 대상 저장소 (`owner/name`) |
| `destination-directory` | 예 | - | Clone할 디렉터리 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/clone-destination-repository@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
    destination-directory: destination-repo
```
