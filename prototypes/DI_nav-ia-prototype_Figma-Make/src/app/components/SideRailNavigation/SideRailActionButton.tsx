/**
 * SideRailActionButton — Custom Carbon-compliant collapsible button
 *
 * Part of the SideRailNavigation family. Implements a tertiary button
 * that transitions between expanded (text + icon) and collapsed (icon-only)
 * states with smooth animation. This pattern deviates intentionally from
 * Carbon's standard Button — see Guidelines.md re: custom SideRail components.
 *
 * Uses @carbon/react Tooltip (autoAlign) for collapsed-state hover label.
 */

import { Tooltip } from '@carbon/react';
import { PanelActionProps } from './types';
import styles from './SideRailActionButton.module.css';

interface SideRailActionButtonProps extends PanelActionProps {
  isExpanded: boolean;
}

export default function SideRailActionButton({ onClick, icon, label, isExpanded }: SideRailActionButtonProps) {
  const isCollapsed = !isExpanded;

  const button = (
    <button
      type="button"
      className={`${styles.actionButton} ${isCollapsed ? styles.collapsed : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className={styles.iconWrapper}>{icon}</span>
      <span className={styles.textWrapper}>{label}</span>
    </button>
  );

  return (
    <div className={styles.actionButtonWrapper}>
      {isCollapsed ? (
        <Tooltip label={label} align="right" autoAlign enterDelayMs={0} leaveDelayMs={0}>
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </div>
  );
}
