/**
 * Claims Assessment Service (sca1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { decisionModels } from './decision-models';
export { ruleModels } from './rule-models';
export { mlModels } from './ml-models';
export * as functions from './functions';

import { decisionModels } from './decision-models';
import { ruleModels } from './rule-models';
import { mlModels } from './ml-models';

export const allAssets = [
  ...decisionModels,
  ...ruleModels,
  ...mlModels,
];
