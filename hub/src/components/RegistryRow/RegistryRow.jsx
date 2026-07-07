import { Button } from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import { StatusTag } from '../StatusTag/index.js';
import styles from './RegistryRow.module.scss';

export function RegistryRow({ prototype, launch, PrototypeIcon, onSelectPrototype }) {
  return (
    <article className={styles.registryRow} role="listitem">
      <div className={styles.registryRowIdentity}>
        <div className={styles.registryRowIcon}>
          <PrototypeIcon size={24} />
        </div>
        <div className={styles.registryRowCopy}>
          <StatusTag status={prototype.statusTag} />
          <h3>{prototype.title}</h3>
          <p>{prototype.description}</p>
          <code className={styles.registryRowCode}>{prototype.rootLaunchCommand}</code>
        </div>
      </div>

      <div className={styles.registryRowEvidence} aria-label={`${prototype.title} evidence`}>
        <div>
          <strong className={styles.registryRowEvidenceValue}>{prototype.docs?.length ?? 0}</strong>
          <span className={styles.registryRowEvidenceLabel}>Docs</span>
        </div>
        <div>
          <strong className={styles.registryRowEvidenceValue}>{prototype.storageLinks?.length ?? 0}</strong>
          <span className={styles.registryRowEvidenceLabel}>Files</span>
        </div>
        <div>
          <strong className={styles.registryRowEvidenceValue}>{prototype.context?.status ?? 'Stubbed'}</strong>
          <span className={styles.registryRowEvidenceLabel}>Context</span>
        </div>
        <div>
          <strong className={styles.registryRowEvidenceValue}>{launch.canLaunch ? 'Ready' : 'Missing'}</strong>
          <span className={styles.registryRowEvidenceLabel}>Launch</span>
        </div>
      </div>

      <div className={styles.registryRowMeta}>
        <span className={styles.registryRowMetaLabel}>Owner</span>
        <strong className={styles.registryRowMetaValue}>{prototype.designOwner}</strong>
        <span className={styles.registryRowMetaLabel}>Updated {prototype.lastUpdated}</span>
      </div>

      <div className={styles.registryRowActions}>
        <Button
          className={styles.registryActionButton}
          kind="tertiary"
          onClick={() => onSelectPrototype(prototype.id)}
          renderIcon={Launch}
          size="sm"
        >
          Details
        </Button>
      </div>
    </article>
  );
}
