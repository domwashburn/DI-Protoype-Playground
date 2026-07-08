/**
 * Data Models for Demand Forecast Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'demand-model',
    hashId: 'dmdf1',
    name: 'Demand Forecast Data Model',
    displayName: 'Product Demand Forecast',
    description: 'Product demand predictions with historical trends',
    serviceId: 'demand-forecast',
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        forecastedDemand: { type: 'number' },
        confidence: { type: 'number' },
        trend: { type: 'string' },
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
