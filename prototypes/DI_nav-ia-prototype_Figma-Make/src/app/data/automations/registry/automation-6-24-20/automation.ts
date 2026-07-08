/**
 * Credit Risk Assessment Automation
 * 
 * Human-readable ID: automation-6-24-20
 * Hash ID: a6k2p
 * 
 * AI-generated automation for credit risk evaluation with fraud detection
 */

import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  // Identity
  id: 'automation-6-24-20',
  hashId: 'a6k2p',
  
  name: 'Automation 6-24-20',
  displayName: 'Credit Risk Assessment Automation',
  description: 'Automated decision that the decision assistant generated for credit risk evaluation',
  
  status: 'deployed',
  variant: 'ai-generated',
  
  // Relationships - Services in this automation
  serviceIds: [
    'credit-risk-assessment',
    'fraud-detection'
  ],
  
  // Strategic Alignment - Linked business objectives
  linkedObjectiveIds: [
    'obj-improve-credit-decisions',
    'obj-automate-fraud-detection',
    'obj-improve-decision-accuracy',
    'obj-enhance-fraud-detection',
    'obj-improve-credit-scoring'
  ],
  
  // AI Generation
  generatedFromConversationId: 'conv-credit-risk-001',
  
  // Metadata
  tags: [
    commonTags[0], // Review updates
    commonTags[3], // AI Generated
  ],
  industry: 'Banking',
  branch: 'main',
  
  // Timestamps
  createdDate: '2025-06-24T15:45:12.000Z',
  lastUpdatedDate: '2025-06-24T15:45:12.000Z',
  lastUpdatedBy: 'domwashburn@us.ibm.com',
  createdBy: 'domwashburn@us.ibm.com',
  version: '1.0.0',
  
  // Analytics
  executionCount: 15432,
  lastExecuted: '2025-10-16T08:30:00.000Z',
};
