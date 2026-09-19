# 문서 정제

## 1. 처리 방법

1. 호출 저장소를 checkout합니다.
2. `collect-document-sources`가 매핑 파일과 동기화 모드에 따라 원본 문서를 수집합니다.
3. `map-document-targets`가 선택된 원본과 대상 문서를 연결합니다.
4. `prepare-content`, `validate-content-size`, `request-content`, `save-content`가 원본과 양식을 사용해 대상 문서를 새로 작성합니다.
5. 생성된 Chronicle 페이지를 문서별 Artifact에 업로드합니다.
6. 업로드된 페이지를 `refined-documents` Artifact로 묶어 제공합니다.

이 Workflow는 파일 저장이나 외부 게시를 직접 수행하지 않습니다.

`sync-mode`는 `changed`(변경 문서) 또는 `full`(전체 문서)로 지정합니다.

## 2. 사용 방법

### 토큰 등록

AI Provider에 필요한 `api-key` Secret을 등록합니다.

```text
Settings → Secrets and variables → Actions
```

Secret 이름:

```text
AI_API_KEY
```

### 입력값 설정

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `runner` | 아니오 | `ubuntu-latest` | Workflow Job에 사용할 Runner 레이블 |
| `mapping-file` | 예 | - | JSON 매핑 파일 |
| `sync-mode` | 예 | - | `changed` 또는 `full` |
| `base-ref` | 아니오 | 빈 값 | `changed` 모드의 비교 기준 |
| `head-ref` | 아니오 | 빈 값 | 비교 대상 커밋 또는 참조 |
| `max-content-bytes` | 예 | - | 입력 콘텐츠 최대 크기 |
| `provider` | 예 | - | AI Provider |
| `api-base` | 예 | - | AI API 기본 URL |
| `model` | 예 | - | AI 모델 |

### 매핑 파일 준비

호출 저장소에 원본 디렉토리와 대상 디렉토리를 연결한 JSON 매핑 파일을 추가합니다. 모든 문서에 같은 양식을 사용하면 `defaultTemplate`을 지정하고, 폴더별 양식이 필요하면 `templateRules`를 추가합니다.

```json
{
  "mappings": [
    {
      "source": "docs/architecture",
      "destination": "Chronicle/docs/architecture",
      "template": "Chronicle/templates/architecture.md"
    }
  ]
}
```

### Workflow 설정

외부 Workflow에서 재사용 Workflow를 호출합니다. `sync-mode`는 필수이며, `changed`를 사용할 때는 `base-ref`도 전달합니다.

```yaml
jobs:
  sync:
    uses: Sunnymoon724/kozae-forge/.github/workflows/refine-documents.yml@main
    with:
      runner: self-hosted
      mapping-file: .github/chronicle-map.json
      sync-mode: changed
      base-ref: ${{ github.event.before }}
      max-content-bytes: 100000
      provider: openai
      api-base: https://api.openai.com/v1
      model: gpt-4o-mini
    secrets:
      api-key: ${{ secrets.AI_API_KEY }}
```

`full`로 실행하면 모든 문서를 처리합니다. 결과 파일은 `refined-documents`로 받을 수 있습니다. 처리할 문서가 없으면 Artifact가 생성되지 않으므로, 후속 Job은 `needs.sync.outputs.has-sources == 'true'`일 때만 실행해야 합니다.

```yaml
  download:
    needs: sync
    if: needs.sync.outputs.has-sources == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: ${{ needs.sync.outputs.artifact-name }}
```

## 3. 사용 Action

- `actions/checkout`
- `collect-document-sources`
- `map-document-targets`
- `prepare-content`
- `validate-content-size`
- `request-content`
- `save-content`
- `copy-file`
- `actions/upload-artifact`
- `actions/download-artifact`
