import { useState, useMemo, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  ExpandedState,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { ChevronRight } from "@carbon/icons-react";
import { usePanelManager, AssetDetailsPanel } from "./SidePanel";
import type { AssetData } from "./SidePanel";
import { useAssets, useSubAssets } from "../data/hooks";
import type { Asset } from "../data/automations";
import styles from "./DecisionAssetsTable.module.css";

// Type definitions
type DecisionAssetStatus = {
  state: "published" | "deployed";
  version: string;
};

type TaskModelSubRow = {
  id: string;
  name: string;
  type: string;
  folderPath: string;
  status: DecisionAssetStatus;
  drafts: number;
  createdBy: string;
};

type DecisionAssetRow = {
  id: string;
  type: string;
  name: string;
  status: DecisionAssetStatus;
  drafts: number;
  createdBy: string;
  isExpandable: boolean;
  subRows?: TaskModelSubRow[];
};

// Sample data
const sampleData: DecisionAssetRow[] = [
  {
    id: "1",
    type: "Decision Model",
    name: "Credit Risk Assessment Model",
    status: { state: "published", version: "v2.3" },
    drafts: 2,
    createdBy: "Sarah Chen",
    isExpandable: false,
  },
  {
    id: "2",
    type: "Task Model",
    name: "Loan Approval Workflow",
    status: { state: "deployed", version: "v1.5" },
    drafts: 1,
    createdBy: "Michael Torres",
    isExpandable: true,
    subRows: [
      {
        id: "2-1",
        name: "Application Validation Rules",
        type: "Rule flow",
        folderPath: "/workflows/loan-approval/validation",
        status: { state: "published", version: "v1.5" },
        drafts: 0,
        createdBy: "Michael Torres",
      },
      {
        id: "2-2",
        name: "Credit Score Decision Table",
        type: "Decision table",
        folderPath: "/workflows/loan-approval/scoring",
        status: { state: "published", version: "v1.5" },
        drafts: 1,
        createdBy: "Sarah Chen",
      },
      {
        id: "2-3",
        name: "Risk Assessment Business Rules",
        type: "Business rule",
        folderPath: "/workflows/loan-approval/risk",
        status: { state: "deployed", version: "v1.5" },
        drafts: 0,
        createdBy: "Michael Torres",
      },
      {
        id: "2-4",
        name: "Loan Parameters Variable Set",
        type: "Variable set",
        folderPath: "/workflows/loan-approval/variables",
        status: { state: "published", version: "v1.5" },
        drafts: 0,
        createdBy: "Jessica Wu",
      },
    ],
  },
  {
    id: "3",
    type: "Predictive Model",
    name: "Customer Churn Prediction",
    status: { state: "published", version: "v3.1" },
    drafts: 0,
    createdBy: "David Kim",
    isExpandable: false,
  },
  {
    id: "4",
    type: "Optimization Model",
    name: "Resource Allocation Optimizer",
    status: { state: "deployed", version: "v2.0" },
    drafts: 3,
    createdBy: "Emma Rodriguez",
    isExpandable: false,
  },
  {
    id: "5",
    type: "GenAI Node",
    name: "Contract Analysis Assistant",
    status: { state: "published", version: "v1.0" },
    drafts: 1,
    createdBy: "James Liu",
    isExpandable: false,
  },
  {
    id: "6",
    type: "Task Model",
    name: "Claims Processing Workflow",
    status: { state: "published", version: "v2.1" },
    drafts: 2,
    createdBy: "Anna Kowalski",
    isExpandable: true,
    subRows: [
      {
        id: "6-1",
        name: "Claims Validation Rule Flow",
        type: "Rule flow",
        folderPath: "/workflows/claims/validation",
        status: { state: "published", version: "v2.1" },
        drafts: 0,
        createdBy: "Anna Kowalski",
      },
      {
        id: "6-2",
        name: "Fraud Detection Decision Table",
        type: "Decision table",
        folderPath: "/workflows/claims/fraud",
        status: { state: "deployed", version: "v2.1" },
        drafts: 1,
        createdBy: "David Kim",
      },
      {
        id: "6-3",
        name: "Payment Calculation Rules",
        type: "Business rule",
        folderPath: "/workflows/claims/payment",
        status: { state: "published", version: "v2.1" },
        drafts: 1,
        createdBy: "Anna Kowalski",
      },
      {
        id: "6-4",
        name: "Claims Data Variable Set",
        type: "Variable set",
        folderPath: "/workflows/claims/variables",
        status: { state: "published", version: "v2.1" },
        drafts: 0,
        createdBy: "Michael Torres",
      },
    ],
  },
];

// Status badge component
function StatusBadge({ status }: { status: DecisionAssetStatus }) {
  return (
    <div className={styles.statusContainer}>
      <span className={`${styles.statusBadge} ${styles[status.state]}`}>
        {status.state}
      </span>
      <span className={styles.versionText}>{status.version}</span>
    </div>
  );
}

// Nested table component for Task Model sub-rows
function NestedTable({ 
  subRows, 
  parentTaskModelId,
  parentTaskModelName,
  onRowClick,
  onAssetClick,
  automationId,
  serviceId,
  getRouteForAssetType,
  handleAssetClick
}: { 
  subRows: TaskModelSubRow[];
  parentTaskModelId: string;
  parentTaskModelName: string;
  onRowClick: (asset: AssetData) => void;
  onAssetClick?: (route: string, automationId: string, assetId: string, assetName: string, assetType: string, serviceId: string, subAssetId?: string) => void;
  automationId: string;
  serviceId?: string;
  getRouteForAssetType: (type: string) => string | null;
  handleAssetClick: (assetId: string, assetName: string, assetType: string, e: React.MouseEvent) => void;
}) {
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');

  const nestedColumns: ColumnDef<TaskModelSubRow>[] = [
    {
      accessorKey: "name",
      header: "Decision asset name",
      cell: (info) => {
        const assetName = info.getValue() as string;
        const assetType = info.row.original.type;
        const assetId = info.row.original.id;
        const folderPath = info.row.original.folderPath;
        
        // Handler for clicking the sub-asset name - navigates to parent task model with sub-asset selected
        const handleSubAssetClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (onAssetClick) {
            // Navigate to the parent task model (route: 'task-model') with sub-asset ID
            onAssetClick('task-model', automationId, parentTaskModelId, parentTaskModelName, 'Task Model', serviceId || automationId, assetId);
          }
        };
        
        // Handler for clicking a folder in the path - navigates to parent task model with folder expanded
        const handleFolderClick = (folderPath: string, e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (onAssetClick) {
            // Navigate to the parent task model with the folder path as context
            // We'll use a special folder ID format
            onAssetClick('task-model', automationId, parentTaskModelId, parentTaskModelName, 'Task Model', serviceId || automationId, `folder-${folderPath}`);
          }
        };
        
        return (
          <div className={styles.assetNameCell}>
            <span 
              className={`${styles.nestedAssetName} ${onAssetClick ? styles.assetNameClickable : ''}`}
              onClick={onAssetClick ? handleSubAssetClick : undefined}
            >
              {assetName}
            </span>
            <span className={styles.assetType}>
              {assetType} • {folderPath.split('/').filter(Boolean).map((folder, index, array) => {
                // Build the cumulative path for this folder
                const cumulativePath = '/' + folderPath.split('/').filter(Boolean).slice(0, index + 1).join('/');
                
                return (
                  <span key={index}>
                    <a 
                      href="#" 
                      className={styles.folderLink} 
                      onClick={(e) => handleFolderClick(cumulativePath, e)}
                    >
                      {folder}
                    </a>
                    {index < array.length - 1 && ' / '}
                  </span>
                );
              })}
            </span>
          </div>
        );
      },
      minSize: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue() as DecisionAssetStatus} />,
      size: 180,
      minSize: 150,
    },
    {
      accessorKey: "drafts",
      header: "Drafts",
      cell: (info) => <span>{info.getValue() as number}</span>,
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "createdBy",
      header: "Created by",
      cell: (info) => <span>{info.getValue() as string}</span>,
      size: 150,
      minSize: 120,
    },
  ];

  const nestedTable = useReactTable({
    data: subRows,
    columns: nestedColumns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={styles.nestedTable}>
      <thead>
        {nestedTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th 
                key={header.id} 
                className={styles.nestedTableHeader}
                style={{ 
                  width: header.column.columnDef.size ? `${header.getSize()}px` : 'auto'
                }}
              >
                <div className={styles.headerContent}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`${styles.resizer} ${header.column.getIsResizing() ? styles.isResizing : ''}`}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {nestedTable.getRowModel().rows.map((row) => {
          const assetData: AssetData = {
            id: row.original.id,
            name: row.original.name,
            type: row.original.type,
            status: row.original.status,
            drafts: row.original.drafts,
            createdBy: row.original.createdBy,
            folderPath: row.original.folderPath,
            isNested: true,
          };

          return (
            <tr 
              key={row.id} 
              className={styles.nestedTableRow}
              onClick={(e) => {
                // Don't trigger row click if clicking the asset name link
                const target = e.target as HTMLElement;
                if (!target.closest(`.${styles.assetNameClickable}`)) {
                  onRowClick(assetData);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td 
                  key={cell.id} 
                  className={styles.nestedTableCell}
                  style={{ 
                    width: cell.column.columnDef.size ? `${cell.column.getSize()}px` : 'auto'
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Main table component
// Note: Asset detail panels (section-level) opened from this table will automatically close when:
// 1. Navigating to a different page (managed by PanelManagerProvider)
// 2. Switching tabs or services (managed by ApplicationLayoutTemplate)
// 3. Switching side rail items like Branches, History (managed by ApplicationLayoutTemplate)
// However, page-level panels (like settings) will remain open when navigating side rail items
interface DecisionAssetsTableProps {
  onAssetClick?: (route: string, automationId: string, assetId: string, assetName: string, assetType: string, serviceId: string, subAssetId?: string) => void;
  automationId: string;
  serviceId?: string;
}

export default function DecisionAssetsTable({ onAssetClick, automationId, serviceId }: DecisionAssetsTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { openPanel } = usePanelManager();
  
  // Get assets from centralized data
  const { assets: allAssets } = useAssets({ serviceId });
  
  // Get all sub-assets for the service (to be filtered per task model)
  const { assets: allSubAssets } = useSubAssets(undefined);
  
  // Transform assets to table format
  const data = useMemo(() => {
    if (!serviceId || !allAssets.length) return [];
    
    // Filter out sub-asset types that should only appear nested within task models
    // These include: ruleflow, decision-table, rule, function
    // Also filter out data-model - data models are not decision assets and belong in the Data tab
    const topLevelAssets = allAssets.filter(asset => {
      const excludedTypes = ['ruleflow', 'decision-table', 'rule', 'function', 'data-model'];
      return !excludedTypes.includes(asset.type);
    });
    
    return topLevelAssets.map(asset => {
      // Determine display type name
      const getTypeName = (a: Asset): string => {
        if (a.type === 'task-model') return 'Task Model';
        if (a.type === 'decision-model') return 'Decision Model';
        if (a.type === 'rule-model') return 'Task Model';
        if (a.type === 'ml-model' || a.type === 'predictive-model') return 'Predictive Model';
        if (a.type === 'optimization-model') return 'Optimization Model';
        if (a.type === 'genai-node') return 'GenAI Node';
        if (a.type === 'policy') return 'Policy';
        if (a.type === 'dashboard') return 'Dashboard';
        if (a.type === 'data-model') return 'Data Model';
        return a.type;
      };
      
      // Get sub-assets for task models
      let subRows: TaskModelSubRow[] | undefined;
      if (asset.type === 'task-model') {
        // Filter sub-assets that belong to this task model from centralized data
        // Exclude functions - they should only be visible in the functions tab of the asset detail view
        // Exclude data-model - data models are not part of task models and belong in the Data tab
        const taskSubAssets = allSubAssets.filter(subAsset => 
          subAsset.parentAssetId === asset.id && 
          subAsset.type !== 'function' && 
          subAsset.type !== 'data-model'
        );
        
        if (taskSubAssets.length > 0) {
          // Map sub-assets from centralized data to table row format
          subRows = taskSubAssets.map(subAsset => {
            // Determine display type name for sub-assets
            const getSubAssetTypeName = (type: string): string => {
              if (type === 'ruleflow') return 'Rule flow';
              if (type === 'decision-table') return 'Decision table';
              if (type === 'data-model') return 'Data model';
              if (type === 'rule') return 'Business rule';
              return type;
            };
            
            return {
              id: subAsset.id,
              name: subAsset.displayName || subAsset.name,
              type: getSubAssetTypeName(subAsset.type),
              folderPath: subAsset.location || '/',
              status: { 
                state: subAsset.status === 'deployed' ? 'deployed' : 'published', 
                version: subAsset.version || 'v1.0' 
              },
              drafts: 0,
              createdBy: subAsset.createdBy || 'Unknown',
            };
          });
        }
      }
      
      const assetRow: DecisionAssetRow = {
        id: asset.id,
        type: getTypeName(asset),
        name: asset.displayName || asset.name,
        status: { 
          state: asset.status === 'deployed' ? 'deployed' : 'published', 
          version: asset.version || 'v1.0' 
        },
        drafts: 0, // Would need to be calculated from versions/branches in real implementation
        createdBy: asset.createdBy || 'Unknown',
        isExpandable: !!subRows && subRows.length > 0,
        subRows
      };
      return assetRow;
    });
  }, [allAssets, allSubAssets, serviceId]);

  // Map asset type to route
  const getRouteForAssetType = (type: string): string | null => {
    const typeToRoute: Record<string, string> = {
      'Decision Model': 'decision-model',
      'Task Model': 'task-model',
      'Predictive Model': 'predictive-model',
      'Optimization Model': 'optimization-model',
      'GenAI Node': 'genai-node',
    };
    return typeToRoute[type] || null;
  };

  const handleOpenAsset = (assetId: string, assetName: string, assetType: string) => {
    const route = getRouteForAssetType(assetType);
    if (route && onAssetClick) {
      onAssetClick(route, automationId, assetId, assetName, assetType, serviceId || automationId);
    }
  };

  const handleRowClick = (asset: AssetData) => {
    openPanel({
      id: `asset-${asset.id}`,
      content: <AssetDetailsPanel asset={asset} onOpenAsset={handleOpenAsset} />,
      level: 'page',
      pattern: 'overlay',
      width: 'standard',
    });
  };

  const handleAssetClick = (assetId: string, assetName: string, assetType: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const route = getRouteForAssetType(assetType);
    if (route && onAssetClick) {
      onAssetClick(route, automationId, assetId, assetName, assetType, serviceId || automationId);
    }
  };

  const columns: ColumnDef<DecisionAssetRow>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        if (!row.original.isExpandable) {
          return <div className={styles.expanderPlaceholder} />;
        }
        return (
          <button
            className={styles.expanderButton}
            onClick={row.getToggleExpandedHandler()}
            aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
          >
            <ChevronRight
              size={16}
              className={`${styles.chevronIcon} ${row.getIsExpanded() ? styles.chevronExpanded : ""}`}
            />
          </button>
        );
      },
      size: 48,
    },
    {
      accessorKey: "name",
      header: "Decision asset name",
      cell: (info) => {
        const assetName = info.getValue() as string;
        const assetType = info.row.original.type;
        const assetId = info.row.original.id;
        const route = getRouteForAssetType(assetType);
        
        return (
          <div className={styles.assetNameCell}>
            <a 
              href="#"
              className={`${styles.assetName} ${route && onAssetClick ? styles.assetNameClickable : ''}`}
              onClick={route && onAssetClick ? (e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                handleAssetClick(assetId, assetName, assetType, e); 
              } : (e) => e.preventDefault()}
            >
              {assetName}
            </a>
            <span className={styles.assetType}>{assetType}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <StatusBadge status={info.getValue() as DecisionAssetStatus} />,
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
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

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
          {table.getRowModel().rows.map((row) => {
            const assetData: AssetData = {
              id: row.original.id,
              name: row.original.name,
              type: row.original.type,
              status: row.original.status,
              drafts: row.original.drafts,
              createdBy: row.original.createdBy,
              isNested: false,
            };

            return (
              /*
               * key must be on the wrapper, not on the inner <tr>.
               * Using the tbody wrapper avoids React.Fragment data-attribute errors in Figma Make.
               */
              <tbody key={row.id} className={styles.tableBody}>
                <tr
                  className={styles.tableRow}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest(`.${styles.expanderButton}`) &&
                        !target.closest(`.${styles.assetNameClickable}`)) {
                      handleRowClick(assetData);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.tableCell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && row.original.subRows && (
                  <tr key={`${row.id}-expanded`} className={styles.expandedRow}>
                    <td colSpan={columns.length} className={styles.expandedCell}>
                      <div className={styles.nestedTableWrapper}>
                        <NestedTable
                          subRows={row.original.subRows}
                          parentTaskModelId={row.original.id}
                          parentTaskModelName={row.original.name}
                          onRowClick={handleRowClick}
                          onAssetClick={onAssetClick}
                          automationId={automationId}
                          serviceId={serviceId}
                          getRouteForAssetType={getRouteForAssetType}
                          handleAssetClick={handleAssetClick}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })}
      </table>
    </div>
  );
}