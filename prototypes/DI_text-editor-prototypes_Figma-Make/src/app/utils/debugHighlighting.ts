/**
 * Debug Highlighting Utilities
 * 
 * Utilities for extracting debug visualization data from execution traces.
 * Supports ghost values, branch indicators, and current line highlighting.
 */

import type { ExecutionTrace, TraceStep, NodeType } from '../services/evaluationEngine/debugger';
import type { PrimitiveType } from '../services/evaluationEngine/types/TypeSystem';
import type { DebugLineValue } from '../components/editors/code/FormulaEditor/DebugOutputColumn';

/**
 * Debug highlight information for the editor
 */
export interface DebugHighlight {
  /** Current execution line (1-indexed) */
  currentLine: number;
  
  /** Current column (1-indexed, optional) */
  currentColumn?: number;
  
  /** Ghost values to display (line number → value info) */
  ghostValues?: Map<number, GhostValueInfo>;
  
  /** Branch execution indicators */
  branchInfo?: BranchHighlight[];
  
  /** Debug output column values (Phase 1 - v03-DebugOutputColumnPlan) */
  debugOutputValues?: DebugLineValue[];
  
  /** Current step number (0-based) */
  currentStep?: number;
  
  /** Total number of steps */
  totalSteps?: number;
}

/**
 * Information about a ghost value (intermediate result)
 */
export interface GhostValueInfo {
  /** The actual value */
  value: any;
  
  /** Type of the value */
  type: PrimitiveType;
  
  /** Optional description */
  description?: string;
  
  /** Type of node that produced this value */
  nodeType?: NodeType;
}

/**
 * Information about a branch execution
 */
export interface BranchHighlight {
  /** Line number of the branch */
  line: number;
  
  /** Was this branch taken? */
  taken: boolean;
  
  /** Type of branch */
  type: 'then' | 'elsif' | 'else';
  
  /** Condition result (for IF/ELSIF) */
  conditionResult?: boolean;
}

/**
 * Extract ghost values (intermediate results) from execution trace
 * 
 * Shows the result of each expression on its line. For each line,
 * shows the most recent value computed on that line.
 * 
 * Priority: Assignments > Other expressions (so assignments don't get overwritten)
 * 
 * @param trace - Complete execution trace
 * @param currentStep - Current step index (0-based)
 * @returns Map of line numbers to ghost values
 */
export function extractGhostValues(
  trace: ExecutionTrace,
  currentStep: number
): Map<number, GhostValueInfo> {
  const ghostValues = new Map<number, GhostValueInfo>();
  
  if (!trace || !trace.steps || currentStep < 0) {
    return ghostValues;
  }
  
  // Get all steps up to and including current step
  const executedSteps = trace.steps.slice(0, currentStep + 1);
  
  // First pass: collect all ghost values
  const valuesByLine = new Map<number, GhostValueInfo[]>();
  
  for (const step of executedSteps) {
    const line = step.location.start.line;
    
    // Only show values for certain expression types
    if (shouldShowGhostValue(step)) {
      const valueInfo: GhostValueInfo = {
        value: step.result,
        type: step.resultType,
        description: step.description,
        nodeType: step.nodeType
      };
      
      if (!valuesByLine.has(line)) {
        valuesByLine.set(line, []);
      }
      valuesByLine.get(line)!.push(valueInfo);
    }
  }
  
  // Second pass: select best value for each line
  // Priority: Assignment > most recent expression
  for (const [line, values] of valuesByLine) {
    // Look for assignment
    const assignment = values.find(v => v.nodeType === 'Assignment');
    if (assignment) {
      ghostValues.set(line, assignment);
    } else {
      // Use most recent value
      ghostValues.set(line, values[values.length - 1]);
    }
  }
  
  return ghostValues;
}

/**
 * Determine if a trace step should have a ghost value displayed
 * 
 * We show ghost values for all expression evaluations:
 * - Binary operations (e.g., $a + $b → 150)
 * - Function calls (e.g., ROUND($x, 2) → 10.50)
 * - Variable references (e.g., $total → 1000)
 * - Assignments (e.g., $x = 100)
 * - IF conditions (e.g., $x > 10 → true)
 * - Literals (e.g., 100, "text", true)
 * 
 * We don't show for:
 * - Block expressions (contain multiple statements)
 * - Program (top-level container)
 */
function shouldShowGhostValue(step: TraceStep): boolean {
  const skipTypes: NodeType[] = [
    'Program',
    'Block',
    'IfExpression',  // Show condition separately, not the whole IF block
    'Return'  // Return statement itself (value is shown on its line)
  ];
  
  // Show all steps except those we explicitly skip
  return !skipTypes.includes(step.nodeType) && step.result !== undefined;
}

