/**
 * Input/Output Schema for Calculate Risk Score Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    creditScore: {
      type: 'number',
      minimum: 300,
      maximum: 850,
      description: 'Customer credit score',
    },
    debtToIncomeRatio: {
      type: 'number',
      description: 'Debt-to-income ratio',
    },
    employmentYears: {
      type: 'number',
      minimum: 0,
      description: 'Years at current employment',
    },
    requestedAmount: {
      type: 'number',
      minimum: 0,
      description: 'Requested credit amount',
    },
  },
  required: ['creditScore', 'debtToIncomeRatio', 'employmentYears', 'requestedAmount'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    riskScore: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      description: 'Final calculated risk score',
    },
    riskCategory: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'very-high'],
      description: 'Risk category',
    },
    confidence: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Confidence level',
    },
    factors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          factor: { type: 'string' },
          impact: { type: 'number' },
          weight: { type: 'number' },
          description: { type: 'string' },
        },
      },
    },
  },
  required: ['riskScore', 'riskCategory', 'confidence'],
};

export const examples = {
  input: {
    creditScore: 720,
    debtToIncomeRatio: 0.24,
    employmentYears: 5,
    requestedAmount: 25000,
  },
  output: {
    riskScore: 22,
    riskCategory: 'low',
    confidence: 0.92,
    factors: [
      {
        factor: 'Credit Score',
        impact: -15,
        weight: 0.4,
        description: 'Good credit score reduces risk',
      },
      {
        factor: 'Debt-to-Income',
        impact: -5,
        weight: 0.3,
        description: 'Low DTI ratio reduces risk',
      },
      {
        factor: 'Employment Stability',
        impact: -2,
        weight: 0.2,
        description: 'Stable employment reduces risk',
      },
    ],
  },
};
