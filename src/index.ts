import { parseKatottgDataCSV, transformKatottgData } from '../src/katottg';

async function generateKatottgData() {
  const parsedLocationArray = await parseKatottgDataCSV();
  const transformLocationsArray = parsedLocationArray.map(transformKatottgData);

  return transformLocationsArray;
}

export { generateKatottgData };
