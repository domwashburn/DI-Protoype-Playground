import { Close, ContainerSoftware } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './PlaceholderPanelA.module.css';

/**
 * PlaceholderInnerPanel — non-expandable nested inset panel that lives inside
 * an expanded section sub-view. Reused by all three placeholder sub-views to
 * exercise the one-level-deep nesting end-to-end.
 */
export default function PlaceholderInnerPanel() {
  const { closeSubPanel } = usePanelManager();
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Inner panel</h2>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Close}
            iconDescription="Close inner panel"
            onClick={() => closeSubPanel()}
          />
        </div>
        <p className={styles.subtitle}>Nested inset panel (non-expandable)</p>
      </div>
      <div className={styles.content}>
        <div className={styles.placeholderContent}>
          <div className={styles.placeholderIcon}>
            <ContainerSoftware size={48} />
          </div>
          <h3 className={styles.placeholderTitle}>Inner panel</h3>
          <p className={styles.placeholderDescription}>
            Nested inset panels live one level deep inside an expanded
            section's sub-view. They can't be expanded themselves.
          </p>
        </div>
      </div>
    </div>
  );
}
