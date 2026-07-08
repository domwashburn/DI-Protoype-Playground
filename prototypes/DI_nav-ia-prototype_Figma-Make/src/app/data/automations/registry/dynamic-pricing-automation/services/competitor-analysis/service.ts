/**
 * Competitor Analysis Service
 * 
 * Human-readable ID: competitor-analysis
 * Hash ID: sca2k
 * Parent Automation: dynamic-pricing-automation (h9k3m)
 */

import type { DecisionService } from '../../../../shared/types';
import { serviceTags } from '../../../../shared/tags';

export const service: DecisionService = {
  id: 'competitor-analysis',
  hashId: 'sca2k',
  name: 'Competitor Analysis Service',
  displayName: 'Competitive Intelligence',
  description: 'Monitors and analyzes competitor pricing strategies',
  status: 'deployed',
  type: 'decision-service',
  automationId: 'dynamic-pricing-automation',
  assetIds: ['competitor-analysis-ml-model'],
  functionIds: ['analyze-competitors'],
  dataModelIds: ['competitor-model'],
  tags: [serviceTags[1]],
  branch: 'main',
  createdDate: '2025-06-30T10:39:00.000Z',
  lastUpdatedDate: '2025-06-30T10:39:00.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '3.0.1',
  endpoint: 'https://api.decision-intelligence.ibm.com/v1/competitors',
  authentication: 'oauth',
  requestCount: 890234,
  avgResponseTime: 320,
  successRate: 98.9,
};
