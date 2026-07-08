/**
 * Service-Level Local Variables for Claims Assessment Service
 */

export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const ASSESSMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REVIEW_REQUIRED: 'review-required',
} as const;

export const SETTLEMENT_FACTORS = {
  POLICY_COVERAGE: 'policyCoverage',
  DEDUCTIBLE: 'deductible',
  DEPRECIATION: 'depreciation',
  PREVIOUS_CLAIMS: 'previousClaims',
} as const;
