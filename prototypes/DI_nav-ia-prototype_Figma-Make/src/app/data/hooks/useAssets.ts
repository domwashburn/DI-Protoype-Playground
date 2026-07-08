/**
 * useAssets Hook
 * 
 * React hook for accessing and filtering assets.
 * Provides memoized results for performance.
 * 
 * @example
 * ```typescript
 * const { assets } = useAssets({
 *   filter: { serviceId: 'service-credit-risk', type: 'task-model' }
 * });
 * ```
 */

import { useMemo } from 'react';
import {
  getAssets,
  getAllAssets,
  getSubAssets,
  getTaskModelCounts,
  sortAssets,
  type AssetFilter,
  type SortOptions,
  type Asset,
} from '../automations';

export interface UseAssetsOptions {
  filter?: AssetFilter;
  sort?: SortOptions;
  serviceId?: string; // Convenience prop
  parentAssetId?: string; // Convenience prop for sub-assets
}

export interface UseAssetsResult {
  assets: Asset[];
  isLoading: boolean;
  error: Error | null;
  count: number;
}

/**
 * Hook to get filtered and sorted assets
 */
export function useAssets(options?: UseAssetsOptions): UseAssetsResult {
  const { filter, sort, serviceId, parentAssetId } = options || {};
  
  const assets = useMemo(() => {
    // Build filter from convenience props
    const effectiveFilter: AssetFilter = {
      ...filter,
      ...(serviceId && { serviceId }),
      ...(parentAssetId && { parentAssetId }),
    };
    
    // Get assets
    let results = getAssets(effectiveFilter);
    
    // Sort if requested
    if (sort) {
      results = sortAssets(results, sort);
    }
    
    return results;
  }, [filter, sort, serviceId, parentAssetId]);
  
  return {
    assets,
    isLoading: false,
    error: null,
    count: assets.length,
  };
}

/**
 * Hook to get a single asset by ID
 */
export function useAsset(assetId: string | undefined) {
  const { assets } = useAssets();
  
  const asset = useMemo(() => {
    if (!assetId) return null;
    
    // Import here to avoid circular deps
    const { getAssetById } = require('../automations');
    return getAssetById(assetId) || null;
  }, [assetId, assets]);
  
  return {
    asset,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook to get sub-assets for a parent asset
 */
export function useSubAssets(parentAssetId: string | undefined) {
  return useAssets({
    parentAssetId,
  });
}

/**
 * Hook to get all assets for a service
 */
export function useServiceAssets(serviceId: string | undefined) {
  const assets = useMemo(() => {
    if (!serviceId) return [];
    return getAllAssets(serviceId);
  }, [serviceId]);
  
  return {
    assets,
    isLoading: false,
    error: null,
    count: assets.length,
  };
}

/**
 * Hook to get task model counts for tab badges
 * 
 * @example
 * ```typescript
 * const { counts } = useTaskModelCounts('asset-credit-tm-001');
 * // counts = { artifacts: 3, functions: 8, ruleflows: 2, errors: 3, dependencies: 2 }
 * ```
 */
export function useTaskModelCounts(taskModelId: string | undefined) {
  const counts = useMemo(() => {
    if (!taskModelId) {
      return {
        artifacts: 0,
        functions: 0,
        ruleflows: 0,
        errors: 0,
        dependencies: 0,
      };
    }
    
    return getTaskModelCounts(taskModelId);
  }, [taskModelId]);
  
  return {
    counts,
    isLoading: false,
    error: null,
  };
}

/**
 * Hook to get task models for a service
 */
export function useTaskModels(serviceId: string | undefined) {
  return useAssets({
    filter: {
      serviceId,
      type: 'task-model',
    },
  });
}
