/**
 * Service-Level Local Variables for Credit Risk Assessment Service
 * 
 * These variables are available across all functions within this service.
 * Use for shared constants, configuration, and reusable values.
 */

/**
 * Credit Score Thresholds
 */
export const CREDIT_SCORE_THRESHOLDS = {
  EXCELLENT: 750,
  GOOD: 700,
  FAIR: 650,
  POOR: 600,
  MINIMUM: 550,
} as const;

/**
 * Risk Categories
 */
export const RISK_CATEGORIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very-high',
} as const;

/**
 * Debt-to-Income Ratio Limits
 */
export const DTI_LIMITS = {
  EXCELLENT: 0.28,
  GOOD: 0.36,
  ACCEPTABLE: 0.43,
  HIGH: 0.50,
} as const;

/**
 * Income Verification Thresholds
 */
export const INCOME_VERIFICATION_THRESHOLD = 50000; // USD

/**
 * Employment Stability Requirements
 */
export const EMPLOYMENT_STABILITY = {
  MINIMUM_YEARS: 1,
  PREFERRED_YEARS: 2,
} as const;

/**
 * Credit Bureau Configuration
 */
export const CREDIT_BUREAUS = {
  EQUIFAX: 'equifax',
  EXPERIAN: 'experian',
  TRANSUNION: 'transunion',
} as const;

export const DEFAULT_CREDIT_BUREAU = CREDIT_BUREAUS.EQUIFAX;

/**
 * Risk Factor Weights
 * Used in risk score calculation
 */
export const RISK_FACTOR_WEIGHTS = {
  CREDIT_SCORE: 0.40,
  DEBT_TO_INCOME: 0.30,
  EMPLOYMENT_STABILITY: 0.20,
  LOAN_AMOUNT: 0.10,
} as const;

/**
 * Decision Outcomes
 */
export const DECISION_OUTCOMES = {
  APPROVED: 'approved',
  DENIED: 'denied',
  MANUAL_REVIEW: 'manual-review',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  TIMEOUT_MS: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  MIN_AGE: 18,
  MAX_AGE: 80,
  MIN_LOAN_AMOUNT: 1000,
  MAX_LOAN_AMOUNT: 1000000,
} as const;
