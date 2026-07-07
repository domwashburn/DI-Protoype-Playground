import { Link } from '@carbon/react';
import { Recording } from '@carbon/icons-react';
import { PanelBlock } from '../../components/PanelBlock/index.js';
import { ResourceCard } from '../../components/ResourceCard/index.js';
import { StorageIcon } from '../../components/StorageIcon/index.js';
import styles from './DetailView.module.scss';

export function FilesSection({ prototypeId, storageLinks }) {
  return (
    <PanelBlock
      badge={<Recording size={24} />}
      description="Link Box or OneDrive folders for design reviews, research playback, and recordings."
      id="files"
      title="Meeting Recordings &amp; Files"
    >
      {storageLinks.length === 0 ? (
        <p className={styles.emptyNote}>
          No storage links yet. Add Box or OneDrive links to the registry entry.
        </p>
      ) : (
        <div className={styles.resourceGrid}>
          {storageLinks.map((resource) => (
            <ResourceCard
              heading={resource.label}
              icon={<StorageIcon provider={resource.provider} />}
              key={`${prototypeId}-${resource.label}`}
              subText={resource.provider}
            >
              <Link href={resource.href} target="_blank" rel="noreferrer">
                Open folder
              </Link>
            </ResourceCard>
          ))}
        </div>
      )}
    </PanelBlock>
  );
}
