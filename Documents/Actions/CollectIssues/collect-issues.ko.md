# 이슈 수집

라벨로 선택한 이슈를 수집하는 GitHub Action입니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `token` | 예 | - | 원본 이슈 조회 권한이 있는 Token |
| `source-repository` | 예 | - | `owner/name` 형식의 원본 저장소 |
| `visibility-label` | 예 | - | 이슈를 선택하는 라벨 |

## 출력

| 출력 | 기본값 | 설명 |
|---|---|---|
| `issues` | - | 선택한 이슈의 JSON 배열 |

## 입력 예시

```yaml
- id: collect
  uses: Sunnymoon724/kozae-forge/actions/collect-issues@main
  with:
    token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    source-repository: OWNER/PRIVATE-REPOSITORY
    visibility-label: mirror:public
```

## 출력 예시

```yaml
issues: '[{"number":1,"title":"예시 이슈"}]'
```
