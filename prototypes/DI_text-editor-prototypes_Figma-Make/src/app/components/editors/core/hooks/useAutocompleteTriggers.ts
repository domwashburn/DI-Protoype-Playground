/**
 * useAutocompleteTriggers
 * 
 * Generic autocomplete system supporting multiple trigger characters.
 * Works with $, #, @ or any custom triggers.
 * 
 * Same pattern as BAL Editor autocomplete, but generic for any triggers.
 * 
 * @example
 * const autocomplete = useAutocompleteTriggers(textareaRef, [
 *   { trigger: '$', getSuggestions: (query) => variables.filter(...) },
 *   { trigger: '#', getSuggestions: (query) => attributes.filter(...) }
 * ]);
 */

import { useState, useCallback, RefObject, useEffect, useRef } from 'react';
import type { AutocompleteProvider, AutocompleteItem } from '../types';

export interface UseAutocompleteTriggers {
  /** Whether suggestions should be shown */
  showSuggestions: boolean;
  /** Current filtered suggestions */
  suggestions: AutocompleteItem[];
  /** Currently selected suggestion index */
  selectedIndex: number;
  /** Current search query */
  query: string;
  /** Active trigger character (or null if none) */
  activeTrigger: string | null;
  /** Select a suggestion and insert it */
  selectSuggestion: (item: AutocompleteItem) => { newValue: string; cursorPosition: number } | null;
  /** Navigate up in suggestion list */
  navigateUp: () => void;
  /** Navigate down in suggestion list */
  navigateDown: () => void;
  /** Close suggestions */
  closeSuggestions: () => void;
  /** Handle keyboard navigation */
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
  /** Manually update suggestions - call this from onChange */
  updateSuggestions: () => void;
}

/**
 * Generic autocomplete hook for text editors
 * Supports multiple trigger characters with independent suggestion providers
 */
