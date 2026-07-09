/**
 * useInlineTypeahead Hook
 * 
 * Provides inline typeahead suggestions synchronized with autocomplete.
 * Shows ghost text for the currently selected autocomplete item.
 * 
 * @example
 * const typeahead = useInlineTypeahead(autocomplete, value);
 * // Autocomplete shows dropdown
 * // Typeahead shows ghost text for selected item
 * // Arrow keys update both
 */

import { useMemo } from 'react';
import type { UseAutocompleteTriggers } from '../../../core/hooks';

export interface TypeaheadGhostText {
  /** The completion text to show (what will be inserted) */
  completion: string;
  /** The current word/prefix being typed */
  prefix: string;
}

export interface InlineTypeaheadResult {
  /** Ghost text to display, or null if none */
  ghostText: TypeaheadGhostText | null;
}

/**
 * Generate inline ghost text from autocomplete state
 */
export function useInlineTypeahead(
  autocomplete: UseAutocompleteTriggers,
  value: string
): InlineTypeaheadResult {
  /**
   * Calculate ghost text based on selected autocomplete item
   */
  const ghostText = useMemo((): TypeaheadGhostText | null => {
    // Only show if autocomplete has suggestions
    if (!autocomplete.showSuggestions || autocomplete.suggestions.length === 0) {
      return null;
    }
    
    // Get the currently selected item
    const selectedItem = autocomplete.suggestions[autocomplete.selectedIndex];
    if (!selectedItem) {
      return null;
    }
    
    // Get the text that will be inserted
    const fullText = selectedItem.insertText || selectedItem.label;
    const query = autocomplete.query;
    
    // For word-based matching (empty trigger)
    if (autocomplete.activeTrigger === '') {
      const upperQuery = query.toUpperCase();
      const upperFullText = fullText.toUpperCase();
      
      // Calculate what remains to be typed
      if (upperFullText.startsWith(upperQuery)) {
        const completion = fullText.substring(query.length);
        return {
          completion,
          prefix: query
        };
      }
    }
    
    // For trigger-based matching ($ or #), don't show ghost text
    // The dropdown is enough for these cases
    return null;
  }, [
    autocomplete.showSuggestions,
    autocomplete.suggestions,
    autocomplete.selectedIndex,
    autocomplete.query,
    autocomplete.activeTrigger
  ]);

  return {
    ghostText
  };
}
