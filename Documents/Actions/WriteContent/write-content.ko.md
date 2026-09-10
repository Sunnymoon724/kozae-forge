# write-content

입력받은 `content`를 원하는 경로의 파일로 저장하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---|---|---|
| `file-path` | 예 | - | 저장할 대상 파일 경로 |
| `content` | 예 | - | 파일에 저장할 내용. 비어 있으면 Action이 실패합니다 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/write-content@main
  with:
    file-path: Documents/Blog/article.md
    content: '# 오늘의 기록'
```
