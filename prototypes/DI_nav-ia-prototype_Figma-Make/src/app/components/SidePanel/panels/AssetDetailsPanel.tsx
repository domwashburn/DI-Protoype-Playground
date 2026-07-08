/**
 * AssetDetailsPanel
 * Phase 6B: close button + action buttons replaced with @carbon/react Button.
 */
import { Close } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './AssetDetailsPanel.module.css';

export type AssetStatus = {
  state: 'published' | 'deployed';
  version: string;
};

export interface AssetData {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  drafts: number;
  createdBy: string;
  folderPath?: string;
  isNested?: boolean;
}

interface AssetDetailsPanelProps {
  asset: AssetData;
  onOpenAsset?: (assetId: string, assetName: string, assetType: string) => void;
}

export default function AssetDetailsPanel({ asset, onOpenAsset }: AssetDetailsPanelProps) {
  const { closePanel } = usePanelManager();

  const navigableTypes = ['Decision Model', 'Task Model', 'Predictive Model', 'Optimization Model', 'GenAI Node'];
  const canNavigate = navigableTypes.includes(asset.type);

  const handleOpenAsset = () => {
    if (onOpenAsset && canNavigate) {
      onOpenAsset(asset.id, asset.name, asset.type);
      closePanel();
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{asset.name}</h2>
          <p className={styles.subtitle}>{asset.type}</p>
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
          <h3 className={styles.sectionTitle}>Asset Information</h3>
          
          <div className={styles.field}>
            <label className={styles.label}>Asset ID</label>
            <div className={styles.value}>{asset.id}</div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Asset Type</label>
            <div className={styles.value}>{asset.type}</div>
          </div>

          {asset.folderPath && (
            <div className={styles.field}>
              <label className={styles.label}>Folder Path</label>
              <div className={styles.value}>{asset.folderPath}</div>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Status & Version</h3>
          
          <div className={styles.field}>
            <label className={styles.label}>Current Status</label>
            <div className={styles.statusValue}>
              <span className={`${styles.statusBadge} ${styles[asset.status.state]}`}>
                {asset.status.state}
              </span>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Version</label>
            <div className={styles.value}>{asset.status.version}</div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Draft Versions</label>
            <div className={styles.value}>{asset.drafts}</div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Metadata</h3>
          
          <div className={styles.field}>
            <label className={styles.label}>Created By</label>
            <div className={styles.value}>{asset.createdBy}</div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Last Modified</label>
            <div className={styles.value}>2 days ago</div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Dependencies</label>
            <div className={styles.value}>3 assets</div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Actions</h3>
          
          {/* Full-width action buttons — .actionButtons scopes the width override */}
          <div className={styles.actionButtons}>
            {canNavigate && onOpenAsset && (
              <Button kind="primary" size="md" onClick={handleOpenAsset}>
                Open asset
              </Button>
            )}
            <Button kind="secondary" size="md">Edit Asset</Button>
            <Button kind="secondary" size="md">Create Draft</Button>
            <Button kind="secondary" size="md">View History</Button>
            <Button kind="secondary" size="md">Deploy</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
