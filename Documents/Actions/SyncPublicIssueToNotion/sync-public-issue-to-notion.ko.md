# sync-public-issue-to-notion

미러링된 공개 이슈를 찾아 Notion 데이터베이스 항목을 생성하거나 갱신합니다.

## 입력

| 입력 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `github-token` | 예 | - | 대상 저장소를 읽을 수 있는 토큰 |
| `destination-repository` | 예 | - | `owner/name` 형식의 대상 저장소 |
| `source-issue-number` | 예 | - | 원본 이슈 번호 |
| `issue-title` | 예 | - | Notion 항목 제목으로 사용할 이슈 제목 |
| `issue-body` | 아니오 | 빈 값 | Markdown으로 게시할 이슈 본문 |
| `issue-state` | 예 | - | Notion Status 값을 계산할 이슈 상태 |
| `issue-labels` | 아니오 | `[]` | Status 값을 계산할 이슈 라벨 JSON 배열 |
| `data-source-url` | 예 | - | Notion 데이터베이스 URL |
| `status-property` | 예 | - | Notion Status 속성 이름 |
| `notion-token` | 예 | - | Notion 통합 토큰 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/sync-public-issue-to-notion@main
  with:
    github-token: ${{ secrets.DESTINATION_REPO_TOKEN }}
    destination-repository: OWNER/REPOSITORY
    source-issue-number: 12
    issue-title: 예시 이슈
    issue-body: 이슈 설명
    issue-state: open
    issue-labels: '[]'
    data-source-url: ${{ vars.NOTION_ISSUE_DATA_SOURCE_URL }}
    status-property: 상태
    notion-token: ${{ secrets.NOTION_TOKEN }}
```
