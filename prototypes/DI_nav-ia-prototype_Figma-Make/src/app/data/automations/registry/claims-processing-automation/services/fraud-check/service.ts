/**
 * Fraud Check Service
 * 
 * Human-readable ID: fraud-check
 * Hash ID: sfc1k
 * Parent Automation: claims-processing-automation (t7y2p)
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  id: 'fraud-check',
  hashId: 'sfc1k',
  name: 'Fraud Check Service',
  displayName: 'Fraud Detection Engine',
  description: 'Detects fraudulent claims using ML models and pattern analysis',
  status: 'deployed',
  type: 'decision-service',
  automationId: 'claims-processing-automation',
  assetIds: ['fraud-detection-model', 'fraud-rules'],
  functionIds: ['detect-fraud'],
  dataModelIds: ['fraud-check-model'],
  tags: [serviceTags[1], serviceTags[4]], // Production, Compliance
  branch: 'main',
  createdDate: '2024-02-20T09:35:00.000Z',
  lastUpdatedDate: '2024-11-02T16:55:00.000Z',
  lastUpdatedBy: 'mike.johnson@ibm.com',
  createdBy: 'mike.johnson@ibm.com',
  version: '1.9.5',
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/fraud',
  authentication: 'oauth',
  requestCount: 156780,
  avgResponseTime: 180,
  successRate: 99.5,
};
