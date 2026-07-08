/**
 * Fraud Check Service (sfc1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { mlModels } from './ml-models';
export { ruleModels } from './rule-models';
export * as functions from './functions';

import { mlModels } from './ml-models';
import { ruleModels } from './rule-models';

export const allAssets = [
  ...mlModels,
  ...ruleModels,
];
