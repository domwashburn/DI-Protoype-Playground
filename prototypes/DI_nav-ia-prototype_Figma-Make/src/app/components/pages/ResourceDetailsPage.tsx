import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ResourceDetailHeader from './ResourceDetailHeader';
import { InsetLayout, usePanelManager, SampleSidePanel } from '../SidePanel';
import styles from './ResourceDetailsPage.module.css';
import { loadResourceHubData, Resource } from '../../data/resourceHubData';

function ResourceInfoPanel({ resource }: { resource: Resource }) {
  return (
    <SampleSidePanel title="Resource information">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cds-spacing-05)' }}>
        {resource.description && (
          <div>
            <p style={{ margin: '0 0 var(--cds-spacing-02)', fontFamily: 'var(--cds-font-family)', fontSize: 'var(--cds-label-01-font-size)', color: 'var(--cds-text-secondary)' }}>Description</p>
            <p style={{ margin: 0, fontFamily: 'var(--cds-font-family)', fontSize: 'var(--cds-body-01-font-size)', color: 'var(--cds-text-primary)' }}>{resource.description}</p>
          </div>
        )}
        {(
          [
            { label: 'Type', value: resource.type },
            { label: 'Category', value: resource.category },
            { label: 'Industry', value: resource.industry },
            { label: 'Provider', value: resource.provider },
          ] as const
        ).filter(({ value }) => value).map(({ label, value }) => (
          <div key={label}>
            <p style={{ margin: '0 0 var(--cds-spacing-02)', fontFamily: 'var(--cds-font-family)', fontSize: 'var(--cds-label-01-font-size)', color: 'var(--cds-text-secondary)' }}>{label}</p>
            <p style={{ margin: 0, fontFamily: 'var(--cds-font-family)', fontSize: 'var(--cds-body-01-font-size)', color: 'var(--cds-text-primary)' }}>{value}</p>
          </div>
        ))}
        {resource.tags && resource.tags.length > 0 && (
          <div>
            <p style={{ margin: '0 0 var(--cds-spacing-02)', fontFamily: 'var(--cds-font-family)', fontSize: 'var(--cds-label-01-font-size)', color: 'var(--cds-text-secondary)' }}>Tags</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--cds-spacing-02)' }}>
              {resource.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SampleSidePanel>
  );
}

export default function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId?: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const { openPanel, isPanelOpen, currentMainPanel } = usePanelManager();

  const infoActive = isPanelOpen && currentMainPanel?.id === 'resource-info';

  const handleInfoClick = () => {
    if (!resource) return;
    openPanel({
      content: <ResourceInfoPanel resource={resource} />,
      level: 'section',
      pattern: 'inset',
      width: 'standard',
      id: 'resource-info',
    });
  };

  useEffect(() => {
    async function loadResource() {
      if (!resourceId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await loadResourceHubData();
        const foundResource = data.resources.find(r => r.id === resourceId);
        setResource(foundResource || null);
      } catch (error) {
        console.error('Failed to load resource:', error);
      } finally {
        setLoading(false);
      }
    }
    loadResource();
  }, [resourceId]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <ResourceDetailHeader title="Loading…" infoActive={false} onInfoClick={() => {}} />
        <InsetLayout>
          <div className={styles.pageContent}>
            <div className={styles.placeholderSection}>
              <h2 className={styles.placeholderTitle}>Loading...</h2>
            </div>
          </div>
        </InsetLayout>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className={styles.pageContainer}>
        <ResourceDetailHeader title="Resource not found" infoActive={false} onInfoClick={() => {}} />
        <InsetLayout>
          <div className={styles.pageContent}>
            <div className={styles.placeholderSection}>
              <h2 className={styles.placeholderTitle}>Resource not found</h2>
              <p className={styles.placeholderText}>The requested resource could not be found.</p>
            </div>
          </div>
        </InsetLayout>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <ResourceDetailHeader
        title={resource.name}
        infoActive={infoActive}
        onInfoClick={handleInfoClick}
      />

      <InsetLayout side="right">
        <div className={styles.pageContent}>
          <div className={styles.pageHeader}>
            <p className={styles.pageDescription}>{resource.description}</p>
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <h3 className={styles.tagsLabel}>Tags</h3>
              <div className={styles.tagsContainer}>
                {resource.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.tileGridContext}>
            <div className={styles.tileGrid}>
              <div className={styles.tile}>
                <p className={styles.tileLabel}>Type</p>
                <p className={styles.tileValue}>{resource.type}</p>
              </div>
              <div className={styles.tile}>
                <p className={styles.tileLabel}>Category</p>
                <p className={styles.tileValue}>{resource.category}</p>
              </div>
              <div className={styles.tile}>
                <p className={styles.tileLabel}>Industry</p>
                <p className={styles.tileValue}>{resource.industry}</p>
              </div>
              <div className={styles.tile}>
                <p className={styles.tileLabel}>Provider</p>
                <p className={styles.tileValue}>{resource.provider}</p>
              </div>
            </div>
          </div>

          <div className={styles.fullWidthTile}>
            <h2 className={styles.tileTitle}>Resource Content</h2>
            <p className={styles.tileDescription}>
              Detailed resource content and configuration will be displayed here.
            </p>
          </div>

          {(resource.nestedAssets && resource.nestedAssets.length > 0) || (resource.usedIn && resource.usedIn.length > 0) ? (
            <div className={styles.tileGridContext}>
              <div className={styles.tileGrid}>
                {resource.nestedAssets && resource.nestedAssets.length > 0 && (
                  <div className={styles.tile}>
                    <h3 className={styles.tileTitle}>Nested Assets</h3>
                    <p className={styles.tileDescription}>
                      This resource contains {resource.nestedAssets.length} nested asset(s).
                    </p>
                    <div className={styles.tileList}>
                      {resource.nestedAssets.slice(0, 3).map((asset, index) => (
                        <div key={index} className={styles.tileListItem}>{asset}</div>
                      ))}
                      {resource.nestedAssets.length > 3 && (
                        <p className={styles.tileListMore}>+{resource.nestedAssets.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )}
                {resource.usedIn && resource.usedIn.length > 0 && (
                  <div className={styles.tile}>
                    <h3 className={styles.tileTitle}>Used In</h3>
                    <p className={styles.tileDescription}>
                      This resource is used in {resource.usedIn.length} project(s).
                    </p>
                    <div className={styles.tileList}>
                      {resource.usedIn.slice(0, 3).map((project, index) => (
                        <div key={index} className={styles.tileListItem}>{project}</div>
                      ))}
                      {resource.usedIn.length > 3 && (
                        <p className={styles.tileListMore}>+{resource.usedIn.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <div className={styles.tileGridContext}>
            <div className={styles.tileGrid}>
              <div className={styles.tile}>
                <h3 className={styles.tileTitle}>Configuration</h3>
                <p className={styles.tileDescription}>Resource configuration settings will appear here</p>
              </div>
              <div className={styles.tile}>
                <h3 className={styles.tileTitle}>Documentation</h3>
                <p className={styles.tileDescription}>Resource documentation and guides will appear here</p>
              </div>
              <div className={styles.tile}>
                <h3 className={styles.tileTitle}>Dependencies</h3>
                <p className={styles.tileDescription}>Resource dependencies will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </InsetLayout>
    </div>
  );
}
