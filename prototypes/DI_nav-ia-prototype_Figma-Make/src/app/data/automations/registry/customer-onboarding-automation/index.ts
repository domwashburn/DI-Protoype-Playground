/**
 * Customer Onboarding Automation (t8x3p)
 * Complete automation export
 */

export { automation } from './automation';
export * as services from './services';

// Aggregate all services
import * as kycVerification from './services/kyc-verification';
import * as onboardingService from './services/onboarding-service';

export const allServices = [
  kycVerification.service,
  onboardingService.service,
];

export const allDataModels = [
  ...kycVerification.dataModels,
  ...onboardingService.dataModels,
];

export const allAssets = [
  ...kycVerification.allAssets,
  ...onboardingService.allAssets,
];
