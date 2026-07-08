import { ReactNode } from 'react';
import styles from './InsetContentArea.module.css';

export interface InsetContentAreaProps {
  toolbar?: ReactNode;
  children: ReactNode;
  flushBottom?: boolean;
}

export default function InsetContentArea({
  toolbar,
  children,
  flushBottom = true,
}: InsetContentAreaProps) {
  return (
    <div className={`${styles.shell} ${flushBottom ? styles.shellFlushBottom : ''}`.trim()}>
      <div className={styles.card}>
        {toolbar ? <div className={styles.toolbarSlot}>{toolbar}</div> : null}
        <div className={styles.contentSlot}>{children}</div>
      </div>
    </div>
  );
}
