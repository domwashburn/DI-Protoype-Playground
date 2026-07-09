/**
 * AttributeRow Component
 * 
 * Displays a single attribute with its details, vocabulary, and edit controls.
 * Used by both BaseAttributeList and CustomAttributeList.
 */

import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { VocabularyEditor } from './VocabularyEditor';
import type { DataModelAttribute } from '../../data/dataModels';
import styles from './AttributeRow.module.css';

export interface AttributeRowProps {
  /** The attribute to display */
  attribute: DataModelAttribute;
  
  /** Source of the attribute (global or custom) */
  source: 'global' | 'custom';
  
  /** Custom vocabulary terms (if any) */
  customVocabulary?: string[];
  
  /** Whether this attribute is hidden */
  isHidden?: boolean;
  
  /** Whether the attribute is expandable (has sub-attributes) */
  isExpandable?: boolean;
  
  /** Whether the attribute is currently expanded */
  isExpanded?: boolean;
  
  /** Callback when expand/collapse is toggled */
  onToggleExpand?: () => void;
  
  /** Callback when edit is clicked */
  onEdit?: () => void;
  
  /** Callback when delete is clicked */
  onDelete?: () => void;
  
  /** Callback when hide/unhide is toggled */
  onToggleHidden?: () => void;
  
  /** Callback when vocabulary changes */
  onVocabularyChange?: (vocabulary: string[]) => void;
  
  /** Callback to reset vocabulary to base */
  onResetVocabulary?: () => void;
  
  /** Whether edit controls should be shown */
  showEditControls?: boolean;
  
  /** Whether vocabulary can be edited */
  canEditVocabulary?: boolean;
}

/**
 * Single attribute row component
 */
export function AttributeRow({
  attribute,
  source,
  customVocabulary = [],
  isHidden = false,
  isExpandable = false,
  isExpanded = false,
  onToggleExpand,
  onEdit,
  onDelete,
  onToggleHidden,
  onVocabularyChange,
  onResetVocabulary,
  showEditControls = false,
  canEditVocabulary = false
}: AttributeRowProps) {
  const [showVocabularyEditor, setShowVocabularyEditor] = useState(false);
  
  const sourceIcon = source === 'global' ? '🌍' : '🔧';
  const sourceLabel = source === 'global' ? 'Global' : 'Custom';
  
  return (
    <div className={`${styles.attributeRow} ${isHidden ? styles.hidden : ''}`}>
      {/* Main row */}
      <div className={styles.mainRow}>
        {/* Expand/collapse button */}
        {isExpandable && (
          <button
            type="button"
            className={styles.expandButton}
            onClick={onToggleExpand}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        
        {/* Source indicator */}
        <span 
          className={styles.sourceIndicator}
          title={`${sourceLabel} attribute`}
        >
          {sourceIcon}
        </span>
        
        {/* Attribute info */}
        <div className={styles.attributeInfo}>
          <div className={styles.attributeName}>
            {attribute.name}
            <span className={styles.attributeType}>({attribute.type})</span>
          </div>
          {attribute.description && (
            <div className={styles.attributeDescription}>
              {attribute.description}
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className={styles.actions}>
          {/* Edit vocabulary */}
          {canEditVocabulary && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => setShowVocabularyEditor(!showVocabularyEditor)}
              title={showVocabularyEditor ? 'Hide vocabulary' : 'Edit vocabulary'}
            >
              <Edit2 size={16} />
            </button>
          )}
          
          {/* Hide/unhide (global attributes only) */}
          {source === 'global' && onToggleHidden && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={onToggleHidden}
              title={isHidden ? 'Show attribute' : 'Hide attribute'}
            >
              {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          
          {/* Edit (custom attributes only) */}
          {showEditControls && onEdit && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={onEdit}
              title="Edit attribute"
            >
              <Edit2 size={16} />
            </button>
          )}
          
          {/* Delete (custom attributes only) */}
          {showEditControls && onDelete && (
            <button
              type="button"
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={onDelete}
              title="Delete attribute"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Vocabulary editor */}
      {showVocabularyEditor && (
        <div className={styles.vocabularySection}>
          <label className={styles.vocabularyLabel}>
            Vocabulary Terms
          </label>
          <VocabularyEditor
            vocabulary={attribute.vocabulary || []}
            customVocabulary={customVocabulary}
            isCustomAttribute={source === 'custom'}
            onVocabularyChange={onVocabularyChange}
            onReset={onResetVocabulary}
            readOnly={!canEditVocabulary}
          />
        </div>
      )}
      
      {/* Sub-attributes (if expanded) */}
      {isExpanded && attribute.subAttributes && attribute.subAttributes.length > 0 && (
        <div className={styles.subAttributes}>
          {attribute.subAttributes.map(subAttr => (
            <div key={subAttr.name} className={styles.subAttributeRow}>
              <span className={styles.subAttributeDot}>•</span>
              <span className={styles.subAttributeName}>
                {subAttr.name}
                <span className={styles.attributeType}>({subAttr.type})</span>
              </span>
              {subAttr.description && (
                <span className={styles.subAttributeDescription}>
                  {subAttr.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
