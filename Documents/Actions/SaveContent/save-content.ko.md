# save-content

전달받은 Markdown 콘텐츠 파일을 지정한 경로에 저장하는 GitHub Action입니다. Artifact 다운로드나 commit, push는 수행하지 않습니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `source-file` | 예 | - | 저장할 원본 Markdown 파일 경로 |
| `output-file` | 예 | - | 콘텐츠를 저장할 대상 파일 경로 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/save-content@main
  with:
    source-file: generated-content/2026-09-08-development-log.md
    output-file: Documents/Blog/2026-09-08-development-log.md
```
