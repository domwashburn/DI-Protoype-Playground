/**
 * Function-Level Local Variables for Calculate Optimal Price
 */

export const OPTIMIZATION_FACTORS = {
  DEMAND_WEIGHT: 0.4,
  INVENTORY_WEIGHT: 0.3,
  COMPETITION_WEIGHT: 0.3,
} as const;

export const INVENTORY_THRESHOLDS = {
  LOW: 50,
  HIGH: 500,
} as const;
