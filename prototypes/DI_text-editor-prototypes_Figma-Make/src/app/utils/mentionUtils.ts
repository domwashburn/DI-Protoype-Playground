/**
 * Mention System Utilities
 * 
 * Utility functions for filtering, navigating, and formatting mentions.
 */

import type { MentionableEntity, EntityType, ParsedMentionText } from '../components/editors/core/types';

/**
 * Filter entities by search query (case-insensitive, fuzzy matching)
 * 
 * @param entities - Entities to filter
 * @param query - Search query
 * @returns Filtered entities that match the query
 */
export function filterEntitiesByQuery(
  entities: MentionableEntity[],
  query: string
): MentionableEntity[] {
  if (!query || query.trim() === '') {
    return entities;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return entities.filter(entity => {
    // Match against name
    const nameMatch = entity.name.toLowerCase().includes(lowerQuery);
    
    // Match against description
    const descMatch = entity.description?.toLowerCase().includes(lowerQuery) || false;
    
    // Match against badge
    const badgeMatch = entity.badge?.toLowerCase().includes(lowerQuery) || false;
    
    return nameMatch || descMatch || badgeMatch;
  });
}

/**
 * Get children of a specific entity
 * 
 * @param entity - Parent entity
 * @returns Child entities (or empty array if no children)
 */
export function getEntityChildren(entity: MentionableEntity): MentionableEntity[] {
  return entity.children || [];
}

/**
 * Find entity by ID in a flat list or hierarchy
 * 
 * @param entities - Entities to search (can be hierarchical)
 * @param entityId - ID to find
 * @returns Found entity or undefined
 */
export function findEntityById(
  entities: MentionableEntity[],
  entityId: string
): MentionableEntity | undefined {
  for (const entity of entities) {
    if (entity.id === entityId) {
      return entity;
    }
    
    // Search in children recursively
    if (entity.children && entity.children.length > 0) {
      const found = findEntityById(entity.children, entityId);
      if (found) {
        return found;
      }
    }
  }
  
  return undefined;
}

/**
 * Build full path from root to entity
 * 
 * @param entities - All entities
 * @param entityId - Target entity ID
 * @returns Array of entities from root to target (or empty if not found)
 */
export function buildMentionPath(
  entities: MentionableEntity[],
  entityId: string
): MentionableEntity[] {
  // Helper function to build path recursively
  function buildPath(
    currentEntities: MentionableEntity[],
    targetId: string,
    currentPath: MentionableEntity[]
  ): MentionableEntity[] | null {
    for (const entity of currentEntities) {
      const newPath = [...currentPath, entity];
      
      if (entity.id === targetId) {
        return newPath;
      }
      
      // Search in children
      if (entity.children && entity.children.length > 0) {
        const foundPath = buildPath(entity.children, targetId, newPath);
        if (foundPath) {
          return foundPath;
        }
      }
    }
    
    return null;
  }
  
  const path = buildPath(entities, entityId, []);
  return path || [];
}

/**
 * Format mention display text from path
 * 
 * @param path - Array of entities from root to leaf
 * @returns Formatted display text (e.g., "@Product Req Doc / User Stories / Admin")
 */
export function formatMentionDisplay(path: MentionableEntity[]): string {
  if (path.length === 0) {
    return '';
  }
  
  // Join entity names with " / "
  const names = path.map(entity => entity.name);
  return '@' + names.join(' / ');
}

/**
 * Parse mention text to extract trigger, query, and path segments
 * 
 * @param text - Full text content
 * @param cursorPos - Current cursor position
 * @returns Parsed mention information
 */
export function parseMentionText(
  text: string,
  cursorPos: number
): ParsedMentionText {
  // Find @ symbol before cursor
  let startPos = -1;
  
  // Look backwards from cursor to find @
  for (let i = cursorPos - 1; i >= 0; i--) {
    const char = text[i];
    
    if (char === '@') {
      // Check if this @ is at word boundary
      const prevChar = i > 0 ? text[i - 1] : ' ';
      const isWordBoundary = /\s/.test(prevChar) || i === 0;
      
      if (isWordBoundary) {
        startPos = i;
        break;
      }
    }
    
    // Stop if we hit whitespace (no trigger found)
    if (/\s/.test(char) && i < cursorPos - 1) {
      break;
    }
  }
  
  // No trigger found
  if (startPos === -1) {
    return {
      hasTrigger: false,
      query: '',
      pathSegments: [],
      isNested: false,
      startPos: -1,
    };
  }
  
  // Extract query text after @
  const queryText = text.substring(startPos + 1, cursorPos);
  
  // Split by / to get path segments
  const segments = queryText.split('/').map(s => s.trim());
  
  // Check if nested (contains /)
  const isNested = queryText.includes('/');
  
  return {
    hasTrigger: true,
    trigger: '@',
    query: queryText,
    pathSegments: segments,
    isNested,
    startPos,
  };
}

/**
 * Get entities of specific types
 * 
 * @param entities - All entities
 * @param types - Entity types to filter by
 * @returns Entities matching the specified types
 */
export function getEntitiesByType(
  entities: MentionableEntity[],
  types: EntityType[]
): MentionableEntity[] {
  return entities.filter(entity => types.includes(entity.type));
}

/**
 * Flatten hierarchical entities into flat list (includes all children)
 * 
 * @param entities - Hierarchical entities
 * @returns Flat array of all entities (parents and children)
 */
export function flattenEntities(entities: MentionableEntity[]): MentionableEntity[] {
  const flattened: MentionableEntity[] = [];
  
  function flatten(items: MentionableEntity[]) {
    for (const item of items) {
      flattened.push(item);
      
      if (item.children && item.children.length > 0) {
        flatten(item.children);
      }
    }
  }
  
  flatten(entities);
  return flattened;
}

/**
 * Get only root-level entities (entities without parents)
 * 
 * @param entities - All entities
 * @returns Root-level entities only
 */
export function getRootEntities(entities: MentionableEntity[]): MentionableEntity[] {
  return entities.filter(entity => !entity.parentId);
}

/**
 * Check if entity has children
 * 
 * @param entity - Entity to check
 * @returns True if entity has children
 */
export function hasChildren(entity: MentionableEntity): boolean {
  return (entity.children?.length || 0) > 0;
}

/**
 * Get entity icon with fallback
 * 
 * @param entity - Entity
 * @returns Icon string (emoji or default)
 */
export function getEntityIcon(entity: MentionableEntity): string {
  if (entity.icon) {
    return entity.icon;
  }
  
  // Default icons by type
  const defaultIcons: Record<EntityType, string> = {
    'kpi': '📊',
    'dashboard': '📈',
    'document': '📄',
    'document-section': '📑',
    'document-subsection': '📋',
    'automation': '⚙️',
    'service': '🔧',
    'model': '🧠',
  };
  
  return defaultIcons[entity.type] || '📌';
}

/**
 * Get entity badge with fallback
 * 
 * @param entity - Entity
 * @returns Badge string
 */
export function getEntityBadge(entity: MentionableEntity): string {
  if (entity.badge) {
    return entity.badge;
  }
  
  // Default badges by type
  const defaultBadges: Record<EntityType, string> = {
    'kpi': 'KPI',
    'dashboard': 'Dashboard',
    'document': 'Document',
    'document-section': 'Section',
    'document-subsection': 'Subsection',
    'automation': 'Automation',
    'service': 'Service',
    'model': 'Model',
  };
  
  return defaultBadges[entity.type] || 'Entity';
}
