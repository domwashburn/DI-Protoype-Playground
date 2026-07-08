/**
 * Claims Intake Service (sci1k)
 * Complete service export
 */

export { service } from './service';
export { dataModels } from './data-models';
export { decisionModels } from './decision-models';
export { ruleModels } from './rule-models';
export * as functions from './functions';

// Aggregate all assets
import { decisionModels } from './decision-models';
import { ruleModels } from './rule-models';

export const allAssets = [
  ...decisionModels,
  ...ruleModels,
];
