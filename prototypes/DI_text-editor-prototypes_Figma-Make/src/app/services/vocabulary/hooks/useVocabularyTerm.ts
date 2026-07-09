import { useState, useEffect } from 'react';
import { VocabularyRepository } from '../VocabularyRepository';
import { TermResolution } from '../types';

/**
 * useVocabularyTerm
 * 
 * Hook for resolving natural language terms to vocabulary attributes.
 * Optimized for autocomplete and real-time validation.
 * 
 * @param term - Natural language term to resolve
 * @returns Resolved term information or null
 * 
 * @example
 * const { resolution, isValid, attribute } = useVocabularyTerm('the credit score');
 */
export function useVocabularyTerm(term: string) {
  const [resolution, setResolution] = useState<TermResolution | null>(null);
  const repo = VocabularyRepository.getInstance();
  
  useEffect(() => {
    if (!term) {
      setResolution(null);
      return;
    }
    
    const result = repo.resolveTerm(term);
    setResolution(result);
  }, [term, repo]);
  
  return {
    resolution,
    isValid: resolution !== null,
    attribute: resolution?.attribute,
    attributePath: resolution?.attributePath,
    matchType: resolution?.matchType,
    bomId: resolution?.bomId
  };
}
