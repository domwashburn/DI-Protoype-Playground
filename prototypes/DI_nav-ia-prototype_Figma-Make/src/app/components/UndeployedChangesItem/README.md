# UndeployedChangesItem Component

A specialized component that displays all changes made after the most recent deployed version, serving as a staging area to prepare the next deployment.

## Overview

The `UndeployedChangesItem` component shows:
- **Published changes** - Commits on the main branch that haven't been deployed yet
- **Draft changes** - Commits on feature/dev branches under development
- Aggregate statistics (files changed, insertions, deletions)
- Expandable details with per-version breakdown
- Actions to deploy or compare changes

## Features

### Un-deployed Changes Section
```
┌─────────────────────────────────────────────┐
│ ⚠ Un-deployed Changes [Staging]            │
│ 🔀 2 published, 1 draft | Since v1.1.0     │
│ 📝 5 files  +145  -32                       │
│                                              │
│ [Click to expand/collapse]                  │
└─────────────────────────────────────────────┘
```

### Expanded View
When expanded, shows:
1. **Published Changes (main branch)**
   - Green badge "Published"
   - Version, author, message
   - Statistics per commit
   
2. **Draft Changes (feature branches)**
   - Blue badge "Draft"
   - Branch name, version, author, message
   - Statistics per commit

3. **Actions**
   - "Deploy published changes" button
   - "Compare with [last deployed version]" button

## Usage

```tsx
import { UndeployedChangesItem } from './components/UndeployedChangesItem';

// In VersionList or HistoryPage
<UndeployedChangesItem
  lastDeployedVersion={lastDeployedVersion}
  publishedChanges={publishedChanges}
  draftChanges={draftChanges}
  totalAssetsChanged={totalAssetsChanged}
  onViewDiff={handleViewDiff}
  onCompareVersions={handleCompareVersions}
  onDeploy={handleDeploy}
/>
```

## Props

### `UndeployedChangesItemProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `lastDeployedVersion` | `Version \| undefined` | No | The most recent deployed version (baseline for comparison) |
| `publishedChanges` | `Version[]` | Yes | Array of commits on main branch after last deployment |
| `draftChanges` | `Version[]` | Yes | Array of commits on feature branches |
| `totalAssetsChanged` | `number` | Yes | Total number of files/assets changed across all undeployed commits |
| `onViewDiff` | `(assetId: string, versionId: string) => void` | No | Callback when user wants to view diff for a specific asset |
| `onCompareVersions` | `(versionId: string) => void` | No | Callback to compare current state with a version |
| `onDeploy` | `() => void` | No | Callback to deploy published changes |

## Data Flow

```
getUndeployedChanges(entityId)
    ↓
Returns {
  lastDeployedVersion,    // v1.1.0 (last deployed)
  publishedChanges,       // [v1.1.1, v1.1.2] on main
  draftChanges,          // [v1.2.0-dev] on feature branch
  totalAssetsChanged      // 5 files
}
    ↓
UndeployedChangesItem
    ↓
Displays staging area with:
  - Published: Ready to deploy
  - Draft: Under review/development
```

## Visual States

### Collapsed (Default)
- Header with warning icon and "Un-deployed Changes" title
- "Staging" badge
- Branch status: "X published, Y draft"
- Baseline reference: "Since v1.1.0"
- Aggregate stats: files, insertions, deletions

### Expanded
- Full breakdown by status (Published/Draft)
- Individual commits with:
  - Version number
  - Branch name
  - Commit message
  - Author
  - Statistics
- Action buttons at bottom

## Integration Points

### HistoryPage
```tsx
// Versions tab shows:
<VersionList
  versions={versions}
  showUndeployedChanges={true}
  undeployedData={undeployedData}
  onDeploy={handleDeploy}
/>
```

### VersionsPage (Standalone)
```tsx
// Could also be used in standalone Versions page
<VersionList
  versions={filteredVersions}
  showUndeployedChanges={true}
  undeployedData={undeployedData}
/>
```

## Styling

All styles use CSS variables from the design system:

### Colors
- `--cds-background-warning` - Undeployed badge background
- `--cds-support-success` - Published status badge
- `--cds-support-info` - Draft status badge
- `--cds-layer-01`, `--cds-layer-02` - Layer backgrounds
- `--cds-border-subtle-01` - Borders

