/**
 * NestedAttributeInput - Recursive Nested Attribute Input Component
 * 
 * Displays attributes in a hierarchical, expandable/collapsible structure.
 * Supports deeply nested objects like: employee.address.city
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 */

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Switch } from '../../../ui/switch';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { Button } from '../../../ui/button';
import { formatDate, parseFormattedDate } from '../../../../utils/dateFormatting';
import { formatTime, parseFormattedTime } from '../../../../utils/timeFormatting';
import type { NestedAttributeNode } from '../../balSupport/balAttributeUtils';
import styles from './NestedAttributeInput.module.css';

/**
 * TODO: Temporarily inlined utility functions - should use imports once bundler issue is resolved
 */

/**
 * Check if a node is a leaf (has type property) or object node
 */
function isLeafNode(node: any): boolean {
  return node && typeof node === 'object' && 'type' in node && 'fullPath' in node;
}

/**
 * Get nested value from object using dot-notation path
 */
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const part of path) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

/**
 * Count properties in nested structure (for UI display)
 */
function countProperties(node: any): number {
  if (isLeafNode(node)) {
    return 1;
  }
  
  let count = 0;
  for (const [key, value] of Object.entries(node)) {
    if (key === 'type' || key === 'description' || key === 'defaultValue' || key === 'unit' || key === 'fullPath') {
      continue;
    }
    count += countProperties(value);
  }
  return count;
}

export interface NestedAttributeInputProps {
  /** Display name of this node */
  name: string;
  /** Node data (either leaf with type or object with children) */
  node: NestedAttributeNode;
  /** Path from root to this node */
  path?: string[];
  /** All attribute values (nested object) */
  values: any;
  /** Called when value changes */
  onChange: (fullPath: string, value: any) => void;
  /** Predefined values for dropdowns (optional) */
  predefinedValues?: Record<string, string[]>;
}

/**
 * Recursive component for nested attribute rendering
 * Supports expandable/collapsible sections for object nodes
 */
export function NestedAttributeInput({
  name,
  node,
  path = [],
  values,
  onChange,
  predefinedValues = {}
}: NestedAttributeInputProps) {
  const [expanded, setExpanded] = useState(true);
  const fullPath = [...path, name].join('.');
  
  // Check if this is a leaf node (actual attribute) or object node
  const isLeaf = isLeafNode(node);
  
  if (isLeaf) {
    // Leaf node - render typed input
    const currentValue = getNestedValue(values, [...path, name]);
    const predefined = predefinedValues[node.fullPath || ''];
    
    return (
      <div className={styles.inputRow}>
        <label className={styles.attributeLabel}>
          <span className={styles.attributeName}>{name}</span>
          <span className={styles.attributeType}>{node.type}</span>
          {node.unit && (
            <span className={styles.attributeUnit}>({node.unit})</span>
          )}
        </label>
        
        <TypedInput
          type={node.type!}
          value={currentValue}
          onChange={(value) => onChange(fullPath, value)}
          placeholder={node.defaultValue?.toString()}
          predefinedValues={predefined}
        />
        
        {node.description && (
          <span className={styles.attributeDescription}>
            {node.description}
          </span>
        )}
      </div>
    );
  }
  
  // Object node - render expandable section
  // Filter out metadata properties
  const childEntries = Object.entries(node).filter(([key]) => 
    key !== 'type' && 
    key !== 'description' && 
    key !== 'defaultValue' && 
    key !== 'unit' && 
    key !== 'fullPath'
  );
  
  const childCount = childEntries.reduce((count, [_, childNode]) => {
    return count + countProperties(childNode);
  }, 0);
  
  return (
    <div className={styles.nestedObject}>
      <div 
        className={styles.objectHeader}
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
      >
        <ChevronRight 
          className={expanded ? styles.rotated : styles.chevron}
          size={16}
        />
        <span className={styles.objectName}>{name}</span>
        <span className={styles.propertyCount}>
          {childCount} {childCount === 1 ? 'property' : 'properties'}
        </span>
      </div>
      
      {expanded && (
        <div className={styles.nestedContent}>
          {childEntries.map(([childName, childNode]) => (
            <NestedAttributeInput
              key={childName}
              name={childName}
              node={childNode}
              path={[...path, name]}
              values={values}
              onChange={onChange}
              predefinedValues={predefinedValues}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Typed input component for different data types
 */
interface TypedInputProps {
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  predefinedValues?: string[];
}

function TypedInput({ type, value, onChange, placeholder, predefinedValues }: TypedInputProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  switch (type) {
    case 'boolean':
      return (
        <div className={styles.booleanInput}>
          <Switch
            checked={value === true}
            onCheckedChange={onChange}
          />
          <span className={styles.booleanLabel}>
            {value === true ? 'True' : 'False'}
          </span>
        </div>
      );
      
    case 'number':
      if (predefinedValues && predefinedValues.length > 0) {
        // Dropdown for predefined values
        return (
          <Select
            value={value?.toString() || ''}
            onValueChange={(val) => onChange(parseFloat(val))}
          >
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue placeholder={placeholder || "Select value"} />
            </SelectTrigger>
            <SelectContent>
              {predefinedValues.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      // Regular number input
      return (
        <Input
          type="number"
          value={value ?? ''}
          onChange={(e) => {
            const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
            onChange(val);
          }}
          placeholder={placeholder}
          className={styles.input}
        />
      );
      
    case 'date':
      return (
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className={styles.dateButton}>
              {value ? formatDate(value) : placeholder || "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className={styles.calendarPopover}>
            <Calendar
              mode="single"
              selected={value ? parseFormattedDate(value) : undefined}
              onSelect={(date) => {
                if (date) {
                  onChange(formatDate(date));
                  setDatePickerOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      );
      
    case 'time':
      return (
        <Input
          type="time"
          value={value || ''}
          onChange={(e) => {
            const timeVal = e.target.value;
            if (timeVal) {
              onChange(formatTime(parseFormattedTime(timeVal)));
            } else {
              onChange(undefined);
            }
          }}
          placeholder={placeholder}
          className={styles.input}
        />
      );
      
    case 'string':
    default:
      if (predefinedValues && predefinedValues.length > 0) {
        // Dropdown for predefined values
        return (
          <Select
            value={value || ''}
            onValueChange={onChange}
          >
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue placeholder={placeholder || "Select value"} />
            </SelectTrigger>
            <SelectContent>
              {predefinedValues.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      // Regular text input
      return (
        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
      );
  }
}