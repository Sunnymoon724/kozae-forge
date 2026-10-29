# 원본이 없는 미러 이슈 찾기

원본 이슈와 미러 이슈를 비교해 원본이 사라진 미러를 찾습니다. Notion 정리에 사용할 제목 목록도 출력합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `source-issues` | 예 | - | `number`가 포함된 원본 이슈 JSON 배열 |
| `mirrored-issues` | 예 | - | `sourceIssueNumber`가 포함된 미러 이슈 JSON 배열 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `mirrors` | - | 원본이 없는 미러 이슈 JSON 배열 |
| `titles` | - | Notion 정리용 `{title}` 객체 JSON 배열 |

## 입력 예시

```yaml
- id: orphans
  uses: Sunnymoon724/kozae-forge/actions/find-orphaned-mirrors@main
  with:
    source-issues: '[{"number":1}]'
    mirrored-issues: '[{"sourceIssueNumber":2,"destinationIssueNumber":20,"title":"Old issue"}]'
```

## 출력 예시

```yaml
mirrors: '[{"sourceIssueNumber":2,"destinationIssueNumber":20,"title":"Old issue"}]'
titles: '[{"title":"Old issue"}]'
```