/**
 * Extract branch execution information from trace
 * 
 * Shows which IF/ELSIF/ELSE branches were taken and which were skipped.
 * 
 * @param trace - Complete execution trace
 * @param currentStep - Current step index (0-based)
 * @returns Array of branch highlights
 */
export function extractBranchInfo(
  trace: ExecutionTrace,
  currentStep: number
): BranchHighlight[] {
  const branchInfo: BranchHighlight[] = [];
  
  if (!trace || !trace.steps || currentStep < 0) {
    return branchInfo;
  }
  
  // Get all steps up to and including current step
  const executedSteps = trace.steps.slice(0, currentStep + 1);
  
  // Find all IF expression steps
  const ifSteps = executedSteps.filter(s => s.nodeType === 'IfExpression');
  
  for (const ifStep of ifSteps) {
    // If this IF has branch information
    if (ifStep.selectedBranch !== undefined) {
      branchInfo.push({
        line: ifStep.location.start.line,
        taken: ifStep.branchTaken ?? false,
        type: ifStep.selectedBranch as 'then' | 'elsif' | 'else',
        conditionResult: ifStep.conditionResult
      });
    }
  }
  
  return branchInfo;
}

/**
 * Scroll textarea to show a specific line
 * 
 * Centers the line in the viewport if it's not currently visible.
 * 
 * @param textareaRef - Reference to textarea element
 * @param line - Line number to scroll to (1-indexed)
 * @param lineHeight - Height of each line in pixels
 */
export function scrollToLine(
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  line: number,
  lineHeight: number
): void {
  if (!textareaRef.current) return;
  
  // Convert to 0-indexed
  const lineIndex = line - 1;
  
  const lineTop = lineIndex * lineHeight;
  const viewportHeight = textareaRef.current.clientHeight;
  const scrollTop = textareaRef.current.scrollTop;
  
  // Check if line is outside viewport
  const isAboveViewport = lineTop < scrollTop;
  const isBelowViewport = lineTop > scrollTop + viewportHeight - lineHeight;
  
  if (isAboveViewport || isBelowViewport) {
    // Scroll to center the line in the viewport
    const targetScroll = lineTop - (viewportHeight / 2) + (lineHeight / 2);
    
    // Smooth scroll
    textareaRef.current.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }
}

/**
 * Format a value for ghost value display
 * 
 * @param value - Value to format
 * @param type - Type of the value
 * @returns Formatted string for display
 */
export function formatGhostValue(value: any, type?: PrimitiveType): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  // Abbreviated notation for arrays and objects
  if (Array.isArray(value)) {
    return `[...${value.length}]`;
  }
  if (typeof value === 'object' && !(value instanceof Date)) {
    const keys = Object.keys(value);
    return `{...${keys.length}}`;
  }
  
  switch (type) {
    case 'number':
      if (typeof value === 'number') {
        // Format with locale and reasonable precision
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      }
      return String(value);
    
    case 'string':
      // Quote strings
      return `"${String(value)}"`;
    
    case 'boolean':
      return String(value);
    
    case 'date':
      return String(value);
    
    default:
      return String(value);
  }
}

/**
 * Get a descriptive label for a value type
 * 
 * @param type - Primitive type
 * @returns Short label for display
 */
export function getTypeLabel(type: PrimitiveType): string {
  switch (type) {
    case 'number': return 'num';
    case 'string': return 'str';
    case 'boolean': return 'bool';
    case 'date': return 'date';
    default: return 'any';
  }
}

/**
 * Truncate a long value for inline display
 * 
 * @param value - Formatted value string
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateValue(value: string, maxLength: number = 50): string {
  if (value.length <= maxLength) {
    return value;
  }
  
  return value.substring(0, maxLength - 3) + '...';
}

/**
 * Extract current step location for highlighting
 * 
 * @param trace - Execution trace
 * @param currentStep - Current step index
 * @returns Current line and column, or null if invalid
 */
export function getCurrentLocation(
  trace: ExecutionTrace | null,
  currentStep: number
): { line: number; column: number } | null {
  if (!trace || !trace.steps || currentStep < 0 || currentStep >= trace.steps.length) {
    return null;
  }
  
  const step = trace.steps[currentStep];
  
  // Safety check: ensure location and start exist
  if (!step.location || !step.location.start || !step.location.start.line) {
    console.warn('[getCurrentLocation] Step missing location data:', { currentStep, step });
    return null;
  }
  
  return {
    line: step.location.start.line,
    column: step.location.start.column || 0
  };
}

/**
 * Build complete debug highlight from trace and step
 * 
 * Convenience function that combines all debug highlight extraction.
 * 
 * @param trace - Execution trace
 * @param currentStep - Current step index
 * @returns Complete debug highlight, or null if not available
 */
