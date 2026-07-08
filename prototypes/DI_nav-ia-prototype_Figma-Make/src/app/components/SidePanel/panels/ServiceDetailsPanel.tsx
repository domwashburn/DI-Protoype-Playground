/**
 * ServiceDetailsPanel
 * Phase 6B: close button + footer buttons replaced with @carbon/react Button.
 */
import { Close } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './ServiceDetailsPanel.module.css';

interface ServiceDetailsPanelProps {
  serviceId?: string;
  serviceName?: string;
}

export default function ServiceDetailsPanel({ 
  serviceId = 'service-01',
  serviceName = 'Decision Service' 
}: ServiceDetailsPanelProps) {
  const { closePanel } = usePanelManager();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Service Details</h2>
          <p className={styles.subtitle}>{serviceName}</p>
        </div>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Close}
          iconDescription="Close panel"
          onClick={closePanel}
        />
      </div>
      
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Configuration</h3>
          <div className={styles.field}>
            <label className={styles.label}>Service ID</label>
            <p className={styles.value}>{serviceId}</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <p className={styles.value}>Published</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Version</label>
            <p className={styles.value}>v2.3.1</p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Endpoints</h3>
          <div className={styles.field}>
            <label className={styles.label}>Production</label>
            <p className={styles.valueCode}>https://api.example.com/v1/decisions</p>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Staging</label>
            <p className={styles.valueCode}>https://api-staging.example.com/v1/decisions</p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Metrics</h3>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <p className={styles.metricValue}>2,847</p>
              <p className={styles.metricLabel}>Requests (24h)</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricValue}>99.8%</p>
              <p className={styles.metricLabel}>Uptime</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricValue}>142ms</p>
              <p className={styles.metricLabel}>Avg Response</p>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button kind="ghost" size="md">View logs</Button>
        <Button kind="primary" size="md">Configure</Button>
      </div>
    </div>
  );
}
