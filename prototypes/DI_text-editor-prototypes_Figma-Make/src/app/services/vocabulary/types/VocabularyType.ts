/**
 * Vocabulary Type System
 * 
 * Aligned with Formula evaluation engine types
 * Extended to support additional ADS/ODM types
 */
export type VocabularyType =
  // Primitive types
  | 'string'
  | 'number'
  | 'boolean'
  
  // Temporal types
  | 'date'
  | 'time'
  | 'datetime'
  | 'duration'
  
  // Complex types
  | 'object'
  | 'list'
  
  // Special types
  | 'any'
  | 'null';

/**
 * Type metadata with constraints
 */
export interface VocabularyTypeInfo {
  baseType: VocabularyType;
  elementType?: VocabularyType;  // For lists: List<number>
  nullable?: boolean;
  defaultValue?: any;
}
