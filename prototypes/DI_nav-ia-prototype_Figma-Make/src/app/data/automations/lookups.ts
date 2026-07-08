/**
 * Data Lookup Utilities
 * 
 * This module provides efficient lookup functions for finding automations,
 * services, and assets with various filters and relationships.
 * 
 * All functions are memoization-friendly for performance.
 */

import type {
  DecisionAutomation,
  DecisionService,
  Asset,
  AutomationFilter,
  ServiceFilter,
  AssetFilter,
  SortOptions,
  AssetCounts,
  ServiceStatistics,
  AutomationStatistics,
} from './types';

// Import from registry
import { allAutomations, allServices, allAssets, allDataModels } from './registry';
import { commonTags } from './shared/tags';

// Export for backward compatibility
export { allAutomations as decisionAutomations, allServices as decisionServices };
export { commonTags };

// Use registry data
const completeAssetsList: Asset[] = allAssets;

// ============================================================================
// BASE LOOKUP FUNCTIONS (Previously imported from old files)
// ============================================================================

/**
 * Get all automations
 */
export function getAllAutomations(): DecisionAutomation[] {
  return allAutomations;
}

/**
 * Get automation by ID
 */
export function getAutomationById(id: string): DecisionAutomation | undefined {
  return allAutomations.find(a => a.id === id || a.hashId === id);
}

/**
 * Get all services
 */
export function getAllServices(): DecisionService[] {
  return allServices;
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): DecisionService | undefined {
  return allServices.find(s => s.id === id || s.hashId === id);
}

/**
 * Get services by automation ID
 */
export function getServicesByAutomationId(automationId: string): DecisionService[] {
  return allServices.filter(s => s.automationId === automationId);
}

/**
 * Get asset by ID
 */
export function getAssetById(id: string): Asset | undefined {
  return completeAssetsList.find(a => a.id === id || a.hashId === id);
}

/**
 * Get assets by service ID
 */
export function getAssetsByServiceId(serviceId: string): Asset[] {
  return completeAssetsList.filter(a => a.serviceId === serviceId);
}

/**
 * Get sub-assets of an asset
 */
export function getSubAssets(assetId: string): Asset[] {
  return completeAssetsList.filter(a => a.parentAssetId === assetId);
}

// ============================================================================
// AUTOMATION LOOKUPS
// ============================================================================

/**
 * Get all automations with optional filtering
 */
export function getAutomations(filter?: AutomationFilter): DecisionAutomation[] {
  let results = getAllAutomations();
  
  if (!filter) {
    return results;
  }
  
  // Filter by status
  if (filter.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    results = results.filter(a => statuses.includes(a.status));
  }
  
  // Filter by variant
  if (filter.variant) {
    const variants = Array.isArray(filter.variant) ? filter.variant : [filter.variant];
    results = results.filter(a => variants.includes(a.variant));
  }
  
  // Filter by industry
  if (filter.industry) {
    const industries = Array.isArray(filter.industry) ? filter.industry : [filter.industry];
    results = results.filter(a => a.industry && industries.includes(a.industry));
  }
  
  // Filter by tags
  if (filter.tags && filter.tags.length > 0) {
    results = results.filter(a => 
      filter.tags!.some(tagId => a.tags.some(t => t.id === tagId))
    );
  }
  
  // Filter by search term
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    results = results.filter(a => 
      a.name.toLowerCase().includes(searchLower) ||
      a.displayName?.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by date range
  if (filter.createdAfter) {
    results = results.filter(a => new Date(a.createdDate) >= new Date(filter.createdAfter!));
  }
  
  if (filter.createdBefore) {
    results = results.filter(a => new Date(a.createdDate) <= new Date(filter.createdBefore!));
  }
  
  return results;
}

/**
 * Get automation statistics
 */
export function getAutomationStatistics(automationId: string): AutomationStatistics | undefined {
  const automation = getAutomationById(automationId);
  if (!automation) return undefined;
  
  const services = getServicesByAutomationId(automationId);
  const deployedServices = services.filter(s => s.status === 'deployed').length;
  
  let totalAssets = 0;
  services.forEach(service => {
    totalAssets += getAssetsByServiceId(service.id).length;
  });
  
  const lastDeployment = services
    .map(s => new Date(s.lastUpdatedDate))
    .sort((a, b) => b.getTime() - a.getTime())[0]?.toISOString();
  
  // Determine health status based on services
  let healthStatus: 'healthy' | 'warning' | 'error' = 'healthy';
  const successRates = services.map(s => s.successRate || 100);
  const avgSuccessRate = successRates.reduce((a, b) => a + b, 0) / successRates.length;
  
  if (avgSuccessRate < 95) {
    healthStatus = 'error';
  } else if (avgSuccessRate < 99) {
    healthStatus = 'warning';
  }
  
  return {
    totalServices: services.length,
    totalAssets,
    deployedServices,
    lastDeployment,
    executionCount: automation.executionCount,
    healthStatus,
  };
}

// ============================================================================
// SERVICE LOOKUPS
// ============================================================================

/**
 * Get all services with optional filtering
 */
export function getServices(filter?: ServiceFilter): DecisionService[] {
  let results = getAllServices();
  
  if (!filter) {
    return results;
  }
  
  // Filter by automation
  if (filter.automationId) {
    results = results.filter(s => s.automationId === filter.automationId);
  }
  
  // Filter by status
  if (filter.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    results = results.filter(s => statuses.includes(s.status));
  }
  
  // Filter by type
  if (filter.type) {
    const types = Array.isArray(filter.type) ? filter.type : [filter.type];
    results = results.filter(s => types.includes(s.type));
  }
  
  // Filter by tags
  if (filter.tags && filter.tags.length > 0) {
    results = results.filter(s => 
      filter.tags!.some(tagId => s.tags.some(t => t.id === tagId))
    );
  }
  
  // Filter by search term
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    results = results.filter(s => 
      s.name.toLowerCase().includes(searchLower) ||
      s.displayName?.toLowerCase().includes(searchLower) ||
      s.description.toLowerCase().includes(searchLower)
    );
  }
  
  return results;
}

