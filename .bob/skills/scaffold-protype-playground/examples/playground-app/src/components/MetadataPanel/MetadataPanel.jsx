import styles from './MetadataPanel.module.scss';

/**
 * Labelled metadata DL block rendered inside the DetailView aside.
 *
 * Props:
 *   heading – panel heading string (default: 'Metadata')
 *   items   – Array<{ term: string, description: string | React.ReactNode }>
 */
export function MetadataPanel({ heading = 'Metadata', items }) {
  return (
    <div className={styles.metadataPanel}>
      <h2>{heading}</h2>
      <dl className={styles.metadataPanelList}>
        {items.map(({ term, description }) => (
          <div key={term}>
            <dt className={styles.metadataPanelTerm}>{term}</dt>
            <dd className={styles.metadataPanelDescription}>{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
