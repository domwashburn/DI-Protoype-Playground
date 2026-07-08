/**
 * Service-Level Local Variables for Claims Intake Service
 * 
 * Shared across all functions within this service
 */

/**
 * Claim Submission Status
 */
export const SUBMISSION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  VALIDATED: 'validated',
  REJECTED: 'rejected',
} as const;

/**
 * Incident Types
 */
export const INCIDENT_TYPES = {
  ACCIDENT: 'accident',
  THEFT: 'theft',
  DAMAGE: 'damage',
  INJURY: 'injury',
  OTHER: 'other',
} as const;

/**
 * Policy Types
 */
export const POLICY_TYPES = {
  AUTO: 'auto',
  HOME: 'home',
  HEALTH: 'health',
  LIFE: 'life',
} as const;

/**
 * Required Attachments by Policy Type
 */
export const REQUIRED_ATTACHMENTS = {
  [POLICY_TYPES.AUTO]: ['police-report', 'photos', 'estimate'],
  [POLICY_TYPES.HOME]: ['photos', 'estimate', 'inventory'],
  [POLICY_TYPES.HEALTH]: ['medical-records', 'bills'],
  [POLICY_TYPES.LIFE]: ['death-certificate', 'beneficiary-forms'],
} as const;

/**
 * Validation Timeouts
 */
export const VALIDATION_TIMEOUTS = {
  POLICY_LOOKUP_MS: 5000,
  DOCUMENT_CHECK_MS: 10000,
  OVERALL_TIMEOUT_MS: 30000,
} as const;

/**
 * Loss Amount Thresholds
 */
export const LOSS_THRESHOLDS = {
  SMALL_CLAIM: 1000,
  MEDIUM_CLAIM: 10000,
  LARGE_CLAIM: 50000,
  REQUIRES_SUPERVISOR: 25000,
} as const;
