/**
 * useBranches Hook
 * 
 * React hooks for branch management and querying.
 * 
 * Features:
 * - Get all branches with filtering
 * - Get single branch by ID or name
 * - Branch status and comparisons
 * - Memoized results for performance
 * 
 * @example
 * ```typescript
 * const { branches, activeBranches } = useBranches();
 * const { branch } = useBranch('branch-main');
 * const { status } = useBranchStatus('branch-feature-credit-scoring');
 * ```
 */

import { useMemo } from 'react';
import type { Branch, BranchFilter } from '../automations/branches-types';
import {
  getAllBranches,
  getBranchById,
  getBranchByName,
  getDefaultBranch,
  getActiveBranches,
  getBranchesByType,
  getFeatureBranches,
  getProtectedBranches,
  getChildBranches,
  getBranchHierarchy,
  getBranchStatusSummary,
} from '../automations/branches-data';

// ============================================================================
// USE BRANCHES
// ============================================================================

export interface UseBranchesOptions {
  filter?: BranchFilter;
}

export interface UseBranchesResult {
  branches: Branch[];
  activeBranches: Branch[];
  featureBranches: Branch[];
  protectedBranches: Branch[];
  defaultBranch: Branch;
  count: number;
}

/**
 * Get all branches with optional filtering
 */
export function useBranches(options?: UseBranchesOptions): UseBranchesResult {
  const { filter } = options || {};
  
  const branches = useMemo(() => {
    let results = getAllBranches();
    
    if (!filter) {
      return results;
    }
    
    // Filter by type
    if (filter.type) {
      const types = Array.isArray(filter.type) ? filter.type : [filter.type];
      results = results.filter(b => types.includes(b.type));
    }
    
    // Filter by status
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      results = results.filter(b => statuses.includes(b.status));
    }
    
    // Filter by protection
    if (filter.protection) {
      const protections = Array.isArray(filter.protection) ? filter.protection : [filter.protection];
      results = results.filter(b => protections.includes(b.protection));
    }
    
    // Filter by creator
    if (filter.createdBy) {
      results = results.filter(b => b.createdBy === filter.createdBy);
    }
    
    // Filter by date range
    if (filter.createdAfter) {
      results = results.filter(b => new Date(b.createdDate) >= new Date(filter.createdAfter!));
    }
    
    if (filter.createdBefore) {
      results = results.filter(b => new Date(b.createdDate) <= new Date(filter.createdBefore!));
    }
    
    // Filter by search
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      results = results.filter(b =>
        b.name.toLowerCase().includes(searchLower) ||
        b.displayName?.toLowerCase().includes(searchLower) ||
        b.description?.toLowerCase().includes(searchLower)
      );
    }
    
    return results;
  }, [filter]);
  
  const activeBranches = useMemo(() => getActiveBranches(), []);
  const featureBranches = useMemo(() => getFeatureBranches(), []);
  const protectedBranches = useMemo(() => getProtectedBranches(), []);
  const defaultBranch = useMemo(() => getDefaultBranch(), []);
  
  return {
    branches,
    activeBranches,
    featureBranches,
    protectedBranches,
    defaultBranch,
    count: branches.length,
  };
}

// ============================================================================
// USE BRANCH
// ============================================================================

