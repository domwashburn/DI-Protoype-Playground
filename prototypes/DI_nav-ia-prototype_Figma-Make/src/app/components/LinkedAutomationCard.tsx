import styles from './LinkedAutomationCard.module.css';

/**
 * LinkedAutomationCard Component
 * Displays a decision automation card with its details and status
 * Used in objective views to show linked automations
 */
interface LinkedAutomationCardProps {
  automation: any;
  onClick?: (automationId: string) => void;
}

export default function LinkedAutomationCard({ automation, onClick }: LinkedAutomationCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(automation.id);
    }
  };

  return (
    <div 
      className={styles.automationCard} 
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Card Inner Container */}
      <div className={styles.cardInner}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <h3 className={styles.cardTitle}>{automation.displayName}</h3>
            <p className={styles.cardStatus}>{automation.status}</p>
          </div>
          {automation.creationMethod === 'ai-generated' && (
            <div className={styles.aiGeneratedBadge}>
              <span className={styles.badgeText}>AI Generated</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className={styles.cardContent}>
          <p className={styles.cardDescription}>{automation.description}</p>
        </div>

        {/* Card Metadata */}
        <div className={styles.cardMetadata}>
          <div className={styles.metadataColumn}>
            <p className={styles.metadataLabel}>Last updated date</p>
            <p className={styles.metadataValue}>
              {new Date(automation.lastModified).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
              }).replace(/\//g, '-')}
            </p>
          </div>
          <div className={styles.metadataColumn}>
            <p className={styles.metadataLabel}>Services</p>
            <p className={styles.metadataValue}>{automation.serviceIds?.length || 0}</p>
          </div>
        </div>

        {/* Card Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.divider} />
          <div className={styles.footerContent}>
            {/* Optional: Add tags here if available */}
          </div>
        </div>
      </div>
    </div>
  );
}