/**
 * Data Models for Onboarding Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'onboarding-data-model',
    hashId: 'dmon1',
    
    name: 'Onboarding Request',
    displayName: 'Onboarding Request Data Model',
    description: 'Customer onboarding request with applicant information and documents',
    
    serviceId: 'onboarding-service',
    
    schema: {
      type: 'object',
      properties: {
        requestId: {
          type: 'string',
          description: 'Unique onboarding request identifier',
        },
        applicantInfo: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            ssn: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                zipCode: { type: 'string' },
                country: { type: 'string' },
              },
            },
          },
          required: ['firstName', 'lastName', 'email'],
        },
        documents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              documentId: { type: 'string' },
              type: { 
                type: 'string',
                enum: ['drivers-license', 'passport', 'utility-bill', 'bank-statement'],
              },
              status: {
                type: 'string',
                enum: ['pending', 'verified', 'rejected'],
              },
              uploadedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        onboardingStatus: {
          type: 'string',
          enum: ['initiated', 'documents-pending', 'kyc-pending', 'approved', 'rejected'],
        },
      },
      required: ['requestId', 'applicantInfo', 'onboardingStatus'],
    },
    
    version: '1.0.0',
    createdDate: '2024-03-15T10:30:00.000Z',
    lastUpdatedDate: '2024-03-15T10:30:00.000Z',
    createdBy: 'sarah.chen@ibm.com',
    lastUpdatedBy: 'sarah.chen@ibm.com',
  },
];
