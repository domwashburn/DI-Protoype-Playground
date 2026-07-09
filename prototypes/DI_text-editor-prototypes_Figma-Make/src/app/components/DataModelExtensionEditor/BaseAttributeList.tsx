/**
 * BaseAttributeList Component
 * 
 * Displays inherited attributes from the base data model.
 * Shows vocabulary editor and hide/unhide controls.
 */

import { useState, useMemo } from 'react';
import { AttributeRow } from './AttributeRow';
import type { DataModelAttribute } from '../../data/dataModels';
import styles from './BaseAttributeList.module.css';

export interface BaseAttributeListProps {
  /** Base model attributes */
  attributes: DataModelAttribute[];
  
  /** Vocabulary overrides map (attributePath → custom vocabulary) */
  vocabularyOverrides?: Map<string, string[]>;
  
  /** Hidden attribute paths */
  hiddenAttributes?: string[];
  
  /** Callback when vocabulary is added */
  onAddVocabulary?: (attributePath: string, terms: string[]) => void;
  
  /** Callback when vocabulary is reset */
  onResetVocabulary?: (attributePath: string) => void;
  
  /** Callback when attribute is hidden */
  onHideAttribute?: (attributePath: string) => void;
  
  /** Callback when attribute is unhidden */
  onUnhideAttribute?: (attributePath: string) => void;
}

/**
 * List of base model attributes with edit controls
 */
export function BaseAttributeList({
  attributes,
  vocabularyOverrides = new Map(),
  hiddenAttributes = [],
  onAddVocabulary,
  onResetVocabulary,
  onHideAttribute,
  onUnhideAttribute
}: BaseAttributeListProps) {
  // Track expanded state for each attribute
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  
  // Count visible/hidden attributes
  const { visibleCount, hiddenCount } = useMemo(() => {
    const hidden = new Set(hiddenAttributes);
    const visible = attributes.filter(attr => !hidden.has(attr.name));
    return {
      visibleCount: visible.length,
      hiddenCount: attributes.length - visible.length
    };
  }, [attributes, hiddenAttributes]);
  
  // Toggle expand/collapse
  const handleToggleExpand = (path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };
  
  // Handle vocabulary change
  const handleVocabularyChange = (attributePath: string, newVocabulary: string[]) => {
    // Find the attribute to get base vocabulary
    const attribute = attributes.find(attr => attr.name === attributePath);
    if (!attribute) return;
    
    const baseVocab = attribute.vocabulary || [];
    const customVocab = newVocabulary.filter(term => !baseVocab.includes(term));
    
    // Call onAddVocabulary with only the new custom terms
    onAddVocabulary?.(attributePath, customVocab);
  };
  
  if (attributes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>
          No base attributes available
        </p>
      </div>
    );
  }
  
  return (
    <div className={styles.baseAttributeList}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          🌍 Inherited Attributes
        </h3>
        <p className={styles.subtitle}>
          {visibleCount} visible
          {hiddenCount > 0 && `, ${hiddenCount} hidden`}
        </p>
      </div>
      
      {/* Attribute list */}
      <div className={styles.attributeList}>
        {attributes.map(attribute => {
          const isHidden = hiddenAttributes.includes(attribute.name);
          const customVocab = vocabularyOverrides.get(attribute.name) || [];
          const hasSubAttributes = attribute.subAttributes && attribute.subAttributes.length > 0;
          
          return (
            <AttributeRow
              key={attribute.name}
              attribute={attribute}
              source="global"
              customVocabulary={customVocab}
              isHidden={isHidden}
              isExpandable={hasSubAttributes}
              isExpanded={expandedPaths.has(attribute.name)}
              onToggleExpand={() => handleToggleExpand(attribute.name)}
              onToggleHidden={() => {
                if (isHidden) {
                  onUnhideAttribute?.(attribute.name);
                } else {
                  onHideAttribute?.(attribute.name);
                }
              }}
              onVocabularyChange={(newVocab) => handleVocabularyChange(attribute.name, newVocab)}
              onResetVocabulary={() => onResetVocabulary?.(attribute.name)}
              canEditVocabulary={true}
            />
          );
        })}
      </div>
    </div>
  );
}
