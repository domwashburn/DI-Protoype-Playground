/**
 * Input/Output Schema for Detect Fraud Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    claimData: { type: 'object' },
  },
  required: ['claimId', 'claimData'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    fraudScore: { type: 'number' },
    riskLevel: { type: 'string' },
    indicators: { type: 'array' },
    recommendation: { type: 'string' },
  },
  required: ['claimId', 'fraudScore', 'recommendation'],
};

export const examples = {
  input: { claimId: 'claim-12345', claimData: {} },
  output: { claimId: 'claim-12345', fraudScore: 0.15, riskLevel: 'low', indicators: [], recommendation: 'approve' },
};
