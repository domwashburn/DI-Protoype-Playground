/**
 * Demand Forecast Service (sdf1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { mlModels } from './ml-models';
export * as functions from './functions';

import { mlModels } from './ml-models';

export const allAssets = [
  ...mlModels,
];
