/**
 * DataModelExtensionEditor Component
 * 
 * Main editor for managing automation-specific data model extensions.
 * Allows selecting base model, adding custom attributes, and customizing vocabulary.
 */

import { useState, useMemo } from 'react';
import { BaseAttributeList } from './BaseAttributeList';
import { CustomAttributeList } from './CustomAttributeList';
import { useAutomationDataModel } from '../../hooks/useAutomationDataModel';
import { ALL_DATA_MODELS } from '../../data/dataModels';
import type { DataModelAttribute } from '../../data/dataModels';
import styles from './DataModelExtensionEditor.module.css';

export interface DataModelExtensionEditorProps {
  /** Automation ID */
  automationId: string;
  
  /** Callback when changes are saved */
  onSave?: () => void;
  
  /** Callback when cancelled */
  onCancel?: () => void;
}

/**
 * Editor for automation-specific data model extensions
 */
export function DataModelExtensionEditor({
  automationId,
  onSave,
  onCancel
}: DataModelExtensionEditorProps) {
  const {
    resolvedModel,
    baseModel,
    extension,
    isExtended,
    createExtension,
    deleteExtension,
    addAttribute,
    removeAttribute,
    updateAttribute,
    addVocabulary,
    resetVocabulary,
    hideAttribute,
    unhideAttribute,
    error
  } = useAutomationDataModel(automationId);
  
  // Mode selection state
  const [selectedMode, setSelectedMode] = useState<'global' | 'extended'>(() => 
    isExtended ? 'extended' : 'global'
  );
  
  // Base model selection state (for creating extension)
  const [selectedBaseModelId, setSelectedBaseModelId] = useState<string>('');
  
  // Available base models (exclude global)
  const availableBaseModels = useMemo(() => {
    return ALL_DATA_MODELS.filter(model => model.id !== 'global');
  }, []);
  
  // Handle mode change
  const handleModeChange = (mode: 'global' | 'extended') => {
    setSelectedMode(mode);
    
    if (mode === 'global' && isExtended) {
      // Delete extension when switching to global mode
      if (confirm('This will remove all custom attributes and vocabulary. Continue?')) {
        deleteExtension();
      } else {
        setSelectedMode('extended');
      }
    } else if (mode === 'extended' && !isExtended && selectedBaseModelId) {
      // Create extension when switching to extended mode
      createExtension(selectedBaseModelId);
    }
  };
  
  // Handle base model selection
  const handleBaseModelSelect = () => {
    if (!selectedBaseModelId) return;
    createExtension(selectedBaseModelId);
    setSelectedMode('extended');
  };
  
  // Handle vocabulary changes
  const handleAddVocabulary = (attributePath: string, terms: string[]) => {
    addVocabulary(attributePath, terms);
  };
  
  // Handle reset vocabulary
  const handleResetVocabulary = (attributePath: string) => {
    resetVocabulary(attributePath);
  };
  
  // Handle hide/unhide attribute
  const handleHideAttribute = (attributePath: string) => {
    hideAttribute(attributePath);
  };
  
  const handleUnhideAttribute = (attributePath: string) => {
    unhideAttribute(attributePath);
  };
  
  // Handle custom attribute operations
  const handleAddCustomAttribute = (attribute: DataModelAttribute) => {
    addAttribute(attribute);
  };
  
  const handleUpdateCustomAttribute = (name: string, updates: Partial<DataModelAttribute>) => {
    updateAttribute(name, updates);
  };
  
  const handleDeleteCustomAttribute = (name: string) => {
    if (confirm(`Delete attribute "${name}"?`)) {
      removeAttribute(name);
    }
  };
  
  if (error) {
    return (
      <div className={styles.error}>
        <h3 className={styles.errorTitle}>Error</h3>
        <p className={styles.errorMessage}>{error.message}</p>
      </div>
    );
  }
  
  return (
    <div className={styles.editor}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Data Model Configuration</h2>
          <p className={styles.subtitle}>
            Customize the data model for this automation
          </p>
        </div>
      </div>
      
      {/* Mode selector */}
      <div className={styles.modeSelector}>
        <label className={styles.modeLabel}>
          <input
            type="radio"
            name="mode"
            value="global"
            checked={selectedMode === 'global'}
            onChange={() => handleModeChange('global')}
            className={styles.modeRadio}
          />
          <div className={styles.modeOption}>
            <div className={styles.modeTitle}>Use Global Model</div>
            <div className={styles.modeDescription}>
              Use the global data model as-is without customization
            </div>
          </div>
        </label>
        
        <label className={styles.modeLabel}>
          <input
            type="radio"
            name="mode"
            value="extended"
            checked={selectedMode === 'extended'}
            onChange={() => handleModeChange('extended')}
            className={styles.modeRadio}
          />
          <div className={styles.modeOption}>
            <div className={styles.modeTitle}>Extend Base Model</div>
            <div className={styles.modeDescription}>
              Add custom attributes and vocabulary to a base model
            </div>
          </div>
        </label>
      </div>
      
      {/* Base model selector (if extended mode but no extension yet) */}
      {selectedMode === 'extended' && !isExtended && (
        <div className={styles.baseModelSelector}>
          <label htmlFor="base-model" className={styles.label}>
            Select Base Model
          </label>
          <div className={styles.baseModelSelectRow}>
            <select
              id="base-model"
              className={styles.select}
              value={selectedBaseModelId}
              onChange={(e) => setSelectedBaseModelId(e.target.value)}
            >
              <option value="">Choose a base model...</option>
              {availableBaseModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={styles.createButton}
              onClick={handleBaseModelSelect}
              disabled={!selectedBaseModelId}
            >
              Create Extension
            </button>
          </div>
        </div>
      )}
      
      {/* Extension editor (if extended mode and extension exists) */}
      {selectedMode === 'extended' && isExtended && baseModel && extension && (
        <div className={styles.extensionEditor}>
          {/* Extension info */}
          <div className={styles.extensionInfo}>
            <p className={styles.extensionInfoText}>
              <strong>Base Model:</strong> {baseModel.name}
            </p>
            <p className={styles.extensionInfoText}>
              <strong>Custom Attributes:</strong> {extension.addedAttributes.length}
            </p>
            <p className={styles.extensionInfoText}>
              <strong>Vocabulary Overrides:</strong> {Object.keys(extension.vocabularyOverrides).length}
            </p>
          </div>
          
          {/* Base attributes */}
          <div className={styles.section}>
            <BaseAttributeList
              attributes={baseModel.attributes}
              vocabularyOverrides={resolvedModel?.vocabularyOverrides}
              hiddenAttributes={extension.hiddenAttributes}
              onAddVocabulary={handleAddVocabulary}
              onResetVocabulary={handleResetVocabulary}
              onHideAttribute={handleHideAttribute}
              onUnhideAttribute={handleUnhideAttribute}
            />
          </div>
          
          {/* Custom attributes */}
          <div className={styles.section}>
            <CustomAttributeList
              attributes={extension.addedAttributes}
              onAddAttribute={handleAddCustomAttribute}
              onUpdateAttribute={handleUpdateCustomAttribute}
              onDeleteAttribute={handleDeleteCustomAttribute}
            />
          </div>
        </div>
      )}
      
      {/* Global mode message */}
      {selectedMode === 'global' && (
        <div className={styles.globalMessage}>
          <p className={styles.globalMessageText}>
            This automation uses the global data model without customization.
          </p>
          <p className={styles.globalMessageHint}>
            Switch to "Extend Base Model" to add custom attributes and vocabulary.
          </p>
        </div>
      )}
      
      {/* Footer */}
      {onSave && onCancel && (
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
            onClick={onSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
