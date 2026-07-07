import { Tile } from '@carbon/react';
import styles from './HubSummaryPanel.module.scss';

/**
 * 2×2 stat panel shown in the HubView hero.
 * Accepts an array of `{ label, value }` stat objects (max 4).
 *
 * Props:
 *   stats – Array<{ label: string, value: string | number }>
 */
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
