# 이슈 생성

원본 이슈 데이터로 대상 이슈 하나를 생성합니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | GitHub Token |
| `destination-repository` | 예 | - | 대상 저장소 |
| `issue` | 예 | - | 원본 이슈 JSON 객체 |

## 출력

| 출력 | 기본값 | 설명 |
|---|---|---|
| `issue-number` | - | 생성된 이슈 번호 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/create-issue@main
```

## 출력 예시

```yaml
issue-number: 42
```
