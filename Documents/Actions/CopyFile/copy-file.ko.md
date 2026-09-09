# copy-file

기존 파일을 원하는 경로로 복사하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `source-file` | 예 | - | 복사할 원본 파일 |
| `file-path` | 예 | - | 복사 대상 경로 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/copy-file@main
  with:
    source-file: generated.md
    file-path: Documents/Blog/article.md
```
