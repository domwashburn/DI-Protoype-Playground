/**
 * SideRailNavItem — Custom Carbon-compliant navigation item
 *
 * Approved as a custom SideRail component per Guidelines.md.
 * Uses @carbon/react Tooltip (with autoAlign for position: fixed portal
 * that escapes the rail's overflow: hidden) in collapsed state only.
 * Icon position is identical in both states — the 48px icon container
 * (spacing-05 left + 16px icon + spacing-05 right) fills the 48px
 * collapsed rail naturally, so no collapsed-specific layout overrides needed.
 */

import { Tooltip } from "@carbon/react";
import { SideRailNavItemProps } from "./types";
import styles from "./SideRailNavItem.module.css";

export default function SideRailNavItem({
  item,
  isExpanded,
  isActive,
  onClick,
  onCollapseRail,
}: SideRailNavItemProps) {
  const isCollapsed = !isExpanded;

  const handleClick = () => {
    // Collapse rail if it's currently expanded
    if (isExpanded && onCollapseRail) {
      onCollapseRail();
    }

    if (item.onClick) {
      item.onClick();
    }
    onClick();
  };

  const button = (
    <button
      className={`${styles.navItemButton} ${isActive ? styles.active : ""} ${item.isChild ? styles.child : ""}`}
      onClick={handleClick}
      aria-label={item.label}
      type="button"
    >
      <div className={styles.iconContainer}>{item.icon}</div>
      <span
        className={`${styles.navText} ${isCollapsed ? styles.navTextHidden : ""}`}
      >
        {item.label}
      </span>
    </button>
  );

  return (
    <div className={styles.navItem}>
      {isCollapsed ? (
        <Tooltip
          label={item.label}
          enterDelayMs={0}
          leaveDelayMs={0}
          align="right"
          autoAlign
        >
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </div>
  );
}