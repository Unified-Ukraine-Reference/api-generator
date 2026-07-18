export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, init);
    if (response.ok) {
      return response;
    }
    if (response.status >= 500 && i < retries - 1) {
      await sleep(2 ** i * 1000);
      continue;
    }
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  throw new Error('Max retries exceeded');
}
