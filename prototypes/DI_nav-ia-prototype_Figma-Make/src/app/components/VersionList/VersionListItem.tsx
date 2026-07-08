import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Tag, 
  Add, 
  Edit, 
  TrashCan,
  Compare,
  Reset,
  View
} from '@carbon/icons-react';
import styles from './VersionListItem.module.css';
import type { Version } from '../../data/automations/branches-types';
import type { VersionAssetChanges } from '../../data/automations/version-asset-changes';

export interface VersionListItemProps {
  version: Version;
  assetChanges?: VersionAssetChanges;
  isLatest?: boolean;
  onViewDiff?: (assetId: string, versionId: string) => void;
  onCompareVersions?: (versionId: string) => void;
  onRollback?: (versionId: string) => void;
}

export default function VersionListItem({
  version,
  assetChanges,
  isLatest = false,
  onViewDiff,
  onCompareVersions,
  onRollback,
}: VersionListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Group changes by type
  const addedServices = assetChanges?.serviceChanges.filter(c => c.changeType === 'added') || [];
  const modifiedServices = assetChanges?.serviceChanges.filter(c => c.changeType === 'modified') || [];
  const removedServices = assetChanges?.serviceChanges.filter(c => c.changeType === 'removed') || [];
  
  const addedAssets = assetChanges?.assetChanges.filter(c => c.changeType === 'added') || [];
  const modifiedAssets = assetChanges?.assetChanges.filter(c => c.changeType === 'modified') || [];
  const removedAssets = assetChanges?.assetChanges.filter(c => c.changeType === 'removed') || [];

  const totalChanges = (assetChanges?.serviceChanges.length || 0) + (assetChanges?.assetChanges.length || 0);

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const isDeployed = version.snapshot && 'status' in version.snapshot && version.snapshot.status === 'deployed';

  return (
    <div className={`${styles.versionItem} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.versionHeader} onClick={handleToggle}>
        {/* Version Indicator */}
        <div className={`${styles.versionIndicator} ${isDeployed ? styles.deployed : styles.draft}`}>
          <Tag size={16} className={styles.versionIcon} />
        </div>

        {/* Version Content */}
        <div className={styles.versionContent}>
          <div className={styles.versionMainInfo}>
            <h3 className={styles.versionNumber}>v{version.version}</h3>
            {isLatest && (
              <span className={`${styles.versionBadge} ${styles.latest}`}>Latest</span>
            )}
            {version.deployedTo && version.deployedTo.length > 0 && (
              <>
                {version.deployedTo.map((deployment, index) => (
                  <span 
                    key={`${deployment.environment}-${index}`}
                    className={`${styles.versionBadge} ${styles.environment} ${styles[deployment.environment]}`}
                  >
                    {deployment.environment.charAt(0).toUpperCase() + deployment.environment.slice(1)}
                  </span>
                ))}
              </>
            )}
          </div>

          <p className={styles.versionMessage}>{version.message}</p>

          <div className={styles.versionMeta}>
            <span className={styles.versionAuthor}>{version.author}</span>
            <span className={styles.versionTimestamp}>{formatTimestamp(version.timestamp)}</span>
            
            {(version.filesChanged !== undefined || totalChanges > 0) && (
              <div className={styles.versionStats}>
                <div className={styles.versionStat}>
                  <span className={styles.statValue}>{totalChanges}</span>
                  <span>change{totalChanges !== 1 ? 's' : ''}</span>
                </div>
                {version.insertions !== undefined && version.insertions > 0 && (
                  <div className={styles.versionStat}>
                    <span className={`${styles.statValue} ${styles.additions}`}>
                      +{version.insertions}
                    </span>
                  </div>
                )}
                {version.deletions !== undefined && version.deletions > 0 && (
                  <div className={styles.versionStat}>
                    <span className={`${styles.statValue} ${styles.deletions}`}>
                      -{version.deletions}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expand Button */}
        <button
          className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.versionDetails}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Service Changes */}
            {assetChanges && assetChanges.serviceChanges.length > 0 && (
              <div className={styles.changesSection}>
                <h4 className={styles.sectionTitle}>Services</h4>
                <div className={styles.changesList}>
                  {addedServices.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.added}`}>
                          <Add size={16} />
                        </span>
                        Added ({addedServices.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {addedServices.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.added}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.serviceName}</div>
                              {change.details && (
                                <div className={styles.changeItemType}>{change.details}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {modifiedServices.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.modified}`}>
                          <Edit size={16} />
                        </span>
                        Modified ({modifiedServices.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {modifiedServices.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.modified}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.serviceName}</div>
                              {change.details && (
                                <div className={styles.changeItemType}>{change.details}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {removedServices.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.removed}`}>
                          <TrashCan size={16} />
                        </span>
                        Removed ({removedServices.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {removedServices.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.removed}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.serviceName}</div>
                              {change.details && (
                                <div className={styles.changeItemType}>{change.details}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Asset Changes */}
            {assetChanges && assetChanges.assetChanges.length > 0 && (
              <div className={styles.changesSection}>
                <h4 className={styles.sectionTitle}>Assets</h4>
                <div className={styles.changesList}>
                  {addedAssets.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.added}`}>
                          <Add size={16} />
                        </span>
                        Added ({addedAssets.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {addedAssets.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.added}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.assetName}</div>
                              <div className={styles.changeItemType}>
                                {change.assetType} • {change.path}
                              </div>
                            </div>
                            {onViewDiff && change.changeType !== 'added' && (
                              <div className={styles.changeItemActions}>
                                <button
                                  className={styles.viewDiffButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDiff(change.assetId, version.id);
                                  }}
                                >
                                  <View size={16} />
                                  View diff
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {modifiedAssets.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.modified}`}>
                          <Edit size={16} />
                        </span>
                        Modified ({modifiedAssets.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {modifiedAssets.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.modified}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.assetName}</div>
                              <div className={styles.changeItemType}>
                                {change.assetType} • {change.path}
                              </div>
                            </div>
                            {onViewDiff && (
                              <div className={styles.changeItemActions}>
                                <button
                                  className={styles.viewDiffButton}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDiff(change.assetId, version.id);
                                  }}
                                >
                                  <View size={16} />
                                  View diff
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {removedAssets.length > 0 && (
                    <div className={styles.changeGroup}>
                      <h5 className={styles.changeGroupTitle}>
                        <span className={`${styles.changeIcon} ${styles.removed}`}>
                          <TrashCan size={16} />
                        </span>
                        Removed ({removedAssets.length})
                      </h5>
                      <div className={styles.changeItems}>
                        {removedAssets.map((change) => (
                          <div key={change.id} className={`${styles.changeItem} ${styles.removed}`}>
                            <div className={styles.changeItemInfo}>
                              <div className={styles.changeItemName}>{change.assetName}</div>
                              <div className={styles.changeItemType}>
                                {change.assetType} • {change.path}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={styles.actionsSection}>
              {onCompareVersions && (
                <button
                  className={styles.actionButton}
                  onClick={() => onCompareVersions(version.id)}
                >
                  <Compare size={16} />
                  Compare with current
                </button>
              )}
              <button
                className={styles.actionButton}
                onClick={() => console.log('View version details', version.id)}
              >
                <View size={16} />
                View details
              </button>
              {onRollback && !isLatest && (
                <button
                  className={styles.actionButton}
                  onClick={() => onRollback(version.id)}
                >
                  <Reset size={16} />
                  Rollback to this version
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
