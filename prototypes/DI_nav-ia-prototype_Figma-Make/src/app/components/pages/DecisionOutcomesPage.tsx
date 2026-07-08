import styles from './DecisionOutcomesPage.module.css';

export default function DecisionOutcomesPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.placeholderContainer}>
          <div className={styles.icon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="24" width="8" height="16" rx="1" fill="var(--cds-icon-secondary)" />
              <rect x="20" y="16" width="8" height="24" rx="1" fill="var(--cds-icon-secondary)" />
              <rect x="32" y="8" width="8" height="32" rx="1" fill="var(--cds-icon-primary)" />
            </svg>
          </div>
          
          <h2 className={styles.title}>Decision Outcomes</h2>
          
          <p className={styles.description}>
            This is where you can view the outcomes of your deployed decision services. Monitor decision results, analyze patterns, and track the performance of your automations across different environments.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                  <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Environment Selection</div>
                <div className={styles.featureDescription}>
                  Choose which environments you want to monitor — Production, Staging, Development, or custom environments specific to your deployment strategy.
                </div>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                  <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Real-time Outcomes</div>
                <div className={styles.featureDescription}>
                  View decision results as they happen, including input data, decision paths taken, and final outcomes for each execution.
                </div>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                  <path d="M6 10L9 13L14 7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>Performance Analytics</div>
                <div className={styles.featureDescription}>
                  Analyze decision patterns, track success rates, and identify trends across your decision services to optimize automation performance.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" fill="none" />
                <path d="M8 8V11M8 5V5.5" stroke="var(--cds-icon-secondary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.infoText}>
              Decision outcomes data is available for decision services that have been deployed to at least one environment. Connect your environments in the Deploy automation section to begin tracking outcomes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
