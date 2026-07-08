/**
 * Function-Level Local Variables for Identity Verification
 * 
 * Scoped to identity-verification function only
 */

/**
 * Identity Verification Providers
 */
export const VERIFICATION_PROVIDERS = {
  TRULIOO: 'trulioo',
  JUMIO: 'jumio',
  ONFIDO: 'onfido',
} as const;

export const DEFAULT_VERIFICATION_PROVIDER = VERIFICATION_PROVIDERS.TRULIOO;

/**
 * Verification Checks
 */
export const VERIFICATION_CHECKS = {
  IDENTITY_MATCH: 'identity-match',
  ADDRESS_VERIFICATION: 'address-verification',
  AGE_VERIFICATION: 'age-verification',
  WATCHLIST_SCREENING: 'watchlist-screening',
  SANCTIONS_SCREENING: 'sanctions-screening',
  PEP_SCREENING: 'pep-screening',
} as const;

/**
 * Required Checks by Risk Level
 */
export const REQUIRED_CHECKS_BY_RISK = {
  low: [
    VERIFICATION_CHECKS.IDENTITY_MATCH,
    VERIFICATION_CHECKS.WATCHLIST_SCREENING,
  ],
  medium: [
    VERIFICATION_CHECKS.IDENTITY_MATCH,
    VERIFICATION_CHECKS.ADDRESS_VERIFICATION,
    VERIFICATION_CHECKS.WATCHLIST_SCREENING,
    VERIFICATION_CHECKS.SANCTIONS_SCREENING,
  ],
  high: [
    VERIFICATION_CHECKS.IDENTITY_MATCH,
    VERIFICATION_CHECKS.ADDRESS_VERIFICATION,
    VERIFICATION_CHECKS.AGE_VERIFICATION,
    VERIFICATION_CHECKS.WATCHLIST_SCREENING,
    VERIFICATION_CHECKS.SANCTIONS_SCREENING,
    VERIFICATION_CHECKS.PEP_SCREENING,
  ],
} as const;

/**
 * Retry Configuration
 */
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 1000,
  TIMEOUT_MS: 60000,
} as const;

/**
 * Data Quality Checks
 */
export const DATA_QUALITY_REQUIREMENTS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  VALID_SSN_PATTERN: /^\d{3}-\d{2}-\d{4}$/,
  MIN_AGE: 18,
  MAX_AGE: 120,
} as const;

/**
 * Decision Rules
 */
export const DECISION_RULES = {
  AUTO_APPROVE_THRESHOLD: 0.95,
  AUTO_REJECT_THRESHOLD: 0.5,
  MANUAL_REVIEW_RANGE: { min: 0.5, max: 0.95 },
} as const;
