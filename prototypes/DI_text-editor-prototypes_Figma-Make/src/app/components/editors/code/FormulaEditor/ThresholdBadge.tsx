/**
 * ThresholdBadge - Threshold Evaluation Display Badge
 * 
 * Displays the result of threshold evaluation with color-coded severity.
 * Shows the numeric value and its category label.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 * Replace with Carbon Tag or Badge component when converting.
 */

import type { ThresholdEvaluation } from '../../core/types';
import styles from './ThresholdBadge.module.css';

export interface ThresholdBadgeProps {
  /** Evaluation result */
  evaluation: ThresholdEvaluation | null;
  /** Show numeric value */
  showValue?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

/**
 * Threshold Badge Component
 * 
 * @example
 * const evaluation = evaluateThreshold(750, thresholds);
 * 
 * <ThresholdBadge 
 *   evaluation={evaluation}
 *   showValue
 *   size="md"
 * />
 * // Renders: "750 - Very Good" with green background
 */
export function ThresholdBadge({
  evaluation,
  showValue = true,
  size = 'md',
  className = '',
}: ThresholdBadgeProps) {
  if (!evaluation) {
    return null;
  }

  return (
    <div
      className={`${styles.badge} ${styles[size]} ${styles[evaluation.severity]} ${className}`}
      style={{
        '--badge-color': evaluation.color,
      } as React.CSSProperties}
      title={`${evaluation.category} (${evaluation.value})`}
    >
      {showValue && (
        <span className={styles.value}>{evaluation.value}</span>
      )}
      <span className={styles.separator}>-</span>
      <span className={styles.category}>{evaluation.category}</span>
    </div>
  );
}
