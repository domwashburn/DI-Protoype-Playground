/**
 * Decision Model Assets for Onboarding Service
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'onboarding-decision-model',
    hashId: 'aodm1',
    type: 'decision-model',
    
    name: 'Onboarding Decision Model',
    displayName: 'Customer Onboarding Decision Engine',
    description: 'Orchestrates customer onboarding flow with document verification and KYC checks',
    
    status: 'deployed',
    serviceId: 'onboarding-service',
    
    inputDataModelIds: ['onboarding-data-model'],
    outputDataModelIds: ['onboarding-data-model'],
    
    tags: [],
    createdDate: '2024-03-15T10:35:00.000Z',
    lastUpdatedDate: '2024-11-01T14:20:00.000Z',
    lastUpdatedBy: 'sarah.chen@ibm.com',
    createdBy: 'sarah.chen@ibm.com',
    version: '2.1.0',
    branch: 'main',
  },
];
