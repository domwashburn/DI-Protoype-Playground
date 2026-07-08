/**
 * Decision Model Assets for Claims Assessment Service
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'claims-assessment-decision-model',
    hashId: 'acdm1',
    type: 'decision-model',
    name: 'Claims Assessment Decision Model',
    displayName: 'Claims Evaluation Orchestrator',
    description: 'Orchestrates claim evaluation workflow with severity analysis and settlement calculation',
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
