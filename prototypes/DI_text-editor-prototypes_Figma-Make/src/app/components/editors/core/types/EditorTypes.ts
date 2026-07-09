/**
 * Core Editor Type Definitions
 * 
 * Base interfaces and types used across all editors.
 * Provides a unified foundation for BAL, Formula, Function, and other editors.
 */

/**
 * Editor type identifier
 */
export type EditorType = 'bal' | 'formula' | 'function' | 'variable' | 'markdown' | 'richtext';

/**
 * Base props for all editor components
 */
export interface BaseEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}

/**
 * Autocomplete trigger configuration
 * Defines what character triggers autocomplete and what suggestions to show
 * 
 * @example
 * {
 *   char: '$',
 *   provider: () => variableList,
 *   caseSensitive: false
 * }
 */
export interface TriggerConfig {
  /** Character that triggers autocomplete (e.g., '$', '#', '@') */
  char: string;
  /** Function that returns available suggestions */
  provider: () => AutocompleteItem[];
  /** Whether matching should be case-sensitive (default: false) */
  caseSensitive?: boolean;
}

/**
 * Item in autocomplete suggestion list
 */
export interface AutocompleteItem {
  /** Unique identifier */
  id: string;
  /** Display text (what gets inserted) */
  label: string;
  /** Optional description shown in dropdown */
  description?: string;
  /** Optional category for grouping */
  category?: string;
  /** Optional text to insert (if different from label) */
  insertText?: string;
}

/**
 * Autocomplete provider function
 * Returns suggestions based on a query string
 */
export interface AutocompleteProvider {
  /** Trigger character (e.g., '$', '#') */
  trigger: string;
  /** Function that returns filtered suggestions based on query */
  getSuggestions: (query: string) => AutocompleteItem[];
}

/**
 * Position for autocomplete dropdown
 */
export interface AutocompletePosition {
  top: number;
  left: number;
}

/**
 * Syntax highlighting rule
 * Maps a pattern to a CSS class for styling
 */
export interface SyntaxRule {
  /** Rule name (for debugging/documentation) */
  name: string;
  /** Regular expression to match text */
  pattern: RegExp;
  /** CSS class to apply (should map to CSS variable) */
  cssClass: string;
  /** Optional priority for overlapping matches (higher = wins) */
  priority?: number;
}

/**
 * Configuration for syntax highlighting
 */
export interface SyntaxConfig {
  rules: SyntaxRule[];
  /** Whether to apply multiple rules to same text */
  allowOverlap?: boolean;
}

/**
 * Result of validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

/**
 * Validation error
 */
export interface ValidationError {
  /** Line number (1-based) */
  line: number;
  /** Column number (1-based) */
  column: number;
  /** Error message */
  message: string;
  /** Severity level */
  severity: 'error' | 'critical';
}

/**
 * Validation warning
 */
export interface ValidationWarning {
  /** Line number (1-based) */
  line: number;
  /** Column number (1-based) */
  column: number;
  /** Warning message */
  message: string;
  /** Severity level */
  severity: 'warning' | 'info';
}

/**
 * Variable/Entity definition
 * Used by Formula, Function, and other code editors
 */
export interface Variable {
  /** Unique identifier */
  id: string;
  /** Variable name (used in editor with $ prefix) */
  name: string;
  /** Data type */
  type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'time' | 'list' | 'object';
  /** Optional data source mapping (for linking to data model) */
  dataSource?: string;
  /** Optional human-readable description */
  description?: string;
  /** Can caller override the data source when invoking? (only relevant if dataSource is set) */
  allowOverride?: boolean;
  /** Is this variable defined in the editor (left side of =)? If true, it's a result, not a parameter */
  definedInEditor?: boolean;
  /** Date format for date-type variables (default: 'YYYY-MM-DD') */
  dateFormat?: DateFormat;
  /** Time format for time-type variables (default: 'HH:MM:SS') */
  timeFormat?: TimeFormat;
  /** Optional natural language alias (e.g., "customer name" for $customerName) */
  verbalization?: string;
}

/**
 * Common date format options
 */
export type DateFormat = 
  | 'YYYY-MM-DD'        // ISO 8601: 2025-10-25
  | 'MM/DD/YYYY'        // US: 10/25/2025
  | 'DD/MM/YYYY'        // European: 25/10/2025
  | 'DD-MMM-YYYY'       // Abbreviated: 25-Oct-2025
  | 'MMMM DD, YYYY'     // Long: October 25, 2025
  | 'YYYY/MM/DD';       // Japanese: 2025/10/25

/**
 * Date format metadata for UI display
 */
export interface DateFormatOption {
  value: DateFormat;
  label: string;
  example: string;
}

/**
 * Available date format options with examples
 */
export const DATE_FORMAT_OPTIONS: DateFormatOption[] = [
  { value: 'YYYY-MM-DD', label: 'ISO (YYYY-MM-DD)', example: '2025-10-25' },
  { value: 'MM/DD/YYYY', label: 'US (MM/DD/YYYY)', example: '10/25/2025' },
  { value: 'DD/MM/YYYY', label: 'European (DD/MM/YYYY)', example: '25/10/2025' },
  { value: 'DD-MMM-YYYY', label: 'Abbreviated (DD-MMM-YYYY)', example: '25-Oct-2025' },
  { value: 'MMMM DD, YYYY', label: 'Long (MMMM DD, YYYY)', example: 'October 25, 2025' },
  { value: 'YYYY/MM/DD', label: 'Japanese (YYYY/MM/DD)', example: '2025/10/25' },
];

