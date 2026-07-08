/**
 * Service-Level Local Variables for Fraud Check Service
 */

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const RECOMMENDATIONS = {
  APPROVE: 'approve',
  REJECT: 'reject',
  INVESTIGATE: 'investigate',
} as const;

export const FRAUD_THRESHOLDS = {
  LOW_RISK: 0.3,
  MEDIUM_RISK: 0.6,
  HIGH_RISK: 0.8,
  AUTO_REJECT: 0.95,
} as const;
