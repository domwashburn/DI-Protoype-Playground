/**
 * Service-Level Local Variables for Pricing Engine Service
 */

export const PRICING_STRATEGY = {
  COMPETITIVE: 'competitive',
  VALUE_BASED: 'value-based',
  DYNAMIC: 'dynamic',
} as const;

export const PRICE_BOUNDS = {
  MIN_MARGIN_PERCENT: 10,
  MAX_DISCOUNT_PERCENT: 40,
} as const;
