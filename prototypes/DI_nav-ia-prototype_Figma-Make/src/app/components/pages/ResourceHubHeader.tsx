import { KeyboardEvent, RefObject } from 'react';
import { Filter, Search as SearchIcon } from '@carbon/icons-react';
import { IconButton, Search, SelectableTag } from '@carbon/react';
import styles from './ResourceHubHeader.module.css';

export interface ResourceHubHeaderTab {
  id: string;
  label: string;
}

interface ResourceHubHeaderProps {
  title: string;
  tabs: ResourceHubHeaderTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  placeholderTabs?: string[];

  searchExpanded: boolean;
  searchValue: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onSearchExpand: () => void;
  onSearchChange: (value: string) => void;
  onSearchBlur: () => void;
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;

  filtersActive: boolean;
  onFilterToggle: () => void;
}

export default function ResourceHubHeader({
  title,
  tabs,
  activeTabId,
  onTabChange,
  placeholderTabs = [],
  searchExpanded,
  searchValue,
  searchInputRef,
  onSearchExpand,
  onSearchChange,
  onSearchBlur,
  onSearchKeyDown,
  filtersActive,
  onFilterToggle,
}: ResourceHubHeaderProps) {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.progressiveBlur} aria-hidden>
        {/* Progressive blur implemented entirely in CSS using pseudo-elements */}
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.tabGroup} role="tablist" aria-label="Resource categories">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <SelectableTag
              key={tab.id}
              size="md"
              text={tab.label}
              selected={isActive}
              onChange={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
            />
          );
        })}
        {placeholderTabs.map((label) => (
          <SelectableTag
            key={`placeholder-${label}`}
            size="md"
            text={label}
            selected={false}
            disabled
          />
        ))}
      </div>

      <div className={styles.rightCluster}>
        <div
          className={`${styles.searchExpander} ${searchExpanded ? styles.searchExpanderOpen : ''} ${searchExpanded ? '' : styles.iconCircle}`.trim()}
        >
          {searchExpanded ? (
            <Search
              ref={searchInputRef}
              size="lg"
              labelText="Search resources"
              placeholder="Search resources"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onBlur={onSearchBlur}
              onKeyDown={onSearchKeyDown}
              closeButtonLabelText="Clear search"
            />
          ) : (
            <IconButton
              kind="ghost"
              label="Search resources"
              align="bottom"
              onClick={onSearchExpand}
            >
              <SearchIcon />
            </IconButton>
          )}
        </div>
        <div className={styles.iconCircle}>
          <IconButton
            kind="ghost"
            label={filtersActive ? 'Hide filters' : 'Show filters'}
            align="bottom-end"
            isSelected={filtersActive}
            onClick={onFilterToggle}
          >
            <Filter />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
