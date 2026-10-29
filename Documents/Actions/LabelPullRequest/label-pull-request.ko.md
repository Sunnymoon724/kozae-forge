# label-pull-request

기존 Pull Request에 라벨을 추가합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | GitHub 토큰 |
| `pull-request-number` | 예 | - | PR 번호 |
| `labels` | 예 | - | 쉼표로 구분한 라벨 이름 |

## 출력값

출력값은 없습니다.

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/label-pull-request@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    pull-request-number: ${{ steps.pull-request.outputs.pull-request-number }}
    labels: documentation, automated
```

## 출력 예시

성공하면 라벨이 적용된 상태입니다.
