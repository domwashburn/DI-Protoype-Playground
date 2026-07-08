/**
 * Dynamic Pricing Automation (h9k3m)
 * Complete automation export
 */

export { automation } from './automation';
export * as services from './services';

import * as pricingEngine from './services/pricing-engine';
import * as competitorAnalysis from './services/competitor-analysis';
import * as demandForecast from './services/demand-forecast';

export const allServices = [
  pricingEngine.service,
  competitorAnalysis.service,
  demandForecast.service,
];

export const allDataModels = [
  ...pricingEngine.dataModels,
  ...competitorAnalysis.dataModels,
  ...demandForecast.dataModels,
];

export const allAssets = [
  ...pricingEngine.allAssets,
  ...competitorAnalysis.allAssets,
  ...demandForecast.allAssets,
];
