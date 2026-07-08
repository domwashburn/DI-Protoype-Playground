/**
 * Data Models for Pricing Engine Service
 */

import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'pricing-model',
    hashId: 'dmpr1',
    name: 'Pricing Data Model',
    displayName: 'Product Pricing',
    description: 'Product pricing with demand, inventory, and competitive data',
    serviceId: 'pricing-engine',
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        currentPrice: { type: 'number' },
        optimalPrice: { type: 'number' },
        demandScore: { type: 'number' },
        inventoryLevel: { type: 'number' },
        competitorPrices: { type: 'array' },
      },
      required: ['productId', 'currentPrice'],
    },
    version: '1.0.0',
    createdDate: '2025-06-30T10:39:00.000Z',
    lastUpdatedDate: '2025-06-30T10:39:00.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastUpdatedBy: 'domwashburn@us.ibm.com',
  },
];
