import { useState, useEffect } from 'react';
import { VocabularyRepository } from '../VocabularyRepository';
import { VocabularyAttribute } from '../types';

/**
 * useVocabularyAttribute
 * 
 * Hook for accessing a specific vocabulary attribute by path.
 * 
 * @param bomId - BOM identifier
 * @param attributePath - Dot-notation path to attribute
 * @returns Attribute or null
 * 
 * @example
 * const { attribute, exists } = useVocabularyAttribute(
 *   'loan-application',
 *   'applicant.creditScore'
 * );
 */
export function useVocabularyAttribute(
  bomId: string,
  attributePath: string
) {
  const [attribute, setAttribute] = useState<VocabularyAttribute | null>(null);
  const repo = VocabularyRepository.getInstance();
  
  useEffect(() => {
    if (!bomId || !attributePath) {
      setAttribute(null);
      return;
    }
    
    const bom = repo.getBOM(bomId);
    if (!bom) {
      setAttribute(null);
      return;
    }
    
    const attr = repo.findAttribute(bom, attributePath);
    setAttribute(attr);
  }, [bomId, attributePath, repo]);
  
  return {
    attribute,
    exists: attribute !== null
  };
}
