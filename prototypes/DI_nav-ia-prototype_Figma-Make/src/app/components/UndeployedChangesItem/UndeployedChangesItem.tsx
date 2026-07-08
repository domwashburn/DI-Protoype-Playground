import { useState } from 'react';
import { ChevronRight, WarningAlt, Branch, Edit, Add, Subtract } from '@carbon/icons-react';
import type { Version } from '../../data/automations/branches-types';
import styles from './UndeployedChangesItem.module.css';

interface UndeployedChangesItemProps {
  lastDeployedVersion?: Version;
  publishedChanges: Version[];
  draftChanges: Version[];
  totalAssetsChanged: number;
  onViewDiff?: (assetId: string, versionId: string) => void;
  onCompareVersions?: (versionId: string) => void;
  onDeploy?: () => void;
}

export function UndeployedChangesItem({
  lastDeployedVersion,
  publishedChanges,
  draftChanges,
  totalAssetsChanged,
  onViewDiff,
  onCompareVersions,
  onDeploy,
}: UndeployedChangesItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalChanges = publishedChanges.length + draftChanges.length;
  const totalInsertions = [...publishedChanges, ...draftChanges].reduce(
    (sum, v) => sum + (v.insertions || 0),
    0
  );
  const totalDeletions = [...publishedChanges, ...draftChanges].reduce(
    (sum, v) => sum + (v.deletions || 0),
    0
  );

  if (totalChanges === 0) {
    return null;
  }

  return (
    <div className={styles.undeployedItem}>
      <div className={styles.itemHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <ChevronRight 
          size={16} 
          className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
        />
        
        <div className={styles.headerContent}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>
              <WarningAlt size={20} />
              Un-deployed Changes
            </h3>
            <span className={`${styles.badge} ${styles.undeployed}`}>
              Staging
            </span>
          </div>

          <div className={styles.metadata}>
            <span className={styles.metaItem}>
              <Branch size={16} />
              {publishedChanges.length} published, {draftChanges.length} draft
            </span>
            {lastDeployedVersion && (
              <span className={styles.metaItem}>
                Since {lastDeployedVersion.version}
              </span>
            )}
          </div>

          <div className={styles.stats}>
            <span className={styles.statItem}>
              <Edit size={16} className={styles.statIcon} />
              {totalAssetsChanged} {totalAssetsChanged === 1 ? 'file' : 'files'}
            </span>
            <span className={styles.statItem} style={{ color: 'var(--cds-support-success)' }}>
              <Add size={16} />
              +{totalInsertions}
            </span>
            <span className={styles.statItem} style={{ color: 'var(--cds-support-error)' }}>
              <Subtract size={16} />
              -{totalDeletions}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          {/* Published Changes (Main Branch) */}
          {publishedChanges.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <span className={`${styles.statusBadge} ${styles.published}`}>
                  Published
                </span>
                {publishedChanges.length} {publishedChanges.length === 1 ? 'change' : 'changes'} on main branch
              </h4>
              <div className={styles.changesList}>
                {publishedChanges.map((version) => (
                  <div key={version.id} className={styles.changeItem}>
                    <div className={styles.changeHeader}>
                      <div className={styles.changeInfo}>
                        <span className={styles.changeVersion}>{version.version}</span>
                        <span className={styles.changeBranch}>main</span>
                      </div>
                      <span className={styles.changeAuthor}>
                        {version.author}
                      </span>
                    </div>
                    <p className={styles.changeMessage}>{version.message}</p>
                    <div className={styles.changeStats}>
                      <span className={styles.changeStat}>
                        <Edit size={14} />
                        {version.filesChanged} {version.filesChanged === 1 ? 'file' : 'files'}
                      </span>
                      <span className={styles.changeStat} style={{ color: 'var(--cds-support-success)' }}>
                        +{version.insertions}
                      </span>
                      <span className={styles.changeStat} style={{ color: 'var(--cds-support-error)' }}>
                        -{version.deletions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {publishedChanges.length > 0 && draftChanges.length > 0 && (
            <div className={styles.divider} />
          )}

          {/* Draft Changes (Feature Branches) */}
          {draftChanges.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>
                <span className={`${styles.statusBadge} ${styles.draft}`}>
                  Draft
                </span>
                {draftChanges.length} {draftChanges.length === 1 ? 'change' : 'changes'} in feature branches
              </h4>
              <div className={styles.changesList}>
                {draftChanges.map((version) => (
                  <div key={version.id} className={styles.changeItem}>
                    <div className={styles.changeHeader}>
                      <div className={styles.changeInfo}>
                        <span className={styles.changeVersion}>{version.version}</span>
                        <span className={styles.changeBranch}>
                          {version.branchId.replace('branch-', '')}
                        </span>
                      </div>
                      <span className={styles.changeAuthor}>
                        {version.author}
                      </span>
                    </div>
                    <p className={styles.changeMessage}>{version.message}</p>
                    <div className={styles.changeStats}>
                      <span className={styles.changeStat}>
                        <Edit size={14} />
                        {version.filesChanged} {version.filesChanged === 1 ? 'file' : 'files'}
                      </span>
                      <span className={styles.changeStat} style={{ color: 'var(--cds-support-success)' }}>
                        +{version.insertions}
                      </span>
                      <span className={styles.changeStat} style={{ color: 'var(--cds-support-error)' }}>
                        -{version.deletions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={styles.divider} />
          <div className={styles.actionsRow}>
            {onDeploy && publishedChanges.length > 0 && (
              <button 
                className={`${styles.actionButton} ${styles.primary}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeploy();
                }}
              >
                Deploy published changes
              </button>
            )}
            {onCompareVersions && lastDeployedVersion && (
              <button 
                className={styles.actionButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareVersions(lastDeployedVersion.id);
                }}
              >
                Compare with {lastDeployedVersion.version}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
