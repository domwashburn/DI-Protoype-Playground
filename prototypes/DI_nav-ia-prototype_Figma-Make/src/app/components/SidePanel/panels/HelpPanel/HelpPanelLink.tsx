import React, { ReactNode } from 'react';
import styles from './HelpPanel.module.css';

export interface HelpPanelLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: ReactNode;
  description?: ReactNode;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  contained?: boolean;
  size?: 'sm' | 'md';
}

export function HelpPanelLink({
  title,
  description,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  contained = false,
  size = 'md',
  className,
  ...rest
}: HelpPanelLinkProps) {
  let cssClass = styles.link;
  if (contained) {
    cssClass += ` ${styles.linkContained}`;
  }
  if (description) {
    cssClass += ` ${styles.linkWithDescription}`;
  }

  return (
    <button className={className ? `${cssClass} ${className}` : cssClass} {...rest}>
      {LeftIcon && <LeftIcon className={styles.linkIconLeft} size={16} />}
      <div className={styles.linkContent}>
        <span className={`${styles.linkTitle} ${size === 'sm' ? styles.linkTitleTruncated : ''}`}>{title}</span>
        {description && <span className={styles.linkDescription}>{description}</span>}
      </div>
      {RightIcon && <RightIcon className={styles.linkIconRight} size={16} />}
    </button>
  );
}