export function useAutocompleteTriggers(
  textareaRef: RefObject<HTMLTextAreaElement>,
  providers: AutocompleteProvider[]
): UseAutocompleteTriggers {
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState('');
  
  // Use ref to store providers to prevent callback recreation
  const providersRef = useRef(providers);
  
  // Update ref when providers change
  useEffect(() => {
    providersRef.current = providers;
  }, [providers]);
  
  /**
   * Close suggestions
   */
  const closeSuggestions = useCallback(() => {
    setActiveTrigger(null);
    setSuggestions([]);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  /**
   * Detect trigger character and extract query
   * Updates suggestions based on current cursor position
   */
  const updateSuggestions = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    
    // Check each provider
    for (const provider of providersRef.current) {
      // Special case: empty trigger means word-based matching
      if (provider.trigger === '') {
        // Find the current word/phrase being typed
        // For natural language operators, we need to capture multi-word phrases
        // But we need to break at clear delimiters like $, #, or at the start of a line
        let startPos = cursorPos;
        
        // Step 1: Look backwards and break at CLEAR delimiters
        // These are things that definitely end a natural language phrase
        while (startPos > 0) {
          const char = textBeforeCursor[startPos - 1];
          // Break at: newlines, operators, parens, OR special tokens ($, #)
          // Allow spaces for multi-word phrases like "is greater than"
          if (/[\n+\-*/%=<>!&|(),$#]/.test(char)) {
            break;
          }
          startPos--;
        }
        
        // Step 2: Trim leading/trailing whitespace from the phrase
        let phrase = textBeforeCursor.substring(startPos, cursorPos).trim();
        
        // Only show if there's a phrase being typed (minimum 1 char)
        if (phrase.length >= 1) {
          setActiveTrigger('');
          setQuery(phrase);
          
          // Get suggestions from provider
          const filtered = provider.getSuggestions(phrase);
          
          if (filtered.length > 0) {
            setSuggestions(filtered);
            setSelectedIndex(0);
            return; // Found active trigger, stop checking
          }
        }
      } else if (provider.trigger === "'") {
        // Special handling for single quote to support verbalizations with apostrophes
        // Example: 'the customer's loyalty tier' contains an apostrophe
        
        // Strategy: Find matching pairs of quotes by looking for quotes followed by word boundaries
        // A quote is a CLOSING quote if followed by: space, operator, newline, or end of string
        // A quote is an APOSTROPHE if followed by a letter (like 's in "customer's")
        
        const lastQuoteIndex = textBeforeCursor.lastIndexOf("'");
        
        if (lastQuoteIndex === -1) continue;
        
        // Check if this quote is actually a closing quote or part of the verbalization
        const charAfterQuote = textBeforeCursor[lastQuoteIndex + 1];
        const isApostrophe = charAfterQuote && /[a-zA-Z]/.test(charAfterQuote);
        
        if (isApostrophe) {
          // This quote is an apostrophe (like "customer's"), not a delimiter
          // Look for the actual opening quote before this
          let openingQuoteIndex = lastQuoteIndex - 1;
          let depth = 0;
          
          while (openingQuoteIndex >= 0) {
            if (textBeforeCursor[openingQuoteIndex] === "'") {
              // Check if this is a closing quote or apostrophe
              const nextChar = textBeforeCursor[openingQuoteIndex + 1];
              if (nextChar && /[a-zA-Z]/.test(nextChar)) {
                // Apostrophe, skip it
                openingQuoteIndex--;
                continue;
              }
              
              // This is a real quote
              if (depth === 0) {
                // Found the opening quote!
                break;
              }
              depth--;
            }
            openingQuoteIndex--;
          }
          
          if (openingQuoteIndex >= 0 && textBeforeCursor[openingQuoteIndex] === "'") {
            const queryText = textBeforeCursor.substring(openingQuoteIndex + 1, cursorPos);
            
            if (!queryText.includes('\n')) {
              setActiveTrigger(provider.trigger);
              setQuery(queryText);
              
              const filtered = provider.getSuggestions(queryText);
              
              if (filtered.length > 0) {
                setSuggestions(filtered);
                setSelectedIndex(0);
                return;
              }
            }
          }
        } else {
          // Not an apostrophe - this could be an opening quote
          const queryText = textBeforeCursor.substring(lastQuoteIndex + 1);
          
          if (!queryText.includes('\n')) {
            // Count actual quote pairs (not apostrophes) on CURRENT LINE ONLY
            // to determine if we're inside a verbalization
            // 
            // Find start of current line
            let lineStart = lastQuoteIndex;
            while (lineStart > 0 && textBeforeCursor[lineStart - 1] !== '\n') {
              lineStart--;
            }
            
            let quoteCount = 0;
            for (let i = lineStart; i <= lastQuoteIndex; i++) {
              if (textBeforeCursor[i] === "'") {
                const nextChar = textBeforeCursor[i + 1];
                if (!nextChar || !/[a-zA-Z]/.test(nextChar)) {
                  // Real quote, not apostrophe
                  quoteCount++;
                }
              }
            }
            
            const isOpeningQuote = quoteCount % 2 === 1;
            
            // BUG FIX: Check if verbalization is closed (has closing quote on same line after cursor)
            // ❌ Don't show autocomplete for: 'order total' (cursor inside closed verbalization)
            // ✅ DO show autocomplete for: ', 'order, 'order t (cursor inside open verbalization)
            
            // Find end of current line
            let lineEnd = cursorPos;
            while (lineEnd < textarea.value.length && textarea.value[lineEnd] !== '\n') {
              lineEnd++;
            }
            
            // Check if there's a closing quote on this line after cursor (excluding apostrophes)
            let hasClosingQuote = false;
            for (let i = cursorPos; i < lineEnd; i++) {
              if (textarea.value[i] === "'") {
                // Check if this is a closing quote (not an apostrophe)
                const nextChar = textarea.value[i + 1];
                if (!nextChar || !/[a-zA-Z]/.test(nextChar)) {
                  // This is a real closing quote
                  hasClosingQuote = true;
                  break;
                }
              }
            }
            
            if (isOpeningQuote && !hasClosingQuote) {
              setActiveTrigger(provider.trigger);
              setQuery(queryText);
              
              const filtered = provider.getSuggestions(queryText);
              
              setSuggestions(filtered);
              setSelectedIndex(0);
              return;
            }
          }
        }
      } else {
        // Normal trigger character matching
        const lastTriggerIndex = textBeforeCursor.lastIndexOf(provider.trigger);
        
        // Only consider if trigger is found
        if (lastTriggerIndex !== -1) {
          const queryText = textBeforeCursor.substring(lastTriggerIndex + 1);
          
          // Only show if query doesn't contain whitespace or newline
          if (!queryText.includes(' ') && !queryText.includes('\n')) {
            setActiveTrigger(provider.trigger);
            setQuery(queryText);
            
            // Get suggestions from provider
            const filtered = provider.getSuggestions(queryText);
            
            setSuggestions(filtered);
            setSelectedIndex(0);
            
            return; // Found active trigger, stop checking
          }
        }
      }
    }
    
    // No active trigger found
    closeSuggestions();
  }, [textareaRef, closeSuggestions]);

  /**
   * Select a suggestion and insert it into the textarea
   */
  const selectSuggestion = useCallback((item: AutocompleteItem) => {
    const textarea = textareaRef.current;
    if (!textarea || activeTrigger === null) return null;
    
    const cursorPos = textarea.selectionStart;
    const text = textarea.value;
    const textBeforeCursor = text.substring(0, cursorPos);
    
    // Use insertText if provided, otherwise use label
    const textToInsert = item.insertText || item.label;
    
    let newValue: string;
    let newCursorPosition: number;
    
    if (activeTrigger === '') {
      // Word-based matching - replace the current word/phrase
      // Must match the same boundary logic used in updateSuggestions
      let startPos = cursorPos;
      while (startPos > 0) {
        const char = textBeforeCursor[startPos - 1];
        // Break at: newlines, operators, parens, OR special tokens ($, #)
        // Allow spaces for multi-word phrases like "is greater than"
        if (/[\n+\-*/%=<>!&|(),$#]/.test(char)) {
          break;
        }
        startPos--;
      }
      
      // Trim the start position to skip leading spaces
      while (startPos < cursorPos && textBeforeCursor[startPos] === ' ') {
        startPos++;
      }
      
      newValue = 
        text.substring(0, startPos) +
        textToInsert +
        text.substring(cursorPos);
      
      newCursorPosition = startPos + textToInsert.length;
    } else if (activeTrigger === "'") {
      // Special handling for single quote to support verbalizations with apostrophes
      // Need to find the ACTUAL opening quote (not an apostrophe)
      
      // Use the same logic as in updateSuggestions to find the opening quote
      let openingQuoteIndex = -1;
      let quoteCount = 0;
      
      for (let i = 0; i < cursorPos; i++) {
        if (textBeforeCursor[i] === "'") {
          const nextChar = textBeforeCursor[i + 1];
          if (!nextChar || !/[a-zA-Z]/.test(nextChar)) {
            // This is a real quote, not an apostrophe
            if (quoteCount % 2 === 0) {
              // This is an opening quote
              openingQuoteIndex = i;
            }
            quoteCount++;
          }
        }
      }
      
      if (openingQuoteIndex === -1) return null;
      
      // Insert verbalization with closing quote
      newValue = 
        text.substring(0, openingQuoteIndex) +
        activeTrigger + textToInsert + activeTrigger + // Add closing quote
        text.substring(cursorPos);
      
      // Position cursor after closing quote
      newCursorPosition = openingQuoteIndex + activeTrigger.length + textToInsert.length + activeTrigger.length;
    } else {
      // Trigger-based matching - replace trigger + query
      const lastTriggerIndex = textBeforeCursor.lastIndexOf(activeTrigger);
      
      if (lastTriggerIndex === -1) return null;
      
      newValue = 
        text.substring(0, lastTriggerIndex) +
        activeTrigger + textToInsert +
        text.substring(cursorPos);
      
      newCursorPosition = lastTriggerIndex + activeTrigger.length + textToInsert.length;
    }

    // Close suggestions
    closeSuggestions();

    return {
      newValue,
      cursorPosition: newCursorPosition
    };
  }, [textareaRef, activeTrigger, closeSuggestions]);

  /**
   * Navigate up in suggestion list
   */
  const navigateUp = useCallback(() => {
    setSelectedIndex(i => {
      if (i > 0) return i - 1;
      return suggestions.length - 1; // Wrap to bottom
    });
  }, [suggestions.length]);

  /**
   * Navigate down in suggestion list
   */
  const navigateDown = useCallback(() => {
    setSelectedIndex(i => {
      if (i < suggestions.length - 1) return i + 1;
      return 0; // Wrap to top
    });
  }, [suggestions.length]);

  /**
   * Handle keyboard navigation in suggestion list
   * Returns true if event was handled (should preventDefault)
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Only handle if suggestions are showing
    // Note: activeTrigger can be empty string for word-based matching
    if (suggestions.length === 0 || activeTrigger === null) return false;

    switch (e.key) {
      case 'ArrowUp':
        navigateUp();
        return true;
      
      case 'ArrowDown':
        navigateDown();
        return true;
      
      case 'Enter':
      case 'Tab':
        if (suggestions[selectedIndex]) {
          // Parent component will handle the actual insertion
          return true;
        }
        return false;
      
      case 'Escape':
        closeSuggestions();
        return true;
      
      default:
        return false;
    }
  }, [suggestions, activeTrigger, selectedIndex, navigateUp, navigateDown, closeSuggestions]);

  return {
    showSuggestions: suggestions.length > 0 && activeTrigger !== null,
    suggestions,
    selectedIndex,
    query,
    activeTrigger,
    selectSuggestion,
    navigateUp,
    navigateDown,
    closeSuggestions,
    handleKeyDown,
    updateSuggestions
  };
}