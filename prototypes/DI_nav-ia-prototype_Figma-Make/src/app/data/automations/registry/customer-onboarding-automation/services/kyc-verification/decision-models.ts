/**
 * Decision Model Assets for KYC Verification Service
 */

import type { DecisionModelAsset } from '../../../../shared/types';

export const decisionModels: DecisionModelAsset[] = [
  {
    id: 'kyc-decision-model',
    hashId: 'akdm1',
    type: 'decision-model',
    
    name: 'KYC Decision Model',
    displayName: 'KYC Verification Engine',
    description: 'Orchestrates identity verification and watchlist screening for KYC compliance',
    
    status: 'deployed',
    serviceId: 'kyc-verification',
    
    inputDataModelIds: ['kyc-data-model'],
    outputDataModelIds: ['kyc-data-model'],
    
    tags: [],
    createdDate: '2024-03-15T10:45:00.000Z',
    lastUpdatedDate: '2024-11-01T14:25:00.000Z',
    lastUpdatedBy: 'sarah.chen@ibm.com',
    createdBy: 'sarah.chen@ibm.com',
    version: '1.8.2',
    branch: 'main',
  },
];
