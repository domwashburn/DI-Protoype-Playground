/**
 * Data Models for Fraud Check Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'fraud-check-model',
    hashId: 'dmfc1',
    name: 'Fraud Check',
    displayName: 'Fraud Detection Data Model',
    description: 'Fraud detection results with risk score and indicators',
    serviceId: 'fraud-check',
    schema: {
      type: 'object',
      properties: {
        claimId: { type: 'string' },
        fraudScore: { type: 'number' },
        riskLevel: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
        indicators: { type: 'array' },
        recommendation: { type: 'string', enum: ['approve', 'reject', 'investigate'] },
      },
      required: ['claimId', 'fraudScore', 'recommendation'],
    },
    version: '1.0.0',
    createdDate: '2024-02-20T09:35:00.000Z',
    lastUpdatedDate: '2024-02-20T09:35:00.000Z',
    createdBy: 'mike.johnson@ibm.com',
    lastUpdatedBy: 'mike.johnson@ibm.com',
  },
];
