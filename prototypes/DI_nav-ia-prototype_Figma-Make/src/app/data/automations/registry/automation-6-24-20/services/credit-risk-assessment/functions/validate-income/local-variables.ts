/**
 * Function-Level Local Variables for Validate Income
 * 
 * These variables are scoped to the validate-income function only.
 * Use for function-specific configuration and constants.
 */

/**
 * Income Validation Thresholds
 */
export const INCOME_THRESHOLDS = {
  MINIMUM_ANNUAL: 12000,
  MINIMUM_MONTHLY: 1000,
  POVERTY_LINE: 15000, // Federal poverty line (example)
} as const;

/**
 * Debt-to-Income Calculation
 */
export const DTI_CALCULATION = {
  MONTHS_PER_YEAR: 12,
  ACCEPTABLE_DTI: 0.43,
  WARNING_DTI: 0.50,
} as const;

/**
 * Income Source Weights
 * For calculating total verifiable income
 */
export const INCOME_SOURCE_WEIGHTS = {
  W2_EMPLOYMENT: 1.0,
  SELF_EMPLOYMENT: 0.8, // Weighted lower due to variability
  RENTAL_INCOME: 0.75,
  INVESTMENT_INCOME: 0.5,
  SOCIAL_SECURITY: 1.0,
} as const;

/**
 * Validation Warning Codes
 */
export const WARNING_CODES = {
  HIGH_DTI: 'HIGH_DTI',
  LOW_INCOME: 'LOW_INCOME',
  INCONSISTENT_INCOME: 'INCONSISTENT_INCOME',
  UNVERIFIED_INCOME: 'UNVERIFIED_INCOME',
  MULTIPLE_SOURCES: 'MULTIPLE_SOURCES',
} as const;

/**
 * Validation Warning Messages
 */
export const WARNING_MESSAGES = {
  [WARNING_CODES.HIGH_DTI]: 'Debt-to-income ratio exceeds recommended threshold',
  [WARNING_CODES.LOW_INCOME]: 'Income is below minimum threshold',
  [WARNING_CODES.INCONSISTENT_INCOME]: 'Income sources show inconsistency',
  [WARNING_CODES.UNVERIFIED_INCOME]: 'Income verification required',
  [WARNING_CODES.MULTIPLE_SOURCES]: 'Multiple income sources detected',
} as const;

/**
 * Debt Categories
 */
export const DEBT_CATEGORIES = {
  MORTGAGE: 'mortgage',
  AUTO_LOAN: 'auto-loan',
  STUDENT_LOAN: 'student-loan',
  CREDIT_CARD: 'credit-card',
  PERSONAL_LOAN: 'personal-loan',
  OTHER: 'other',
} as const;

/**
 * Income Calculation Configuration
 */
export const CALCULATION_CONFIG = {
  ROUNDING_PRECISION: 2,
  DTI_PRECISION: 4,
  PERCENTAGE_MULTIPLIER: 100,
} as const;
