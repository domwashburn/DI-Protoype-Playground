/**
 * DiffViewer Component
 * 
 * Side-by-side comparison view for displaying differences between two versions
 * of content. Useful for comparing documents in diff mode.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React from 'react';
import type { EditorType } from '../../services/editorService';
import styles from './DiffViewer.module.css';

export interface DiffViewerProps {
  /** Original content */
  original?: string;
  /** Modified content */
  modified?: string;
  /** Label for original content */
  originalLabel?: string;
  /** Label for modified content */
  modifiedLabel?: string;
  /** Type of content being compared */
  contentType?: EditorType | 'plain';
  /** Custom className */
  className?: string;
}

interface DiffLine {
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  original?: string;
  modified?: string;
  lineNumber: number;
}

/**
 * Simple diff algorithm - compares line by line
 */
const computeDiff = (original: string, modified: string): DiffLine[] => {
  // Handle undefined or null inputs
  const safeOriginal = original ?? '';
  const safeModified = modified ?? '';
  
  const originalLines = safeOriginal.split('\n');
  const modifiedLines = safeModified.split('\n');
  const diff: DiffLine[] = [];
  
  const maxLength = Math.max(originalLines.length, modifiedLines.length);
  
  for (let i = 0; i < maxLength; i++) {
    const origLine = originalLines[i];
    const modLine = modifiedLines[i];
    
    if (origLine === undefined) {
      // Line added
      diff.push({
        type: 'added',
        modified: modLine,
        lineNumber: i + 1
      });
    } else if (modLine === undefined) {
      // Line removed
      diff.push({
        type: 'removed',
        original: origLine,
        lineNumber: i + 1
      });
    } else if (origLine === modLine) {
      // Line unchanged
      diff.push({
        type: 'unchanged',
        original: origLine,
        modified: modLine,
        lineNumber: i + 1
      });
    } else {
      // Line modified
      diff.push({
        type: 'modified',
        original: origLine,
        modified: modLine,
        lineNumber: i + 1
      });
    }
  }
  
  return diff;
};

/**
 * DiffViewer - Side-by-side diff comparison
 */
export const DiffViewer: React.FC<DiffViewerProps> = ({
  original,
  modified,
  originalLabel = 'Original',
  modifiedLabel = 'Modified',
  contentType = 'plain',
  className = ''
}) => {
  const diff = computeDiff(original || '', modified || '');
  
  return (
    <div className={`${styles.diffContainer} ${className}`}>
      {/* Header */}
      <div className={styles.diffHeader}>
        <div className={styles.diffHeaderLeft}>{originalLabel}</div>
        <div className={styles.diffHeaderRight}>{modifiedLabel}</div>
      </div>
      
      {/* Diff content */}
      <div className={styles.diffContent}>
        <div className={styles.diffPane}>
          {diff.map((line, index) => (
            <div
              key={`orig-${index}`}
              className={`${styles.diffLine} ${styles[`diffLine${line.type.charAt(0).toUpperCase() + line.type.slice(1)}`]}`}
            >
              <span className={styles.diffLineNumber}>{line.original !== undefined ? line.lineNumber : ''}</span>
              <span className={styles.diffLineContent}>
                {line.type === 'removed' || line.type === 'modified' ? (
                  <span className={styles.diffHighlight}>{line.original || ''}</span>
                ) : (
                  line.original || ''
                )}
              </span>
            </div>
          ))}
        </div>
        
        <div className={styles.diffPane}>
          {diff.map((line, index) => (
            <div
              key={`mod-${index}`}
              className={`${styles.diffLine} ${styles[`diffLine${line.type.charAt(0).toUpperCase() + line.type.slice(1)}`]}`}
            >
              <span className={styles.diffLineNumber}>{line.modified !== undefined ? line.lineNumber : ''}</span>
              <span className={styles.diffLineContent}>
                {line.type === 'added' || line.type === 'modified' ? (
                  <span className={styles.diffHighlight}>{line.modified || ''}</span>
                ) : (
                  line.modified || ''
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className={styles.diffLegend}>
        <div className={styles.diffLegendItem}>
          <span className={`${styles.diffLegendColor} ${styles.diffLegendAdded}`}></span>
          Added
        </div>
        <div className={styles.diffLegendItem}>
          <span className={`${styles.diffLegendColor} ${styles.diffLegendRemoved}`}></span>
          Removed
        </div>
        <div className={styles.diffLegendItem}>
          <span className={`${styles.diffLegendColor} ${styles.diffLegendModified}`}></span>
          Modified
        </div>
      </div>
    </div>
  );
};
