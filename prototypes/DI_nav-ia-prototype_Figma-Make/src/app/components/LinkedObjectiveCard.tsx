import styles from './LinkedObjectiveCard.module.css';
import type { BusinessObjective } from '../data/objectives/types';

/**
 * LinkedObjectiveCard Component
 * Displays a business objective card with its details and status
 * Used in automation views to show linked objectives
 */
interface LinkedObjectiveCardProps {
  objective: BusinessObjective;
  onClick?: (objectiveId: string) => void;
}

export default function LinkedObjectiveCard({ objective, onClick }: LinkedObjectiveCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(objective.id);
    }
  };

  return (
    <div 
      className={styles.objectiveCard} 
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Card Inner Container */}
      <div className={styles.cardInner}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.headerContent}>
            <h3 className={styles.cardTitle}>{objective.name}</h3>
            <p className={styles.cardStatus}>{objective.status.replace('-', ' ')}</p>
          </div>
          <div className={styles.headerBadges}>
            <span className={`${styles.priorityBadge} ${styles[`priority-${objective.priority}`]}`}>
              {objective.priority}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className={styles.cardContent}>
          <p className={styles.cardDescription}>{objective.description}</p>
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progress</span>
              <span className={styles.progressValue}>{objective.progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${objective.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card Metadata */}
        <div className={styles.cardMetadata}>
          <div className={styles.metadataColumn}>
            <p className={styles.metadataLabel}>Category</p>
            <p className={styles.metadataValue}>{objective.category.replace('-', ' ')}</p>
          </div>
          <div className={styles.metadataColumn}>
            <p className={styles.metadataLabel}>Owner</p>
            <p className={styles.metadataValue}>{objective.owner}</p>
          </div>
        </div>

        {/* Card Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.divider} />
          <div className={styles.footerContent}>
            <div className={styles.footerMeta}>
              <span className={styles.footerLabel}>Target:</span>
              <span className={styles.footerValue}>
                {new Date(objective.targetDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                }).replace(/\//g, '-')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}