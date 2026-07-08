/**
 * Decision Model Assets for Pricing Engine Service
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'pricing-decision-model',
    hashId: 'apdm1',
    type: 'decision-model',
    name: 'Pricing Decision Model',
    displayName: 'Price Optimization Orchestrator',
    description: 'Orchestrates pricing optimization workflow',
    status: 'deployed',
    serviceId: 'pricing-engine',
    inputDataModelIds: ['pricing-model'],
    outputDataModelIds: ['pricing-model'],
    tags: [],
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '3.0.1',
    branch: 'main',
  },
];
