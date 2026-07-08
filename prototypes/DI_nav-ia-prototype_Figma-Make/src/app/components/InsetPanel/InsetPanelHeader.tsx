import { ReactNode } from 'react';
import styles from './InsetPanelHeader.module.css';

export interface InsetPanelHeaderProps {
  /** Header title */
  title: string;
  /** Optional action button(s) on the right */
  actions?: ReactNode;
}

/**
 * InsetPanelHeader Component
 * 
 * Header section for InsetPanel with title and optional actions.
 * Follows Carbon Design System spacing and typography patterns.
 * 
 * @example
 * <InsetPanelHeader
 *   title="Artifacts"
 *   actions={<button>Add</button>}
 * />
 */
export default function InsetPanelHeader({ title, actions }: InsetPanelHeaderProps) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
