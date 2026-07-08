/**
 * Input/Output Schema for Analyze Competitors Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
  },
  required: ['productId'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    competitorPrices: { type: 'array' },
    marketPosition: { type: 'string' },
  },
  required: ['productId'],
};

export const examples = {
  input: { productId: 'prod-123' },
  output: { productId: 'prod-123', competitorPrices: [89.99, 94.99, 99.99], marketPosition: 'leader' },
};
