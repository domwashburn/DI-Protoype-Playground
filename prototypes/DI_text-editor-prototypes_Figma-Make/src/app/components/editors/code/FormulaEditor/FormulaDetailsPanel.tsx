/**
 * FormulaDetailsPanel - Formula Metadata Configuration Panel
 * 
 * Displays formula metadata (name, description, return type) in the sidebar.
 * Part of the Formula Editor's tabbed sidebar interface.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 * Replace shadcn/ui components with Carbon equivalents when converting.
 */

import { useState } from 'react';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { ThresholdConfig } from './ThresholdConfig';
import { ThresholdBadge } from './ThresholdBadge';
import { useThresholdEvaluation } from './hooks';
import type { Threshold } from '../../core/types';
import styles from './FormulaDetailsPanel.module.css';

export interface FormulaDetailsPanelProps {
  /** Formula name */
  formulaName: string;
  /** Formula description */
  formulaDescription: string;
  /** Formula return type */
  formulaReturnType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Thresholds for numeric formulas */
  thresholds?: Threshold[];
  /** Called when metadata changes */
  onMetadataChange: (metadata: { name?: string; description?: string; returnType?: 'number' | 'string' | 'boolean' | 'date' }) => void;
  /** Called when thresholds change */
  onThresholdsChange?: (thresholds: Threshold[]) => void;
  /** Whether editor is read-only */
  readOnly?: boolean;
  /** Editor mode - affects which features are shown */
  mode?: 'formula' | 'bal';
}

export function FormulaDetailsPanel({
  formulaName,
  formulaDescription,
  formulaReturnType,
  thresholds = [],
  onMetadataChange,
  onThresholdsChange,
  readOnly = false,
  mode = 'formula',
}: FormulaDetailsPanelProps) {
  // Test value for threshold evaluation demo
  const [testValue, setTestValue] = useState<string>('');
  
  // Evaluate test value against thresholds
  const { evaluate } = useThresholdEvaluation({ thresholds });
  const testEvaluation = testValue ? evaluate(parseFloat(testValue)) : null;

  return (
    <div className={styles.detailsPanel}>
      {/* Formula Name */}
      <div className={styles.field}>
        <label className={styles.label}>Formula Name</label>
        <Input
          value={formulaName}
          onChange={(e) => onMetadataChange({ name: e.target.value })}
          placeholder="e.g., LoanEligibilityScore"
          className={styles.input}
          readOnly={readOnly}
        />
        <p className={styles.hint}>
          Can be invoked like: =LoanEligibilityScore($param1, $param2)
        </p>
      </div>

      {/* Return Type */}
      <div className={styles.field}>
        <label className={styles.label}>Return Type</label>
        <Select
          value={formulaReturnType}
          onValueChange={(value) => onMetadataChange({ returnType: value as any })}
          disabled={readOnly}
        >
          <SelectTrigger className={styles.select}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Formula Description */}
      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <Textarea
          value={formulaDescription}
          onChange={(e) => onMetadataChange({ description: e.target.value })}
          placeholder="Describe what this formula calculates..."
          className={styles.textarea}
          rows={4}
          readOnly={readOnly}
        />
      </div>

      {/* Thresholds (only for numeric formulas) */}
      {formulaReturnType === 'number' && onThresholdsChange && (
        <div className={styles.section}>
          <div className={styles.sectionDivider} />
          <ThresholdConfig
            thresholds={thresholds}
            onThresholdsChange={onThresholdsChange}
            readOnly={readOnly}
          />
          
          {/* Test Value for Threshold Evaluation */}
          {thresholds.length > 0 && (
            <div className={styles.testSection}>
              <label className={styles.label}>Test Value</label>
              <Input
                type="number"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                placeholder="Enter a value to test..."
                className={styles.input}
              />
              <p className={styles.hint}>
                Enter a number to see how it would be categorized
              </p>
              
              {testEvaluation && (
                <div className={styles.evaluationResult}>
                  <ThresholdBadge evaluation={testEvaluation} showValue size="md" />
                </div>
              )}
              
              {testValue && !testEvaluation && !isNaN(parseFloat(testValue)) && (
                <div className={styles.noMatch}>
                  No threshold matches value {testValue}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}