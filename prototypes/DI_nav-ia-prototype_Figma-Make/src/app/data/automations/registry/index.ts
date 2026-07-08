/**
 * Registry Index - Central Export Point
 * 
 * This file aggregates all automations, services, data models, and assets
 * from the registry structure into consumable arrays for the data layer.
 */

import * as automation624_20 from './automation-6-24-20';
import * as customerOnboarding from './customer-onboarding-automation';
import * as claimsProcessing from './claims-processing-automation';
import * as dynamicPricing from './dynamic-pricing-automation';
import * as predictiveMaintenance from './predictive-maintenance-automation';
import * as supplyChain from './supply-chain-optimization';
import * as patientCare from './patient-care-coordination';
import * as compliance from './regulatory-compliance-monitoring';
import * as churnPrevention from './customer-churn-prevention';

import type { DecisionAutomation, DecisionService, Asset, DataModel } from '../shared/types';

// ============================================================================
// AUTOMATIONS
// ============================================================================

export const allAutomations: DecisionAutomation[] = [
  automation624_20.automation,
  customerOnboarding.automation,
  claimsProcessing.automation,
  dynamicPricing.automation,
  predictiveMaintenance.automation,
  supplyChain.automation,
  patientCare.automation,
  compliance.automation,
  churnPrevention.automation,
];

// ============================================================================
// SERVICES
// ============================================================================

export const allServices: DecisionService[] = [
  ...automation624_20.allServices,
  ...customerOnboarding.allServices,
  ...claimsProcessing.allServices,
  ...dynamicPricing.allServices,
  ...predictiveMaintenance.allServices,
  ...supplyChain.allServices,
  ...patientCare.allServices,
  ...compliance.allServices,
  ...churnPrevention.allServices,
];

// ============================================================================
// DATA MODELS
// ============================================================================

export const allDataModels: DataModel[] = [
  ...automation624_20.allDataModels,
  ...customerOnboarding.allDataModels,
  ...claimsProcessing.allDataModels,
  ...dynamicPricing.allDataModels,
  ...predictiveMaintenance.allDataModels,
  ...supplyChain.allDataModels,
  ...patientCare.allDataModels,
  ...compliance.allDataModels,
  ...churnPrevention.allDataModels,
];

// ============================================================================
// ASSETS (All types)
// ============================================================================

export const allAssets: Asset[] = [
  ...automation624_20.allAssets,
  ...customerOnboarding.allAssets,
  ...claimsProcessing.allAssets,
  ...dynamicPricing.allAssets,
  ...predictiveMaintenance.allAssets,
  ...supplyChain.allAssets,
  ...patientCare.allAssets,
  ...compliance.allAssets,
  ...churnPrevention.allAssets,
];

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Get all registry data
 */
export function getAllRegistryData() {
  return {
    automations: allAutomations,
    services: allServices,
    dataModels: allDataModels,
    assets: allAssets,
  };
}

/**
 * Get counts for debugging
 */
export function getRegistryCounts() {
  return {
    automations: allAutomations.length,
    services: allServices.length,
    dataModels: allDataModels.length,
    assets: allAssets.length,
  };
}
