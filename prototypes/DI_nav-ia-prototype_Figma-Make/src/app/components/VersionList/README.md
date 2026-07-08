# VersionList Component

A comprehensive version history component that displays versions with detailed asset-level changes and visual diff capabilities.

## Features

- **Version Timeline**: Chronological list of versions sorted newest to latest
- **Expandable Details**: Click any version to see detailed service and asset changes
- **Change Indicators**: Color-coded icons for added (green), modified (orange), and removed (red) changes
- **Asset Tracking**: Shows which services and assets were changed in each version
- **Visual Diff**: Click "View diff" on any modified asset to see line-by-line changes
- **Version Actions**: Compare versions, view details, rollback
- **Smart Badges**: Latest version and deployment status indicators
- **Statistics**: Shows change counts, insertions, and deletions

## Components

### VersionList
Main container component that renders a list of versions.

```tsx
import { VersionList } from './components/VersionList';

<VersionList 
  versions={versions}
  onViewDiff={(assetId, versionId) => console.log('View diff')}
  onCompareVersions={(versionId) => console.log('Compare')}
  onRollback={(versionId) => console.log('Rollback')}
/>
```

### VersionListItem
Individual version display with expandable details showing service and asset changes.

### VersionDiffViewer
Visual diff viewer with split and unified view modes for comparing asset versions.

## Version Structure

```typescript
interface Version {
  id: string;
  entityId: string;
  entityType: 'automation' | 'service' | 'asset';
  branchId: string;
  
  version: string;
  semanticVersion: SemanticVersion;
  
  timestamp: string;
  author: string;
  authorEmail: string;
  message: string;
  
  parentVersionIds: string[];
  snapshot: any;
  changes: Change[];
  
  filesChanged?: number;
  insertions?: number;
  deletions?: number;
  tags?: string[];
}
```

## Asset Changes Structure

```typescript
interface VersionAssetChanges {
  versionId: string;
  serviceChanges: ServiceChange[];
  assetChanges: AssetChange[];
}

interface AssetChange {
  id: string;
  assetId: string;
  assetName: string;
  assetType: string;
  changeType: 'added' | 'modified' | 'removed';
  serviceId?: string;
  serviceName?: string;
  path?: string;
  details?: string;
}
```

## Usage Examples

### Basic Version List

```tsx
import { VersionList } from './components/VersionList';
import { useVersionHistory } from './data/hooks';

function VersionHistoryView() {
  const { versions } = useVersionHistory('automation-6-24-20', 'branch-main');
  
  return <VersionList versions={versions} />;
}
```

### With Diff Viewer

```tsx
import { useState } from 'react';
import { VersionList } from './components/VersionList';
import { VersionDiffViewer } from './components/VersionDiffViewer';
import Modal from './components/Modal';

function VersionHistoryView() {
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const handleViewDiff = (assetId: string, versionId: string) => {
    setSelectedAsset({ assetId, versionId, ... });
    setDiffModalOpen(true);
  };
  
  return (
    <>
      <VersionList 
        versions={versions}
        onViewDiff={handleViewDiff}
      />
      
      {diffModalOpen && selectedAsset && (
        <Modal isOpen onClose={() => setDiffModalOpen(false)}>
          <VersionDiffViewer
            assetName={selectedAsset.name}
            assetType={selectedAsset.type}
            oldVersion="1.0.0"
            newVersion="1.1.0"
            oldContent={oldContent}
            newContent={newContent}
          />
        </Modal>
      )}
    </>
  );
}
```

### With Actions

```tsx
<VersionList 
  versions={versions}
  onViewDiff={handleViewDiff}
  onCompareVersions={(versionId) => {
    // Navigate to comparison view
    navigate(`/compare/${versionId}`);
  }}
  onRollback={(versionId) => {
    // Confirm and rollback
    if (confirm('Rollback to this version?')) {
      rollbackToVersion(versionId);
    }
  }}
/>
```

## Visual Layout

### Collapsed Version

```
┌─────────────────────────────────────────────────────────┐
│  ●  v1.1.0  [Latest] [Deployed]                    ▼   │
│     Deployed to production with execution tracking      │
│     domwashburn@us.ibm.com  •  2 hours ago              │
│     3 changes  +2  -0                                   │
└─────────────────────────────────────────────────────────┘
```

