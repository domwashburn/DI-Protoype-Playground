/**
 * ContentSwitcher - Temporary Carbon Design System Component
 * 
 * TODO: Replace this custom implementation with the official @carbon/react ContentSwitcher
 * when the package is installed. Import from '@carbon/react' instead.
 * 
 * This is a temporary recreation of Carbon's ContentSwitcher component
 * following Carbon Design System v11 patterns.
 * 
 * Reference: https://carbondesignsystem.com/components/content-switcher/usage/
 */

import { ReactNode } from 'react';
import styles from './ContentSwitcher.module.css';

export interface SwitchProps {
  /** The text content of the switch button */
  children: ReactNode;
  /** Optional name for the switch */
  name?: string;
  /** Whether this switch is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export function Switch({ children, name, selected = false, onClick }: SwitchProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={`${styles.switch} ${selected ? styles.switchSelected : ''}`}
      onClick={onClick}
    >
      <span className={styles.switchText}>{children}</span>
    </button>
  );
}

export interface ContentSwitcherProps {
  /** Array of Switch components */
  children: ReactNode;
  /** Index of the selected switch */
  selectedIndex?: number;
  /** Callback when selection changes */
  onChange?: (data: { index: number }) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

export function ContentSwitcher({
  children,
  selectedIndex = 0,
  onChange,
  size = 'md',
  className = ''
}: ContentSwitcherProps) {
  const handleSwitchClick = (index: number) => {
    if (onChange) {
      onChange({ index });
    }
  };

  return (
    <div
      role="tablist"
      className={`${styles.contentSwitcher} ${styles[`size-${size}`]} ${className}`}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <Switch
            key={index}
            selected={index === selectedIndex}
            onClick={() => handleSwitchClick(index)}
          >
            {typeof child === 'object' && child && 'props' in child ? child.props.children : child}
          </Switch>
        ))
      ) : (
        children
      )}
    </div>
  );
}
