/**
 * Business Objectives React Hooks
 * 
 * Custom hooks for accessing and filtering objectives, goals, and related data.
 */

import { useMemo } from 'react';
import { businessObjectives } from '../objectives/objectives';
import type { BusinessObjective, ObjectiveFilter, ObjectiveSort } from '../objectives/types';

/**
 * Hook options
 */
export interface UseObjectivesOptions {
  filter?: ObjectiveFilter;
  sort?: ObjectiveSort;
}

/**
 * Get all objectives with optional filtering and sorting
 */
export function useObjectives(options?: UseObjectivesOptions) {
  const filtered = useMemo(() => {
    return filterObjectives(businessObjectives, options?.filter);
  }, [options?.filter]);

  const sorted = useMemo(() => {
    return sortObjectives(filtered, options?.sort);
  }, [filtered, options?.sort]);

  const stats = useMemo(() => {
    return {
      total: sorted.length,
      onTrack: sorted.filter(o => o.status === 'on-track').length,
      atRisk: sorted.filter(o => o.status === 'at-risk').length,
      active: sorted.filter(o => o.status === 'active').length,
      achieved: sorted.filter(o => o.status === 'achieved').length,
      critical: sorted.filter(o => o.priority === 'critical').length,
      high: sorted.filter(o => o.priority === 'high').length,
      avgProgress: sorted.length > 0 
        ? Math.round(sorted.reduce((sum, o) => sum + o.progress, 0) / sorted.length)
        : 0,
    };
  }, [sorted]);

  return {
    objectives: sorted,
    count: sorted.length,
    ...stats,
  };
}

/**
 * Get single objective by ID
 */
export function useObjective(id: string) {
  const objective = useMemo(() => {
    return businessObjectives.find(o => o.id === id);
  }, [id]);

  return {
    objective,
    isLoading: false,
    error: objective ? null : new Error(`Objective ${id} not found`),
  };
}

/**
 * Get objectives by goal ID
 */
export function useObjectivesByGoal(goalId: string) {
  const filtered = useMemo(() => {
    return businessObjectives.filter(o => o.goalId === goalId);
  }, [goalId]);

  const stats = useMemo(() => {
    return {
      total: filtered.length,
      avgProgress: filtered.length > 0
        ? Math.round(filtered.reduce((sum, o) => sum + o.progress, 0) / filtered.length)
        : 0,
    };
  }, [filtered]);

  return {
    objectives: filtered,
    count: filtered.length,
    ...stats,
  };
}

/**
 * Get objectives by automation ID
 */
export function useObjectivesByAutomation(automationId: string) {
  const filtered = useMemo(() => {
    return businessObjectives.filter(o => 
      o.automationIds.includes(automationId)
    );
  }, [automationId]);

  return {
    objectives: filtered,
    count: filtered.length,
  };
}

/**
 * Get objectives by category
 */
export function useObjectivesByCategory(category: BusinessObjective['category']) {
  const filtered = useMemo(() => {
    return businessObjectives.filter(o => o.category === category);
  }, [category]);

  return {
    objectives: filtered,
    count: filtered.length,
  };
}

/**
 * Get objectives by owner
 */
export function useObjectivesByOwner(ownerEmail: string) {
  const filtered = useMemo(() => {
    return businessObjectives.filter(o => o.ownerEmail === ownerEmail);
  }, [ownerEmail]);

  return {
    objectives: filtered,
    count: filtered.length,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function filterObjectives(
  objectives: BusinessObjective[],
  filter?: ObjectiveFilter
): BusinessObjective[] {
  if (!filter) return objectives;

  return objectives.filter(objective => {
    // Goal filter
    if (filter.goalId && objective.goalId !== filter.goalId) return false;

    // Status filter
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      if (!statuses.includes(objective.status)) return false;
    }

    // Priority filter
    if (filter.priority) {
      const priorities = Array.isArray(filter.priority) ? filter.priority : [filter.priority];
      if (!priorities.includes(objective.priority)) return false;
    }

    // Category filter
    if (filter.category) {
      const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
      if (!categories.includes(objective.category)) return false;
    }

    // Owner filter
    if (filter.owner && objective.owner !== filter.owner) return false;
    if (filter.team && objective.team !== filter.team) return false;

    // Automation filter
    if (filter.automationId && !objective.automationIds.includes(filter.automationId)) return false;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const nameMatch = objective.name.toLowerCase().includes(searchLower);
      const descMatch = objective.description.toLowerCase().includes(searchLower);
      if (!nameMatch && !descMatch) return false;
    }

    return true;
  });
}

function sortObjectives(
  objectives: BusinessObjective[],
  sort?: ObjectiveSort
): BusinessObjective[] {
  if (!sort) {
    // Default sort: by priority then progress
    return [...objectives].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.progress - a.progress;
    });
  }

  return [...objectives].sort((a, b) => {
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
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'startDate':
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
        break;
      case 'targetDate':
        aValue = new Date(a.targetDate).getTime();
        bValue = new Date(b.targetDate).getTime();
        break;
      case 'lastUpdatedDate':
        aValue = new Date(a.lastUpdatedDate).getTime();
        bValue = new Date(b.lastUpdatedDate).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}
