# collect-commits-by-sha

커밋 범위의 형식화된 커밋 메시지를 수집합니다. Git 이력이 준비된 checkout 저장소에서 사용합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `before-sha` | 아니오 | 빈 값 | 범위 직전 커밋입니다. push 워크플로에서는 `github.event.before`를 사용합니다. |
| `after-sha` | 아니오 | `GITHUB_SHA` | 범위의 마지막 커밋입니다. |
`before-sha`가 비어 있거나 모두 0이면 `after-sha`의 부모 커밋을 사용합니다. 부모가 없는 최초 커밋은 실패하지 않고 해당 커밋을 수집합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `base-sha` | 확인된 기준 커밋 SHA입니다. 없을 수 있습니다. |
| `head-sha` | 확인된 마지막 커밋 SHA입니다. |
| `commits` | 범위 메타데이터를 포함한 형식화된 커밋 메시지입니다. |
| `has-commits` | 범위 내 커밋 존재 여부입니다. |
| `source-url` | GitHub 비교 또는 커밋 URL입니다. |

## 입력 예시

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0

- id: commits
  uses: Sunnymoon724/kozae-forge/actions/collect-commits-by-sha@main
  with:
    before-sha: ${{ github.event.before }}
    after-sha: ${{ github.sha }}
```

## 출력 예시

```yaml
has-commits: true
source-url: https://github.com/octo-org/octo-repo/compare/base...head
```
