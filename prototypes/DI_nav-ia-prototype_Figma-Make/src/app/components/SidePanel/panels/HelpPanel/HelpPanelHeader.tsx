import React, { ReactNode } from 'react';
import { Button } from '@carbon/react';
import { Close, ArrowLeft } from '@carbon/icons-react';
import styles from './HelpPanel.module.css';

export interface HelpPanelHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  onClose: () => void;
  onBack?: () => void;
  backLabel?: string;
  condensed?: boolean;
}

export function HelpPanelHeader({
  title,
  subtitle,
  onClose,
  onBack,
  backLabel = 'Back',
  condensed = false,
}: HelpPanelHeaderProps) {
  return (
    <div className={`${styles.header} ${condensed ? styles.headerCondensed : ''}`}>
      <div className={`${styles.titleRow} ${condensed ? styles.titleRowCondensed : ''}`}>
        {onBack && (
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={ArrowLeft}
            iconDescription={backLabel}
            onClick={onBack}
            className={styles.backButton}
          />
        )}
        <h2 
          className={`${styles.title} ${condensed ? styles.titleCondensed : ''}`}
          style={{ transition: 'all 240ms cubic-bezier(0.4, 0.14, 0.3, 1)' }}
        >
          {title}
        </h2>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Close}
          iconDescription="Close panel"
          onClick={onClose}
        />
      </div>
      <div className={`${styles.subtitleWrapper} ${condensed ? styles.subtitleHidden : ''}`}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
