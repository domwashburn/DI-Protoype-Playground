/**
 * BlockTypeMenu Component
 * 
 * Slash command menu for quickly changing block types.
 * Triggered by typing "/" in an empty block (Notion-style).
 * 
 * CARBON_CONVERT: This is a temporary component.
 * Will be replaced with Carbon Dropdown or Menu component.
 */

import React, { useRef, useEffect } from 'react';
import type { BlockType } from '../../SampleData/richTextSamples';
import styles from './BlockTypeMenu.module.css';

export interface BlockTypeOption {
  type: BlockType;
  label: string;
  description: string;
  icon: string;
}

export const BLOCK_TYPE_OPTIONS: BlockTypeOption[] = [
  { type: 'paragraph', label: 'Paragraph', description: 'Plain text block', icon: '¶' },
  { type: 'heading1', label: 'Heading 1', description: 'Large section heading', icon: 'H1' },
  { type: 'heading2', label: 'Heading 2', description: 'Medium section heading', icon: 'H2' },
  { type: 'heading3', label: 'Heading 3', description: 'Small section heading', icon: 'H3' },
  { type: 'bulletList', label: 'Bullet List', description: 'Simple bulleted list', icon: '•' },
  { type: 'numberedList', label: 'Numbered List', description: 'Numbered list', icon: '1.' },
  { type: 'checkbox', label: 'To-do', description: 'Checkbox task list', icon: '☑' },
  { type: 'quote', label: 'Quote', description: 'Quotation block', icon: '"' },
  { type: 'code', label: 'Code', description: 'Code block', icon: '</>' },
  { type: 'callout', label: 'Callout', description: 'Important notice', icon: '!' },
  { type: 'table', label: 'Table', description: 'Table with rows and columns', icon: '⊞' },
  { type: 'divider', label: 'Divider', description: 'Horizontal line', icon: '—' },
];

interface BlockTypeMenuProps {
  /** Typed query to filter options */
  query: string;
  /** Currently selected index */
  selectedIndex: number;
  /** Position for the menu */
  position: { top: number; left: number };
  /** Callback when option is selected */
  onSelect: (type: BlockType) => void;
  /** Callback when hovering over option */
  onHover: (index: number) => void;
}

export const BlockTypeMenu: React.FC<BlockTypeMenuProps> = ({
  query,
  selectedIndex,
  position,
  onSelect,
  onHover
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Filter options based on query (with null check)
  const filteredOptions = BLOCK_TYPE_OPTIONS.filter(option => {
    if (!query) return true; // Show all if no query
    const searchText = query.toLowerCase();
    return (
      option.label.toLowerCase().includes(searchText) ||
      option.description.toLowerCase().includes(searchText)
    );
  });

  // Auto-scroll selected item into view
  useEffect(() => {
    if (menuRef.current) {
      const selectedElement = menuRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (filteredOptions.length === 0) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className={styles.blockTypeMenu}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className={styles.blockTypeMenuHeader}>
        <span className={styles.blockTypeMenuTitle}>Block Types</span>
        <span className={styles.blockTypeMenuHint}>↑↓ Navigate • Enter Select • Esc Close</span>
      </div>
      
      <div className={styles.blockTypeMenuList}>
        {filteredOptions.map((option, index) => (
          <button
            key={option.type}
            className={`${styles.blockTypeMenuItem} ${index === selectedIndex ? styles.selected : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(option.type);
            }}
            onMouseEnter={() => onHover(index)}
          >
            <span className={styles.blockTypeIcon}>{option.icon}</span>
            <div className={styles.blockTypeInfo}>
              <span className={styles.blockTypeLabel}>{option.label}</span>
              <span className={styles.blockTypeDescription}>{option.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};