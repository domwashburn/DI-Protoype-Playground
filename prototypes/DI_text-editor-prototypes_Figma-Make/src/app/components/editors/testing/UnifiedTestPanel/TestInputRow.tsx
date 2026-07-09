/**
 * TestInputRow - Reusable Input Row Component
 * 
 * Type-aware input widget for test values
 * Supports: string, number, boolean, date, time, datetime
 * 
 * Features:
 * - Type-based input widgets
 * - Predefined value dropdown
 * - Description and unit display
 * - Link indicator (for variable-attribute pairs)
 * - Lock indicator (for defined variables)
 */

import { useState } from 'react';
import { Calendar as CalendarIcon, Lock } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Switch } from '../../../ui/switch';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import styles from './TestInputRow.module.css';

export interface TestInputRowProps {
  /** Input label */
  label: string;
  /** Input type */
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Optional description */
  description?: string;
  /** Optional unit label */
  unit?: string;
  /** Predefined value options */
  predefinedValues?: string[];
  /** Link indicator text (e.g., "Linked to $variable") */
  linkIndicator?: string;
  /** Whether this is locked (defined variable) */
  isLocked?: boolean;
  /** Lock explanation text */
  lockReason?: string;
  /** Custom CSS class */
  className?: string;
}

export function TestInputRow({
  label,
  type,
  value,
  onChange,
  description,
  unit,
  predefinedValues = [],
  linkIndicator,
  isLocked = false,
  lockReason,
  className = ''
}: TestInputRowProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Build description with unit if provided
  const fullDescription = description && unit 
    ? `${description} (${unit})`
    : description;

  return (
    <div className={`${styles.inputRow} ${className}`}>
      <div className={styles.labelSection}>
        <label className={styles.label}>
          {label}
          {isLocked && (
            <Lock size={12} className={styles.lockIcon} title={lockReason} />
          )}
        </label>
        {fullDescription && (
          <span className={styles.description}>{fullDescription}</span>
        )}
        {linkIndicator && (
          <span className={styles.linkIndicator}>{linkIndicator}</span>
        )}
      </div>

      <div className={styles.inputSection}>
        {isLocked ? (
          /* Locked input - show value but not editable */
          <div className={styles.lockedValue}>{value || 'Not calculated yet'}</div>
        ) : (
          <>
            {/* Predefined values dropdown (if available) */}
            {predefinedValues.length > 0 && (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={styles.select}>
                  <SelectValue placeholder="Select value..." />
                </SelectTrigger>
                <SelectContent>
                  {predefinedValues.map(val => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Type-based input widget */}
            {predefinedValues.length === 0 && (
              <>
                {type === 'boolean' ? (
                  /* Boolean: Toggle Switch */
                  <div className={styles.toggleContainer}>
                    <Switch
                      checked={value === 'true'}
                      onCheckedChange={(checked) => onChange(checked ? 'true' : 'false')}
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                      }}
                    />
                    <span className={styles.toggleLabel}>
                      {value === 'true' ? 'True' : 'False'}
                    </span>
                  </div>
                ) : type === 'date' ? (
                  /* Date: Date Picker with Calendar Popup */
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <div className={styles.datePickerTrigger}>
                        <Input
                          type="text"
                          value={value || ''}
                          readOnly
                          placeholder="YYYY-MM-DD"
                          className={styles.input}
                          style={{
                            fontFamily: 'var(--font-family-sans)',
                            fontSize: '14px',
                            lineHeight: '18px',
                          }}
                        />
                        <CalendarIcon className={styles.calendarIcon} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className={styles.calendarContent} align="start">
                      <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const isoDate = date.toISOString().split('T')[0];
                            onChange(isoDate);
                            setIsCalendarOpen(false);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : type === 'datetime' ? (
                  /* Datetime: Datetime-local Input */
                  <Input
                    type="datetime-local"
                    value={value ? value.slice(0, 16) : ''}
                    onChange={(e) => {
                      if (e.target.value) {
                        const isoDate = new Date(e.target.value).toISOString();
                        onChange(isoDate);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        e.stopPropagation();
                      }
                    }}
                    placeholder="yyyy / mm / dd, --:-- --"
                    className={styles.input}
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '14px',
                      lineHeight: '18px',
                    }}
                  />
                ) : type === 'time' ? (
                  /* Time: Time Input */
                  <Input
                    type="time"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="HH:MM:SS"
                    className={styles.input}
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '14px',
                      lineHeight: '18px',
                    }}
                  />
                ) : type === 'number' ? (
                  /* Number: Number Input */
                  <Input
                    type="number"
                    step="any"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter number..."
                    className={styles.input}
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '14px',
                      lineHeight: '18px',
                    }}
                  />
                ) : (
                  /* String: Text Input */
                  <Input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter text..."
                    className={styles.input}
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '14px',
                      lineHeight: '18px',
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
