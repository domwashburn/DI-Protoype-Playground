/**
 * Business Objectives Data Layer - Main Export
 * 
 * Centralized exports for objectives, goals, key results, and metrics.
 */

// Types
export * from './types';

// Data
export { strategicGoals } from './goals';
export { businessObjectives } from './objectives';

// Lookup functions (to be created)
// export * from './lookups';

// Re-export for convenience
export type {
  StrategicGoal,
  BusinessObjective,
  KeyResult,
  Metric,
  GoalStatus,
  Priority,
  ObjectiveCategory,
  MetricType,
  MetricTrend,
  GoalFilter,
  ObjectiveFilter,
  KeyResultFilter,
  MetricFilter,
} from './types';
