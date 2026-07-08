/**
 * Rule Model Assets for Fraud Check Service
 */

import type { RuleModelAsset } from '../../../../shared/types';

export const ruleModels: RuleModelAsset[] = [
  {
    id: 'fraud-rules',
    hashId: 'arfr1',
    type: 'rule-model',
    name: 'Fraud Detection Rules',
    displayName: 'Fraud Indicator Rules',
    description: 'Business rules for identifying fraud indicators and suspicious patterns',
    status: 'deployed',
    serviceId: 'fraud-check',
    inputDataModelIds: ['fraud-check-model'],
    outputDataModelIds: ['fraud-check-model'],
    tags: [],
    createdDate: '2024-02-20T09:40:00.000Z',
    lastUpdatedDate: '2024-11-02T16:55:00.000Z',
    lastUpdatedBy: 'mike.johnson@ibm.com',
    createdBy: 'mike.johnson@ibm.com',
    version: '1.9.5',
    branch: 'main',
  },
];
