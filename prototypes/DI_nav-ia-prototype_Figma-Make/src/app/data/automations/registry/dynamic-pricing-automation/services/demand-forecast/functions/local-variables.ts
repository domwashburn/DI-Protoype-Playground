/**
 * Service-Level Local Variables for Demand Forecast Service
 */

export const FORECAST_HORIZON = {
  SHORT_TERM_DAYS: 7,
  MEDIUM_TERM_DAYS: 30,
  LONG_TERM_DAYS: 90,
} as const;

export const TREND_TYPES = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
  STABLE: 'stable',
} as const;
