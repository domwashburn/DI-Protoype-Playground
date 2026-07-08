/**
 * Data Models for Claims Assessment Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'claims-assessment-model',
    hashId: 'dmca1',
    name: 'Claims Assessment',
    displayName: 'Claims Assessment Data Model',
    description: 'Claim assessment with severity analysis and settlement calculation',
    serviceId: 'claims-assessment',
    schema: {
      type: 'object',
      properties: {
        claimId: { type: 'string' },
        severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
        settlementAmount: { type: 'number' },
        assessmentStatus: { type: 'string', enum: ['pending', 'approved', 'rejected', 'review-required'] },
      },
      required: ['claimId', 'assessmentStatus'],
    },
    version: '1.0.0',
    createdDate: '2024-02-20T09:20:00.000Z',
    lastUpdatedDate: '2024-02-20T09:20:00.000Z',
    createdBy: 'mike.johnson@ibm.com',
    lastUpdatedBy: 'mike.johnson@ibm.com',
  },
];
