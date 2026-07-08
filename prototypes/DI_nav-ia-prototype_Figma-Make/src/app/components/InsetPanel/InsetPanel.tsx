import { ReactNode } from 'react';
import styles from './InsetPanel.module.css';

export interface InsetPanelProps {
  /** Header section - typically InsetPanelHeader */
  header?: ReactNode;
  /** Optional toolbar section - typically InsetPanelToolbar */
  toolbar?: ReactNode;
  /** Main content area - scrollable by default */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * InsetPanel Component
 * 
 * A floating panel component with inbox-style structure that sits inset
 * within its parent container with 16px spacing on top, left, and bottom.
 * 
 * Follows Carbon Design System patterns and provides a consistent structure
 * for panels that need to float within a view (e.g., task model asset navigation).
 * 
 * Structure:
 * - Optional header section (title, actions)
 * - Optional toolbar section (search, filters, view controls)
 * - Scrollable content area
 * 
 * @example
 * <InsetPanel
 *   header={<InsetPanelHeader title="Artifacts" />}
 *   toolbar={<InsetPanelToolbar />}
 * >
 *   <TreeNavigation items={treeData} />
 * </InsetPanel>
 */
export default function InsetPanel({
  header,
  toolbar,
  children,
  className = '',
}: InsetPanelProps) {
  return (
    <div className={`${styles.insetPanel} ${className}`.trim()}>
      {header && <div className={styles.headerSection}>{header}</div>}
      {toolbar && <div className={styles.toolbarSection}>{toolbar}</div>}
      <div className={styles.contentSection}>{children}</div>
    </div>
  );
}
