/**
 * SideRailHeader — Custom Carbon-compliant header for the SideRail
 *
 * Approved as a custom SideRail component per Guidelines.md.
 * Uses a custom toggle button (not Carbon Button — intentional deviation
 * from off-the-shelf Carbon patterns per guidelines) with @carbon/react
 * Tooltip (autoAlign) for collapsed-state hover label.
 */

import { Tooltip } from '@carbon/react';
import { SideRailHeaderProps } from './types';
import SideRailBranchDropdown from './SideRailBranchDropdown';
import styles from './SideRailHeader.module.css';

// Default panel toggle icon — matches the one used in the Automation Shell
function SidePanelOpenFilled() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
      <g>
        <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
        <path d="M14 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H14C14.55 14 15 13.55 15 13V3C15 2.45 14.55 2 14 2ZM14 13H6V8.5H11.1L9.3 10.3L10 11L13 8L10 5L9.3 5.7L11.1 7.5H6V3H14V13Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function SideRailHeader({
  isExpanded,
  onToggle,
  title,
  toggleIcon,
  branches,
  selectedBranch,
  onBranchChange,
  newChatAction
}: SideRailHeaderProps) {
  const isCollapsed = !isExpanded;

  const toggleButton = (
    <button
      className={styles.toggleButton}
      onClick={onToggle}
      aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
      type="button"
    >
      {toggleIcon || <SidePanelOpenFilled />}
    </button>
  );

  const newChatButton = newChatAction && (
    <button
      className={styles.toggleButton}
      onClick={newChatAction.onClick}
      aria-label={newChatAction.label}
      type="button"
    >
      {newChatAction.icon}
    </button>
  );

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {newChatAction ? (
          <Tooltip label={newChatAction.label} align="bottom" enterDelayMs={0} leaveDelayMs={0}>
            {newChatButton as React.ReactElement}
          </Tooltip>
        ) : isCollapsed ? (
          <Tooltip label="Expand navigation" align="right" autoAlign enterDelayMs={0} leaveDelayMs={0}>
            {toggleButton}
          </Tooltip>
        ) : (
          <Tooltip label="Collapse navigation" align="bottom" enterDelayMs={0} leaveDelayMs={0}>
            {toggleButton}
          </Tooltip>
        )}
        {branches && branches.length > 0 && selectedBranch && onBranchChange ? (
          <SideRailBranchDropdown
            branches={branches}
            selectedBranch={selectedBranch}
            onBranchChange={onBranchChange}
            isExpanded={isExpanded}
          />
        ) : (
          <span className={`${styles.headerTitle} ${isCollapsed ? styles.headerTitleHidden : ''}`}>{title}</span>
        )}
      </div>
    </div>
  );
}
