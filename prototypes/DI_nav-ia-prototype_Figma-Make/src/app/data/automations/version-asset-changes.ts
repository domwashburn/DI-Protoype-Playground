/**
 * Version Asset Changes - Mock Data
 * 
 * Detailed asset-level changes for each version.
 * Tracks what services and assets were added, modified, or removed.
 */

export interface AssetChange {
  id: string;
  assetId: string;
  assetName: string;
  assetType: string;
  changeType: 'added' | 'modified' | 'removed';
  serviceId?: string;
  serviceName?: string;
  path?: string;
  details?: string;
}

export interface ServiceChange {
  id: string;
  serviceId: string;
  serviceName: string;
  changeType: 'added' | 'modified' | 'removed';
  details?: string;
}

export interface VersionAssetChanges {
  versionId: string;
  serviceChanges: ServiceChange[];
  assetChanges: AssetChange[];
}

// ============================================================================
// VERSION ASSET CHANGES
// ============================================================================

export const versionAssetChanges: VersionAssetChanges[] = [
  // v1.0.0 - Initial version
  {
    versionId: 'version-auto-credit-1.0.0',
    serviceChanges: [
      {
        id: 'svc-change-1',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        changeType: 'added',
        details: 'Initial service creation',
      },
    ],
    assetChanges: [
      {
        id: 'asset-change-1',
        assetId: 'asset-credit-tm-001',
        assetName: 'Credit Application Processing',
        assetType: 'Task Model',
        changeType: 'added',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Application Processing',
        details: 'Initial task model creation',
      },
      {
        id: 'asset-change-2',
        assetId: 'asset-credit-dm-001',
        assetName: 'Credit Scoring Decision Model',
        assetType: 'Decision Model',
        changeType: 'added',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Scoring Decision Model',
        details: 'Initial decision model',
      },
      {
        id: 'asset-change-3',
        assetId: 'asset-credit-rm-001',
        assetName: 'Credit Policy Rules',
        assetType: 'Ruleset',
        changeType: 'added',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Policy Rules',
        details: 'Initial ruleset',
      },
    ],
  },
  
  // v1.0.1 - Added fraud detection service
  {
    versionId: 'version-auto-credit-1.0.1',
    serviceChanges: [
      {
        id: 'svc-change-2',
        serviceId: 'service-fraud-detection',
        serviceName: 'Fraud Detection Service',
        changeType: 'added',
        details: 'Added new fraud detection service',
      },
    ],
    assetChanges: [
      {
        id: 'asset-change-4',
        assetId: 'asset-credit-tm-001',
        assetName: 'Credit Application Processing',
        assetType: 'Task Model',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Application Processing',
        details: 'Updated workflow to include fraud check',
      },
      {
        id: 'asset-change-5',
        assetId: 'asset-fraud-ml-001',
        assetName: 'Fraud Detection ML Model',
        assetType: 'ML Model',
        changeType: 'added',
        serviceId: 'service-fraud-detection',
        serviceName: 'Fraud Detection Service',
        path: 'Fraud Detection Service / Fraud Detection ML Model',
        details: 'New ML model for fraud detection',
      },
      {
        id: 'asset-change-6',
        assetId: 'asset-fraud-rm-001',
        assetName: 'Fraud Rules',
        assetType: 'Ruleset',
        changeType: 'added',
        serviceId: 'service-fraud-detection',
        serviceName: 'Fraud Detection Service',
        path: 'Fraud Detection Service / Fraud Rules',
        details: 'Fraud detection business rules',
      },
    ],
  },
  
  // v1.1.0 - Deployed to production
  {
    versionId: 'version-auto-credit-1.1.0',
    serviceChanges: [],
    assetChanges: [
      {
        id: 'asset-change-7',
        assetId: 'asset-credit-dm-001',
        assetName: 'Credit Scoring Decision Model',
        assetType: 'Decision Model',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Scoring Decision Model',
        details: 'Updated scoring thresholds for production',
      },
      {
        id: 'asset-change-8',
        assetId: 'asset-credit-dashboard-001',
        assetName: 'Credit Risk Dashboard',
        assetType: 'Dashboard',
        changeType: 'added',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Risk Dashboard',
        details: 'Added monitoring dashboard',
      },
    ],
  },
  
  // v2.0.0 - Credit risk major update
  {
    versionId: 'version-auto-credit-2.0.0',
    serviceChanges: [],
    assetChanges: [
      {
        id: 'asset-change-credit-2.0-1',
        assetId: 'asset-credit-dm-001',
        assetName: 'Credit Scoring Decision Model',
        assetType: 'Decision Model',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Scoring Decision Model',
        details: 'Enhanced credit scoring with new data models',
      },
      {
        id: 'asset-change-credit-2.0-2',
        assetId: 'asset-credit-rm-001',
        assetName: 'Credit Policy Rules',
        assetType: 'Ruleset',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Policy Rules',
        details: 'Updated policy rules for new scoring model',
      },
      {
        id: 'asset-change-credit-2.0-3',
        assetId: 'asset-fraud-ml-001',
        assetName: 'Fraud Detection ML Model',
        assetType: 'ML Model',
        changeType: 'modified',
        serviceId: 'service-fraud-detection',
        serviceName: 'Fraud Detection Service',
        path: 'Fraud Detection Service / Fraud Detection ML Model',
        details: 'Improved fraud detection accuracy',
      },
    ],
  },
  
  // v2.1.0 - Credit risk analytics enhancement
  {
    versionId: 'version-auto-credit-2.1.0',
    serviceChanges: [],
    assetChanges: [
      {
        id: 'asset-change-credit-2.1-1',
        assetId: 'asset-credit-dashboard-001',
        assetName: 'Credit Risk Dashboard',
        assetType: 'Dashboard',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Risk Dashboard',
        details: 'Enhanced dashboard analytics and reporting',
      },
      {
        id: 'asset-change-credit-2.1-2',
        assetId: 'asset-credit-dm-001',
        assetName: 'Credit Scoring Decision Model',
        assetType: 'Decision Model',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Scoring Decision Model',
        details: 'Minor optimization to decision tree',
      },
    ],
  },
  
  // v2.0.0 - Customer onboarding
  {
    versionId: 'version-auto-onboard-2.0.0',
    serviceChanges: [
      {
        id: 'svc-change-3',
        serviceId: 'service-kyc-verification',
        serviceName: 'KYC Verification Service',
        changeType: 'added',
        details: 'Added KYC verification service',
      },
    ],
    assetChanges: [
      {
        id: 'asset-change-9',
        assetId: 'asset-onboard-tm-001',
        assetName: 'Customer Onboarding Workflow',
        assetType: 'Task Model',
        changeType: 'modified',
        serviceId: 'service-onboarding',
        serviceName: 'Onboarding Service',
        path: 'Onboarding Service / Customer Onboarding Workflow',
        details: 'Integrated KYC verification step',
      },
      {
        id: 'asset-change-10',
        assetId: 'asset-kyc-dm-001',
        assetName: 'KYC Verification Decision',
        assetType: 'Decision Model',
        changeType: 'added',
        serviceId: 'service-kyc-verification',
        serviceName: 'KYC Verification Service',
        path: 'KYC Verification Service / KYC Verification Decision',
        details: 'New KYC decision model',
      },
      {
        id: 'asset-change-11',
        assetId: 'asset-kyc-ml-001',
        assetName: 'Document Verification ML Model',
        assetType: 'ML Model',
        changeType: 'added',
        serviceId: 'service-kyc-verification',
        serviceName: 'KYC Verification Service',
        path: 'KYC Verification Service / Document Verification ML Model',
        details: 'ML model for document verification',
      },
    ],
  },
  
  // v2.1.0 - Latest
  {
    versionId: 'version-auto-onboard-2.1.0',
    serviceChanges: [],
    assetChanges: [
      {
        id: 'asset-change-12',
        assetId: 'asset-onboard-dashboard-001',
        assetName: 'Onboarding Analytics Dashboard',
        assetType: 'Dashboard',
        changeType: 'modified',
        serviceId: 'service-onboarding',
        serviceName: 'Onboarding Service',
        path: 'Onboarding Service / Onboarding Analytics Dashboard',
        details: 'Enhanced analytics and metrics',
      },
      {
        id: 'asset-change-13',
        assetId: 'asset-kyc-rm-001',
        assetName: 'KYC Compliance Rules',
        assetType: 'Ruleset',
        changeType: 'added',
        serviceId: 'service-kyc-verification',
        serviceName: 'KYC Verification Service',
        path: 'KYC Verification Service / KYC Compliance Rules',
        details: 'New compliance rules for updated regulations',
      },
    ],
  },
  
  // Feature branch version
  {
    versionId: 'version-feature-credit-1.2.0-dev',
    serviceChanges: [
      {
        id: 'svc-change-4',
        serviceId: 'service-behavioral-scoring',
        serviceName: 'Behavioral Scoring Service',
        changeType: 'added',
        details: 'New ML-based behavioral scoring',
      },
    ],
    assetChanges: [
      {
        id: 'asset-change-14',
        assetId: 'asset-behavioral-ml-001',
        assetName: 'Behavioral Risk Scoring Model',
        assetType: 'ML Model',
        changeType: 'added',
        serviceId: 'service-behavioral-scoring',
        serviceName: 'Behavioral Scoring Service',
        path: 'Behavioral Scoring Service / Behavioral Risk Scoring Model',
        details: 'New ML model for behavioral risk analysis',
      },
      {
        id: 'asset-change-15',
        assetId: 'asset-credit-dm-001',
        assetName: 'Credit Scoring Decision Model',
        assetType: 'Decision Model',
        changeType: 'modified',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Credit Scoring Decision Model',
        details: 'Integrated behavioral scoring factors',
      },
      {
        id: 'asset-change-16',
        assetId: 'asset-credit-rm-002',
        assetName: 'Enhanced Credit Policy',
        assetType: 'Ruleset',
        changeType: 'added',
        serviceId: 'service-credit-risk',
        serviceName: 'Credit Risk Service',
        path: 'Credit Risk Service / Enhanced Credit Policy',
        details: 'New policy incorporating behavioral factors',
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get asset changes for a version
 */
export function getVersionAssetChanges(versionId: string): VersionAssetChanges | undefined {
  return versionAssetChanges.find(v => v.versionId === versionId);
}

/**
 * Get all asset changes for an entity across versions
 */
export function getAllAssetChangesForEntity(entityId: string): AssetChange[] {
  // In a real implementation, would filter by entityId
  // For now, return all asset changes
  const allChanges: AssetChange[] = [];
  versionAssetChanges.forEach(v => {
    allChanges.push(...v.assetChanges);
  });
  return allChanges;
}

/**
 * Get changes by type
 */
export function getChangesByType(
  versionId: string,
  changeType: 'added' | 'modified' | 'removed'
): { services: ServiceChange[]; assets: AssetChange[] } {
  const changes = getVersionAssetChanges(versionId);
  if (!changes) return { services: [], assets: [] };
  
  return {
    services: changes.serviceChanges.filter(c => c.changeType === changeType),
    assets: changes.assetChanges.filter(c => c.changeType === changeType),
  };
}

/**
 * Get change summary
 */
export function getChangeSummary(versionId: string): {
  servicesAdded: number;
  servicesModified: number;
  servicesRemoved: number;
  assetsAdded: number;
  assetsModified: number;
  assetsRemoved: number;
  totalChanges: number;
} {
  const changes = getVersionAssetChanges(versionId);
  if (!changes) {
    return {
      servicesAdded: 0,
      servicesModified: 0,
      servicesRemoved: 0,
      assetsAdded: 0,
      assetsModified: 0,
      assetsRemoved: 0,
      totalChanges: 0,
    };
  }
  
  const servicesAdded = changes.serviceChanges.filter(c => c.changeType === 'added').length;
  const servicesModified = changes.serviceChanges.filter(c => c.changeType === 'modified').length;
  const servicesRemoved = changes.serviceChanges.filter(c => c.changeType === 'removed').length;
  const assetsAdded = changes.assetChanges.filter(c => c.changeType === 'added').length;
  const assetsModified = changes.assetChanges.filter(c => c.changeType === 'modified').length;
  const assetsRemoved = changes.assetChanges.filter(c => c.changeType === 'removed').length;
  
  return {
    servicesAdded,
    servicesModified,
    servicesRemoved,
    assetsAdded,
    assetsModified,
    assetsRemoved,
    totalChanges: changes.serviceChanges.length + changes.assetChanges.length,
  };
}
