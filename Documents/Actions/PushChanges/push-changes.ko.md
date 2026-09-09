# push-changes

commit된 변경사항을 원격 브랜치로 push하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `destination-directory` | 아니오 | `public-repo` | Git 저장소 디렉토리 |
| `branch` | 아니오 | `main` | push할 원격 브랜치 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/push-changes@main
  with:
    destination-directory: destination-repo
    branch: main
```
