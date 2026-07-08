/**
 * Claims Intake Service
 * 
 * Human-readable ID: claims-intake
 * Hash ID: sci1k
 * Parent Automation: claims-processing-automation (t7y2p)
 * 
 * Initial claim submission, validation, and data extraction
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  // Identity
  id: 'claims-intake',
  hashId: 'sci1k',
  
  name: 'Claims Intake Service',
  displayName: 'Claims Intake & Validation',
  description: 'Initial claim submission, validation, and data extraction',
  
  status: 'deployed',
  type: 'decision-service',
  
  // Parent automation
  automationId: 'claims-processing-automation',
  
  // Assets within this service
  assetIds: [
    'claims-intake-decision-model',
    'claims-validation-rules',
  ],
  
  // Functions in this service
  functionIds: [
    'validate-claim-data',
    'extract-claim-info',
  ],
  
  // Data models used by this service
  dataModelIds: [
    'claim-submission-model',
  ],
  
  // Metadata
  tags: [serviceTags[1], serviceTags[7]], // Production, Real-time
  branch: 'main',
  
  // Timestamps
  createdDate: '2024-02-20T09:00:00.000Z',
  lastUpdatedDate: '2024-11-02T16:45:00.000Z',
  lastUpdatedBy: 'mike.johnson@ibm.com',
  createdBy: 'mike.johnson@ibm.com',
  version: '3.2.1',
  
  // API Configuration
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/claims/intake',
  authentication: 'oauth',
  
  // Analytics
  requestCount: 156780,
  avgResponseTime: 280,
  successRate: 99.1,
};
