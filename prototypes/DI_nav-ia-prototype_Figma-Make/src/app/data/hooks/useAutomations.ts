/**
 * useAutomations Hook
 * 
 * React hook for accessing and filtering decision automations.
 * Provides memoized results for performance.
 * 
 * @example
 * ```typescript
 * const { automations, isLoading } = useAutomations({
 *   status: 'deployed',
 *   search: 'credit',
 * });
 * ```
 */

import { useMemo } from 'react';
import {
  getAutomations,
  getAutomationById as getAutomationByIdLookup,
  sortAutomations,
  type AutomationFilter,
  type SortOptions,
  type DecisionAutomation,
} from '../automations';

export interface UseAutomationsOptions {
  filter?: AutomationFilter;
  sort?: SortOptions;
}

export interface UseAutomationsResult {
  automations: DecisionAutomation[];
  getAutomationById: (id: string) => DecisionAutomation | undefined;
  isLoading: boolean;
  error: Error | null;
  count: number;
}

/**
 * Hook to get filtered and sorted automations
 */
export function useAutomations(options?: UseAutomationsOptions): UseAutomationsResult {
  const { filter, sort } = options || {};
  
  const automations = useMemo(() => {
    let results = getAutomations(filter);
    
    if (sort) {
      results = sortAutomations(results, sort);
    }
    
    return results;
  }, [filter, sort]);
  
  return {
    automations,
    getAutomationById: getAutomationByIdLookup,
    isLoading: false, // In a real app, this would track async data loading
    error: null,
    count: automations.length,
  };
}

/**
 * Hook to get a single automation by ID
 */
export function useAutomation(automationId: string | undefined) {
  const { automations } = useAutomations();
  
  const automation = useMemo(() => {
    if (!automationId) return null;
    return automations.find(a => a.id === automationId) || null;
  }, [automationId, automations]);
  
  return {
    automation,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook to get automation statistics
 */
export function useAutomationStats(automationId: string | undefined) {
  const { automation } = useAutomation(automationId);
  
  const stats = useMemo(() => {
    if (!automation) return null;
    
    // Import here to avoid circular dependencies
    const { getAutomationStatistics } = require('../automations');
    return getAutomationStatistics(automation.id);
  }, [automation]);
  
  return {
    stats,
    isLoading: false,
    error: null,
  };
}
