/**
 * FormulaTestPanel - Formula Testing Interface
 * 
 * Allows testing formula output by populating variables and attributes with test values.
 * Displays the evaluated result with threshold visualization if applicable.
 * 
 * Features:
 * - Distinguishes between defined and testable variables
 * - Extracts literal options from formula comparisons (all types)
 * - Type inheritance from linked attributes
 * - Smart input types based on data types
 * - Bidirectional variable-attribute syncing
 * - Step-through debugger with execution trace
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 * Replace shadcn/ui components with Carbon equivalents when converting.
 */

import { useState, useMemo, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Play, AlertCircle, Calendar as CalendarIcon, Lock, Bug } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Button } from '../../../ui/button';
import { Switch } from '../../../ui/switch';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { ThresholdBadge } from './ThresholdBadge';
import { DebugControls } from './DebugControls';
import { DebugVariableInspector } from './DebugVariableInspector';
import { NestedAttributeInput } from './NestedAttributeInput';
import { useThresholdEvaluation, useDebugger } from './hooks';
import { getTestableVariables, getReferencedAttributes, extractStringOptions, extractOptionsForVariable } from '../../../../utils/formulaTestUtils';
import { validateTestValue } from '../../../../utils/formulaTestUtils';
import { extractDefinedVariables, extractParameterVariables } from '../../../../utils/formulaParser';
import { formatDate, parseFormattedDate } from '../../../../utils/dateFormatting';
import { formatTime, parseFormattedTime } from '../../../../utils/timeFormatting';
import { EvaluationEngine } from '../../../../services/evaluationEngine';
import { TracingEvaluator } from '../../../../services/evaluationEngine/debugger';
import { TimeValue } from '../../../../services/evaluationEngine/types/TypeSystem';
import { buildDebugHighlight, scrollToLine } from '../../../../utils/debugHighlighting';
import { getErrorLine } from '../../../../services/evaluationEngine/errors/EvaluationError';
import { buildVerbalizationMap } from '../../../../utils/verbalizationUtils';
import type { AttributeDefinition, NestedAttributeNode } from '../../balSupport/balAttributeUtils';
import type { Variable, Threshold } from '../../core/types';
import type { ExecutionTrace } from '../../../../services/evaluationEngine/debugger';
import type { DebugHighlight } from '../../../../utils/debugHighlighting';
import { ErrorWarningList, type LineIssue } from './ErrorWarningList';
import styles from './FormulaTestPanel.module.css';

/**
 * TODO: Temporarily inlined utility functions - should use imports once bundler issue is resolved
 */

/**
 * BAL keywords to exclude from attribute detection
 */
const BAL_KEYWORDS = new Set([
  // Control flow
  'if', 'then', 'else', 'elsif', 'elseif', 'otherwise', 'end',
  // Statements
  'set', 'to', 'define', 'function', 'return',
  // Iteration
  'for', 'each', 'in', 'while', 'do',
  // Logical
  'and', 'or', 'not',
  // Predicates
  'is', 'null', 'empty', 'true', 'false',
  // Common natural language words
  'the', 'of', 'a', 'an',
]);

/**
 * Check if a word is a BAL keyword
 */
function isBALKeyword(word: string): boolean {
  return BAL_KEYWORDS.has(word.toLowerCase());
}

/**
 * Extract attributes referenced in BAL code
 */
function extractBALAttributes(code: string): string[] {
  const attributes = new Set<string>();
  
  console.log('[BAL Extraction] Starting extraction from code:', code.substring(0, 100) + '...');
  
  // Pattern 1: Dot-notation attribute references (e.g., employee.'years of service', applicant.age)
  const dotNotationPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*|\.'[^']+'))+\b/g;
  
  const dotMatches = code.matchAll(dotNotationPattern);
  for (const match of dotMatches) {
    const attr = match[0];
    
    // Exclude patterns that start with keywords
    const firstPart = attr.split('.')[0];
    if (!isBALKeyword(firstPart)) {
      // Clean up quoted parts: employee.'years of service' → employee.years of service
      const cleanAttr = attr.replace(/'/g, '');
      console.log('[BAL Extraction] Pattern 1 found:', cleanAttr);
      attributes.add(cleanAttr);
    }
  }
  
  // Pattern 2: "X of the Y" pattern (e.g., "credit score of the applicant" → "applicant.credit score")
  // This is a common BAL pattern for attribute access
  const ofPattern = /([a-z\s]+)\s+of\s+the\s+([a-z]+)/gi;
  
  const ofMatches = code.matchAll(ofPattern);
  for (const match of ofMatches) {
    const attributeName = match[1].trim();
    const objectName = match[2].trim();
    
    console.log('[BAL Extraction] Pattern 2 match:', { attributeName, objectName });
    
    // Skip if object name is a keyword (attribute name can be multi-word)
    if (!isBALKeyword(objectName)) {
      // Construct as object.attribute
      const fullPath = `${objectName}.${attributeName}`;
      console.log('[BAL Extraction] Pattern 2 added:', fullPath);
      attributes.add(fullPath);
    } else {
      console.log('[BAL Extraction] Pattern 2 skipped (keyword):', objectName);
    }
  }
  
  // Pattern 3: "the X" followed by a verb (likely a data model object reference)
  // E.g., "the applicant", "the loan" when used as subject
  const thePattern = /\bthe\s+([a-z]+)\b/gi;
  
  const theMatches = code.matchAll(thePattern);
  for (const match of theMatches) {
    const term = match[1].trim();
    
    // Only include if it's not a keyword and appears to be a noun (not too short)
    if (!isBALKeyword(term) && term.length > 3) {
      // Add as standalone object (user can populate its properties)
      console.log('[BAL Extraction] Pattern 3 found:', term);
      attributes.add(term);
    }
  }
  
  const result = Array.from(attributes).sort();
  console.log('[BAL Extraction] Final extracted attributes:', result);
  return result;
}

/**
 * Set nested value in object using dot-notation path
 * Creates intermediate objects as needed
 * Returns new object (immutable)
 */
function setNestedValue(obj: any, path: string, value: any): any {
  const newObj = { ...obj };
  const parts = path.split('.');
  let current: any = newObj;
  
  // Navigate to parent, creating objects as needed
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    } else {
      // Clone intermediate objects for immutability
      current[parts[i]] = { ...current[parts[i]] };
    }
    current = current[parts[i]];
  }
  
  // Set leaf value
  current[parts[parts.length - 1]] = value;
  
  return newObj;
}

/**
 * Flatten nested attribute values to dot-notation for evaluation engine
 */
function flattenAttributeValues(nested: any): Record<string, any> {
  const flat: Record<string, any> = {};
  
  function traverse(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        traverse(value, currentPath);
      } else {
        flat[currentPath.join('.')] = value;
      }
    }
  }
  
  traverse(nested);
  return flat;
}

