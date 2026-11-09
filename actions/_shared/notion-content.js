function richTextParts(text, parseLinks) {
  const parts = [];
  const addText = (value, link, bold = false) => {
    for (let offset = 0; offset < value.length; offset += 2000) {
      const item = {type: 'text', text: {content: value.slice(offset, offset + 2000)}};
      if (link) item.text.link = {url: link};
      if (bold) item.annotations = {bold: true};
      parts.push(item);
    }
  };
  if (!parseLinks) { addText(text); return parts; }
  const addLinkedText = (value, bold = false) => {
    const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let lastIndex = 0;
    for (const match of value.matchAll(linkPattern)) {
      addText(value.slice(lastIndex, match.index), undefined, bold);
      addText(match[1], match[2], bold);
      lastIndex = match.index + match[0].length;
    }
    addText(value.slice(lastIndex), undefined, bold);
  };
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  for (const match of text.matchAll(boldPattern)) {
    addLinkedText(text.slice(lastIndex, match.index));
    addLinkedText(match[1], true);
    lastIndex = match.index + match[0].length;
  }
  addLinkedText(text.slice(lastIndex));
  return parts;
}
function textBlock(type, text, {checked = false, parseLinks = false} = {}) {
  const block = {object: 'block', type, [type]: {rich_text: richTextParts(text, parseLinks)}};
  if (type === 'to_do') block.to_do.checked = checked;
  return block;
}
function contentToNotionBlocks(content, format = 'plain') {
  if (!['plain', 'markdown'].includes(format)) throw new Error(`Unsupported content format: ${format}`);
  if (format !== 'markdown') {
    const blocks = [];
    for (let offset = 0; offset < content.length; offset += 2000) blocks.push(textBlock('paragraph', content.slice(offset, offset + 2000)));
    return blocks;
  }
  const blocks = [];
  for (const line of content.split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (/^#{1,3}\s+/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      blocks.push(textBlock(`heading_${level}`, line.replace(/^#{1,3}\s+/, ''), {parseLinks: true}));
    } else if (/^[-*]\s+\[[ xX]\]\s+/.test(line)) {
      const match = line.match(/^[-*]\s+\[([ xX])\]\s+(.*)$/);
      blocks.push(textBlock('to_do', match[2], {checked: match[1].toLowerCase() === 'x', parseLinks: true}));
    } else if (/^[-*]\s+/.test(line)) {
      blocks.push(textBlock('bulleted_list_item', line.replace(/^[-*]\s+/, ''), {parseLinks: true}));
    } else if (/^---+$/.test(line.trim())) blocks.push({object: 'block', type: 'divider', divider: {}});
    else blocks.push(textBlock('paragraph', line, {parseLinks: true}));
  }
  return blocks;
}
module.exports = {contentToNotionBlocks};
