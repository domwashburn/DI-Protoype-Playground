/**
 * BranchIndicator - Visual indicator for executed/skipped branches
 * 
 * Shows which IF/ELSIF/ELSE branches were taken during execution.
 * Taken branches show a green left border, skipped branches show gray.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 */

import styles from './BranchIndicator.module.css';

export interface BranchIndicatorProps {
  /** Line number (1-indexed) - Used for identification */
  line: number;
  
  /** Measured top offset from line height data (REQUIRED for proper alignment with wrapping) */
  lineTop: number;
  
  /** Measured height from line height data (REQUIRED for proper alignment with wrapping) */
  lineHeight: number;
  
  /** Was this branch taken? */
  taken: boolean;
  
  /** Type of branch */
  type: 'then' | 'elsif' | 'else';
  
  /** Condition result (for IF/ELSIF) */
  conditionResult?: boolean;
}

export function BranchIndicator({ 
  line,
  lineTop,
  lineHeight,
  taken, 
  type,
  conditionResult 
}: BranchIndicatorProps) {
  const title = [
    `${type.toUpperCase()} branch`,
    taken ? '✓ Executed' : '✗ Skipped',
    conditionResult !== undefined && `Condition: ${conditionResult ? 'true' : 'false'}`
  ].filter(Boolean).join(' | ');
  
  return (
    <div
      className={`${styles.branchIndicator} ${taken ? styles.taken : styles.skipped}`}
      style={{
        '--line-top': `${lineTop}px`,
        '--line-height-override': `${lineHeight}px`
      } as React.CSSProperties}
      title={title}
    >
      {/* Left border line */}
      <div className={styles.branchLine} />
      
      {/* Arrow indicator for taken branches */}
      {taken && (
        <div className={styles.branchArrow}>→</div>
      )}
    </div>
  );
}