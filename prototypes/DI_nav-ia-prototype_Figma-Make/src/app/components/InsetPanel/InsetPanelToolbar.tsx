import { ReactNode } from 'react';
import styles from './InsetPanelToolbar.module.css';

export interface InsetPanelToolbarProps {
  /** Optional search/filter section */
  search?: ReactNode;
  /** Optional view controls (e.g., grid/list toggle) */
  viewControls?: ReactNode;
  /** Custom toolbar content */
  children?: ReactNode;
}

/**
 * InsetPanelToolbar Component
 * 
 * Optional toolbar section for InsetPanel with search, filters, and view controls.
 * Follows Carbon Design System patterns for toolbar layouts.
 * 
 * @example
 * <InsetPanelToolbar
 *   search={<input placeholder="Search..." />}
 *   viewControls={<ViewModeButtons />}
 * />
 */
export default function InsetPanelToolbar({
  search,
  viewControls,
  children,
}: InsetPanelToolbarProps) {
  if (children) {
    return <div className={styles.toolbar}>{children}</div>;
  }

  return (
    <div className={styles.toolbar}>
      {search && <div className={styles.searchSection}>{search}</div>}
      {viewControls && <div className={styles.viewControls}>{viewControls}</div>}
    </div>
  );
}
