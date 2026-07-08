/**
 * Decision Automations Data Layer - Main Export
 * 
 * This is the single entry point for all automation, service, and asset data.
 * 
 * ## Architecture Overview
 * 
 * The data layer is organized into:
 * - **Types** (`types.ts`): TypeScript interfaces and types
 * - **Automations** (`automations.ts`): Top-level automation data
 * - **Services** (`services.ts`): Service data (belong to automations)
 * - **Assets** (`assets.ts`, `assets-extended.ts`, `assets-sub.ts`): Asset data (belong to services)
 * - **Lookups** (`lookups.ts`): Query and filter utilities
 * 
 * ## Design Principles
 * 
 * 1. **Normalized Data**: Entities reference each other by ID, not by embedding
 * 2. **Type Safety**: Full TypeScript coverage with discriminated unions
 * 3. **Extensible**: Easy to add new asset types or entity properties
 * 4. **Performant**: Efficient lookups with optional memoization
 * 5. **Single Source of Truth**: All data lives in one place
 * 
 * ## Usage Examples
 * 
 * ```typescript
 * import {
 *   getAutomations,
 *   getServicesByAutomationId,
 *   getAllAssets,
 *   getTaskModelCounts,
 * } from '@/data/automations';
 * 
 * // Get all automations
 * const automations = getAutomations();
 * 
 * // Get filtered automations
 * const deployedAutomations = getAutomations({ status: 'deployed' });
 * 
 * // Get services for an automation
 * const services = getServicesByAutomationId('automation-6-24-20');
 * 
 * // Get all assets for a service
 * const assets = getAllAssets('service-credit-risk');
 * 
 * // Get task model counts for tabs
 * const counts = getTaskModelCounts('asset-credit-tm-001');
 * // Returns: { artifacts: 3, functions: 8, ruleflows: 2, errors: 3, dependencies: 2 }
 * ```
 * 
 * ## Using with React Hooks
 * 
 * For React integration, see `/data/hooks/` for custom hooks that wrap
 * these functions with proper state management and memoization.
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Core entity types
  DecisionAutomation,
  DecisionService,
  Asset,
  
  // Specific asset types
  TaskModelAsset,
  DecisionModelAsset,
  RuleModelAsset,
  MLModelAsset,
  RuleflowAsset,
  FunctionAsset,
  PolicyAsset,
  DashboardAsset,
  DataModelAsset,
  
  // Supporting types
  Status,
  AssetType,
  Tag,
  BaseMetadata,
  
  // Task model specific
  TaskDefinition,
  WorkflowDefinition,
  WorkflowNode,
  WorkflowEdge,
  FunctionParameter,
  DashboardWidget,
  
  // Filter types
  AutomationFilter,
  ServiceFilter,
  AssetFilter,
  SortOptions,
  
  // Statistics types
  AssetCounts,
  ServiceStatistics,
  AutomationStatistics,
} from './types';

// Branching and versioning types
export type {
  Branch,
  BranchType,
  BranchStatus,
  ProtectionLevel,
  Version,
  Change,
  ChangeType,
  Diff,
  DiffChange,
  Conflict,
  ConflictType,
  AIMetadata,
  CreationMethod,
  SemanticVersion,
  MergeRequest,
  MergeStatus,
  BranchFilter,
  VersionFilter,
  CompareOptions,
  DeploymentEnvironment,
  DeploymentInfo,
} from './branches-types';

// Environment configuration types
export type {
  EnvironmentConfig,
} from './environments-data';

// ============================================================================
// DATA EXPORTS
// ============================================================================

// Raw data arrays (use with caution - prefer lookup functions)
export { allAutomations as decisionAutomations } from './registry';
export { allServices as decisionServices } from './registry';
export { commonTags } from './shared/tags';
export { serviceTags } from './shared/tags';

// ============================================================================
// LOOKUP FUNCTION EXPORTS
// ============================================================================

// Automation lookups
export {
  getAutomations,
  getAutomationById,
  getAllAutomations,
  getAutomationStatistics,
  sortAutomations,
} from './lookups';

// Service lookups
export {
  getServices,
  getServiceById,
  getServicesByAutomationId,
  getAllServices,
  getServiceStatistics,
  sortServices,
} from './lookups';

// Asset lookups
export {
  getAssets,
  getAssetByIdComplete as getAssetById,
  getAllAssets,
  getSubAssetsComplete as getSubAssets,
  getAssetCounts,
  getTaskModels,
  getTaskModelCounts,
  sortAssets,
} from './lookups';

// Relationship helpers
export {
  getAssetHierarchy,
  getAssetBreadcrumb,
} from './lookups';

// ============================================================================
// BRANCH EXPORTS
// ============================================================================

export {
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
  isBranchAhead,
  isBranchBehind,
  branchNeedsUpdate,
} from './branches-data';

// ============================================================================
// VERSION EXPORTS
// ============================================================================

export {
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
  getUndeployedChanges,
} from './versions-data';

// ============================================================================
// DIFF EXPORTS
// ============================================================================

export {
  calculateDiff,
  generateVisualDiff,
  detectConflicts,
  simulateMerge,
  getDiffSummary,
  areVersionsIdentical,
  getChangedPaths,
  filterDiffByPath,
  groupChangesByType,
} from './diffs';

// ============================================================================
// ACTIVITY EXPORTS
// ============================================================================

export {
  getAllEvents,
  activityEvents,
  deploymentEvents,
  notificationEvents,
  recommendationEvents,
  alertEvents,
  systemUpdateEvents,
  getEventsByType,
  getEventsByDateRange,
  getRecentEvents,
  getDeploymentEventsForAutomation,
} from './activity-data';

// ============================================================================
// VERSION ASSET CHANGES EXPORTS
// ============================================================================

export type {
  AssetChange,
  ServiceChange,
  VersionAssetChanges,
} from './version-asset-changes';

export {
  versionAssetChanges,
  getVersionAssetChanges,
  getAllAssetChangesForEntity,
  getChangesByType,
  getChangeSummary,
} from './version-asset-changes';

// ============================================================================
// ENVIRONMENT EXPORTS
// ============================================================================

export {
  environments,
  getEnvironmentById,
  getEnvironmentByType,
  getActiveEnvironments,
  getEnvironmentsByPromotionOrder,
  getEnvironmentsForAutomation,
  getAutomationDeployment,
} from './environments-data';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Get all data for debugging or admin views
 */
export function getAllData() {
  return {
    automations: getAutomations(),
    services: getAllServices(),
    assets: getAssets(),
  };
}

/**
 * Search across all entities
 */
export function globalSearch(searchTerm: string) {
  const automations = getAutomations({ search: searchTerm });
  const services = getServices({ search: searchTerm });
  const assets = getAssets({ search: searchTerm });
  
  return {
    automations,
    services,
    assets,
    totalResults: automations.length + services.length + assets.length,
  };
}

// Re-export lookup functions for convenience
import {
  getAutomations,
  getAutomationById,
  getAllAutomations,
  getServices,
  getServiceById,
  getAllServices,
  getServicesByAutomationId,
  getAssets,
  getAssetByIdComplete,
  getAllAssets,
  getSubAssetsComplete,
  getTaskModelCounts,
} from './lookups';
