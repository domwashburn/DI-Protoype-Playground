/**
 * AttributeInputsSection - Attribute Test Inputs
 * 
 * Displays test input fields for data model attributes
 * Supports both flat (formula mode) and hierarchical (BAL mode) display
 * Integrates with data model extensions from Phase 3
 * 
 * Features:
 * - Flat list for formula mode
 * - Nested hierarchy for BAL mode
 * - Custom attribute indicators
 * - Vocabulary display
 * - Data model extension integration
 */

import { AlertCircle } from 'lucide-react';
import { TestInputRow } from './TestInputRow';
import { NestedAttributeInput } from '../../code/FormulaEditor/NestedAttributeInput';
import type { NestedAttributeNode } from '../../balSupport/balAttributeUtils';
import styles from './AttributeInputsSection.module.css';

export interface AttributeDefinition {
  path: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
  description?: string;
  defaultValue?: any;
  unit?: string;
  isCustom?: boolean;
  vocabulary?: string[];
}

export interface AttributeInputsSectionProps {
  /** Display mode */
  mode: 'formula' | 'bal';
  /** Attribute definitions */
  attributes: AttributeDefinition[];
  /** Current test values (flat structure) */
  attributeValues: Record<string, string>;
  /** Change handler (flat structure) */
  onChange: (attributePath: string, value: string) => void;
  /** Nested attribute values (BAL mode) */
  nestedValues?: any;
  /** Nested change handler (BAL mode) */
  onNestedChange?: (fullPath: string, value: any) => void;
  /** Nested hierarchy (BAL mode) */
  hierarchy?: Record<string, NestedAttributeNode>;
  /** Predefined value options */
  predefinedValues?: Record<string, string[]>;
  /** Linked variable names (for link indicators) */
  linkedVariables?: Record<string, string>;
}

/**
 * Parse flat attributes into nested hierarchy
 * Helper for BAL mode when hierarchy not provided
 */
function parseAttributeHierarchy(
  attributeDefs: AttributeDefinition[]
): Record<string, NestedAttributeNode> {
  const root: Record<string, any> = {};
  
  attributeDefs.forEach(def => {
    const parts = def.path.split('.');
    let current = root;
    
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      
      if (isLeaf) {
        // Leaf node - actual attribute with type
        current[part] = {
          type: def.type,
          description: def.description,
          defaultValue: def.defaultValue,
          unit: def.unit,
          fullPath: def.path
        };
      } else {
        // Intermediate node - nested object
        if (!current[part] || typeof current[part] !== 'object' || current[part].type) {
          current[part] = {};
        }
        current = current[part];
      }
    });
  });
  
  return root;
}

export function AttributeInputsSection({
  mode,
  attributes,
  attributeValues,
  onChange,
  nestedValues = {},
  onNestedChange,
  hierarchy,
  predefinedValues = {},
  linkedVariables = {}
}: AttributeInputsSectionProps) {
  
  // No attributes
  if (attributes.length === 0) {
    return null;
  }

  // BAL Mode - Hierarchical Display
  if (mode === 'bal') {
    const attributeHierarchy = hierarchy || parseAttributeHierarchy(attributes);

    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Attributes</div>
          <div className={styles.sectionHint}>
            Data model attributes (hierarchical structure)
          </div>
        </div>

        <div className={styles.nestedList}>
          {Object.entries(attributeHierarchy).map(([rootName, rootNode]) => (
            <NestedAttributeInput
              key={rootName}
              name={rootName}
              node={rootNode}
              values={nestedValues}
              onChange={onNestedChange || onChange}
              predefinedValues={predefinedValues}
            />
          ))}
        </div>

        {/* Custom Attributes Legend */}
        {attributes.some(a => a.isCustom) && (
          <div className={styles.legend}>
            <span className={styles.customBadge}>🔧</span>
            <span className={styles.legendText}>Custom attribute</span>
          </div>
        )}
      </div>
    );
  }

  // Formula Mode - Flat Display
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>Attributes</div>
        <div className={styles.sectionHint}>
          Data model attributes (referenced in formula)
        </div>
      </div>

      <div className={styles.inputList}>
        {attributes.map(attr => {
          const linkedVar = linkedVariables[attr.path];
          const options = predefinedValues[attr.path] || [];

          // Build description with vocabulary if available
          let description = attr.description || '';
          if (attr.vocabulary && attr.vocabulary.length > 0) {
            const vocabText = attr.vocabulary.join(', ');
            description = description 
              ? `${description} • Vocabulary: ${vocabText}`
              : `Vocabulary: ${vocabText}`;
          }

          // Build label with custom indicator
          const label = attr.isCustom 
            ? `#${attr.path} 🔧`
            : `#${attr.path}`;

          return (
            <TestInputRow
              key={attr.path}
              label={label}
              type={attr.type}
              value={attributeValues[attr.path] || ''}
              onChange={(value) => onChange(attr.path, value)}
              description={description}
              unit={attr.unit}
              predefinedValues={options}
              linkIndicator={linkedVar ? `Linked to $${linkedVar}` : undefined}
            />
          );
        })}
      </div>

      {/* Custom Attributes Legend */}
      {attributes.some(a => a.isCustom) && (
        <div className={styles.legend}>
          <span className={styles.customBadge}>🔧</span>
          <span className={styles.legendText}>Custom attribute</span>
        </div>
      )}
    </div>
  );
}
