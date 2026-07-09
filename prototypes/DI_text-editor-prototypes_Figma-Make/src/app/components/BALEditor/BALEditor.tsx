/**
 * BAL Editor Component - Textarea + Overlay Architecture
 * 
 * This uses the ONLY reliable approach for syntax highlighting:
 * 1. Real <textarea> for all input (browser manages cursor perfectly)
 * 2. Absolutely positioned overlay <div> for syntax highlighting
 * 3. Textarea is transparent, overlay shows through
 * 4. NO cursor jumping - browser handles everything naturally
 * 
 * This is the same pattern used by react-simple-code-editor and similar libraries.
 * 
 * CARBON_CONVERT: This component uses temporary shadcn/ui replacements for Carbon components.
 * Replace with proper IBM Carbon React v11 components when creating runnable export:
 * - Alert → @carbon/react InlineNotification
 * - AlertDescription → Part of InlineNotification content
 * - AlertCircle icon → @carbon/icons-react ErrorFilled
 * 
 * See /docs/carbon-conversion.md for complete conversion mapping.
 */

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { useCodeSyntax } from '../editors/code/shared/hooks';
import { useBALDefinitions } from '../editors/code/balSupport/hooks/useBALDefinitions';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { balVocabulary } from './balVocabulary';
import styles from './BALEditor.module.css';

export interface BALError {
  line: number;
  message: string;
}

interface Suggestion {
  text: string;
  type: 'keyword' | 'operator' | 'attribute';
  description?: string;
}

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

export interface BALEditorProps {
  value: string;
  onChange: (value: string) => void;
  errors?: BALError[];
  onValidate?: () => void;
  vocabularyMappings?: Array<{ term: string; definition: string; dataType?: string }>;
  className?: string;
}

export interface BALEditorHandle {
  focus: () => void;
  getEditor: () => HTMLTextAreaElement | null;
}

const getIndentLevel = (text: string): number => {
  const match = text.match(/^(\s*)/);
  return match ? match[1].length : 0;
};

