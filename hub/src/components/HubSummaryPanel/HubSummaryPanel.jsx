import { Tile } from '@carbon/react';
import styles from './HubSummaryPanel.module.scss';

export function HubSummaryPanel({ stats }) {
  return (
    <Tile className={styles.hubSummaryPanel}>
      {stats.map(({ label, value }) => (
        <div key={label}>
          <span className={styles.hubSummaryLabel}>{label}</span>
          <strong className={styles.hubSummaryValue}>{value}</strong>
        </div>
      ))}
    </Tile>
  );
}
