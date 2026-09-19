const limit = Number(process.env.INPUT_MAX_CONTENT_BYTES);
if (!Number.isSafeInteger(limit) || limit <= 0) throw new Error('max-content-bytes must be a positive integer.');
if (Buffer.byteLength(process.env.INPUT_CONTENT || '', 'utf8') > limit) throw new Error('Content exceeds max-content-bytes.');
