/**
 * ML Model Assets for Fraud Check Service
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'fraud-detection-model',
    hashId: 'afdm1',
    type: 'ml-model',
    name: 'Fraud Detection Model',
    displayName: 'AI Fraud Detector',
    description: 'Machine learning model that detects fraudulent claims using pattern recognition',
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
    modelType: 'classification',
    framework: 'scikit-learn',
    accuracy: 0.97,
  },
];
