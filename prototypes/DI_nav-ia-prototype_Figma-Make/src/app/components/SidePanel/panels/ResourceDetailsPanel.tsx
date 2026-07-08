import { Edit, Copy } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import styles from './ResourceDetailsPanel.module.css';
import { Resource } from '../../../data/resourceHubData';

interface ResourceDetailsPanelProps {
  resource: Resource;
}

export default function ResourceDetailsPanel({ resource }: ResourceDetailsPanelProps) {
  const handleEdit = () => {
    console.log('Edit resource:', resource.id);
  };

  const handleDuplicate = () => {
    console.log('Duplicate resource:', resource.id);
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.panel}>
      {/* Panel Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Resource Details</h2>
      </div>

      {/* Panel Content */}
      <div className={styles.content}>
        {/* Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Information</h3>
          
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <p className={styles.value}>{resource.name}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <p className={styles.value}>{resource.description}</p>
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>Tags</label>
              <div className={styles.tagsList}>
                {resource.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Metadata</h3>
          
          <div className={styles.field}>
            <label className={styles.label}>Provided by</label>
            <p className={styles.value}>
              {resource.providedBy || resource.provider}
              {resource.providerType && (
                <span className={styles.badge}>{resource.providerType}</span>
              )}
            </p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Version</label>
            <p className={styles.value}>{resource.version || '1.0.0'}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Last updated</label>
            <p className={styles.value}>
              {formatDate(resource.lastUpdated || resource.createdDate)}
            </p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Type</label>
            <p className={styles.value}>{resource.type}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <p className={styles.value}>{resource.category}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Industry</label>
            <p className={styles.value}>{resource.industry}</p>
          </div>
        </div>

        {/* Nested Assets */}
        {resource.nestedAssets && resource.nestedAssets.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Nested Assets/Types</h3>
            <div className={styles.list}>
              {resource.nestedAssets.map((asset, index) => (
                <div key={index} className={styles.listItem}>
                  {asset}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Used In */}
        {resource.usedIn && resource.usedIn.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Used In</h3>
            <div className={styles.list}>
              {resource.usedIn.map((project, index) => (
                <div key={index} className={styles.listItem}>
                  {project}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions (Admin/Owner) */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Actions</h3>
          <div className={styles.actions}>
            {/*
             * Phase 6B: replaced hand-rolled <button className={styles.actionButton}>
             * Carbon clones with @carbon/react Button (kind="ghost").
             * Width override applied via .actions :global(.cds--btn) in module CSS.
             */}
            <Button
              kind="ghost"
              renderIcon={Edit}
              iconDescription="Edit"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              kind="ghost"
              renderIcon={Copy}
              iconDescription="Duplicate"
              onClick={handleDuplicate}
            >
              Duplicate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}