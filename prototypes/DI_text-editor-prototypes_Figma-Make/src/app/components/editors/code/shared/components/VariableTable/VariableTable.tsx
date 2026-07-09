/**
 * VariableTable Component
 * 
 * Generic variable management component supporting CRUD operations.
 * Used by Formula Editor (and eventually other code editors).
 * 
 * DOES NOT replace BALVocabularyTooltip.
 * This is a new component for new editors.
 * 
 * Features:
 * - Variable list with pill badges
 * - Add Variable functionality
 * - Inline rename with validation (no duplicates, no blanks)
 * - Type selector dropdown
 * - Data source linking with override control
 * - Delete button per row
 * - Empty state UI
 * 
 * Parameter Logic:
 * - NO data source → Required parameter (in function signature)
 * - Has data source + allow override → Optional parameter with default (in function signature)
 * - Has data source + no override → Locked (NOT in function signature)
 * 
 * The = sign in "$variable = ..." indicates definition.
 * Variables appearing after = are automatically considered parameters until defined.
 * 
 * @example
 * <VariableTable
 *   variables={variables}
 *   onCreate={(variable) => handleCreate(variable)}
 *   onUpdate={(id, updates) => handleUpdate(id, updates)}
 *   onDelete={(id) => handleDelete(id)}
 *   showTypeSelector
 *   showDataSourcePicker
 * />
 */

