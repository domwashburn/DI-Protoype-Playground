/**
 * Patient Care Coordination (pc3a1)
 */

export { automation } from './automation';
export * as services from './services';

import * as patientTriage from './services/patient-triage';
import * as resourceAllocation from './services/resource-allocation';
import * as appointmentScheduler from './services/appointment-scheduler';

export const allServices = [
  patientTriage.service,
  resourceAllocation.service,
  appointmentScheduler.service,
];

export const allDataModels = [];
export const allAssets = [];
