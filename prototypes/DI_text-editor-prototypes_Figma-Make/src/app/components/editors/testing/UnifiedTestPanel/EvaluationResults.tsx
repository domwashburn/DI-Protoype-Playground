/**
 * EvaluationResults - Result Display Component
 * 
 * Displays evaluation results with type-aware formatting
 * Supports threshold visualization for numeric results
 * Shows errors in a user-friendly format
 */

import { AlertCircle, CheckCircle } from 'lucide-react';
import { ThresholdBadge } from '../../code/FormulaEditor/ThresholdBadge';
import type { Threshold } from '../../core/types';
import styles from './EvaluationResults.module.css';

export interface EvaluationResultsProps {
  /** Result value */
  result: any;
  /** Error message (if evaluation failed) */
  error: string | null;
  /** Return type for formatting */
  returnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Thresholds for numeric results */
  thresholds?: Threshold[];
  /** Whether debug mode is active */
  debugMode?: boolean;
}

/**
 * Evaluate threshold for numeric result
 */
function evaluateThreshold(value: number, thresholds: Threshold[]) {
  if (thresholds.length === 0) return null;

  // Sort thresholds by value (ascending)
  const sorted = [...thresholds].sort((a, b) => {
    const aVal = typeof a.value === 'string' ? parseFloat(a.value) : a.value;
    const bVal = typeof b.value === 'string' ? parseFloat(b.value) : b.value;
    return aVal - bVal;
  });

  // Find the threshold that applies
  for (let i = sorted.length - 1; i >= 0; i--) {
    const threshold = sorted[i];
    const thresholdValue = typeof threshold.value === 'string' 
      ? parseFloat(threshold.value) 
      : threshold.value;
    
    if (threshold.operator === '>=' && value >= thresholdValue) {
      return threshold;
    } else if (threshold.operator === '>' && value > thresholdValue) {
      return threshold;
    } else if (threshold.operator === '<=' && value <= thresholdValue) {
      return threshold;
    } else if (threshold.operator === '<' && value < thresholdValue) {
      return threshold;
    } else if (threshold.operator === '==' && value === thresholdValue) {
      return threshold;
    }
  }

  // No threshold matched - use default/first
  return sorted[0] || null;
}

/**
 * Format result value based on type
 */
function formatResult(value: any, returnType?: string): string {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (returnType === 'boolean') {
    return value ? 'True' : 'False';
  }

  if (returnType === 'date' && value instanceof Date) {
    return value.toISOString().split('T')[0];
  }

  if (returnType === 'time') {
    // Format time value
    if (typeof value === 'number') {
      const hours = Math.floor(value / 3600000);
      const minutes = Math.floor((value % 3600000) / 60000);
      const seconds = Math.floor((value % 60000) / 1000);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  if (Array.isArray(value)) {
    return `[${value.map(v => formatResult(v, returnType)).join(', ')}]`;
  }

  return String(value);
}

export function EvaluationResults({
  result,
  error,
  returnType,
  thresholds = [],
  debugMode = false
}: EvaluationResultsProps) {
  
  // No result yet
  if (result === null && !error) {
    return null;
  }

  // Error state
  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <div className={styles.sectionTitle}>Evaluation Error</div>
        </div>

        <div className={styles.errorContainer}>
          <pre className={styles.errorMessage}>{error}</pre>
        </div>
      </div>
    );
  }

  // Success state
  const formattedResult = formatResult(result, returnType);
  const isNumeric = returnType === 'number' && typeof result === 'number';
  const threshold = isNumeric ? evaluateThreshold(result, thresholds) : null;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <CheckCircle size={16} className={styles.successIcon} />
        <div className={styles.sectionTitle}>Result</div>
        {debugMode && (
          <span className={styles.debugBadge}>Debug Active</span>
        )}
      </div>

      <div className={styles.resultContainer}>
        <div className={styles.resultValue}>{formattedResult}</div>
        
        {returnType && (
          <div className={styles.resultType}>Type: {returnType}</div>
        )}

        {/* Threshold Badge for numeric results */}
        {isNumeric && threshold && (
          <div className={styles.thresholdContainer}>
            <ThresholdBadge
              label={threshold.label}
              color={threshold.color}
              value={result}
              showValue={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
