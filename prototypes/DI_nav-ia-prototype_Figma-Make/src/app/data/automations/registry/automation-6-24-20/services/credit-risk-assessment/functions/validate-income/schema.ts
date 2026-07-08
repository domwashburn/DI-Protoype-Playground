/**
 * Input/Output Schema for Validate Income Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    customerId: {
      type: 'string',
      description: 'Customer ID',
    },
    annualIncome: {
      type: 'number',
      minimum: 0,
      description: 'Annual income in USD',
    },
    monthlyDebt: {
      type: 'number',
      minimum: 0,
      description: 'Total monthly debt obligations',
    },
  },
  required: ['customerId', 'annualIncome', 'monthlyDebt'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    isValid: {
      type: 'boolean',
      description: 'Whether income meets requirements',
    },
    debtToIncomeRatio: {
      type: 'number',
      description: 'Calculated debt-to-income ratio',
    },
    monthlyIncome: {
      type: 'number',
      description: 'Calculated monthly income',
    },
    warnings: {
      type: 'array',
      items: { type: 'string' },
      description: 'Any validation warnings',
    },
  },
  required: ['isValid', 'debtToIncomeRatio', 'monthlyIncome'],
};

export const examples = {
  input: {
    customerId: 'cust-12345',
    annualIncome: 75000,
    monthlyDebt: 1500,
  },
  output: {
    isValid: true,
    debtToIncomeRatio: 0.24,
    monthlyIncome: 6250,
    warnings: [],
  },
};
