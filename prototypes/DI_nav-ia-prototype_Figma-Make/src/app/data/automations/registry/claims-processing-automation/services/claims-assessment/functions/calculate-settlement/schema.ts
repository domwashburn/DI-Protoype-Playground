/**
 * Input/Output Schema for Calculate Settlement Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    estimatedLoss: { type: 'number' },
    policyLimits: { type: 'number' },
    deductible: { type: 'number' },
  },
  required: ['claimId', 'estimatedLoss'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    settlementAmount: { type: 'number' },
    breakdown: { type: 'object' },
  },
  required: ['claimId', 'settlementAmount'],
};

export const examples = {
  input: { claimId: 'claim-12345', estimatedLoss: 5000, deductible: 500 },
  output: { claimId: 'claim-12345', settlementAmount: 4500, breakdown: {} },
};
