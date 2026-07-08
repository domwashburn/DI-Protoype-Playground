/**
 * Fraud Detection Service
 * 
 * Human-readable ID: fraud-detection
 * Hash ID: sfd1k
 * Parent Automation: automation-6-24-20 (a6k2p)
 * 
 * Real-time fraud detection using machine learning and behavioral analytics
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  // Identity
  id: 'fraud-detection',
  hashId: 'sfd1k',
  
  name: 'Fraud Detection Service',
  displayName: 'Real-time Fraud Detector',
  description: 'Real-time fraud detection using machine learning and behavioral analytics',
  
  status: 'deployed',
  type: 'ml-service',
  
  // Parent automation
  automationId: 'automation-6-24-20',
  
  // Assets within this service
  assetIds: [
    'fraud-detection-ml-model',
    'fraud-rules',
  ],
  
  // Functions
  functionIds: [
    'fraud-detection-check',
  ],
  
  // Data models
  dataModelIds: [
    'fraud-score-data-model',
  ],
  
  // Metadata
  tags: [serviceTags[1], serviceTags[6], serviceTags[7]], // Production, ML Enabled, Real-time
  branch: 'main',
  
  // Timestamps
  createdDate: '2025-06-24T15:50:00.000Z',
  lastUpdatedDate: '2025-10-14T09:30:00.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '2.1.3',
  
  // API Configuration
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/fraud-detection',
  authentication: 'api-key',
  
  // Analytics
  requestCount: 89532,
  avgResponseTime: 180,
  successRate: 99.9,
};
