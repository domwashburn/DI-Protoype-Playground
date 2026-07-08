/**
 * useVersions Hook
 * 
 * React hooks for version history and comparisons.
 * 
 * Features:
 * - Get version history for entities
 * - Compare versions with diffs
 * - Track AI creation metadata
 * - Memoized results for performance
 * 
 * @example
 * ```typescript
 * const { versions, latest } = useVersionHistory('automation-6-24-20');
 * const { diff } = useVersionDiff('version-1', 'version-2');
 * const { aiMetadata } = useAIMetadata('automation-6-24-20');
 * ```
 */

import { useMemo } from 'react';
import type { Version, Diff, AIMetadata, VersionFilter, Change } from '../automations/branches-types';
import {
  getVersionById,
  getVersionsByEntityId,
  getVersionsByEntityAndBranch,
  getLatestVersion,
  getVersionHistory,
  getVersionBySemanticVersion,
  getVersionDifference,
  getAllChanges,
  getChangesByAuthor,
  getVersionStats,
} from '../automations/versions-data';
import {
  calculateDiff,
  simulateMerge,
  detectConflicts,
  getDiffSummary,
} from '../automations/diffs';

// ============================================================================
// USE VERSION HISTORY
// ============================================================================

export interface UseVersionHistoryOptions {
  entityId: string;
  branchId?: string;
  filter?: VersionFilter;
}

export interface UseVersionHistoryResult {
  versions: Version[];
  latest: Version | undefined;
  count: number;
  totalChanges: number;
  contributors: string[];
  firstVersion: Version | undefined;
}

/**
 * Get version history for an entity
 */
export function useVersionHistory(
  entityId: string,
  branchId?: string
): UseVersionHistoryResult {
  const versions = useMemo(() => {
    return getVersionHistory(entityId, branchId);
  }, [entityId, branchId]);
  
  const latest = useMemo(() => {
    return getLatestVersion(entityId, branchId);
  }, [entityId, branchId]);
  
  const stats = useMemo(() => {
    return getVersionStats(entityId, branchId);
  }, [entityId, branchId]);
  
  return {
    versions,
    latest,
    count: versions.length,
    totalChanges: stats.totalChanges,
    contributors: stats.contributors,
    firstVersion: stats.firstVersion,
  };
}

// ============================================================================
// USE VERSION
// ============================================================================

export interface UseVersionResult {
  version: Version | null;
  snapshot: any;
  changes: Change[];
  isLatest: boolean;
}

/**
 * Get a single version by ID
 */
export function useVersion(versionId: string | undefined): UseVersionResult {
  const version = useMemo(() => {
    if (!versionId) return null;
    return getVersionById(versionId) || null;
  }, [versionId]);
  
  const isLatest = useMemo(() => {
    if (!version) return false;
    const latest = getLatestVersion(version.entityId, version.branchId);
    return latest?.id === version.id;
  }, [version]);
  
  return {
    version,
    snapshot: version?.snapshot || null,
    changes: version?.changes || [],
    isLatest,
  };
}

/**
 * Get version by semantic version string
 */
export function useVersionByNumber(
  entityId: string,
  versionNumber: string,
  branchId: string = 'branch-main'
): UseVersionResult {
  const version = useMemo(() => {
    return getVersionBySemanticVersion(entityId, versionNumber, branchId) || null;
  }, [entityId, versionNumber, branchId]);
  
  const isLatest = useMemo(() => {
    if (!version) return false;
    const latest = getLatestVersion(version.entityId, version.branchId);
    return latest?.id === version.id;
  }, [version]);
  
  return {
    version,
    snapshot: version?.snapshot || null,
    changes: version?.changes || [],
    isLatest,
  };
}

// ============================================================================
// USE VERSION DIFF
// ============================================================================

export interface UseVersionDiffResult {
  diff: Diff | null;
  summary: string;
  hasChanges: boolean;
  changesCount: number;
}

/**
 * Compare two versions and get diff
 */
export function useVersionDiff(
  fromVersionId: string | undefined,
  toVersionId: string | undefined
): UseVersionDiffResult {
  const diff = useMemo(() => {
    if (!fromVersionId || !toVersionId) return null;
    return calculateDiff(fromVersionId, toVersionId);
  }, [fromVersionId, toVersionId]);
  
  const summary = useMemo(() => {
    if (!diff) return 'No comparison';
    return getDiffSummary(diff);
  }, [diff]);
  
  return {
    diff,
    summary,
    hasChanges: (diff?.totalChanges || 0) > 0,
    changesCount: diff?.totalChanges || 0,
  };
}

// ============================================================================
// USE CHANGES
// ============================================================================

export interface UseChangesResult {
  changes: Change[];
  byAuthor: Map<string, Change[]>;
  count: number;
  recentChanges: Change[];
}

/**
 * Get all changes for an entity
 */
