/**
 * Service-Level Local Variables for KYC Verification Service
 * 
 * Shared across all functions within this service
 */

/**
 * Verification Status
 */
export const VERIFICATION_STATUS = {
  VERIFIED: 'verified',
  FAILED: 'failed',
  PENDING: 'pending',
} as const;

/**
 * Watchlist Status
 */
export const WATCHLIST_STATUS = {
  CLEAR: 'clear',
  MATCH: 'match',
  POTENTIAL_MATCH: 'potential-match',
} as const;

/**
 * Risk Levels
 */
export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very-high',
} as const;

/**
 * Overall Decision
 */
export const OVERALL_DECISION = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  MANUAL_REVIEW: 'manual-review',
} as const;

/**
 * Watchlist Sources
 */
export const WATCHLIST_SOURCES = {
  OFAC: 'ofac',
  EU_SANCTIONS: 'eu-sanctions',
  UN_SANCTIONS: 'un-sanctions',
  PEP: 'politically-exposed-persons',
  ADVERSE_MEDIA: 'adverse-media',
} as const;

/**
 * Confidence Thresholds
 */
export const CONFIDENCE_THRESHOLDS = {
  HIGH_CONFIDENCE: 0.9,
  MEDIUM_CONFIDENCE: 0.7,
  LOW_CONFIDENCE: 0.5,
  MINIMUM_ACCEPTABLE: 0.7,
} as const;

/**
 * Match Score Thresholds
 */
export const MATCH_SCORE_THRESHOLDS = {
  EXACT_MATCH: 95,
  HIGH_MATCH: 85,
  MEDIUM_MATCH: 70,
  LOW_MATCH: 50,
} as const;
