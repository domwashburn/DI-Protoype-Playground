import { CheckmarkFilled, CloudApp, Locked, Time } from '@carbon/icons-react';
import type { EnvironmentConfig } from '../../data/automations/environments-data';
import styles from './EnvironmentsList.module.css';

interface EnvironmentsListProps {
  environments: EnvironmentConfig[];
}

export default function EnvironmentsList({ environments }: EnvironmentsListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Deployment Environments</h2>
          <p className={styles.subtitle}>
            Configure deployment targets: Development, Staging, Production environments
          </p>
        </div>
      </div>

      <div className={styles.environmentsList}>
        {environments.map((env) => (
          <div key={env.id} className={styles.environmentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <CloudApp size={24} className={styles.environmentIcon} />
                <div className={styles.cardHeaderInfo}>
                  <h3 className={styles.environmentName}>{env.name}</h3>
                  <span className={`${styles.statusBadge} ${styles[env.status]}`}>
                    {env.status === 'active' && <CheckmarkFilled size={16} />}
                    {env.status}
                  </span>
                </div>
              </div>
              <div className={styles.cardHeaderRight}>
                <span className={`${styles.typeBadge} ${styles[env.type]}`}>
                  {env.type.charAt(0).toUpperCase() + env.type.slice(1)}
                </span>
              </div>
            </div>

            <p className={styles.description}>{env.description}</p>

            <div className={styles.environmentDetails}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>URL</span>
                  <span className={styles.detailValue}>{env.url || 'Not configured'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Region</span>
                  <span className={styles.detailValue}>{env.region}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Instances</span>
                  <span className={styles.detailValue}>{env.instances}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Auto-deploy</span>
                  <span className={styles.detailValue}>
                    {env.autoDeployEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {env.requiresApproval && (
                <div className={styles.approvalSection}>
                  <div className={styles.approvalHeader}>
                    <Locked size={16} />
                    <span className={styles.approvalLabel}>Requires approval</span>
                  </div>
                  {env.approvers && env.approvers.length > 0 && (
                    <div className={styles.approversList}>
                      {env.approvers.map((approver, index) => (
                        <span key={index} className={styles.approverBadge}>
                          {approver}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {env.lastDeployment && (
                <div className={styles.lastDeployment}>
                  <div className={styles.deploymentHeader}>
                    <Time size={16} />
                    <span className={styles.deploymentLabel}>Last deployment</span>
                  </div>
                  <div className={styles.deploymentInfo}>
                    <div className={styles.deploymentRow}>
                      <span className={styles.deploymentKey}>Version:</span>
                      <span className={styles.deploymentValue}>v{env.lastDeployment.version}</span>
                    </div>
                    <div className={styles.deploymentRow}>
                      <span className={styles.deploymentKey}>Deployed by:</span>
                      <span className={styles.deploymentValue}>{env.lastDeployment.deployedBy}</span>
                    </div>
                    <div className={styles.deploymentRow}>
                      <span className={styles.deploymentKey}>When:</span>
                      <span className={styles.deploymentValue}>
                        {formatTimestamp(env.lastDeployment.timestamp)}
                      </span>
                    </div>
                    <div className={styles.deploymentRow}>
                      <span className={styles.deploymentKey}>Status:</span>
                      <span className={`${styles.deploymentStatus} ${styles[env.lastDeployment.status]}`}>
                        {env.lastDeployment.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.cardActions}>
              <button className={styles.actionButton} onClick={() => console.log('Configure', env.id)}>
                Configure environment
              </button>
              <button className={styles.actionButton} onClick={() => console.log('View deployments', env.id)}>
                View deployment history
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
