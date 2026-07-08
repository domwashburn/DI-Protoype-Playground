/**
 * Rule Model Assets for Pricing Engine Service
 */

import type { RuleModelAsset } from '../../../../shared/types';

export const ruleModels: RuleModelAsset[] = [
  {
    id: 'pricing-rules',
    hashId: 'arpr1',
    type: 'rule-model',
    name: 'Pricing Rules',
    displayName: 'Price Optimization Rules',
    description: 'Business rules for pricing constraints and optimization',
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
