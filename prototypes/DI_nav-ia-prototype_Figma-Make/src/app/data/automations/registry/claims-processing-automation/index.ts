/**
 * Claims Processing Automation (t7y2p)
 * Complete automation export
 */

export { automation } from './automation';
export * as services from './services';

// Aggregate all services
import * as claimsIntake from './services/claims-intake';
import * as claimsAssessment from './services/claims-assessment';
import * as fraudCheck from './services/fraud-check';

export const allServices = [
  claimsIntake.service,
  claimsAssessment.service,
  fraudCheck.service,
];

export const allDataModels = [
  ...claimsIntake.dataModels,
  ...claimsAssessment.dataModels,
  ...fraudCheck.dataModels,
];

export const allAssets = [
  ...claimsIntake.allAssets,
  ...claimsAssessment.allAssets,
  ...fraudCheck.allAssets,
];
