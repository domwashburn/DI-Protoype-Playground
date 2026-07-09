/**
 * Vocabulary Integration Utilities
 * 
 * NEW LAYER - Phase 5.11.3
 * 
 * Bridges existing verbalization system with new vocabulary repository.
 * Provides backward-compatible API that can use either:
 * - Old: Simple verbalization mappings (Variable[])
 * - New: Vocabulary repository (VocabularyRepository)
 * 
 * STRANGLER PATTERN:
 * - Doesn't modify existing verbalizationUtils
 * - Provides enhanced version with vocabulary support
 * - Feature flag controls which system is used
 * - Falls back to old system when vocabulary disabled
 * 
 * @module utils/vocabularyIntegration
 */

import type { Variable, VerbalizationMap } from '../components/editors/core/types/EditorTypes';
import { buildVerbalizationMap as buildOldMap } from './verbalizationUtils';
import { getVocabularyResolver, USE_VOCABULARY_RESOLUTION } from '../services/evaluationEngine/parsers/VocabularyResolver';

/**
 * Enhanced verbalization map that includes vocabulary
 */
export interface EnhancedVerbalizationMap extends VerbalizationMap {
  /** Whether vocabulary resolution is active */
  vocabularyEnabled: boolean;
  
  /** Vocabulary resolver instance (if enabled) */
  vocabularyResolver?: ReturnType<typeof getVocabularyResolver>;
}

/**
 * Build verbalization map with optional vocabulary support
 * 
 * Backward compatible with existing buildVerbalizationMap:
 * - If vocabulary disabled: Returns old-style map
 * - If vocabulary enabled: Augments with vocabulary terms
 * 
 * @param variables - Array of variables with optional verbalizations
 * @returns Enhanced verbalization map
 * 
 * @example
 * const map = buildEnhancedVerbalizationMap(variables);
 * 
 * // Works with old system
 * const varName = map.verbalizationToVariable.get('customer name');
 * 
 * // OR with new vocabulary system
 * const result = resolveWithVocabulary('the credit score', map);
 */
export function buildEnhancedVerbalizationMap(variables: Variable[]): EnhancedVerbalizationMap {
  // Start with old system (always works)
  const oldMap = buildOldMap(variables);
  
  // If vocabulary disabled, return old map
  if (!USE_VOCABULARY_RESOLUTION) {
    return {
      ...oldMap,
      vocabularyEnabled: false
    };
  }
  
  // Vocabulary enabled: augment with vocabulary terms
  const resolver = getVocabularyResolver();
  
  if (!resolver.isEnabled()) {
    return {
      ...oldMap,
      vocabularyEnabled: false
    };
  }
  
  // Add vocabulary terms to the map
  const enhancedVerbalizationToVariable = new Map(oldMap.verbalizationToVariable);
  const enhancedVariableToVerbalization = new Map(oldMap.variableToVerbalization);
  
  // Get all vocabulary terms and add them
  const allTerms = resolver.getAllTerms();
  
  for (const term of allTerms) {
    const result = resolver.resolveTerm(term);
    if (result.resolved && result.suggestedVariableName) {
      const normalized = term.toLowerCase();
      enhancedVerbalizationToVariable.set(normalized, result.suggestedVariableName);
      enhancedVariableToVerbalization.set(result.suggestedVariableName, normalized);
    }
  }
  
  return {
    variableToVerbalization: enhancedVariableToVerbalization,
    verbalizationToVariable: enhancedVerbalizationToVariable,
    vocabularyEnabled: true,
    vocabularyResolver: resolver
  };
}

/**
 * Resolve verbalization using both old and new systems
 * 
 * Resolution priority:
 * 1. Try vocabulary repository (if enabled)
 * 2. Fall back to variable verbalization map
 * 3. Return null if not found
 * 
 * @param verbalization - Natural language term to resolve
 * @param map - Enhanced verbalization map
 * @returns Variable name or null
 * 
 * @example
 * const varName = resolveWithVocabulary('the credit score', map);
 * // → '$applicantCreditScore' (from vocabulary)
 * 
 * const varName2 = resolveWithVocabulary('customer name', map);
 * // → '$customerName' (from variable verbalization)
 */
