/**
 * UnifiedTestPanel - Unified Test Panel for Formula and BAL Editors
 * 
 * Mode-aware test panel that supports both Formula and BAL modes.
 * Integrates with data model extensions (Phase 3).
 * 
 * Features:
 * - Formula mode: Variables + flat attributes + debug mode
 * - BAL mode: Nested attributes + vocabulary + data model extensions
 * - Shared: Evaluation, results display, error handling
 * - Zero regressions: Formula mode preserves ALL FormulaTestPanel v702 features
 * 
 * Usage:
 * ```tsx
 * // Formula mode
 * <UnifiedTestPanel
 *   mode="formula"
 *   variables={variables}
 *   formulaCode={code}
 *   returnType="number"
 *   automationId={automationId}
 * />
 * 
 * // BAL mode
 * <UnifiedTestPanel
 *   mode="bal"
 *   balCode={code}
 *   automationId={automationId}
 * />
 * ```
 */

import { useState, useMemo, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Play, Bug, AlertCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Switch } from '../../../ui/switch';
import { VariableInputsSection } from './VariableInputsSection';
import { AttributeInputsSection, type AttributeDefinition } from './AttributeInputsSection';
import { EvaluationResults } from './EvaluationResults';
import { DebugControls } from '../../code/FormulaEditor/DebugControls';
import { DebugVariableInspector } from '../../code/FormulaEditor/DebugVariableInspector';
import { ErrorWarningList, type LineIssue } from '../../code/FormulaEditor/ErrorWarningList';
import { useThresholdEvaluation, useDebugger } from '../../code/FormulaEditor/hooks';
import { useAutomationDataModel } from '../../../../hooks/useAutomationDataModel';
import { extractDefinedVariables, extractParameterVariables } from '../../../../utils/formulaParser';
import { getReferencedAttributes, extractStringOptions } from '../../../../utils/formulaTestUtils';
import { buildVerbalizationMap } from '../../../../utils/verbalizationUtils';
import { EvaluationEngine } from '../../../../services/evaluationEngine';
import { TracingEvaluator } from '../../../../services/evaluationEngine/debugger';
import { buildDebugHighlight } from '../../../../utils/debugHighlighting';
import { getErrorLine } from '../../../../services/evaluationEngine/errors/EvaluationError';
import { TimeValue } from '../../../../services/evaluationEngine/types/TypeSystem';
import { parseFormattedTime } from '../../../../utils/timeFormatting';
import type { Variable, Threshold } from '../../core/types';
import type { ExecutionTrace } from '../../../../services/evaluationEngine/debugger';
import type { DebugHighlight } from '../../../../utils/debugHighlighting';
import styles from './UnifiedTestPanel.module.css';

/**
 * Error highlight information for editor line highlighting
 */
export interface ErrorHighlight {
  line: number;
  column?: number;
  message: string;
}

/**
 * Warning highlight information for editor line highlighting
 */
export interface WarningHighlight {
  line: number;
  column?: number;
  message: string;
  code?: string;
}

export interface UnifiedTestPanelProps {
  /** Editor mode */
  mode: 'formula' | 'bal';
  
  // Formula Mode Props
  /** Variables (formula mode) */
  variables?: Variable[];
  /** Formula code (formula mode) */
  formulaCode?: string;
  /** Return type (formula mode) */
  returnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Thresholds (formula mode) */
  thresholds?: Threshold[];
  
  // BAL Mode Props
  /** BAL code (BAL mode) */
  balCode?: string;
  
  // Shared Props
  /** Automation ID for data model integration */
  automationId?: string;
  
  // Callbacks
  /** Debug highlight callback */
  onDebugHighlight?: (highlight: DebugHighlight | null) => void;
  /** Error highlight callback */
  onErrorHighlight?: (highlight: ErrorHighlight | null) => void;
  /** Warning highlights callback */
  onWarningHighlight?: (highlights: WarningHighlight[] | null) => void;
  /** Line issues */
  lineIssues?: LineIssue[];
}

/**
 * Imperative handle for keyboard shortcuts
 */
export interface UnifiedTestPanelHandle {
  runTest: () => void;
  runTestDebug: () => void;
  toggleDebugMode: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  clearDebugOutput: () => void;
}

/**
 * Flatten nested attribute values for evaluation engine
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
 * Set nested value in object using dot-notation path
 */
function setNestedValue(obj: any, path: string, value: any): any {
  const newObj = { ...obj };
  const parts = path.split('.');
  let current: any = newObj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    } else {
      current[parts[i]] = { ...current[parts[i]] };
    }
    current = current[parts[i]];
  }
  
  current[parts[parts.length - 1]] = value;
  return newObj;
}

