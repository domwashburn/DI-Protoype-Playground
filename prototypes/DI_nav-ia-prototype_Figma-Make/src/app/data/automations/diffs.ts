/**
 * Diff Calculation Utilities
 * 
 * This module provides utilities for calculating differences between versions,
 * comparing branches, and detecting conflicts for merge operations.
 * 
 * Features:
 * - Deep object comparison
 * - Visual diff generation
 * - Conflict detection
 * - Merge simulation
 */

import type { Version, Diff, DiffChange, Conflict, Change, ChangeType, CompareOptions } from './branches-types';
import { getVersionById } from './versions-data';

// ============================================================================
// DIFF CALCULATION
// ============================================================================

/**
 * Calculate diff between two versions
 */
export function calculateDiff(
  fromVersionId: string,
  toVersionId: string,
  options?: CompareOptions
): Diff | null {
  const fromVersion = getVersionById(fromVersionId);
  const toVersion = getVersionById(toVersionId);
  
  if (!fromVersion || !toVersion) {
    return null;
  }
  
  const changes = compareObjects(
    fromVersion.snapshot,
    toVersion.snapshot,
    '',
    options
  );
  
  return {
    fromVersionId,
    toVersionId,
    totalChanges: changes.length,
    additions: changes.filter(c => c.changeType === 'added').length,
    modifications: changes.filter(c => c.changeType === 'modified').length,
    deletions: changes.filter(c => c.changeType === 'removed').length,
    changes,
    hasConflicts: false,
    conflicts: [],
  };
}

/**
 * Compare two objects and return changes
 */
function compareObjects(
  oldObj: any,
  newObj: any,
  path: string = '',
  options?: CompareOptions
): DiffChange[] {
  const changes: DiffChange[] = [];
  
  // Handle null/undefined
  if (oldObj === null || oldObj === undefined) {
    if (newObj !== null && newObj !== undefined) {
      changes.push({
        path,
        changeType: 'added',
        newValue: newObj,
        context: `Added ${path || 'root'}`,
      });
    }
    return changes;
  }
  
  if (newObj === null || newObj === undefined) {
    changes.push({
      path,
      changeType: 'removed',
      oldValue: oldObj,
      context: `Removed ${path || 'root'}`,
    });
    return changes;
  }
  
  // Handle primitives
  if (typeof oldObj !== 'object' || typeof newObj !== 'object') {
    if (oldObj !== newObj) {
      changes.push({
        path,
        changeType: 'modified',
        oldValue: oldObj,
        newValue: newObj,
        context: `Modified ${path}`,
      });
    }
    return changes;
  }
  
  // Handle arrays
  if (Array.isArray(oldObj) && Array.isArray(newObj)) {
    return compareArrays(oldObj, newObj, path, options);
  }
  
  // Handle objects
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
  
  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    const oldValue = oldObj[key];
    const newValue = newObj[key];
    
    if (!(key in oldObj)) {
      changes.push({
        path: newPath,
        changeType: 'added',
        newValue,
        context: `Added field ${key}`,
      });
    } else if (!(key in newObj)) {
      changes.push({
        path: newPath,
        changeType: 'removed',
        oldValue,
        context: `Removed field ${key}`,
      });
    } else {
      const subChanges = compareObjects(oldValue, newValue, newPath, options);
      changes.push(...subChanges);
    }
  }
  
  return changes;
}

/**
 * Compare two arrays
 */
function compareArrays(
  oldArr: any[],
  newArr: any[],
  path: string,
  options?: CompareOptions
): DiffChange[] {
  const changes: DiffChange[] = [];
  
  // Simple comparison - could be enhanced with LCS algorithm
  const maxLength = Math.max(oldArr.length, newArr.length);
  
  for (let i = 0; i < maxLength; i++) {
    const newPath = `${path}[${i}]`;
    
    if (i >= oldArr.length) {
      changes.push({
        path: newPath,
        changeType: 'added',
        newValue: newArr[i],
        context: `Added array item at index ${i}`,
      });
    } else if (i >= newArr.length) {
      changes.push({
        path: newPath,
        changeType: 'removed',
        oldValue: oldArr[i],
        context: `Removed array item at index ${i}`,
      });
    } else {
      const subChanges = compareObjects(oldArr[i], newArr[i], newPath, options);
      changes.push(...subChanges);
    }
  }
  
  return changes;
}

