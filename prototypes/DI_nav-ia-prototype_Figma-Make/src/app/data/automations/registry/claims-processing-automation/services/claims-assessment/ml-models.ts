/**
 * ML Model Assets for Claims Assessment Service
 */

import type { MLModelAsset } from '../../../../shared/types';

export const mlModels: MLModelAsset[] = [
  {
    id: 'claim-severity-model',
    hashId: 'acsm1',
    type: 'ml-model',
    name: 'Claim Severity Model',
    displayName: 'AI Claim Severity Classifier',
    description: 'Machine learning model that predicts claim severity based on historical data patterns',
    status: 'deployed',
    serviceId: 'claims-assessment',
    inputDataModelIds: ['claims-assessment-model'],
    outputDataModelIds: ['claims-assessment-model'],
    tags: [],
    createdDate: '2024-02-20T09:30:00.000Z',
    lastUpdatedDate: '2024-11-02T16:50:00.000Z',
    lastUpdatedBy: 'mike.johnson@ibm.com',
    createdBy: 'mike.johnson@ibm.com',
    version: '2.8.0',
    branch: 'main',
    modelType: 'classification',
    framework: 'tensorflow',
    accuracy: 0.94,
  },
];
