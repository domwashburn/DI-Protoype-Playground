/**
 * DebugOutputColumn - Right-side debug value display
 * 
 * Displays computed values for each line during debugger execution.
 * Positioned as a resizable side rail on the right edge of the Formula Editor.
 * 
 * Phase 1: Basic rendering with line-synced heights and truncated text
 * Phase 2: Resize functionality (planned)
 * Phase 3: Polish and edge cases (planned)
 */

import React from 'react';
import styles from './DebugOutputColumn.module.css';

export interface DebugLineValue {
  lineNumber: number;
  value: any;
  type: 'number' | 'string' | 'boolean' | 'date' | 'time' | 'array' | 'object' | 'null' | 'error';
  displayText: string;
  fullText?: string;
  hasError?: boolean;
}

export interface LineHeight {
  lineNumber: number;
  height: number;
  top: number;
}

export interface DebugOutputColumnProps {
  /** Array of line numbers (e.g., [1, 2, 3, ...]) */
  lineNumbers: number[];
  
  /** Measured heights for wrapped lines (CRIT-003 compliant) */
  lineHeights: LineHeight[];
  
  /** Values to display per line */
  debugValues: DebugLineValue[];
  
  /** Column width in pixels (Phase 1: fixed, Phase 2: resizable) */
  width: number;
  
  /** Current line being debugged (for color highlighting) */
  currentLine?: number;
  
  /** Are we at the final step of execution? */
  isFinalStep?: boolean;
  
  /** Additional className for wrapper (passed from FormulaEditor) */
  className?: string;
  
  /** Resize handler for column width adjustment */
  onResize?: (deltaX: number) => void;
  
  /** Minimum width constraint (pixels) */
  minWidth?: number;
  
  /** Maximum width constraint (pixels) */
  maxWidth?: number;
}

export const DebugOutputColumn = React.forwardRef<HTMLDivElement, DebugOutputColumnProps>(({
  lineNumbers,
  lineHeights,
  debugValues,
  width,
  currentLine,
  isFinalStep,
  className
}, ref) => {
  // Create lookup map for quick value access
  const valueMap = React.useMemo(() => {
    const map = new Map<number, DebugLineValue>();
    debugValues.forEach(v => map.set(v.lineNumber, v));
    return map;
  }, [debugValues]);
  
  // Find the last line with a value (final result)
  const finalResultLine = React.useMemo(() => {
    if (debugValues.length === 0) return -1;
    // Get the highest line number from debugValues
    return Math.max(...debugValues.map(v => v.lineNumber));
  }, [debugValues]);

  return (
    <div 
      ref={ref}
      className={`${styles.debugOutputColumn} ${className || ''}`}
      style={{ width: `${width}px` }}
      aria-label="Debug output values"
    >
      {lineNumbers.map(lineNumber => {
        // Get debug value for this line (if any)
        const debugValue = valueMap.get(lineNumber);
        
        // Only the final result line gets green styling, and only when we're at the final step
        const isFinalResult = isFinalStep && lineNumber === finalResultLine && debugValue !== undefined;
        
        // Find line height data for dynamic wrap multiplier (MATCHES LINE NUMBERS PATTERN)
        const lineHeightData = lineHeights.find(lh => lh.lineNumber === lineNumber);
        const baseLineHeight = 22.4; // calc(14px * 1.6)
        const wrapMultiplier = lineHeightData ? Math.round(lineHeightData.height / baseLineHeight) : 1;
        
        return (
          <div
            key={lineNumber}
            className={`${styles.debugOutputCell} ${debugValue?.hasError ? styles.error : ''} ${isFinalResult ? styles.finalResult : ''}`}
            style={{
              '--line-wrap-multiplier': wrapMultiplier
            } as React.CSSProperties}
            title={debugValue?.fullText} // Tooltip shows full value
          >
            {debugValue?.displayText || ''}
          </div>
        );
      })}
    </div>
  );
});

DebugOutputColumn.displayName = 'DebugOutputColumn';