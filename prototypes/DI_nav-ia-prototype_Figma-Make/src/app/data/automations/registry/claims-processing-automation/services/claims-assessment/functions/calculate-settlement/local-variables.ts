/**
 * Function-Level Local Variables for Calculate Settlement
 */

export const CALCULATION_RULES = {
  APPLY_DEDUCTIBLE: true,
  APPLY_DEPRECIATION: true,
  MAX_DEPRECIATION_YEARS: 10,
  DEPRECIATION_RATE_ANNUAL: 0.15,
} as const;

export const LIMITS = {
  MIN_SETTLEMENT: 0,
  MAX_AUTO_APPROVE: 10000,
  REQUIRES_MANAGER_ABOVE: 25000,
} as const;
