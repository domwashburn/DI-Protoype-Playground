/**
 * Mention System Type Definitions
 * 
 * Types for the hierarchical @mention system used in Rich Text and Markdown editors.
 * Supports nested navigation through entity hierarchies (Documents→Sections, Automations→Services→Models).
 */

/**
 * Entity types that can be mentioned
 */
export type EntityType = 
  | 'kpi'
  | 'dashboard'
  | 'document'
  | 'document-section'
  | 'document-subsection'
  | 'automation'
  | 'service'
  | 'model';

/**
 * Base entity that can be mentioned
 */
export interface MentionableEntity {
  /** Unique identifier */
  id: string;
  
  /** Display name */
  name: string;
  
  /** Entity type */
  type: EntityType;
  
  /** Optional description */
  description?: string;
  
  /** Icon (emoji or icon identifier) */
  icon?: string;
  
  /** Badge label (e.g., "KPI", "Dashboard", "Section", "Model") */
  badge?: string;
  
  /** URL for linking */
  url?: string;
  
  // Hierarchy support
  /** Parent entity ID (for hierarchical entities) */
  parentId?: string;
  
  /** Child entities (for hierarchical entities) */
  children?: MentionableEntity[];
  
  // Metadata
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Mention inserted in editor
 */
export interface Mention {
  /** Unique identifier for this mention instance */
  id: string;
  
  /** Display text (e.g., "@Product Req Doc / User Stories / Admin") */
  displayText: string;
  
  /** Full path from root to leaf entity */
  path: MentionableEntity[];
  
  /** ID of the final (leaf) entity */
  entityId: string;
  
  /** Type of the final entity */
  entityType: EntityType;
  
  /** URL to link to */
  url?: string;
}

/**
 * Mention context during autocomplete
 */
export interface MentionContext {
  /** Trigger character */
  trigger: '@';
  
  /** User's typed text after @ */
  query: string;
  
  /** Currently selected parent entities in navigation path */
  path: MentionableEntity[];
  
  /** Navigation level (0 = root, 1 = first child, etc.) */
  level: number;
  
  /** True if user typed / to navigate into children */
  isNested: boolean;
  
  /** Starting position of the mention in text */
  startPos: number;
  
  /** Current cursor position */
  cursorPos: number;
}

/**
 * Result of parsing mention text
 */
export interface ParsedMentionText {
  /** Whether a mention trigger was detected */
  hasTrigger: boolean;
  
  /** The mention trigger character (@ if detected) */
  trigger?: '@';
  
  /** Query text after the trigger */
  query: string;
  
  /** Path segments (split by /) */
  pathSegments: string[];
  
  /** Whether this is a nested mention (contains /) */
  isNested: boolean;
  
  /** Position where the mention starts */
  startPos: number;
}

/**
 * Entity category for grouping
 */
export interface EntityCategory {
  /** Category identifier */
  id: string;
  
  /** Category display name */
  name: string;
  
  /** Category icon */
  icon: string;
  
  /** Entity types in this category */
  types: EntityType[];
}
