/**
 * Customer Onboarding Automation
 * 
 * Human-readable ID: customer-onboarding-automation
 * Hash ID: t8x3p
 * 
 * Automated customer onboarding with KYC verification and document processing
 */

import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  // Identity
  id: 'customer-onboarding-automation',
  hashId: 't8x3p',
  
  name: 'Customer Onboarding Automation',
  displayName: 'Customer Onboarding Automation',
  description: 'Automated customer onboarding with KYC verification and document processing',
  
  status: 'deployed',
  variant: 'standard',
  
  // Relationships - Services in this automation
  serviceIds: [
    'onboarding-service',
    'kyc-verification'
  ],
  
  // Strategic Alignment - Linked business objectives
  linkedObjectiveIds: [
    'obj-improve-customer-experience',
    'obj-automate-compliance',
  ],
  
  // Metadata
  tags: [
    commonTags[1], // Production
  ],
  industry: 'Banking',
  branch: 'main',
  
  // Timestamps
  createdDate: '2024-03-15T10:30:00.000Z',
  lastUpdatedDate: '2024-11-01T14:20:00.000Z',
  lastUpdatedBy: 'sarah.chen@ibm.com',
  createdBy: 'sarah.chen@ibm.com',
  version: '2.1.0',
  
  // Analytics
  executionCount: 8734,
  lastExecuted: '2025-11-05T09:15:00.000Z',
};
