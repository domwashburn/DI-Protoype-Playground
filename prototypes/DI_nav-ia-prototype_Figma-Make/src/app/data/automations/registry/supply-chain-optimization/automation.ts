/**
 * Supply Chain Optimization (test-4)
 * Hash ID: sc4a1
 */

import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  id: 'supply-chain-optimization',
  hashId: 'sc4a1',
  name: 'Supply Chain Optimization',
  displayName: 'Supply Chain Optimization',
  description: 'End-to-end supply chain optimization with demand forecasting and inventory management',
  status: 'deployed',
  variant: 'standard',
  serviceIds: ['demand-forecast-sc', 'inventory-optimizer', 'logistics-routing'],
  linkedObjectiveIds: [],
  tags: [commonTags[0], commonTags[1]],
  industry: 'Manufacturing',
  branch: 'main',
  createdDate: '2025-06-30T10:35:17.000Z',
  lastUpdatedDate: '2025-06-30T10:35:17.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '1.8.0',
  executionCount: 34521,
  lastExecuted: '2025-10-16T06:00:00.000Z',
};
