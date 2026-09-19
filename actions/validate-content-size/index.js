for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;

const limit = Number(process.env.INPUT_MAX_CONTENT_BYTES);
if (!Number.isSafeInteger(limit) || limit <= 0) throw new Error('max-content-bytes must be a positive integer.');
if (Buffer.byteLength(process.env.INPUT_CONTENT || '', 'utf8') > limit) throw new Error('Content exceeds max-content-bytes.');
for (const [name, value] of Object.entries(process.env)) if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
