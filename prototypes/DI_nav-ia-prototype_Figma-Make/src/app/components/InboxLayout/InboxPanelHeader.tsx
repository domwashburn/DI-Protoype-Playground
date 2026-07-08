import React, { ReactNode } from 'react';
import styles from './InboxPanelHeader.module.css';

/**
 * InboxPanelHeader (Custom Carbon-compliant)
 *
 * Recreated from Carbon Design System panel header patterns.
 * Reference: https://carbondesignsystem.com/patterns/overview/
 *
 * Displays a heading-03 title in the inbox panel sidebar.
 * Compose with InboxActionButton and InboxPanelToolbar for a complete panel header.
 *
 * @param title - The panel heading text
 * @param actions - Optional ReactNode rendered to the right of the title
 * @param className - Additional CSS class names
 */
interface InboxPanelHeaderProps {
  title: string;
  actions?: ReactNode;
  className?: string;
}

export default function InboxPanelHeader({
  title,
  actions,
  className = '',
}: InboxPanelHeaderProps) {
  return (
    <div className={`${styles.panelHeader} ${className}`}>
      <div className={styles.panelHeaderContent}>
        {/* Use <div> instead of <p> to avoid @layer base p font-size poisoning */}
        <div className={styles.panelTitle}>{title}</div>
        {actions && <div className={styles.panelActions}>{actions}</div>}
      </div>
    </div>
  );
}