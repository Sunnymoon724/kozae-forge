for (const [name, value] of Object.entries(process.env)) {
  if (name.startsWith('INPUT_')) process.env[name.replaceAll('-', '_')] = value;
}

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function hmac(key, value) { return crypto.createHmac('sha256', key).update(value).digest(); }
function hash(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function encodePath(value) { return value.split('/').map(encodeURIComponent).join('/'); }
function contentType(filePath) {
  return ({'.png': 'image/png', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp'})[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

async function upload(filePath, index) {
  const p = process.env;
  const body = fs.readFileSync(filePath);
  const endpoint = new URL(p.INPUT_ENDPOINT);
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  const date = amzDate.slice(0, 8);
  const region = 'auto';
  const key = `${p.INPUT_KEY_PREFIX.replace(/\/+$/, '')}/${index}-${hash(body).slice(0, 12)}-${path.basename(filePath)}`;
  const canonicalUri = `/${encodeURIComponent(p.INPUT_BUCKET)}${encodePath(`/${key}`)}`;
  const payloadHash = hash(body);
  const headers = {
    host: endpoint.host,
    'content-type': contentType(filePath),
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalHeaders = `content-type:${headers['content-type']}\nhost:${headers.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const canonicalRequest = ['PUT', canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
  const scope = `${date}/${region}/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, hash(canonicalRequest)].join('\n');
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${p.INPUT_SECRET_ACCESS_KEY}`, date), region), 's3'), 'aws4_request');
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  headers.authorization = `AWS4-HMAC-SHA256 Credential=${p.INPUT_ACCESS_KEY_ID}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const response = await fetch(`${endpoint.origin}${canonicalUri}`, {method: 'PUT', headers, body});
  if (!response.ok) throw new Error(`R2 upload failed for ${filePath}: ${response.status} ${await response.text()}`);
  const publicUrl = `${p.INPUT_PUBLIC_BASE_URL.replace(/\/+$/, '')}/${key.split('/').map(encodeURIComponent).join('/')}`;
  return {filePath, url: publicUrl, name: path.basename(filePath)};
}

async function main() {
  const p = process.env;
  for (const name of ['INPUT_ENDPOINT', 'INPUT_BUCKET', 'INPUT_PUBLIC_BASE_URL', 'INPUT_ACCESS_KEY_ID', 'INPUT_SECRET_ACCESS_KEY']) {
    if (!p[name]?.trim()) throw new Error(`${name.replace('INPUT_', '').toLowerCase()} is required.`);
  }
  try {
    const endpoint = new URL(p.INPUT_ENDPOINT);
    if (!['http:', 'https:'].includes(endpoint.protocol)) throw new Error('must use http or https');
  } catch (error) {
    throw new Error(`endpoint must be a valid URL, for example https://<account-id>.r2.cloudflarestorage.com (${error.message})`);
  }
  try {
    const publicBaseUrl = new URL(p.INPUT_PUBLIC_BASE_URL);
    if (!['http:', 'https:'].includes(publicBaseUrl.protocol)) throw new Error('must use http or https');
  } catch (error) {
    throw new Error(`public-base-url must be a valid URL (${error.message})`);
  }
  const files = p.INPUT_FILE_PATHS.split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
  if (!files.length) throw new Error('file-paths must contain at least one file.');
  const uploads = [];
  for (let index = 0; index < files.length; index++) uploads.push(await upload(files[index], index));
  const links = uploads.map(({url, name}) => `[${name}](${url})`);
  fs.appendFileSync(p.GITHUB_OUTPUT, `file-urls=${JSON.stringify(uploads.map(({url}) => url))}\nmarkdown-links<<EOF\n${links.join('\n')}\nEOF\n`);
}

main().catch((error) => { console.error(error); process.exit(1); });