/**
 * Error highlight information for editor line highlighting
 */
export interface ErrorHighlight {
  /** Line number (1-indexed) where error occurred */
  line: number;
  /** Optional column number */
  column?: number;
  /** Error message */
  message: string;
}

/**
 * Warning highlight information for editor line highlighting
 */
export interface WarningHighlight {
  /** Line number (1-indexed) where warning occurred */
  line: number;
  /** Optional column number */
  column?: number;
  /** Warning message */
  message: string;
  /** Warning code (e.g., "DIVISION_BY_ZERO") */
  code?: string;
}

/**
 * Convert trace step variables record to separate Maps for variables and attributes
 * Variables are stored without prefix, attributes are stored with # prefix
 */
function convertRecordToMaps(record: Record<string, any>): { variables: Map<string, any>; attributes: Map<string, any> } {
  const variables = new Map<string, any>();
  const attributes = new Map<string, any>();
  
  for (const [key, value] of Object.entries(record)) {
    if (key.startsWith('#')) {
      // Attribute - remove # prefix
      attributes.set(key.substring(1), value);
    } else {
      // Variable
      variables.set(key, value);
    }
  }
  
  return { variables, attributes };
}

/**
 * Parse flat dot-notation attributes into nested object structure
 * TODO: This is temporarily inlined - should use import from balAttributeUtils once bundler issue is resolved
 */
