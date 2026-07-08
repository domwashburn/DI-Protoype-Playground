import React, { ReactNode } from 'react';
import styles from './PlaceholderContent.module.css';

interface PlaceholderContentProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'card' | 'section';
}

export default function PlaceholderContent({
  title,
  description,
  icon,
  size = 'medium',
  variant = 'default',
}: PlaceholderContentProps) {
  const classNames = [
    styles.placeholderContent,
    size !== 'medium' && styles[`size-${size}`],
    variant !== 'default' && styles[`variant-${variant}`],
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {icon && <div className={styles.placeholderIcon}>{icon}</div>}
      <h2 className={styles.placeholderTitle}>{title}</h2>
      {description && (
        <p className={styles.placeholderDescription}>{description}</p>
      )}
    </div>
  );
}
