/**
 * Input/Output Schema for Credit Score Checker Function
 * 
 * Defines the expected input and output structure for the credit score checking function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    customerId: {
      type: 'string',
      description: 'Customer ID to check credit',
    },
    bureauProvider: {
      type: 'string',
      enum: ['equifax', 'experian', 'transunion'],
      description: 'Credit bureau to query',
      default: 'equifax',
    },
    includeFactors: {
      type: 'boolean',
      description: 'Whether to include detailed risk factors',
      default: true,
    },
  },
  required: ['customerId'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    customerId: {
      type: 'string',
    },
    creditScore: {
      type: 'number',
      minimum: 300,
      maximum: 850,
    },
    scoreDate: {
      type: 'string',
      format: 'date-time',
    },
    bureau: {
      type: 'string',
    },
    factors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          description: { type: 'string' },
          impact: { type: 'string', enum: ['positive', 'negative', 'neutral'] },
        },
      },
    },
  },
  required: ['customerId', 'creditScore', 'scoreDate', 'bureau'],
};

export const examples = {
  input: {
    customerId: 'cust-12345',
    bureauProvider: 'equifax',
    includeFactors: true,
  },
  output: {
    customerId: 'cust-12345',
    creditScore: 720,
    scoreDate: '2025-11-05T12:00:00Z',
    bureau: 'equifax',
    factors: [
      {
        code: 'UTIL',
        description: 'Credit utilization ratio is 25%',
        impact: 'positive',
      },
      {
        code: 'PAY',
        description: 'No late payments in last 12 months',
        impact: 'positive',
      },
      {
        code: 'AGE',
        description: 'Limited credit history (2 years)',
        impact: 'negative',
      },
    ],
  },
};