### Typography
- IBM Plex Sans (from CSS file)
- No font-size, font-weight, or line-height overrides

### Spacing
- `--cds-spacing-02` through `--cds-spacing-06`

## Behavior

### Collapsible
- Click header to toggle expand/collapse
- Chevron icon rotates 90° when expanded
- Smooth transitions

### Empty State
- If no undeployed changes, component returns `null`
- Parent handles empty state messaging

### Actions
- **Deploy published changes** - Only shown if published changes exist
- **Compare with version** - Only shown if last deployed version exists
- Buttons use `stopPropagation` to prevent collapse toggle

## Git-like Workflow

This component mirrors git's working tree concept:

```
Last Deployed (v1.1.0)
         ↓
    ┌─────────┐
    │  main   │ ← Published (ready to deploy)
    │  v1.1.1 │
    │  v1.1.2 │
    └─────────┘
         ↓
    ┌─────────┐
    │ feature │ ← Draft (under review)
    │ v1.2.0  │
    └─────────┘
         ↓
    Deploy → v1.2.0
```

### Status Meanings

| Status | Branch | Meaning | Next Action |
|--------|--------|---------|-------------|
| **Published** | main | Reviewed and approved, ready for deployment | Deploy |
| **Draft** | feature/* | Under development, needs review | Review → Merge → Publish → Deploy |

## Use Cases

### 1. Preparing Deployment
User wants to see what will be included in next deployment:
- Expand UndeployedChangesItem
- Review published changes
- Click "Deploy published changes"

### 2. Reviewing Draft Work
User wants to see what's in development:
- Expand UndeployedChangesItem
- Review draft changes by branch
- Assess progress toward next release

### 3. Comparing Changes
User wants to understand what changed since last deployment:
- Click "Compare with v1.1.0"
- See aggregate diff across all undeployed changes

### 4. Understanding Scope
User wants quick overview of pending work:
- View collapsed header
- See counts: "2 published, 1 draft"
- See stats: "5 files +145 -32"

## Example Data Structure

```typescript
// Input data
const undeployedData = {
  lastDeployedVersion: {
    id: 'version-auto-credit-1.1.0',
    version: '1.1.0',
    timestamp: '2025-10-15T14:20:00.000Z',
    snapshot: { status: 'deployed' }
  },
  publishedChanges: [
    {
      id: 'version-auto-credit-1.1.1',
      version: '1.1.1',
      branchId: 'branch-main',
      message: 'Updated risk thresholds',
      author: 'domwashburn@us.ibm.com',
      filesChanged: 2,
      insertions: 15,
      deletions: 8
    },
    {
      id: 'version-auto-credit-1.1.2',
      version: '1.1.2',
      branchId: 'branch-main',
      message: 'Fixed validation bug',
      author: 'domwashburn@us.ibm.com',
      filesChanged: 1,
      insertions: 5,
      deletions: 3
    }
  ],
  draftChanges: [
    {
      id: 'version-feature-credit-1.2.0-dev',
      version: '1.2.0-dev',
      branchId: 'branch-feature-credit-scoring',
      message: 'WIP: Adding new ML risk factors',
      author: 'domwashburn@us.ibm.com',
      filesChanged: 2,
      insertions: 125,
      deletions: 21
    }
  ],
  totalAssetsChanged: 5
};
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management
- Color contrast meets WCAG AA standards

## Related Components

- **VersionList** - Parent component that displays version history
- **VersionListItem** - Individual version entries
- **VersionDiffViewer** - Asset-level diff comparison
- **Timeline** - Activity/event timeline (other History tabs)

## Future Enhancements

1. **Asset-level expansion** - Show which specific assets changed in each commit
2. **Conflict detection** - Warn if draft changes conflict with published changes
3. **Approval workflow** - Require approval before allowing deployment
4. **Batch actions** - Select multiple versions to deploy together
5. **Rollback simulation** - Preview impact of rolling back
6. **CI/CD integration** - Link to build/test status

## Notes

- Component is only shown when there are undeployed changes
- Works with any entity type (automation, service, asset)
- Fully responsive design
- No hardcoded styles - all from design system
- Follows Carbon Design System v11 patterns
