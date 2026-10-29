# append-blog-media-links

제목은 변경하지 않고 날짜가 일치하는 이미지 링크를 Markdown 글에 추가합니다.

## 입력값

| 입력값 | 필수 | 기본값 | 설명 |
|---|---:|---|---|
| `directory` | 예 | - | 날짜가 있는 Markdown 글 |
| `media-directory` | 예 | - | 날짜가 있는 이미지 파일 |
| `media-url-prefix` | 아니오 | `/media` | 공개 이미지 URL 접두사 |

## 출력값

출력값은 없습니다.

## 입력 예시

```yaml
- uses: Sunnymoon724/kozae-forge/actions/append-blog-media-links@main
  with:
    directory: Chronicle/blog
    media-directory: Chronicle/static/media
```

## 출력 예시

해당 글에 `## 🖼️ 참고 이미지` 절이 추가됩니다.
