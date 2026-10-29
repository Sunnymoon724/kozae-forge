require('../_shared/retry-fetch').installFetchRetry();
const fs = require('node:fs');
const {splitIntoChunks} = require('./chunks');

for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) {
    process.env[name.replaceAll('-', '_')] = value;
  }
}

function requiredInput(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required input: ${name.replace('INPUT_', '').toLowerCase().replaceAll('_', '-')}`);
  }
  return value;
}

async function main() {
  const provider = requiredInput('INPUT_PROVIDER');
  const apiBase = requiredInput('INPUT_API_BASE');
  const model = requiredInput('INPUT_MODEL');
  const prompt = requiredInput('INPUT_PROMPT');
  const content = requiredInput('INPUT_CONTENT');
  const apiKey = requiredInput('INPUT_API_KEY');
  const maxContentBytes = Number(process.env.INPUT_MAX_CONTENT_BYTES || 0);
  if (!Number.isSafeInteger(maxContentBytes) || maxContentBytes < 0) {
    throw new Error('max-content-bytes must be a non-negative integer.');
  }
  if (!['openai', 'openai-compatible'].includes(provider)) {
    throw new Error('Unsupported provider.');
  }

  async function generate(systemPrompt, input) {
    const request = {model, messages: [{role: 'system', content: systemPrompt}, {role: 'user', content: input}]};
    if (provider === 'openai-compatible') request.reasoning_effort = 'none';
    const response = await fetch(`${apiBase.replace(/\/$/, '')}/chat/completions`, {method: 'POST', headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'}, body: JSON.stringify(request)});
    if (!response.ok) throw new Error(await response.text());
    const result = (await response.json()).choices?.[0]?.message?.content;
    if (!result) throw new Error('The API response did not include generated content.');
    return result;
  }

  let input = content;
  const summaryPrompt = 'Summarize the supplied portion of source material in concise notes. Preserve concrete facts, changed features, files, and dates. Do not invent details or write the final document. Return only the notes.';
  for (let pass = 0; maxContentBytes && Buffer.byteLength(input, 'utf8') > maxContentBytes; pass++) {
    if (pass >= 5) throw new Error('Content remains too large after five summarization passes.');
    const chunks = splitIntoChunks(input, maxContentBytes);
    console.log(`Summarization pass ${pass + 1}: ${chunks.length} chunk(s).`);
    const summaries = [];
    for (let index = 0; index < chunks.length; index++) {
      console.log(`Summarizing chunk ${index + 1}/${chunks.length}.`);
      summaries.push(await generate(summaryPrompt, chunks[index]));
    }
    const combined = summaries.join('\n\n');
    if (Buffer.byteLength(combined, 'utf8') >= Buffer.byteLength(input, 'utf8')) {
      throw new Error('Chunk summaries did not reduce the input size.');
    }
    input = combined;
  }

  const generatedContent = await generate(prompt, input);
  fs.appendFileSync(requiredInput('GITHUB_OUTPUT'), `content<<EOF\n${generatedContent}\nEOF\n`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {main};
