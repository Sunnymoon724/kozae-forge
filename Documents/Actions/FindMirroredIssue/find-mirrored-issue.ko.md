# 미러링 이슈 찾기

내부 원본 이슈 식별자로 대상 이슈를 찾습니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | GitHub Token |
| `destination-repository` | 예 | - | 대상 저장소 |
| `source-issue-number` | 예 | - | 원본 이슈 번호 |

## 출력

| 출력 | 기본값 | 설명 |
|---|---|---|
| `issue-number` | - | 일치하는 대상 이슈 번호 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/find-mirrored-issue@main
```

## 출력 예시

```yaml
issue-number: 42
```
