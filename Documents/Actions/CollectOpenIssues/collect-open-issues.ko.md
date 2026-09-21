# collect-open-issues

현재 GitHub 저장소의 열린 이슈와 댓글을 수집합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | 이슈 읽기 권한이 있는 GitHub 토큰 |
| `max-issues` | 아니오 | `100` | 수집할 최대 이슈 수 |

Pull Request는 제외합니다. 저장소는 `GITHUB_REPOSITORY`에서 확인합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `issues` | 이슈 번호·제목·본문·라벨·댓글을 포함한 JSON 배열 |
| `has-issues` | 이슈 존재 여부 |

## 입력 예시

```yaml
- id: issues
  uses: Sunnymoon724/kozae-forge/actions/collect-open-issues@main
  with:
    token: ${{ github.token }}
```
