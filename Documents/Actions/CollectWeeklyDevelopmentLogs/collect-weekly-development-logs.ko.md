# 주간 개발일지 수집

결정된 기간의 일일 Markdown 글을 모으고 누락 날짜를 찾습니다. 날짜 결정은 `resolve-weekly-period`, 이미지 탐색은 `find-referenced-media`를 사용합니다.

## 입력값

| 입력값 | 필수 | 설명 |
|---|---:|---|
| `start-date` | 예 | `YYYY-MM-DD` 형식의 첫 날짜 |
| `end-date` | 예 | `YYYY-MM-DD` 형식의 마지막 날짜 |
| `log-directory` | 예 | 날짜별 Markdown 글이 있는 폴더 |
| `log-file-suffix` | 아니오 | 날짜 뒤에 붙는 파일명. 기본값 `-development-log.md` |
| `log-subdirectories` | 아니오 | `log-directory` 아래에서 탐색할 팀원 폴더를 쉼표로 구분. `.`은 최상위 글 포함 |

누락된 평일과 주말을 구분해 알리고 합친 본문에서는 이미지 Markdown을 제거합니다. 어제 이후 날짜 제한은 앞 단계의 기간 결정 Action이 처리합니다.
팀원 폴더를 지정하면 같은 날짜의 글을 모두 합칩니다. 지정한 폴더 모두에 글이 없을 때만 그 날짜를 누락으로 기록합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `has-content` | 일일 글이 하나라도 있는지 여부 |
| `source-files` | 줄바꿈으로 구분한 수집된 Markdown 파일 경로 |
| `missing-dates` | 쉼표로 구분한 누락 날짜 |
| `missing-weekdays` | 쉼표로 구분한 월~금 누락 날짜 |
| `source` | 이미지 Markdown을 제거하고 합친 일일 글 |

## 입력 예시

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-weekly-development-logs@main
  with:
    start-date: ${{ steps.period.outputs.start-date }}
    end-date: ${{ steps.period.outputs.end-date }}
    log-directory: Chronicle/blog
```

## 출력 예시

```yaml
has-content: 'true'
missing-weekdays: 2026-10-20, 2026-10-22
```
