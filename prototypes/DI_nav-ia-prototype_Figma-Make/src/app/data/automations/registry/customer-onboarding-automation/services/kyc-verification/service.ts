/**
 * KYC Verification Service
 * 
 * Human-readable ID: kyc-verification
 * Hash ID: skyc1
 * Parent Automation: customer-onboarding-automation (t8x3p)
 * 
 * Know Your Customer verification with identity validation and watchlist screening
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  // Identity
  id: 'kyc-verification',
  hashId: 'skyc1',
  
  name: 'KYC Verification Service',
  displayName: 'KYC Identity Validator',
  description: 'Know Your Customer verification with identity validation and watchlist screening',
  
  status: 'deployed',
  type: 'decision-service',
  
  // Parent automation
  automationId: 'customer-onboarding-automation',
  
  // Assets within this service
  assetIds: [
    'kyc-decision-model',
  ],
  
  // Functions in this service
  functionIds: [
    'identity-verification',
  ],
  
  // Data models used by this service
  dataModelIds: [
    'kyc-data-model',
  ],
  
  // Metadata
  tags: [serviceTags[1], serviceTags[4]], // Production, Compliance
  branch: 'main',
  
  // Timestamps
  createdDate: '2024-03-15T10:40:00.000Z',
  lastUpdatedDate: '2024-11-01T14:25:00.000Z',
  lastUpdatedBy: 'sarah.chen@ibm.com',
  createdBy: 'sarah.chen@ibm.com',
  version: '1.8.2',
  
  // API Configuration
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/kyc',
  authentication: 'oauth',
  
  // Analytics
  requestCount: 87340,
  avgResponseTime: 450,
  successRate: 99.2,
};
