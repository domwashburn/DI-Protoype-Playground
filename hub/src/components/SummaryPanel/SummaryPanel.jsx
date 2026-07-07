import { Button } from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import { StatusTag } from '../StatusTag/index.js';
import styles from './SummaryPanel.module.scss';

export function SummaryPanel({ status, lastUpdated, launchReady, figmaSpecUrl }) {
  return (
    <div className={styles.summaryPanel}>
      <div className={styles.summaryPanelStatus}>
        <StatusTag status={status} />
        <span className={styles.summaryPanelStatusText}>{status}</span>
      </div>
      <dl className={styles.summaryPanelList}>
        <div>
          <dt className={styles.summaryPanelTerm}>Last updated</dt>
          <dd className={styles.summaryPanelDescription}>{lastUpdated}</dd>
        </div>
        <div>
          <dt className={styles.summaryPanelTerm}>Launch readiness</dt>
          <dd className={styles.summaryPanelDescription}>
            {launchReady ? 'Ready' : 'Missing command'}
          </dd>
        </div>
      </dl>
      <Button
        className={styles.summaryPanelButton}
        href={figmaSpecUrl}
        kind="tertiary"
        renderIcon={Launch}
        size="sm"
      >
        Figma
      </Button>
    </div>
  );
}
