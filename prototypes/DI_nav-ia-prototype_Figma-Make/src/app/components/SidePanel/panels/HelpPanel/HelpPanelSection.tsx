import React, { ReactNode } from 'react';
import { Toggletip, ToggletipButton, ToggletipContent } from '@carbon/react';
import { Help } from '@carbon/icons-react';
import styles from './HelpPanel.module.css';

export interface HelpPanelSectionProps {
  title: ReactNode;
  children: ReactNode;
  tooltipText?: ReactNode;
  actionText?: ReactNode;
  onActionClick?: () => void;
}

export function HelpPanelSection({ title, children, tooltipText, actionText, onActionClick }: HelpPanelSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrapper}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {tooltipText && (
            <Toggletip align="bottom">
              <ToggletipButton label="Show information">
                <Help size={16} />
              </ToggletipButton>
              <ToggletipContent>
                <p>{tooltipText}</p>
              </ToggletipContent>
            </Toggletip>
          )}
        </div>
        {actionText && (
          <button type="button" className={styles.sectionAction} onClick={onActionClick}>
            {actionText}
          </button>
        )}
      </div>
      <div className={styles.linkList}>{children}</div>
    </div>
  );
}