export function useChanges(
  entityId: string,
  branchId?: string
): UseChangesResult {
  const changes = useMemo(() => {
    return getAllChanges(entityId, branchId);
  }, [entityId, branchId]);
  
  const byAuthor = useMemo(() => {
    const map = new Map<string, Change[]>();
    changes.forEach(change => {
      const authorChanges = map.get(change.author) || [];
      authorChanges.push(change);
      map.set(change.author, authorChanges);
    });
    return map;
  }, [changes]);
  
  const recentChanges = useMemo(() => {
    return changes.slice(-10); // Last 10 changes
  }, [changes]);
  
  return {
    changes,
    byAuthor,
    count: changes.length,
    recentChanges,
  };
}

/**
 * Get changes by a specific author
 */
export function useChangesByAuthor(
  entityId: string,
  author: string
): Change[] {
  return useMemo(() => {
    return getChangesByAuthor(entityId, author);
  }, [entityId, author]);
}

// ============================================================================
// USE MERGE SIMULATION
// ============================================================================

export interface UseMergeSimulationResult {
  canMerge: boolean;
  conflicts: any[];
  conflictCount: number;
  previewSnapshot: any;
  changes: any[];
}

/**
 * Simulate a merge between branches
 */
export function useMergeSimulation(
  sourceBranchVersionId: string | undefined,
  targetBranchVersionId: string | undefined,
  baseBranchVersionId?: string
): UseMergeSimulationResult {
  const result = useMemo(() => {
    if (!sourceBranchVersionId || !targetBranchVersionId) {
      return {
        canMerge: false,
        conflicts: [],
        conflictCount: 0,
        previewSnapshot: null,
        changes: [],
      };
    }
    
    return simulateMerge(sourceBranchVersionId, targetBranchVersionId, baseBranchVersionId);
  }, [sourceBranchVersionId, targetBranchVersionId, baseBranchVersionId]);
  
  return {
    ...result,
    conflictCount: result.conflicts.length,
  };
}

// ============================================================================
// USE AI METADATA
// ============================================================================

export interface UseAIMetadataResult {
  aiMetadata: AIMetadata | null;
  isAIGenerated: boolean;
  creationMethod: string;
  hasUserModifications: boolean;
}

/**
 * Get AI creation metadata for an entity
 */
export function useAIMetadata(
  entityId: string,
  branchId: string = 'branch-main'
): UseAIMetadataResult {
  const firstVersion = useMemo(() => {
    const history = getVersionHistory(entityId, branchId);
    return history[0];
  }, [entityId, branchId]);
  
  const aiMetadata = useMemo(() => {
    // In a real implementation, this would be stored with the entity
    // For now, we can infer from the first version
    if (!firstVersion) return null;
    
    if (firstVersion.author === 'Decision Assistant') {
      return {
        creationMethod: 'ai-generated' as const,
        aiModel: 'gpt-4',
        generatedAt: firstVersion.timestamp,
      };
    }
    
    return null;
  }, [firstVersion]);
  
  return {
    aiMetadata,
    isAIGenerated: aiMetadata?.creationMethod === 'ai-generated' || false,
    creationMethod: aiMetadata?.creationMethod || 'manual',
    hasUserModifications: false, // Would check subsequent versions
  };
}

// ============================================================================
// USE VERSION STATS
// ============================================================================

export interface UseVersionStatsResult {
  totalVersions: number;
  totalChanges: number;
  contributors: string[];
  averageChangesPerVersion: number;
  firstVersion: Version | undefined;
  latestVersion: Version | undefined;
}

/**
 * Get statistics about version history
 */
export function useVersionStats(
  entityId: string,
  branchId?: string
): UseVersionStatsResult {
  const stats = useMemo(() => {
    return getVersionStats(entityId, branchId);
  }, [entityId, branchId]);
  
  const averageChangesPerVersion = useMemo(() => {
    if (stats.totalVersions === 0) return 0;
    return stats.totalChanges / stats.totalVersions;
  }, [stats]);
  
  return {
    ...stats,
    averageChangesPerVersion,
  };
}

// ============================================================================
// USE LATEST SNAPSHOT
// ============================================================================

/**
 * Get the latest snapshot of an entity
 * Useful for displaying current state
 */
export function useLatestSnapshot(
  entityId: string,
  branchId: string = 'branch-main'
): any {
  return useMemo(() => {
    const latest = getLatestVersion(entityId, branchId);
    return latest?.snapshot || null;
  }, [entityId, branchId]);
}

// ============================================================================
// USE VERSION TIMELINE
// ============================================================================

export interface TimelineEntry {
  version: Version;
  timestamp: string;
  author: string;
  message: string;
  changesCount: number;
  type: 'commit' | 'merge' | 'tag';
}

/**
 * Get a timeline view of version history
 * Useful for displaying in UI
 */
export function useVersionTimeline(
  entityId: string,
  branchId?: string
): TimelineEntry[] {
  return useMemo(() => {
    const versions = getVersionHistory(entityId, branchId);
    
    return versions.map(version => ({
      version,
      timestamp: version.timestamp,
      author: version.author,
      message: version.message,
      changesCount: version.changes.length,
      type: (version.parentVersionIds.length > 1 ? 'merge' : 'commit') as 'commit' | 'merge',
    }));
  }, [entityId, branchId]);
}
