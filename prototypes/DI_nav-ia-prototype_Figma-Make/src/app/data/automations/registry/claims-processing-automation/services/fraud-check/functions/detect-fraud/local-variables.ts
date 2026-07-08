/**
 * Function-Level Local Variables for Detect Fraud
 */

export const FRAUD_INDICATORS = {
  DUPLICATE_CLAIM: 'duplicate-claim',
  SUSPICIOUS_TIMING: 'suspicious-timing',
  INCONSISTENT_DETAILS: 'inconsistent-details',
  HIGH_VALUE_NEW_POLICY: 'high-value-new-policy',
  MULTIPLE_RECENT_CLAIMS: 'multiple-recent-claims',
} as const;

export const SCORING_WEIGHTS = {
  DUPLICATE_CLAIM: 0.4,
  SUSPICIOUS_TIMING: 0.25,
  INCONSISTENT_DETAILS: 0.2,
  HIGH_VALUE_NEW_POLICY: 0.1,
  MULTIPLE_RECENT_CLAIMS: 0.05,
} as const;
