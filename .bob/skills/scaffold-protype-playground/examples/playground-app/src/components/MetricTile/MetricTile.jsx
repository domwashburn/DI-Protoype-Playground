import { Tile } from '@carbon/react';
import styles from './MetricTile.module.scss';

/**
 * Metric display tile: labelled value with optional helper text.
 * Wraps Carbon's Tile with a fixed three-row layout.
 */
export function MetricTile({ label, value, helperText }) {
  return (
    <Tile className={styles.metricTile}>
      <p className={styles.label}>{label}</p>
      <strong className={styles.value}>{value}</strong>
      {helperText ? <p className={styles.helper}>{helperText}</p> : null}
    </Tile>
  );
}
