/**
 * Service-Level Local Variables for Onboarding Service
 * 
 * Shared across all functions within this service
 */

/**
 * Document Types
 */
export const DOCUMENT_TYPES = {
  DRIVERS_LICENSE: 'drivers-license',
  PASSPORT: 'passport',
  UTILITY_BILL: 'utility-bill',
  BANK_STATEMENT: 'bank-statement',
} as const;

/**
 * Document Status
 */
export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

/**
 * Onboarding Status
 */
export const ONBOARDING_STATUS = {
  INITIATED: 'initiated',
  DOCUMENTS_PENDING: 'documents-pending',
  KYC_PENDING: 'kyc-pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

/**
 * Required Documents
 */
export const REQUIRED_DOCUMENTS = {
  IDENTITY: [DOCUMENT_TYPES.DRIVERS_LICENSE, DOCUMENT_TYPES.PASSPORT],
  ADDRESS_PROOF: [DOCUMENT_TYPES.UTILITY_BILL, DOCUMENT_TYPES.BANK_STATEMENT],
} as const;

/**
 * Verification Timeouts
 */
export const VERIFICATION_TIMEOUTS = {
  DOCUMENT_PROCESSING_MS: 30000,
  KYC_CHECK_MS: 60000,
  OVERALL_TIMEOUT_MS: 120000,
} as const;

/**
 * Age Requirements
 */
export const AGE_REQUIREMENTS = {
  MINIMUM_AGE: 18,
  MAXIMUM_AGE: 100,
} as const;
