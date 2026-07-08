import { useMemo } from 'react';
import styles from './VersionList.module.css';
import VersionListItem from './VersionListItem';
import { UndeployedChangesItem } from '../UndeployedChangesItem';
import type { Version } from '../../data/automations/branches-types';
import { getVersionAssetChanges } from '../../data/automations/version-asset-changes';

export interface VersionListProps {
  versions: Version[];
  emptyMessage?: string;
  showUndeployedChanges?: boolean;
  undeployedData?: {
    lastDeployedVersion?: Version;
    publishedChanges: Version[];
    draftChanges: Version[];
    totalAssetsChanged: number;
  };
  onViewDiff?: (assetId: string, versionId: string) => void;
  onCompareVersions?: (versionId: string) => void;
  onRollback?: (versionId: string) => void;
  onDeploy?: () => void;
}

export default function VersionList({
  versions,
  emptyMessage = 'No versions to display',
  showUndeployedChanges = false,
  undeployedData,
  onViewDiff,
  onCompareVersions,
  onRollback,
  onDeploy,
}: VersionListProps) {
  // Sort versions by semantic version number (newest first)
  const sortedVersions = useMemo(() => {
    return [...versions].sort((a, b) => {
      const aVer = a.semanticVersion;
      const bVer = b.semanticVersion;
      
      // Compare major version
      if (bVer.major !== aVer.major) {
        return bVer.major - aVer.major;
      }
      
      // Compare minor version
      if (bVer.minor !== aVer.minor) {
        return bVer.minor - aVer.minor;
      }
      
      // Compare patch version
      if (bVer.patch !== aVer.patch) {
        return bVer.patch - aVer.patch;
      }
      
      // If all are equal, compare by timestamp as fallback
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [versions]);

  // "Latest" badge only applies to production versions
  const latestVersionId = sortedVersions.find(v => 
    v.deployedTo?.some(deployment => deployment.environment === 'production')
  )?.id || null;

  if (versions.length === 0 && (!showUndeployedChanges || !undeployedData)) {
    return (
      <div className={styles.versionListContainer}>
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.versionListContainer}>
      <div className={styles.versionList}>
        {/* Show undeployed changes at the top */}
        {showUndeployedChanges && undeployedData && (
          <UndeployedChangesItem
            lastDeployedVersion={undeployedData.lastDeployedVersion}
            publishedChanges={undeployedData.publishedChanges}
            draftChanges={undeployedData.draftChanges}
            totalAssetsChanged={undeployedData.totalAssetsChanged}
            onViewDiff={onViewDiff}
            onCompareVersions={onCompareVersions}
            onDeploy={onDeploy}
          />
        )}

        {/* Show version list */}
        {sortedVersions.map((version) => {
          const assetChanges = getVersionAssetChanges(version.id);
          const isLatest = version.id === latestVersionId;

          return (
            <VersionListItem
              key={version.id}
              version={version}
              assetChanges={assetChanges}
              isLatest={isLatest}
              onViewDiff={onViewDiff}
              onCompareVersions={onCompareVersions}
              onRollback={onRollback}
            />
          );
        })}
      </div>
    </div>
  );
}
