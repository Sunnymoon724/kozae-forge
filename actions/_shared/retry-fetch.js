const nativeFetch = globalThis.fetch;
const retryableMethods = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']);
const maxRetries = 3;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function retryDelay(response, attempt) {
  const value = response.headers.get('retry-after');
  if (value) {
    const seconds = Number(value);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1000, 30000);
    const timestamp = Date.parse(value);
    if (!Number.isNaN(timestamp)) return Math.min(Math.max(timestamp - Date.now(), 0), 30000);
  }
  return Math.min(1000 * (2 ** attempt), 30000);
}

async function retryFetch(...args) {
  const options = args[1] || {};
  const method = String(options.method || 'GET').toUpperCase();
  const canRetry = retryableMethods.has(method);

  for (let attempt = 0; ; attempt += 1) {
    try {
      const response = await nativeFetch(...args);
      const temporaryFailure = response.status === 429 || response.status >= 500;
      if (!canRetry || !temporaryFailure || attempt >= maxRetries) return response;
      const wait = retryDelay(response, attempt);
      console.log(`Retrying ${method} request after HTTP ${response.status} in ${wait}ms.`);
      await delay(wait);
    } catch (error) {
      if (!canRetry || attempt >= maxRetries) throw error;
      const wait = Math.min(1000 * (2 ** attempt), 30000);
      console.log(`Retrying ${method} request after a network error in ${wait}ms.`);
      await delay(wait);
    }
  }
}

function installFetchRetry() {
  globalThis.fetch = retryFetch;
}

module.exports = {installFetchRetry};
