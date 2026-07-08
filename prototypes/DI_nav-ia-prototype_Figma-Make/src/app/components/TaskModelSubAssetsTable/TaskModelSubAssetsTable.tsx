import { useMemo } from "react";
import type { Asset } from "../../data/automations";
import styles from "../DecisionAssetsTable/DecisionAssetsTable.module.css";

interface TaskModelSubAssetsTableProps {
  subAssets: Asset[];
  assetType: 'functions' | 'artifacts' | 'ruleflows';
}

type SubAssetRow = {
  id: string;
  name: string;
  type: string;
  folderPath: string;
  status: {
    state: "published" | "deployed";
    version: string;
  };
  createdBy: string;
};

// Status badge component
function StatusBadge({ status }: { status: SubAssetRow['status'] }) {
  return (
    <div className={styles.statusContainer}>
      <span className={`${styles.statusBadge} ${styles[status.state]}`}>
        {status.state}
      </span>
      <span className={styles.versionText}>{status.version}</span>
    </div>
  );
}

export default function TaskModelSubAssetsTable({ subAssets, assetType }: TaskModelSubAssetsTableProps) {
  // Transform sub-assets to table format
  const data = useMemo(() => {
    return subAssets.map(asset => {
      // Determine display type name
      const getTypeName = (type: string): string => {
        if (type === 'ruleflow') return 'Rule flow';
        if (type === 'function') return 'Function';
        if (type === 'decision-table') return 'Decision table';
        if (type === 'data-model') return 'Data model';
        if (type === 'rule') return 'Business rule';
        return type;
      };

      const row: SubAssetRow = {
        id: asset.id,
        name: asset.displayName || asset.name,
        type: getTypeName(asset.type),
        folderPath: asset.location || '/',
        status: {
          state: asset.status === 'deployed' ? 'deployed' : 'published',
          version: asset.version || 'v1.0'
        },
        createdBy: asset.createdBy || 'Unknown',
      };
      return row;
    });
  }, [subAssets]);

  if (data.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 'var(--cds-spacing-09)',
          textAlign: 'center',
          color: 'var(--cds-text-secondary)',
        }}
      >
        <p>No {assetType} found for this task model</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Type</th>
            <th className={styles.tableHeader}>Folder path</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Created by</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
              <td className={styles.tableCell}>
                <div className={styles.assetNameCell}>
                  <a 
                    href="#" 
                    className={styles.assetName}
                    onClick={(e) => e.preventDefault()}
                  >
                    {row.name}
                  </a>
                </div>
              </td>
              <td className={styles.tableCell}>
                <span>{row.type}</span>
              </td>
              <td className={styles.tableCell}>
                <span className={styles.assetType}>
                  {row.folderPath.split('/').filter(Boolean).map((folder, index, array) => (
                    <span key={index}>
                      <a href="#" className={styles.folderLink} onClick={(e) => e.preventDefault()}>
                        {folder}
                      </a>
                      {index < array.length - 1 && ' / '}
                    </span>
                  ))}
                </span>
              </td>
              <td className={styles.tableCell}>
                <StatusBadge status={row.status} />
              </td>
              <td className={styles.tableCell}>
                <span>{row.createdBy}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
