# configure-lfs-remote

Git LFS를 초기화하고 업로드를 위한 원격 저장소를 구성합니다. 실제 객체 업로드 시에는 업로드 Action이 인증을 제공합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `repository-directory` | 예 | - | Git 저장소 디렉터리 |
| `repository` | 예 | - | 대상 `owner/name` |
| `remote-name` | 아니오 | `public` | 원격 이름 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/configure-lfs-remote@main
  with:
    repository-directory: destination-repo
    repository: OWNER/REPOSITORY
```
