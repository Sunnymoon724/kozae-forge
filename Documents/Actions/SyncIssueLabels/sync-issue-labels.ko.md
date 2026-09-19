# 이슈 라벨 동기화

대상 이슈 하나의 라벨을 동기화합니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | GitHub Token |
| `destination-repository` | 예 | - | 대상 저장소 |
| `issue-number` | 예 | - | 대상 이슈 번호 |
| `issue` | 예 | - | 원본 이슈 JSON 객체 |
| `excluded-label` | 예 | - | 복사하지 않을 라벨 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-issue-labels@main
```
