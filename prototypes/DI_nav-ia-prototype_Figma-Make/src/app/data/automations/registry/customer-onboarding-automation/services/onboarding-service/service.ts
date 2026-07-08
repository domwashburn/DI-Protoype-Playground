/**
 * Onboarding Service
 * 
 * Human-readable ID: onboarding-service
 * Hash ID: son1k
 * Parent Automation: customer-onboarding-automation (t8x3p)
 * 
 * Customer onboarding orchestration with automated document processing
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  // Identity
  id: 'onboarding-service',
  hashId: 'son1k',
  
  name: 'Onboarding Service',
  displayName: 'Customer Onboarding Orchestrator',
  description: 'Customer onboarding orchestration with automated document processing',
  
  status: 'deployed',
  type: 'decision-service',
  
  // Parent automation
  automationId: 'customer-onboarding-automation',
  
  // Assets within this service
  assetIds: [
    'onboarding-decision-model',
  ],
  
  // Functions in this service
  functionIds: [
    'document-verification',
  ],
  
  // Data models used by this service
  dataModelIds: [
    'onboarding-data-model',
  ],
  
  // Metadata
  tags: [serviceTags[1], serviceTags[7]], // Production, Real-time
  branch: 'main',
  
  // Timestamps
  createdDate: '2024-03-15T10:30:00.000Z',
  lastUpdatedDate: '2024-11-01T14:20:00.000Z',
  lastUpdatedBy: 'sarah.chen@ibm.com',
  createdBy: 'sarah.chen@ibm.com',
  version: '2.1.0',
  
  // API Configuration
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/onboarding',
  authentication: 'oauth',
  
  // Analytics
  requestCount: 87340,
  avgResponseTime: 320,
  successRate: 98.5,
};
