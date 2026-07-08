/**
 * Data Models for KYC Verification Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'kyc-data-model',
    hashId: 'dmky1',
    
    name: 'KYC Verification',
    displayName: 'KYC Verification Data Model',
    description: 'KYC verification results with identity checks and watchlist screening',
    
    serviceId: 'kyc-verification',
    
    schema: {
      type: 'object',
      properties: {
        verificationId: {
          type: 'string',
          description: 'Unique verification identifier',
        },
        applicantId: {
          type: 'string',
          description: 'Reference to applicant',
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
              minimum: 0,
              maximum: 1,
            },
            matchScore: {
              type: 'number',
              minimum: 0,
              maximum: 100,
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
                properties: {
                  list: { type: 'string' },
                  matchScore: { type: 'number' },
                  details: { type: 'string' },
                },
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
    },
    
    version: '1.0.0',
    createdDate: '2024-03-15T10:40:00.000Z',
    lastUpdatedDate: '2024-03-15T10:40:00.000Z',
    createdBy: 'sarah.chen@ibm.com',
    lastUpdatedBy: 'sarah.chen@ibm.com',
  },
];
