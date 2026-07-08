/**
 * Input/Output Schema for Identity Verification Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    applicantId: {
      type: 'string',
      description: 'Applicant identifier',
    },
    personalInfo: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        dateOfBirth: { type: 'string', format: 'date' },
        ssn: { type: 'string' },
        address: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'dateOfBirth'],
    },
    documentData: {
      type: 'object',
      description: 'Data extracted from verified documents',
    },
  },
  required: ['applicantId', 'personalInfo'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    verificationId: {
      type: 'string',
    },
    applicantId: {
      type: 'string',
    },
    identityVerification: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['verified', 'failed', 'pending'],
        },
        confidence: {
          type: 'number',
        },
        matchScore: {
          type: 'number',
        },
      },
    },
    watchlistScreening: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['clear', 'match', 'potential-match'],
        },
        matches: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      },
    },
    riskLevel: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'very-high'],
    },
    overallStatus: {
      type: 'string',
      enum: ['approved', 'rejected', 'manual-review'],
    },
  },
  required: ['verificationId', 'applicantId', 'overallStatus'],
};

export const examples = {
  input: {
    applicantId: 'app-67890',
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      ssn: '123-45-6789',
      address: '456 Oak Ave, Springfield, IL 62701',
    },
  },
  output: {
    verificationId: 'kyc-98765',
    applicantId: 'app-67890',
    identityVerification: {
      status: 'verified',
      confidence: 0.96,
      matchScore: 98,
    },
    watchlistScreening: {
      status: 'clear',
      matches: [],
    },
    riskLevel: 'low',
    overallStatus: 'approved',
  },
};
