/**
 * useRichTextTypeahead Hook
 * 
 * Provides inline typeahead ghost text for @mention autocomplete.
 * Shows ghost completion for the currently selected mention.
 * 
 * @example
 * const { ghostText } = useRichTextTypeahead({
 *   showAutocomplete,
 *   suggestions,
 *   selectedIndex: 0,
 *   query: 'Sal'
 * });
 * // Returns: { completion: 'es Dashboard', prefix: 'Sal' }
 */

import { useMemo } from 'react';
import type { MentionableEntity } from '../editors/core/types';

export interface TypeaheadGhostText {
  /** The completion text to show (what will be inserted after cursor) */
  completion: string;
  /** The current prefix being typed */
  prefix: string;
}

export interface RichTextTypeaheadProps {
  /** Whether autocomplete is currently showing */
  showAutocomplete: boolean;
  /** Current autocomplete suggestions */
  suggestions: MentionableEntity[];
  /** Currently selected suggestion index (managed by Autocomplete) */
  selectedIndex: number;
  /** Current search query */
  query: string;
}

export interface RichTextTypeaheadResult {
  /** Ghost text to display, or null if none */
  ghostText: TypeaheadGhostText | null;
}

/**
 * Calculate ghost text for @mention autocomplete
 */
export function useRichTextTypeahead({
  showAutocomplete,
  suggestions,
  selectedIndex,
  query
}: RichTextTypeaheadProps): RichTextTypeaheadResult {
  const ghostText = useMemo((): TypeaheadGhostText | null => {
    // Only show if autocomplete has suggestions
    if (!showAutocomplete || suggestions.length === 0) {
      return null;
    }
    
    // Get the currently selected item
    const selectedItem = suggestions[selectedIndex];
    if (!selectedItem) {
      return null;
    }
    
    // Get the entity name
    const fullName = selectedItem.name;
    const upperQuery = query.toUpperCase();
    const upperFullName = fullName.toUpperCase();
    
    // Calculate what remains to be typed
    if (upperFullName.startsWith(upperQuery)) {
      const completion = fullName.substring(query.length);
      return {
        completion,
        prefix: query
      };
    }
    
    return null;
  }, [showAutocomplete, suggestions, selectedIndex, query]);

  return {
    ghostText
  };
}