/**
 * Get service statistics
 */
export function getServiceStatistics(serviceId: string): ServiceStatistics | undefined {
  const service = getServiceById(serviceId);
  if (!service) return undefined;
  
  const assets = getAllAssets(serviceId);
  
  // Count assets by type
  const assetsByType: Partial<Record<string, number>> = {};
  assets.forEach(asset => {
    assetsByType[asset.type] = (assetsByType[asset.type] || 0) + 1;
  });
  
  // Determine health status
  let healthStatus: 'healthy' | 'warning' | 'error' = 'healthy';
  if (service.successRate !== undefined) {
    if (service.successRate < 95) {
      healthStatus = 'error';
    } else if (service.successRate < 99) {
      healthStatus = 'warning';
    }
  }
  
  return {
    totalAssets: assets.length,
    assetsByType,
    lastDeployment: service.lastUpdatedDate,
    healthStatus,
  };
}

// ============================================================================
// ASSET LOOKUPS
// ============================================================================

/**
 * Get all assets for a service (including all asset types)
 */
export function getAllAssets(serviceId: string): Asset[] {
  return completeAssetsList.filter(asset => asset.serviceId === serviceId);
}

/**
 * Get asset by ID from complete list
 */
export function getAssetByIdComplete(id: string): Asset | undefined {
  return completeAssetsList.find(asset => asset.id === id);
}

/**
 * Get all assets with optional filtering
 */
export function getAssets(filter?: AssetFilter): Asset[] {
  let results = completeAssetsList;
  
  if (!filter) {
    return results;
  }
  
  // Filter by service
  if (filter.serviceId) {
    results = results.filter(a => a.serviceId === filter.serviceId);
  }
  
  // Filter by parent asset
  if (filter.parentAssetId) {
    results = results.filter(a => a.parentAssetId === filter.parentAssetId);
  }
  
  // Filter by type
  if (filter.type) {
    const types = Array.isArray(filter.type) ? filter.type : [filter.type];
    results = results.filter(a => types.includes(a.type));
  }
  
  // Filter by status
  if (filter.status) {
    const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
    results = results.filter(a => statuses.includes(a.status));
  }
  
  // Filter by tags
  if (filter.tags && filter.tags.length > 0) {
    results = results.filter(a => 
      filter.tags!.some(tagId => a.tags.some(t => t.id === tagId))
    );
  }
  
  // Filter by search term
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    results = results.filter(a => 
      a.name.toLowerCase().includes(searchLower) ||
      a.displayName?.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower)
    );
  }
  
  return results;
}

/**
 * Get sub-assets for a parent asset
 */
export function getSubAssetsComplete(parentAssetId: string): Asset[] {
  return completeAssetsList.filter(asset => asset.parentAssetId === parentAssetId);
}

/**
 * Get asset counts by type for a service
 */
export function getAssetCounts(serviceId: string): AssetCounts {
  const assets = getAllAssets(serviceId);
  
  const byType: Partial<Record<string, number>> = {};
  assets.forEach(asset => {
    byType[asset.type] = (byType[asset.type] || 0) + 1;
  });
  
  return {
    total: assets.length,
    byType,
  };
}

