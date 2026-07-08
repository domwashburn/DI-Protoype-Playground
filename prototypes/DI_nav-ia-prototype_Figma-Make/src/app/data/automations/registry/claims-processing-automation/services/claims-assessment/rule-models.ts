/**
 * Rule Model Assets for Claims Assessment Service
 */

import type { RuleModelAsset } from '../../../../shared/types';

export const ruleModels: RuleModelAsset[] = [
  {
    id: 'settlement-rules',
    hashId: 'arsr1',
    type: 'rule-model',
    name: 'Settlement Rules',
    displayName: 'Settlement Calculation Rules',
    description: 'Business rules for calculating claim settlements based on policy terms and damage assessment',
    status: 'deployed',
    serviceId: 'claims-assessment',
    inputDataModelIds: ['claims-assessment-model'],
    outputDataModelIds: ['claims-assessment-model'],
    tags: [],
    createdDate: '2024-02-20T09:25:00.000Z',
    lastUpdatedDate: '2024-11-02T16:50:00.000Z',
    lastUpdatedBy: 'mike.johnson@ibm.com',
    createdBy: 'mike.johnson@ibm.com',
    version: '2.8.0',
    branch: 'main',
  },
];
