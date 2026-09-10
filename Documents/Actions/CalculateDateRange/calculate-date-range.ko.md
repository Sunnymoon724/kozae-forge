# calculate-date-range

지정한 날짜와 시간대를 기준으로 GitHub Actions에서 사용할 시간 범위를 계산하는 GitHub Action입니다.

## 입력값

| 입력값 | 필수 여부 | 기본값 | 설명 |
|---|---:|---|---|
| `timezone` | 예 | - | 시간 범위를 계산할 IANA 시간대 |
| `target-date` | 예 | - | 계산할 날짜 (`YYYY-MM-DD`) |

## 출력값

| 출력값 | 기본값 | 설명 |
|---|---|---|
| `start-time` | - | 시작 시간 (`YYYY-MM-DD HH:mm`) |
| `end-time` | - | 종료 시간 (`YYYY-MM-DD HH:mm`) |
| `date` | - | 계산된 대상 날짜 (`YYYY-MM-DD`) |

## 입력 예시

```yaml
- id: time-range
  uses: Sunnymoon724/kozae-forge/actions/calculate-date-range@main
  with:
    timezone: Asia/Seoul
    target-date: 2026-09-08
```


## 출력 예시

```yaml
start-time: '2026-09-08 00:00'
end-time: '2026-09-09 00:00'
date: '2026-09-08'
```
