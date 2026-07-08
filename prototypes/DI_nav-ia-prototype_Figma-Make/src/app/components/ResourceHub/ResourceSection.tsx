import { ReactNode } from "react";
import styles from "./ResourceSection.module.css";

export interface ResourceSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Card components to display */
  children: ReactNode;
}

/**
 * ResourceSection - Section container for grouped resources
 * Groups related resources with a title and optional description.
 * Uses CSS subgrid for proper alignment within parent grid.
 * 
 * Phase 7A: Removed cds--col wrapper divs. Children use
 * grid-column: 1 / -1 directly via CSS Module classes.
 */
export function ResourceSection({
  title,
  description,
  children
}: ResourceSectionProps) {
  return (
    <div className={styles.resourceSection}>
      {/* Header — spans full width via CSS */}
      <div className={styles.sectionHeaderRow}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {description && <p className={styles.sectionDescription}>{description}</p>}
        </div>
      </div>
      
      {/* Content — spans full width via CSS */}
      <div className={styles.sectionContentRow}>
        <div className={styles.sectionContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ResourceSection;
