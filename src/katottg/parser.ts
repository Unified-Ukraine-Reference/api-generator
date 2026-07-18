import { Parser, type Options } from 'csv-parse';
import { Readable } from 'node:stream';

export class CsvParser<T> {
  private readonly textCSV: string;
  private readonly options: Options;

  constructor(textCSV: string, options: Options) {
    this.textCSV = textCSV;
    this.options = options;
  }

  async parse(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const result: T[] = [];
      const stream = Readable.from(this.textCSV);
      const parser = new Parser(this.options);

      stream
        .pipe(parser)
        .on('data', (row) => result.push(row))
        .on('end', () => resolve(result))
        .on('error', (err: Error) => reject(err));
    });
  }
}

// Export function parseKatottgDataCSV(): Promise<ParsedKatottgData[]> {
//   Return new Promise((resolve, reject) => {
//     Const result: ParsedKatottgData[] = [];

//     Const parser = new Parser({
//       Columns: KATOTTG_COLUMNS,
//       Skip_empty_lines: true,
//     });

//     Fs.createReadStream(path.join(process.cwd(), 'public', 'katottg.csv'), 'utf-8')
//       .pipe(parser)
//       .on('data', (row) => {
//         Result.push(row);
//       })
//       .on('end', () => {
//         Resolve(result);
//       })
//       .on('error', (err: Error) => {
//         Reject(err);
//       });
//   });
// }

// Export function parseCategoryLocationCSV(): Promise<ParsedLocationCategoryData[]> {
//   Return new Promise((resolve, reject) => {
//     Const result: ParsedLocationCategoryData[] = [];

//     Const parser = new Parser({
//       Columns: LOCATION_CATEGORY_COLUMNS,
//       Skip_empty_lines: true,
//     });

//     Fs.createReadStream(path.join(process.cwd(), 'public', 'location-category.csv'), 'utf-8')
//       .pipe(parser)
//       .on('data', (row) => {
//         Result.push(row);
//       })
//       .on('end', () => {
//         Resolve(result);
//       })
//       .on('error', (err: Error) => {
//         Reject(err);
//       });
//   });
// }
