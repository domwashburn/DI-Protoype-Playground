import styles from './DecisionAutomationCard.module.css';
import svgPaths from '../../imports/svg-19c7tsrlrh';

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
                <div className={styles.arrowIcon}>
                  <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <rect fill="white" fillOpacity="0.01" height="16" style={{ mixBlendMode: "multiply" }} width="16" />
                      <path d={svgPaths.pfec3600} fill="#525252" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
