/**
 * Patient Care Coordination (test-3)
 * Hash ID: pc3a1
 */

import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  id: 'patient-care-coordination',
  hashId: 'pc3a1',
  name: 'Patient Care Coordination',
  displayName: 'Patient Care Coordination',
  description: 'Intelligent patient care coordination with resource allocation and scheduling',
  status: 'deployed',
  variant: 'standard',
  serviceIds: ['patient-triage', 'resource-allocation', 'appointment-scheduler'],
  linkedObjectiveIds: [],
  tags: [commonTags[0], commonTags[4]],
  industry: 'Healthcare',
  branch: 'main',
  createdDate: '2025-06-30T10:35:05.000Z',
  lastUpdatedDate: '2025-06-30T10:35:05.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '1.3.0',
  executionCount: 12890,
  lastExecuted: '2025-10-16T08:45:00.000Z',
};
