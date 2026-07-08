import type { ComponentType } from 'react';
import { IconButton } from '@carbon/react';
import styles from './AssistantCustomHeader.module.css';

export interface IconBtnProps {
  icon: ComponentType<{ size?: number }>;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  /** Reserves layout space but renders hidden + non-interactive (e.g. to keep
   *  trailing action slots aligned across `mode` variants). */
  invisible?: boolean;
}

/**
 * Thin wrapper around Carbon's IconButton (ghost) so the header can keep its
 * `invisible` slot-keeper semantics and a consistent 16px icon.
 */
export function IconBtn({ icon: Icon, label, onClick, disabled, invisible }: IconBtnProps) {
  return (
    <span className={`${styles.iconBtnSlot} ${invisible ? styles.iconBtnInvisible : ''}`}>
      <IconButton
        label={label}
        kind="ghost"
        size="md"
        align="bottom"
        disabled={disabled || invisible}
        onClick={onClick}
      >
        <Icon size={16} />
      </IconButton>
    </span>
  );
}
