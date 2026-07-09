/**
 * Data Model Management Panel
 * 
 * Slide-over panel for managing active data models.
 * Similar to Carbon XL side panel with two-column layout.
 */

import React, { useState } from 'react';
import { X, ChevronRight, Database } from 'lucide-react';
import { ALL_DATA_MODELS, type DataModel, type DataModelAttribute } from '../../data/dataModels';
import styles from './DataModelPanel.module.css';

export interface DataModelPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Attribute Row Component
 * Displays an attribute with its vocabulary and sub-attributes
 */
const AttributeRow: React.FC<{ attribute: DataModelAttribute; depth?: number }> = ({ 
  attribute, 
  depth = 0 
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubAttributes = attribute.subAttributes && attribute.subAttributes.length > 0;
  
  return (
    <>
      <tr className={styles.attributeRow}>
        <td className={styles.attributeCell} style={{ paddingLeft: `${depth * 20 + 12}px` }}>
          <div className={styles.attributeName}>
            {hasSubAttributes && (
              <button
                className={styles.expandButton}
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? 'Collapse' : 'Expand'}
              >
                <ChevronRight 
                  size={14} 
                  style={{ 
                    transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} 
                />
              </button>
            )}
            <span>{attribute.name}</span>
            <span className={styles.attributeType}>{attribute.type}</span>
          </div>
        </td>
        <td className={styles.vocabularyCell}>
          {attribute.vocabulary && attribute.vocabulary.length > 0 ? (
            <div className={styles.vocabularyList}>
              {attribute.vocabulary.map((term, i) => (
                <span key={i} className={styles.vocabularyTag}>
                  {term}
                </span>
              ))}
            </div>
          ) : (
            <span className={styles.noVocabulary}>—</span>
          )}
        </td>
      </tr>
      {expanded && hasSubAttributes && attribute.subAttributes!.map((subAttr, i) => (
        <AttributeRow key={i} attribute={subAttr} depth={depth + 1} />
      ))}
    </>
  );
};

/**
 * Data Model Panel Component
 */
export const DataModelPanel: React.FC<DataModelPanelProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('global');
  
  const selectedModel = ALL_DATA_MODELS.find(m => m.id === selectedModelId);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />
      
      {/* Panel */}
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Data Models</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Two-column content */}
        <div className={styles.content}>
          {/* Left column: Model list */}
          <div className={styles.modelList}>
            {ALL_DATA_MODELS.map(model => {
              const isSelected = model.id === selectedModelId;
              const isGlobal = model.isGlobal;
              
              return (
                <div
                  key={model.id}
                  className={`${styles.modelItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedModelId(model.id)}
                >
                  <div className={styles.modelItemHeader}>
                    <Database size={16} className={styles.modelIcon} />
                    <span className={styles.modelName}>
                      {isGlobal && '→ '}
                      {model.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className={styles.modelDescription}>
                      {model.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Right column: Attributes table */}
          <div className={styles.attributesPanel}>
            <div className={styles.attributesHeader}>
              <h3>Attributes List</h3>
              {selectedModel && (
                <span className={styles.attributeCount}>
                  {selectedModel.attributes.length} attributes
                </span>
              )}
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.attributeTable}>
                <thead>
                  <tr>
                    <th className={styles.attributeHeader}>Attribute</th>
                    <th className={styles.vocabularyHeader}>Vocabulary</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedModel?.attributes.map((attr, i) => (
                    <AttributeRow key={i} attribute={attr} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};