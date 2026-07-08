/**
 * Strategic Goals React Hooks
 * 
 * Custom hooks for accessing and filtering strategic goals data.
 */

import { useMemo } from 'react';
import { strategicGoals } from '../objectives/goals';
import type { StrategicGoal, GoalFilter, GoalSort } from '../objectives/types';

/**
 * Hook options
 */
export interface UseGoalsOptions {
  filter?: GoalFilter;
  sort?: GoalSort;
}

/**
 * Get all goals with optional filtering and sorting
 */
export function useGoals(options?: UseGoalsOptions) {
  const filtered = useMemo(() => {
    return filterGoals(strategicGoals, options?.filter);
  }, [options?.filter]);

  const sorted = useMemo(() => {
    return sortGoals(filtered, options?.sort);
  }, [filtered, options?.sort]);

  const stats = useMemo(() => {
    return {
      total: sorted.length,
      onTrack: sorted.filter(g => g.status === 'on-track').length,
      atRisk: sorted.filter(g => g.status === 'at-risk').length,
      active: sorted.filter(g => g.status === 'active').length,
      achieved: sorted.filter(g => g.status === 'achieved').length,
      critical: sorted.filter(g => g.priority === 'critical').length,
      high: sorted.filter(g => g.priority === 'high').length,
      avgProgress: sorted.length > 0 
        ? Math.round(sorted.reduce((sum, g) => sum + g.progress, 0) / sorted.length)
        : 0,
    };
  }, [sorted]);

  return {
    goals: sorted,
    count: sorted.length,
    ...stats,
  };
}

/**
 * Get single goal by ID
 */
export function useGoal(id: string) {
  const goal = useMemo(() => {
    return strategicGoals.find(g => g.id === id);
  }, [id]);

  return {
    goal,
    isLoading: false,
    error: goal ? null : new Error(`Goal ${id} not found`),
  };
}

/**
 * Get goals by status
 */
export function useGoalsByStatus(status: StrategicGoal['status']) {
  const filtered = useMemo(() => {
    return strategicGoals.filter(g => g.status === status);
  }, [status]);

  return {
    goals: filtered,
    count: filtered.length,
  };
}

/**
 * Get goals by priority
 */
export function useGoalsByPriority(priority: StrategicGoal['priority']) {
  const filtered = useMemo(() => {
    return strategicGoals.filter(g => g.priority === priority);
  }, [priority]);

  return {
    goals: filtered,
    count: filtered.length,
  };
}

/**
 * Get goals by owner
 */
export function useGoalsByOwner(ownerEmail: string) {
  const filtered = useMemo(() => {
    return strategicGoals.filter(g => g.ownerEmail === ownerEmail);
  }, [ownerEmail]);

  return {
    goals: filtered,
    count: filtered.length,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function filterGoals(
  goals: StrategicGoal[],
  filter?: GoalFilter
): StrategicGoal[] {
  if (!filter) return goals;

  return goals.filter(goal => {
    // Status filter
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      if (!statuses.includes(goal.status)) return false;
    }

    // Priority filter
    if (filter.priority) {
      const priorities = Array.isArray(filter.priority) ? filter.priority : [filter.priority];
      if (!priorities.includes(goal.priority)) return false;
    }

    // Impact area filter
    if (filter.impactArea) {
      const areas = Array.isArray(filter.impactArea) ? filter.impactArea : [filter.impactArea];
      if (!areas.includes(goal.impactArea)) return false;
    }

    // Owner filter
    if (filter.owner && goal.owner !== filter.owner) return false;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const nameMatch = goal.name.toLowerCase().includes(searchLower);
      const descMatch = goal.description.toLowerCase().includes(searchLower);
      if (!nameMatch && !descMatch) return false;
    }

    return true;
  });
}

function sortGoals(
  goals: StrategicGoal[],
  sort?: GoalSort
): StrategicGoal[] {
  if (!sort) {
    // Default sort: by priority then progress
    return [...goals].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.progress - a.progress;
    });
  }

  return [...goals].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'priority':
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case 'progress':
        aValue = a.progress;
        bValue = b.progress;
        break;
      case 'impactArea':
        aValue = a.impactArea;
        bValue = b.impactArea;
        break;
      case 'startDate':
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
        break;
      case 'targetDate':
        aValue = new Date(a.targetDate).getTime();
        bValue = new Date(b.targetDate).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}
