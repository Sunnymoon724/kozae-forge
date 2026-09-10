# map-document-sources

매핑 파일을 기준으로 원본 문서와 결과 위치, 양식을 연결하는 GitHub Action입니다.

## 매핑 파일

`mapping-file`은 다음 형식의 JSON 파일을 가리킵니다.

`source` 폴더의 구조와 파일명은 `destination`에도 그대로 적용됩니다.

`mappings`에는 원본·대상 폴더를 지정합니다. 모든 문서에 같은 양식을 사용하면 `defaultTemplate`을 지정하고, 경로별 양식이 필요하면 `templateRules`를 추가합니다. 규칙은 경로가 일치하는 문서에 우선 적용됩니다.

## 입력값

| 이름 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `mapping-file` | 예 | - | JSON 매핑 파일 |
| `sync-mode` | 예 | - | `changed` 또는 `full` |
| `changed-files` | 아니오 | 빈 값 | 변경된 파일 목록 |
| `base-ref` | 조건부 | 빈 값 | 변경 비교 기준 |
| `head-ref` | 아니오 | `HEAD` | 변경 비교 대상 |

`full`은 모든 원본 문서를 처리하고, `changed`는 변경된 문서만 처리합니다. `changed-files`를 전달하지 않으면 `base-ref`와 `head-ref`를 비교합니다.

## 출력값

| 출력값 | 설명 |
|---|---|
| `matrix` | `source`, `target`, `template`을 담은 GitHub Actions matrix JSON |
| `has-sources` | 처리할 문서가 하나 이상이면 `true` |

## 사용 예시

```yaml
- id: sources
  uses: Sunnymoon724/kozae-forge/actions/map-document-sources@main
  with:
    mapping-file: .github/chronicle-map.json
    sync-mode: changed
    base-ref: ${{ github.event.before }}
```

`matrix`는 후속 job에서 `fromJSON`으로 사용합니다.

```yaml
strategy:
  matrix: ${{ fromJSON(needs.discover.outputs.matrix) }}
```
