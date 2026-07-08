/**
 * Rule Model Assets for Claims Intake Service
 */

import type { RuleModelAsset } from '../../../../shared/types';

export const ruleModels: RuleModelAsset[] = [
  {
    id: 'claims-validation-rules',
    hashId: 'arvm1',
    type: 'rule-model',
    
    name: 'Claims Validation Rules',
    displayName: 'Claim Validation Rule Set',
    description: 'Business rules for validating claim submissions and required documentation',
    
    status: 'deployed',
    serviceId: 'claims-intake',
    
    inputDataModelIds: ['claim-submission-model'],
    outputDataModelIds: ['claim-submission-model'],
    
    tags: [],
    createdDate: '2024-02-20T09:05:00.000Z',
    lastUpdatedDate: '2024-11-02T16:45:00.000Z',
    lastUpdatedBy: 'mike.johnson@ibm.com',
    createdBy: 'mike.johnson@ibm.com',
    version: '3.2.1',
    branch: 'main',
  },
];
