/**
 * GhostValue - Inline value annotation for debugger
 * 
 * Displays intermediate expression results inline in the formula editor
 * during debug mode. Shows the value and type with a subtle, non-intrusive style.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 */

import type { PrimitiveType } from '../../../../services/evaluationEngine/types/TypeSystem';
import { formatGhostValue, getTypeLabel } from '../../../../utils/debugHighlighting';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../ui/tooltip';
import styles from './GhostValue.module.css';

export interface GhostValueProps {
  /** Line number (1-indexed) - Used for identification */
  line: number;
  
  /** Measured top offset from line height data (REQUIRED for proper alignment with wrapping) */
  lineTop: number;
  
  /** Value to display */
  value: any;
  
  /** Type of the value */
  type?: PrimitiveType;
  
  /** Optional description */
  description?: string;
  
  /** Is this the current debug step? */
  isCurrent?: boolean;
}

export function GhostValue({ 
  line,
  lineTop,
  value,
  type,
  description,
  isCurrent
}: GhostValueProps) {
  const formattedValue = formatGhostValue(value, type);
  const typeLabel = type ? getTypeLabel(type) : undefined;
  
  // Extract calculation from description (remove result and type suffix)
  let displayText = description || formattedValue;
  
  // Remove type suffix FIRST (e.g., " NUMBER", " BOOLEAN", etc.)
  if (description && typeLabel) {
    const typeSuffixes = [' BOOLEAN', ' NUMBER', ' STRING', ' DATE', ' TIME', ' ARRAY', ' OBJECT', ' NULL'];
    for (const suffix of typeSuffixes) {
      if (displayText.endsWith(suffix)) {
        displayText = displayText.slice(0, -suffix.length);
        break;
      }
    }
  }
  
  // Handle assignments vs. expressions differently
  // Assignments: "$variable = expression = result" or "$variable = result"
  // Expressions: "expression = result"
  
  const parts = displayText.split(' = ');
  
  if (parts.length === 3) {
    // Format: "$variable = expression = result"
    // Show: "$variable = expression" (variable + calculation/function)
    displayText = `${parts[0]} = ${parts[1]}`;
  } else if (parts.length === 2) {
    // Two possibilities:
    // 1. Assignment: "$variable = value" -> show "$variable"
    // 2. Expression: "expression = result" -> show "expression"
    
    // If first part starts with $, it's an assignment
    if (parts[0].startsWith('$')) {
      // Simple assignment - show just variable name
      displayText = parts[0];
    } else {
      // Expression comparison - show the expression without result
      displayText = parts[0];
    }
  }
  // else: single part, use as-is
  
  // Clean up IF/THEN/ELSE prefixes - just show the expression
  displayText = displayText
    .replace(/^IF:\s*/, '')
    .replace(/^THEN:\s*/, '')
    .replace(/^ELSE:\s*/, '')
    .replace(/^RETURN:\s*/, '');
  
  // Prepare full value for tooltip
  const fullValueText = Array.isArray(value) 
    ? JSON.stringify(value, null, 2)
    : typeof value === 'object' && value !== null && !(value instanceof Date)
    ? JSON.stringify(value, null, 2)
    : formattedValue;
  
  // Tooltip shows type and full value
  const tooltipContent = type ? `${typeLabel}: ${fullValueText}` : fullValueText;
  
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`${styles.ghostValue} ${!isCurrent ? styles.previous : ''}`}
            style={{
              '--line-top': `${lineTop}px`,
              pointerEvents: 'auto' // Enable pointer events for tooltip trigger
            } as React.CSSProperties}
          >
            <span className={styles.ghostValueText}>
              {displayText}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '12px', fontFamily: 'monospace' }}>{tooltipContent}</pre>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}