/**
 * Decision Model Assets for Credit Risk Assessment Service
 * 
 * Decision models that orchestrate the credit risk assessment logic
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'credit-decision-model',
    hashId: 'acdm1',
    type: 'decision-model',
    
    name: 'Credit Decision Model',
    displayName: 'Credit Risk Decision Engine',
    description: 'Main decision model for credit risk assessment that orchestrates rules, ML models, and business logic',
    
    status: 'deployed',
    serviceId: 'credit-risk-assessment',
    
    // Data models used
    inputDataModelIds: [
      'customer-data-model',
      'credit-application-data-model'
    ],
    outputDataModelIds: ['risk-score-data-model'],
    
    // Dependencies (other assets this model uses)
    dependencies: [
      'credit-risk-rules',
      'credit-risk-ml-model'
    ],
    
    tags: [],
    createdDate: '2025-06-24T15:47:00.000Z',
    lastUpdatedDate: '2025-10-15T14:20:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '1.2.0',
    branch: 'main',
  },
];
