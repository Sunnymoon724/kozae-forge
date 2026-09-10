# commit-changes

지정한 디렉토리의 변경사항을 commit하는 GitHub Action입니다.

커밋 작성자 이름은 `forge-bot`으로 표시되며, 인증 계정과 프로필 이미지는 GitHub Actions 기본 계정을 사용합니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `destination-directory` | 예 | - | 변경사항이 있는 저장소 디렉토리 |
| `message` | 아니오 | `Update files` | commit 메시지 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/commit-changes@main
  with:
    destination-directory: destination-repo
    message: Update generated content
```
