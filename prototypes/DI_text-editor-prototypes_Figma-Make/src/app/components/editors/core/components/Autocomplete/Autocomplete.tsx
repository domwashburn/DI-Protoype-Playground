/**
 * Autocomplete Component
 * 
 * Shared autocomplete/dropdown component for mentions and other entity selection.
 * Provides keyboard navigation, ghost typeahead preview, and consistent UX.
 * 
 * FEATURES:
 * - Arrow key navigation with auto-scroll
 * - Enter to select without nested navigation
 * - Tab to select and continue to nested items (if available)
 * - Escape to close
 * - Click to select
 * - Ghost text preview of selected item
 * - Parent-delegated keyboard handling via ref
 * - Styled to match shadcn Popover appearance
 */

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import styles from './Autocomplete.module.css';

// Base interface that all autocomplete items must extend
export interface AutocompleteItem {
  id: string;
  name: string;
  [key: string]: any; // Allow additional properties
}

// Handle exposed to parent for keyboard control
export interface AutocompleteHandle {
  handleKeyDown: (e: React.KeyboardEvent) => boolean;
}

export interface AutocompleteProps<T extends AutocompleteItem> {
  /** Filtered suggestions */
  suggestions: T[];
  /** Current search query */
  query?: string;
  /** Position to render popover */
  position: { top: number; left: number };
  /** Called when suggestion is selected */
  onSelect: (item: T, method: 'enter' | 'tab' | 'click') => void;
  /** Called when autocomplete should close */
  onClose?: () => void;
  /** Called when selected index changes (for ghost text updates) */
  onSelectedIndexChange?: (index: number) => void;
  /** Render function for each item */
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  /** Hint text for keyboard shortcuts */
  hintText?: string;
}

export const Autocomplete = forwardRef<AutocompleteHandle, AutocompleteProps<AutocompleteItem>>(
  (props, ref) => {
    const { 
      suggestions, 
      query, 
      position, 
      onSelect, 
      onClose, 
      onSelectedIndexChange,
      renderItem, 
      hintText = "↑↓ Navigate · ⏎ Select · Tab Continue · Esc Close"
    } = props;
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset selection when suggestions change
    useEffect(() => {
      setSelectedIndex(0);
    }, [suggestions]);

    // Notify parent when selected index changes
    useEffect(() => {
      onSelectedIndexChange?.(selectedIndex);
    }, [selectedIndex, onSelectedIndexChange]);

    // Auto-scroll selected item into view
    useEffect(() => {
      if (listRef.current) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [selectedIndex]);

    // Expose keyboard handler to parent - with stable dependencies
    useImperativeHandle(ref, () => ({
      handleKeyDown: (e: React.KeyboardEvent): boolean => {
        if (suggestions.length === 0) return false;

        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          onClose?.();
          return true;
        }
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex(i => (i + 1) % suggestions.length);
          return true;
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex(i => (i - 1 + suggestions.length) % suggestions.length);
          return true;
        }
        
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          if (suggestions[selectedIndex]) {
            onSelect(suggestions[selectedIndex], 'enter');
          }
          return true;
        }
        
        if (e.key === 'Tab') {
          e.preventDefault();
          e.stopPropagation();
          if (suggestions[selectedIndex]) {
            onSelect(suggestions[selectedIndex], 'tab');
          }
          return true;
        }

        return false;
      }
    }), [suggestions, selectedIndex, onSelect, onClose]);

    // Render in portal to avoid z-index/clipping issues
    return createPortal(
      <div 
        ref={containerRef}
        className={styles.autocomplete} 
        style={{ 
          position: 'fixed',
          top: position.top, 
          left: position.left,
          zIndex: 9999
        }}
      >
        <ul ref={listRef} className={styles.list}>
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.item} ${index === selectedIndex ? styles.selected : ''}`}
              onClick={() => onSelect(item, 'click')}
              onMouseDown={(e) => {
                // Prevent focus loss from contentEditable
                e.preventDefault();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {renderItem(item, index === selectedIndex)}
            </li>
          ))}
        </ul>
        
        {hintText && (
          <div className={styles.hint}>
            {hintText}
          </div>
        )}
      </div>,
      document.body
    );
  }
);

Autocomplete.displayName = 'Autocomplete';