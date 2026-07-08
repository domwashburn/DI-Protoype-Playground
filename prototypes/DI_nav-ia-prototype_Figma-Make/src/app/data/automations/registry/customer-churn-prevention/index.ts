/**
 * Customer Churn Prevention (ccp1a)
 */

export { automation } from './automation';
export * as services from './services';

import * as churnPrediction from './services/churn-prediction';
import * as campaignTrigger from './services/campaign-trigger';

export const allServices = [
  churnPrediction.service,
  campaignTrigger.service,
];

export const allDataModels = [];
export const allAssets = [];