// ============================================================================
// VISUAL DIFF
// ============================================================================

/**
 * Generate visual diff lines for display
 */
export function generateVisualDiff(change: DiffChange): {
  oldLines: string[];
  newLines: string[];
} {
  const oldLines: string[] = [];
  const newLines: string[] = [];
  
  switch (change.changeType) {
    case 'added':
      newLines.push(`+ ${change.path}: ${formatValue(change.newValue)}`);
      break;
      
    case 'removed':
      oldLines.push(`- ${change.path}: ${formatValue(change.oldValue)}`);
      break;
      
    case 'modified':
      oldLines.push(`- ${change.path}: ${formatValue(change.oldValue)}`);
      newLines.push(`+ ${change.path}: ${formatValue(change.newValue)}`);
      break;
  }
  
  return { oldLines, newLines };
}

/**
 * Format value for display
 */
function formatValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

// ============================================================================
// CONFLICT DETECTION
// ============================================================================

/**
 * Detect conflicts between two branches
 * Simulates a merge to find conflicts
 */
export function detectConflicts(
  baseBranchVersionId: string,
  sourceBranchVersionId: string,
  targetBranchVersionId: string
): Conflict[] {
  const baseVersion = getVersionById(baseBranchVersionId);
  const sourceVersion = getVersionById(sourceBranchVersionId);
  const targetVersion = getVersionById(targetBranchVersionId);
  
  if (!baseVersion || !sourceVersion || !targetVersion) {
    return [];
  }
  
  const conflicts: Conflict[] = [];
  
  // Compare base -> source and base -> target
  const sourceChanges = compareObjects(baseVersion.snapshot, sourceVersion.snapshot);
  const targetChanges = compareObjects(baseVersion.snapshot, targetVersion.snapshot);
  
  // Find overlapping changes (conflicts)
  const sourceChangesMap = new Map(sourceChanges.map(c => [c.path, c]));
  const targetChangesMap = new Map(targetChanges.map(c => [c.path, c]));
  
  // Check for conflicts
  for (const [path, sourceChange] of sourceChangesMap) {
    const targetChange = targetChangesMap.get(path);
    
    if (targetChange) {
      // Both branches modified the same path
      const conflict = createConflict(
        path,
        baseVersion.snapshot,
        sourceChange,
        targetChange
      );
      
      if (conflict) {
        conflicts.push(conflict);
      }
    }
  }
  
  return conflicts;
}

/**
 * Create a conflict object
 */
function createConflict(
  path: string,
  baseSnapshot: any,
  sourceChange: DiffChange,
  targetChange: DiffChange
): Conflict | null {
  const baseValue = getValueAtPath(baseSnapshot, path);
  
  // Determine conflict type
  let conflictType: Conflict['conflictType'];
  
  if (sourceChange.changeType === 'removed' && targetChange.changeType === 'modified') {
    conflictType = 'deleted-modified';
  } else if (sourceChange.changeType === 'modified' && targetChange.changeType === 'removed') {
    conflictType = 'deleted-modified';
  } else if (sourceChange.changeType === 'added' && targetChange.changeType === 'added') {
    conflictType = 'added-added';
  } else if (sourceChange.changeType === 'modified' && targetChange.changeType === 'modified') {
    conflictType = 'both-modified';
  } else {
    // No conflict
    return null;
  }
  
  return {
    path,
    baseValue,
    currentValue: sourceChange.newValue !== undefined ? sourceChange.newValue : sourceChange.oldValue,
    incomingValue: targetChange.newValue !== undefined ? targetChange.newValue : targetChange.oldValue,
    conflictType,
  };
}

/**
 * Get value at JSON path
 */
function getValueAtPath(obj: any, path: string): any {
  if (!path) return obj;
  
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    // Handle array indices
    const match = part.match(/^(.+)\[(\d+)\]$/);
    if (match) {
      const [, key, index] = match;
      current = current[key];
      if (Array.isArray(current)) {
        current = current[parseInt(index, 10)];
      }
    } else {
      current = current[part];
    }
    
    if (current === undefined) {
      return undefined;
    }
  }
  
  return current;
}

