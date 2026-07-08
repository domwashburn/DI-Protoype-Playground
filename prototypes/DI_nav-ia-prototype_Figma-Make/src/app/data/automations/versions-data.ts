/**
 * Version History - Mock Data
 * 
 * This module contains version history for automations, services, and assets.
 * Each version represents a commit/snapshot in time with full entity state.
 * 
 * Version Strategy:
 * - Full snapshots for easy rollback
 * - Change tracking for diffs
 * - Semantic versioning
 * - Git-like commit history
 */

import type { Version, Change, AIMetadata } from './branches-types';

// ============================================================================
// VERSION HISTORY
// ============================================================================

export const versions: Version[] = [
  // =========================================================================
  // AUTOMATION: automation-6-24-20 (Credit Risk) - Version History
  // =========================================================================
  
  // v1.0.0 - Initial AI-generated version
  {
    id: 'version-auto-credit-1.0.0',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '1.0.0',
    semanticVersion: { major: 1, minor: 0, patch: 0 },
    
    timestamp: '2025-06-24T15:45:12.000Z',
    author: 'Decision Assistant',
    authorEmail: 'ai@decision-intelligence.ibm.com',
    message: 'Initial version: AI-generated credit risk assessment automation',
    
    parentVersionIds: [],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation',
      description: 'Automated decision that the decision assistant generated for credit risk evaluation',
      status: 'draft',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk'],
      tags: [{ id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' }],
      industry: 'Banking',
    },
    
    changes: [
      {
        id: 'change-1',
        field: '*',
        changeType: 'added',
        newValue: 'Initial creation',
        timestamp: '2025-06-24T15:45:12.000Z',
        author: 'Decision Assistant',
      },
    ],
    
    deployedTo: [
      {
        environment: 'development',
        deployedAt: '2025-06-24T16:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-dev-0624-01',
      },
    ],
    
    filesChanged: 1,
    insertions: 50,
    deletions: 0,
    
    tags: ['initial', 'ai-generated'],
  },
  
  // v1.0.1 - Human review and updates
  {
    id: 'version-auto-credit-1.0.1',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '1.0.1',
    semanticVersion: { major: 1, minor: 0, patch: 1 },
    
    timestamp: '2025-06-25T10:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Updated description and added fraud detection service',
    
    parentVersionIds: ['version-auto-credit-1.0.0'],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation',
      description: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
      status: 'draft',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk', 'service-fraud-detection'],
      tags: [
        { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
      ],
      industry: 'Banking',
    },
    
    changes: [
      {
        id: 'change-2',
        field: 'description',
        changeType: 'modified',
        oldValue: 'Automated decision that the decision assistant generated for credit risk evaluation',
        newValue: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
        timestamp: '2025-06-25T10:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
      {
        id: 'change-3',
        field: 'serviceIds',
        changeType: 'added',
        newValue: 'service-fraud-detection',
        index: 1,
        timestamp: '2025-06-25T10:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
      {
        id: 'change-4',
        field: 'tags',
        changeType: 'added',
        newValue: { id: 'tag-review', label: 'Review updates', color: 'blue' },
        index: 1,
        timestamp: '2025-06-25T10:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'staging',
        deployedAt: '2025-06-26T14:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-stage-0626-01',
      },
    ],
    
    filesChanged: 1,
    insertions: 3,
    deletions: 1,
    
    tags: ['reviewed', 'enhanced'],
  },
  
  // v1.1.0 - Deployed to production
  {
    id: 'version-auto-credit-1.1.0',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '1.1.0',
    semanticVersion: { major: 1, minor: 1, patch: 0 },
    
    timestamp: '2025-10-15T14:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Deployed to production with execution tracking',
    
    parentVersionIds: ['version-auto-credit-1.0.1'],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation',
      description: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
      status: 'deployed',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk', 'service-fraud-detection'],
      tags: [
        { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
      ],
      industry: 'Banking',
      executionCount: 15432,
      lastExecuted: '2025-10-16T08:30:00.000Z',
    },
    
    changes: [
      {
        id: 'change-5',
        field: 'status',
        changeType: 'modified',
        oldValue: 'draft',
        newValue: 'deployed',
        timestamp: '2025-10-15T14:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
      {
        id: 'change-6',
        field: 'executionCount',
        changeType: 'added',
        newValue: 15432,
        timestamp: '2025-10-15T14:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'production',
        deployedAt: '2025-10-15T14:20:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-prod-1015-01',
      },
    ],
    
    filesChanged: 1,
    insertions: 2,
    deletions: 0,
    
    tags: ['deployed', 'Production'],
  },
  
  // v2.0.0 - Deployed to staging
  {
    id: 'version-auto-credit-2.0.0',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '2.0.0',
    semanticVersion: { major: 2, minor: 0, patch: 0 },
    
    timestamp: '2025-06-30T10:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Major update: Enhanced credit scoring with new data models',
    
    parentVersionIds: ['version-auto-credit-1.1.0'],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation',
      description: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
      status: 'draft',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk', 'service-fraud-detection'],
      tags: [
        { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
      ],
      industry: 'Banking',
      executionCount: 15432,
      lastExecuted: '2025-10-16T08:30:00.000Z',
    },
    
    changes: [
      {
        id: 'change-11',
        field: 'version',
        changeType: 'modified',
        oldValue: '1.1.0',
        newValue: '2.0.0',
        timestamp: '2025-06-30T10:00:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'staging',
        deployedAt: '2025-06-30T11:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-staging-0630-01',
      },
    ],
    
    filesChanged: 3,
    insertions: 25,
    deletions: 5,
    
    tags: ['Staging'],
  },
  
  // v2.1.0 - Latest version in development
  {
    id: 'version-auto-credit-2.1.0',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '2.1.0',
    semanticVersion: { major: 2, minor: 1, patch: 0 },
    
    timestamp: '2025-10-13T16:00:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Enhanced dashboard analytics and reporting',
    
    parentVersionIds: ['version-auto-credit-2.0.0'],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation',
      description: 'Comprehensive credit risk evaluation with automated verification and fraud detection',
      status: 'draft',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk', 'service-fraud-detection'],
      tags: [
        { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
      ],
      industry: 'Banking',
      executionCount: 15432,
      lastExecuted: '2025-10-16T08:30:00.000Z',
    },
    
    changes: [
      {
        id: 'change-12',
        field: 'dashboard',
        changeType: 'modified',
        newValue: 'Enhanced analytics dashboard',
        timestamp: '2025-10-13T16:00:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'development',
        deployedAt: '2025-10-13T17:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-dev-1013-01',
      },
    ],
    
    filesChanged: 2,
    insertions: 12,
    deletions: 3,
    
    tags: ['latest', 'Development'],
  },
  
  // =========================================================================
  // AUTOMATION: test-8 (Customer Onboarding) - Version History
  // =========================================================================
  
  {
    id: 'version-auto-onboard-2.0.0',
    entityId: 'test-8',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '2.0.0',
    semanticVersion: { major: 2, minor: 0, patch: 0 },
    
    timestamp: '2025-06-30T10:39:21.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Major update: Added KYC verification service',
    
    parentVersionIds: ['version-auto-onboard-1.5.0'],
    
    snapshot: {
      id: 'test-8',
      name: 'Test 8',
      displayName: 'Customer Onboarding Automation',
      description: 'Comprehensive customer onboarding process with automated verification and compliance checks',
      status: 'deployed',
      variant: 'standard',
      serviceIds: ['service-onboarding', 'service-kyc-verification'],
      tags: [
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
        { id: 'tag-production', label: 'Production', color: 'green' },
      ],
      industry: 'Banking',
      executionCount: 8921,
    },
    
    changes: [
      {
        id: 'change-7',
        field: 'serviceIds',
        changeType: 'added',
        newValue: 'service-kyc-verification',
        index: 1,
        timestamp: '2025-06-30T10:39:21.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'staging',
        deployedAt: '2025-06-30T11:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-stage-0630-01',
      },
      {
        environment: 'production',
        deployedAt: '2025-07-02T09:15:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-prod-0702-01',
      },
    ],
    
    filesChanged: 1,
    insertions: 1,
    deletions: 0,
    
    tags: ['major-update', 'Staging', 'Production'],
  },
  
  // v2.1.0 - Latest version
  {
    id: 'version-auto-onboard-2.1.0',
    entityId: 'test-8',
    entityType: 'automation',
    branchId: 'branch-main',
    
    version: '2.1.0',
    semanticVersion: { major: 2, minor: 1, patch: 0 },
    
    timestamp: '2025-10-13T16:45:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'Enhanced dashboard analytics',
    
    parentVersionIds: ['version-auto-onboard-2.0.0'],
    
    snapshot: {
      id: 'test-8',
      name: 'Test 8',
      displayName: 'Customer Onboarding Automation',
      description: 'Comprehensive customer onboarding process with automated verification and compliance checks',
      status: 'deployed',
      variant: 'standard',
      serviceIds: ['service-onboarding', 'service-kyc-verification'],
      tags: [
        { id: 'tag-review', label: 'Review updates', color: 'blue' },
        { id: 'tag-production', label: 'Production', color: 'green' },
      ],
      industry: 'Banking',
      executionCount: 8921,
      lastExecuted: '2025-10-16T09:15:00.000Z',
    },
    
    changes: [
      {
        id: 'change-8',
        field: 'lastExecuted',
        changeType: 'added',
        newValue: '2025-10-16T09:15:00.000Z',
        timestamp: '2025-10-13T16:45:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    deployedTo: [
      {
        environment: 'development',
        deployedAt: '2025-10-13T17:00:00.000Z',
        deployedBy: 'domwashburn@us.ibm.com',
        deploymentId: 'deploy-dev-1013-01',
      },
    ],
    
    filesChanged: 1,
    insertions: 1,
    deletions: 0,
    
    tags: ['latest', 'Development'],
  },
  
  // =========================================================================
  // FEATURE BRANCH: Enhanced Credit Scoring
  // =========================================================================
  
  {
    id: 'version-feature-credit-1.2.0-dev',
    entityId: 'automation-6-24-20',
    entityType: 'automation',
    branchId: 'branch-feature-credit-scoring',
    
    version: '1.2.0-dev',
    semanticVersion: { major: 1, minor: 2, patch: 0, prerelease: 'dev' },
    
    timestamp: '2025-10-16T11:20:00.000Z',
    author: 'domwashburn@us.ibm.com',
    authorEmail: 'domwashburn@us.ibm.com',
    message: 'WIP: Adding new ML risk factors',
    
    parentVersionIds: ['version-auto-credit-1.1.0'],
    
    snapshot: {
      id: 'automation-6-24-20',
      name: 'Automation 6-24-20',
      displayName: 'Credit Risk Assessment Automation (Enhanced)',
      description: 'Enhanced credit risk evaluation with ML-powered behavioral scoring and new risk factors',
      status: 'draft',
      variant: 'ai-generated',
      serviceIds: ['service-credit-risk', 'service-fraud-detection', 'service-behavioral-scoring'],
      tags: [
        { id: 'tag-ai-generated', label: 'AI Generated', color: 'purple' },
        { id: 'tag-ml', label: 'ML Enhanced', color: 'cyan' },
      ],
      industry: 'Banking',
    },
    
    changes: [
      {
        id: 'change-9',
        field: 'displayName',
        changeType: 'modified',
        oldValue: 'Credit Risk Assessment Automation',
        newValue: 'Credit Risk Assessment Automation (Enhanced)',
        timestamp: '2025-10-16T11:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
      {
        id: 'change-10',
        field: 'serviceIds',
        changeType: 'added',
        newValue: 'service-behavioral-scoring',
        index: 2,
        timestamp: '2025-10-16T11:20:00.000Z',
        author: 'domwashburn@us.ibm.com',
      },
    ],
    
    filesChanged: 1,
    insertions: 15,
    deletions: 2,
    
    tags: ['development', 'wip'],
  },
];

// ============================================================================
// AI METADATA EXAMPLES
// ============================================================================

export const aiMetadataExamples: AIMetadata[] = [
  // AI-generated automation
  {
    creationMethod: 'ai-generated',
    aiModel: 'gpt-4',
    aiVersion: 'gpt-4-0613',
    prompt: 'Create a credit risk assessment automation for evaluating loan applications with multi-factor risk scoring',
    promptTokens: 156,
    completionTokens: 892,
    confidence: 0.94,
    qualityScore: 0.91,
    reviewedBy: 'domwashburn@us.ibm.com',
    reviewDate: '2025-06-25T10:20:00.000Z',
    approved: true,
    userModifications: ['description', 'serviceIds', 'tags'],
    context: 'Generated from Decision Assistant based on regulatory requirements',
    generatedAt: '2025-06-24T15:45:12.000Z',
  },
  
  // AI-assisted manual creation
  {
    creationMethod: 'ai-assisted',
    aiModel: 'gpt-4',
    aiVersion: 'gpt-4-0613',
    prompt: 'Help me structure a customer onboarding workflow with compliance checks',
    promptTokens: 89,
    completionTokens: 445,
    confidence: 0.88,
    qualityScore: 0.85,
    userModifications: ['workflow', 'tasks', 'approvals'],
    context: 'User created with AI suggestions for workflow structure',
    generatedAt: '2025-06-30T10:00:00.000Z',
  },
  
  // Manual creation
  {
    creationMethod: 'manual',
    context: 'Manually created by domain expert',
    generatedAt: '2025-07-15T14:30:00.000Z',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get version by ID
 */
export function getVersionById(id: string): Version | undefined {
  return versions.find(v => v.id === id);
}

/**
 * Get all versions for an entity
 */
export function getVersionsByEntityId(entityId: string): Version[] {
  return versions.filter(v => v.entityId === entityId);
}

/**
 * Get versions for an entity on a specific branch
 */
export function getVersionsByEntityAndBranch(entityId: string, branchId: string): Version[] {
  return versions.filter(v => v.entityId === entityId && v.branchId === branchId);
}

/**
 * Get latest version for an entity on a branch
 */
export function getLatestVersion(entityId: string, branchId: string = 'branch-main'): Version | undefined {
  const entityVersions = getVersionsByEntityAndBranch(entityId, branchId);
  if (entityVersions.length === 0) return undefined;
  
  // Sort by timestamp descending
  return entityVersions.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];
}

/**
 * Get version history (chronological)
 */
export function getVersionHistory(entityId: string, branchId?: string): Version[] {
  let entityVersions = branchId
    ? getVersionsByEntityAndBranch(entityId, branchId)
    : getVersionsByEntityId(entityId);
  
  // Sort by timestamp ascending (oldest first)
  return entityVersions.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

/**
 * Get version by semantic version string
 */
export function getVersionBySemanticVersion(
  entityId: string,
  version: string,
  branchId: string = 'branch-main'
): Version | undefined {
  return versions.find(
    v => v.entityId === entityId && 
         v.branchId === branchId && 
         v.version === version
  );
}

/**
 * Compare two versions (get parent-to-child relationship)
 */
export function getVersionDifference(fromVersionId: string, toVersionId: string): Change[] {
  const toVersion = getVersionById(toVersionId);
  if (!toVersion) return [];
  
  // If toVersion has fromVersion as parent, return its changes
  if (toVersion.parentVersionIds.includes(fromVersionId)) {
    return toVersion.changes;
  }
  
  // Otherwise, need to calculate diff (would implement full diff logic here)
  return [];
}

/**
 * Get all changes for an entity
 */
export function getAllChanges(entityId: string, branchId?: string): Change[] {
  const entityVersions = branchId
    ? getVersionsByEntityAndBranch(entityId, branchId)
    : getVersionsByEntityId(entityId);
  
  const allChanges: Change[] = [];
  entityVersions.forEach(version => {
    allChanges.push(...version.changes);
  });
  
  return allChanges.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

/**
 * Get changes by author
 */
export function getChangesByAuthor(entityId: string, author: string): Change[] {
  return getAllChanges(entityId).filter(c => c.author === author);
}

/**
 * Get version statistics
 */
export function getVersionStats(entityId: string, branchId?: string): {
  totalVersions: number;
  totalChanges: number;
  contributors: string[];
  firstVersion: Version | undefined;
  latestVersion: Version | undefined;
} {
  const entityVersions = branchId
    ? getVersionsByEntityAndBranch(entityId, branchId)
    : getVersionsByEntityId(entityId);
  
  const contributors = [...new Set(entityVersions.map(v => v.author))];
  const history = getVersionHistory(entityId, branchId);
  const totalChanges = getAllChanges(entityId, branchId).length;
  
  return {
    totalVersions: entityVersions.length,
    totalChanges,
    contributors,
    firstVersion: history[0],
    latestVersion: history[history.length - 1],
  };
}

/**
 * Get undeployed changes
 * 
 * Returns all changes made after the most recent deployed version:
 * - Published (main branch) changes not yet deployed
 * - Draft (feature branch) changes under development
 */
export function getUndeployedChanges(entityId: string): {
  lastDeployedVersion: Version | undefined;
  publishedChanges: Version[];  // Changes on main branch after last deployment
  draftChanges: Version[];      // Changes on feature branches
  totalServicesChanged: number;
  totalAssetsChanged: number;
} {
  // Get all versions for this entity
  const allVersions = getVersionsByEntityId(entityId);
  
  // Find the most recent deployed version (on main branch with status 'deployed')
  const deployedVersions = allVersions
    .filter(v => 
      v.branchId === 'branch-main' && 
      v.snapshot && 
      'status' in v.snapshot && 
      v.snapshot.status === 'deployed'
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const lastDeployedVersion = deployedVersions[0];
  
  if (!lastDeployedVersion) {
    // No deployed version yet, all changes are undeployed
    const mainBranchVersions = allVersions.filter(v => v.branchId === 'branch-main');
    const featureBranchVersions = allVersions.filter(v => v.branchId !== 'branch-main');
    
    return {
      lastDeployedVersion: undefined,
      publishedChanges: mainBranchVersions,
      draftChanges: featureBranchVersions,
      totalServicesChanged: 0,
      totalAssetsChanged: 0,
    };
  }
  
  const deploymentTimestamp = new Date(lastDeployedVersion.timestamp).getTime();
  
  // Get published changes (main branch changes after last deployment)
  const publishedChanges = allVersions.filter(v => 
    v.branchId === 'branch-main' &&
    new Date(v.timestamp).getTime() > deploymentTimestamp
  );
  
  // Get draft changes (all feature branch changes)
  const draftChanges = allVersions.filter(v => 
    v.branchId !== 'branch-main' &&
    new Date(v.timestamp).getTime() > deploymentTimestamp
  );
  
  // Calculate total changes
  const allUndeployedChanges = [...publishedChanges, ...draftChanges];
  const uniqueServices = new Set<string>();
  const uniqueAssets = new Set<string>();
  
  allUndeployedChanges.forEach(version => {
    if (version.snapshot && 'serviceIds' in version.snapshot && Array.isArray(version.snapshot.serviceIds)) {
      version.snapshot.serviceIds.forEach((serviceId: string) => uniqueServices.add(serviceId));
    }
    version.changes.forEach(change => {
      if (change.field === 'serviceIds') {
        uniqueAssets.add(change.newValue as string);
      }
    });
  });
  
  return {
    lastDeployedVersion,
    publishedChanges: publishedChanges.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    draftChanges: draftChanges.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    totalServicesChanged: uniqueServices.size,
    totalAssetsChanged: publishedChanges.reduce((sum, v) => sum + v.filesChanged, 0) + 
                        draftChanges.reduce((sum, v) => sum + v.filesChanged, 0),
  };
}
