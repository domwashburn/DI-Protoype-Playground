/**
 * React Hooks for Decision Automations Data Layer
 * 
 * This module exports custom React hooks that provide easy access to
 * automation, service, and asset data with proper memoization and state management.
 * 
 * ## Available Hooks
 * 
 * ### Automation Hooks
 * - `useAutomations()` - Get filtered/sorted automations
 * - `useAutomation(id)` - Get single automation by ID
 * - `useAutomationStats(id)` - Get automation statistics
 * 
 * ### Service Hooks
 * - `useServices()` - Get filtered/sorted services
 * - `useService(id)` - Get single service by ID
 * - `useServiceStats(id)` - Get service statistics
 * 
 * ### Asset Hooks
 * - `useAssets()` - Get filtered/sorted assets
 * - `useAsset(id)` - Get single asset by ID
 * - `useSubAssets(parentId)` - Get sub-assets for a parent
 * - `useServiceAssets(serviceId)` - Get all assets for a service
 * - `useTaskModelCounts(taskModelId)` - Get counts for task model tabs
 * - `useTaskModels(serviceId)` - Get task models for a service
 * 
 * ## Usage Examples
 * 
 * ```typescript
 * import {
 *   useAutomations,
 *   useServices,
 *   useServiceAssets,
 *   useTaskModelCounts,
 * } from '@/data/hooks';
 * 
 * function AutomationsList() {
 *   const { automations, count } = useAutomations({
 *     filter: { status: 'deployed' },
 *     sort: { field: 'lastUpdatedDate', direction: 'desc' },
 *   });
 *   
 *   return (
 *     <div>
 *       <h1>Automations ({count})</h1>
 *       {automations.map(auto => (
 *         <div key={auto.id}>{auto.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * function TaskModelPage({ taskModelId }: { taskModelId: string }) {
 *   const { counts } = useTaskModelCounts(taskModelId);
 *   
 *   return (
 *     <Tabs>
 *       <Tab>Artifacts ({counts.artifacts})</Tab>
 *       <Tab>Functions ({counts.functions})</Tab>
 *       <Tab>Error report ({counts.errors})</Tab>
 *       <Tab>Run</Tab>
 *       <Tab>Dependencies ({counts.dependencies})</Tab>
 *     </Tabs>
 *   );
 * }
 * ```
 * 
 * ## Performance
 * 
 * All hooks use `useMemo` to prevent unnecessary recalculations.
 * Results are only recomputed when filter, sort, or ID parameters change.
 * 
 * ## Future Enhancements
 * 
 * In a production environment, these hooks would:
 * - Fetch data from a backend API
 * - Handle loading and error states
 * - Implement caching with React Query or SWR
 * - Support real-time updates via WebSocket
 */

// Automation hooks
export {
  useAutomations,
  useAutomation,
  useAutomationStats,
  type UseAutomationsOptions,
  type UseAutomationsResult,
} from './useAutomations';

// Service hooks
export {
  useServices,
  useService,
  useServiceStats,
  type UseServicesOptions,
  type UseServicesResult,
} from './useServices';

// Asset hooks
export {
  useAssets,
  useAsset,
  useSubAssets,
  useServiceAssets,
  useTaskModelCounts,
  useTaskModels,
  type UseAssetsOptions,
  type UseAssetsResult,
} from './useAssets';

// Branch hooks
export {
  useBranches,
  useBranch,
  useBranchByName,
  useBranchStatus,
  useBranchHierarchy,
  useDefaultBranch,
  useBranchComparison,
  type UseBranchesOptions,
  type UseBranchesResult,
  type UseBranchResult,
  type UseBranchStatusResult,
} from './useBranches';

// Version hooks
export {
  useVersionHistory,
  useVersion,
  useVersionByNumber,
  useVersionDiff,
  useChanges,
  useChangesByAuthor,
  useMergeSimulation,
  useAIMetadata,
  useVersionStats,
  useLatestSnapshot,
  useVersionTimeline,
  type UseVersionHistoryResult,
  type UseVersionResult,
  type UseVersionDiffResult,
  type UseMergeSimulationResult,
  type UseAIMetadataResult,
} from './useVersions';

// Objectives hooks
export {
  useObjectives,
  useObjective,
  useObjectivesByGoal,
  useObjectivesByAutomation,
  useObjectivesByCategory,
  useObjectivesByOwner,
  type UseObjectivesOptions,
} from './useObjectives';

// Goals hooks
export {
  useGoals,
  useGoal,
  useGoalsByStatus,
  useGoalsByPriority,
  useGoalsByOwner,
  type UseGoalsOptions,
} from './useGoals';

// Conversation hooks
export {
  useConversations,
  useConversation,
  useConversationsByType,
  useConversationsByAutomation,
  usePinnedConversations,
  useFavoriteConversations,
  type UseConversationsOptions,
} from './useConversations';

// Message hooks
export {
  useMessages,
  useMessage,
  useConversationMessages,
  useMessagesByRole,
  useMessagesWithArtifacts,
  useMessagesWithAssetReferences,
  useMessageAssetReferences,
  useAssetReferences,
  type UseMessagesOptions,
} from './useMessages';

// Automation Relationship hooks (bidirectional linking)
export {
  useAutomationObjectives,
  useAutomationObjectiveStats,
  useAutomationSourceChat,
  useAutomationAIStatus,
  useAutomationObjectivesBatch,
  useAutomationChatsBatch,
} from './useAutomationRelationships';

// Activity hooks
export {
  useActivity,
  useActivityByType,
  useRecentActivity,
  useActivityByDateRange,
  useUnreadCounts,
  type UseActivityResult,
  type UseActivityByTypeResult,
  type UseRecentActivityResult,
  type UseActivityByDateRangeResult,
  type UseUnreadCountsResult,
} from './useActivity';

// Recent Automations hooks (localStorage-based tracking)
export {
  useRecentAutomations,
  type RecentAutomation,
} from './useRecentAutomations';

// Pinned Automations hooks (localStorage-based tracking)
export {
  usePinnedAutomations,
  type PinnedAutomation,
} from './usePinnedAutomations';