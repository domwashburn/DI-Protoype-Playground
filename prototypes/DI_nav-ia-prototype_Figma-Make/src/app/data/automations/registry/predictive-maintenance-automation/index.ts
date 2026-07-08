/**
 * Predictive Maintenance Automation (pm5a1)
 */

export { automation } from './automation';
export * as services from './services';

import * as sensorAnalysis from './services/sensor-analysis';
import * as failurePrediction from './services/failure-prediction';
import * as maintenanceScheduler from './services/maintenance-scheduler';

export const allServices = [
  sensorAnalysis.service,
  failurePrediction.service,
  maintenanceScheduler.service,
];

export const allDataModels = [];
export const allAssets = [];
