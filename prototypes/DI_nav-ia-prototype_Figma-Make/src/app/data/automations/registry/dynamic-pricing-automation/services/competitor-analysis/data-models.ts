/**
 * Data Models for Competitor Analysis Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'competitor-model',
    hashId: 'dmco1',
    name: 'Competitor Data Model',
    displayName: 'Competitor Analysis',
    description: 'Competitor pricing and strategy data',
    serviceId: 'competitor-analysis',
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        competitorPrices: { type: 'array' },
        marketPosition: { type: 'string' },
      },
      required: ['productId'],
    },
    version: '1.0.0',
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
];
