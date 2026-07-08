import { ReactNode } from "react";
import styles from "./CardGrid.module.css";

export interface CardGridProps {
  /** Card components or other content to display in grid */
  children: ReactNode;
  /** View mode: 'grid' or 'list' */
  viewMode?: "grid" | "list";
  /** Additional CSS class name */
  className?: string;
}

/**
 * CardGrid Component
 * 
 * Responsive card container using container queries.
 * Automatically adjusts columns based on available width:
 *   - <672px:  1 column
 *   - 672px+:  2 columns
 *   - 1056px+: 3 columns
 *   - 1584px+: 4 columns
 * 
 * Can be switched to list view for single-column layout.
 * All responsive logic is self-contained in CSS Module (Phase 7A).
 * 
 * @example
 * <CardGrid viewMode="grid">
 *   <Card title="Card 1" />
 *   <Card title="Card 2" />
 *   <Card title="Card 3" />
 * </CardGrid>
 */
export default function CardGrid({
  children,
  viewMode = "grid",
  className = ""
}: CardGridProps) {
  return (
    <div className={styles.cardGridContext}>
      <div 
        className={`${styles.cardGrid} ${viewMode === "list" ? styles.listView : ""} ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
