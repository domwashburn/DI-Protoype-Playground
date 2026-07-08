/**
 * Supply Chain Optimization (sc4a1)
 */

export { automation } from './automation';
export * as services from './services';

import * as demandForecastSc from './services/demand-forecast-sc';
import * as inventoryOptimizer from './services/inventory-optimizer';
import * as logisticsRouting from './services/logistics-routing';

export const allServices = [
  demandForecastSc.service,
  inventoryOptimizer.service,
  logisticsRouting.service,
];

export const allDataModels = [];
export const allAssets = [];
