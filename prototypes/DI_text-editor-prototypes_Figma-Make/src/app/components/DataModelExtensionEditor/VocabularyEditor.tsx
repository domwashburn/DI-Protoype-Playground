/**
 * VocabularyEditor Component
 * 
 * Tag input for editing vocabulary terms for an attribute.
 * Supports adding, removing, and resetting vocabulary.
 * Shows visual indicator when vocabulary has been customized.
 */

import { useState, useCallback } from 'react';
import { X, Plus, RotateCcw } from 'lucide-react';
import styles from './VocabularyEditor.module.css';

export interface VocabularyEditorProps {
  /** Current vocabulary terms (base + custom merged) */
  vocabulary: string[];
  
  /** Custom vocabulary terms added by user (for visual distinction) */
  customVocabulary?: string[];
  
  /** Whether this is a custom attribute (always editable) */
  isCustomAttribute?: boolean;
  
  /** Callback when vocabulary changes */
  onVocabularyChange?: (vocabulary: string[]) => void;
  
  /** Callback to reset to base vocabulary */
  onReset?: () => void;
  
  /** Whether the editor is read-only */
  readOnly?: boolean;
  
  /** Placeholder text for input */
  placeholder?: string;
}

/**
 * Tag input component for vocabulary terms
 */
export function VocabularyEditor({
  vocabulary,
  customVocabulary = [],
  isCustomAttribute = false,
  onVocabularyChange,
  onReset,
  readOnly = false,
  placeholder = 'Add vocabulary term...'
}: VocabularyEditorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const hasCustomVocabulary = customVocabulary.length > 0;
  const customSet = new Set(customVocabulary);
  
  // Add new term
  const handleAddTerm = useCallback(() => {
    const term = inputValue.trim();
    if (!term) return;
    
    // Don't add duplicates
    if (vocabulary.includes(term)) {
      setInputValue('');
      return;
    }
    
    onVocabularyChange?.([...vocabulary, term]);
    setInputValue('');
  }, [inputValue, vocabulary, onVocabularyChange]);
  
  // Remove term
  const handleRemoveTerm = useCallback((term: string) => {
    onVocabularyChange?.(vocabulary.filter(t => t !== term));
  }, [vocabulary, onVocabularyChange]);
  
  // Handle keyboard input
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTerm();
    } else if (e.key === 'Backspace' && inputValue === '' && vocabulary.length > 0) {
      // Delete last term on backspace if input is empty
      const lastTerm = vocabulary[vocabulary.length - 1];
      handleRemoveTerm(lastTerm);
    }
  }, [inputValue, vocabulary, handleAddTerm, handleRemoveTerm]);
  
  return (
    <div className={styles.vocabularyEditor}>
      {/* Header with reset button */}
      {hasCustomVocabulary && !isCustomAttribute && (
        <div className={styles.header}>
          <span className={styles.customIndicator}>
            🔁 Custom vocabulary added
          </span>
          {onReset && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={onReset}
              title="Reset to base vocabulary"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>
      )}
      
      {/* Tag list */}
      <div 
        className={`${styles.tagContainer} ${isFocused ? styles.focused : ''} ${readOnly ? styles.readOnly : ''}`}
        onClick={() => !readOnly && document.getElementById('vocab-input')?.focus()}
      >
        {vocabulary.map(term => {
          const isCustom = customSet.has(term);
          return (
            <div 
              key={term} 
              className={`${styles.tag} ${isCustom ? styles.customTag : styles.baseTag}`}
              title={isCustom ? 'Custom vocabulary term' : 'Base vocabulary term'}
            >
              <span className={styles.tagText}>{term}</span>
              {!readOnly && (isCustomAttribute || isCustom) && (
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTerm(term);
                  }}
                  aria-label={`Remove ${term}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          );
        })}
        
        {/* Input for adding new terms */}
        {!readOnly && (
          <input
            id="vocab-input"
            type="text"
            className={styles.tagInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={vocabulary.length === 0 ? placeholder : ''}
          />
        )}
      </div>
      
      {/* Add button */}
      {!readOnly && inputValue.trim() && (
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddTerm}
        >
          <Plus size={16} />
          Add term
        </button>
      )}
    </div>
  );
}
