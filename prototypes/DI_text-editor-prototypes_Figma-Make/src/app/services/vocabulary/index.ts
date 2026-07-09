/**
 * Vocabulary Service
 * 
 * Complete vocabulary management system following IBM ADS/ODM patterns.
 * Provides business-friendly natural language terms backed by structured data models.
 * 
 * @example
 * import { VocabularyRepository, useVocabulary } from './services/vocabulary';
 * 
 * // Direct repository access
 * const repo = VocabularyRepository.getInstance();
 * const term = repo.resolveTerm('the credit score');
 * 
 * // React hook access
 * const { boms, addBOM } = useVocabulary();
 */

// Core services
export { VocabularyRepository } from './VocabularyRepository';
export { VocabularyStorage } from './VocabularyStorage';
export { VocabularyValidator } from './VocabularyValidator';

// Type definitions
export * from './types';

// Custom hooks
export * from './hooks';

// Initialization (Phase 5.11.4 Part 2)
export { 
  initializeVocabularySystem,
  clearVocabularySystem,
  reloadVocabularySystem
} from './initializeVocabulary';