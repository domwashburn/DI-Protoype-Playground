/**
 * DebugVariableInspector — shows variable and attribute values at current debug step.
 *
 * Handles messy real-world data: long arrays, deep objects, empty maps, null values,
 * dates, extremely long strings. Values truncate with ellipsis and expand on click.
 */

import { useState } from 'react';
import { Inbox } from 'lucide-react';
import styles from './DebugVariableInspector.module.css';

export interface DebugVariableInspectorProps {
  /** Variable values at current step */
  variables: Map<string, any>;
  /** Attribute values at current step */
  attributes: Map<string, any>;
}

type ValueCategory =
  | 'number'
  | 'string'
  | 'boolean'
  | 'null'
  | 'array'
  | 'object'
  | 'date'
  | 'unknown';

export function DebugVariableInspector({
  variables,
  attributes,
}: DebugVariableInspectorProps) {
  const hasVariables = variables.size > 0;
  const hasAttributes = attributes.size > 0;

  if (!hasVariables && !hasAttributes) {
    return (
      <div className={styles.inspector}>
        <div className={styles.header}>Variable Inspector</div>
        <div className={styles.empty}>
          <Inbox size={20} aria-hidden="true" />
          <div className={styles.emptyTitle}>No bindings at this step</div>
          <div className={styles.emptyHint}>
            Variables and attributes will appear here as they are assigned.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inspector}>
      <div className={styles.header}>
        <span>Variable Inspector</span>
        <span className={styles.headerCount}>
          {variables.size + attributes.size} binding{variables.size + attributes.size === 1 ? '' : 's'}
        </span>
      </div>

      <div className={styles.content}>
        {hasVariables && (
          <InspectorSection title="Variables" sigil="$" entries={variables} />
        )}
        {hasAttributes && (
          <InspectorSection title="Attributes" sigil="#" entries={attributes} />
        )}
      </div>
    </div>
  );
}

function InspectorSection({
  title,
  sigil,
  entries,
}: {
  title: string;
  sigil: string;
  entries: Map<string, any>;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <span>{title}</span>
        <span className={styles.sectionCount}>{entries.size}</span>
      </div>
      <div className={styles.table}>
        {Array.from(entries.entries()).map(([name, value]) => (
          <InspectorRow key={name} sigil={sigil} name={name} value={value} />
        ))}
      </div>
    </div>
  );
}

function InspectorRow({
  sigil,
  name,
  value,
}: {
  sigil: string;
  name: string;
  value: any;
}) {
  const [expanded, setExpanded] = useState(false);
  const category = getValueCategory(value);
  const preview = formatValue(value, false);
  const full = formatValue(value, true);
  const isExpandable = full !== preview;

  return (
    <div className={styles.row} data-category={category}>
      <div className={styles.name} title={name}>
        <span className={styles.sigil}>{sigil}</span>
        <span className={styles.nameText}>{name}</span>
      </div>
      <button
        type="button"
        className={styles.value}
        onClick={() => isExpandable && setExpanded((v) => !v)}
        title={isExpandable ? (expanded ? 'Click to collapse' : full) : undefined}
        data-expanded={expanded || undefined}
        data-expandable={isExpandable || undefined}
        disabled={!isExpandable}
      >
        <span className={styles.valueText}>{expanded ? full : preview}</span>
      </button>
      <span className={styles.type} data-category={category}>
        {category}
      </span>
    </div>
  );
}

function getValueCategory(value: any): ValueCategory {
  if (value === null || value === undefined) return 'null';
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'object') return 'object';
  return 'unknown';
}

const PREVIEW_MAX = 48;

function formatValue(value: any, full: boolean): string {
  if (value === null || value === undefined) return 'null';

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    if (!full && value.length > 5) {
      const head = value.slice(0, 3).map((v) => formatValue(v, false)).join(', ');
      return `[${head}, … +${value.length - 3}]`;
    }
    const inner = value.map((v) => formatValue(v, full)).join(', ');
    return truncate(`[${inner}]`, full);
  }

  if (typeof value === 'string') {
    return truncate(`"${value}"`, full);
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return String(value);
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  }

  if (typeof value === 'boolean') return value ? 'true' : 'false';

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (!full && keys.length > 3) {
      const head = keys
        .slice(0, 2)
        .map((k) => `${k}: ${formatValue(value[k], false)}`)
        .join(', ');
      return `{ ${head}, … +${keys.length - 2} }`;
    }
    const inner = keys
      .map((k) => `${k}: ${formatValue(value[k], full)}`)
      .join(', ');
    return truncate(`{ ${inner} }`, full);
  }

  return String(value);
}

function truncate(s: string, full: boolean): string {
  if (full || s.length <= PREVIEW_MAX) return s;
  return `${s.slice(0, PREVIEW_MAX - 1)}…`;
}
