/**
 * Credit Risk Assessment Service (scr1k)
 * Complete service export including data models, assets, and functions
 */

export { service } from './service';
export { dataModels } from './data-models';
export { decisionModels } from './decision-models';
export { ruleModels, rules } from './rule-models';
export { mlModels } from './ml-models';
export { taskModels } from './task-models';
export * as functions from './functions';

// Aggregate all assets for convenience
import { decisionModels } from './decision-models';
import { ruleModels } from './rule-models';
import { mlModels } from './ml-models';
import { taskModels } from './task-models';

export const allAssets = [
  ...decisionModels,
  ...ruleModels,
  ...mlModels,
  ...taskModels,
];
