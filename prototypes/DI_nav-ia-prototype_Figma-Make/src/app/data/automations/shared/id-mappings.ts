/**
 * Hash ID Mappings
 * 
 * Bidirectional mappings between human-readable IDs and short hash IDs
 * 
 * Hash IDs are:
 * - 5 characters long
 * - Base64-like (alphanumeric, case-sensitive)
 * - URL-safe (no special characters)
 * - Used for sharing links and cross-referencing
 * 
 * Human-readable IDs are:
 * - Used for folder names and primary keys
 * - Easy to understand and maintain
 * - Used in navigation paths
 */

// ============================================================================
// HASH ID MAPPINGS (Hash → Readable)
// ============================================================================

export const HASH_TO_READABLE = {
  // Automations
  automations: {
    'a6k2p': 'automation-6-24-20',
    't8x3p': 'customer-onboarding-automation',
    't7x2p': 'claims-processing-automation',
    't6x2p': 'dynamic-pricing-automation',
    't5x2p': 'predictive-maintenance-automation',
    't4x2p': 'supply-chain-optimization',
    't3x2p': 'patient-care-coordination',
    't2x2p': 'regulatory-compliance-monitoring',
    't1x2p': 'customer-churn-prevention',
    'cpmd1': 'churn-prediction-model',
    'laa1x': 'loan-approval-automation',
    'psui1': 'prod-suite',
    'rma1x': 'risk-model-automation',
    'csa1x': 'customer-segmentation-ai',
    'daa1x': 'dashboard-analytics-auto',
    'cc1x2': 'compliance-check-1',
  },
  
  // Services
  services: {
    'scr1k': 'credit-risk-assessment',
    'sfd1k': 'fraud-detection',
    'son1k': 'onboarding-service',
    'skyc1': 'kyc-verification',
    'sci1k': 'claims-intake',
    'sca1k': 'claims-assessment',
    'sfc1k': 'fraud-check',
    'spe1k': 'pricing-engine',
    'sca2k': 'competitor-analysis',
    'sdf1k': 'demand-forecast',
    'ssa1k': 'sensor-analysis',
    'sfp1k': 'failure-prediction',
    'sms1k': 'maintenance-scheduler',
    'sio1k': 'inventory-optimizer',
    'slr1k': 'logistics-routing',
    'spt1k': 'patient-triage',
    'sra1k': 'resource-allocation',
    'sas1k': 'appointment-scheduler',
    'scc1k': 'compliance-checker',
    're1k': 'reporting-engine',
    'scp1k': 'churn-prediction',
    'sct1k': 'campaign-trigger',
    'scm1k': 'churn-ml',
    'sci2k': 'churn-intervention',
    'spp1k': 'payment-processing',
    'stv1k': 'transaction-validation',
    'srs1k': 'risk-scoring',
    'seg1k': 'segmentation',
    'cui1k': 'customer-insights',
    'san1k': 'analytics',
    'rec1k': 'recommendation',
    'scm2k': 'compliance-monitoring',
    'srr1k': 'regulatory-reporting',
  },
  
  // Data Models
  dataModels: {
    'dmcu1': 'customer-data-model',
    'dmcr1': 'credit-application-data-model',
    'dmrs1': 'risk-score-data-model',
    'dmfr1': 'fraud-score-data-model',
    'dmon1': 'onboarding-data-model',
    'dmky1': 'kyc-data-model',
    'dmcl1': 'claim-data-model',
    'dmpr1': 'pricing-data-model',
    'dmse1': 'sensor-data-model',
    'dmpa1': 'patient-data-model',
  },
  
  // Functions
  functions: {
    'fn01k': 'credit-score-checker',
    'fn02k': 'validate-income',
    'fn03k': 'calculate-risk-score',
    'fn04k': 'fraud-detection-check',
    'fn05k': 'document-verification',
    'fn06k': 'identity-verification',
    'fn07k': 'claim-validator',
    'fn08k': 'pricing-calculator',
    'fn09k': 'sensor-analyzer',
    'fn10k': 'predict-failure',
  },
  
  // Assets
  assets: {
    'acdm1': 'credit-decision-model',
    'acrm1': 'credit-risk-rules',
    'acml1': 'credit-risk-ml-model',
    'actm1': 'credit-task-model',
    'afdm1': 'fraud-detection-ml-model',
    'afrm1': 'fraud-rules',
    'aodm1': 'onboarding-decision-model',
    'akdm1': 'kyc-decision-model',
  },
} as const;

// ============================================================================
// REVERSE MAPPINGS (Readable → Hash)
// ============================================================================

export const READABLE_TO_HASH = {
  automations: Object.fromEntries(
    Object.entries(HASH_TO_READABLE.automations).map(([k, v]) => [v, k])
  ),
  services: Object.fromEntries(
    Object.entries(HASH_TO_READABLE.services).map(([k, v]) => [v, k])
  ),
  dataModels: Object.fromEntries(
    Object.entries(HASH_TO_READABLE.dataModels).map(([k, v]) => [v, k])
  ),
  functions: Object.fromEntries(
    Object.entries(HASH_TO_READABLE.functions).map(([k, v]) => [v, k])
  ),
  assets: Object.fromEntries(
    Object.entries(HASH_TO_READABLE.assets).map(([k, v]) => [v, k])
  ),
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get readable ID from hash ID
 */
export function getReadableId(
  type: keyof typeof HASH_TO_READABLE,
  hashId: string
): string | undefined {
  return HASH_TO_READABLE[type][hashId as keyof typeof HASH_TO_READABLE[typeof type]];
}

/**
 * Get hash ID from readable ID
 */
export function getHashId(
  type: keyof typeof READABLE_TO_HASH,
  readableId: string
): string | undefined {
  return READABLE_TO_HASH[type][readableId as keyof typeof READABLE_TO_HASH[typeof type]];
}

/**
 * Generate shareable URL with hash ID
 * 
 * @example
 * generateShareableUrl('/automations/automation-6-24-20', 'a6k2p')
 * // Returns: '/automations?id=a6k2p'
 */
export function generateShareableUrl(path: string, hashId: string): string {
  const basePath = path.split('/').slice(0, 2).join('/'); // Get base path
  return `${basePath}?id=${hashId}`;
}

/**
 * Resolve hash ID to full path
 * 
 * @example
 * resolveHashId('a6k2p', 'automations')
 * // Returns: '/automations/automation-6-24-20'
 */
export function resolveHashId(
  hashId: string,
  type: 'automations' | 'services'
): string | undefined {
  const readableId = getReadableId(type, hashId);
  if (!readableId) return undefined;
  
  if (type === 'automations') {
    return `/automations/${readableId}`;
  }
  
  return undefined;
}

/**
 * Check if a string is a valid hash ID format (5 alphanumeric characters)
 */
export function isHashId(str: string): boolean {
  return /^[a-zA-Z0-9]{5}$/.test(str);
}

/**
 * Check if a string is a readable ID format (kebab-case)
 */
export function isReadableId(str: string): boolean {
  return /^[a-z0-9-]+$/.test(str);
}
