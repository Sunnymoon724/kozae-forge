# 이슈 상태 동기화

대상 이슈 하나의 상태를 동기화합니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | GitHub Token |
| `destination-repository` | 예 | - | 대상 저장소 |
| `issue-number` | 예 | - | 대상 이슈 번호 |
| `issue` | 예 | - | 원본 이슈 JSON 객체 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-issue-state@main
```
