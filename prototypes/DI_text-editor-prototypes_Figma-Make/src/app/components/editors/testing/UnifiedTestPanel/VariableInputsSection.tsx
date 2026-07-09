/**
 * VariableInputsSection - Variable Test Inputs
 * 
 * Displays test input fields for formula variables
 * Distinguishes between input variables (parameters) and defined variables
 * 
 * Formula mode only - BAL mode doesn't use $variables
 */

import { AlertCircle } from 'lucide-react';
import { TestInputRow } from './TestInputRow';
import type { Variable } from '../../core/types';
import styles from './VariableInputsSection.module.css';

export interface VariableInputsSectionProps {
  /** Input variables (parameters - user provides values) */
  inputVariables: Variable[];
  /** Defined variable names (calculated by formula) */
  definedVariableNames: string[];
  /** All variables (for looking up types) */
  allVariables: Variable[];
  /** Current test values */
  testValues: Record<string, string>;
  /** Change handler */
  onChange: (variableName: string, value: string) => void;
  /** Defined variable calculated values */
  definedValues?: Record<string, any>;
  /** Predefined options extracted from formula */
  extractedOptions?: Record<string, string[]>;
  /** Linked attribute paths (for link indicators) */
  linkedAttributes?: Record<string, string>;
}

export function VariableInputsSection({
  inputVariables,
  definedVariableNames,
  allVariables,
  testValues,
  onChange,
  definedValues = {},
  extractedOptions = {},
  linkedAttributes = {}
}: VariableInputsSectionProps) {
  
  // Get defined variables with their metadata
  const definedVariables = allVariables.filter(v => 
    definedVariableNames.includes(v.name)
  );

  // No variables at all
  if (inputVariables.length === 0 && definedVariables.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      {/* Input Variables Section */}
      {inputVariables.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Input Variables</div>
            <div className={styles.sectionHint}>
              Provide test values for formula parameters
            </div>
          </div>

          <div className={styles.inputList}>
            {inputVariables.map(variable => {
              const options = extractedOptions[variable.name] || [];
              const linkedAttr = linkedAttributes[variable.name];

              return (
                <TestInputRow
                  key={variable.name}
                  label={`$${variable.name}`}
                  type={variable.type}
                  value={testValues[variable.name] || ''}
                  onChange={(value) => onChange(variable.name, value)}
                  description={variable.description}
                  unit={variable.unit}
                  predefinedValues={options}
                  linkIndicator={linkedAttr ? `Linked to #${linkedAttr}` : undefined}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Defined Variables Section */}
      {definedVariables.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Defined Variables</div>
            <div className={styles.sectionHint}>
              Calculated by formula (read-only)
            </div>
          </div>

          <div className={styles.inputList}>
            {definedVariables.map(variable => {
              const calculatedValue = definedValues[variable.name];
              const displayValue = calculatedValue !== undefined 
                ? String(calculatedValue)
                : '';

              return (
                <TestInputRow
                  key={variable.name}
                  label={`$${variable.name}`}
                  type={variable.type}
                  value={displayValue}
                  onChange={() => {}} // No-op for defined variables
                  description={variable.description}
                  unit={variable.unit}
                  isLocked={true}
                  lockReason="This variable is defined by the formula"
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
