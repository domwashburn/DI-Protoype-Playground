/**
 * Input/Output Schema for Calculate Optimal Price Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    currentPrice: { type: 'number' },
    demandScore: { type: 'number' },
    inventoryLevel: { type: 'number' },
  },
  required: ['productId', 'currentPrice'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' },
    optimalPrice: { type: 'number' },
    priceChange: { type: 'number' },
  },
  required: ['productId', 'optimalPrice'],
};

export const examples = {
  input: { productId: 'prod-123', currentPrice: 99.99, demandScore: 0.8, inventoryLevel: 500 },
  output: { productId: 'prod-123', optimalPrice: 94.99, priceChange: -5.00 },
};
