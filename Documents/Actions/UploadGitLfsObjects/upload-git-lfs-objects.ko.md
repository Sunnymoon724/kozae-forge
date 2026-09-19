# upload-git-lfs-objects

구성된 원격 저장소로 한 브랜치의 모든 Git LFS 객체를 업로드합니다. 먼저 `configure-lfs-remote`를 사용해야 합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | 대상 저장소 쓰기 권한이 있는 GitHub Token |
| `repository-directory` | 예 | - | Git 저장소 디렉터리 |
| `remote-name` | 아니오 | `public` | 구성된 원격 이름 |
| `branch` | 아니오 | `main` | 업로드할 브랜치 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/upload-git-lfs-objects@main
  with:
    token: ${{ secrets.PUBLIC_REPO_TOKEN }}
    repository-directory: .
    remote-name: public
    branch: main
```