function parseAttributeHierarchy(
  attributeDefs: AttributeDefinition[]
): Record<string, NestedAttributeNode> {
  const root: Record<string, any> = {};
  
  attributeDefs.forEach(def => {
    const parts = def.path.split('.');
    let current = root;
    
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      
      if (isLeaf) {
        // Leaf node - actual attribute with type
        current[part] = {
          type: def.type,
          description: def.description,
          defaultValue: def.defaultValue,
          unit: def.unit,
          fullPath: def.path
        };
      } else {
        // Intermediate node - nested object
        if (!current[part] || typeof current[part] !== 'object' || current[part].type) {
          // Don't overwrite leaf nodes
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  return root;
}

export interface FormulaTestPanelProps {
  /** Editor mode: 'formula' or 'bal' */
  mode?: 'formula' | 'bal';
  /** Variables defined for the formula */
  variables: Variable[];
  /** Attribute definitions (BAL mode) */
  attributes?: Array<{
    path: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
    description?: string;
    defaultValue?: any;
    unit?: string;
  }>;
  /** Current formula code */
  formulaCode: string;
  /** Formula return type */
  returnType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Thresholds for numeric formulas */
  thresholds?: Threshold[];
  /** Callback when debug highlight changes (for editor line highlighting) */
  onDebugHighlight?: (highlight: DebugHighlight | null) => void;
  /** Callback when error highlight changes (for editor error line highlighting) */
  onErrorHighlight?: (highlight: ErrorHighlight | null) => void;
  /** Callback when warning highlights change (for editor warning line highlighting) */
  onWarningHighlight?: (highlights: WarningHighlight[] | null) => void;
  /** Line issues for error/warning list (CRIT-002) */
  lineIssues?: LineIssue[];
}

/**
 * Imperative handle for FormulaTestPanel
 * Exposes methods for keyboard shortcuts
 */
export interface FormulaTestPanelHandle {
  /** Run test evaluation */
  runTest: () => void;
  /** Run test with debug mode enabled */
  runTestDebug: () => void;
  /** Toggle debug mode */
  toggleDebugMode: () => void;
  /** Step forward in debug trace */
  stepForward: () => void;
  /** Step backward in debug trace */
  stepBackward: () => void;
  /** Clear debug output (trace and results) */
  clearDebugOutput: () => void;
}

/**
 * Mock attribute definitions with predefined test values
 */
const ATTRIBUTE_DEFINITIONS = {
  'customer.age': {
    type: 'number' as const,
    description: 'Customer age in years',
    predefinedValues: ['25', '35', '45', '55', '65'],
  },
  'customer.income': {
    type: 'number' as const,
    description: 'Annual income',
    predefinedValues: ['30000', '50000', '75000', '100000', '150000'],
  },
  'customer.creditScore': {
    type: 'number' as const,
    description: 'Credit score (300-850)',
    predefinedValues: ['550', '650', '700', '750', '800'],
  },
  'customer.employmentYears': {
    type: 'number' as const,
    description: 'Years employed',
    predefinedValues: ['1', '3', '5', '10', '15'],
  },
  'customer.loyaltyTier': {
    type: 'string' as const,
    description: 'Loyalty tier level',
    predefinedValues: ['bronze', 'silver', 'gold', 'platinum'],
  },
  'customer.debtToIncomeRatio': {
    type: 'number' as const,
    description: 'Debt to income ratio',
    predefinedValues: ['0.15', '0.25', '0.35', '0.45', '0.55'],
  },
  'customer.accountAge': {
    type: 'number' as const,
    description: 'Account age in days',
    predefinedValues: ['30', '60', '90', '180', '365'],
  },
  'customer.hasRecentBankruptcy': {
    type: 'boolean' as const,
    description: 'Recent bankruptcy flag',
    predefinedValues: ['true', 'false'],
  },
  'customer.yearsOfCreditHistory': {
    type: 'number' as const,
    description: 'Years of credit history',
    predefinedValues: ['1', '5', '10', '15', '20'],
  },
  'order.total': {
    type: 'number' as const,
    description: 'Order total amount',
    predefinedValues: ['100', '500', '1000', '2500', '5000'],
  },
  'order.weight': {
    type: 'number' as const,
    description: 'Order weight in kg',
    predefinedValues: ['0.5', '2', '5', '10', '25'],
  },
  'order.shippingSpeed': {
    type: 'string' as const,
    description: 'Shipping speed option',
    predefinedValues: ['standard', 'express', 'overnight'],
  },
  'order.destination.distance': {
    type: 'number' as const,
    description: 'Shipping distance in km',
    predefinedValues: ['10', '50', '100', '250', '500'],
  },
  'transaction.amount': {
    type: 'number' as const,
    description: 'Transaction amount',
    predefinedValues: ['500', '1000', '5000', '10000', '25000'],
  },
  'transaction.foreignCountry': {
    type: 'boolean' as const,
    description: 'Transaction is from foreign country',
    predefinedValues: ['true', 'false'],
  },
  'account.apiCallsThisMonth': {
    type: 'number' as const,
    description: 'API calls this month',
    predefinedValues: ['10000', '50000', '100000', '500000', '1000000'],
  },
  'sensor.temperatureCelsius': {
    type: 'number' as const,
    description: 'Temperature in Celsius',
    predefinedValues: ['-10', '0', '20', '25', '35', '50'],
  },
  'sensor.calibrationOffset': {
    type: 'number' as const,
    description: 'Calibration offset',
    predefinedValues: ['-2', '-1', '0', '1', '2'],
  },
  'employee.tasksCompleted': {
    type: 'number' as const,
    description: 'Tasks completed',
    predefinedValues: ['50', '75', '90', '100', '120'],
  },
  'employee.tasksAssigned': {
    type: 'number' as const,
    description: 'Tasks assigned',
    predefinedValues: ['100', '100', '100', '100', '100'],
  },
  'employee.customerSatisfaction': {
    type: 'number' as const,
    description: 'Customer satisfaction rating (1-5)',
    predefinedValues: ['3.0', '3.5', '4.0', '4.5', '5.0'],
  },
  'employee.overtimeHours': {
    type: 'number' as const,
    description: 'Overtime hours',
    predefinedValues: ['0', '10', '20', '30', '40'],
  },
  'employee.hourlyRate': {
    type: 'number' as const,
    description: 'Hourly wage rate',
    predefinedValues: ['15', '20', '25', '30', '40'],
  },
  'timesheet.clockIn': {
    type: 'time' as const,
    description: 'Clock in time',
    predefinedValues: ['08:00:00', '09:00:00', '10:00:00'],
  },
  'timesheet.clockOut': {
    type: 'time' as const,
    description: 'Clock out time',
    predefinedValues: ['17:00:00', '18:00:00', '19:00:00', '20:00:00'],
  },
  'appointment.requestedDate': {
    type: 'date' as const,
    description: 'Appointment requested date',
    predefinedValues: ['2025-11-01', '2025-11-05', '2025-11-10', '2025-11-15'],
  },
  'appointment.preferredDate': {
    type: 'date' as const,
    description: 'Customer preferred appointment date',
    predefinedValues: ['2025-11-05', '2025-11-10', '2025-11-15', '2025-11-20'],
  },
  'inventory.currentStock': {
    type: 'number' as const,
    description: 'Current stock level',
    predefinedValues: ['100', '250', '500', '750', '1000'],
  },
  'inventory.maxCapacity': {
    type: 'number' as const,
    description: 'Maximum capacity',
    predefinedValues: ['1000', '1000', '1000', '1000', '1000'],
  },
  'inventory.leadTimeDays': {
    type: 'number' as const,
    description: 'Lead time in days',
    predefinedValues: ['3', '7', '14', '21', '30'],
  },
  'ticket.closedAt': {
    type: 'datetime' as const,
    description: 'Ticket closed timestamp',
    predefinedValues: ['2025-10-28T10:10:00.000Z', '2025-10-28T10:30:00.000Z', '2025-10-28T11:00:00.000Z', '2025-10-28T12:00:00.000Z', '2025-10-28T14:00:00.000Z'],
  },
  'ticket.createdAt': {
    type: 'datetime' as const,
    description: 'Ticket created timestamp',
    predefinedValues: ['2025-10-28T10:00:00.000Z', '2025-10-28T10:00:00.000Z', '2025-10-28T10:00:00.000Z', '2025-10-28T10:00:00.000Z', '2025-10-28T10:00:00.000Z'],
  },
  'ticket.priority': {
    type: 'string' as const,
    description: 'Ticket priority',
    predefinedValues: ['low', 'medium', 'high', 'urgent'],
  },
  'survey.wouldRecommend': {
    type: 'boolean' as const,
    description: 'Would recommend product',
    predefinedValues: ['true', 'false'],
  },
  'survey.easeOfUse': {
    type: 'number' as const,
    description: 'Ease of use rating (1-5)',
    predefinedValues: ['1', '2', '3', '4', '5'],
  },
  'survey.supportQuality': {
    type: 'number' as const,
    description: 'Support quality rating (1-5)',
    predefinedValues: ['1', '2', '3', '4', '5'],
  },
  'inspection.defectsFound': {
    type: 'number' as const,
    description: 'Number of defects found',
    predefinedValues: ['0', '5', '10', '20', '50'],
  },
  'inspection.totalInspected': {
    type: 'number' as const,
    description: 'Total items inspected',
    predefinedValues: ['100', '100', '100', '100', '100'],
  },
  'production.machineAge': {
    type: 'number' as const,
    description: 'Machine age in years',
    predefinedValues: ['1', '3', '5', '7', '10'],
  },
};

type AttributeKey = keyof typeof ATTRIBUTE_DEFINITIONS;

export const FormulaTestPanel = forwardRef<FormulaTestPanelHandle, FormulaTestPanelProps>((props, ref) => {
  const {
    mode = 'formula',
    variables,
    attributes,
    formulaCode,
    returnType,
    thresholds = [],
    onDebugHighlight,
    onErrorHighlight,
    onWarningHighlight,
    lineIssues = []
  } = props;
  
  // Test values for variables
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  
  // Test values for attributes (flat for formula mode)
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});
  
  // Nested attribute values for BAL mode
  const [nestedAttributeValues, setNestedAttributeValues] = useState<any>({});
  
  // Evaluation result
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Debug mode state
  const [debugMode, setDebugMode] = useState(false);
  const [executionTrace, setExecutionTrace] = useState<ExecutionTrace | null>(null);
  
  // Ref to track when we should auto-run after enabling debug mode
  const shouldAutoRunRef = useRef(false);
  
  // Ref to track last clear time for double-clear detection
  const lastClearTimeRef = useRef<number>(0);
  
  // Threshold evaluation hook
  const { evaluate } = useThresholdEvaluation({ thresholds });
  
  // Debugger hook
  const debug = useDebugger(executionTrace);

  // Debug log to see the formula code (commented out to reduce console noise)
  // console.log('[FormulaTestPanel] Formula code received:', formulaCode);
  // console.log('[FormulaTestPanel] All variables:', variables.map(v => ({ name: v.name, type: v.type })));

  /**
   * Clear trace when debug mode is toggled off
   */
  useEffect(() => {
    if (!debugMode) {
      setExecutionTrace(null);
      if (onDebugHighlight) {
        onDebugHighlight(null);
      }
    }
  }, [debugMode, onDebugHighlight]);

  /**
   * Auto-run evaluation when debug mode is enabled via keyboard shortcut
   */
  useEffect(() => {
    if (debugMode && shouldAutoRunRef.current) {
      shouldAutoRunRef.current = false;
      handleEvaluate();
    }
  }, [debugMode]);

  /**
   * Clear trace when formula code changes (e.g., switching samples)
   */
  useEffect(() => {
    setExecutionTrace(null);
    setDebugMode(false);
    if (onDebugHighlight) {
      onDebugHighlight(null);
    }
  }, [formulaCode, onDebugHighlight]);

  /**
   * Emit debug highlight when step changes
   * Destructure currentStep to ensure React detects changes
   */
  const currentStep = debug.state.currentStep;
  
  useEffect(() => {
    // Debug state tracking (commented out to reduce console noise)
    // console.log('[FormulaTestPanel] Debug state changed:', {
    //   currentStep,
    //   executionTrace: executionTrace ? `${executionTrace.steps.length} steps` : 'null',
    //   hasOnDebugHighlight: !!onDebugHighlight
    // });
    
    if (onDebugHighlight && executionTrace && debugMode) {
      const highlight = buildDebugHighlight(executionTrace, currentStep);
      // console.log('[FormulaTestPanel] Built highlight:', highlight);
      onDebugHighlight(highlight);
    } else if (onDebugHighlight && (!executionTrace || !debugMode)) {
      onDebugHighlight(null);
    }
  }, [executionTrace, currentStep, debugMode, onDebugHighlight]);

  /**
   * ALL defined variables should be testable
   * We don't need to extract from formula - we already have variable definitions
   */
  const testableVariables = useMemo(() => {
    return variables;
  }, [variables]);

  /**
   * Distinguish between input variables (parameters) and defined variables
   * Input variables: User provides values (not assigned in formula)
   * Defined variables: Calculated by formula (assigned with =)
   */
  const { inputVariables, definedVariableNames } = useMemo(() => {
    const definedNames = extractDefinedVariables(formulaCode, variables);
    const parameterNames = extractParameterVariables(formulaCode);
    
    // Debug logging (commented out to reduce console noise)
    // console.log('[FormulaTestPanel] Defined variables:', definedNames);
    // console.log('[FormulaTestPanel] Parameter variables:', parameterNames);
    
    // Filter variables to get only input variables (parameters)
    const inputs = testableVariables.filter(v => 
      parameterNames.includes(v.name)
    );
    
    return {
      inputVariables: inputs,
      definedVariableNames: definedNames
    };
  }, [testableVariables, formulaCode, variables]);

  /**
   * State to store calculated values for defined variables
   */
  const [definedVariableValues, setDefinedVariableValues] = useState<Record<string, any>>({});

  /**
   * Extract attributes referenced in the formula
   * For BAL mode: extract from code or use provided attributes
   * For Formula mode: use existing logic
   */
  const referencedAttributes = useMemo(() => {
    if (mode === 'bal') {
      // BAL mode: extract from code or use provided attributes
      if (attributes && attributes.length > 0) {
        return attributes.map(a => a.path);
      }
      // Fallback: extract from code
      return extractBALAttributes(formulaCode);
    }
    // Formula mode: use existing logic
    return getReferencedAttributes(formulaCode);
  }, [mode, formulaCode, attributes]);
  
  /**
   * Attribute definitions to use (BAL mode uses props, Formula mode uses ATTRIBUTE_DEFINITIONS)
   */
  const attributeDefinitions = useMemo(() => {
    if (mode === 'bal' && attributes) {
      // Convert to record for easier lookup
      const defs: Record<string, any> = {};
      attributes.forEach(attr => {
        defs[attr.path] = {
          type: attr.type,
          description: attr.description,
          predefinedValues: [], // Could be extended
        };
      });
      return defs;
    }
    return ATTRIBUTE_DEFINITIONS;
  }, [mode, attributes]);
  
  /**
   * Nested attribute hierarchy (BAL mode only)
   */
  const attributeHierarchy = useMemo(() => {
    if (mode === 'bal' && attributes) {
      return parseAttributeHierarchy(attributes as AttributeDefinition[]);
    }
    return {};
  }, [mode, attributes]);

  /**
   * Detect linked variable-attribute pairs
   * A variable is linked to an attribute if its dataSource matches the attribute path
   */
  const linkedPairs = useMemo(() => {
    const pairs: Array<{ variableName: string; attributePath: string }> = [];
    
    testableVariables.forEach(variable => {
      if (variable.dataSource) {
        // Remove # prefix from dataSource to match attribute path
        const dataSourcePath = variable.dataSource.replace('#', '');
        
        // Check if this path is in referenced attributes
        if (referencedAttributes.includes(dataSourcePath)) {
          pairs.push({
            variableName: variable.name,
            attributePath: dataSourcePath
          });
        }
      }
    });
    
    return pairs;
  }, [testableVariables, referencedAttributes]);

  /**
   * Check if a variable is linked to an attribute
   */
  const getLinkedAttribute = (variableName: string): string | null => {
    const pair = linkedPairs.find(p => p.variableName === variableName);
    return pair ? pair.attributePath : null;
  };

  /**
   * Check if an attribute is linked to a variable
   */
  const getLinkedVariable = (attributePath: string): string | null => {
    const pair = linkedPairs.find(p => p.attributePath === attributePath);
    return pair ? pair.variableName : null;
  };

  /**
   * Initialize test values when variables or attributes change
   */
  useEffect(() => {
    // Set default values for variables
    setTestValues(prev => {
      const newValues: Record<string, string> = { ...prev };
      testableVariables.forEach(v => {
        if (!(v.name in newValues)) {
          // Check for extracted string options first
          const extractedOptions = extractStringOptions(formulaCode, v.name);
          if (extractedOptions.length > 0) {
            // Use first extracted option as default
            newValues[v.name] = extractedOptions[0];
          } else {
            // Use default based on type
            if (v.type === 'number') {
              newValues[v.name] = '0';
            } else if (v.type === 'boolean') {
              newValues[v.name] = 'true';
            } else if (v.type === 'datetime') {
              newValues[v.name] = new Date().toISOString();
            } else if (v.type === 'date') {
              newValues[v.name] = new Date().toISOString().split('T')[0];
            } else if (v.type === 'time') {
              newValues[v.name] = '00:00:00';
            } else {
              newValues[v.name] = '';
            }
          }
        }
      });
      return newValues;
    });

    // Set default values for attributes
    setAttributeValues(prev => {
      const newValues: Record<string, string> = { ...prev };
      referencedAttributes.forEach(attr => {
        if (!(attr in newValues)) {
          const def = attributeDefinitions[attr as AttributeKey];
          // Use default based on type
          if (def?.type === 'number') {
            newValues[attr] = '0';
          } else if (def?.type === 'boolean') {
            newValues[attr] = 'true';
          } else if (def?.type === 'datetime') {
            // Use first predefined value or current timestamp
            newValues[attr] = def.predefinedValues?.[0] || new Date().toISOString();
          } else if (def?.type === 'date') {
            // Use first predefined value or current date
            newValues[attr] = def.predefinedValues?.[0] || new Date().toISOString().split('T')[0];
          } else {
            newValues[attr] = '';
          }
        }
      });
      return newValues;
    });
  }, [testableVariables, referencedAttributes, formulaCode, attributeDefinitions]);

  /**
   * Validate test inputs for type mismatches
   * Runs whenever test values or variables change to provide real-time warnings
   */
  useEffect(() => {
    if (!onWarningHighlight) return;

    const warnings: WarningHighlight[] = [];

    // Validate variable test inputs
    testableVariables.forEach(variable => {
      const testValue = testValues[variable.name];
      if (!testValue || testValue.trim() === '') return; // Skip empty values

      const error = validateTestValue(testValue, variable.type);
      if (error) {
        // Find the variable reference in the formula to get line number
        const lines = formulaCode.split('\n');
        let lineNum = 1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`$${variable.name}`)) {
            lineNum = i + 1;
            break;
          }
        }

        warnings.push({
          line: lineNum,
          message: `Type mismatch for $${variable.name}: ${error}`,
          code: 'TYPE_MISMATCH'
        });
      }
    });

    // Validate attribute test inputs
    referencedAttributes.forEach(attr => {
      const testValue = attributeValues[attr];
      if (!testValue || testValue.trim() === '') return; // Skip empty values

      const def = attributeDefinitions[attr as AttributeKey];
      if (!def) return;

      const error = validateTestValue(testValue, def.type);
      if (error) {
        // Find the attribute reference in the formula to get line number
        const lines = formulaCode.split('\n');
        let lineNum = 1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`#${attr}`)) {
            lineNum = i + 1;
            break;
          }
        }

        warnings.push({
          line: lineNum,
          message: `Type mismatch for #${attr}: ${error}`,
          code: 'TYPE_MISMATCH'
        });
      }
    });

    // Send warnings to editor
    onWarningHighlight(warnings.length > 0 ? warnings : null);
  }, [testValues, attributeValues, testableVariables, referencedAttributes, formulaCode, onWarningHighlight, attributeDefinitions]);

  /**
   * Handle nested attribute value change (BAL mode)
   * Updates nested structure and syncs to flat attributeValues
   */
  const handleNestedAttributeChange = (fullPath: string, value: any) => {
    // Update nested structure
    const newNested = setNestedValue(nestedAttributeValues, fullPath, value);
    setNestedAttributeValues(newNested);
    
    // Sync to flat structure for evaluation
    const flattened = flattenAttributeValues(newNested);
    setAttributeValues(flattened);
  };

  /**
   * Evaluate the formula with test values using the real evaluation engine
   */
  const handleEvaluate = () => {
    try {
      setError(null);
      setExecutionTrace(null); // Clear previous trace
      
      // Clear error highlight on new evaluation
      if (onErrorHighlight) {
        onErrorHighlight(null);
      }
      
      // Build verbalization map from variables using the utility function
      const verbalizationMap = buildVerbalizationMap(variables);
      
      // Build execution context with test values
      const executionVariables = new Map<string, any>();
      const attributes = new Map<string, any>();
      const variableTypes = new Map<string, string>();
      
      // Add variable values to context
      testableVariables.forEach(v => {
        // Store variable type for coercion during evaluation
        variableTypes.set(v.name, v.type);
        
        const value = testValues[v.name];
        if (v.type === 'number') {
          executionVariables.set(v.name, parseFloat(value) || 0);
        } else if (v.type === 'boolean') {
          executionVariables.set(v.name, value === 'true');
        } else if (v.type === 'date') {
          // Parse date string to Date object for proper date arithmetic
          executionVariables.set(v.name, new Date(value));
        } else if (v.type === 'time') {
          // Parse time based on format and convert to TimeValue object
          const timeFormat = v.timeFormat || 'HH:MM:SS';
          const milliseconds = parseFormattedTime(value, timeFormat);
          executionVariables.set(v.name, new TimeValue(milliseconds));
        } else {
          executionVariables.set(v.name, value);
        }
      });
      
      // Add attribute values to context
      referencedAttributes.forEach(attr => {
        const value = attributeValues[attr];
        const def = attributeDefinitions[attr as AttributeKey];
        if (def?.type === 'number') {
          attributes.set(attr, parseFloat(value) || 0);
        } else if (def?.type === 'boolean') {
          attributes.set(attr, value === 'true');
        } else if (def?.type === 'date') {
          // Parse date string to Date object for proper date arithmetic
          attributes.set(attr, new Date(value));
        } else if (def?.type === 'time') {
          // Parse time and convert to milliseconds (default format HH:MM:SS)
          const milliseconds = parseFormattedTime(value, 'HH:MM:SS');
          attributes.set(attr, milliseconds);
        } else {
          attributes.set(attr, value);
        }
      });
      
      const context = { variables: executionVariables, attributes, variableTypes };
      
      // Use TracingEvaluator if debug mode is enabled
      if (debugMode) {
        const tracer = new TracingEvaluator();
        const evalResult = tracer.evaluate(formulaCode, context, verbalizationMap);
        
        if (!evalResult.success) {
          // Show evaluation errors
          const errorMessages = evalResult.errors.map(e => e.message).join('\n');
          setError(errorMessages);
          setResult(null);
          // Don't log errors to console - they're displayed in UI
          // console.error('[FormulaTestPanel] Evaluation errors:', evalResult.errors.map(e => ({
          //   message: e.message || String(e),
          //   code: e.code,
          //   location: e.location,
          //   name: e.name
          // })));
          
          // Extract error location for highlighting
          if (onErrorHighlight && evalResult.errors.length > 0) {
            const firstError = evalResult.errors[0];
            const errorLine = getErrorLine(firstError);
            
            if (errorLine !== null) {
              onErrorHighlight({
                line: errorLine,
                message: firstError.message
              });
              // console.log('[FormulaTestPanel] Error highlight:', { line: errorLine, message: firstError.message });
            }
          }
        } else {
          // Success - show result and store trace
          setResult(evalResult.value);
          setExecutionTrace(evalResult.trace || null);
          // console.log('[FormulaTestPanel] Evaluation succeeded with trace:', {
          //   value: evalResult.value,
          //   type: evalResult.resultType,
          //   metrics: evalResult.metrics,
          //   traceSteps: evalResult.trace?.steps.length
          // });
          
          // Clear error highlight on success
          if (onErrorHighlight) {
            onErrorHighlight(null);
          }
        }
      } else {
        // Regular evaluation without trace
        const engine = new EvaluationEngine();
        const evalResult = engine.evaluate(formulaCode, context, verbalizationMap);
        
        if (!evalResult.success) {
          // Show evaluation errors
          const errorMessages = evalResult.errors.map(e => e.message).join('\n');
          setError(errorMessages);
          setResult(null);
          // Don't log errors to console - they're displayed in UI
          // console.error('[FormulaTestPanel] Evaluation errors:', evalResult.errors.map(e => ({
          //   message: e.message || String(e),
          //   code: e.code,
          //   location: e.location,
          //   name: e.name
          // })));
          
          // Extract error location for highlighting
          if (onErrorHighlight && evalResult.errors.length > 0) {
            const firstError = evalResult.errors[0];
            const errorLine = getErrorLine(firstError);
            
            if (errorLine !== null) {
              onErrorHighlight({
                line: errorLine,
                message: firstError.message
              });
              // console.log('[FormulaTestPanel] Error highlight:', { line: errorLine, message: firstError.message });
            }
          }
        } else {
          // Success - show result
          setResult(evalResult.value);
          // console.log('[FormulaTestPanel] Evaluation succeeded:', {
          //   value: evalResult.value,
          //   type: evalResult.resultType,
          //   metrics: evalResult.metrics
          // });
          
          // Clear error highlight on success
          if (onErrorHighlight) {
            onErrorHighlight(null);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed');
      setResult(null);
      setExecutionTrace(null);
      // console.error('[FormulaTestPanel] Evaluation exception:', err);
      
      // Try to extract error location from exception
      if (onErrorHighlight) {
        const errorLine = getErrorLine(err);
        if (errorLine !== null) {
          onErrorHighlight({
            line: errorLine,
            message: err instanceof Error ? err.message : 'Evaluation failed'
          });
        }
      }
    }
  };

  /**
   * Get threshold evaluation for numeric results
   */
  const thresholdEvaluation = useMemo(() => {
    if (returnType === 'number' && typeof result === 'number' && thresholds.length > 0) {
      return evaluate(result);
    }
    return null;
  }, [returnType, result, thresholds, evaluate]);

  /**
   * Expose imperative methods for keyboard shortcuts
   */
  useImperativeHandle(ref, () => ({
    runTest: handleEvaluate,
    runTestDebug: () => {
      // Set flag to auto-run after debug mode is enabled
      shouldAutoRunRef.current = true;
      setDebugMode(true);
    },
    toggleDebugMode: () => {
      setDebugMode(prev => !prev);
    },
    stepForward: debug.actions.stepForward,
    stepBackward: debug.actions.stepBackward,
    clearDebugOutput: () => {
      const now = Date.now();
      const timeSinceLastClear = now - lastClearTimeRef.current;
      
      // If cleared within 2 seconds and debug mode is on, also disable debug mode
      if (timeSinceLastClear < 2000 && debugMode) {
        setDebugMode(false);
      }
      
      // Update last clear time
      lastClearTimeRef.current = now;
      
      // Clear outputs
      setExecutionTrace(null);
      setResult(null);
      setError(null);
      if (onDebugHighlight) {
        onDebugHighlight(null);
      }
      if (onErrorHighlight) {
        onErrorHighlight(null);
      }
    }
  }), [handleEvaluate, debug.actions, debugMode, onDebugHighlight, onErrorHighlight]);

  return (
    <div className={styles.testPanel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>{mode === 'bal' ? 'Test BAL' : 'Test Formula'}</div>
        <p className={styles.description}>
          {mode === 'bal'
            ? 'Populate data model attributes to test the BAL decision\'s output'
            : 'Populate variables and attributes to test the formula\'s output'
          }
        </p>
      </div>

      {/* Variables Section - Only show in Formula mode */}
      {testableVariables.length > 0 && mode === 'formula' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Variables</div>
            <div className={styles.sectionHint}>
              Input parameters for the formula
            </div>
          </div>
          
          <div className={styles.inputList}>
            {testableVariables.map(variable => {
              // Check if this is a defined variable (calculated by formula)
              const isDefined = definedVariableNames.includes(variable.name);
              
              // Use attribute type if available for type inheritance, otherwise use variable type
              const attrKey = variable.dataSource?.replace('#', '');
              const attributeDef = attrKey ? attributeDefinitions[attrKey as AttributeKey] : null;
              const effectiveType = attributeDef?.type || variable.type;
              
              // IMPORTANT: Extract literal options from formula based on variable type
              // Examples: 
              // - String: $status = "active" → ["active", "pending", ...]
              // - Number: $age > 18 → ["18", "21", ...]
              // - Date: $startDate > "2024-01-01" → ["2024-01-01", ...]
              // - Boolean: $isActive = true → ["true", "false"]
              const extractedOptions = extractOptionsForVariable(formulaCode, variable.name, effectiveType);
              const hasExtractedOptions = extractedOptions.length > 0;
              
              // Description with unit information if applicable
              const description = variable.description || attributeDef?.description;
              const unitNote = effectiveType === 'number' && attrKey?.includes('weight') ? ' (kg)' : '';
              
              // Check if this variable is linked to an attribute
              const linkedAttr = getLinkedAttribute(variable.name);
              
              // Handler that syncs with linked attribute
              const handleVariableChange = (value: string) => {
                setTestValues({ ...testValues, [variable.name]: value });
                
                // Sync with linked attribute if exists
                if (linkedAttr) {
                  setAttributeValues({ ...attributeValues, [linkedAttr]: value });
                }
              };
              
              return (
                <div key={variable.id} className={styles.inputRow}>
                  <div className={styles.inputLabel}>
                    <span className={styles.variableName}>${variable.name}</span>
                    {isDefined && (
                      <span className={styles.calculatedBadge}>
                        <Lock size={12} />
                        Calculated
                      </span>
                    )}
                    {description && (
                      <span className={styles.inputDescription}>
                        {description}{unitNote}
                      </span>
                    )}
                    {linkedAttr && (
                      <span className={styles.linkIndicator}>
                        Linked to #{linkedAttr}
                      </span>
                    )}
                  </div>
                  
                  {isDefined ? (
                    /* Defined variable: Read-only, shows calculated value */
                    <div className={styles.readOnlyInput}>
                      <Input
                        type="text"
                        value={definedVariableValues[variable.name] !== undefined 
                          ? String(definedVariableValues[variable.name]) 
                          : 'Not yet calculated'
                        }
                        readOnly
                        disabled
                        className={styles.inputDisabled}
                      />
                    </div>
                  ) : (
                    /* Input variable: Editable */
                    <>
                      {/* 
                        INPUT TYPE PRIORITY:
                        1. Boolean type → Toggle Switch (ALWAYS, even if has extracted options)
                        2. Date type → Date Picker (ALWAYS, even if has extracted options)
                        3. Time type → Time Input (ALWAYS, even if has extracted options)
                        4. String type with extracted options → Dropdown
                        5. Number type → Number Input (ALWAYS, even if has extracted options)
                        6. String type without options → Text Input
                      */}
                      {effectiveType === 'boolean' ? (
                        /* Boolean: Toggle Switch - ALWAYS for boolean types */
                        <div className={styles.toggleContainer}>
                          <Switch
                            checked={testValues[variable.name] === 'true'}
                            onCheckedChange={(checked) =>
                              handleVariableChange(checked ? 'true' : 'false')
                            }
                            className={styles.toggle}
                          />
                          <span className={styles.toggleLabel}>
                            {testValues[variable.name] === 'true' ? 'True' : 'False'}
                          </span>
                        </div>
                      ) : effectiveType === 'date' ? (
                        /* Date: Date Picker with Calendar Popup - ALWAYS for date types */
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className={styles.datePickerTrigger}>
                              <Input
                                type="text"
                                value={
                                  testValues[variable.name]
                                    ? formatDate(testValues[variable.name], variable.dateFormat || 'YYYY-MM-DD')
                                    : ''
                                }
                                readOnly
                                placeholder={variable.dateFormat || 'YYYY-MM-DD'}
                                className={styles.input}
                              />
                              <CalendarIcon className={styles.calendarIcon} />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className={styles.calendarContent} align="start">
                            <Calendar
                              mode="single"
                              selected={testValues[variable.name] ? new Date(testValues[variable.name]) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  // Always store as ISO format (YYYY-MM-DD) internally
                                  const isoDate = date.toISOString().split('T')[0];
                                  handleVariableChange(isoDate);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      ) : effectiveType === 'datetime' ? (
                        /* Datetime: Text Input for datetime values (YYYY-MM-DDTHH:MM:SS) */
                        <Input
                          type="datetime-local"
                          value={testValues[variable.name] ? testValues[variable.name].slice(0, 16) : ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              // Convert to ISO format
                              const isoDate = new Date(e.target.value).toISOString();
                              handleVariableChange(isoDate);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Allow arrow keys to navigate and modify the datetime input
                            // Don't preventDefault - let native browser controls handle it
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                              // Let the browser's native datetime-local controls handle arrow keys
                              e.stopPropagation();
                            }
                          }}
                          placeholder="yyyy / mm / dd, --:-- --"
                          className={styles.input}
                        />
                      ) : effectiveType === 'time' ? (
                        /* Time: Text Input with format placeholder - ALWAYS for time types */
                        <Input
                          type="text"
                          value={testValues[variable.name] || ''}
                          onChange={(e) => handleVariableChange(e.target.value)}
                          placeholder={variable.timeFormat || 'HH:MM:SS'}
                          className={styles.input}
                        />
                      ) : effectiveType === 'string' && hasExtractedOptions ? (
                        /* String with Extracted Options from Formula: Select Dropdown */
                        <Select
                          value={testValues[variable.name] || ''}
                          onValueChange={handleVariableChange}
                        >
                          <SelectTrigger className={styles.select}>
                            <SelectValue placeholder={`Select ${variable.name}...`} />
                          </SelectTrigger>
                          <SelectContent>
                            {extractedOptions.map(value => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : effectiveType === 'number' ? (
                        /* Number: Number Input with Decimals */
                        <Input
                          type="number"
                          step="any"
                          value={testValues[variable.name] || ''}
                          onChange={(e) => handleVariableChange(e.target.value)}
                          placeholder="Enter number..."
                          className={styles.input}
                        />
                      ) : (
                        /* String: Text Input (default fallback) */
                        <Input
                          type="text"
                          value={testValues[variable.name] || ''}
                          onChange={(e) => handleVariableChange(e.target.value)}
                          placeholder="Enter text..."
                          className={styles.input}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Attributes Section */}
      {referencedAttributes.length > 0 && mode === 'formula' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Attributes</div>
            <div className={styles.sectionHint}>
              Data attributes referenced in the formula
            </div>
          </div>
          
          <div className={styles.inputList}>
            {referencedAttributes.map(attr => {
              const def = attributeDefinitions[attr as AttributeKey];
              const attrType = def?.type || 'string';
              const description = def?.description;
              
              // Add unit note for specific attributes
              const unitNote = attrType === 'number' && attr.includes('weight') ? ' (kg)' : 
                               attrType === 'number' && attr.includes('distance') ? ' (km)' : '';
              
              // Check if this attribute is linked to a variable
              const linkedVar = getLinkedVariable(attr);
              
              // Handler that syncs with linked variable
              const handleAttributeChange = (value: string) => {
                setAttributeValues({ ...attributeValues, [attr]: value });
                
                // Sync with linked variable if exists
                if (linkedVar) {
                  setTestValues({ ...testValues, [linkedVar]: value });
                }
              };
              
              return (
                <div key={attr} className={styles.inputRow}>
                  <div className={styles.inputLabel}>
                    <span className={styles.attributeName}>#{attr}</span>
                    {description && (
                      <span className={styles.inputDescription}>
                        {description}{unitNote}
                      </span>
                    )}
                    {linkedVar && (
                      <span className={styles.linkIndicator}>
                        Linked to ${linkedVar}
                      </span>
                    )}
                  </div>
                  
                  {/* Type-based inputs for attributes */}
                  {attrType === 'boolean' ? (
                    /* Boolean: Toggle Switch */
                    <div className={styles.toggleContainer}>
                      <Switch
                        checked={attributeValues[attr] === 'true'}
                        onCheckedChange={(checked) =>
                          handleAttributeChange(checked ? 'true' : 'false')
                        }
                        className={styles.toggle}
                      />
                      <span className={styles.toggleLabel}>
                        {attributeValues[attr] === 'true' ? 'True' : 'False'}
                      </span>
                    </div>
                  ) : attrType === 'date' ? (
                    /* Date: Date Picker with Calendar Popup */
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className={styles.datePickerTrigger}>
                          <Input
                            type="text"
                            value={attributeValues[attr] || ''}
                            readOnly
                            placeholder="YYYY-MM-DD"
                            className={styles.input}
                          />
                          <CalendarIcon className={styles.calendarIcon} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className={styles.calendarContent} align="start">
                        <Calendar
                          mode="single"
                          selected={attributeValues[attr] ? new Date(attributeValues[attr]) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              // Always store as ISO format (YYYY-MM-DD) internally
                              const isoDate = date.toISOString().split('T')[0];
                              handleAttributeChange(isoDate);
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : attrType === 'datetime' ? (
                    /* Datetime: Datetime-local Input for timestamp values */
                    <Input
                      type="datetime-local"
                      value={attributeValues[attr] ? attributeValues[attr].slice(0, 16) : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          // Convert to ISO format
                          const isoDate = new Date(e.target.value).toISOString();
                          handleAttributeChange(isoDate);
                        }
                      }}
                      onKeyDown={(e) => {
                        // Allow arrow keys to navigate and modify the datetime input
                        // Don't preventDefault - let native browser controls handle it
                        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          // Let the browser's native datetime-local controls handle arrow keys
                          e.stopPropagation();
                        }
                      }}
                      placeholder="yyyy / mm / dd, --:-- --"
                      className={styles.input}
                    />
                  ) : attrType === 'number' ? (
                    /* Number: Number Input with Decimals */
                    <Input
                      type="number"
                      step="any"
                      value={attributeValues[attr] || ''}
                      onChange={(e) => handleAttributeChange(e.target.value)}
                      placeholder="Enter number..."
                      className={styles.input}
                    />
                  ) : (
                    /* String: Text Input */
                    <Input
                      type="text"
                      value={attributeValues[attr] || ''}
                      onChange={(e) => handleAttributeChange(e.target.value)}
                      placeholder="Enter text..."
                      className={styles.input}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* BAL Mode: Nested Attributes Section */}
      {mode === 'bal' && attributes && attributes.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Attributes</div>
            <div className={styles.sectionHint}>
              Business rule attributes (hierarchical)
            </div>
          </div>
          
          <div className={styles.inputList}>
            {Object.entries(attributeHierarchy).map(([rootName, rootNode]) => (
              <NestedAttributeInput
                key={rootName}
                name={rootName}
                node={rootNode}
                values={nestedAttributeValues}
                onChange={handleNestedAttributeChange}
                predefinedValues={ATTRIBUTE_DEFINITIONS}
              />
            ))}
          </div>
        </div>
      )}

      {/* No testable items message */}
      {testableVariables.length === 0 && referencedAttributes.length === 0 && (
        <div className={styles.emptyState}>
          <AlertCircle size={24} />
          <p>
            {mode === 'bal' 
              ? 'No data model attributes to test'
              : 'No variables or attributes to test'
            }
          </p>
          <p className={styles.emptyHint}>
            {mode === 'bal'
              ? 'Reference data model attributes (e.g., applicant.age, loan.amount) in your BAL code to enable testing'
              : 'Add variables or reference attributes (#attribute) in your formula to enable testing'
            }
          </p>
        </div>
      )}

      {/* Debug Mode Toggle and Evaluate Button */}
      {(testableVariables.length > 0 || referencedAttributes.length > 0) && (
        <div className={styles.actions}>
          {/* Debug Mode Toggle */}
          <div className={styles.debugToggle}>
            <div className={styles.debugToggleLabel}>
              <Bug size={16} className={styles.debugToggleIcon} />
              Debug Mode
            </div>
            <Switch
              checked={debugMode}
              onCheckedChange={setDebugMode}
              style={{
                // Override shadcn/ui defaults to match Carbon
                fontFamily: 'var(--font-family-sans)',
              }}
            />
          </div>
          
          {/* Evaluate Button */}
          <Button
            type="button"
            onClick={handleEvaluate}
            className={styles.evaluateButton}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--cds-spacing-02)',
              visibility: 'visible',
              opacity: 1,
              position: 'relative',
              zIndex: 1,
              minHeight: '32px',
              background: 'var(--cds-button-primary, #0f62fe)',
              color: 'var(--cds-text-on-color, #ffffff)',
              border: '1px solid transparent',
              borderRadius: 0,
              padding: 'var(--cds-spacing-03) var(--cds-spacing-05)',
              fontFamily: 'var(--cds-font-family-sans, "IBM Plex Sans", sans-serif)',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '18px',
              letterSpacing: '0.16px',
              cursor: 'pointer',
              transition: 'background 70ms cubic-bezier(0, 0, 0.38, 0.9)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'var(--cds-button-primary-hover, #0050e6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'var(--cds-button-primary, #0f62fe)';
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline =
                '2px solid var(--cds-focus, #0f62fe)';
              (e.currentTarget as HTMLButtonElement).style.outlineOffset = '-2px';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLButtonElement).style.outline = 'none';
            }}
          >
            <Play size={16} aria-hidden="true" />
            <span>Evaluate Formula</span>
          </Button>
        </div>
      )}

      {/* Results Section */}
      {(result !== null || error) && (
        <div className={styles.resultsSection}>
          <div className={styles.resultsDivider} />
          
          {error ? (
            <div className={styles.errorResult}>
              <AlertCircle size={16} />
              <div>
                <div className={styles.errorTitle}>Evaluation Error</div>
                <div className={styles.errorMessage}>{error}</div>
              </div>
            </div>
          ) : (
            <div className={styles.successResult}>
              <div className={styles.resultLabel}>Result</div>
              
              {/* Display result based on type */}
              <div className={styles.resultValue}>
                {returnType === 'number' && typeof result === 'number' ? (
                  <div className={styles.numericResult}>
                    <span className={styles.resultNumber}>
                      {result.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    
                    {/* Show threshold evaluation */}
                    {thresholdEvaluation && (
                      <div className={styles.thresholdResult}>
                        <ThresholdBadge
                          evaluation={thresholdEvaluation}
                          showValue={false}
                          size="md"
                        />
                      </div>
                    )}
                  </div>
                ) : returnType === 'boolean' ? (
                  <span className={`${styles.booleanResult} ${result ? styles.true : styles.false}`}>
                    {String(result)}
                  </span>
                ) : returnType === 'date' ? (
                  <span className={styles.dateResult}>{String(result)}</span>
                ) : (
                  <span className={styles.stringResult}>{String(result)}</span>
                )}
              </div>
              
              <div className={styles.resultHint}>
                Evaluated using the Formula Evaluation Engine
              </div>
            </div>
          )}
        </div>
      )}

      {/* Debug Controls */}
      {executionTrace && (
        <div className={styles.debugSection}>
          <div className={styles.debugHeader}>
            <div className={styles.debugTitle}>
              <Bug size={16} />
              Debug Trace
            </div>
            <div className={styles.debugHint}>
              Step through formula execution
            </div>
          </div>
          
          <div className={styles.debugControls}>
            <DebugControls
              currentStep={debug.state.currentStep}
              totalSteps={debug.state.totalSteps}
              isPlaying={debug.state.isPlaying}
              playbackSpeed={debug.state.playbackSpeed}
              onStepBackward={debug.actions.stepBackward}
              onStepForward={debug.actions.stepForward}
              onStepFirst={debug.actions.stepFirst}
              onStepLast={debug.actions.stepLast}
              onTogglePlay={debug.actions.togglePlay}
              onSpeedChange={debug.actions.setPlaybackSpeed}
            />
          </div>
          
          {/* Current Step Description */}
          {executionTrace.steps[debug.state.currentStep] && (
            <div className={styles.stepDescription}>
              <div className={styles.stepDescriptionLabel}>Current Step:</div>
              <div className={styles.stepDescriptionText}>
                {executionTrace.steps[debug.state.currentStep].description}
              </div>
            </div>
          )}
          
          <div className={styles.debugInspector}>
            <DebugVariableInspector
              variables={executionTrace.steps[debug.state.currentStep] 
                ? convertRecordToMaps(executionTrace.steps[debug.state.currentStep].variablesAfter).variables
                : new Map()}
              attributes={executionTrace.steps[debug.state.currentStep] 
                ? convertRecordToMaps(executionTrace.steps[debug.state.currentStep].variablesAfter).attributes
                : new Map()}
            />
          </div>
        </div>
      )}

      {/* Error/Warning List (CRIT-002) */}
      {lineIssues.length > 0 && (
        <ErrorWarningList
          issues={lineIssues}
          onLineClick={(line) => {
            // Highlight the line with the error in the editor
            const issueOnLine = lineIssues.find(issue => issue.line === line);
            if (issueOnLine && onErrorHighlight) {
              onErrorHighlight({
                line,
                message: issueOnLine.message
              });
            }
          }}
        />
      )}
    </div>
  );
});