/**
 * Rule Model Assets for Fraud Detection Service
 */

import type { RuleModelAsset } from '../../../../shared/types';

export const ruleModels: RuleModelAsset[] = [
  {
    id: 'fraud-rules',
    hashId: 'afrm1',
    type: 'rule-model',
    
    name: 'Fraud Detection Rules',
    displayName: 'Fraud Rule Set',
    description: 'Business rules for fraud pattern detection',
    
    status: 'deployed',
    serviceId: 'fraud-detection',
    
    ruleCount: 23,
    
    tags: [],
    createdDate: '2025-06-24T15:50:00.000Z',
    lastUpdatedDate: '2025-10-14T09:30:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '2.1.3',
    branch: 'main',
  },
];
