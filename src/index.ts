import 'dotenv/config';

import { GithubDataClient } from './github-data-client';
import { DATA_REGISTRY } from './katottg/registry';
import { fetchAndTransform } from './katottg/utils';

export async function Data() {
  const client = new GithubDataClient();
  await client.listAssetNames();

  const [katottgData, categoryLocationData] = await Promise.all([
    fetchAndTransform(
      client,
      DATA_REGISTRY.katottg.assetName,
      DATA_REGISTRY.katottg.columns,
      DATA_REGISTRY.katottg.transform
    ),
    fetchAndTransform(
      client,
      DATA_REGISTRY.locationCategory.assetName,
      DATA_REGISTRY.locationCategory.columns,
      DATA_REGISTRY.locationCategory.transform
    ),
  ]);

  return { katottgData, categoryLocationData };
}
