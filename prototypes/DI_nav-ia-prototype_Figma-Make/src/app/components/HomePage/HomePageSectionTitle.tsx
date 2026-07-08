import styles from './HomePageSectionTitle.module.css';

interface HomePageSectionTitleProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * HomePageSectionTitle
 * 
 * Title and subtitle area for home page sections.
 * Spans 4 columns in the 16-column grid.
 * 
 * Usage:
 * <HomePageSectionTitle 
 *   title="Recent decision automations"
 *   subtitle="Open decision automations that you created, modified, or viewed"
 * />
 */
export function HomePageSectionTitle({ 
  title, 
  subtitle,
  actions,
  className = '' 
}: HomePageSectionTitleProps) {
  return (
    <div className={`${styles.titleArea} ${className}`}>
      <div className={styles.titleGroup}>
        {typeof title === 'string' ? (
          <h3 className={styles.title}>{title}</h3>
        ) : (
          <div className={styles.title}>{title}</div>
        )}
        {subtitle && (
          typeof subtitle === 'string' ? (
            <p className={styles.subtitle}>{subtitle}</p>
          ) : (
            <div className={styles.subtitle}>{subtitle}</div>
          )
        )}
      </div>
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
}