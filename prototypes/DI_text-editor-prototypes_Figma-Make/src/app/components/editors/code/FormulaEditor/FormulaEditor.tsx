/**
 * FormulaEditor - Formula Editor Component
 * 
 * Excel-like formula editor with:
 * - Named formulas (can be invoked like Excel functions)
 * - Variables ($variable)
 * - Attributes (#attribute)
 * - Real-time syntax highlighting
 * - Autocomplete with keyboard navigation
 * - Text-to-variable conversion
 * 
 * Uses the same textarea + overlay pattern as BAL Editor.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Wand2, AlertCircle, AlertTriangle, XCircle, Info, CheckCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import { useAutocompleteTriggers } from '../../core/hooks';
import type { AutocompleteProvider, AutocompleteItem, Variable } from '../../core/types';
import { getTextareaCaretPosition } from '../../../../utils/cursorPosition';
import { useCodeSyntax } from '../shared/hooks';
import { useFormulaValidation, useFormulaVariables, useKeyboardShortcuts, useInlineTypeahead, useLineHeights } from './hooks';
import { GhostValue } from './GhostValue';
import { BranchIndicator } from './BranchIndicator';
import { DebugOutputColumn } from './DebugOutputColumn';
import { ResizeHandle } from './ResizeHandle';
import type { DebugHighlight } from '../../../../utils/debugHighlighting';
import type { ErrorHighlight, WarningHighlight } from './FormulaTestPanel';
import type { LineIssue } from './ErrorWarningList';
import { scrollToLine } from '../../../../utils/debugHighlighting';
import { extractWarningLines, extractLineIssues, getGutterIconData } from '../../../../utils/formulaValidationUtils';
import styles from './FormulaEditor.module.css';

/**
 * Line height constant for positioning overlays
 * Matches CSS: calc(var(--editor-font-size) * var(--editor-line-height))
 * = 14px * 1.6 = 22.4px
 */
const LINE_HEIGHT_PX = 22.4;

export interface FormulaEditorProps {
  /** Editor mode: 'formula' (default) or 'bal' */
  mode?: 'formula' | 'bal';
  
  /** Current formula text */
  value: string;
  /** Called when formula changes */
  onChange: (value: string) => void;
  
  /** Variables for autocomplete and validation (Formula mode) */
  variables?: Variable[];
  /** Called when variables change (e.g., name edits) (Formula mode) */
  onVariablesChange?: (variables: Variable[]) => void;
  
  /** BAL mode: Vocabulary mappings (user-defined natural language terms) */
  vocabularyMappings?: Array<{
    term: string;
    definition: string;
    dataType?: string;
  }>;
  
  /** BAL mode: Attribute definitions for autocomplete and test panel */
  attributes?: Array<{
    path: string; // 'employee.salary', 'customer.address.city'
    type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
    description?: string;
    defaultValue?: any;
    unit?: string; // 'USD', 'days', 'kg', etc.
  }>;
  
  /** Formula metadata */
  formulaName?: string;
  formulaDescription?: string;
  formulaReturnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Called when formula metadata changes */
  onFormulaMetadataChange?: (metadata: { name?: string; description?: string; returnType?: 'number' | 'string' | 'boolean' | 'date' | 'time' }) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether editor is read-only */
  readOnly?: boolean;
  /** Optional CSS class */
  className?: string;
  /** Debug mode highlighting */
  debugHighlight?: DebugHighlight | null;
  /** Error line highlighting */
  errorHighlight?: ErrorHighlight | null;
  /** Warning line highlighting */
  warningHighlights?: WarningHighlight[];
  /** Callback when warning highlights change */
  onWarningHighlightsChange?: (highlights: WarningHighlight[]) => void;
  /** Callback when line issues change (for error/warning list) */
  onLineIssuesChange?: (issues: LineIssue[]) => void;
}

