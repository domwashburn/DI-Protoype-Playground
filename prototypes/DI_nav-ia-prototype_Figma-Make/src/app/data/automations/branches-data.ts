/**
 * Branch Definitions - Mock Data
 * 
 * This module contains branch data following a git-flow model.
 * Branches are used across all automations, services, and assets.
 * 
 * Branch Strategy:
 * - main: Production-ready code (protected)
 * - develop: Integration branch (protected)
 * - feature/*: Feature development
 * - hotfix/*: Critical fixes
 * - release/*: Release preparation
 */

import type { Branch } from './branches-types';

// ============================================================================
// BRANCHES
// ============================================================================

export const branches: Branch[] = [
  // Main branch (default, protected)
  {
    id: 'branch-main',
    name: 'main',
    displayName: 'Main',
    type: 'main',
    
    parentBranchId: undefined,
    baseBranchId: undefined,
    
    createdDate: '2025-01-01T00:00:00.000Z',
    createdBy: 'system',
    lastCommitDate: '2025-10-16T14:30:00.000Z',
    lastCommitBy: 'domwashburn@us.ibm.com',
    
    protection: 'protected',
    status: 'active',
    isDefault: true,
    
    description: 'Production-ready code. All changes must be thoroughly tested.',
    tags: ['production', 'stable'],
  },
  
  // Develop branch (integration)
  {
    id: 'branch-develop',
    name: 'develop',
    displayName: 'Develop',
    type: 'develop',
    
    parentBranchId: 'branch-main',
    baseBranchId: 'branch-main',
    
    createdDate: '2025-01-01T00:00:00.000Z',
    createdBy: 'system',
    lastCommitDate: '2025-10-16T16:45:00.000Z',
    lastCommitBy: 'domwashburn@us.ibm.com',
    
    protection: 'review',
    status: 'active',
    isDefault: false,
    
    aheadBy: 5,   // 5 commits ahead of main
    behindBy: 0,
    
    description: 'Integration branch for ongoing development.',
    tags: ['development', 'integration'],
  },
  
  // Feature branches
  {
    id: 'branch-feature-credit-scoring',
    name: 'feature/enhanced-credit-scoring',
    displayName: 'Enhanced Credit Scoring',
    type: 'feature',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-develop',
    
    createdDate: '2025-10-10T09:00:00.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastCommitDate: '2025-10-16T11:20:00.000Z',
    lastCommitBy: 'domwashburn@us.ibm.com',
    
    protection: 'none',
    status: 'active',
    isDefault: false,
    
    aheadBy: 8,
    behindBy: 2,
    
    description: 'Implementing ML-enhanced credit scoring with new risk factors',
    tags: ['ml', 'credit-risk', 'in-progress'],
  },
  
  {
    id: 'branch-feature-fraud-detection',
    name: 'feature/realtime-fraud-detection',
    displayName: 'Real-time Fraud Detection',
    type: 'feature',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-develop',
    
    createdDate: '2025-10-05T14:30:00.000Z',
    createdBy: 'sarah.chen@ibm.com',
    lastCommitDate: '2025-10-16T15:10:00.000Z',
    lastCommitBy: 'sarah.chen@ibm.com',
    
    protection: 'none',
    status: 'active',
    isDefault: false,
    
    aheadBy: 12,
    behindBy: 1,
    
    description: 'Adding real-time fraud detection with behavioral analytics',
    tags: ['fraud', 'ml', 'security'],
  },
  
  {
    id: 'branch-feature-ui-improvements',
    name: 'feature/dashboard-ui-improvements',
    displayName: 'Dashboard UI Improvements',
    type: 'feature',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-develop',
    
    createdDate: '2025-10-12T10:00:00.000Z',
    createdBy: 'domwashburn@us.ibm.com',
    lastCommitDate: '2025-10-16T09:45:00.000Z',
    lastCommitBy: 'domwashburn@us.ibm.com',
    
    protection: 'none',
    status: 'active',
    isDefault: false,
    
    aheadBy: 6,
    behindBy: 3,
    
    description: 'Carbon Design System v11 UI updates for dashboards',
    tags: ['ui', 'ux', 'carbon'],
  },
  
  // Release branch
  {
    id: 'branch-release-2.0',
    name: 'release/2.0',
    displayName: 'Release 2.0',
    type: 'release',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-main',
    
    createdDate: '2025-10-14T08:00:00.000Z',
    createdBy: 'release-manager@ibm.com',
    lastCommitDate: '2025-10-16T10:00:00.000Z',
    lastCommitBy: 'release-manager@ibm.com',
    
    protection: 'review',
    status: 'active',
    isDefault: false,
    
    aheadBy: 15,
    behindBy: 0,
    
    description: 'Preparing version 2.0 release with new ML features',
    tags: ['release', 'v2.0', 'testing'],
  },
  
  // Hotfix branch
  {
    id: 'branch-hotfix-auth',
    name: 'hotfix/authentication-fix',
    displayName: 'Authentication Fix',
    type: 'hotfix',
    
    parentBranchId: 'branch-main',
    baseBranchId: 'branch-main',
    
    createdDate: '2025-10-15T16:00:00.000Z',
    createdBy: 'security-team@ibm.com',
    lastCommitDate: '2025-10-15T18:30:00.000Z',
    lastCommitBy: 'security-team@ibm.com',
    
    protection: 'review',
    status: 'merged',
    isDefault: false,
    
    aheadBy: 0,   // Already merged
    behindBy: 0,
    
    description: 'Critical authentication security patch',
    tags: ['hotfix', 'security', 'merged'],
  },
  
  // Experiment branch
  {
    id: 'branch-experiment-genai',
    name: 'experiment/genai-decision-nodes',
    displayName: 'GenAI Decision Nodes',
    type: 'experiment',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-develop',
    
    createdDate: '2025-10-08T11:00:00.000Z',
    createdBy: 'research-team@ibm.com',
    lastCommitDate: '2025-10-14T14:20:00.000Z',
    lastCommitBy: 'research-team@ibm.com',
    
    protection: 'none',
    status: 'active',
    isDefault: false,
    
    aheadBy: 20,
    behindBy: 5,
    
    description: 'Experimental: Integrating GenAI for dynamic decision nodes',
    tags: ['experiment', 'genai', 'research'],
  },
  
  // Stale feature branch
  {
    id: 'branch-feature-old',
    name: 'feature/old-optimization',
    displayName: 'Old Optimization Feature',
    type: 'feature',
    
    parentBranchId: 'branch-develop',
    baseBranchId: 'branch-develop',
    
    createdDate: '2025-09-01T10:00:00.000Z',
    createdBy: 'former-dev@ibm.com',
    lastCommitDate: '2025-09-15T12:00:00.000Z',
    lastCommitBy: 'former-dev@ibm.com',
    
    protection: 'none',
    status: 'stale',
    isDefault: false,
    
    aheadBy: 3,
    behindBy: 25,  // Far behind
    
    description: 'Abandoned optimization feature - consider archiving',
    tags: ['stale', 'abandoned'],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get branch by ID
 */
export function getBranchById(id: string): Branch | undefined {
  return branches.find(b => b.id === id);
}

/**
 * Get branch by name
 */
export function getBranchByName(name: string): Branch | undefined {
  return branches.find(b => b.name === name);
}

/**
 * Get default branch
 */
export function getDefaultBranch(): Branch {
  return branches.find(b => b.isDefault) || branches[0];
}

/**
 * Get all branches
 */
export function getAllBranches(): Branch[] {
  return branches;
}

/**
 * Get active branches
 */
export function getActiveBranches(): Branch[] {
  return branches.filter(b => b.status === 'active');
}

/**
 * Get branches by type
 */
export function getBranchesByType(type: Branch['type']): Branch[] {
  return branches.filter(b => b.type === type);
}

/**
 * Get feature branches
 */
export function getFeatureBranches(): Branch[] {
  return getBranchesByType('feature');
}

/**
 * Get protected branches
 */
export function getProtectedBranches(): Branch[] {
  return branches.filter(b => b.protection === 'protected');
}

/**
 * Get child branches of a parent
 */
export function getChildBranches(parentId: string): Branch[] {
  return branches.filter(b => b.parentBranchId === parentId);
}

/**
 * Get branch hierarchy (from branch to root)
 */
export function getBranchHierarchy(branchId: string): Branch[] {
  const hierarchy: Branch[] = [];
  let currentBranch = getBranchById(branchId);
  
  while (currentBranch) {
    hierarchy.unshift(currentBranch);
    if (!currentBranch.parentBranchId) break;
    currentBranch = getBranchById(currentBranch.parentBranchId);
  }
  
  return hierarchy;
}

/**
 * Check if branch is ahead of base
 */
export function isBranchAhead(branchId: string): boolean {
  const branch = getBranchById(branchId);
  return branch ? (branch.aheadBy || 0) > 0 : false;
}

/**
 * Check if branch is behind base
 */
export function isBranchBehind(branchId: string): boolean {
  const branch = getBranchById(branchId);
  return branch ? (branch.behindBy || 0) > 0 : false;
}

/**
 * Check if branch needs update from base
 */
export function branchNeedsUpdate(branchId: string): boolean {
  return isBranchBehind(branchId);
}

/**
 * Get branch status summary
 */
export function getBranchStatusSummary(branchId: string): {
  status: Branch['status'];
  aheadBy: number;
  behindBy: number;
  needsUpdate: boolean;
  canMerge: boolean;
} {
  const branch = getBranchById(branchId);
  
  if (!branch) {
    return {
      status: 'archived',
      aheadBy: 0,
      behindBy: 0,
      needsUpdate: false,
      canMerge: false,
    };
  }
  
  return {
    status: branch.status,
    aheadBy: branch.aheadBy || 0,
    behindBy: branch.behindBy || 0,
    needsUpdate: (branch.behindBy || 0) > 0,
    canMerge: branch.status === 'active' && (branch.aheadBy || 0) > 0,
  };
}
