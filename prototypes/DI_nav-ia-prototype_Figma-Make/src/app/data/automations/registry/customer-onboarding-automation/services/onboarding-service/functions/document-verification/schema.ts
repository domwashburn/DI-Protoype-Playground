/**
 * Input/Output Schema for Document Verification Function
 */

export const inputSchema = {
  type: 'object',
  properties: {
    documentId: {
      type: 'string',
      description: 'Document identifier',
    },
    documentType: {
      type: 'string',
      enum: ['drivers-license', 'passport', 'utility-bill', 'bank-statement'],
      description: 'Type of document',
    },
    imageData: {
      type: 'string',
      description: 'Base64 encoded image data',
    },
  },
  required: ['documentId', 'documentType', 'imageData'],
};

export const outputSchema = {
  type: 'object',
  properties: {
    documentId: {
      type: 'string',
    },
    isValid: {
      type: 'boolean',
      description: 'Whether document passed verification',
    },
    confidence: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Verification confidence score',
    },
    extractedData: {
      type: 'object',
      description: 'Data extracted from document via OCR',
      properties: {
        name: { type: 'string' },
        documentNumber: { type: 'string' },
        expirationDate: { type: 'string' },
        address: { type: 'string' },
      },
    },
    verificationIssues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          severity: { type: 'string', enum: ['warning', 'error'] },
          message: { type: 'string' },
        },
      },
    },
  },
  required: ['documentId', 'isValid', 'confidence'],
};

export const examples = {
  input: {
    documentId: 'doc-12345',
    documentType: 'drivers-license',
    imageData: 'base64encodedstring...',
  },
  output: {
    documentId: 'doc-12345',
    isValid: true,
    confidence: 0.95,
    extractedData: {
      name: 'John Smith',
      documentNumber: 'D1234567',
      expirationDate: '2027-12-31',
      address: '123 Main St, Anytown, CA 12345',
    },
    verificationIssues: [],
  },
};
