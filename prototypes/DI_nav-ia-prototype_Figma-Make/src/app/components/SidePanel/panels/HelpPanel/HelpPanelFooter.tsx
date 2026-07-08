import React, { ReactNode } from 'react';
import styles from './HelpPanel.module.css';

export interface HelpPanelFooterProps {
  text: ReactNode;
}

export function HelpPanelFooter({ text }: HelpPanelFooterProps) {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>{text}</p>
    </div>
  );
}
