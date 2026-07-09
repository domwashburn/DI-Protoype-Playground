/**
 * React Hook for Vocabulary Parser Integration
 * 
 * NEW LAYER - Phase 5.11.3
 * 
 * Provides React hooks for using vocabulary in editor components.
 * Integrates VocabularyResolver with React state management.
 * 
 * STRANGLER PATTERN:
 * - New hook, doesn't modify existing editor hooks
 * - Can be adopted incrementally by components
 * - Feature flag controls enablement
 * 
 * @module evaluationEngine/hooks/useVocabularyParser
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  getVocabularyResolver, 
  USE_VOCABULARY_RESOLUTION,
  type VocabularyResolutionResult 
} from '../parsers/VocabularyResolver';

/**
 * Hook for vocabulary term resolution
 * 
 * @param term - Term to resolve (reactive)
 * @returns Resolution result
 * 
 * @example
 * function MyEditor() {
 *   const [input, setInput] = useState('');
 *   const resolution = useVocabularyTermResolution(input);
 *   
 *   return (
 *     <div>
 *       <input value={input} onChange={e => setInput(e.target.value)} />
 *       {resolution.resolved && (
 *         <div>Resolved to: {resolution.suggestedVariableName}</div>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useVocabularyTermResolution(term: string): VocabularyResolutionResult {
  const [resolution, setResolution] = useState<VocabularyResolutionResult>({
    resolved: false,
    term
  });
  
  useEffect(() => {
    if (!USE_VOCABULARY_RESOLUTION || !term) {
      setResolution({ resolved: false, term });
      return;
    }
    
    const resolver = getVocabularyResolver();
    const result = resolver.resolveTerm(term);
    setResolution(result);
  }, [term]);
  
  return resolution;
}

/**
 * Hook for vocabulary autocomplete
 * 
 * @param query - Search query (debounced internally)
 * @param maxResults - Maximum results to return
 * @returns Search results
 * 
 * @example
 * function Autocomplete() {
 *   const [query, setQuery] = useState('');
 *   const { suggestions, isSearching } = useVocabularyAutocomplete(query);
 *   
 *   return (
 *     <div>
 *       <input value={query} onChange={e => setQuery(e.target.value)} />
 *       {isSearching && <div>Searching...</div>}
 *       <ul>
 *         {suggestions.map(s => (
 *           <li key={s.term}>{s.term}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 */
export function useVocabularyAutocomplete(
  query: string,
  maxResults: number = 10
) {
  const [suggestions, setSuggestions] = useState<VocabularyResolutionResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    if (!USE_VOCABULARY_RESOLUTION || !query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    setIsSearching(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      const resolver = getVocabularyResolver();
      const results = resolver.searchForSuggestions(query, maxResults);
      setSuggestions(results);
      setIsSearching(false);
    }, 150);
    
    return () => clearTimeout(timeoutId);
  }, [query, maxResults]);
  
  return {
    suggestions,
    isSearching,
    hasSuggestions: suggestions.length > 0
  };
}

/**
 * Hook for vocabulary validation
 * 
 * @param attributePath - Attribute path to validate against
 * @param value - Value to validate
 * @param bomId - Optional BOM ID
 * @returns Validation result
 * 
 * @example
 * function ValidatedInput() {
 *   const [value, setValue] = useState('');
 *   const { isValid, errors } = useVocabularyValidation(
 *     'applicant.creditScore',
 *     Number(value)
 *   );
 *   
 *   return (
 *     <div>
 *       <input 
 *         value={value} 
 *         onChange={e => setValue(e.target.value)}
 *         className={!isValid ? 'error' : ''}
 *       />
 *       {errors.map((error, i) => (
 *         <div key={i} className="error">{error}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */
export function useVocabularyValidation(
  attributePath: string,
  value: any,
  bomId?: string
) {
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors?: string[];
    warnings?: string[];
  }>({ valid: true });
  
  useEffect(() => {
    if (!USE_VOCABULARY_RESOLUTION || !attributePath) {
      setValidationResult({ valid: true });
      return;
    }
    
    const resolver = getVocabularyResolver();
    const result = resolver.validateValue(attributePath, value, bomId);
    setValidationResult(result);
  }, [attributePath, value, bomId]);
  
  return {
    isValid: validationResult.valid,
    errors: validationResult.errors || [],
    warnings: validationResult.warnings || []
  };
}

/**
 * Hook for checking if vocabulary is enabled
 * 
 * @returns Whether vocabulary resolution is active
 * 
 * @example
 * function MyEditor() {
 *   const vocabularyEnabled = useVocabularyEnabled();
 *   
 *   return (
 *     <div>
 *       {vocabularyEnabled && (
 *         <div>Vocabulary features available!</div>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useVocabularyEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    if (!USE_VOCABULARY_RESOLUTION) {
      setEnabled(false);
      return;
    }
    
    const resolver = getVocabularyResolver();
    setEnabled(resolver.isEnabled());
  }, []);
  
  return enabled;
}

/**
 * Hook for getting all available vocabulary terms
 * 
 * @returns Array of all terms
 * 
 * @example
 * function VocabularyList() {
 *   const terms = useVocabularyTerms();
 *   
 *   return (
 *     <ul>
 *       {terms.map(term => (
 *         <li key={term}>{term}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 */
export function useVocabularyTerms(): string[] {
  const [terms, setTerms] = useState<string[]>([]);
  
  useEffect(() => {
    if (!USE_VOCABULARY_RESOLUTION) {
      setTerms([]);
      return;
    }
    
    const resolver = getVocabularyResolver();
    if (resolver.isEnabled()) {
      setTerms(resolver.getAllTerms());
    }
  }, []);
  
  return terms;
}
