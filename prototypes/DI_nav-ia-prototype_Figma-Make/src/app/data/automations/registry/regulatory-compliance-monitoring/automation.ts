/**
 * Regulatory Compliance Monitoring (test-2)
 * Hash ID: rc2a1
 */

import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  id: 'regulatory-compliance-monitoring',
  hashId: 'rc2a1',
  name: 'Regulatory Compliance Monitoring',
  displayName: 'Regulatory Compliance Monitoring',
  description: 'This is a really really REALLY long description that will likely overflow when it\'s in the card. This automation handles comprehensive regulatory compliance monitoring across multiple jurisdictions with automated reporting and alert management for financial services.',
  status: 'deployed',
  variant: 'standard',
  serviceIds: ['compliance-checker', 'reporting-engine'],
  linkedObjectiveIds: [],
  tags: [commonTags[0]],
  industry: 'Banking',
  branch: 'main',
  createdDate: '2025-06-30T10:24:49.000Z',
  lastUpdatedDate: '2025-06-30T10:24:49.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '1.0.5',
  executionCount: 5623,
  lastExecuted: '2025-10-16T05:30:00.000Z',
};
