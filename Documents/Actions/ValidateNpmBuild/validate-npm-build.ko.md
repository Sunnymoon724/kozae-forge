# validate-npm-build

Node.js 24로 npm 의존성을 설치하고 `npm run build`로 프로젝트 빌드를 검증합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `working-directory` | 예 | - | `package.json`과 `package-lock.json`이 있는 디렉터리 |

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/validate-npm-build@main
  with:
    working-directory: Chronicle
```