/**
 * Get all task model assets
 */
export function getTaskModels(serviceId?: string): Asset[] {
  return getAssets({
    serviceId,
    type: 'task-model',
  });
}

/**
 * Get task model with counts for tabs
 * Returns counts for: artifacts, functions, ruleflows, errors, dependencies
 */
export function getTaskModelCounts(taskModelId: string): {
  artifacts: number;
  functions: number;
  ruleflows: number;
  errors: number;
  dependencies: number;
} {
  const taskModel = getAssetByIdComplete(taskModelId);
  
  if (!taskModel || taskModel.type !== 'task-model') {
    return {
      artifacts: 0,
      functions: 0,
      ruleflows: 0,
      errors: 0,
      dependencies: 0,
    };
  }
  
  // Type guard to access task model specific properties
  const tm = taskModel as any;
  
  return {
    artifacts: tm.artifactIds?.length || 0,
    functions: tm.functionIds?.length || 0,
    ruleflows: tm.ruleflowIds?.length || 0,
    errors: tm.errorCount || 0,
    dependencies: tm.dependencies?.length || 0,
  };
}

// ============================================================================
// SORTING UTILITIES
// ============================================================================

/**
 * Sort automations
 */
export function sortAutomations(automations: DecisionAutomation[], options: SortOptions): DecisionAutomation[] {
  const sorted = [...automations];
  
  sorted.sort((a, b) => {
    let aVal: any;
    let bVal: any;
    
    switch (options.field) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'createdDate':
        aVal = new Date(a.createdDate).getTime();
        bVal = new Date(b.createdDate).getTime();
        break;
      case 'lastUpdatedDate':
        aVal = new Date(a.lastUpdatedDate).getTime();
        bVal = new Date(b.lastUpdatedDate).getTime();
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        return 0;
    }
    
    if (aVal < bVal) return options.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return options.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Sort services
 */
export function sortServices(services: DecisionService[], options: SortOptions): DecisionService[] {
  const sorted = [...services];
  
  sorted.sort((a, b) => {
    let aVal: any;
    let bVal: any;
    
    switch (options.field) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'createdDate':
        aVal = new Date(a.createdDate).getTime();
        bVal = new Date(b.createdDate).getTime();
        break;
      case 'lastUpdatedDate':
        aVal = new Date(a.lastUpdatedDate).getTime();
        bVal = new Date(b.lastUpdatedDate).getTime();
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        return 0;
    }
    
    if (aVal < bVal) return options.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return options.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Sort assets
 */
export function sortAssets(assets: Asset[], options: SortOptions): Asset[] {
  const sorted = [...assets];
  
  sorted.sort((a, b) => {
    let aVal: any;
    let bVal: any;
    
    switch (options.field) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'createdDate':
        aVal = new Date(a.createdDate).getTime();
        bVal = new Date(b.createdDate).getTime();
        break;
      case 'lastUpdatedDate':
        aVal = new Date(a.lastUpdatedDate).getTime();
        bVal = new Date(b.lastUpdatedDate).getTime();
        break;
      case 'status':
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        return 0;
    }
    
    if (aVal < bVal) return options.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return options.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

// ============================================================================
// RELATIONSHIP HELPERS
// ============================================================================

/**
 * Get the full hierarchy for an asset (automation -> service -> asset -> sub-assets)
 */
export function getAssetHierarchy(assetId: string): {
  automation?: DecisionAutomation;
  service?: DecisionService;
  asset?: Asset;
  subAssets: Asset[];
} {
  const asset = getAssetByIdComplete(assetId);
  if (!asset) {
    return { subAssets: [] };
  }
  
  const service = getServiceById(asset.serviceId);
  const automation = service ? getAutomationById(service.automationId) : undefined;
  const subAssets = getSubAssetsComplete(assetId);
  
  return {
    automation,
    service,
    asset,
    subAssets,
  };
}

/**
 * Get breadcrumb path for an asset
 */
export function getAssetBreadcrumb(assetId: string): Array<{ id: string; name: string; type: string }> {
  const { automation, service, asset } = getAssetHierarchy(assetId);
  const breadcrumb: Array<{ id: string; name: string; type: string }> = [];
  
  if (automation) {
    breadcrumb.push({ id: automation.id, name: automation.name, type: 'automation' });
  }
  
  if (service) {
    breadcrumb.push({ id: service.id, name: service.name, type: 'service' });
  }
  
  if (asset) {
    breadcrumb.push({ id: asset.id, name: asset.name, type: 'asset' });
  }
  
  return breadcrumb;
}