export interface UseBranchResult {
  branch: Branch | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Get a single branch by ID
 */
export function useBranch(branchId: string | undefined): UseBranchResult {
  const branch = useMemo(() => {
    if (!branchId) return null;
    return getBranchById(branchId) || null;
  }, [branchId]);
  
  return {
    branch,
    isLoading: false,
    error: null,
  };
}

/**
 * Get a branch by name
 */
export function useBranchByName(name: string | undefined): UseBranchResult {
  const branch = useMemo(() => {
    if (!name) return null;
    return getBranchByName(name) || null;
  }, [name]);
  
  return {
    branch,
    isLoading: false,
    error: null,
  };
}

// ============================================================================
// USE BRANCH STATUS
// ============================================================================

export interface UseBranchStatusResult {
  status: Branch['status'];
  aheadBy: number;
  behindBy: number;
  needsUpdate: boolean;
  canMerge: boolean;
  isProtected: boolean;
  isDefault: boolean;
}

/**
 * Get branch status and merge information
 */
export function useBranchStatus(branchId: string | undefined): UseBranchStatusResult {
  const { branch } = useBranch(branchId);
  
  return useMemo(() => {
    if (!branch) {
      return {
        status: 'archived',
        aheadBy: 0,
        behindBy: 0,
        needsUpdate: false,
        canMerge: false,
        isProtected: false,
        isDefault: false,
      };
    }
    
    const summary = getBranchStatusSummary(branch.id);
    
    return {
      ...summary,
      isProtected: branch.protection === 'protected',
      isDefault: branch.isDefault,
    };
  }, [branch]);
}

// ============================================================================
// USE BRANCH HIERARCHY
// ============================================================================

export interface UseBranchHierarchyResult {
  hierarchy: Branch[];
  parent: Branch | null;
  children: Branch[];
  root: Branch | null;
}

/**
 * Get branch hierarchy (parents and children)
 */
export function useBranchHierarchy(branchId: string | undefined): UseBranchHierarchyResult {
  const hierarchy = useMemo(() => {
    if (!branchId) return [];
    return getBranchHierarchy(branchId);
  }, [branchId]);
  
  const parent = useMemo(() => {
    if (!branchId) return null;
    const branch = getBranchById(branchId);
    if (!branch?.parentBranchId) return null;
    return getBranchById(branch.parentBranchId) || null;
  }, [branchId]);
  
  const children = useMemo(() => {
    if (!branchId) return [];
    return getChildBranches(branchId);
  }, [branchId]);
  
  const root = useMemo(() => {
    return hierarchy[0] || null;
  }, [hierarchy]);
  
  return {
    hierarchy,
    parent,
    children,
    root,
  };
}

// ============================================================================
// USE DEFAULT BRANCH
// ============================================================================

/**
 * Get the default branch (usually 'main')
 */
export function useDefaultBranch(): UseBranchResult {
  const branch = useMemo(() => getDefaultBranch(), []);
  
  return {
    branch,
    isLoading: false,
    error: null,
  };
}

// ============================================================================
// USE BRANCH COMPARISON
// ============================================================================

export interface UseBranchComparisonResult {
  source: Branch | null;
  target: Branch | null;
  aheadBy: number;
  behindBy: number;
  diverged: boolean;
  commonAncestor: Branch | null;
}

/**
 * Compare two branches
 */
export function useBranchComparison(
  sourceBranchId: string | undefined,
  targetBranchId: string | undefined
): UseBranchComparisonResult {
  const source = useMemo(() => {
    if (!sourceBranchId) return null;
    return getBranchById(sourceBranchId) || null;
  }, [sourceBranchId]);
  
  const target = useMemo(() => {
    if (!targetBranchId) return null;
    return getBranchById(targetBranchId) || null;
  }, [targetBranchId]);
  
  // Find common ancestor
  const commonAncestor = useMemo(() => {
    if (!source || !target) return null;
    
    const sourceHierarchy = getBranchHierarchy(source.id);
    const targetHierarchy = getBranchHierarchy(target.id);
    
    // Find first common branch in hierarchies
    for (const sBranch of sourceHierarchy) {
      for (const tBranch of targetHierarchy) {
        if (sBranch.id === tBranch.id) {
          return sBranch;
        }
      }
    }
    
    return null;
  }, [source, target]);
  
  return {
    source,
    target,
    aheadBy: source?.aheadBy || 0,
    behindBy: source?.behindBy || 0,
    diverged: (source?.aheadBy || 0) > 0 && (source?.behindBy || 0) > 0,
    commonAncestor,
  };
}
