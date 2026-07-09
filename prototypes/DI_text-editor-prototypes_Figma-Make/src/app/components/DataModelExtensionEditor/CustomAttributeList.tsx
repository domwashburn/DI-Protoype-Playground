/**
 * CustomAttributeList Component
 * 
 * Displays and manages custom attributes added to the automation.
 * Provides full CRUD operations for custom attributes.
 */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AttributeRow } from './AttributeRow';
import { AttributeFormModal } from './AttributeFormModal';
import type { DataModelAttribute } from '../../data/dataModels';
import styles from './CustomAttributeList.module.css';

export interface CustomAttributeListProps {
  /** Custom attributes */
  attributes: DataModelAttribute[];
  
  /** Callback when attribute is added */
  onAddAttribute?: (attribute: DataModelAttribute) => void;
  
  /** Callback when attribute is updated */
  onUpdateAttribute?: (name: string, updates: Partial<DataModelAttribute>) => void;
  
  /** Callback when attribute is deleted */
  onDeleteAttribute?: (name: string) => void;
}

/**
 * List of custom attributes with full CRUD
 */
export function CustomAttributeList({
  attributes,
  onAddAttribute,
  onUpdateAttribute,
  onDeleteAttribute
}: CustomAttributeListProps) {
  const [isAddingAttribute, setIsAddingAttribute] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<DataModelAttribute | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  
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
  
  // Handle add attribute
  const handleAddAttribute = (attribute: DataModelAttribute) => {
    onAddAttribute?.(attribute);
    setIsAddingAttribute(false);
  };
  
  // Handle update attribute
  const handleUpdateAttribute = (attribute: DataModelAttribute) => {
    if (!editingAttribute) return;
    onUpdateAttribute?.(editingAttribute.name, attribute);
    setEditingAttribute(null);
  };
  
  // Handle vocabulary change
  const handleVocabularyChange = (attributeName: string, newVocabulary: string[]) => {
    onUpdateAttribute?.(attributeName, { vocabulary: newVocabulary });
  };
  
  return (
    <div className={styles.customAttributeList}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h3 className={styles.title}>
            🔧 Custom Attributes
          </h3>
          <p className={styles.subtitle}>
            {attributes.length} custom {attributes.length === 1 ? 'attribute' : 'attributes'}
          </p>
        </div>
        
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsAddingAttribute(true)}
        >
          <Plus size={16} />
          Add Attribute
        </button>
      </div>
      
      {/* Attribute list */}
      {attributes.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No custom attributes yet
          </p>
          <p className={styles.emptyStateHint}>
            Add custom attributes specific to this automation
          </p>
          <button
            type="button"
            className={styles.emptyStateButton}
            onClick={() => setIsAddingAttribute(true)}
          >
            <Plus size={16} />
            Add First Attribute
          </button>
        </div>
      ) : (
        <div className={styles.attributeList}>
          {attributes.map(attribute => {
            const hasSubAttributes = attribute.subAttributes && attribute.subAttributes.length > 0;
            
            return (
              <AttributeRow
                key={attribute.name}
                attribute={attribute}
                source="custom"
                isExpandable={hasSubAttributes}
                isExpanded={expandedPaths.has(attribute.name)}
                onToggleExpand={() => handleToggleExpand(attribute.name)}
                onEdit={() => setEditingAttribute(attribute)}
                onDelete={() => onDeleteAttribute?.(attribute.name)}
                onVocabularyChange={(newVocab) => handleVocabularyChange(attribute.name, newVocab)}
                showEditControls={true}
                canEditVocabulary={true}
              />
            );
          })}
        </div>
      )}
      
      {/* Add/Edit attribute modal */}
      {(isAddingAttribute || editingAttribute) && (
        <AttributeFormModal
          attribute={editingAttribute || undefined}
          onSave={editingAttribute ? handleUpdateAttribute : handleAddAttribute}
          onCancel={() => {
            setIsAddingAttribute(false);
            setEditingAttribute(null);
          }}
        />
      )}
    </div>
  );
}
