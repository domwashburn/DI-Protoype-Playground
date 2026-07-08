/**
 * ML Model Assets for Credit Risk Assessment Service
 * 
 * Machine learning models for credit risk prediction
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'credit-risk-ml-model',
    hashId: 'acml1',
    type: 'ml-model',
    
    name: 'Credit Risk ML Model',
    displayName: 'Credit Risk Predictor',
    description: 'Machine learning model for credit risk prediction using customer and application data',
    
    status: 'deployed',
    serviceId: 'credit-risk-assessment',
    
    // ML specific properties
    modelType: 'random-forest',
    accuracy: 94.2,
    framework: 'scikit-learn',
    trainingDate: '2025-10-01T00:00:00.000Z',
    
    // Data models used
    inputDataModelIds: [
      'customer-data-model',
      'credit-application-data-model'
    ],
    outputDataModelIds: ['risk-score-data-model'],
    
    tags: [],
    createdDate: '2025-06-24T15:47:00.000Z',
    lastUpdatedDate: '2025-10-15T14:20:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '1.2.0',
    branch: 'main',
  },
];
