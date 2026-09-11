# save-content

Artifact를 다운로드하여 지정한 디렉터리에 Markdown 콘텐츠를 저장하는 GitHub Action입니다. 변경사항을 commit하거나 push하지 않습니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `artifact-name` | 아니요 | `generated-content` | 저장할 콘텐츠가 포함된 Artifact 이름 |
| `file-directory` | 아니요 | `Documents/Blog` | 콘텐츠를 저장할 디렉터리 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    artifact-name: generated-content
    file-directory: Documents/Blog
```
