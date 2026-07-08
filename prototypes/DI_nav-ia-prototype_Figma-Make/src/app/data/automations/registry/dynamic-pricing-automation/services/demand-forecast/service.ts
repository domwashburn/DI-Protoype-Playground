/**
 * Demand Forecast Service
 * 
 * Human-readable ID: demand-forecast
 * Hash ID: sdf1k
 * Parent Automation: dynamic-pricing-automation (h9k3m)
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  id: 'demand-forecast',
  hashId: 'sdf1k',
  name: 'Demand Forecast Service',
  displayName: 'Demand Forecasting Engine',
  description: 'Predicts product demand using historical data and ML models',
  status: 'deployed',
  type: 'decision-service',
  automationId: 'dynamic-pricing-automation',
  assetIds: ['demand-forecast-ml-model'],
  functionIds: ['predict-demand'],
  dataModelIds: ['demand-model'],
  tags: [serviceTags[1]],
  branch: 'main',
  createdDate: '2025-06-30T10:39:00.000Z',
  lastUpdatedDate: '2025-06-30T10:39:00.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '3.0.1',
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/demand',
  authentication: 'oauth',
  requestCount: 765432,
  avgResponseTime: 210,
  successRate: 99.1,
};