export function resolveWithVocabulary(
  verbalization: string,
  map: EnhancedVerbalizationMap
): string | null {
  // Try vocabulary first (if enabled)
  if (map.vocabularyEnabled && map.vocabularyResolver) {
    const result = map.vocabularyResolver.resolveTerm(verbalization);
    if (result.resolved && result.suggestedVariableName) {
      return result.suggestedVariableName;
    }
  }
  
  // Fall back to old verbalization map
  const normalized = verbalization.toLowerCase();
  return map.verbalizationToVariable.get(normalized) || null;
}

/**
 * Get all available verbalizations (old + new)
 * 
 * @param map - Enhanced verbalization map
 * @returns Array of all available verbalizations
 */
export function getAllVerbalizations(map: EnhancedVerbalizationMap): string[] {
  const verbalizations = Array.from(map.verbalizationToVariable.keys());
  
  // If vocabulary enabled, add vocabulary terms
  if (map.vocabularyEnabled && map.vocabularyResolver) {
    const vocabTerms = map.vocabularyResolver.getAllTerms();
    verbalizations.push(...vocabTerms.map(t => t.toLowerCase()));
  }
  
  // Deduplicate
  return Array.from(new Set(verbalizations));
}

/**
 * Search for verbalizations matching a query
 * 
 * Useful for autocomplete. Searches both:
 * - Variable verbalizations
 * - Vocabulary terms (if enabled)
 * 
 * @param query - Search query
 * @param map - Enhanced verbalization map
 * @param maxResults - Maximum number of results
 * @returns Array of matching verbalizations
 * 
 * @example
 * const suggestions = searchVerbalizations('credit', map, 10);
 * // → ['the credit score', 'credit rating', ...]
 */
export function searchVerbalizations(
  query: string,
  map: EnhancedVerbalizationMap,
  maxResults: number = 10
): string[] {
  const results: string[] = [];
  const queryLower = query.toLowerCase();
  
  // Search variable verbalizations
  for (const [verbalization] of map.verbalizationToVariable) {
    if (verbalization.includes(queryLower)) {
      results.push(verbalization);
    }
  }
  
  // Search vocabulary terms (if enabled)
  if (map.vocabularyEnabled && map.vocabularyResolver) {
    const vocabResults = map.vocabularyResolver.searchForSuggestions(query, maxResults);
    results.push(...vocabResults.map(r => r.term.toLowerCase()));
  }
  
  // Deduplicate and limit
  const unique = Array.from(new Set(results));
  return unique.slice(0, maxResults);
}

/**
 * Check if a verbalization is valid
 * 
 * Checks both:
 * - Variable verbalization map
 * - Vocabulary repository (if enabled)
 * 
 * @param verbalization - Verbalization to check
 * @param map - Enhanced verbalization map
 * @returns True if verbalization exists
 */
export function isValidVerbalization(
  verbalization: string,
  map: EnhancedVerbalizationMap
): boolean {
  const normalized = verbalization.toLowerCase();
  
  // Check variable map
  if (map.verbalizationToVariable.has(normalized)) {
    return true;
  }
  
  // Check vocabulary (if enabled)
  if (map.vocabularyEnabled && map.vocabularyResolver) {
    const result = map.vocabularyResolver.resolveTerm(verbalization);
    return result.resolved;
  }
  
  return false;
}

/**
 * Get verbalization for a variable name
 * 
 * Inverse of resolveWithVocabulary.
 * 
 * @param variableName - Variable name (e.g., '$customerName')
 * @param map - Enhanced verbalization map
 * @returns Verbalization or null
 */
export function getVerbalizationForVariable(
  variableName: string,
  map: EnhancedVerbalizationMap
): string | null {
  return map.variableToVerbalization.get(variableName) || null;
}
