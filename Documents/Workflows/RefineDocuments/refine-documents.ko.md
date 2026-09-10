# 문서 정제

## 1. 처리 방법

1. 호출 저장소를 checkout합니다.
2. `map-document-sources`가 매핑 파일과 동기화 모드에 따라 원본과 대상 문서를 연결합니다.
3. `generate-content`가 원본과 양식을 사용해 대상 문서를 새로 작성합니다.
4. 생성된 Chronicle 페이지를 문서별 Artifact에 업로드합니다.
5. 업로드된 페이지를 `refined-documents` Artifact로 묶어 제공합니다.

이 Workflow는 파일 저장이나 외부 게시를 직접 수행하지 않습니다.

`sync-mode`는 `changed`(변경 문서) 또는 `full`(전체 문서)로 지정합니다.

## 2. 사용 방법

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

### Workflow 호출

외부 Workflow에서 재사용 Workflow를 호출합니다. `sync-mode`는 필수이며, `changed`를 사용할 때는 `base-ref`도 전달합니다.

```yaml
jobs:
  sync:
    uses: Sunnymoon724/kozae-forge/.github/workflows/refine-documents.yml@main
    with:
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
- `map-document-sources`
- `generate-content`
- `actions/upload-artifact`
- `actions/download-artifact`
