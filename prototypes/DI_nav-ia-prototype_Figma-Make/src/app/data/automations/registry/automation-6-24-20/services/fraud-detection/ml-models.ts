/**
 * ML Model Assets for Fraud Detection Service
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'fraud-detection-ml-model',
    hashId: 'afdm1',
    type: 'ml-model',
    
    name: 'Fraud Detection ML Model',
    displayName: 'Fraud Detector',
    description: 'Machine learning model for real-time fraud detection',
    
    status: 'deployed',
    serviceId: 'fraud-detection',
    
    modelType: 'neural-network',
    accuracy: 96.8,
    framework: 'tensorflow',
    trainingDate: '2025-09-15T00:00:00.000Z',
    
    inputDataModelIds: ['customer-data-model'],
    outputDataModelIds: ['fraud-score-data-model'],
    
    tags: [],
    createdDate: '2025-06-24T15:50:00.000Z',
    lastUpdatedDate: '2025-10-14T09:30:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '2.1.3',
    branch: 'main',
  },
];
