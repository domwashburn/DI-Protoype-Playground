import { useState, useEffect } from 'react';
import { VocabularyRepository } from '../VocabularyRepository';
import { SearchOptions, SearchResult } from '../types';

/**
 * useVocabularySearch
 * 
 * Hook for searching vocabulary attributes.
 * Debounced for performance with autocomplete.
 * 
 * @param query - Search query
 * @param options - Search options (types, tags, scope)
 * @returns Search results with relevance scores
 * 
 * @example
 * const { results, isSearching } = useVocabularySearch('credit', {
 *   types: ['number'],
 *   maxResults: 10
 * });
 */
export function useVocabularySearch(
  query: string,
  options?: SearchOptions
) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const repo = VocabularyRepository.getInstance();
  
  // Debounce search for performance
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    const timeoutId = setTimeout(() => {
      const searchResults = repo.search(query, options);
      setResults(searchResults);
      setIsSearching(false);
    }, 150); // 150ms debounce
    
    return () => clearTimeout(timeoutId);
  }, [query, options, repo]);
  
  return {
    results,
    isSearching,
    hasResults: results.length > 0
  };
}