// ============================================================================
// MERGE SIMULATION
// ============================================================================

/**
 * Simulate a merge between branches
 * Returns what the result would be and any conflicts
 */
export function simulateMerge(
  sourceBranchVersionId: string,
  targetBranchVersionId: string,
  baseBranchVersionId?: string
): {
  canMerge: boolean;
  conflicts: Conflict[];
  previewSnapshot: any;
  changes: DiffChange[];
} {
  const sourceVersion = getVersionById(sourceBranchVersionId);
  const targetVersion = getVersionById(targetBranchVersionId);
  
  if (!sourceVersion || !targetVersion) {
    return {
      canMerge: false,
      conflicts: [],
      previewSnapshot: null,
      changes: [],
    };
  }
  
  // If no base provided, use target as base
  const baseVersionId = baseBranchVersionId || targetBranchVersionId;
  const conflicts = detectConflicts(baseVersionId, sourceBranchVersionId, targetBranchVersionId);
  
  // Calculate what changes would be applied
  const changes = compareObjects(targetVersion.snapshot, sourceVersion.snapshot);
  
  // Create preview snapshot (simple merge without conflict resolution)
  const previewSnapshot = JSON.parse(JSON.stringify(targetVersion.snapshot));
  
  // Apply non-conflicting changes
  for (const change of changes) {
    if (!conflicts.some(c => c.path === change.path)) {
      applyChange(previewSnapshot, change);
    }
  }
  
  return {
    canMerge: conflicts.length === 0,
    conflicts,
    previewSnapshot,
    changes,
  };
}

/**
 * Apply a change to an object
 */
function applyChange(obj: any, change: DiffChange): void {
  const parts = change.path.split('.');
  const lastPart = parts.pop();
  
  if (!lastPart) return;
  
  let current = obj;
  for (const part of parts) {
    const match = part.match(/^(.+)\[(\d+)\]$/);
    if (match) {
      const [, key, index] = match;
      current = current[key][parseInt(index, 10)];
    } else {
      if (!(part in current)) {
        current[part] = {};
      }
      current = current[part];
    }
  }
  
  switch (change.changeType) {
    case 'added':
    case 'modified':
      current[lastPart] = change.newValue;
      break;
    case 'removed':
      delete current[lastPart];
      break;
  }
}

// ============================================================================
// DIFF UTILITIES
// ============================================================================

/**
 * Get diff summary as human-readable text
 */
export function getDiffSummary(diff: Diff): string {
  const parts: string[] = [];
  
  if (diff.additions > 0) {
    parts.push(`${diff.additions} addition${diff.additions > 1 ? 's' : ''}`);
  }
  if (diff.modifications > 0) {
    parts.push(`${diff.modifications} modification${diff.modifications > 1 ? 's' : ''}`);
  }
  if (diff.deletions > 0) {
    parts.push(`${diff.deletions} deletion${diff.deletions > 1 ? 's' : ''}`);
  }
  
  if (parts.length === 0) {
    return 'No changes';
  }
  
  return parts.join(', ');
}

/**
 * Check if two versions are identical
 */
export function areVersionsIdentical(versionId1: string, versionId2: string): boolean {
  const diff = calculateDiff(versionId1, versionId2);
  return diff ? diff.totalChanges === 0 : false;
}

/**
 * Get changed paths from diff
 */
export function getChangedPaths(diff: Diff): string[] {
  return diff.changes.map(c => c.path);
}

/**
 * Filter diff by path pattern
 */
export function filterDiffByPath(diff: Diff, pattern: RegExp): DiffChange[] {
  return diff.changes.filter(c => pattern.test(c.path));
}

/**
 * Group changes by change type
 */
export function groupChangesByType(changes: DiffChange[]): {
  added: DiffChange[];
  modified: DiffChange[];
  removed: DiffChange[];
} {
  return {
    added: changes.filter(c => c.changeType === 'added'),
    modified: changes.filter(c => c.changeType === 'modified'),
    removed: changes.filter(c => c.changeType === 'removed'),
  };
}
