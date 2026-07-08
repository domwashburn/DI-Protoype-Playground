/**
 * Data Models for Fraud Detection Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'fraud-score-data-model',
    hashId: 'dmfr1',
    
    name: 'Fraud Score',
    displayName: 'Fraud Score Data Model',
    description: 'Fraud risk assessment output',
    
    serviceId: 'fraud-detection',
    
    schema: {
      type: 'object',
      properties: {
        fraudScore: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          description: 'Fraud risk score (0 = no risk, 100 = high risk)',
        },
        riskLevel: {
          type: 'string',
          enum: ['low', 'medium', 'high', 'critical'],
          description: 'Fraud risk level',
        },
        indicators: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              indicator: { type: 'string' },
              severity: { type: 'string' },
              description: { type: 'string' },
            },
          },
          description: 'Fraud indicators detected',
        },
      },
      required: ['fraudScore', 'riskLevel'],
    },
    
    version: '1.0.0',
    createdDate: '2025-06-24T15:50:00.000Z',
    lastUpdatedDate: '2025-06-24T15:50:00.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
];
