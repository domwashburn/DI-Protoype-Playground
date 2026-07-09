/**
 * AttributeFormModal Component
 * 
 * Modal form for adding or editing custom attributes.
 * Supports all attribute types with validation.
 */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { VocabularyEditor } from './VocabularyEditor';
import type { DataModelAttribute } from '../../data/dataModels';
import styles from './AttributeFormModal.module.css';

export interface AttributeFormModalProps {
  /** Attribute to edit (undefined for adding new) */
  attribute?: DataModelAttribute;
  
  /** Callback when form is saved */
  onSave: (attribute: DataModelAttribute) => void;
  
  /** Callback when form is cancelled */
  onCancel: () => void;
}

/**
 * Modal form for attribute creation/editing
 */
export function AttributeFormModal({
  attribute,
  onSave,
  onCancel
}: AttributeFormModalProps) {
  const isEditing = !!attribute;
  
  // Form state
  const [name, setName] = useState(attribute?.name || '');
  const [type, setType] = useState<DataModelAttribute['type']>(attribute?.type || 'string');
  const [description, setDescription] = useState(attribute?.description || '');
  const [vocabulary, setVocabulary] = useState<string[]>(attribute?.vocabulary || []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
      newErrors.name = 'Name must start with a letter and contain only letters, numbers, and underscores';
    }
    
    if (vocabulary.some(term => !term.trim())) {
      newErrors.vocabulary = 'Vocabulary terms cannot be empty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle save
  const handleSave = () => {
    if (!validate()) return;
    
    const newAttribute: DataModelAttribute = {
      name: name.trim(),
      type,
      description: description.trim(),
      vocabulary: vocabulary.filter(term => term.trim())
    };
    
    onSave(newAttribute);
  };
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [name, type, description, vocabulary]);
  
  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditing ? 'Edit Attribute' : 'Add Custom Attribute'}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <div className={styles.form}>
          {/* Name */}
          <div className={styles.field}>
            <label htmlFor="attribute-name" className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              id="attribute-name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., riskScore"
              disabled={isEditing} // Can't change name when editing
              autoFocus
            />
            {errors.name && (
              <p className={styles.errorText}>{errors.name}</p>
            )}
            <p className={styles.hint}>
              Use camelCase for attribute names (e.g., firstName, creditScore)
            </p>
          </div>
          
          {/* Type */}
          <div className={styles.field}>
            <label htmlFor="attribute-type" className={styles.label}>
              Type <span className={styles.required}>*</span>
            </label>
            <select
              id="attribute-type"
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value as DataModelAttribute['type'])}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="list">List</option>
              <option value="object">Object</option>
            </select>
          </div>
          
          {/* Description */}
          <div className={styles.field}>
            <label htmlFor="attribute-description" className={styles.label}>
              Description
            </label>
            <textarea
              id="attribute-description"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description of what this attribute represents"
              rows={3}
            />
          </div>
          
          {/* Vocabulary */}
          <div className={styles.field}>
            <label className={styles.label}>
              Vocabulary Terms
            </label>
            <VocabularyEditor
              vocabulary={vocabulary}
              isCustomAttribute={true}
              onVocabularyChange={setVocabulary}
              placeholder="Add vocabulary terms (e.g., 'risk score', 'calculated risk')"
            />
            {errors.vocabulary && (
              <p className={styles.errorText}>{errors.vocabulary}</p>
            )}
            <p className={styles.hint}>
              Natural language terms that can be used to reference this attribute
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            {isEditing ? 'Save Changes' : 'Add Attribute'}
          </button>
        </div>
      </div>
    </div>
  );
}
