/**
 * PlaceholderPanelA - Section-level placeholder panel
 * Triggered from PageHeader panel trigger button 1
 * Phase 6B: close button replaced with @carbon/react Button (ghost/icon-only/sm)
 */

import { Close, Cube, Maximize, Minimize } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from '../PanelManager';
import styles from './PlaceholderPanelA.module.css';

export default function PlaceholderPanelA() {
  const {
    closePanel,
    isSectionExpanded,
    expandSectionPanel,
    collapseSectionPanel,
  } = usePanelManager();

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Panel A</h2>
          <div style={{ display: 'flex', gap: 'var(--cds-spacing-02)' }}>
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={isSectionExpanded ? Minimize : Maximize}
              iconDescription={isSectionExpanded ? 'Collapse' : 'Expand'}
              onClick={() =>
                isSectionExpanded ? collapseSectionPanel() : expandSectionPanel()
              }
            />
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              renderIcon={Close}
              iconDescription="Close panel"
              onClick={() => closePanel()}
            />
          </div>
        </div>
        <p className={styles.subtitle}>
          Section-level placeholder panel content
        </p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.placeholderContent}>
          <div className={styles.placeholderIcon}>
            <Cube size={48} />
          </div>
          <h3 className={styles.placeholderTitle}>Placeholder Panel A</h3>
          <p className={styles.placeholderDescription}>
            This is a section-level panel that can be replaced with actual content.
            It opens from the first icon button in the PageHeader component.
          </p>
        </div>
      </div>
    </div>
  );
}