export function buildDebugHighlight(
  trace: ExecutionTrace | null,
  currentStep: number
): DebugHighlight | null {
  console.log('[buildDebugHighlight] Called with:', {
    hasTrace: !!trace,
    traceSteps: trace?.steps?.length,
    currentStep
  });
  
  if (!trace || currentStep < 0 || currentStep >= trace.steps.length) {
    console.log('[buildDebugHighlight] Early return: no trace or invalid step');
    return null;
  }
  
  // Try to get location for current step
  let location = getCurrentLocation(trace, currentStep);
  console.log('[buildDebugHighlight] Current step location:', location);
  
  // If current step has no location, find the most recent step that has one
  if (!location) {
    console.log('[buildDebugHighlight] Current step has no location, searching backwards...');
    for (let i = currentStep - 1; i >= 0; i--) {
      location = getCurrentLocation(trace, i);
      if (location) {
        console.log(`[buildDebugHighlight] Found location at step ${i}:`, location);
        break;
      }
    }
  }
  
  // If still no location found, return null
  if (!location) {
    console.log('[buildDebugHighlight] No location found in any previous step!');
    if (trace.steps && trace.steps[currentStep]) {
      console.log('[buildDebugHighlight] Step data:', trace.steps[currentStep]);
    }
    return null;
  }
  
  const highlight = {
    currentLine: location.line,
    currentColumn: location.column,
    ghostValues: extractGhostValues(trace, currentStep),
    branchInfo: extractBranchInfo(trace, currentStep),
    debugOutputValues: extractDebugOutputValues(trace, currentStep),
    currentStep,
    totalSteps: trace.steps.length
  };
  
  console.log('[buildDebugHighlight] Built highlight:', highlight);
  return highlight;
}

/**
 * Infer the type of a runtime value for debug display.
 * 
 * @param value - Runtime value to infer type from
 * @returns Type string for display formatting
 */
function inferDebugValueType(value: any): DebugLineValue['type'] {
  if (value === null || value === undefined) return 'null';
  if (value instanceof Date) return 'date';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') {
    // Check if it's a time string (HH:MM:SS format)
    if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return 'time';
    return 'string';
  }
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'null'; // fallback
}

/**
 * Format value for compact display in debug output column.
 * Single line, truncated for narrow column widths.
 * 
 * @param value - Runtime value to format
 * @returns Formatted string for display
 */
function formatDebugOutputValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    // Format numbers with reasonable precision
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) {
    // ISO date format: YYYY-MM-DD
    return value.toISOString().split('T')[0];
  }
  if (Array.isArray(value)) {
    // Show first 3 elements
    const preview = value.slice(0, 3).map(v => {
      if (typeof v === 'string') return `"${v}"`;
      if (typeof v === 'object') return '{...}';
      return String(v);
    }).join(', ');
    return `[${preview}${value.length > 3 ? '...' : ''}]`;
  }
  if (typeof value === 'object') {
    // Show object with abbreviated content
    return '{...}';
  }
  return String(value);
}

/**
 * Format value with full detail for tooltip/expansion.
 * Multi-line, complete representation.
 * 
 * @param value - Runtime value to format
 * @returns Full formatted string with complete detail
 */
function formatDebugOutputValueFull(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value}"`;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) {
    // Full JSON representation with indentation
    return JSON.stringify(value, null, 2);
  }
  if (typeof value === 'object') {
    // Full JSON representation with indentation
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

/**
 * Extract debug output values for each line
 * 
 * Builds an array of DebugLineValue objects showing computed values
 * for each line that was executed up to the current step.
 * 
 * @param trace - Complete execution trace
 * @param currentStep - Current step index (0-based)
 * @returns Array of debug line values
 */
export function extractDebugOutputValues(
  trace: ExecutionTrace,
  currentStep: number
): DebugLineValue[] {
  if (!trace || !trace.steps || currentStep < 0 || currentStep >= trace.steps.length) {
    return [];
  }

  // Build map of line number → most recent computed value
  const lineValueMap = new Map<number, DebugLineValue>();

  // Process all steps up to current step (inclusive)
  for (let i = 0; i <= currentStep; i++) {
    const step = trace.steps[i];
    
    // Skip steps without location or result
    if (!step.location?.start?.line || step.result === undefined) {
      continue;
    }

    const lineNumber = step.location.start.line;

    // Create debug line value
    const debugValue: DebugLineValue = {
      lineNumber,
      value: step.result,
      type: inferDebugValueType(step.result),
      displayText: formatDebugOutputValue(step.result),
      fullText: formatDebugOutputValueFull(step.result),
      hasError: false, // TODO: Track errors when error handling is added
    };

    // Update map (latest value wins for lines executed multiple times)
    lineValueMap.set(lineNumber, debugValue);
  }

  // Convert map to array
  return Array.from(lineValueMap.values());
}