/**
 * Input/Output Schema for Validate Claim Data Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    policyNumber: { type: 'string' },
    policyHolder: { type: 'object' },
    incident: { type: 'object' },
    attachments: { type: 'array' },
  },
  required: ['claimId', 'policyNumber', 'policyHolder', 'incident'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    isValid: { type: 'boolean' },
    validationErrors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string' },
          message: { type: 'string' },
          severity: { type: 'string', enum: ['error', 'warning'] },
        },
      },
    },
    submissionStatus: { type: 'string' },
  },
  required: ['claimId', 'isValid', 'submissionStatus'],
};

export const examples = {
  input: {
    claimId: 'claim-12345',
    policyNumber: 'POL-987654',
    policyHolder: { name: 'John Doe', policyType: 'auto' },
    incident: { type: 'accident', date: '2024-11-01', description: 'Rear-end collision' },
  },
  output: {
    claimId: 'claim-12345',
    isValid: true,
    validationErrors: [],
    submissionStatus: 'validated',
  },
};
