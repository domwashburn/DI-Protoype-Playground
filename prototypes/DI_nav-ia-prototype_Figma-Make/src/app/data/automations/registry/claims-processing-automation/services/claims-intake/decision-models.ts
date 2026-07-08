/**
 * Decision Model Assets for Claims Intake Service
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'claims-intake-decision-model',
    hashId: 'acim1',
    type: 'decision-model',
    
    name: 'Claims Intake Decision Model',
    displayName: 'Claims Intake Orchestrator',
    description: 'Orchestrates claim validation and initial processing workflow',
    
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
