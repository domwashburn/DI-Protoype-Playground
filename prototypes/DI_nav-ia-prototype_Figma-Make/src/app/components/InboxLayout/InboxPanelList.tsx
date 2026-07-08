import React, { ReactNode } from 'react';
import LargeListItem, { LargeListItemMenuItem } from '../LargeListItem';
import styles from './InboxPanelList.module.css';

/**
 * InboxPanelList (Custom Carbon-compliant)
 *
 * A scrollable list container for inbox-style navigation panels.
 * Reference: https://carbondesignsystem.com/patterns/overview/
 *
 * Can be used in two modes:
 * 1. Data-driven: Pass `items` array for automatic LargeListItem rendering
 * 2. Composition: Pass custom children for full control
 *
 * @param items - Array of inbox items to render as LargeListItems
 * @param selectedItemId - Currently selected item ID for active state
 * @param onItemClick - Callback when an item is clicked
 * @param onMenuAction - Callback when a menu action is triggered
 * @param getMenuItems - Function returning menu items for a given item ID
 * @param variant - Display variant: 'details' (metadata lines) or 'description' (single line)
 * @param children - Custom content (used when items is not provided)
 * @param className - Additional CSS class names
 */

interface InboxItem {
  id: string;
  name: string;
  details?: string[];
  description?: string;
}

interface InboxPanelListProps {
  children?: ReactNode;
  items?: InboxItem[];
  selectedItemId?: string | null;
  onItemClick?: (id: string) => void;
  onMenuAction?: (action: string, id: string) => void;
  getMenuItems?: (itemId: string) => LargeListItemMenuItem[];
  variant?: 'details' | 'description';
  className?: string;
}

export default function InboxPanelList({
  children,
  items,
  selectedItemId,
  onItemClick,
  onMenuAction,
  getMenuItems,
  variant = 'details',
  className = '',
}: InboxPanelListProps) {
  // Data-driven mode: render LargeListItems from items array
  if (items) {
    return (
      <div className={`${styles.listContainer} ${className}`} role="listbox">
        {items.map(item => (
          <LargeListItem
            key={item.id}
            id={item.id}
            title={item.name}
            isSelected={item.id === selectedItemId}
            onClick={() => onItemClick?.(item.id)}
            showIcon={true}
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="var(--cds-icon-primary)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  fill="none"
                />
              </svg>
            }
            variant={variant}
            details={item.details}
            description={item.description}
            showMenu={!!getMenuItems}
            menuItems={getMenuItems ? getMenuItems(item.id) : []}
            onMenuAction={onMenuAction}
          />
        ))}
      </div>
    );
  }

  // Composition mode: render children directly
  return (
    <div className={`${styles.listContainer} ${className}`} role="listbox">
      {children}
    </div>
  );
}