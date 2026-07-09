/**
 * BALVocabularyTooltip Component
 * 
 * Displays a tooltip showing data model mapping for vocabulary terms
 * when the cursor is positioned within a vocabulary word.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React from 'react';
import type { VocabularyMapping } from '../../SampleData/balSamples';
// CARBON_CONVERT: Replace lucide-react icons with @carbon/icons-react
import { Database, Type, Info } from 'lucide-react';
import styles from './BALVocabularyTooltip.module.css';

export interface BALVocabularyTooltipProps {
  /** The vocabulary mapping to display */
  mapping: VocabularyMapping;
  /** Position of the tooltip */
  position: { top: number; left: number };
  /** Whether the tooltip is visible */
  isVisible: boolean;
}

/**
 * Tooltip that displays data model information for vocabulary terms
 */
export const BALVocabularyTooltip: React.FC<BALVocabularyTooltipProps> = ({
  mapping,
  position,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={styles.tooltip}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className={styles.tooltipHeader}>
        <Database size={14} />
        <span className={styles.tooltipTitle}>Data Model Mapping</span>
      </div>
      
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>Term:</span>
          <code className={styles.tooltipValue}>{mapping.term}</code>
        </div>
        
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>
            <Type size={12} />
            Type:
          </span>
          <span className={`${styles.tooltipType} ${styles[`type${mapping.type.charAt(0).toUpperCase() + mapping.type.slice(1)}` as keyof typeof styles]}`}>
            {mapping.type}
          </span>
        </div>
        
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>Path:</span>
          <code className={styles.tooltipPath}>{mapping.dataModelPath}</code>
        </div>
        
        {mapping.description && (
          <div className={styles.tooltipDescription}>
            <Info size={12} />
            <span>{mapping.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};
