function splitIntoChunks(content, limit) {
  const chunks = [];
  let current = '';
  let bytes = 0;

  function flush() {
    if (current) chunks.push(current);
    current = '';
    bytes = 0;
  }

  for (const line of content.match(/[^\n]*\n|[^\n]+$/g) || []) {
    const lineBytes = Buffer.byteLength(line, 'utf8');
    if (bytes + lineBytes <= limit) {
      current += line;
      bytes += lineBytes;
      continue;
    }
    flush();
    if (lineBytes <= limit) {
      current = line;
      bytes = lineBytes;
      continue;
    }
    for (const character of line) {
      const size = Buffer.byteLength(character, 'utf8');
      if (size > limit) throw new Error('max-content-bytes is too small for a UTF-8 character.');
      if (bytes + size > limit) flush();
      current += character;
      bytes += size;
    }
  }
  flush();
  return chunks;
}

module.exports = {splitIntoChunks};
