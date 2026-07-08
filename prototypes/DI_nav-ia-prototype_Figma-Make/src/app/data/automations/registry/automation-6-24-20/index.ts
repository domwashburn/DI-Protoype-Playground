/**
 * Credit Risk Assessment Automation (a6k2p)
 * Complete automation export
 */

export { automation } from './automation';
export * as services from './services';

// Aggregate all services
import * as creditRiskAssessment from './services/credit-risk-assessment';
import * as fraudDetection from './services/fraud-detection';

export const allServices = [
  creditRiskAssessment.service,
  fraudDetection.service,
];

export const allDataModels = [
  ...creditRiskAssessment.dataModels,
  ...fraudDetection.dataModels,
];

export const allAssets = [
  ...creditRiskAssessment.allAssets,
  ...fraudDetection.allAssets,
];
