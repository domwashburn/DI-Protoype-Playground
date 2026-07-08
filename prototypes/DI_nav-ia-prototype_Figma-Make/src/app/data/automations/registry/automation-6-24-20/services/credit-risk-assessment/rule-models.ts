/**
 * Rule Model Assets for Credit Risk Assessment Service
 * 
 * Business rules for credit risk evaluation
 */

import type { RuleModelAsset, Rule } from '../../../../shared/types';

// Rule definitions
export const rules: Rule[] = [
  {
    id: 'rule-credit-score-minimum',
    name: 'Minimum Credit Score',
    description: 'Reject if credit score below 550',
    condition: 'customer.creditScore < 550',
    action: 'REJECT',
    priority: 1,
  },
  {
    id: 'rule-debt-to-income',
    name: 'Debt to Income Ratio',
    description: 'Check debt to income ratio',
    condition: '(customer.monthlyDebt / customer.monthlyIncome) > 0.43',
    action: 'MANUAL_REVIEW',
    priority: 2,
  },
  {
    id: 'rule-income-verification',
    name: 'Income Verification Required',
    description: 'Require income verification for high loan amounts',
    condition: 'application.requestedAmount > 50000',
    action: 'REQUIRE_VERIFICATION',
    priority: 3,
  },
  {
    id: 'rule-employment-stability',
    name: 'Employment Stability Check',
    description: 'Check years at current job',
    condition: 'customer.yearsAtCurrentJob < 1',
    action: 'INCREASE_RISK_SCORE',
    priority: 4,
  },
  {
    id: 'rule-collateral-required',
    name: 'Collateral Requirement',
    description: 'Require collateral for large loans',
    condition: 'application.requestedAmount > 100000 && application.collateralValue === 0',
    action: 'MANUAL_REVIEW',
    priority: 5,
  },
];

// Rule model assets
export const ruleModels: RuleModelAsset[] = [
  {
    id: 'credit-risk-rules',
    hashId: 'acrm1',
    type: 'rule-model',
    
    name: 'Credit Risk Rules',
    displayName: 'Credit Risk Rule Set',
    description: 'Business rules for credit risk evaluation including minimum scores, debt ratios, and verification requirements',
    
    status: 'deployed',
    serviceId: 'credit-risk-assessment',
    
    ruleCount: 47,
    rules, // Include rule definitions
    
    tags: [],
    createdDate: '2025-06-24T15:47:00.000Z',
    lastUpdatedDate: '2025-10-15T14:20:00.000Z',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
    createdBy: 'domwashburn@us.ibm.com',
    version: '1.2.0',
    branch: 'main',
  },
];
