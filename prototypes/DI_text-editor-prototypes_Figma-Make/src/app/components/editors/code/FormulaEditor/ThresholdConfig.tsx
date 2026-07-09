/**
 * ThresholdConfig - Threshold Configuration Component
 * 
 * Allows users to define threshold ranges for numeric formula outputs.
 * Categorizes values into labeled ranges with visual indicators.
 * 
 * Features:
 * - Add/Edit/Delete threshold ranges
 * - Visual preview bar showing colored ranges
 * - Validation: no gaps, no overlaps, min < max
 * - Support for open-ended ranges (e.g., "≥ 800")
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 * Replace shadcn/ui components with Carbon equivalents when converting.
 */

import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import type { Threshold } from '../../core/types';
import styles from './ThresholdConfig.module.css';

export interface ThresholdConfigProps {
  /** Current thresholds */
  thresholds: Threshold[];
  /** Called when thresholds change */
  onThresholdsChange: (thresholds: Threshold[]) => void;
  /** Whether editor is read-only */
  readOnly?: boolean;
}

// Severity color mapping
const SEVERITY_COLORS = {
  error: '#DA1E28',      // Carbon red-60
  warning: '#F1C21B',    // Carbon yellow-30
  info: '#0F62FE',       // Carbon blue-60
  success: '#24A148',    // Carbon green-60
};

export function ThresholdConfig({
  thresholds,
  onThresholdsChange,
  readOnly = false,
}: ThresholdConfigProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Threshold>>({});

  /**
   * Start adding new threshold
   */
  const handleAdd = () => {
    const newThreshold: Threshold = {
      id: `thresh-${Date.now()}`,
      min: 0,
      max: 100,
      label: 'New Range',
      color: SEVERITY_COLORS.info,
      severity: 'info',
      isOpenEnded: false,
    };
    setEditingId(newThreshold.id);
    setEditForm(newThreshold);
  };

  /**
   * Start editing existing threshold
   */
  const handleEdit = (threshold: Threshold) => {
    setEditingId(threshold.id);
    setEditForm({ ...threshold });
  };

  /**
   * Save edited threshold
   */
  const handleSave = () => {
    if (!editingId || !editForm.min || !editForm.label || !editForm.severity) {
      return;
    }

    const isNew = !thresholds.find(t => t.id === editingId);
    
    if (isNew) {
      // Add new threshold
      onThresholdsChange([
        ...thresholds,
        {
          ...editForm as Threshold,
          color: editForm.color || SEVERITY_COLORS[editForm.severity],
        }
      ]);
    } else {
      // Update existing threshold
      onThresholdsChange(
        thresholds.map(t =>
          t.id === editingId
            ? {
                ...editForm as Threshold,
                color: editForm.color || SEVERITY_COLORS[editForm.severity],
              }
            : t
        )
      );
    }

    setEditingId(null);
    setEditForm({});
  };

  /**
   * Cancel editing
   */
  const handleCancel = () => {
    const isNew = !thresholds.find(t => t.id === editingId);
    
    if (isNew) {
      // Don't add if canceling new threshold
      setEditingId(null);
      setEditForm({});
    } else {
      setEditingId(null);
      setEditForm({});
    }
  };

  /**
   * Delete threshold
   */
  const handleDelete = (id: string) => {
    onThresholdsChange(thresholds.filter(t => t.id !== id));
  };

  /**
   * Validate threshold ranges
   * Returns array of validation messages
   */
  const validateThresholds = (): string[] => {
    const errors: string[] = [];
    const sorted = [...thresholds].sort((a, b) => a.min - b.min);

    // Check for overlaps and gaps
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];

      if (current.max === null) {
        errors.push(`"${current.label}" is open-ended but not the last range`);
        continue;
      }

      // Check overlap
      if (current.max >= next.min) {
        errors.push(`"${current.label}" overlaps with "${next.label}"`);
      }

      // Check gap
      if (current.max + 1 < next.min) {
        errors.push(`Gap between "${current.label}" and "${next.label}"`);
      }
    }

    return errors;
  };

  const validationErrors = validateThresholds();

  return (
    <div className={styles.thresholdConfig}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h4 className={styles.title}>Thresholds</h4>
          <p className={styles.subtitle}>
            Categorize numeric outputs into labeled ranges
          </p>
        </div>
        {!readOnly && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleAdd}
            disabled={editingId !== null}
            className={styles.addButton}
          >
            <Plus size={16} />
          </Button>
        )}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className={styles.validation}>
          {validationErrors.map((error, index) => (
            <div key={index} className={styles.validationError}>
              {error}
            </div>
          ))}
        </div>
      )}

      {/* Visual Preview */}
      {thresholds.length > 0 && (
        <div className={styles.preview}>
          {thresholds
            .sort((a, b) => a.min - b.min)
            .map((threshold) => (
              <div
                key={threshold.id}
                className={styles.previewSegment}
                style={{
                  backgroundColor: threshold.color,
                  flex: threshold.max === null ? 1 : threshold.max - threshold.min,
                }}
                title={`${threshold.label}: ${threshold.min}${threshold.max === null ? '+' : ` - ${threshold.max}`}`}
              />
            ))}
        </div>
      )}

      {/* Threshold List */}
      <div className={styles.list}>
        {thresholds.length === 0 && !editingId && (
          <div className={styles.empty}>
            No thresholds defined. Click + to add one.
          </div>
        )}

        {thresholds
          .sort((a, b) => a.min - b.min)
          .map((threshold) => (
            editingId === threshold.id ? (
              <ThresholdEditRow
                key={threshold.id}
                form={editForm}
                onChange={setEditForm}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <ThresholdRow
                key={threshold.id}
                threshold={threshold}
                onEdit={() => handleEdit(threshold)}
                onDelete={() => handleDelete(threshold.id)}
                readOnly={readOnly}
              />
            )
          ))}

        {/* New threshold edit row */}
        {editingId && !thresholds.find(t => t.id === editingId) && (
          <ThresholdEditRow
            form={editForm}
            onChange={setEditForm}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>

      {/* Help Text */}
      {thresholds.length === 0 && !editingId && (
        <div className={styles.help}>
          <strong>Example:</strong> Credit scores can be categorized as Poor (300-579),
          Fair (580-669), Good (670-739), Very Good (740-799), and Excellent (800+).
        </div>
      )}
    </div>
  );
}

