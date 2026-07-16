import {
  parseCategoryLocationCSV,
  parseKatottgDataCSV,
  transformCategoryLocationData,
  transformKatottgData,
} from './katottg';

export async function generateKatottgData() {
  const parsedLocationArray = await parseKatottgDataCSV();
  return parsedLocationArray.map(transformKatottgData);
}

export async function generateCategoryLocationData() {
  const parsedCategoryLocationArray = await parseCategoryLocationCSV();
  return parsedCategoryLocationArray.map(transformCategoryLocationData);
}

export type { NewLocationType, NewLocationCategoryType, AllowedLocationCategory } from './katottg';
