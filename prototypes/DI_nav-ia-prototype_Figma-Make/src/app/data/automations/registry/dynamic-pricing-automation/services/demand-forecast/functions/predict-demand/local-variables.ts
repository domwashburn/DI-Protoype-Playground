/**
 * Function-Level Local Variables for Predict Demand
 */

export const MODEL_PARAMETERS = {
  LOOKBACK_DAYS: 90,
  SEASONALITY_PERIOD: 7,
  MIN_DATA_POINTS: 30,
} as const;

export const CONFIDENCE_LEVELS = {
  HIGH: 0.9,
  MEDIUM: 0.7,
  LOW: 0.5,
} as const;
