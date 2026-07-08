/**
 * ML Model Assets for Demand Forecast Service
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'demand-forecast-ml-model',
    hashId: 'adfm1',
    type: 'ml-model',
    name: 'Demand Forecast ML Model',
    displayName: 'AI Demand Predictor',
    description: 'Machine learning model for product demand forecasting',
    status: 'deployed',
    serviceId: 'demand-forecast',
    inputDataModelIds: ['demand-model'],
    outputDataModelIds: ['demand-model'],
    tags: [],
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '3.0.1',
    branch: 'main',
    modelType: 'regression',
    framework: 'tensorflow',
    accuracy: 0.91,
  },
];
