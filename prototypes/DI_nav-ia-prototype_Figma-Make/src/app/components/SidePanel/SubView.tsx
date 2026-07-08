import { ReactNode } from 'react';
import { Close, OpenPanelLeft, OpenPanelFilledLeft } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { usePanelManager } from './PanelManager';
import styles from './SubView.module.css';

/**
 * SubView — header + body for the right-hand area of an expanded section
 * inset panel. The nested inset panel (one level deep) is rendered by
 * `InsetLayout` as a sibling of this component, so the inner panel sits
 * beside the sub-view exactly the way an outer inset panel sits beside the
 * page content.
 *
 * Header chrome:
 *  - Optional `actions` slot for callers (Edit / Save / etc).
 *  - Always-present `Attach` ⇄ `Detach` toggle that links/unlinks this
 *    sub-view from the parent panel rail (visual treatment only).
 *  - `Close` button → `collapseSectionPanel()`.
 */

export interface SubViewProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function SubView({ title, actions, children }: SubViewProps) {
  const {
    collapseSectionPanel,
    isSubViewAttached,
    toggleSubViewAttachment,
  } = usePanelManager();

  return (
    <div
      className={styles.subView}
      role="region"
      aria-label={title}
      data-attached={isSubViewAttached ? 'true' : 'false'}
    >
      <div className={styles.subViewHeader}>
        <h2 className={styles.subViewTitle}>{title}</h2>
        <div className={styles.subViewActions}>
          {actions}
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={isSubViewAttached ? OpenPanelFilledLeft : OpenPanelLeft}
            iconDescription={
              isSubViewAttached ? 'Detach sub-view' : 'Attach sub-view'
            }
            onClick={() => toggleSubViewAttachment()}
            aria-pressed={isSubViewAttached}
          />
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Close}
            iconDescription="Close sub-view"
            onClick={() => collapseSectionPanel()}
          />
        </div>
      </div>
      <div className={styles.subViewBody}>{children}</div>
    </div>
  );
}
