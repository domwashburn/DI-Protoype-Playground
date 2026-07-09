/**
 * useLineHeights Hook
 * 
 * Measures the actual rendered height of each line accounting for wrapping.
 * This enables:
 * - Line numbers that adjust height to match wrapped content  
 * - Row highlights (error/warning/debug) that cover full wrapped height
 * 
 * CRIT-003: Line number height adjustments for wrapped lines
 */

import { useState, useEffect, useCallback, RefObject } from 'react';

export interface LineHeight {
  /** Line number (1-based) */
  lineNumber: number;
  /** Actual rendered height in pixels */
  height: number;
  /** Top offset from start of content in pixels */
  top: number;
}

export interface LineHeightMeasurements {
  /** Line height data for each line */
  lineHeights: LineHeight[];
  /** Computed line-height value from textarea (e.g., "22.4px") */
  computedLineHeight: string;
}

/**
 * Measures the actual rendered height of each line using a measuring element.
 * 
 * Since we can't easily measure individual lines in a textarea or overlay with wrapping,
 * we create a temporary measuring element that mimics the textarea's styling and
 * measure each line's height individually.
 * 
 * @param textareaRef - Reference to the textarea element (for styling reference)
 * @param value - Current textarea value (triggers re-measurement)
 * @returns Array of line heights with offsets
 */
export function useLineHeights(
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string
): LineHeightMeasurements {
  const [lineHeights, setLineHeights] = useState<LineHeight[]>([]);
  const [computedLineHeight, setComputedLineHeight] = useState<string>('22.4px');

  /**
   * Measure line heights by creating a temporary measuring element
   */
  const measureLineHeights = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const lines = value.split('\n');
    
    // Create measuring element
    const measuringEl = document.createElement('div');
    measuringEl.style.position = 'absolute';
    measuringEl.style.visibility = 'hidden';
    measuringEl.style.pointerEvents = 'none';
    measuringEl.style.left = '-9999px';
    measuringEl.style.top = '-9999px';
    measuringEl.style.zIndex = '-1';
    
    // Copy ALL relevant textarea styling for accurate measurement
    const computedStyle = window.getComputedStyle(textarea);
    measuringEl.style.fontFamily = computedStyle.fontFamily;
    measuringEl.style.fontSize = computedStyle.fontSize;
    measuringEl.style.fontWeight = computedStyle.fontWeight;
    measuringEl.style.lineHeight = computedStyle.lineHeight;
    measuringEl.style.letterSpacing = computedStyle.letterSpacing;
    measuringEl.style.wordSpacing = computedStyle.wordSpacing;
    
    // Capture computed line-height for aligning text baselines
    setComputedLineHeight(computedStyle.lineHeight);
    
    // CRITICAL: Calculate CONTENT width, not total width
    // Textarea has padding, measuring element doesn't
    // Must subtract padding to match where text actually wraps
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const contentWidth = textarea.clientWidth - paddingLeft - paddingRight;
    
    measuringEl.style.width = `${contentWidth}px`;
    measuringEl.style.padding = '0';
    measuringEl.style.margin = '0';
    measuringEl.style.border = 'none';
    measuringEl.style.boxSizing = 'content-box';
    measuringEl.style.whiteSpace = 'pre-wrap';
    measuringEl.style.wordWrap = 'break-word';
    measuringEl.style.overflowWrap = 'break-word';
    measuringEl.style.wordBreak = computedStyle.wordBreak;
    
    document.body.appendChild(measuringEl);
    
    const measuredHeights: LineHeight[] = [];
    let cumulativeTop = 0;
    
    // Measure each line
    lines.forEach((line, index) => {
      // Use zero-width space for empty lines to maintain height
      measuringEl.textContent = line.length === 0 ? '\u200B' : line;
      
      const height = measuringEl.offsetHeight;
      
      measuredHeights.push({
        lineNumber: index + 1,
        height,
        top: cumulativeTop,
      });
      
      cumulativeTop += height;
    });
    
    // Clean up
    document.body.removeChild(measuringEl);
    
    setLineHeights(measuredHeights);
  }, [textareaRef, value, setComputedLineHeight]);

  /**
   * Measure on mount, value change, and window resize
   */
  useEffect(() => {
    // Double-delay to ensure textarea is fully rendered
    // First rAF: DOM updates, second rAF: layout complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measureLineHeights();
      });
    });
  }, [measureLineHeights]);

  /**
   * Re-measure on window resize (wrapping can change)
   */
  useEffect(() => {
    const handleResize = () => {
      // Debounce resize with double rAF for smooth updates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureLineHeights();
        });
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [measureLineHeights]);

  return { lineHeights, computedLineHeight };
}