import React, { useState, useMemo } from 'react';
import { DollarSign, Trash2, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import type { Variable, DateFormat, TimeFormat } from '../../../../core/types';
import { DATE_FORMAT_OPTIONS, TIME_FORMAT_OPTIONS } from '../../../../core/types';
import { validateVerbalization } from '../../../../../../utils/verbalizationUtils';
import styles from './VariableTable.module.css';

export interface VariableTableProps {
  /** List of variables to display */
  variables: Variable[];
  /** Called when user wants to create a new variable */
  onCreate: (variable: Omit<Variable, 'id'>) => void;
  /** Called when user updates a variable */
  onUpdate: (id: string, updates: Partial<Variable>) => void;
  /** Called when user deletes a variable */
  onDelete: (id: string) => void;
  /** Empty state text */
  emptyStateText?: string;
  /** Show type selector column */
  showTypeSelector?: boolean;
  /** Show data source picker column */
  showDataSourcePicker?: boolean;
}

/**
 * VariableTable - Main component
 */
export function VariableTable({
  variables,
  onCreate,
  onUpdate,
  onDelete,
  emptyStateText = 'No variables defined',
  showTypeSelector = true,
  showDataSourcePicker = true,
}: VariableTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableType, setNewVariableType] = useState<Variable['type']>('number');
  const [newVariableDateFormat, setNewVariableDateFormat] = useState<DateFormat>('YYYY-MM-DD');
  const [newVariableTimeFormat, setNewVariableTimeFormat] = useState<TimeFormat>('HH:MM:SS');
  const [newVariableDataSource, setNewVariableDataSource] = useState('');
  const [newVariableAllowOverride, setNewVariableAllowOverride] = useState(true);
  const [newVariableVerbalization, setNewVariableVerbalization] = useState('');
  
  // Track verbalization validation errors per variable
  const [verbalizationErrors, setVerbalizationErrors] = useState<Map<string, string>>(new Map());

  /**
   * Start editing a variable name
   */
  const startEdit = (variable: Variable) => {
    setEditingId(variable.id);
    setEditingName(variable.name);
  };

  /**
   * Save edited variable name
   */
  const saveEdit = () => {
    if (!editingId) return;

    const trimmedName = editingName.trim();

    // Validate: no blank names
    if (!trimmedName) {
      cancelEdit();
      return;
    }

    // Validate: no duplicates (except self)
    const isDuplicate = variables.some(
      v => v.id !== editingId && v.name === trimmedName
    );

    if (isDuplicate) {
      // Could show error UI, for now just cancel
      cancelEdit();
      return;
    }

    // Update variable
    onUpdate(editingId, { name: trimmedName });
    setEditingId(null);
    setEditingName('');
  };

  /**
   * Cancel editing
   */
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  /**
   * Validate verbalization for a variable
   */
  const handleVerbalizationChange = (variableId: string, variableName: string, newVerbalization: string) => {
    // Update variable
    onUpdate(variableId, { verbalization: newVerbalization });
    
    // Validate
    const validation = validateVerbalization(newVerbalization, variableName, variables);
    
    // Update error state
    const newErrors = new Map(verbalizationErrors);
    if (!validation.valid && validation.error) {
      newErrors.set(variableId, validation.error);
    } else {
      newErrors.delete(variableId);
    }
    setVerbalizationErrors(newErrors);
  };

  /**
   * Start adding new variable
   */
  const startAddNew = () => {
    setIsAddingNew(true);
    setNewVariableName('');
    setNewVariableType('number');
    setNewVariableDateFormat('YYYY-MM-DD');
    setNewVariableTimeFormat('HH:MM:SS');
    setNewVariableDataSource('');
    setNewVariableAllowOverride(true);
    setNewVariableVerbalization('');
  };

  /**
   * Save new variable
   */
  const saveNewVariable = () => {
    const trimmedName = newVariableName.trim();
    const trimmedDataSource = newVariableDataSource.trim();

    // Validate: no blank names
    if (!trimmedName) {
      cancelAddNew();
      return;
    }

    // Validate: no duplicates
    const isDuplicate = variables.some(v => v.name === trimmedName);
    if (isDuplicate) {
      // Could show error UI, for now just cancel
      cancelAddNew();
      return;
    }

    // Build new variable
    const newVariable: Omit<Variable, 'id'> = {
      name: trimmedName,
      type: newVariableType,
    };

    // Add data source if provided
    if (trimmedDataSource) {
      newVariable.dataSource = trimmedDataSource;
      newVariable.allowOverride = newVariableAllowOverride;
    }

    // Add date format if type is date
    if (newVariableType === 'date') {
      newVariable.dateFormat = newVariableDateFormat;
    }
    
    // Add time format if type is time
    if (newVariableType === 'time') {
      newVariable.timeFormat = newVariableTimeFormat;
    }
    
    // Add verbalization if provided
    if (newVariableVerbalization.trim()) {
      newVariable.verbalization = newVariableVerbalization.trim();
    }

    onCreate(newVariable);
    setIsAddingNew(false);
    setNewVariableName('');
    setNewVariableVerbalization('');
  };

  /**
   * Cancel adding new variable
   */
  const cancelAddNew = () => {
    setIsAddingNew(false);
    setNewVariableName('');
  };

  /**
   * Handle keyboard in edit mode
   */
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  /**
   * Handle keyboard in add mode
   */
  const handleAddKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveNewVariable();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelAddNew();
    }
  };

  /**
   * Get parameter badge based on data source and override settings
   */
  const getParameterBadge = (variable: Variable): { text: string; type: string } | null => {
    // Variables defined in editor (left side of =) are results, not parameters
    if (variable.definedInEditor) {
      return { text: 'defined in editor', type: 'defined' };
    }
    
    if (!variable.dataSource) {
      // No data source = required parameter
      return { text: 'required param', type: 'required' };
    } else if (variable.allowOverride) {
      // Data source + override = optional parameter
      return { text: 'optional param', type: 'optional' };
    } else {
      // Data source + no override = locked (not a parameter)
      return { text: 'locked', type: 'locked' };
    }
  };

  return (
    <div className={styles.variableTable}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Variables</h3>
        <button
          className={styles.addButton}
          onClick={startAddNew}
          disabled={isAddingNew}
        >
          Add Variable
        </button>
      </div>

      {/* Empty State */}
      {variables.length === 0 && !isAddingNew && (
        <div className={styles.emptyState}>
          {emptyStateText}
        </div>
      )}

      {/* Variable List */}
      <div className={styles.variableList}>
        {/* Adding New Variable Card */}
        {isAddingNew && (
          <div className={`${styles.variableCard} ${styles.addingCard}`}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.variableNameSection}>
                <DollarSign className={styles.dollarIcon} size={20} />
                <div className={styles.editInputWrapper}>
                  <Input
                    value={newVariableName}
                    onChange={(e) => setNewVariableName(e.target.value)}
                    onKeyDown={handleAddKeyDown}
                    placeholder="variableName"
                    className={styles.editInput}
                    autoFocus
                  />
                  <button
                    className={styles.iconButton}
                    onClick={saveNewVariable}
                    title="Save"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={cancelAddNew}
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Verbalization Row */}
            <div className={styles.cardRow}>
              <div className={styles.cardLabel}>
                Verbalization
                <span className={styles.optionalLabel}>(optional)</span>
              </div>
              <Input
                value={newVariableVerbalization}
                onChange={(e) => setNewVariableVerbalization(e.target.value)}
                placeholder="e.g., customer name"
                className={styles.verbalizationInput}
              />
              <div className={styles.helpText}>
                Natural language alias for business users
              </div>
            </div>

            {/* Type Row */}
            {showTypeSelector && (
              <div className={styles.cardRow}>
                <div className={styles.cardLabel}>Type</div>
                <Select 
                  value={newVariableType}
                  onValueChange={(value) => setNewVariableType(value as Variable['type'])}
                >
                  <SelectTrigger className={styles.typeSelector}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="time">Time</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="object">Object</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Format Row - Only for date type variables */}
            {showTypeSelector && newVariableType === 'date' && (
              <div className={styles.cardRow}>
                <div className={styles.cardLabel}>Date Format</div>
                <Select
                  value={newVariableDateFormat}
                  onValueChange={(value) => setNewVariableDateFormat(value as DateFormat)}
                >
                  <SelectTrigger className={styles.typeSelector}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_FORMAT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className={styles.dateFormatExample}>
                  Example: {DATE_FORMAT_OPTIONS.find(o => o.value === newVariableDateFormat)?.example}
                </div>
              </div>
            )}

            {/* Time Format Row - Only for time type variables */}
            {showTypeSelector && newVariableType === 'time' && (
              <div className={styles.cardRow}>
                <div className={styles.cardLabel}>Time Format</div>
                <Select
                  value={newVariableTimeFormat}
                  onValueChange={(value) => setNewVariableTimeFormat(value as TimeFormat)}
                >
                  <SelectTrigger className={styles.typeSelector}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_FORMAT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className={styles.dateFormatExample}>
                  Example: {TIME_FORMAT_OPTIONS.find(o => o.value === newVariableTimeFormat)?.example}
                </div>
              </div>
            )}

            {/* Data Source Row */}
            {showDataSourcePicker && (
              <div className={styles.cardRow}>
                <div className={styles.cardLabel}>Data Source</div>
                <div className={styles.dataSourceSection}>
                  <Input
                    value={newVariableDataSource}
                    onChange={(e) => setNewVariableDataSource(e.target.value)}
                    placeholder="#attribute.path (optional)"
                    className={styles.dataSourceInput}
                  />
                  {newVariableDataSource.trim() && (
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={newVariableAllowOverride}
                        onChange={(e) => setNewVariableAllowOverride(e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span>Allow override when invoking</span>
                    </label>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Existing Variables */}
        {variables.map((variable) => {
          const isEditing = editingId === variable.id;
          const parameterBadge = getParameterBadge(variable);

          return (
            <div key={variable.id} className={styles.variableCard}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.variableNameSection}>
                  <DollarSign className={styles.dollarIcon} size={20} />
                  
                  {isEditing ? (
                    <div className={styles.editInputWrapper}>
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        className={styles.editInput}
                        autoFocus
                      />
                      <button
                        className={styles.iconButton}
                        onClick={saveEdit}
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={cancelEdit}
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles.variableName}
                        onClick={() => startEdit(variable)}
                        title="Click to edit"
                      >
                        {variable.name}
                      </div>
                      {parameterBadge && (
                        <div className={styles.parameterBadge} data-type={parameterBadge.type}>
                          {parameterBadge.text}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!isEditing && (
                  <div className={styles.cardActions}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete(variable.id)}
                      title="Delete variable"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Verbalization Row */}
              <div className={styles.cardRow}>
                <div className={styles.cardLabel}>
                  Verbalization
                  <span className={styles.optionalLabel}>(optional)</span>
                </div>
                <div className={styles.verbalizationSection}>
                  <Input
                    value={variable.verbalization || ''}
                    onChange={(e) => handleVerbalizationChange(variable.id, variable.name, e.target.value)}
                    placeholder="e.g., customer name"
                    className={`${styles.verbalizationInput} ${verbalizationErrors.has(variable.id) ? styles.inputError : ''}`}
                  />
                  {verbalizationErrors.has(variable.id) && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {verbalizationErrors.get(variable.id)}
                    </div>
                  )}
                  <div className={styles.helpText}>
                    Natural language alias for business users
                  </div>
                </div>
              </div>

              {/* Type Row */}
              {showTypeSelector && (
                <div className={styles.cardRow}>
                  <div className={styles.cardLabel}>Type</div>
                  <Select
                    value={variable.type}
                    onValueChange={(value) => onUpdate(variable.id, { type: value as Variable['type'] })}
                  >
                    <SelectTrigger className={styles.typeSelector}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="time">Time</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="object">Object</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Date Format Row - Only for date type variables */}
              {showTypeSelector && variable.type === 'date' && (
                <div className={styles.cardRow}>
                  <div className={styles.cardLabel}>Date Format</div>
                  <Select
                    value={variable.dateFormat || 'YYYY-MM-DD'}
                    onValueChange={(value) => onUpdate(variable.id, { dateFormat: value as DateFormat })}
                  >
                    <SelectTrigger className={styles.typeSelector}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DATE_FORMAT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className={styles.dateFormatExample}>
                    Example: {DATE_FORMAT_OPTIONS.find(o => o.value === (variable.dateFormat || 'YYYY-MM-DD'))?.example}
                  </div>
                </div>
              )}

              {/* Time Format Row - Only for time type variables */}
              {showTypeSelector && variable.type === 'time' && (
                <div className={styles.cardRow}>
                  <div className={styles.cardLabel}>Time Format</div>
                  <Select
                    value={variable.timeFormat || 'HH:MM:SS'}
                    onValueChange={(value) => onUpdate(variable.id, { timeFormat: value as TimeFormat })}
                  >
                    <SelectTrigger className={styles.typeSelector}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_FORMAT_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className={styles.dateFormatExample}>
                    Example: {TIME_FORMAT_OPTIONS.find(o => o.value === (variable.timeFormat || 'HH:MM:SS'))?.example}
                  </div>
                </div>
              )}

              {/* Data Source Row */}
              {showDataSourcePicker && (
                <div className={styles.cardRow}>
                  <div className={styles.cardLabel}>Data Source</div>
                  <div className={styles.dataSourceSection}>
                    <Input
                      value={variable.dataSource || ''}
                      onChange={(e) => {
                        const newDataSource = e.target.value;
                        onUpdate(variable.id, { 
                          dataSource: newDataSource,
                          // If clearing data source, clear allowOverride too
                          ...(newDataSource.trim() === '' && { allowOverride: undefined })
                        });
                      }}
                      placeholder="#attribute.path (optional)"
                      className={styles.dataSourceInput}
                    />
                    {variable.dataSource && variable.dataSource.trim() && (
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={variable.allowOverride ?? true}
                          onChange={(e) => onUpdate(variable.id, { allowOverride: e.target.checked })}
                          className={styles.checkbox}
                        />
                        <span>Allow override when invoking</span>
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}