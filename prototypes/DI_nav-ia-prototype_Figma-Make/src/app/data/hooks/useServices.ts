/**
 * useServices Hook
 * 
 * React hook for accessing and filtering decision services.
 * Provides memoized results for performance.
 * 
 * @example
 * ```typescript
 * const { services } = useServices({
 *   filter: { automationId: 'automation-6-24-20' }
 * });
 * ```
 */

import { useMemo } from 'react';
import {
  getServices,
  getServiceById as getServiceByIdLookup,
  getServicesByAutomationId,
  sortServices,
  type ServiceFilter,
  type SortOptions,
  type DecisionService,
} from '../automations';

export interface UseServicesOptions {
  filter?: ServiceFilter;
  sort?: SortOptions;
  automationId?: string; // Convenience prop for filtering by automation
}

export interface UseServicesResult {
  services: DecisionService[];
  getServiceById: (id: string) => DecisionService | undefined;
  isLoading: boolean;
  error: Error | null;
  count: number;
}

/**
 * Hook to get filtered and sorted services
 */
export function useServices(options?: UseServicesOptions): UseServicesResult {
  const { filter, sort, automationId } = options || {};
  
  const services = useMemo(() => {
    // If automationId provided, use optimized lookup
    if (automationId) {
      let results = getServicesByAutomationId(automationId);
      
      // Apply additional filters if provided
      if (filter) {
        const { automationId: _, ...otherFilters } = filter;
        if (Object.keys(otherFilters).length > 0) {
          results = getServices({ ...otherFilters, automationId });
        }
      }
      
      if (sort) {
        results = sortServices(results, sort);
      }
      
      return results;
    }
    
    // Otherwise use general filter
    let results = getServices(filter);
    
    if (sort) {
      results = sortServices(results, sort);
    }
    
    return results;
  }, [filter, sort, automationId]);
  
  return {
    services,
    getServiceById: getServiceByIdLookup,
    isLoading: false,
    error: null,
    count: services.length,
  };
}

/**
 * Hook to get a single service by ID
 */
export function useService(serviceId: string | undefined) {
  const { services } = useServices();
  
  const service = useMemo(() => {
    if (!serviceId) return null;
    return services.find(s => s.id === serviceId) || null;
  }, [serviceId, services]);
  
  return {
    service,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook to get service statistics
 */
export function useServiceStats(serviceId: string | undefined) {
  const { service } = useService(serviceId);
  
  const stats = useMemo(() => {
    if (!service) return null;
    
    const { getServiceStatistics } = require('../automations');
    return getServiceStatistics(service.id);
  }, [service]);
  
  return {
    stats,
    isLoading: false,
    error: null,
  };
}
