/**
 * BALAutocomplete Component
 * 
 * Provides autocomplete suggestions for BAL keywords, operators, and attributes
 * as the user types. Follows the cursor position.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { balVocabulary } from '../../SampleData/balSamples';
import { getTextareaCaretPosition } from '../../utils/cursorPosition';
import styles from './BALAutocomplete.module.css';

export interface BALAutocompleteProps {
  /** Current text value */
  value: string;
  /** Cursor position */
  cursorPosition: number;
  /** Callback when suggestion is selected */
  onSelect: (suggestion: string) => void;
  /** Whether autocomplete is active */
  isActive: boolean;
  /** Textarea ref for position calculation */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Editor content ref for positioning context */
  editorContentRef?: React.RefObject<HTMLDivElement>;
}

export interface BALAutocompleteHandle {
  /** Whether autocomplete has suggestions visible */
  hasSuggestions: boolean;
  /** Handle keyboard event - returns true if handled */
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => boolean;
}

interface Suggestion {
  text: string;
  type: 'keyword' | 'operator' | 'attribute';
  description?: string;
}

// Sample attributes for autocomplete
const ATTRIBUTES: Suggestion[] = [
  { text: 'employee.years of service', type: 'attribute', description: 'Years employed' },
  { text: 'employee.department', type: 'attribute', description: 'Department name' },
  { text: 'employee.salary', type: 'attribute', description: 'Annual salary' },
  { text: 'employee.performance rating', type: 'attribute', description: 'Performance score' },
  { text: 'request.type', type: 'attribute', description: 'Type of request' },
  { text: 'request.duration', type: 'attribute', description: 'Duration in days' },
  { text: 'request.start date', type: 'attribute', description: 'Request start date' },
  { text: 'policy.minimum years', type: 'attribute', description: 'Minimum years required' },
  { text: 'policy.maximum days', type: 'attribute', description: 'Maximum days allowed' },
];

/**
 * BALAutocomplete - Cursor-tracking autocomplete popover
 */
export const BALAutocomplete = forwardRef<BALAutocompleteHandle, BALAutocompleteProps>((
  {
    value,
    cursorPosition,
    onSelect,
    isActive,
    textareaRef,
    editorContentRef,
  },
  ref
) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  // Get current word being typed
  const getCurrentWord = (): string => {
    const textBeforeCursor = value.substring(0, cursorPosition);
    const words = textBeforeCursor.split(/\s+/);
    return words[words.length - 1] || '';
  };

  // Calculate suggestions based on current input
  useEffect(() => {
    if (!isActive) {
      setSuggestions([]);
      return;
    }

    const currentWord = getCurrentWord().toLowerCase();
    
    if (currentWord.length < 2) {
      setSuggestions([]);
      return;
    }

    // Gather all possible suggestions
    const allSuggestions: Suggestion[] = [
      ...balVocabulary.keywords.map(k => ({ 
        text: k, 
        type: 'keyword' as const,
        description: 'BAL keyword'
      })),
      ...balVocabulary.operators.map(o => ({ 
        text: o, 
        type: 'operator' as const,
        description: 'BAL operator'
      })),
      ...ATTRIBUTES
    ];

    // Filter suggestions
    const filtered = allSuggestions
      .filter(s => s.text.toLowerCase().includes(currentWord))
      .slice(0, 8); // Limit to 8 suggestions

    setSuggestions(filtered);
    setSelectedIndex(0);
  }, [value, cursorPosition, isActive]);

  // Calculate popover position based on cursor
  useEffect(() => {
    if (!textareaRef.current || suggestions.length === 0) return;

    const textarea = textareaRef.current;
    
    // Use accurate cursor position calculation
    const caretPos = getTextareaCaretPosition(textarea, cursorPosition);
    
    // Get scroll position from the editor content container (parent), not the textarea
    // because textarea now has overflow: hidden
    const editorContent = editorContentRef?.current || textarea.parentElement?.parentElement;
    const scrollTop = editorContent?.scrollTop || 0;
    const scrollLeft = editorContent?.scrollLeft || 0;
    
    // Line number width offset
    const lineNumberWidth = 48;
    
    // Calculate position relative to editor content
    const top = caretPos.top - scrollTop + 20; // Offset below cursor
    const left = caretPos.left - scrollLeft + lineNumberWidth;

    setPosition({ top, left });
  }, [cursorPosition, value, suggestions, textareaRef, editorContentRef]);

  const handleSelect = (suggestion: Suggestion) => {
    const currentWord = getCurrentWord();
    const replacement = suggestion.text;
    
    // Calculate the start position of the current word
    const textBeforeCursor = value.substring(0, cursorPosition);
    const startPos = textBeforeCursor.length - currentWord.length;
    
    // Build the new value
    const newValue = value.substring(0, startPos) + replacement + value.substring(cursorPosition);
    
    onSelect(newValue);
    setSuggestions([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (suggestions.length === 0) return false;
    
    // Only intercept Escape to dismiss - everything else passes through naturally
    // This ensures the textarea scrolls and behaves normally at all times
    if (e.key === 'Escape') {
      e.preventDefault();
      setSuggestions([]);
      return true;
    }
    
    return false;
  };

  useImperativeHandle(ref, () => ({
    hasSuggestions: suggestions.length > 0,
    handleKeyDown
  }));

  if (suggestions.length === 0) return null;

  return (
    <div
      ref={popoverRef}
      className={styles.autocompletePopover}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className={styles.suggestionList}>
        {suggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.type}-${suggestion.text}`}
            className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ''}`}
            onClick={() => handleSelect(suggestion)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <div className={styles.suggestionMain}>
              <span className={`${styles.suggestionText} ${styles[suggestion.type]}`}>
                {suggestion.text}
              </span>
              <span className={styles.suggestionType}>{suggestion.type}</span>
            </div>
            {suggestion.description && (
              <div className={styles.suggestionDescription}>{suggestion.description}</div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.autocompleteHint}>
        Click to select • <kbd>Esc</kbd> to dismiss
      </div>
    </div>
  );
});

BALAutocomplete.displayName = 'BALAutocomplete';
