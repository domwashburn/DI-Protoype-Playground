/**
 * MentionAutocomplete Component
 * 
 * Autocomplete popover for @mention suggestions in Rich Text Editor.
 * Shows mentionable entities (KPIs, Dashboards, Documents, Automations).
 * 
 * CARBON_CONVERT: This component uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useEffect, useRef } from 'react';
import type { MentionableEntity } from '../editors/core/types';
import styles from './MentionAutocomplete.module.css';

export interface MentionAutocompleteProps {
  /** Filtered suggestions based on query */
  suggestions: MentionableEntity[];
  /** Currently selected index */
  selectedIndex: number;
  /** Current search query */
  query: string;
  /** Position to render popover */
  position: { top: number; left: number };
  /** Called when suggestion is clicked */
  onSelect: (entity: MentionableEntity) => void;
  /** Called when mouse enters a suggestion */
  onHover: (index: number) => void;
}

/**
 * Autocomplete popover for @mention suggestions
 */
export const MentionAutocomplete: React.FC<MentionAutocompleteProps> = ({
  suggestions,
  selectedIndex,
  query,
  position,
  onSelect,
  onHover,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (suggestions.length === 0) return null;

  return (
    <div
      className={styles.mentionPopover}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div ref={listRef} className={styles.suggestionList}>
        {suggestions.map((entity, index) => (
          <div
            key={entity.id}
            className={`${styles.suggestionItem} ${
              index === selectedIndex ? styles.selected : ''
            }`}
            onClick={() => onSelect(entity)}
            onMouseEnter={() => onHover(index)}
          >
            <div className={styles.suggestionMain}>
              <div className={styles.suggestionLabel}>
                {entity.icon && <span className={styles.entityIcon}>{entity.icon}</span>}
                <span className={styles.entityName}>{entity.name}</span>
              </div>
              {entity.badge && (
                <span className={styles.entityBadge}>{entity.badge}</span>
              )}
            </div>
            {entity.description && (
              <div className={styles.suggestionDescription}>{entity.description}</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.autocompleteHint}>
        <kbd>↑</kbd>
        <kbd>↓</kbd>
        navigate
        <span className={styles.separator}>•</span>
        <kbd>Enter</kbd>
        select
        <span className={styles.separator}>•</span>
        <kbd>Esc</kbd>
        close
      </div>
    </div>
  );
};
