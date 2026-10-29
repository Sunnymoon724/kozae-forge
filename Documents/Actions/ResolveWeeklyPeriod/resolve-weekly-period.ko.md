# resolve-weekly-period

선택한 월요일을 기준으로 어제까지 포함하는 주간 기간을 결정합니다. 출력에는 기간만 포함되며 보고서 이름은 호출자가 붙입니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `week-start` | 아니오 | 빈 값 | `YYYY-MM-DD` 형식의 월요일 |
| `timezone` | 아니오 | `Asia/Seoul` | IANA 시간대 |
| `period-format` | 아니오 | `{start-date}~{end-date}` | 기간 표시 양식. `{start-date}`, `{end-date}`, `{start-year}`, `{start-month}`, `{start-day}`, `{end-year}`, `{end-month}`, `{end-day}` 사용 가능. 날짜는 `YYYY-MM-DD`, 월·일 숫자는 앞에 0을 붙이지 않음 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `start-date` | 첫 날짜 |
| `end-date` | 마지막 날짜 |
| `period-label` | 보고서 이름을 붙이지 않은 기간 표시 |

## 입력 예시

```yaml
- id: period
  uses: Sunnymoon724/kozae-forge/actions/resolve-weekly-period@main
  with:
    week-start: '2026-10-19'
```

## 출력 예시

```yaml
start-date: '2026-10-19'
end-date: '2026-10-25'
period-label: 2026-10-19~2026-10-25
```

한국어식 기간은 `period-format: '{start-month}월 {start-day}일~{end-month}월 {end-day}일'`처럼 지정합니다. 호출하는 쪽에서는 `${{ format('{0} 주간보고', steps.period.outputs.period-label) }}`처럼 용도를 붙입니다.