export const UnifiedTestPanel = forwardRef<UnifiedTestPanelHandle, UnifiedTestPanelProps>((props, ref) => {
  const {
    mode,
    variables = [],
    formulaCode = '',
    returnType = 'number',
    thresholds = [],
    balCode = '',
    automationId,
    onDebugHighlight,
    onErrorHighlight,
    onWarningHighlight,
    lineIssues = []
  } = props;

  // Get data model (if automationId provided)
  const dataModel = useAutomationDataModel(automationId);

  // Test values
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});
  const [nestedAttributeValues, setNestedAttributeValues] = useState<any>({});
  
  // Results
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [definedVariableValues, setDefinedVariableValues] = useState<Record<string, any>>({});
  
  // Debug state
  const [debugMode, setDebugMode] = useState(false);
  const [executionTrace, setExecutionTrace] = useState<ExecutionTrace | null>(null);
  
  // Refs
  const shouldAutoRunRef = useRef(false);
  
  // Hooks
  const { evaluate: evaluateThreshold } = useThresholdEvaluation({ thresholds });
  const debug = useDebugger(executionTrace);

  // Get code based on mode
  const code = mode === 'formula' ? formulaCode : balCode;

  /**
   * Extract input and defined variables (formula mode only)
   */
  const { inputVariables, definedVariableNames } = useMemo(() => {
    if (mode !== 'formula') {
      return { inputVariables: [], definedVariableNames: [] };
    }

    const definedNames = extractDefinedVariables(formulaCode, variables);
    const parameterNames = extractParameterVariables(formulaCode);
    
    const inputs = variables.filter(v => parameterNames.includes(v.name));
    
    return {
      inputVariables: inputs,
      definedVariableNames: definedNames
    };
  }, [mode, formulaCode, variables]);

  /**
   * Get attribute definitions from data model
   */
  const attributeDefinitions = useMemo((): AttributeDefinition[] => {
    if (!dataModel.resolvedModel) return [];

    const attributes: AttributeDefinition[] = [];
    
    for (const [path, attr] of dataModel.resolvedModel.attributes.entries()) {
      const isCustom = dataModel.getAttributeSource(path) === 'custom';
      const vocabulary = dataModel.resolvedModel.vocabulary.get(path) || [];
      
      attributes.push({
        path,
        type: attr.type,
        description: attr.description,
        defaultValue: attr.defaultValue,
        unit: attr.unit,
        isCustom,
        vocabulary
      });
    }
    
    return attributes;
  }, [dataModel.resolvedModel, dataModel.getAttributeSource]);

  /**
   * Get referenced attributes (mode-specific)
   */
  const referencedAttributes = useMemo(() => {
    if (mode === 'formula') {
      return getReferencedAttributes(formulaCode);
    }
    
    // BAL mode: use all attributes from data model
    return attributeDefinitions.map(a => a.path);
  }, [mode, formulaCode, attributeDefinitions]);

  /**
   * Filter to only referenced attributes
   */
  const filteredAttributes = useMemo(() => {
    return attributeDefinitions.filter(attr => 
      referencedAttributes.includes(attr.path)
    );
  }, [attributeDefinitions, referencedAttributes]);

  /**
   * Extract string options from formula (formula mode only)
   */
  const extractedOptions = useMemo(() => {
    if (mode !== 'formula') return {};

    const options: Record<string, string[]> = {};
    variables.forEach(v => {
      const opts = extractStringOptions(formulaCode, v.name);
      if (opts.length > 0) {
        options[v.name] = opts;
      }
    });
    return options;
  }, [mode, formulaCode, variables]);

  /**
   * Initialize default test values
   */
  useEffect(() => {
    // Initialize variable values
    setTestValues(prev => {
      const newValues = { ...prev };
      variables.forEach(v => {
        if (!(v.name in newValues)) {
          const options = extractedOptions[v.name];
          if (options && options.length > 0) {
            newValues[v.name] = options[0];
          } else if (v.type === 'number') {
            newValues[v.name] = '0';
          } else if (v.type === 'boolean') {
            newValues[v.name] = 'true';
          } else if (v.type === 'date') {
            newValues[v.name] = new Date().toISOString().split('T')[0];
          } else if (v.type === 'time') {
            newValues[v.name] = '00:00:00';
          } else {
            newValues[v.name] = '';
          }
        }
      });
      return newValues;
    });

    // Initialize attribute values
    setAttributeValues(prev => {
      const newValues = { ...prev };
      filteredAttributes.forEach(attr => {
        if (!(attr.path in newValues)) {
          if (attr.type === 'number') {
            newValues[attr.path] = attr.defaultValue?.toString() || '0';
          } else if (attr.type === 'boolean') {
            newValues[attr.path] = attr.defaultValue?.toString() || 'true';
          } else if (attr.type === 'date') {
            newValues[attr.path] = attr.defaultValue || new Date().toISOString().split('T')[0];
          } else {
            newValues[attr.path] = attr.defaultValue?.toString() || '';
          }
        }
      });
      return newValues;
    });
  }, [variables, filteredAttributes, extractedOptions]);

  /**
   * Clear trace when debug mode toggled off
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
   * Auto-run when debug mode enabled via keyboard shortcut
   */
  useEffect(() => {
    if (debugMode && shouldAutoRunRef.current) {
      shouldAutoRunRef.current = false;
      handleEvaluate();
    }
  }, [debugMode]);

  /**
   * Clear trace when code changes
   */
  useEffect(() => {
    setExecutionTrace(null);
    setDebugMode(false);
    if (onDebugHighlight) {
      onDebugHighlight(null);
    }
  }, [code, onDebugHighlight]);

  /**
   * Emit debug highlight when step changes
   */
  useEffect(() => {
    if (onDebugHighlight && executionTrace && debugMode) {
      const highlight = buildDebugHighlight(executionTrace, debug.state.currentStep);
      onDebugHighlight(highlight);
    } else if (onDebugHighlight && (!executionTrace || !debugMode)) {
      onDebugHighlight(null);
    }
  }, [executionTrace, debug.state.currentStep, debugMode, onDebugHighlight]);

  /**
   * Handle nested attribute change (BAL mode)
   */
  const handleNestedAttributeChange = (fullPath: string, value: any) => {
    const newNested = setNestedValue(nestedAttributeValues, fullPath, value);
    setNestedAttributeValues(newNested);
    
    const flattened = flattenAttributeValues(newNested);
    setAttributeValues(flattened);
  };

  /**
   * Evaluate formula/BAL with test values
   */
  const handleEvaluate = () => {
    try {
      setError(null);
      setExecutionTrace(null);
      
      if (onErrorHighlight) {
        onErrorHighlight(null);
      }

      // Build verbalization map
      const verbalizationMap = buildVerbalizationMap(variables);

      // Build execution context
      const executionVariables = new Map<string, any>();
      const attributes = new Map<string, any>();
      const variableTypes = new Map<string, string>();

      // Add variable values
      variables.forEach(v => {
        variableTypes.set(v.name, v.type);
        const value = testValues[v.name];
        
        if (v.type === 'number') {
          executionVariables.set(v.name, parseFloat(value) || 0);
        } else if (v.type === 'boolean') {
          executionVariables.set(v.name, value === 'true');
        } else if (v.type === 'date') {
          executionVariables.set(v.name, new Date(value));
        } else if (v.type === 'time') {
          const timeFormat = v.timeFormat || 'HH:MM:SS';
          const milliseconds = parseFormattedTime(value, timeFormat);
          executionVariables.set(v.name, new TimeValue(milliseconds));
        } else {
          executionVariables.set(v.name, value);
        }
      });

      // Add attribute values
      filteredAttributes.forEach(attr => {
        const value = attributeValues[attr.path];
        
        if (attr.type === 'number') {
          attributes.set(attr.path, parseFloat(value) || 0);
        } else if (attr.type === 'boolean') {
          attributes.set(attr.path, value === 'true');
        } else if (attr.type === 'date') {
          attributes.set(attr.path, new Date(value));
        } else if (attr.type === 'time') {
          const milliseconds = parseFormattedTime(value, 'HH:MM:SS');
          attributes.set(attr.path, milliseconds);
        } else {
          attributes.set(attr.path, value);
        }
      });

      const context = { variables: executionVariables, attributes, variableTypes };

      // Evaluate with or without tracing
      if (debugMode) {
        const tracer = new TracingEvaluator();
        const evalResult = tracer.evaluate(code, context, verbalizationMap);

        if (!evalResult.success) {
          const errorMessages = evalResult.errors.map(e => e.message).join('\n');
          setError(errorMessages);
          setResult(null);

          if (onErrorHighlight && evalResult.errors.length > 0) {
            const firstError = evalResult.errors[0];
            const errorLine = getErrorLine(firstError);
            if (errorLine !== null) {
              onErrorHighlight({ line: errorLine, message: firstError.message });
            }
          }
        } else {
          setResult(evalResult.value);
          setExecutionTrace(evalResult.trace || null);
          
          if (onErrorHighlight) {
            onErrorHighlight(null);
          }
        }
      } else {
        const engine = new EvaluationEngine();
        const evalResult = engine.evaluate(code, context, verbalizationMap);

        if (!evalResult.success) {
          const errorMessages = evalResult.errors.map(e => e.message).join('\n');
          setError(errorMessages);
          setResult(null);

          if (onErrorHighlight && evalResult.errors.length > 0) {
            const firstError = evalResult.errors[0];
            const errorLine = getErrorLine(firstError);
            if (errorLine !== null) {
              onErrorHighlight({ line: errorLine, message: firstError.message });
            }
          }
        } else {
          setResult(evalResult.value);
          
          if (onErrorHighlight) {
            onErrorHighlight(null);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed');
      setResult(null);
      setExecutionTrace(null);

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
   * Imperative handle for keyboard shortcuts
   */
  useImperativeHandle(ref, () => ({
    runTest: () => handleEvaluate(),
    runTestDebug: () => {
      shouldAutoRunRef.current = true;
      setDebugMode(true);
    },
    toggleDebugMode: () => setDebugMode(prev => !prev),
    stepForward: () => debug.actions.stepForward(),
    stepBackward: () => debug.actions.stepBackward(),
    clearDebugOutput: () => {
      setExecutionTrace(null);
      setResult(null);
      setError(null);
      if (onDebugHighlight) {
        onDebugHighlight(null);
      }
    }
  }));

  // Check if we have anything to test
  const hasTestableItems = (mode === 'formula' && (inputVariables.length > 0 || filteredAttributes.length > 0)) ||
                          (mode === 'bal' && filteredAttributes.length > 0);

  return (
    <div className={styles.panel}>
      {/* Error/Warning List */}
      {lineIssues.length > 0 && (
        <ErrorWarningList issues={lineIssues} />
      )}

      {/* Variables Section (Formula Mode Only) */}
      {mode === 'formula' && (
        <VariableInputsSection
          inputVariables={inputVariables}
          definedVariableNames={definedVariableNames}
          allVariables={variables}
          testValues={testValues}
          onChange={(name, value) => setTestValues(prev => ({ ...prev, [name]: value }))}
          definedValues={definedVariableValues}
          extractedOptions={extractedOptions}
        />
      )}

      {/* Attributes Section */}
      <AttributeInputsSection
        mode={mode}
        attributes={filteredAttributes}
        attributeValues={attributeValues}
        onChange={(path, value) => setAttributeValues(prev => ({ ...prev, [path]: value }))}
        nestedValues={nestedAttributeValues}
        onNestedChange={handleNestedAttributeChange}
      />

      {/* Empty State */}
      {!hasTestableItems && (
        <div className={styles.emptyState}>
          <AlertCircle size={24} />
          <p>
            {mode === 'bal' 
              ? 'No data model attributes available'
              : 'No variables or attributes to test'
            }
          </p>
          <p className={styles.emptyHint}>
            {mode === 'bal'
              ? 'Configure a data model for this automation to enable testing'
              : 'Add variables or reference attributes (#attribute) in your formula to enable testing'
            }
          </p>
        </div>
      )}

      {/* Actions */}
      {hasTestableItems && (
        <div className={styles.actions}>
          {/* Debug Mode Toggle (Formula Mode Only) */}
          {mode === 'formula' && (
            <div className={styles.debugToggle}>
              <div className={styles.debugToggleLabel}>
                <Bug size={16} className={styles.debugToggleIcon} />
                Debug Mode
              </div>
              <Switch
                checked={debugMode}
                onCheckedChange={setDebugMode}
                style={{ fontFamily: 'var(--font-family-sans)' }}
              />
            </div>
          )}

          {/* Evaluate Button */}
          <Button
            onClick={handleEvaluate}
            className={styles.evaluateButton}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-02)',
              background: 'var(--button-primary)',
              color: 'var(--text-on-color)',
              border: 'none',
              padding: 'var(--spacing-03) var(--spacing-05)',
              fontFamily: 'var(--font-family-sans)',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '18px',
              cursor: 'pointer',
            }}
          >
            <Play size={16} />
            <span>{mode === 'bal' ? 'Evaluate Rule' : 'Evaluate Formula'}</span>
          </Button>
        </div>
      )}

      {/* Debug Controls (Formula Mode Only) */}
      {mode === 'formula' && debugMode && executionTrace && (
        <>
          <DebugControls
            trace={executionTrace}
            currentStep={debug.state.currentStep}
            onStepChange={debug.actions.setStep}
            onStepForward={debug.actions.stepForward}
            onStepBackward={debug.actions.stepBackward}
          />

          <DebugVariableInspector
            trace={executionTrace}
            currentStep={debug.state.currentStep}
          />
        </>
      )}

      {/* Results */}
      <EvaluationResults
        result={result}
        error={error}
        returnType={returnType}
        thresholds={thresholds}
        debugMode={debugMode}
      />
    </div>
  );
});

UnifiedTestPanel.displayName = 'UnifiedTestPanel';