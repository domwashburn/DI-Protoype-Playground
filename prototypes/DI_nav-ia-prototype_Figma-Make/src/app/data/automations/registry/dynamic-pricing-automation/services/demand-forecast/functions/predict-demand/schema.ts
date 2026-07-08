/**
 * Input/Output Schema for Predict Demand Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    historicalData: { type: 'array' },
  },
  required: ['productId'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    forecastedDemand: { type: 'number' },
    confidence: { type: 'number' },
    trend: { type: 'string' },
  },
  required: ['productId', 'forecastedDemand'],
};

export const examples = {
  input: { productId: 'prod-123', historicalData: [] },
  output: { productId: 'prod-123', forecastedDemand: 1200, confidence: 0.87, trend: 'increasing' },
};
