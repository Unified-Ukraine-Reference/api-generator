import type { GithubDataClient } from '../github-data-client';
import type { Options } from 'csv-parse';
import { CsvParser } from './parser';

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

export async function fetchAndTransform<Parsed, Result>(
  client: GithubDataClient,
  assetName: string,
  columns: NonNullable<Options['columns']>,
  transform: (row: Parsed) => Result
) {
  const csvText = await client.fetchCSV(assetName);
  const parser = new CsvParser<Parsed>(csvText, { columns, skip_empty_lines: true });
  const parsed = await parser.parse();
  return parsed.map(transform);
}