const BALEditorComponent = forwardRef<BALEditorHandle, BALEditorProps>(
  ({ value, onChange, errors = [], onValidate, vocabularyMappings = [], className }, ref) => {
    const [lineCount, setLineCount] = useState(1);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    const [autocompletePosition, setAutocompletePosition] = useState<{ top: number; left: number } | null>(null);
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    
    // Extract defined terms from BAL definitions section
    const { definedTerms } = useBALDefinitions(value);
    
    // Use shared syntax highlighting hook with defined terms
    const { highlightSyntax } = useCodeSyntax({
      mode: 'bal',
      vocabularyMappings,
      definedTerms,  // Pass defined terms for dynamic keyword highlighting
    });

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      },
      getEditor: () => textareaRef.current
    }));

    /**
     * Update syntax highlighting overlay
     */
    useEffect(() => {
      if (highlightRef.current) {
        const highlighted = highlightSyntax(value);
        highlightRef.current.innerHTML = highlighted;
      }
    }, [value, highlightSyntax]);

    /**
     * Update line count
     */
    useEffect(() => {
      const lines = value.split('\n').length;
      setLineCount(lines);
    }, [value]);

    /**
     * Sync scroll between textarea and overlay
     */
    const handleScroll = useCallback(() => {
      if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
        highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    }, []);

    /**
     * Handle input
     */
    const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      updateAutocomplete();
    }, [onChange]);

    /**
     * Get current word at cursor
     */
    const getCurrentWord = useCallback((): { word: string; start: number; end: number } => {
      if (!textareaRef.current) return { word: '', start: 0, end: 0 };
      
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const text = textarea.value;
      
      // Find word boundaries
      let start = cursorPos;
      while (start > 0 && !/\s/.test(text[start - 1])) {
        start--;
      }
      
      let end = cursorPos;
      while (end < text.length && !/\s/.test(text[end])) {
        end++;
      }
      
      const word = text.substring(start, cursorPos);
      
      return { word, start, end: cursorPos };
    }, []);

    /**
     * Update autocomplete suggestions
     */
    const updateAutocomplete = useCallback(() => {
      const { word } = getCurrentWord();
      
      if (word.length < 2) {
        setSuggestions([]);
        setAutocompletePosition(null);
        return;
      }
      
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
      
      const filtered = allSuggestions
        .filter(s => s.text.toLowerCase().includes(word.toLowerCase()))
        .slice(0, 8);
      
      setSuggestions(filtered);
      setSelectedSuggestionIndex(0);
      
      if (filtered.length > 0 && textareaRef.current && editorRef.current) {
        // Calculate cursor position for autocomplete dropdown
        const textarea = textareaRef.current;
        const text = textarea.value.substring(0, textarea.selectionStart);
        const lines = text.split('\n');
        const currentLine = lines.length;
        const currentColumn = lines[lines.length - 1].length;
        
        // Approximate position (rough calculation)
        const lineHeight = 20; // approximate line height
        const charWidth = 8.4; // approximate character width
        
        const editorRect = editorRef.current.getBoundingClientRect();
        
        setAutocompletePosition({
          top: currentLine * lineHeight + 4,
          left: 48 + currentColumn * charWidth
        });
      } else {
        setAutocompletePosition(null);
      }
    }, [getCurrentWord]);

    /**
     * Handle autocomplete selection
     */
    const handleAutocompleteSelect = useCallback((suggestion: Suggestion) => {
      if (!textareaRef.current) return;
      
      const { word, start } = getCurrentWord();
      const textarea = textareaRef.current;
      const text = textarea.value;
      
      const newText = text.substring(0, start) + suggestion.text + text.substring(start + word.length);
      const newCursorPos = start + suggestion.text.length;
      
      onChange(newText);
      
      setSuggestions([]);
      setAutocompletePosition(null);
      
      // Set cursor position after update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }, [getCurrentWord, onChange]);

    /**
     * Handle Tab key
     */
    const handleTab = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      
      if (e.shiftKey) {
        // Shift+Tab: Remove indent from current line
        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = text.indexOf('\n', start);
        const actualLineEnd = lineEnd === -1 ? text.length : lineEnd;
        const currentLine = text.substring(lineStart, actualLineEnd);
        
        let newLine = currentLine;
        if (currentLine.startsWith('  ')) {
          newLine = currentLine.substring(2);
        } else if (currentLine.startsWith(' ')) {
          newLine = currentLine.substring(1);
        }
        
        if (newLine !== currentLine) {
          const removed = currentLine.length - newLine.length;
          const newText = text.substring(0, lineStart) + newLine + text.substring(actualLineEnd);
          onChange(newText);
          
          setTimeout(() => {
            textarea.setSelectionRange(start - removed, end - removed);
          }, 0);
        }
      } else {
        // Tab: Insert 2 spaces
        const newText = text.substring(0, start) + '  ' + text.substring(end);
        onChange(newText);
        
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
      }
    }, [onChange]);

    /**
     * Handle keyboard shortcuts
     */
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      
      // Escape: Dismiss autocomplete
      if (e.key === 'Escape' && suggestions.length > 0) {
        e.preventDefault();
        setSuggestions([]);
        setAutocompletePosition(null);
        return;
      }
      
      // ArrowDown: Navigate suggestions
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev + 1) % suggestions.length);
        return;
      }
      
      // ArrowUp: Navigate suggestions
      if (e.key === 'ArrowUp' && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }
      
      // Enter/Tab: Accept suggestion
      if ((e.key === 'Enter' || e.key === 'Tab') && suggestions.length > 0) {
        e.preventDefault();
        handleAutocompleteSelect(suggestions[selectedSuggestionIndex]);
        return;
      }
      
      // Cmd/Ctrl+S: Validate
      if (isCmdOrCtrl && e.key === 's') {
        e.preventDefault();
        onValidate?.();
        return;
      }

      // Tab handling
      if (e.key === 'Tab') {
        handleTab(e);
        return;
      }
    }, [suggestions, selectedSuggestionIndex, handleAutocompleteSelect, onValidate, handleTab]);

    // Error mapping
    const errorsByLine = errors.reduce((acc, error) => {
      acc[error.line] = error.message;
      return acc;
    }, {} as Record<number, string>);

    return (
      <div className={styles.balEditorContainer}>
        {errors.length > 0 && (
          <div className={styles.balErrors}>
            {errors.map((error, index) => (
              <Alert key={index} variant="destructive" className={styles.balError}>
                <AlertCircle size={16} />
                <AlertDescription>
                  <strong>Line {error.line}:</strong> {error.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <div className={styles.balEditorWrapper}>
          {/* Line numbers */}
          <div className={styles.balLineNumbers} ref={lineNumbersRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div
                key={i}
                className={`${styles.balLineNumber} ${errorsByLine[i + 1] ? styles.hasError : ''}`}
                title={errorsByLine[i + 1]}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Editor area with overlay */}
          <div
            ref={editorRef}
            className={styles.balEditorContent}
            onScroll={handleScroll}
          >
            {/* Syntax highlighting overlay - sits behind textarea */}
            <div
              ref={highlightRef}
              className={styles.balHighlightOverlay}
              aria-hidden="true"
            />
            
            {/* Textarea - transparent, sits on top, handles all input */}
            <textarea
              ref={textareaRef}
              className={styles.balTextarea}
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
            
            {/* Autocomplete dropdown */}
            {suggestions.length > 0 && autocompletePosition && (
              <div
                className={styles.balAutocomplete}
                style={{
                  top: `${autocompletePosition.top}px`,
                  left: `${autocompletePosition.left}px`
                }}
              >
                <div className={styles.balSuggestionList}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.text}`}
                      className={`${styles.balSuggestionItem} ${index === selectedSuggestionIndex ? styles.selected : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleAutocompleteSelect(suggestion);
                      }}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    >
                      <div className={styles.balSuggestionMain}>
                        <span className={`${styles.balSuggestionText} ${styles[suggestion.type]}`}>
                          {suggestion.text}
                        </span>
                        <span className={styles.balSuggestionType}>{suggestion.type}</span>
                      </div>
                      {suggestion.description && (
                        <div className={styles.balSuggestionDescription}>{suggestion.description}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.balAutocompleteHint}>
                  ↵ Enter • ↹ Tab • ↑↓ Navigate • Esc Dismiss
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

BALEditorComponent.displayName = 'BALEditor';

export const BALEditor = React.memo(BALEditorComponent);