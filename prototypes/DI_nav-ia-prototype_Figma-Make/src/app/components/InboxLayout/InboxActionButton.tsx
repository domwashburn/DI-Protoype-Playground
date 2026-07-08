import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from '@carbon/icons-react';
import styles from './InboxActionButton.module.css';
import * as IBMProducts from '@carbon/ibm-products';
import { Button } from '@carbon/react';

const Tearsheet = IBMProducts.Tearsheet;
const ActionSet = (IBMProducts as any).ActionSet;

// Fix for @carbon/ibm-products Tearsheet/ActionSet propTypes warning
if (Tearsheet && Tearsheet.propTypes) {
  Tearsheet.propTypes.actions = () => null;
}
if (ActionSet && ActionSet.propTypes) {
  ActionSet.propTypes.actions = () => null;
}

/**
 * InboxActionButton (Custom Carbon-compliant)
 *
 * A primary action button for inbox panel headers, supporting both
 * single-action and combo-button (split button with dropdown) patterns.
 *
 * Phase 3A: Replaced ButtonAdapter with @carbon/react Button.
 * Phase 3C: Removed dependency on root OverflowMenu.tsx.
 * Phase 3D: Replaced custom Tearsheet clone with @carbon/ibm-products Tearsheet.
 *
 * @param label - Button text
 * @param icon - Optional icon rendered inside the button
 * @param onClick - Click handler for single-action variant
 * @param menuItems - Dropdown menu items for combo variant
 * @param variant - 'primary' (single action) or 'combo' (split button with dropdown)
 * @param size - Carbon button size
 * @param fullWidth - Whether the button fills its container width
 */

interface ActionMenuItem {
  label: string;
  onClick: () => void;
}

interface InboxActionButtonProps {
  label: string;
  /** Must be a Carbon-compatible ComponentType (e.g. from @carbon/icons-react). */
  icon?: React.ComponentType;
  onClick?: () => void;
  menuItems?: ActionMenuItem[];
  variant?: 'primary' | 'combo';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  /** When true the button stretches to fill its container width. */
  fullWidth?: boolean;
}

/**
 * Inline combo-dropdown: portal-based menu positioned below trigger.
 * Replaces the old root-level OverflowMenu component.
 */
function ComboDropdown({
  isOpen,
  onClose,
  triggerRef,
  items,
  onItemClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  items: ActionMenuItem[];
  onItemClick: (item: ActionMenuItem) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  // Position the menu below the trigger
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, [isOpen, triggerRef]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', handler, true);
    return () => document.removeEventListener('mousedown', handler, true);
  }, [isOpen, onClose, triggerRef]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={menuRef}
      className={styles.comboDropdown}
      style={{
        position: 'fixed',
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        minWidth: `${pos.width}px`,
        zIndex: 9999,
      }}
      role="menu"
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={styles.comboDropdownItem}
          onClick={() => {
            onItemClick(item);
            onClose();
          }}
          role="menuitem"
          tabIndex={-1}
          type="button"
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>,
    document.body,
  );
}

export default function InboxActionButton({
  label,
  icon,
  onClick,
  menuItems,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: InboxActionButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTearsheetOpen, setIsTearsheetOpen] = useState(false);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const comboWrapperRef = useRef<HTMLDivElement>(null);

  const handleOpenTearsheet = useCallback(() => setIsTearsheetOpen(true), []);
  const handleCloseTearsheet = useCallback(() => setIsTearsheetOpen(false), []);

  const handlePrimaryAction = () => {
    console.log('Next clicked');
    handleCloseTearsheet();
  };

  const handleSecondaryAction = () => {
    console.log('Previous clicked');
  };

  if (variant === 'combo' && menuItems && menuItems.length > 0) {
    return (
      <>
        <div className={styles.panelAction} data-name="Action Container">
          <div ref={comboWrapperRef} className={styles.comboButtonWrapper}>
            <Button
              ref={primaryButtonRef}
              kind="primary"
              
              iconDescription={label}
              onClick={handleOpenTearsheet}
              size={size}
              className={styles.fullWidthButton}
            >
              {label}
            </Button>
            <Button
              ref={dropdownButtonRef}
              kind="primary"
              hasIconOnly
              renderIcon={ChevronDown}
              iconDescription="More options"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="More options"
              aria-expanded={isMenuOpen}
              size={size}
              className={styles.comboButtonChevron}
              tooltipPosition="bottom"
              tooltipAlignment="end"
            />
            <ComboDropdown
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              triggerRef={comboWrapperRef}
              items={menuItems}
              onItemClick={() => handleOpenTearsheet()}
            />
          </div>
        </div>

        {/* @carbon/ibm-products Tearsheet — Phase 3D replacement for custom clone */}
        <Tearsheet
          open={isTearsheetOpen}
          onClose={handleCloseTearsheet}
          title="Create New Item"
          description="This is a placeholder tearsheet for testing the three-action variant."
          actions={[
            {
              label: 'Cancel',
              onClick: handleCloseTearsheet,
              kind: 'ghost',
              key: 'tearsheet-cancel',
            },
            {
              label: 'Previous',
              onClick: handleSecondaryAction,
              kind: 'secondary',
              key: 'tearsheet-previous',
            },
            {
              label: 'Next',
              onClick: handlePrimaryAction,
              kind: 'primary',
              key: 'tearsheet-next',
            },
          ]}
        >
          {/*
           * Single element — no outer wrapper div. Carbon's TearsheetShell
           * PropTypes validator is stricter than `node` in some v2.x builds;
           * a single element (not nested divs) keeps the children shape simple.
           * Use <div> not <p> to avoid @layer base p { font-size } poisoning.
           */}
          <div style={{
            padding: 'var(--cds-spacing-05)',
            fontFamily: 'var(--cds-font-family)',
            fontSize: 'var(--cds-body-01-font-size)',
            color: 'var(--cds-text-primary)',
          }}>
            Tearsheet content will go here.
          </div>
        </Tearsheet>
      </>
    );
  }

  return (
    <div className={styles.panelAction}>
      <Button
        kind="primary"
        renderIcon={icon}
        iconDescription={label}
        onClick={onClick}
        size={size}
        className={fullWidth ? styles.fullWidthButton : undefined}
      >
        {label}
      </Button>
    </div>
  );
}