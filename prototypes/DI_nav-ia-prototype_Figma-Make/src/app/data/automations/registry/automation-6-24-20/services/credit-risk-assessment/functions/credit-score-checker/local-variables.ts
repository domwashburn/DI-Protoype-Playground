/**
 * Function-Level Local Variables for Credit Score Checker
 * 
 * These variables are scoped to the credit-score-checker function only.
 * Use for function-specific configuration and constants.
 */

/**
 * Credit Score Factor Codes
 * Maps bureau codes to human-readable descriptions
 */
export const FACTOR_CODES = {
  UTIL: {
    code: 'UTIL',
    name: 'Credit Utilization',
    description: 'Credit utilization ratio',
  },
  PAY: {
    code: 'PAY',
    name: 'Payment History',
    description: 'On-time payment history',
  },
  AGE: {
    code: 'AGE',
    name: 'Credit History Age',
    description: 'Length of credit history',
  },
  INQ: {
    code: 'INQ',
    name: 'Hard Inquiries',
    description: 'Recent credit inquiries',
  },
  MIX: {
    code: 'MIX',
    name: 'Credit Mix',
    description: 'Diversity of credit types',
  },
  BAL: {
    code: 'BAL',
    name: 'Outstanding Balance',
    description: 'Total outstanding debt',
  },
} as const;

/**
 * Bureau API Endpoints
 */
export const BUREAU_ENDPOINTS = {
  equifax: 'https://api.equifax.com/v1/credit-score',
  experian: 'https://api.experian.com/v1/credit-score',
  transunion: 'https://api.transunion.com/v1/credit-score',
} as const;

/**
 * Score Fetch Configuration
 */
export const FETCH_CONFIG = {
  CACHE_TTL_SECONDS: 3600, // 1 hour
  INCLUDE_FACTORS_DEFAULT: true,
  MAX_FACTOR_COUNT: 10,
} as const;

/**
 * Score Validation
 */
export const SCORE_VALIDATION = {
  MIN_SCORE: 300,
  MAX_SCORE: 850,
  SCORE_DELTA_THRESHOLD: 50, // Alert if score changed by more than this
} as const;

/**
 * Factor Impact Mapping
 */
export const FACTOR_IMPACT_MAP = {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  BUREAU_UNAVAILABLE: 'Credit bureau service is currently unavailable',
  INVALID_CUSTOMER_ID: 'Invalid customer ID provided',
  SCORE_NOT_FOUND: 'Credit score not found for customer',
  TIMEOUT: 'Credit score request timed out',
} as const;
