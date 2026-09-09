# upload-lfs

Git LFS 객체를 대상 GitHub 저장소로 업로드하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `token` | 예 | - | 대상 저장소에 접근할 GitHub 토큰 |
| `repository` | 예 | - | `owner/name` 형식의 대상 저장소 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/upload-lfs@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository: OWNER/DESTINATION-REPOSITORY
```
