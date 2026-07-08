/**
 * ML Model Assets for Competitor Analysis Service
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'competitor-analysis-ml-model',
    hashId: 'acam1',
    type: 'ml-model',
    name: 'Competitor Analysis ML Model',
    displayName: 'AI Competitive Intelligence',
    description: 'Machine learning model for competitor pricing pattern analysis',
    status: 'deployed',
    serviceId: 'competitor-analysis',
    inputDataModelIds: ['competitor-model'],
    outputDataModelIds: ['competitor-model'],
    tags: [],
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '3.0.1',
    branch: 'main',
    modelType: 'regression',
    framework: 'scikit-learn',
    accuracy: 0.89,
  },
];
