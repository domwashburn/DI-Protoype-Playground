import { Tile } from '@carbon/react';
import styles from './PanelBlock.module.scss';

export function PanelBlock({ id, title, description, badge, accent, children }) {
  return (
    <Tile className={`${styles.panelBlock}${accent ? ` ${styles.panelBlockAccent}` : ''}`} id={id}>
      <div className={styles.panelHeading}>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {badge ? <div className={styles.panelBadge}>{badge}</div> : null}
      </div>
      {children}
    </Tile>
  );
}