/**
 * Common time format options
 */
export type TimeFormat = 
  | 'HH:MM:SS'          // Hours, minutes, seconds: 02:30:45
  | 'HH:MM'             // Hours and minutes: 02:30
  | 'minutes'           // Total minutes: 150
  | 'hours'             // Total hours (decimal): 2.5
  | 'seconds'           // Total seconds: 9045
  | 'milliseconds';     // Total milliseconds: 9045000

/**
 * Time format metadata for UI display
 */
export interface TimeFormatOption {
  value: TimeFormat;
  label: string;
  example: string;
}

/**
 * Available time format options with examples
 * Internal representation is always milliseconds
 */
export const TIME_FORMAT_OPTIONS: TimeFormatOption[] = [
  { value: 'HH:MM:SS', label: 'HH:MM:SS', example: '02:30:45' },
  { value: 'HH:MM', label: 'HH:MM', example: '02:30' },
  { value: 'minutes', label: 'Minutes', example: '150' },
  { value: 'hours', label: 'Hours (decimal)', example: '2.5' },
  { value: 'seconds', label: 'Seconds', example: '9045' },
  { value: 'milliseconds', label: 'Milliseconds', example: '9045000' },
];

/**
 * Attribute definition (for # references)
 * Used by Formula editor for data model attributes
 */
export interface Attribute {
  /** Unique identifier */
  id: string;
  /** Attribute path (e.g., 'customer.age') */
  path: string;
  /** Data type */
  type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'time';
  /** Optional human-readable description */
  description?: string;
}

/**
 * Threshold definition for numeric formulas
 * Categorizes numeric output into labeled ranges with visual indicators
 * 
 * @example
 * {
 *   id: 'thresh-1',
 *   min: 740,
 *   max: 799,
 *   label: 'Very Good',
 *   color: '#24A148',
 *   severity: 'success',
 *   isOpenEnded: false
 * }
 */
export interface Threshold {
  /** Unique identifier */
  id: string;
  /** Minimum value (inclusive) */
  min: number;
  /** Maximum value (inclusive), or null for open-ended (≥ min) */
  max: number | null;
  /** Category label (e.g., "Excellent", "High Risk") */
  label: string;
  /** CSS color value or variable reference */
  color: string;
  /** Severity level for visual indicators */
  severity: 'error' | 'warning' | 'info' | 'success';
  /** Is this an open-ended range? (e.g., "≥ 800") */
  isOpenEnded?: boolean;
}

/**
 * Result of threshold evaluation
 * Returned when evaluating a formula with thresholds
 */
export interface ThresholdEvaluation {
  /** The numeric value from formula execution */
  value: number;
  /** The matching threshold category label */
  category: string;
  /** The matching threshold severity */
  severity: 'error' | 'warning' | 'info' | 'success';
  /** The matching threshold color */
  color: string;
  /** The matched threshold object */
  threshold: Threshold;
}

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** Keyboard key(s) */
  key: string;
  /** Modifier keys */
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  };
  /** Action to perform */
  action: () => void;
  /** Description for documentation */
  description: string;
}

/**
 * Editor state interface
 * Unified state management for all editors
 */
export interface EditorState {
  /** Current content value */
  value: string;
  /** Cursor position */
  cursorPosition: number;
  /** Selection range (if any) */
  selection?: {
    start: number;
    end: number;
  };
  /** Whether editor is focused */
  isFocused: boolean;
  /** Whether content has unsaved changes */
  isDirty: boolean;
}

/**
 * Editor configuration
 * Common configuration options for all editors
 */
export interface EditorConfig {
  /** Enable/disable autocomplete */
  autocomplete?: boolean;
  /** Enable/disable syntax highlighting */
  syntaxHighlighting?: boolean;
  /** Enable/disable validation */
  validation?: boolean;
  /** Enable/disable line numbers */
  lineNumbers?: boolean;
  /** Tab size in spaces */
  tabSize?: number;
  /** Use spaces instead of tabs */
  insertSpaces?: boolean;
  /** Enable/disable word wrap */
  wordWrap?: boolean;
}

/**
 * Bidirectional mapping between variable names and verbalizations
 * Enables quick lookup in both directions for parser resolution
 * 
 * @example
 * {
 *   variableToVerbalization: Map { '$customerName' => 'customer name' },
 *   verbalizationToVariable: Map { 'customer name' => '$customerName' }
 * }
 */
export interface VerbalizationMap {
  /** Map from variable name to verbalization */
  variableToVerbalization: Map<string, string>;
  /** Map from verbalization to variable name */
  verbalizationToVariable: Map<string, string>;
}

/**
 * Validation result for verbalization uniqueness check
 */
export interface VerbalizationValidation {
  /** Is the verbalization valid? */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Conflicting variable name (if duplicate) */
  conflictingVariable?: string;
}