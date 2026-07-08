import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { usePanelManager, AssetDetailsPanel } from "../SidePanel";
import type { AssetData } from "../SidePanel";
import { useAssets } from "../../data/hooks";
import styles from "../DecisionAssetsTable/DecisionAssetsTable.module.css";

// Type definitions
type DataModelStatus = {
  state: "published" | "deployed";
  version: string;
};

type DataModelRow = {
  id: string;
  name: string;
  description?: string;
  status: DataModelStatus;
  drafts: number;
  createdBy: string;
};

// Status badge component
function StatusBadge({ status }: { status: DataModelStatus }) {
  return (
    <div className={styles.statusContainer}>
      <span className={`${styles.statusBadge} ${styles[status.state]}`}>
        {status.state}
      </span>
      <span className={styles.versionText}>{status.version}</span>
    </div>
  );
}

// Main table component
interface DataModelsTableProps {
  automationId: string;
  serviceId?: string;
}

export default function DataModelsTable({ automationId, serviceId }: DataModelsTableProps) {
  const { openPanel } = usePanelManager();
  
  // Get data models from centralized data
  const { assets: allAssets } = useAssets({ serviceId });
  
  // Transform data models to table format
  const data = useMemo(() => {
    if (!serviceId || !allAssets.length) {
      return [];
    }
    
    // Filter to only data-model type assets
    const dataModels = allAssets.filter(asset => asset.type === 'data-model');
    
    return dataModels.map(asset => {
      const dataModelRow: DataModelRow = {
        id: asset.id,
        name: asset.displayName || asset.name,
        description: asset.description,
        status: { 
          state: asset.status === 'deployed' ? 'deployed' : 'published', 
          version: asset.version || 'v1.0' 
        },
        drafts: 0, // Would need to be calculated from versions/branches in real implementation
        createdBy: asset.createdBy || 'Unknown',
      };
      return dataModelRow;
    });
  }, [allAssets, serviceId]);

  const handleRowClick = (dataModel: DataModelRow) => {
    const assetData: AssetData = {
      id: dataModel.id,
      name: dataModel.name,
      type: 'Data Model',
      status: dataModel.status,
      drafts: dataModel.drafts,
      createdBy: dataModel.createdBy,
      isNested: false,
    };

    openPanel({
      id: `data-model-${dataModel.id}`,
      content: <AssetDetailsPanel asset={assetData} />,
      level: 'page',
      pattern: 'overlay',
      width: 'standard',
    });
  };

  const columns: ColumnDef<DataModelRow>[] = [
    {
      accessorKey: "name",
      header: "Data model name",
      cell: (info) => {
        const name = info.getValue() as string;
        const description = info.row.original.description;
        
        return (
          <div className={styles.assetNameCell}>
            <span className={styles.assetName}>
              {name}
            </span>
            {description && (
              <span className={styles.assetType}>{description}</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue() as DataModelStatus} />,
    },
    {
      accessorKey: "drafts",
      header: "Drafts",
      cell: (info) => <span>{info.getValue() as number}</span>,
    },
    {
      accessorKey: "createdBy",
      header: "Created by",
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show empty state if no data models
  if (data.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.emptyState}>
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 32 32" 
            fill="none" 
            style={{ marginBottom: 'var(--spacing-05)', opacity: 0.4 }}
          >
            <rect x="8" y="6" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="11" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="11" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="11" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <p className={styles.emptyStateTitle}>
            No data models yet
          </p>
          <p className={styles.emptyStateDescription}>
            Create a data model to define the structure of data used in this decision service.
          </p>
          <button 
            className={styles.emptyStateButton}
            onClick={() => console.log('Create data model clicked')}
          >
            Create data model
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead className={styles.tableHead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={styles.tableHeader}
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tableBody}>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr 
                key={row.id} 
                className={styles.tableRow}
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
