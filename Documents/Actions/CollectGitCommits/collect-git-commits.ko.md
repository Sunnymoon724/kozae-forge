# collect-git-commits

선택한 시간 범위의 Git 커밋을 수집합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `start-time` | 예 | - | `YYYY-MM-DD HH:mm` 형식 시작 시간 |
| `end-time` | 예 | - | `YYYY-MM-DD HH:mm` 형식 종료 시간 |
| `timezone` | 예 | - | IANA 시간대 |
| `author` | 아니오 | 빈 값 | 작성자 이름 또는 이메일 필터 |
| `authors` | 아니오 | 빈 값 | 쉼표로 구분한 작성자 필터 |

## 출력값

| 출력값 | 설명 |
|---|---|
| `has-content` | 커밋 존재 여부 |
| `commits` | 수집한 커밋 메시지 |
