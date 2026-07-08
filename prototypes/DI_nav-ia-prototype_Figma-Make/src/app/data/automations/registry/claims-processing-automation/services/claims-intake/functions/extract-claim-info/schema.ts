/**
 * Input/Output Schema for Extract Claim Info Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fileId: { type: 'string' },
          fileType: { type: 'string' },
        },
      },
    },
  },
  required: ['claimId', 'attachments'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    claimId: { type: 'string' },
    extractedData: {
      type: 'object',
      properties: {
        damageDescription: { type: 'string' },
        estimatedCost: { type: 'number' },
        partyInformation: { type: 'object' },
        extractedText: { type: 'string' },
      },
    },
    confidence: { type: 'number' },
  },
  required: ['claimId', 'extractedData'],
};

export const examples = {
  input: {
    claimId: 'claim-12345',
    attachments: [
      { fileId: 'file-001', fileType: 'pdf' },
      { fileId: 'file-002', fileType: 'jpg' },
    ],
  },
  output: {
    claimId: 'claim-12345',
    extractedData: {
      damageDescription: 'Rear bumper damaged',
      estimatedCost: 2500,
      extractedText: 'Full OCR text...',
    },
    confidence: 0.92,
  },
};
