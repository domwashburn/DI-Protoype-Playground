/**
 * Function-Level Local Variables for Calculate Risk Score
 * 
 * These variables are scoped to the calculate-risk-score function only.
 * Use for function-specific configuration and constants.
 */

/**
 * Risk Score Calculation Weights
 * Determines relative importance of each factor
 */
export const SCORE_WEIGHTS = {
  CREDIT_SCORE_WEIGHT: 0.40,
  DTI_WEIGHT: 0.30,
  EMPLOYMENT_WEIGHT: 0.20,
  LOAN_AMOUNT_WEIGHT: 0.10,
} as const;

/**
 * Risk Score Ranges
 * Maps numeric scores to risk categories
 */
export const RISK_SCORE_RANGES = {
  LOW: { min: 0, max: 30 },
  MEDIUM: { min: 31, max: 60 },
  HIGH: { min: 61, max: 85 },
  VERY_HIGH: { min: 86, max: 100 },
} as const;

/**
 * Credit Score Impact Mapping
 * How credit score translates to risk impact
 */
export const CREDIT_SCORE_IMPACT = [
  { min: 750, max: 850, impact: -20, description: 'Excellent credit significantly reduces risk' },
  { min: 700, max: 749, impact: -10, description: 'Good credit reduces risk' },
  { min: 650, max: 699, impact: 0, description: 'Fair credit has neutral impact' },
  { min: 600, max: 649, impact: 10, description: 'Below average credit increases risk' },
  { min: 550, max: 599, impact: 20, description: 'Poor credit significantly increases risk' },
  { min: 300, max: 549, impact: 35, description: 'Very poor credit creates high risk' },
] as const;

/**
 * DTI Impact Mapping
 * How debt-to-income ratio affects risk
 */
export const DTI_IMPACT = [
  { min: 0, max: 0.28, impact: -10, description: 'Excellent DTI ratio reduces risk' },
  { min: 0.29, max: 0.36, impact: -5, description: 'Good DTI ratio slightly reduces risk' },
  { min: 0.37, max: 0.43, impact: 0, description: 'Acceptable DTI ratio is neutral' },
  { min: 0.44, max: 0.50, impact: 10, description: 'High DTI ratio increases risk' },
  { min: 0.51, max: 1.00, impact: 20, description: 'Very high DTI ratio significantly increases risk' },
] as const;

/**
 * Employment Stability Impact
 * How years of employment affect risk
 */
export const EMPLOYMENT_IMPACT = [
  { min: 5, max: 100, impact: -5, description: 'Long-term employment reduces risk' },
  { min: 2, max: 4.99, impact: -2, description: 'Stable employment slightly reduces risk' },
  { min: 1, max: 1.99, impact: 0, description: 'Minimum employment is neutral' },
  { min: 0, max: 0.99, impact: 8, description: 'Short employment increases risk' },
] as const;

/**
 * Loan Amount Impact
 * Risk adjustment based on requested amount
 */
export const LOAN_AMOUNT_IMPACT = [
  { min: 0, max: 10000, impact: 0, description: 'Small loan has minimal impact' },
  { min: 10001, max: 50000, impact: 2, description: 'Medium loan slightly increases risk' },
  { min: 50001, max: 100000, impact: 5, description: 'Large loan increases risk' },
  { min: 100001, max: 1000000, impact: 10, description: 'Very large loan significantly increases risk' },
] as const;

/**
 * Confidence Level Calculation
 * Based on data completeness and consistency
 */
export const CONFIDENCE_FACTORS = {
  COMPLETE_DATA: 1.0,
  MISSING_OPTIONAL_DATA: 0.9,
  ESTIMATED_DATA: 0.8,
  LIMITED_DATA: 0.7,
  MINIMAL_DATA: 0.6,
} as const;

/**
 * Risk Factor Templates
 * Standard factor descriptions
 */
export const RISK_FACTOR_TEMPLATES = {
  CREDIT_SCORE: 'Credit Score',
  DEBT_TO_INCOME: 'Debt-to-Income Ratio',
  EMPLOYMENT_STABILITY: 'Employment Stability',
  LOAN_AMOUNT: 'Requested Loan Amount',
} as const;

/**
 * Calculation Configuration
 */
export const CALC_CONFIG = {
  MAX_RISK_SCORE: 100,
  MIN_RISK_SCORE: 0,
  ROUNDING_PRECISION: 0,
  CONFIDENCE_PRECISION: 2,
} as const;

/**
 * Decision Thresholds
 * Risk score thresholds for automated decisions
 */
export const DECISION_THRESHOLDS = {
  AUTO_APPROVE: 30,
  MANUAL_REVIEW: 60,
  AUTO_DENY: 85,
} as const;