### Expanded Version

```
┌─────────────────────────────────────────────────────────┐
│  ●  v1.1.0  [Latest] [Deployed]                    ▲   │
│     Deployed to production with execution tracking      │
│     domwashburn@us.ibm.com  •  2 hours ago              │
│     3 changes  +2  -0                                   │
│                                                          │
│     ┌──────────────────────────────────────────────┐   │
│     │ ASSETS                                        │   │
│     │                                               │   │
│     │ ✓ Modified (2)                                │   │
│     │   Credit Scoring Decision Model               │   │
│     │   Decision Model • Credit Risk Service       │   │
│     │   [View diff]                                 │   │
│     │                                               │   │
│     │   Credit Risk Dashboard                       │   │
│     │   Dashboard • Credit Risk Service             │   │
│     │                                               │   │
│     │ [Compare with current] [View details]        │   │
│     └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Change Type Icons

| Type | Icon | Color | Description |
|------|------|-------|-------------|
| Added | ➕ | Green | New service/asset |
| Modified | ✏️ | Orange | Updated service/asset |
| Removed | 🗑️ | Red | Deleted service/asset |

## Diff Viewer Modes

### Split View
Shows old and new versions side-by-side for easy comparison.

```
┌─────────────────┬─────────────────┐
│  v1.0.0         │  v1.1.0         │
│  Before         │  After          │
├─────────────────┼─────────────────┤
│  1  "min": 600  │  1  "min": 580  │
│  2  "rec": 700  │  2  "rec": 720  │
│  3  }           │  3  "max": 0.4  │
│                 │  4  }           │
└─────────────────┴─────────────────┘
```

### Unified View
Shows changes in a single column with +/- indicators.

```
┌────────────────────────────────┐
│  1    "minimum": 600,          │
│  -  - "minimum": 600,          │
│  +  + "minimum": 580,          │
│  2    "recommended": 700       │
│  -  - "recommended": 700       │
│  +  + "recommended": 720,      │
│  +  + "debtToIncomeMax": 0.4   │
└────────────────────────────────┘
```

## Styling

All styling uses CSS variables from the design system:

```css
/* Colors */
--cds-layer-01, --cds-layer-02
--cds-border-subtle-01
--cds-text-primary, --cds-text-secondary
--cds-support-success  /* Green for added */
--cds-support-warning   /* Orange for modified */
--cds-support-error     /* Red for removed */
--cds-support-info      /* Blue for versions */

/* Spacing */
--cds-spacing-02 through --cds-spacing-09

/* Typography */
--cds-font-family (IBM Plex Sans)
'IBM Plex Mono' for code/diffs
```

## Integration with Data Layer

```tsx
import { 
  getVersionHistory,
  getVersionAssetChanges 
} from './data/automations';

// Get versions
const versions = getVersionHistory('automation-6-24-20', 'branch-main');

// Get asset changes for a version
const changes = getVersionAssetChanges('version-auto-credit-1.1.0');

console.log(changes.serviceChanges); // Service-level changes
console.log(changes.assetChanges);   // Asset-level changes
```

## Props

### VersionList

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| versions | Version[] | Yes | Array of version objects |
| emptyMessage | string | No | Message when no versions (default: "No versions to display") |
| onViewDiff | (assetId, versionId) => void | No | Callback when viewing asset diff |
| onCompareVersions | (versionId) => void | No | Callback when comparing versions |
| onRollback | (versionId) => void | No | Callback when rolling back |

### VersionDiffViewer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| assetName | string | Yes | Name of the asset |
| assetType | string | Yes | Type of the asset |
| oldVersion | string | Yes | Old version number |
| newVersion | string | Yes | New version number |
| oldContent | string | No | Content of old version |
| newContent | string | No | Content of new version |
| onClose | () => void | No | Callback when closing |

## Best Practices

1. **Always provide asset-level changes** for better visibility
2. **Use semantic versioning** (major.minor.patch)
3. **Include meaningful commit messages**
4. **Track all changes** (services and assets)
5. **Provide diff content** for visual comparison
6. **Enable rollback** only for non-latest versions
7. **Show deployment status** clearly

## Future Enhancements

- Search/filter versions
- Compare any two versions
- Bulk operations
- Tag management
- Release notes
- Automated changelog generation
- CI/CD integration
- Approval workflows