export function FormulaEditor({
  mode = 'formula',
  value,
  onChange,
  variables = [],
  onVariablesChange,
  vocabularyMappings,
  attributes,
  formulaName = '',
  formulaDescription = '',
  formulaReturnType = 'number',
  onFormulaMetadataChange,
  placeholder = 'Enter formula...',
  readOnly = false,
  className,
  debugHighlight,
  errorHighlight,
  warningHighlights,
  onWarningHighlightsChange,
  onLineIssuesChange,
}: FormulaEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const typeaheadOverlayRef = useRef<HTMLDivElement>(null);
  const highlightContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);
  const debugOutputRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [autocompletePosition, setAutocompletePosition] = useState<{ x: number; y: number; placeAbove: boolean; maxHeight?: number } | null>(null);
  const [showConvertToVariable, setShowConvertToVariable] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [lineIssues, setLineIssues] = useState<LineIssue[]>([]);
  const [debugOutputWidth, setDebugOutputWidth] = useState(50); // Default 50px, Phase 2: Resizable
  const [suppressValidation, setSuppressValidation] = useState(false); // Don't show errors while typing in strings

  /**
   * Handle debug output column resize
   * Clamps width between min and max boundaries
   */
  const handleDebugOutputResize = useCallback((deltaX: number) => {
    setDebugOutputWidth(prev => {
      const newWidth = prev + deltaX;
      // Clamp between 30px and 200px
      return Math.max(30, Math.min(200, newWidth));
    });
  }, []);

  /**
   * Autocomplete providers for keywords, $ (variables) and # (attributes)
   */
  const providers: AutocompleteProvider[] = useMemo(() => {
    // Formula keywords for autocomplete
    const FORMULA_KEYWORDS = [
      // Control flow
      { keyword: 'IF', description: 'Conditional statement' },
      { keyword: 'ELSEIF', description: 'Alternative condition' },
      { keyword: 'ELSE', description: 'Default condition' },
      { keyword: 'if not', description: 'Natural language: else', category: 'NL Control' },
      { keyword: 'otherwise', description: 'Natural language: else', category: 'NL Control' },
      { keyword: 'END', description: 'End block' },
      { keyword: 'THEN', description: 'Then clause' },
      { keyword: 'RETURN', description: 'Return value (optional)' },
      
      // Logical
      { keyword: 'AND', description: 'Logical AND' },
      { keyword: 'OR', description: 'Logical OR' },
      { keyword: 'NOT', description: 'Logical NOT' },
      
      // PHASE 5.4: Natural Language Assignment
      { keyword: 'set', description: 'Set variable value', category: 'NL Assignment' },
      { keyword: 'equal to', description: 'Assignment: set X equal to Y', category: 'NL Assignment' },
      { keyword: 'is set to', description: 'Assignment: X is set to Y', category: 'NL Assignment' },
      { keyword: 'to', description: 'Set variable to value', category: 'NL Assignment' },
      
      // PHASE 5.4: Natural Language Comparison Operators
      { keyword: 'is', description: 'Natural language: equality/comparison', category: 'NL Operator' },
      { keyword: 'equals', description: 'Natural language: ==', category: 'NL Operator' },
      { keyword: 'is equal to', description: 'Natural language: ==', category: 'NL Operator' },
      { keyword: 'is not equal to', description: 'Natural language: !=', category: 'NL Operator' },
      { keyword: 'is greater than', description: 'Natural language: >', category: 'NL Operator' },
      { keyword: 'is less than', description: 'Natural language: <', category: 'NL Operator' },
      { keyword: 'is greater than or equal to', description: 'Natural language: >=', category: 'NL Operator' },
      { keyword: 'is less than or equal to', description: 'Natural language: <=', category: 'NL Operator' },
      { keyword: 'does not equal', description: 'Natural language: !=', category: 'NL Operator' },
      
      // PHASE 5.4: Natural Language Null/Empty Predicates
      { keyword: 'is null', description: 'Check if value is null', category: 'NL Operator' },
      { keyword: 'is not null', description: 'Check if value is not null', category: 'NL Operator' },
      { keyword: 'is empty', description: 'Check if value is empty', category: 'NL Operator' },
      { keyword: 'is not empty', description: 'Check if value is not empty', category: 'NL Operator' },
      
      // PHASE 5.4: Natural Language String Predicates
      { keyword: 'starts with', description: 'Check if string starts with value', category: 'NL Operator' },
      { keyword: 'ends with', description: 'Check if string ends with value', category: 'NL Operator' },
      { keyword: 'contains', description: 'Check if string contains value', category: 'NL Operator' },
      
      // PHASE 5.4: Natural Language Arithmetic Operators
      { keyword: 'times', description: 'Natural language: *', category: 'NL Operator' },
      { keyword: 'multiplied by', description: 'Natural language: *', category: 'NL Operator' },
      { keyword: 'multiply', description: 'Multiply {value} by {value}', category: 'NL Operator' },
      { keyword: 'multiply the', description: 'Multiply the {value} by {value}', category: 'NL Operator' },
      { keyword: 'divided by', description: 'Natural language: /', category: 'NL Operator' },
      { keyword: 'divide', description: 'Divide {value} by {value}', category: 'NL Operator' },
      { keyword: 'divide the', description: 'Divide the {value} by {value}', category: 'NL Operator' },
      { keyword: 'plus', description: 'Natural language: +', category: 'NL Operator' },
      { keyword: 'add', description: 'Add {value} to {value}', category: 'NL Operator' },
      { keyword: 'add the', description: 'Add the {value} to {value}', category: 'NL Operator' },
      { keyword: 'minus', description: 'Natural language: -', category: 'NL Operator' },
      { keyword: 'subtract', description: 'Subtract {value} from {value}', category: 'NL Operator' },
      { keyword: 'subtract the', description: 'Subtract the {value} from {value}', category: 'NL Operator' },
      { keyword: 'mod', description: 'Natural language: %', category: 'NL Operator' },
      { keyword: 'squared', description: 'Raise to power of 2', category: 'NL Operator' },
      { keyword: 'cubed', description: 'Raise to power of 3', category: 'NL Operator' },
      { keyword: 'to the power of', description: 'Exponentiation', category: 'NL Operator' },
      
      // PHASE 5.4: Natural Language Functions - Aggregate
      { keyword: 'the sum of', description: 'Natural language: SUM()', category: 'NL Function' },
      { keyword: 'the total of', description: 'Natural language: SUM()', category: 'NL Function' },
      { keyword: 'the average of', description: 'Natural language: AVERAGE()', category: 'NL Function' },
      { keyword: 'the count of', description: 'Natural language: COUNT()', category: 'NL Function' },
      { keyword: 'the maximum of', description: 'Natural language: MAX()', category: 'NL Function' },
      { keyword: 'the minimum of', description: 'Natural language: MIN()', category: 'NL Function' },
      
      // PHASE 5.4: Natural Language Functions - Array
      { keyword: 'the first element of', description: 'Get first element of array', category: 'NL Function' },
      { keyword: 'the first item in', description: 'Get first item in array', category: 'NL Function' },
      { keyword: 'the first item of', description: 'Get first item of array', category: 'NL Function' },
      { keyword: 'the first of', description: 'Get first element of array', category: 'NL Function' },
      { keyword: 'the last element of', description: 'Get last element of array', category: 'NL Function' },
      { keyword: 'the last item in', description: 'Get last item in array', category: 'NL Function' },
      { keyword: 'the last item of', description: 'Get last item of array', category: 'NL Function' },
      { keyword: 'the last of', description: 'Get last element of array', category: 'NL Function' },
      { keyword: 'the length of', description: 'Get length of array or string', category: 'NL Function' },
      { keyword: 'the size of', description: 'Get size of array', category: 'NL Function' },
      
      // PHASE 5.4: Natural Language Functions - String
      { keyword: 'the uppercase of', description: 'Convert to uppercase', category: 'NL Function' },
      { keyword: 'the lowercase of', description: 'Convert to lowercase', category: 'NL Function' },
      
      // PHASE 5.4: Natural Language Functions - Math
      { keyword: 'the absolute value of', description: 'Absolute value', category: 'NL Function' },
      { keyword: 'the square root of', description: 'Square root', category: 'NL Function' },
      { keyword: 'the ceiling of', description: 'Round up to integer', category: 'NL Function' },
      { keyword: 'the floor of', description: 'Round down to integer', category: 'NL Function' },
      { keyword: 'the round of', description: 'Round to nearest integer', category: 'NL Function' },
      
      // Functions (symbolic)
      { keyword: 'SUM', description: 'Sum of values', category: 'Function' },
      { keyword: 'AVG', description: 'Average of values', category: 'Function' },
      { keyword: 'AVERAGE', description: 'Average of values', category: 'Function' },
      { keyword: 'MAX', description: 'Maximum value', category: 'Function' },
      { keyword: 'MIN', description: 'Minimum value', category: 'Function' },
      { keyword: 'COUNT', description: 'Count values', category: 'Function' },
      { keyword: 'ABS', description: 'Absolute value', category: 'Function' },
      { keyword: 'ROUND', description: 'Round number', category: 'Function' },
      { keyword: 'FLOOR', description: 'Round down', category: 'Function' },
      { keyword: 'CEIL', description: 'Round up', category: 'Function' },
      { keyword: 'SQRT', description: 'Square root', category: 'Function' },
      { keyword: 'POW', description: 'Power', category: 'Function' },
      { keyword: 'CONCAT', description: 'Concatenate strings', category: 'Function' },
      { keyword: 'LENGTH', description: 'String length', category: 'Function' },
      { keyword: 'UPPER', description: 'Uppercase', category: 'Function' },
      { keyword: 'LOWER', description: 'Lowercase', category: 'Function' },
      { keyword: 'TRIM', description: 'Trim whitespace', category: 'Function' },
      { keyword: 'DATE', description: 'Date value', category: 'Function' },
      { keyword: 'NOW', description: 'Current date/time', category: 'Function' },
      { keyword: 'TODAY', description: 'Current date', category: 'Function' },
      { keyword: 'YEAR', description: 'Extract year', category: 'Function' },
      { keyword: 'MONTH', description: 'Extract month', category: 'Function' },
      { keyword: 'DAY', description: 'Extract day', category: 'Function' },
      
      // Common values
      { keyword: 'TRUE', description: 'Boolean true' },
      { keyword: 'FALSE', description: 'Boolean false' },
      { keyword: 'NULL', description: 'Null value' },
    ];
    
    // Operators that expect values after them (for smart autocomplete)
    const VALUE_EXPECTING_KEYWORDS = [
      'multiply', 'multiply the', 'divide', 'divide the',
      'add', 'add the', 'subtract', 'subtract the',
      'by', 'to', 'from', 'than', 'with',
      'is', 'equals',
      'is equal to', 'is not equal to', 'is greater than', 'is less than',
      'is greater than or equal to', 'is less than or equal to',
      'starts with', 'ends with', 'contains',
    ];
    
    return [
      // Smart value autocomplete - triggers after operator keywords
      // Shows variables, attributes, and verbalizations when in "value context"
      {
        trigger: '',
        getSuggestions: (query: string) => {
          // This provider handles two cases:
          // 1. User just typed operator keyword + space (query will be empty or very short)
          // 2. User is starting to type a value after operator
          
          // Check if we're in a value context by looking at the textarea
          const textarea = textareaRef.current;
          if (!textarea) return [];
          
          const cursorPos = textarea.selectionStart;
          const textBeforeCursor = textarea.value.substring(0, cursorPos);
          
          // Look backwards to find if we just typed an operator keyword
          // Pattern: find the last complete phrase before current position
          let contextStart = cursorPos;
          let spaceCount = 0;
          while (contextStart > 0 && spaceCount < 5) { // Look back up to 5 words
            const char = textBeforeCursor[contextStart - 1];
            if (char === ' ') spaceCount++;
            if (/[\n+\-*/%=<>!&|(),$#]/.test(char)) break;
            contextStart--;
          }
          
          const context = textBeforeCursor.substring(contextStart, cursorPos).trim();
          
          // Check if any value-expecting keyword appears in the context
          const inValueContext = VALUE_EXPECTING_KEYWORDS.some(keyword =>
            context.toLowerCase().includes(keyword.toLowerCase()) ||
            context.toLowerCase().endsWith(keyword.toLowerCase())
          );
          
          if (!inValueContext) return []; // Not in value context, skip this provider
          
          // In value context! Show all variables + attributes
          const allSuggestions: AutocompleteItem[] = [];
          
          // Add all variables (both symbolic and verbalization)
          variables.forEach(v => {
            // Symbolic form
            if (!query || v.name.toLowerCase().includes(query.toLowerCase())) {
              allSuggestions.push({
                id: `${v.id}-symbolic`,
                label: `$${v.name}`,
                description: v.verbalization 
                  ? `'${v.verbalization}' • ${v.description || `${v.type} variable`}`
                  : (v.description || `${v.type} variable`),
                insertText: `$${v.name}`,
              });
            }
            
            // Verbalization form
            if (v.verbalization && (!query || v.verbalization.toLowerCase().includes(query.toLowerCase()))) {
              allSuggestions.push({
                id: `${v.id}-verb`,
                label: `'${v.verbalization}'`,
                description: `$${v.name} • ${v.description || `${v.type} variable`}`,
                insertText: `'${v.verbalization}'`,
              });
            }
          });
          
          // Add all attributes
          const attributes = [
            { id: 'attr1', name: 'customer.age', description: 'Customer age in years' },
            { id: 'attr2', name: 'customer.income', description: 'Annual income' },
            { id: 'attr3', name: 'customer.creditScore', description: 'Credit score (300-850)' },
            { id: 'attr4', name: 'customer.employmentYears', description: 'Years employed' },
            { id: 'attr5', name: 'customer.loyaltyTier', description: 'Loyalty tier level' },
            { id: 'attr6', name: 'customer.debtToIncomeRatio', description: 'Debt to income ratio' },
            { id: 'attr7', name: 'order.total', description: 'Order total amount' },
            { id: 'attr8', name: 'order.weight', description: 'Order weight in kg' },
            { id: 'attr9', name: 'order.shippingSpeed', description: 'Shipping speed option' },
            { id: 'attr10', name: 'order.destination.distance', description: 'Shipping distance in km' },
          ];
          
          attributes.forEach(a => {
            if (!query || a.name.toLowerCase().includes(query.toLowerCase())) {
              allSuggestions.push({
                id: a.id,
                label: `#${a.name}`,
                description: a.description,
                insertText: `#${a.name}`,
              });
            }
          });
          
          return allSuggestions;
        },
      },
      // Keyword autocomplete (no trigger)
      {
        trigger: '',
        getSuggestions: (query: string) => {
          const lowercaseQuery = query.toLowerCase();
          
          // Filter keywords that match the query
          const filtered = FORMULA_KEYWORDS.filter(kw =>
            kw.keyword.toLowerCase().includes(lowercaseQuery)
          );
          
          // Sort to prioritize:
          // 1. Exact matches
          // 2. Starts with query
          // 3. Contains query
          const sorted = filtered.sort((a, b) => {
            const aLower = a.keyword.toLowerCase();
            const bLower = b.keyword.toLowerCase();
            
            // Exact match
            if (aLower === lowercaseQuery) return -1;
            if (bLower === lowercaseQuery) return 1;
            
            // Starts with
            const aStarts = aLower.startsWith(lowercaseQuery);
            const bStarts = bLower.startsWith(lowercaseQuery);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            
            // Alphabetical for same priority
            return aLower.localeCompare(bLower);
          });
          
          return sorted.map(kw => ({
            id: kw.keyword,
            label: kw.keyword,
            description: kw.category ? `${kw.category} • ${kw.description}` : kw.description,
            insertText: kw.keyword,
          }));
        },
      },
      // Variable autocomplete (symbolic $var)
      {
        trigger: '$',
        getSuggestions: (query: string) => {
          const filtered = variables.filter(v =>
            v.name.toLowerCase().includes(query.toLowerCase())
          );
          return filtered.map(v => ({
            id: v.id,
            label: `$${v.name}`,
            description: v.verbalization 
              ? `'${v.verbalization}' • ${v.description || `${v.type} variable`}`
              : (v.description || `${v.type} variable`),
            insertText: v.name,
          }));
        },
      },
      // Variable autocomplete (verbalization 'var alias')
      {
        trigger: "'",
        getSuggestions: (query: string) => {
          const filtered = variables.filter(v =>
            v.verbalization && v.verbalization.toLowerCase().includes(query.toLowerCase())
          );
          return filtered.map(v => ({
            id: `${v.id}-verb`,
            label: `'${v.verbalization}'`,
            description: `$${v.name} • ${v.description || `${v.type} variable`}`,
            insertText: v.verbalization!,
          }));
        },
      },
      // Attribute autocomplete
      {
        trigger: '#',
        getSuggestions: (query: string) => {
          // Mock attributes - in real app, would come from schema
          const attributes = [
            { id: 'attr1', name: 'customer.age', description: 'Customer age in years' },
            { id: 'attr2', name: 'customer.income', description: 'Annual income' },
            { id: 'attr3', name: 'customer.creditScore', description: 'Credit score (300-850)' },
            { id: 'attr4', name: 'customer.employmentYears', description: 'Years employed' },
            { id: 'attr5', name: 'customer.loyaltyTier', description: 'Loyalty tier level' },
            { id: 'attr6', name: 'customer.debtToIncomeRatio', description: 'Debt to income ratio' },
            { id: 'attr7', name: 'order.total', description: 'Order total amount' },
            { id: 'attr8', name: 'order.weight', description: 'Order weight in kg' },
            { id: 'attr9', name: 'order.shippingSpeed', description: 'Shipping speed option' },
            { id: 'attr10', name: 'order.destination.distance', description: 'Shipping distance in km' },
          ];
          
          const filtered = attributes.filter(a =>
            a.name.toLowerCase().includes(query.toLowerCase())
          );
          
          return filtered.map(a => ({
            id: a.id,
            label: `#${a.name}`,
            description: a.description,
            insertText: a.name,
          }));
        },
      },
    ];
  }, [variables]);

  /**
   * Autocomplete hook
   */
  const autocomplete = useAutocompleteTriggers(textareaRef, providers);

  /**
   * Track when user is actively typing in a string (verbalization autocomplete active)
   * Suppress validation errors while typing in strings
   */
  useEffect(() => {
    if (autocomplete.showSuggestions && autocomplete.activeTrigger === "'") {
      // User is typing in a string - suppress validation
      setSuppressValidation(true);
    } else if (suppressValidation) {
      // Autocomplete closed - re-enable validation
      setSuppressValidation(false);
    }
  }, [autocomplete.showSuggestions, autocomplete.activeTrigger, suppressValidation]);

  /**
   * Syntax highlighting hook (shared with BAL Editor)
   * Note: Removed active token suppression - undefined variables stay highlighted while editing
   */
  const { highlightSyntax } = useCodeSyntax({
    mode: mode || 'formula',
    variables,
    vocabularyMappings,
  });

  /**
   * Validation hook
   * Note: Removed active token suppression - errors show immediately for undefined variables
   */
  const { validate, getErrorSummary } = useFormulaValidation(variables);
  const validationResult = useMemo(() => validate(value), [validate, value]);

  /**
   * Variable management hook
   */
  const variableManager = useFormulaVariables(value, variables, onChange, onVariablesChange);

  /**
   * Keyboard shortcuts hook
   */
  const keyboardShortcuts = useKeyboardShortcuts({
    onSelectAll: () => {
      if (textareaRef.current) {
        textareaRef.current.select();
      }
    },
    onEscape: () => {
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
    },
  });

  /**
   * Inline typeahead hook
   */
  const inlineTypeahead = useInlineTypeahead(autocomplete, value);

  /**
   * Line heights hook - CRIT-003
   * Measures actual line heights accounting for wrapping
   * Also captures computed line-height for baseline alignment
   * 
   * KNOWN LIMITATION: Wrapped lines continue at column 0 (standard textarea behavior).
   * HTML textarea elements cannot be styled to make wrapped lines continue at indentation levels.
   * 
   * FUTURE ENHANCEMENT: Replace textarea with contenteditable div for full CSS control,
   * or integrate a professional code editor library (CodeMirror, Monaco) for production.
   */
  const { lineHeights, computedLineHeight } = useLineHeights(textareaRef, value);

  /**
   * Apply dynamic CSS variables for line wrapping multipliers
   * This calculates how many times a line has wrapped (1, 2, 3, etc.)
   * and sets --line-wrap-multiplier for CSS calc() to use
   */
  useEffect(() => {
    if (!editorRef.current || lineHeights.length === 0) return;
    
    // Base line height from CSS (14px * 1.6 = 22.4px)
    const baseLineHeight = 22.4;
    
    // For each line, calculate the wrap multiplier
    lineHeights.forEach(({ lineNumber, height, top }) => {
      // Calculate how many base line heights fit into the actual height
      // E.g., 44.8px / 22.4px = 2 (line wrapped to 2 lines)
      const wrapMultiplier = Math.round(height / baseLineHeight);
      
      // Set CSS variable for this line
      editorRef.current!.style.setProperty(`--line-${lineNumber}-wrap-multiplier`, `${wrapMultiplier}`);
      
      // Also set top position for highlights (they need exact positioning)
      editorRef.current!.style.setProperty(`--line-${lineNumber}-top`, `${top}px`);
    });
  }, [lineHeights]);

  /**
   * Dynamically size textarea and overlay to fit content
   * This ensures all content is accessible for selection/editing
   */
  useEffect(() => {
    if (!textareaRef.current || !overlayRef.current || !highlightContainerRef.current) return;
    
    const textarea = textareaRef.current;
    const overlay = overlayRef.current;
    const highlightContainer = highlightContainerRef.current;
    
    // Get the full scroll height of the textarea (content height)
    const contentHeight = textarea.scrollHeight;
    
    // Set explicit height on textarea, overlay, and highlight container
    // This makes them all the same height and ensures content is fully accessible
    textarea.style.height = `${contentHeight}px`;
    overlay.style.height = `${contentHeight}px`;
    highlightContainer.style.height = `${contentHeight}px`;
  }, [value, lineHeights]); // Re-run when content or line heights change

  /**
   * Sync scroll between editorContent and gutter + line numbers + debug output
   * CRIT-003: Ensures gutter, line numbers, and debug output stay in sync with scrolled content
   * 
   * NOTE: The editorContent div is the scrolling container (not the textarea).
   * When editorContent scrolls, we sync the gutter, line numbers, and debug output to match.
   * The textarea, overlay, and highlight container are all position: absolute
   * inside editorContent, so they scroll automatically with the parent.
   */
  const syncScroll = useCallback(() => {
    if (editorContentRef.current) {
      const scrollTop = editorContentRef.current.scrollTop;
      
      // Sync gutter (error/warning icons)
      if (gutterRef.current) {
        gutterRef.current.scrollTop = scrollTop;
      }
      
      // Sync line numbers
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
      
      // Sync debug output column if visible
      if (debugOutputRef.current) {
        debugOutputRef.current.scrollTop = scrollTop;
      }
    }
  }, []);

  /**
   * Highlight matching text in autocomplete suggestions
   */
  const highlightMatch = useCallback((text: string, query: string) => {
    if (!query) return text;
    
    // Case-insensitive search for the query in the text
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    
    if (index === -1) return text;
    
    // Split into three parts: before, match, after
    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);
    
    return (
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    );
  }, []);

  /**
   * Handle change with autocomplete update
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    
    // Update autocomplete
    setTimeout(() => {
      autocomplete.updateSuggestions();
    }, 0);
  }, [onChange, autocomplete]);

  /**
   * Handle text selection - show convert to variable button (Formula mode only)
   */
  const handleSelect = useCallback(() => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    
    // Update cursor position (use start of selection)
    setCursorPosition(start);
    
    // Only enable convert to variable in Formula mode
    if (mode === 'formula' && start !== end) {
      const selected = textareaRef.current.value.substring(start, end);
      
      // Validate that selection can be converted to a variable
      const isValidSelection = isConvertibleToVariable(selected);
      
      setSelectedText(selected);
      setShowConvertToVariable(isValidSelection);
    } else {
      setShowConvertToVariable(false);
      setSelectedText('');
    }
  }, [mode]);

  /**
   * Check if selected text can be converted to a variable
   * - Must not contain reserved keywords
   * - Must not contain variables ($)
   * - Must not contain attributes (#)
   * - Must be a valid expression (numbers, operators, parentheses, etc.)
   */
  const isConvertibleToVariable = (text: string): boolean => {
    const trimmed = text.trim();
    
    // Empty or whitespace only
    if (!trimmed) return false;
    
    // Contains variables ($)
    if (trimmed.includes('$')) return false;
    
    // Contains attributes (#)
    if (trimmed.includes('#')) return false;
    
    // Check for reserved keywords (case-insensitive)
    const RESERVED_KEYWORDS = [
      'IF', 'ELSEIF', 'ELSE', 'END', 'THEN',
      'RETURN',
      'AND', 'OR', 'NOT',
      'SUM', 'AVG', 'AVERAGE', 'MAX', 'MIN', 'COUNT',
      'ABS', 'ROUND', 'FLOOR', 'CEIL', 'SQRT', 'POW',
      'CONCAT', 'LENGTH', 'UPPER', 'LOWER', 'TRIM',
      'NOW', 'TODAY', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND', 'WEEKDAY',
      'MINUTES_BETWEEN', 'HOURS_BETWEEN', 'DAYS_BETWEEN', 'SECONDS_BETWEEN', 'MILLISECONDS_BETWEEN',
      'TIME_TO_MINUTES', 'TIME_TO_HOURS', 'TIME_TO_SECONDS',
      'DATE_ADD', 'DATE_SUBTRACT', 'IS_WEEKEND', 'IS_WEEKDAY',
      'TRUE', 'FALSE', 'NULL'
    ];
    
    const upperText = trimmed.toUpperCase();
    
    // Check if the entire selection is a reserved keyword
    if (RESERVED_KEYWORDS.includes(upperText)) return false;
    
    // Check if any word in the selection is a reserved keyword
    // Match word boundaries to avoid false positives (e.g., "IFFY" shouldn't match "IF")
    for (const keyword of RESERVED_KEYWORDS) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(trimmed)) return false;
    }
    
    // Must contain at least one valid character (number, operator, parenthesis)
    // This ensures we're not just selecting whitespace or invalid text
    if (!/[0-9+\-*/().>=<]/.test(trimmed)) return false;
    
    return true;
  };

  /**
   * Convert selected text to variable
   */
  const handleConvertToVariable = useCallback(() => {
    if (!textareaRef.current || !selectedText || !onVariablesChange) return;
    
    // Double-check validation before converting
    if (!isConvertibleToVariable(selectedText)) {
      return;
    }
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    
    // Generate variable name from selected text
    const varName = selectedText
      .trim()
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .replace(/^[0-9]/, '_$&'); // Variables can't start with a number
    
    // Create new variable
    const newVariable: Variable = {
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: varName,
      type: 'number', // Default type
      description: `Converted from: ${selectedText}`,
    };
    
    // Add to variables
    onVariablesChange([...variables, newVariable]);
    
    // Replace selected text with variable reference
    const newValue = 
      value.substring(0, start) +
      `$${varName}` +
      value.substring(end);
    
    onChange(newValue);
    
    // Reset selection UI
    setShowConvertToVariable(false);
    setSelectedText('');
    
    // Focus back on editor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = start + varName.length + 1; // +1 for $
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  }, [selectedText, value, variables, onChange, onVariablesChange]);

  /**
   * Handle keyboard events
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+S / Cmd+S for syntax check
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      // Force validation update by extracting line issues
      const issues = extractLineIssues(value, validationResult.errors, validationResult.warnings);
      setLineIssues(issues);
      if (onLineIssuesChange) {
        onLineIssuesChange(issues);
      }
      return;
    }

    // Let autocomplete handle its keys first
    const handled = autocomplete.handleKeyDown(e);
    if (handled) {
      // Handle autocomplete selection
      if ((e.key === 'Enter' || e.key === 'Tab') && autocomplete.suggestions[autocomplete.selectedIndex]) {
        e.preventDefault();
        const result = autocomplete.selectSuggestion(autocomplete.suggestions[autocomplete.selectedIndex]);
        if (result && textareaRef.current) {
          onChange(result.newValue);
          
          // Set cursor position after the inserted text
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = result.cursorPosition;
              textareaRef.current.selectionEnd = result.cursorPosition;
              textareaRef.current.focus();
            }
          }, 0);
        }
      }
      e.preventDefault();
      return;
    }
    
    // Close autocomplete on arrow keys (cursor movement)
    // After the key is processed, check if we're still in autocomplete context
    if (autocomplete.showSuggestions && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      // Delay check until after cursor has moved
      setTimeout(() => {
        autocomplete.updateSuggestions();
      }, 0);
    }

    // Handle keyboard shortcuts
    keyboardShortcuts.handleKeyDown(e);
  }, [value, validationResult, autocomplete, onChange, onLineIssuesChange]);

  /**
   * Handle suggestion selection via click
   */
  const handleSelectSuggestion = useCallback((item: any) => {
    const result = autocomplete.selectSuggestion(item);
    if (result && textareaRef.current) {
      onChange(result.newValue);
      
      // Set cursor position after the inserted text
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = result.cursorPosition;
          textareaRef.current.selectionEnd = result.cursorPosition;
          textareaRef.current.focus();
        }
      }, 0);
    }
  }, [autocomplete, onChange]);

  /**
   * Render syntax-highlighted overlay
   */
  const renderHighlightedContent = useCallback((text: string) => {
    if (!text) return '';
    // Use the new syntax highlighting hook
    return highlightSyntax(text);
  }, [highlightSyntax]);

  /**
   * Get ghost text position
   * Returns pixel coordinates for positioning ghost text at cursor
   * ALIGNED WITH HIGHLIGHT OFFSET CALCULATION
   */
  const getGhostTextPosition = useCallback(() => {
    if (!inlineTypeahead.ghostText || !textareaRef.current) {
      return null;
    }

    const coords = getTextareaCaretPosition(
      textareaRef.current,
      textareaRef.current.selectionStart
    );
    
    // Calculate which line the cursor is on
    const textBeforeCursor = value.substring(0, textareaRef.current.selectionStart);
    const lineNumber = textBeforeCursor.split('\n').length;
    
    // Calculate cumulative wrap offset from all lines ABOVE cursor line
    // This matches the highlight offset calculation
    const baseLineHeight = 22.4;
    let wrapOffset = 0;
    
    for (let i = 1; i < lineNumber; i++) {
      const aboveLineData = lineHeights.find(lh => lh.lineNumber === i);
      if (aboveLineData) {
        const aboveMultiplier = Math.round(aboveLineData.height / baseLineHeight);
        if (aboveMultiplier > 1) {
          // Add extra height from wrapped lines (multiplier - 1) * baseLineHeight
          wrapOffset += (aboveMultiplier - 1) * baseLineHeight;
        }
      }
    }

    return {
      left: coords.left,
      top: coords.top + wrapOffset
    };
  }, [inlineTypeahead.ghostText, value, lineHeights]);

  /**
   * Render inline typeahead ghost text
   * Shows suggestion text at cursor position
   */
  const renderTypeaheadGhost = useCallback(() => {
    if (!inlineTypeahead.ghostText || !textareaRef.current) {
      return null;
    }

    const cursorPos = textareaRef.current.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPos);
    const textAfterCursor = value.substring(cursorPos);

    // Create HTML with ghost text
    const beforeHtml = highlightSyntax(textBeforeCursor);
    const ghostCompletion = inlineTypeahead.ghostText.completion;
    const afterHtml = highlightSyntax(textAfterCursor);

    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: beforeHtml }} />
        <span className={styles.ghostText}>{ghostCompletion}</span>
        <span dangerouslySetInnerHTML={{ __html: afterHtml }} />
      </>
    );
  }, [value, inlineTypeahead.ghostText, highlightSyntax]);

  /**
   * Get validation icon based on severity
   */
  const getValidationIcon = (severity: 'error' | 'warning' | 'info' | 'success') => {
    switch (severity) {
      case 'error':
        return <AlertCircle size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      case 'info':
        return <Info size={16} />;
      case 'success':
        return <CheckCircle size={16} />;
    }
  };

  /**
   * Update autocomplete position when suggestions show
   * Detects available space and positions above/below accordingly
   * Also calculates dynamic max-height to show 1.5-3.5 items
   */
  useEffect(() => {
    if (autocomplete.showSuggestions && textareaRef.current && editorContentRef.current) {
      const coords = getTextareaCaretPosition(
        textareaRef.current,
        textareaRef.current.selectionStart
      );
      
      const editorContentRect = editorContentRef.current.getBoundingClientRect();
      const itemCount = autocomplete.suggestions.length;
      
      // Constants for sizing (matching CSS)
      const HEADER_HEIGHT = 37; // Header + border
      const FOOTER_HEIGHT = 30; // Footer + border  
      const ITEM_HEIGHT = 64; // Approximate height per item (label + description + padding)
      const PADDING = 8;
      const OFFSET_BELOW = 24; // Space below cursor
      const OFFSET_ABOVE = 4; // Space above cursor
      
      // Calculate available space below and above cursor
      const cursorAbsoluteY = coords.top;
      const spaceBelow = editorContentRect.bottom - cursorAbsoluteY - OFFSET_BELOW;
      const spaceAbove = cursorAbsoluteY - editorContentRef.current.scrollTop - OFFSET_ABOVE;
      
      // Calculate ideal height for current number of items
      // Min: 1.5 items, Max: 3.5 items
      const minVisibleItems = 1.5;
      const maxVisibleItems = 3.5;
      const targetItems = Math.max(minVisibleItems, Math.min(maxVisibleItems, itemCount));
      const idealListHeight = targetItems * ITEM_HEIGHT;
      const idealTotalHeight = idealListHeight + HEADER_HEIGHT + FOOTER_HEIGHT;
      
      // Determine placement and calculate max height
      let y: number;
      let maxHeight: number;
      let placeAbove = false;
      
      if (spaceBelow >= idealTotalHeight) {
        // Enough space below - place below
        y = coords.top + OFFSET_BELOW;
        maxHeight = Math.min(idealTotalHeight, spaceBelow - PADDING);
        placeAbove = false;
      } else if (spaceAbove >= idealTotalHeight) {
        // Not enough space below but enough above - place above
        y = coords.top - idealTotalHeight - OFFSET_ABOVE;
        maxHeight = Math.min(idealTotalHeight, spaceAbove - PADDING);
        placeAbove = true;
      } else {
        // Not enough space either way - use larger space
        if (spaceBelow > spaceAbove) {
          y = coords.top + OFFSET_BELOW;
          maxHeight = spaceBelow - PADDING;
          placeAbove = false;
        } else {
          maxHeight = spaceAbove - PADDING;
          y = coords.top - maxHeight - OFFSET_ABOVE;
          placeAbove = true;
        }
      }
      
      setAutocompletePosition({ x: coords.left, y, placeAbove, maxHeight });
    } else {
      setAutocompletePosition(null);
    }
  }, [autocomplete.showSuggestions, autocomplete.query, autocomplete.suggestions.length]);

  /**
   * Update line numbers based on content
   */
  useEffect(() => {
    const lines = value.split('\n');
    const newLineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);
    setLineNumbers(newLineNumbers);
  }, [value]);

  /**
   * Auto-scroll editor when debug highlight changes
   */
  useEffect(() => {
    if (debugHighlight && textareaRef.current) {
      scrollToLine(textareaRef.current, debugHighlight.currentLine, LINE_HEIGHT_PX);
    }
  }, [debugHighlight]);

  /**
   * Auto-scroll editor when error highlight changes (CRIT-002)
   */
  useEffect(() => {
    if (errorHighlight && textareaRef.current) {
      scrollToLine(textareaRef.current, errorHighlight.line, LINE_HEIGHT_PX);
    }
  }, [errorHighlight]);

  /**
   * Real-time warning detection (debounced)
   * Runs validation on value change and updates parent with warning highlights
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      // Skip if no callback provided or empty formula
      if (!onWarningHighlightsChange) return;
      
      // Clear warnings for empty formula
      if (!value.trim()) {
        onWarningHighlightsChange([]);
        return;
      }
      
      // Run validation
      const result = validate(value);
      
      // Extract warnings with line numbers
      if (result.warnings.length > 0) {
        const warnings = extractWarningLines(value, result.warnings);
        onWarningHighlightsChange(warnings);
      } else {
        onWarningHighlightsChange([]);
      }
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [value, validate, onWarningHighlightsChange]);

  /**
   * Real-time line issues tracking (debounced)
   * Extracts errors and warnings with line numbers for gutter icons and error list
   * Suppressed while typing in strings (verbalization autocomplete active)
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clear issues for empty formula or while typing in strings
      if (!value.trim() || suppressValidation) {
        setLineIssues([]);
        if (onLineIssuesChange) {
          onLineIssuesChange([]);
        }
        return;
      }
      
      // Extract line issues from validation result
      const issues = extractLineIssues(value, validationResult.errors, validationResult.warnings);
      setLineIssues(issues);
      
      // Notify parent if callback provided
      if (onLineIssuesChange) {
        onLineIssuesChange(issues);
      }
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [value, validationResult, onLineIssuesChange, suppressValidation]);

  return (
    <div className={`${styles.formulaEditor} ${className || ''}`}>
      {/* Formula Editor Area */}
      <div className={styles.editorSection}>
        <div className={styles.editorHeader}>
          <div className={styles.editorLabel}>Formula Logic</div>
          {/* Only show convert to variable button in Formula mode */}
          {mode === 'formula' && showConvertToVariable && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleConvertToVariable}
              className={styles.convertButton}
            >
              <Wand2 size={14} />
              <span>Convert "{selectedText}" to Variable</span>
            </Button>
          )}
        </div>

        {/* Validation Banner - Hidden while typing in strings */}
        {!suppressValidation && value.trim() && !validationResult.valid && validationResult.errors.length > 0 && (
          <div className={`${styles.validationBanner} ${styles.error}`}>
            <div className={styles.validationIcon}>
              {getValidationIcon('error')}
            </div>
            <div className={styles.validationContent}>
              <div className={styles.validationMessage}>
                {getErrorSummary(validationResult)}
              </div>
              {validationResult.errors.length > 0 && (
                <ul className={styles.validationDetails}>
                  {validationResult.errors.slice(0, 3).map((issue, index) => (
                    <li key={index}>{issue.message}</li>
                  ))}
                  {validationResult.errors.length > 3 && (
                    <li>...and {validationResult.errors.length - 3} more</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Warning Banner (only if no errors) - Hidden while typing in strings */}
        {!suppressValidation && value.trim() && validationResult.valid && validationResult.warnings.length > 0 && (
          <div className={`${styles.validationBanner} ${styles.warning}`}>
            <div className={styles.validationIcon}>
              {getValidationIcon('warning')}
            </div>
            <div className={styles.validationContent}>
              <div className={styles.validationMessage}>
                {validationResult.warnings.length} warning{validationResult.warnings.length > 1 ? 's' : ''}
              </div>
              <ul className={styles.validationDetails}>
                {validationResult.warnings.slice(0, 2).map((issue, index) => (
                  <li key={index}>{issue.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* NEW: Editor Container wrapping gutter + line numbers + content */}
        <div 
          ref={editorRef}
          className={`${styles.editorContainer} ${isFocused ? styles.focused : ''}`}
        >
          {/* Gutter column for error/warning icons (CRIT-002) - leftmost - only show when issues exist */}
          {lineIssues.length > 0 && (
            <div
              ref={gutterRef}
              className={styles.gutter}
              aria-hidden="true"
            >
              <TooltipProvider>
                {lineNumbers.map(line => {
                  // Check if this line has issues (CRIT-002)
                  const gutterData = getGutterIconData(line, lineIssues);
                  
                  // Find line height data for dynamic wrap multiplier
                  const lineHeightData = lineHeights.find(lh => lh.lineNumber === line);
                  const baseLineHeight = 22.4;
                  const wrapMultiplier = lineHeightData ? Math.round(lineHeightData.height / baseLineHeight) : 1;
                  
                  return (
                    <div 
                      key={line}
                      className={styles.gutterCell}
                      style={{
                        '--line-wrap-multiplier': wrapMultiplier
                      } as React.CSSProperties}
                    >
                      {gutterData && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={styles.gutterIcon}>
                              {gutterData.type === 'error' ? (
                                <XCircle size={14} className={styles.errorIcon} />
                              ) : (
                                <AlertTriangle size={14} className={styles.warningIcon} />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {gutterData.messages.length === 1 ? (
                              <p>{gutterData.messages[0]}</p>
                            ) : (
                              <ul className={styles.errorList}>
                                {gutterData.messages.map((msg, idx) => (
                                  <li key={idx}>{msg}</li>
                                ))}
                              </ul>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </TooltipProvider>
            </div>
          )}

          {/* Line numbers column */}
          <div
            ref={lineNumbersRef}
            className={styles.lineNumbers}
            aria-hidden="true"
          >
            {lineNumbers.map(line => {
              // Check if this line has issues (CRIT-002)
              const gutterData = getGutterIconData(line, lineIssues);
              const hasIssue = gutterData !== null;
              const issueType = gutterData?.type;
              
              // Find line height data for dynamic wrap multiplier
              const lineHeightData = lineHeights.find(lh => lh.lineNumber === line);
              const baseLineHeight = 22.4;
              const wrapMultiplier = lineHeightData ? Math.round(lineHeightData.height / baseLineHeight) : 1;
              
              return (
                <div 
                  key={line} 
                  className={`${styles.lineNumber} ${hasIssue ? styles[`lineNumber${issueType === 'error' ? 'Error' : 'Warning'}`] : ''}`}
                  style={{
                    '--line-wrap-multiplier': wrapMultiplier
                  } as React.CSSProperties}
                >
                  {line}
                </div>
              );
            })}
          </div>

          {/* Content area - textarea + overlays */}
          <div
            ref={editorContentRef}
            className={styles.editorContent}
            onScroll={syncScroll}
          >
            {/* Syntax highlighting overlay - ALWAYS visible */}
            <div
              ref={overlayRef}
              className={styles.overlay}
              aria-hidden="true"
            >
              <pre 
                className={styles.overlayContent}
                dangerouslySetInnerHTML={{ __html: highlightSyntax(value) }}
              />
            </div>

            {/* Ghost text positioned at cursor - ONLY shows the suggestion */}
            {inlineTypeahead.ghostText && getGhostTextPosition() && (
              <span
                className={styles.ghostTextAbsolute}
                style={{
                  left: `${getGhostTextPosition()!.left}px`,
                  top: `${getGhostTextPosition()!.top}px`,
                }}
              >
                {inlineTypeahead.ghostText.completion}
              </span>
            )}

            {/* UNIFIED HIGHLIGHT CONTAINER - Handles all line highlights */}
            <div
              ref={highlightContainerRef}
              className={styles.highlightContainer}
              aria-hidden="true"
            >
              {/* Error line highlights - Uses measured line heights for perfect alignment */}
              {errorHighlight && (() => {
                const lineHeightData = lineHeights.find(lh => lh.lineNumber === errorHighlight.line);
                // Only render if we have measured data
                if (!lineHeightData) return null;
                
                return (
                  <div 
                    className={styles.errorLineHighlight}
                    style={{
                      '--highlight-top': `${lineHeightData.top}px`,
                      '--highlight-height': `${lineHeightData.height}px`
                    } as React.CSSProperties}
                  />
                );
              })()}

              {/* Warning line highlights - Uses measured line heights for perfect alignment */}
              {warningHighlights && warningHighlights.map((warning, idx) => {
                const lineHeightData = lineHeights.find(lh => lh.lineNumber === warning.line);
                // Only render if we have measured data
                if (!lineHeightData) return null;
                
                return (
                  <div 
                    key={`warning-${idx}`}
                    className={styles.warningLineHighlight}
                    style={{
                      '--highlight-top': `${lineHeightData.top}px`,
                      '--highlight-height': `${lineHeightData.height}px`
                    } as React.CSSProperties}
                  />
                );
              })}

              {/* Debug current line highlight - Uses measured line heights for perfect alignment */}
              {debugHighlight && (() => {
                const lineHeightData = lineHeights.find(lh => lh.lineNumber === debugHighlight.currentLine);
                // Only render if we have measured data
                if (!lineHeightData) return null;
                
                return (
                  <div 
                    className={styles.currentLineHighlight}
                    style={{
                      '--highlight-top': `${lineHeightData.top}px`,
                      '--highlight-height': `${lineHeightData.height}px`
                    } as React.CSSProperties}
                  />
                );
              })()}

              {/* Debug ghost values - Absolute positioned badges using measured line heights */}
              {debugHighlight?.ghostValues && Array.from(debugHighlight.ghostValues).map(([line, valueInfo]) => {
                const lineHeightData = lineHeights.find(lh => lh.lineNumber === line);
                // Only render ghost value if we have valid line height data for proper alignment
                if (!lineHeightData) return null;
                
                const isCurrentStep = line === debugHighlight.currentLine;
                return (
                  <GhostValue
                    key={`ghost-${line}`}
                    line={line}
                    lineTop={lineHeightData.top}
                    value={valueInfo.value}
                    type={valueInfo.type}
                    description={valueInfo.description}
                    isCurrent={isCurrentStep}
                  />
                );
              })}

              {/* Debug branch indicators - Absolute positioned using measured line heights */}
              {debugHighlight?.branchInfo && debugHighlight.branchInfo.map((branch, i) => {
                const lineHeightData = lineHeights.find(lh => lh.lineNumber === branch.line);
                // Only render branch indicator if we have valid line height data for proper alignment
                if (!lineHeightData) return null;
                
                return (
                  <BranchIndicator
                    key={`branch-${i}`}
                    line={branch.line}
                    lineTop={lineHeightData.top}
                    lineHeight={lineHeightData.height}
                    taken={branch.taken}
                    type={branch.type}
                    conditionResult={branch.conditionResult}
                  />
                );
              })}
            </div>

            {/* Actual textarea */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onSelect={handleSelect}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                // Close autocomplete when losing focus
                autocomplete.closeSuggestions();
              }}
              readOnly={readOnly}
              placeholder={placeholder}
              className={styles.textarea}
              spellCheck={false}
            />

            {/* Autocomplete dropdown */}
            {autocomplete.showSuggestions && autocompletePosition && (
              <div 
                ref={autocompleteRef}
                className={styles.autocomplete}
                style={{
                  left: `${autocompletePosition.x}px`,
                  top: `${autocompletePosition.y}px`,
                  maxHeight: autocompletePosition.maxHeight ? `${autocompletePosition.maxHeight}px` : 'auto',
                }}
              >
                {/* Header */}
                <div className={styles.autocompleteHeader}>
                  {autocomplete.activeTrigger === '$' ? 'Variables' : autocomplete.activeTrigger === '#' ? 'Attributes' : autocomplete.activeTrigger === "'" ? 'Verbalizations' : 'Keywords'}
                  {autocomplete.query && (
                    <span className={styles.autocompleteQuery}>: {autocomplete.query}</span>
                  )}
                </div>

                {/* Suggestions List */}
                <ul className={styles.autocompleteList}>
                  {autocomplete.suggestions.map((item, index) => {
                    // Determine type based on active trigger
                    const itemType = autocomplete.activeTrigger === '$' ? 'variable' 
                      : autocomplete.activeTrigger === '#' ? 'attribute' 
                      : 'keyword';
                    
                    // Get the query to highlight (remove trigger character if present)
                    const query = autocomplete.query || '';
                    
                    return (
                      <li
                        key={item.id}
                        className={`${styles.autocompleteItem} ${
                          index === autocomplete.selectedIndex ? styles.selected : ''
                        }`}
                        onMouseDown={(e) => {
                          // Prevent blur from closing autocomplete before click registers
                          e.preventDefault();
                        }}
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        <div className={`${styles.autocompleteItemLabel} ${styles[itemType]}`}>
                          {highlightMatch(item.label, query)}
                        </div>
                        {item.description && (
                          <div className={styles.autocompleteItemDescription}>{item.description}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Footer */}
                <div className={styles.autocompleteFooter}>
                  <kbd>↑↓</kbd> Navigate · <kbd>Enter</kbd> Select · <kbd>Esc</kbd> Close
                </div>
              </div>
            )}
          </div>

          {/* Debug Output Column - Only visible during debugging */}
          {/* Phase 2: Now resizable with drag handle */}
          {debugHighlight && (
            <>
              {/* Resize handle for debug output column */}
              <ResizeHandle
                onResize={handleDebugOutputResize}
                minWidth={30}
                maxWidth={200}
              />
              
              {/* Debug output column showing computed values */}
              <DebugOutputColumn
                ref={debugOutputRef}
                className={styles.debugOutputWrapper}
                lineNumbers={lineNumbers}
                lineHeights={lineHeights}
                debugValues={debugHighlight.debugOutputValues || []}
                width={debugOutputWidth}
                currentLine={debugHighlight.currentLine}
                isFinalStep={debugHighlight.currentStep === (debugHighlight.totalSteps ? debugHighlight.totalSteps - 1 : -1)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}