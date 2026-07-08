/**
 * Fraud Detection Service (sfd1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { mlModels } from './ml-models';
export { ruleModels } from './rule-models';

// Aggregate all assets
import { mlModels } from './ml-models';
import { ruleModels } from './rule-models';

export const allAssets = [
  ...mlModels,
  ...ruleModels,
];