/**
 * Threshold row (read-only display)
 */
function ThresholdRow({
  threshold,
  onEdit,
  onDelete,
  readOnly,
}: {
  threshold: Threshold;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}) {
  return (
    <div className={styles.row}>
      <div
        className={styles.colorIndicator}
        style={{ backgroundColor: threshold.color }}
      />
      <div className={styles.rowContent}>
        <div className={styles.rowLabel}>{threshold.label}</div>
        <div className={styles.rowRange}>
          {threshold.min}
          {threshold.max === null ? '+' : ` - ${threshold.max}`}
        </div>
        <div className={`${styles.rowSeverity} ${styles[threshold.severity]}`}>
          {threshold.severity}
        </div>
      </div>
      {!readOnly && (
        <div className={styles.rowActions}>
          <button
            className={styles.iconButton}
            onClick={onEdit}
            title="Edit"
          >
            <Edit2 size={14} />
          </button>
          <button
            className={styles.iconButton}
            onClick={onDelete}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Threshold edit row
 */
function ThresholdEditRow({
  form,
  onChange,
  onSave,
  onCancel,
}: {
  form: Partial<Threshold>;
  onChange: (form: Partial<Threshold>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className={styles.editRow}>
      {/* Label */}
      <div className={styles.editField}>
        <label className={styles.editLabel}>Label</label>
        <Input
          value={form.label || ''}
          onChange={(e) => onChange({ ...form, label: e.target.value })}
          placeholder="e.g., Excellent"
          className={styles.editInput}
        />
      </div>

      {/* Range */}
      <div className={styles.editRangeRow}>
        <div className={styles.editField}>
          <label className={styles.editLabel}>Min</label>
          <Input
            type="number"
            value={form.min ?? ''}
            onChange={(e) => onChange({ ...form, min: parseFloat(e.target.value) })}
            placeholder="0"
            className={styles.editInput}
          />
        </div>

        <div className={styles.editField}>
          <label className={styles.editLabel}>
            Max
            <input
              type="checkbox"
              checked={form.isOpenEnded || form.max === null}
              onChange={(e) => onChange({
                ...form,
                isOpenEnded: e.target.checked,
                max: e.target.checked ? null : 100,
              })}
              className={styles.checkbox}
            />
            <span className={styles.checkboxLabel}>Open-ended (≥)</span>
          </label>
          <Input
            type="number"
            value={form.max ?? ''}
            onChange={(e) => onChange({ ...form, max: parseFloat(e.target.value) })}
            placeholder="100"
            disabled={form.isOpenEnded || form.max === null}
            className={styles.editInput}
          />
        </div>
      </div>

      {/* Severity */}
      <div className={styles.editField}>
        <label className={styles.editLabel}>Severity</label>
        <Select
          value={form.severity || 'info'}
          onValueChange={(value) => {
            onChange({
              ...form,
              severity: value as Threshold['severity'],
              color: SEVERITY_COLORS[value as keyof typeof SEVERITY_COLORS],
            });
          }}
        >
          <SelectTrigger className={styles.editSelect}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className={styles.editActions}>
        <button
          className={`${styles.iconButton} ${styles.saveButton}`}
          onClick={onSave}
          title="Save"
        >
          <Check size={16} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.cancelButton}`}
          onClick={onCancel}
          title="Cancel"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
