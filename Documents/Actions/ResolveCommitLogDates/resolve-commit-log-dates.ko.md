# 커밋 로그 날짜 결정

커밋 로그를 만들 날짜 1~31개와 선택적인 출력 브랜치 이름을 결정합니다. 시작일을 비우면 지정 시간대의 어제를 선택합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `start-date` | 아니오 | 빈 값 | 첫날 `YYYY-MM-DD`; 비우면 어제 |
| `end-date` | 아니오 | 빈 값 | 마지막 날 `YYYY-MM-DD`; 비우면 첫날만 처리 |
| `timezone` | 예 | - | 어제 계산에 사용할 IANA 시간대 |
| `branch-prefix` | 아니오 | 빈 값 | 출력 브랜치 접두사 |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `dates` | - | 날짜 JSON 배열 |
| `start-date` | - | 결정된 첫날 |
| `end-date` | - | 결정된 마지막 날 |
| `start-date-display` | - | `YYYY/MM/DD` 형식의 첫날 |
| `end-date-display` | - | `YYYY/MM/DD` 형식의 마지막 날 |
| `branch-name` | 빈 값 | 접두사가 있으면 접두사와 날짜로 만든 브랜치 이름 하나, 없으면 빈 값 |

## 입력 예시

```yaml
- id: dates
  uses: Sunnymoon724/kozae-forge/actions/resolve-commit-log-dates@main
  with:
    start-date: '2026-10-01'
    end-date: '2026-10-07'
    timezone: Asia/Seoul
    branch-prefix: chronicle-log
```

## 출력 예시

```yaml
dates: '["2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07"]'
start-date: '2026-10-01'
end-date: '2026-10-07'
start-date-display: '2026/10/01'
end-date-display: '2026/10/07'
branch-name: chronicle-log-2026-10-01-2026-10-07
```
