import React, { useState } from 'react';
import { Filter } from '@carbon/icons-react';
import { Button, Search } from '@carbon/react';
import styles from './InboxPanelToolbar.module.css';

/**
 * InboxPanelToolbar (Custom Carbon-compliant)
 *
 * A search + filter toolbar for inbox-panel sidebars.
 * Composes @carbon/react Search (size="md") and @carbon/react Button
 * (kind="ghost", hasIconOnly) to match Carbon's 40px compact toolbar pattern.
 *
 * Phase 8: replaced hand-rolled <input> + custom <button> with:
 *   - @carbon/react  Search  (size="md", controlled via value/onChange/onClear)
 *   - @carbon/react  Button  (kind="ghost" hasIconOnly renderIcon={Filter})
 *
 * @param searchPlaceholder - Placeholder text passed to Carbon Search
 * @param searchValue       - Controlled search value; uncontrolled if omitted
 * @param onSearchChange    - Callback when search value changes (also fires on clear)
 * @param showFilter        - Whether to render the filter icon button; default true
 * @param onFilterClick     - Callback when the filter button is clicked
 * @param className         - Additional CSS class applied to the toolbar wrapper
 */
interface InboxPanelToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  className?: string;
  /** @deprecated Carbon icons used directly; kept for backward compat */
  SearchIcon?: React.ComponentType;
  /** @deprecated Carbon icons used directly; kept for backward compat */
  FilterIcon?: React.ComponentType;
}

export default function InboxPanelToolbar({
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChange,
  showFilter = true,
  onFilterClick,
  className = '',
}: InboxPanelToolbarProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = searchValue !== undefined ? searchValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (searchValue === undefined) {
      setInternalValue(newValue);
    }
    onSearchChange?.(newValue);
  };

  const handleClear = () => {
    if (searchValue === undefined) {
      setInternalValue('');
    }
    onSearchChange?.('');
  };

  return (
    <div className={`${styles.toolbar} ${className}`}>
      {/*
       * Carbon Search — manages its own search icon, clear button, and
       * focus ring. labelText is required for a11y but visually hidden
       * by Carbon's default styling; placeholder is the visible hint text.
       */}
      <Search
        id="inbox-panel-search"
        labelText={searchPlaceholder}
        placeholder={searchPlaceholder}
        value={value}
        onChange={handleChange}
        onClear={handleClear}
        size="md"
      />

      {showFilter && (
        <Button
          kind="ghost"
          hasIconOnly
          renderIcon={Filter}
          iconDescription="Filter"
          onClick={onFilterClick}
          size="md"
          tooltipPosition="bottom"
          tooltipAlignment="end"
        />
      )}
    </div>
  );
}
