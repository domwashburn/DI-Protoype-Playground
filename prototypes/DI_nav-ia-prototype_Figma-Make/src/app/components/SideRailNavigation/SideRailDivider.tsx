import { SideRailDividerProps } from './types';
import styles from './SideRailDivider.module.css';

export default function SideRailDivider({ isExpanded, label, showWhenCollapsed = true }: SideRailDividerProps) {
  // If showWhenCollapsed is false and not expanded, don't render anything
  if (!showWhenCollapsed && !isExpanded) {
    return null;
  }

  if (label) {
    return (
      <div className={styles.labeledDivider} role="separator">
        {isExpanded ? (
          <div className={styles.sectionLabel}>
            <span className={styles.labelText}>{label}</span>
          </div>
        ) : (
          <div className={styles.dividerContent}>
            <div className={styles.dividerLine}></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.divider} role="separator">
      <div className={styles.dividerContent}>
        <div className={styles.dividerLine}></div>
      </div>
    </div>
  );
}