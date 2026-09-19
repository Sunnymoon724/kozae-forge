async function notify() {
  const headers = JSON.parse(process.env.INPUT_HEADERS);
  const response = await fetch(process.env.INPUT_URL, {method: process.env.INPUT_METHOD, headers, body: process.env.INPUT_BODY});
  if (!response.ok) throw new Error(`Webhook request failed: ${response.status} ${await response.text()}`);
}

notify().catch((error) => { console.error(error); process.exit(1); });
