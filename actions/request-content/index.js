const fs = require('node:fs');

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
  if (!['openai', 'openai-compatible'].includes(provider)) {
    throw new Error('Unsupported provider.');
  }

  const response = await fetch(`${apiBase.replace(/\/$/, '')}/chat/completions`, {method: 'POST', headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'}, body: JSON.stringify({model, messages: [{role: 'system', content: prompt}, {role: 'user', content}]})});
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const generatedContent = (await response.json()).choices?.[0]?.message?.content;
  if (!generatedContent) {
    throw new Error('The API response did not include generated content.');
  }
  fs.appendFileSync(requiredInput('GITHUB_OUTPUT'), `content<<EOF\n${generatedContent}\nEOF\n`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
