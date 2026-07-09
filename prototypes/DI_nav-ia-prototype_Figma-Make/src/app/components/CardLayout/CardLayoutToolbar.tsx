import { Select, SelectItem, Search } from "@carbon/react";
import { Grid, List } from "@carbon/icons-react";
import styles from "./CardLayoutToolbar.module.css";

export interface SortOption {
  value: string;
  label: string;
}

export interface CardLayoutToolbarProps {
  /** Array of sort options for the dropdown */
  sortOptions?: SortOption[];
  /** Currently selected sort value */
  sortValue?: string;
  /** Callback when sort selection changes */
  onSortChange?: (value: string) => void;
  /** Current search term */
  searchValue?: string;
  /** Callback when search input changes */
  onSearchChange?: (value: string) => void;
  /** Search input placeholder text */
  searchPlaceholder?: string;
  /** Current view mode */
  viewMode?: "grid" | "list";
  /** Callback when view mode changes */
  onViewModeChange?: (mode: "grid" | "list") => void;
  /** Hide sort section */
  hideSort?: boolean;
  /** Hide search section */
  hideSearch?: boolean;
  /** Hide view toggle */
  hideViewToggle?: boolean;
}

/**
 * CardLayoutToolbar Component
 *
 * Provides sorting, searching, and view mode controls for card layouts.
 * All sections are optional and can be hidden via props.
 *
 * @example
 * <CardLayoutToolbar
 *   sortOptions={[
 *     { value: "recent", label: "Recently updated" },
 *     { value: "name", label: "Name" }
 *   ]}
 *   sortValue={sortBy}
 *   onSortChange={setSortBy}
 *   searchValue={searchTerm}
 *   onSearchChange={setSearchTerm}
 *   viewMode={viewMode}
 *   onViewModeChange={setViewMode}
 * />
 */
export default function CardLayoutToolbar({
  sortOptions = [],
  sortValue = "",
  onSortChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
  viewMode = "grid",
  onViewModeChange,
  hideSort = false,
  hideSearch = false,
  hideViewToggle = false,
}: CardLayoutToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeft}>
        {/* Sort Section */}
        {!hideSort && sortOptions.length > 0 && (
          <div className={styles.sortSection}>
            <label className={styles.sortLabel}>Sort by:</label>
            <div className={styles.sortDropdown}>
              <Select
                id="card-layout-sort"
                labelText="Sort by:"
                hideLabel
                size="md"
                value={sortValue}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onSortChange?.(e.target.value)
                }
                className={styles.sortSelect}
              >
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    text={option.label}
                  />
                ))}
              </Select>
            </div>
          </div>
        )}

        {/* Search Section */}
        {!hideSearch && (
          <div className={styles.searchSection}>
            <Search
              id="card-layout-search"
              labelText="Search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange?.(e.target.value)
              }
              size="md"
              data-testid="toolbar-search-icon"
            />
          </div>
        )}
      </div>

      {/* View Toggle */}
      {!hideViewToggle && (
        <div className={styles.toolbarRight}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === "grid" ? styles.viewButtonActive : ""}`}
              onClick={() => onViewModeChange?.("grid")}
              aria-label="Grid view"
              type="button"
              data-testid="toolbar-grid-btn"
            >
              <Grid className={styles.viewIcon} />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === "list" ? styles.viewButtonActive : ""}`}
              onClick={() => onViewModeChange?.("list")}
              aria-label="List view"
              type="button"
              data-testid="toolbar-list-btn"
            >
              <List className={styles.viewIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
