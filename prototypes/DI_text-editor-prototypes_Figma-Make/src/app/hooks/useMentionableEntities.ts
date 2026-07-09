/**
 * useMentionableEntities Hook
 * 
 * Provides access to mentionable entities for the @mention system.
 * Currently returns mock data; can be swapped for API calls later.
 */

import { useMemo } from 'react';
import type { MentionableEntity, EntityType } from '../components/editors/core/types';
import {
  allMentionableEntities,
  sampleKPIs,
  sampleDashboards,
  sampleDocuments,
  sampleAutomations,
  entityCategories,
} from '../SampleData/mentionableEntities';
import {
  filterEntitiesByQuery,
  getEntityChildren,
  findEntityById,
  buildMentionPath,
  formatMentionDisplay,
  getEntitiesByType,
  flattenEntities,
  getRootEntities,
  hasChildren,
  getEntityIcon,
  getEntityBadge,
} from '../utils/mentionUtils';

/**
 * Hook for accessing and managing mentionable entities
 */
export function useMentionableEntities() {
  // Memoize utility functions bound to our data
  const utilities = useMemo(() => ({
    /**
     * Filter entities by search query
     */
    filterByQuery: (entities: MentionableEntity[], query: string) => 
      filterEntitiesByQuery(entities, query),
    
    /**
     * Get children of an entity
     */
    getChildren: (entity: MentionableEntity) => 
      getEntityChildren(entity),
    
    /**
     * Find entity by ID
     */
    findById: (entityId: string) => 
      findEntityById(allMentionableEntities, entityId),
    
    /**
     * Build full path to entity
     */
    buildPath: (entityId: string) => 
      buildMentionPath(allMentionableEntities, entityId),
    
    /**
     * Format mention display text
     */
    formatDisplay: (path: MentionableEntity[]) => 
      formatMentionDisplay(path),
    
    /**
     * Get entities by type
     */
    getByType: (types: EntityType[]) => 
      getEntitiesByType(allMentionableEntities, types),
    
    /**
     * Flatten hierarchy
     */
    flatten: (entities: MentionableEntity[]) => 
      flattenEntities(entities),
    
    /**
     * Get root entities only
     */
    getRoots: (entities: MentionableEntity[]) => 
      getRootEntities(entities),
    
    /**
     * Check if entity has children
     */
    hasChildren: (entity: MentionableEntity) => 
      hasChildren(entity),
    
    /**
     * Get entity icon
     */
    getIcon: (entity: MentionableEntity) => 
      getEntityIcon(entity),
    
    /**
     * Get entity badge
     */
    getBadge: (entity: MentionableEntity) => 
      getEntityBadge(entity),
  }), []);
  
  return {
    // All entities
    allEntities: allMentionableEntities,
    
    // Entities by category
    kpis: sampleKPIs,
    dashboards: sampleDashboards,
    documents: sampleDocuments,
    automations: sampleAutomations,
    
    // Categories for UI
    categories: entityCategories,
    
    // Root entities (for initial display)
    rootEntities: useMemo(() => getRootEntities(allMentionableEntities), []),
    
    // Utility functions
    ...utilities,
  };
}

/**
 * Type for the hook return value
 */
export type UseMentionableEntitiesReturn = ReturnType<typeof useMentionableEntities>;
