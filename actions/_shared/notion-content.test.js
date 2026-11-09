const test = require('node:test');
const assert = require('node:assert/strict');
const {contentToNotionBlocks} = require('./notion-content');

test('Markdown bullet content converts bold text and links to Notion rich text', () => {
  const [block] = contentToNotionBlocks('- **플레이어 컨트롤러**: [변경 사항](https://example.com)', 'markdown');
  assert.equal(block.type, 'bulleted_list_item');
  assert.deepEqual(block.bulleted_list_item.rich_text, [
    {type: 'text', text: {content: '플레이어 컨트롤러'}, annotations: {bold: true}},
    {type: 'text', text: {content: ': '}},
    {type: 'text', text: {content: '변경 사항', link: {url: 'https://example.com'}}},
  ]);
});

test('Plain content keeps Markdown markers as text', () => {
  const [block] = contentToNotionBlocks('**제목**', 'plain');
  assert.deepEqual(block.paragraph.rich_text, [{type: 'text', text: {content: '**제목**'}}]);
});
