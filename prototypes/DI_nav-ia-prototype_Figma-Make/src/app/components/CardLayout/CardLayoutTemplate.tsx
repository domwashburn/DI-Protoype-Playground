import { ReactNode } from "react";
import { Grid, Column } from "@carbon/react";
import styles from "./CardLayoutTemplate.module.css";
import CardLayoutToolbar, { CardLayoutToolbarProps } from "./CardLayoutToolbar";
import CardGrid from "./CardGrid";

export interface CardLayoutTemplateProps {
  /** Toolbar configuration props */
  toolbarProps?: CardLayoutToolbarProps;
  /** Card components or custom content to display */
  children: ReactNode;
  /** Current view mode (passed to CardGrid) */
  viewMode?: "grid" | "list";
  /** Hide toolbar completely */
  hideToolbar?: boolean;
  /** Use custom container instead of CardGrid */
  customContainer?: boolean;
}

/**
 * CardLayoutTemplate Component
 * 
 * Main layout component that combines toolbar and card grid.
 * Provides complete card layout functionality out of the box.
 * Uses Carbon Grid/Column for structural layout (Phase 7A).
 * 
 * @example
 * // Full featured layout
 * <CardLayoutTemplate
 *   toolbarProps={{
 *     sortOptions: [{ value: "recent", label: "Recently updated" }],
 *     sortValue: sortBy,
 *     onSortChange: setSortBy,
 *     searchValue: searchTerm,
 *     onSearchChange: setSearchTerm,
 *     viewMode: viewMode,
 *     onViewModeChange: setViewMode
 *   }}
 *   viewMode={viewMode}
 * >
 *   <Card title="Card 1" />
 *   <Card title="Card 2" />
 * </CardLayoutTemplate>
 * 
 * @example
 * // Without toolbar, custom container
 * <CardLayoutTemplate hideToolbar customContainer>
 *   <div className={styles.customLayout}>
 *     <Card title="Card 1" />
 *   </div>
 * </CardLayoutTemplate>
 */
export default function CardLayoutTemplate({
  toolbarProps,
  children,
  viewMode = "grid",
  hideToolbar = false,
  customContainer = false
}: CardLayoutTemplateProps) {
  return (
    <div className={styles.cardLayoutTemplate}>
      {/* Toolbar */}
      {!hideToolbar && toolbarProps && (
        <Grid fullWidth>
          <Column lg={16} md={8} sm={4}>
            <CardLayoutToolbar {...toolbarProps} />
          </Column>
        </Grid>
      )}

      {/* Content */}
      <div className={styles.cardLayoutContent}>
        {customContainer ? (
          children
        ) : (
          <Grid fullWidth>
            <Column lg={16} md={8} sm={4}>
              <CardGrid viewMode={viewMode}>
                {children}
              </CardGrid>
            </Column>
          </Grid>
        )}
      </div>
    </div>
  );
}
