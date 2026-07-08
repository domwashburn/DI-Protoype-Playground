import { Close } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../SidePanel';
import styles from './nodes/nodes.module.css';
import shellStyles from '../SidePanel/panels/ServiceAssetPanels.module.css';
import type { DmnNodeData } from './nodes';

interface NodeDetailsPanelProps {
  node: { id: string; type?: string; data: DmnNodeData };
}

const KIND_LABEL: Record<string, string> = {
  inputData: 'Input data',
  decision: 'Decision',
  businessKnowledge: 'Business knowledge',
};

export function NodeDetailsPanel({ node }: NodeDetailsPanelProps) {
  const { closePanel } = usePanelManager();
  const kind = node.type ? KIND_LABEL[node.type] ?? node.type : 'Node';
  const variant = node.data.variant && node.data.variant !== 'default'
    ? ` · ${node.data.variant}`
    : '';

  return (
    <div className={shellStyles.panel}>
      <div className={shellStyles.header}>
        <div className={shellStyles.titleRow}>
          <h2 className={shellStyles.title}>{node.data.name}</h2>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Close}
            iconDescription="Close panel"
            onClick={() => closePanel()}
          />
        </div>
        <p className={shellStyles.subtitle}>{kind}{variant}</p>
      </div>
      <div className={shellStyles.content}>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 'var(--cds-spacing-05)', rowGap: 'var(--cds-spacing-03)' }}>
          <dt className={styles.type}>Type</dt>
          <dd style={{ margin: 0 }}>{node.data.type}</dd>
          <dt className={styles.type}>ID</dt>
          <dd style={{ margin: 0 }}>{node.id}</dd>
          {node.data.output && (
            <>
              <dt className={styles.type}>Role</dt>
              <dd style={{ margin: 0 }}>Decision output</dd>
            </>
          )}
          {node.data.warning && (
            <>
              <dt className={styles.type}>Warning</dt>
              <dd style={{ margin: 0, color: 'var(--cds-support-error)' }}>{node.data.warning}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
