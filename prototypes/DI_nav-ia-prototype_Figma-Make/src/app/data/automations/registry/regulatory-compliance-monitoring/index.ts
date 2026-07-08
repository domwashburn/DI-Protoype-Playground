/**
 * Regulatory Compliance Monitoring (rc2a1)
 */

export { automation } from './automation';
export * as services from './services';

import * as complianceChecker from './services/compliance-checker';
import * as reportingEngine from './services/reporting-engine';

export const allServices = [
  complianceChecker.service,
  reportingEngine.service,
];

export const allDataModels = [];
export const allAssets = [];
