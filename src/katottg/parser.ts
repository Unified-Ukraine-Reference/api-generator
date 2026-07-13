import fs from 'node:fs';
import path from 'node:path';
import { Parser } from 'csv-parse';

import { KATOTTG_COLUMNS } from './constants';

import type { ParsedKatottgData } from './types';

export function parseKatottgDataCSV(): Promise<ParsedKatottgData[]> {
  return new Promise((resolve, reject) => {
    const result: ParsedKatottgData[] = [];

    const parser = new Parser({
      columns: KATOTTG_COLUMNS,
      skip_empty_lines: true,
    });

    fs.createReadStream(path.join(process.cwd(), 'public', 'katottg.csv'), 'utf-8')
      .pipe(parser)
      .on('data', (row) => {
        result.push(row);
      })
      .on('end', () => {
        resolve(result);
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
}
