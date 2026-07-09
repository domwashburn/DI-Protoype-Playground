import styles from './DecisionAutomationCard.module.css';
import { ArrowRight } from '@carbon/icons-react';

export interface DecisionAutomationCardProps {
  name: string;
  description: string;
  serviceCount: string;
  onClick?: () => void;
}

export function DecisionAutomationCard({
  name,
  description,
  serviceCount,
  onClick
}: DecisionAutomationCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          {/* Primary content */}
          <div className={styles.primaryContent}>
            <p className={styles.cardTitle}>{name}</p>
            <p className={styles.cardDescription}>{description}</p>
          </div>

          {/* Secondary content */}
          <div className={styles.secondaryContent}>
            <div className={styles.secondaryInner}>
              <div className={styles.secondaryContentBox}>
                <p className={styles.serviceCount}>{serviceCount}</p>
                <div className={styles.arrowIcon} data-testid="card-arrow-icon">
                  <ArrowRight size={16} fill="#525252" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
