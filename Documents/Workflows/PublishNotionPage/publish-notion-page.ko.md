# Notion 페이지 게시

동일한 페이지가 없으면 생성하고, 있으면 콘텐츠를 교체하는 재사용 GitHub Actions 워크플로입니다.

## 1. 처리 과정

1. 호출 저장소를 checkout합니다.
2. 상위 페이지와 제목으로 기존 페이지를 찾습니다.
3. 페이지가 없으면 콘텐츠 파일로 새 페이지를 생성합니다.
4. 페이지가 있으면 블록을 비우고 콘텐츠 파일을 추가합니다.

## 2. 사용 방법

### 토큰 등록

Notion 통합 토큰을 Actions Secret으로 등록합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
NOTION_TOKEN
```

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | 게시 Job에 사용할 Runner 레이블 |
| `content-file` | 예 | - | 저장소 기준 콘텐츠 파일 경로 |
| `parent-page-id` | 예 | - | 새 페이지의 상위 페이지 ID |
| `title` | 예 | - | 페이지 제목 |

### Workflow 설정

```yaml
jobs:
  publish:
    uses: Sunnymoon724/kozae-forge/.github/workflows/publish-notion-page.yml@main
    with:
      runner: self-hosted
      content-file: output/article.md
      parent-page-id: ${{ vars.NOTION_PARENT_PAGE_ID }}
      title: Weekly update
    secrets:
      notion-token: ${{ secrets.NOTION_TOKEN }}
```

## 3. 사용 Action

- `find-notion-page`
- `create-notion-page`
- `clear-notion-page`
- `append-notion-page-content`
