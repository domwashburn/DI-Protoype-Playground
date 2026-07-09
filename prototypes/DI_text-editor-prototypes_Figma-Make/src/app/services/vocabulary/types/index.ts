/**
 * Vocabulary Type Definitions
 * 
 * Core types for the Vocabulary System following IBM ADS/ODM patterns.
 */

export * from './VocabularyType';
export * from './ValidationRules';
export * from './VocabularyAttribute';
export * from './BusinessObjectModel';

/**
 * Term resolution result
 */
export interface TermResolution {
  attribute: import('./VocabularyAttribute').VocabularyAttribute;
  attributePath: string;
  matchType: 
    | 'definite-singular' 
    | 'indefinite-singular' 
    | 'bare-singular'
    | 'variant-singular'
    | 'definite-plural'
    | 'bare-plural'
    | 'variant-plural';
  bomId: string;
}

/**
 * Search options
 */
export interface SearchOptions {
  maxResults?: number;
  types?: import('./VocabularyType').VocabularyType[];
  tags?: string[];
  scope?: 'global' | 'project' | 'formula';
}

/**
 * Search result
 */
export interface SearchResult {
  attribute: import('./VocabularyAttribute').VocabularyAttribute;
  attributePath: string;
  bomId: string;
  relevance: number;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}
