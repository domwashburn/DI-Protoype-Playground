/**
 * Data Models for Claims Intake Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'claim-submission-model',
    hashId: 'dmcl1',
    
    name: 'Claim Submission',
    displayName: 'Insurance Claim Submission',
    description: 'Insurance claim submission with policy holder and incident information',
    
    serviceId: 'claims-intake',
    
    schema: {
      type: 'object',
      properties: {
        claimId: {
          type: 'string',
          description: 'Unique claim identifier',
        },
        policyNumber: {
          type: 'string',
          description: 'Insurance policy number',
        },
        policyHolder: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            policyType: { 
              type: 'string',
              enum: ['auto', 'home', 'health', 'life'],
            },
          },
          required: ['name', 'policyType'],
        },
        incident: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['accident', 'theft', 'damage', 'injury', 'other'],
            },
            date: { type: 'string', format: 'date' },
            location: { type: 'string' },
            description: { type: 'string' },
            estimatedLoss: {
              type: 'number',
              minimum: 0,
            },
          },
          required: ['type', 'date', 'description'],
        },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              fileId: { type: 'string' },
              fileName: { type: 'string' },
              fileType: { type: 'string' },
              uploadedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        submissionStatus: {
          type: 'string',
          enum: ['draft', 'submitted', 'validated', 'rejected'],
        },
      },
      required: ['claimId', 'policyNumber', 'policyHolder', 'incident'],
    },
    
    version: '1.0.0',
    createdDate: '2024-02-20T09:00:00.000Z',
    lastUpdatedDate: '2024-02-20T09:00:00.000Z',
    createdBy: 'mike.johnson@ibm.com',
    lastUpdatedBy: 'mike.johnson@ibm.com',
  },
];
