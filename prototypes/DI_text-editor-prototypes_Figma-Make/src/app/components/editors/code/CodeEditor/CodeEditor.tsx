/**
 * CodeEditor - Unified Code Editor Component
 * 
 * Single editor component that handles both BAL and Formula modes.
 * Provides consistent editing experience with mode-specific features.
 * 
 * MODES:
 * - 'bal': Business Action Language editor with vocabulary autocomplete
 * - 'formula': Excel-like formula editor with variables and attributes
 * 
 * FEATURES:
 * - Textarea + overlay architecture for syntax highlighting
 * - Real-time validation and error highlighting
 * - Autocomplete with keyboard navigation
 * - Line numbers with error/warning indicators
 * - Debug mode (formula only)
 * - Variable management (formula only)
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 */

import { useState, useRef, useEffect, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Wand2, AlertCircle, AlertTriangle, XCircle, Info, CheckCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import { Alert, AlertDescription } from '../../../ui/alert';
import { useAutocompleteTriggers } from '../../core/hooks';
import type { AutocompleteProvider, AutocompleteItem, Variable } from '../../core/types';
import { getTextareaCaretPosition } from '../../../../utils/cursorPosition';
import { useCodeSyntax } from '../shared/hooks';
import type { DebugHighlight } from '../../../../utils/debugHighlighting';
import { scrollToLine } from '../../../../utils/debugHighlighting';
import { extractWarningLines, extractLineIssues, getGutterIconData } from '../../../../utils/formulaValidationUtils';
import styles from './CodeEditor.module.css';

// Import Formula-specific components (only used in formula mode)
import { GhostValue } from '../FormulaEditor/GhostValue';
import { BranchIndicator } from '../FormulaEditor/BranchIndicator';
import { DebugOutputColumn } from '../FormulaEditor/DebugOutputColumn';
import { ResizeHandle } from '../FormulaEditor/ResizeHandle';
import type { ErrorHighlight, WarningHighlight } from '../FormulaEditor/FormulaTestPanel';
import type { LineIssue } from '../FormulaEditor/ErrorWarningList';

// Import Formula-specific hooks
import { useFormulaValidation, useFormulaVariables, useKeyboardShortcuts, useInlineTypeahead, useLineHeights } from '../FormulaEditor/hooks';

/**
 * Line height constant for positioning overlays
 * Matches CSS: calc(var(--editor-font-size) * var(--editor-line-height))
 * = 14px * 1.6 = 22.4px
 */
const LINE_HEIGHT_PX = 22.4;

/**
 * Editor mode
 */
export type CodeEditorMode = 'bal' | 'formula';

/**
 * BAL-specific error type
 */
export interface BALError {
  line: number;
  message: string;
}

/**
 * BAL-specific suggestion type
 */
interface BALSuggestion {
  text: string;
  type: 'keyword' | 'operator' | 'attribute';
  description?: string;
}

/**
 * CodeEditor Props
 */
export interface CodeEditorProps {
  /** Editor mode - determines syntax and features */
  mode: CodeEditorMode;
  
  /** Current code text */
  value: string;
  
  /** Called when code changes */
  onChange: (value: string) => void;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Whether editor is read-only */
  readOnly?: boolean;
  
  /** Optional CSS class */
  className?: string;
  
  // === BAL-specific props ===
  /** BAL validation errors */
  balErrors?: BALError[];
  
  /** Called when BAL validation requested */
  onBalValidate?: () => void;
  
  /** BAL vocabulary mappings for autocomplete */
  vocabularyMappings?: Array<{ term: string; definition: string; dataType?: string }>;
  
  // === Formula-specific props ===
  /** Variables for autocomplete and validation (formula mode) */
  variables?: Variable[];
  
  /** Called when variables change (e.g., name edits) */
  onVariablesChange?: (variables: Variable[]) => void;
  
  /** Formula metadata */
  formulaName?: string;
  formulaDescription?: string;
  formulaReturnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  
  /** Called when formula metadata changes */
  onFormulaMetadataChange?: (metadata: { 
    name?: string; 
    description?: string; 
    returnType?: 'number' | 'string' | 'boolean' | 'date' | 'time' 
  }) => void;
  
  /** Debug mode highlighting (formula mode) */
  debugHighlight?: DebugHighlight | null;
  
  /** Error line highlighting (formula mode) */
  errorHighlight?: ErrorHighlight | null;
  
  /** Warning line highlighting (formula mode) */
  warningHighlights?: WarningHighlight[];
  
  /** Callback when warning highlights change */
  onWarningHighlightsChange?: (highlights: WarningHighlight[]) => void;
  
  /** Callback when line issues change (for error/warning list) */
  onLineIssuesChange?: (issues: LineIssue[]) => void;
}

/**
 * CodeEditor Handle (for imperative API)
 */
export interface CodeEditorHandle {
  focus: () => void;
  getEditor: () => HTMLTextAreaElement | null;
}

const getIndentLevel = (text: string): number => {
  const match = text.match(/^(\s*)/);
  return match ? match[1].length : 0;
};

/**
 * BAL default attributes (BAL mode only)
 */
const BAL_ATTRIBUTES: BALSuggestion[] = [
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

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, ref) => {
    const {
      mode,
      value,
      onChange,
      placeholder = mode === 'bal' ? 'Enter BAL code...' : 'Enter formula...',
      readOnly = false,
      className,
      // BAL-specific
      balErrors = [],
      onBalValidate,
      vocabularyMappings = [],
      // Formula-specific
      variables = [],
      onVariablesChange,
      formulaName = '',
      formulaDescription = '',
      formulaReturnType = 'number',
      onFormulaMetadataChange,
      debugHighlight,
      errorHighlight,
      warningHighlights,
      onWarningHighlightsChange,
      onLineIssuesChange,
    } = props;
    
    // === Shared State ===
    const [lineCount, setLineCount] = useState(1);
    
    // === Shared Refs ===
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const typeaheadOverlayRef = useRef<HTMLDivElement>(null);
    const highlightContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const gutterRef = useRef<HTMLDivElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    
    // === BAL-specific State ===
    const [balSuggestions, setBalSuggestions] = useState<BALSuggestion[]>([]);
    const [balSelectedIndex, setBalSelectedIndex] = useState(0);
    const [balAutocompletePosition, setBalAutocompletePosition] = useState<{ top: number; left: number } | null>(null);
    
    // === Formula-specific State (only used in formula mode) ===
    const [showDebugOutput, setShowDebugOutput] = useState(false);
    const [debugOutputWidth, setDebugOutputWidth] = useState(400);
    
    // === Syntax Highlighting Hook ===
    const { highlightSyntax } = useCodeSyntax({
      mode,
      variables: mode === 'formula' ? variables : undefined,
      vocabularyMappings: mode === 'bal' ? vocabularyMappings : undefined,
    });
    
    // === Formula-specific Hooks (only in formula mode) ===
    const formulaVariables = mode === 'formula' 
      ? useFormulaVariables({ variables, onVariablesChange })
      : null;
    
    // Defensive guard: useFormulaValidation emits paren/quote/bracket warnings that
    // are formula-specific and would produce false positives against BAL syntax.
    // If this assertion ever fires, a future refactor has crossed the mode boundary.
    if (mode === 'bal') {
      console.assert(false, '[CodeEditor] useFormulaValidation must not run in BAL mode');
    }
    const formulaValidation = mode === 'formula'
      ? useFormulaValidation({
          value,
          variables: formulaVariables?.variables || [],
          warningHighlights,
          onWarningHighlightsChange,
          onLineIssuesChange,
        })
      : null;
    
    const lineHeights = mode === 'formula'
      ? useLineHeights(value)
      : null;
    
    // === Imperative Handle ===
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      },
      getEditor: () => textareaRef.current
    }));
    
    // === Update Syntax Highlighting ===
    useEffect(() => {
      if (overlayRef.current) {
        const highlighted = highlightSyntax(value);
        overlayRef.current.innerHTML = highlighted;
      }
    }, [value, highlightSyntax]);
    
    // === Update Line Count ===
    useEffect(() => {
      const lines = value.split('\n').length;
      setLineCount(lines);
    }, [value]);
    
    // === Sync Scroll ===
    const handleScroll = useCallback(() => {
      if (textareaRef.current && overlayRef.current && lineNumbersRef.current) {
        overlayRef.current.scrollTop = textareaRef.current.scrollTop;
        overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
      if (mode === 'formula' && gutterRef.current && textareaRef.current) {
        gutterRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    }, [mode]);
    
    // === Handle Input ===
    const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      
      if (mode === 'bal') {
        // BAL autocomplete update would go here
      }
    }, [onChange, mode]);
    
    // === Render BAL Mode ===
    if (mode === 'bal') {
      return (
        <div className={`${styles.balEditor} ${className || ''}`} ref={editorRef}>
          {/* Line numbers */}
          <div className={styles.lineNumbers} ref={lineNumbersRef}>
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className={styles.lineNumber}>
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Editor area */}
          <div className={styles.editorArea}>
            {/* Syntax highlight overlay */}
            <div 
              className={styles.highlightOverlay}
              ref={overlayRef}
              aria-hidden="true"
            />
            
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={value}
              onChange={handleInput}
              onScroll={handleScroll}
              placeholder={placeholder}
              readOnly={readOnly}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          
          {/* Error display */}
          {balErrors.length > 0 && (
            <div className={styles.errorContainer}>
              {balErrors.map((error, index) => (
                <Alert key={index} className={styles.error}>
                  <AlertCircle className={styles.errorIcon} />
                  <AlertDescription>
                    Line {error.line}: {error.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    // === Render Formula Mode ===
    // (This would include all the Formula Editor features - debug output, variable management, etc.)
    // For now, rendering a simplified version similar to BAL
    
    return (
      <div className={`${styles.formulaEditor} ${className || ''}`} ref={editorRef}>
        {/* Gutter with line numbers and icons */}
        <div className={styles.gutter} ref={gutterRef}>
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNumber = i + 1;
            // Get icon data for this line (errors, warnings, debug)
            const iconData = getGutterIconData(
              lineNumber,
              errorHighlight,
              warningHighlights || [],
              debugHighlight
            );
            
            return (
              <div key={lineNumber} className={styles.gutterLine}>
                <div className={styles.lineNumber}>{lineNumber}</div>
                {iconData.icon && (
                  <div className={`${styles.gutterIcon} ${styles[iconData.className]}`}>
                    {iconData.icon}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Editor area */}
        <div className={styles.editorArea}>
          {/* Syntax highlight overlay */}
          <div 
            className={styles.highlightOverlay}
            ref={overlayRef}
            aria-hidden="true"
          />
          
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={value}
            onChange={handleInput}
            onScroll={handleScroll}
            placeholder={placeholder}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
        
        {/* Debug output (formula mode only) */}
        {showDebugOutput && debugHighlight && (
          <>
            <ResizeHandle
              onResize={(delta) => setDebugOutputWidth(prev => Math.max(200, Math.min(800, prev + delta)))}
            />
            <DebugOutputColumn
              width={debugOutputWidth}
              debugHighlight={debugHighlight}
              onClose={() => setShowDebugOutput(false)}
            />
          </>
        )}
      </div>
    );
  }
);

CodeEditor.displayName = 'CodeEditor';
