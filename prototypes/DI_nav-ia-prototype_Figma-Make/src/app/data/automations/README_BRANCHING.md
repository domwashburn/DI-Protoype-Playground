# Branching & Versioning System - Quick Start

> 🎯 **TL;DR**: You now have a complete git-like branching and version control system for automations, services, and assets with AI creation tracking and diff capabilities.

---

## 🚀 What You Can Do Now

### 1. Track Version History

```typescript
import { useVersionHistory } from '@/data/hooks';

function VersionHistory({ entityId }) {
  const { versions, latest, contributors } = useVersionHistory(entityId);
  
  return (
    <div>
      <h3>Latest: {latest?.version}</h3>
      <p>Total versions: {versions.length}</p>
      <p>Contributors: {contributors.join(', ')}</p>
    </div>
  );
}
```

### 2. Show AI Creation Badge

```typescript
import { useAIMetadata } from '@/data/hooks';

function EntityCard({ entityId }) {
  const { isAIGenerated, aiMetadata } = useAIMetadata(entityId);
  
  return (
    <div>
      {isAIGenerated && (
        <span className="ai-badge">
          🤖 AI Generated ({aiMetadata?.aiModel})
        </span>
      )}
    </div>
  );
}
```

### 3. Compare Versions (Diff)

```typescript
import { useVersionDiff } from '@/data/hooks';

function DiffViewer({ fromVersionId, toVersionId }) {
  const { diff, summary, hasChanges } = useVersionDiff(fromVersionId, toVersionId);
  
  if (!hasChanges) return <div>No changes</div>;
  
  return (
    <div>
      <h3>Changes: {summary}</h3>
      <ul>
        {diff?.changes.map((change, i) => (
          <li key={i}>
            {change.changeType} - {change.path}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 4. Switch Branches

```typescript
import { useBranches } from '@/data/hooks';

function BranchSwitcher() {
  const { branches, defaultBranch } = useBranches();
  const [selected, setSelected] = useState(defaultBranch.id);
  
  return (
    <select value={selected} onChange={e => setSelected(e.target.value)}>
      {branches.map(branch => (
        <option key={branch.id} value={branch.id}>
          {branch.displayName}
          {branch.aheadBy > 0 && ` (+${branch.aheadBy})`}
          {branch.behindBy > 0 && ` (-${branch.behindBy})`}
        </option>
      ))}
    </select>
  );
}
```

### 5. Check Merge Conflicts

```typescript
import { useMergeSimulation } from '@/data/hooks';

function MergeChecker({ sourceVersionId, targetVersionId }) {
  const { canMerge, conflicts, conflictCount } = useMergeSimulation(
    sourceVersionId,
    targetVersionId
  );
  
  return (
    <div>
      {canMerge ? (
        <span className="success">✓ Can merge safely</span>
      ) : (
        <span className="warning">
          ⚠️ {conflictCount} conflicts detected
        </span>
      )}
    </div>
  );
}
```

---

## 📚 Available Hooks

### Branch Hooks

```typescript
import {
  useBranches,        // Get all branches
  useBranch,          // Get single branch
  useBranchStatus,    // Get branch status (ahead/behind)
  useBranchHierarchy, // Get parent/child relationships
  useBranchComparison,// Compare two branches
} from '@/data/hooks';
```

### Version Hooks

```typescript
import {
  useVersionHistory,  // Get all versions for entity
  useVersion,         // Get single version
  useVersionDiff,     // Compare two versions
  useChanges,         // Get all changes
  useMergeSimulation, // Simulate merge
  useAIMetadata,      // Get AI creation info
  useVersionStats,    // Get statistics
  useLatestSnapshot,  // Get latest entity state
} from '@/data/hooks';
```

---

## 🌳 Available Branches

| Branch | Type | Status | Description |
|--------|------|--------|-------------|
| **main** | main | active | Production (protected) |
| **develop** | develop | active | Integration branch |
| **feature/enhanced-credit-scoring** | feature | active | ML improvements |
| **feature/realtime-fraud-detection** | feature | active | Fraud detection |
| **feature/dashboard-ui-improvements** | feature | active | UI updates |
| **release/2.0** | release | active | Upcoming release |
| **hotfix/authentication-fix** | hotfix | merged | Security patch |
| **experiment/genai-decision-nodes** | experiment | active | GenAI experiments |

---

## 📖 Documentation

### Quick Start
- **This file** - Quick reference

### In-Depth Guides
- **BRANCHING_AND_VERSIONING.md** - Complete system guide
- **MIGRATION_GUIDE.md** - Directory structure migration
- **QUICK_REFERENCE.md** - Cheat sheet

### Architecture
- **README.md** - Main data layer docs
- **ARCHITECTURE.md** - Design decisions

---

## 🎯 Common Use Cases

### Use Case 1: Show "AI Generated" Badge

```typescript
const { isAIGenerated } = useAIMetadata(entityId);

{isAIGenerated && <Badge>AI Generated</Badge>}
```

### Use Case 2: Display Version Timeline

```typescript
const timeline = useVersionTimeline(entityId);

{timeline.map(entry => (
  <div key={entry.version.id}>
    <div>{entry.version.version}</div>
    <div>{entry.message}</div>
    <div>{entry.author}</div>
  </div>
))}
```

### Use Case 3: Compare Current vs Latest

```typescript
const { latest } = useVersionHistory(entityId);
const currentVersionId = 'version-current';

const { diff, summary } = useVersionDiff(currentVersionId, latest?.id);

<div>Changes from current: {summary}</div>
```

### Use Case 4: Show Branch Selector

```typescript
const { activeBranches } = useBranches();

<select>
  {activeBranches.map(branch => (
    <option value={branch.id}>{branch.displayName}</option>
  ))}
</select>
```

### Use Case 5: Conflict Detection

```typescript
const { conflicts, canMerge } = useMergeSimulation(sourceId, targetId);

{!canMerge && (
  <Alert>
    {conflicts.map(c => (
      <div key={c.path}>Conflict in {c.path}</div>
    ))}
  </Alert>
)}
```

---

## 🔍 Data Examples

### Example Entity with AI Metadata

```typescript
{
  id: 'automation-6-24-20',
  name: 'Credit Risk Assessment',
  variant: 'ai-generated',
  createdBy: 'Decision Assistant',
  // ... other fields
}
```

### Example Version

```typescript
{
  id: 'version-auto-credit-1.0.0',
  entityId: 'automation-6-24-20',
  version: '1.0.0',
  author: 'Decision Assistant',
  message: 'Initial AI-generated version',
  timestamp: '2025-06-24T15:45:12.000Z',
  changes: [
    {
      field: '*',
      changeType: 'added',
      newValue: 'Initial creation',
    }
  ],
  snapshot: { /* full entity state */ }
}
```

### Example Branch

```typescript
{
  id: 'branch-feature-credit-scoring',
  name: 'feature/enhanced-credit-scoring',
  type: 'feature',
  status: 'active',
  aheadBy: 8,
  behindBy: 2,
  protection: 'none',
}
```

### Example Diff

```typescript
{
  fromVersionId: 'version-1.0.0',
  toVersionId: 'version-1.1.0',
  totalChanges: 5,
  additions: 3,
  modifications: 2,
  deletions: 0,
  changes: [
    {
      path: 'description',
      changeType: 'modified',
      oldValue: 'Old description',
      newValue: 'New description',
    }
  ]
}
```

---

## 💡 Tips

### Tip 1: Use Latest Snapshot for Current State

```typescript
// Don't query entity directly, use latest snapshot
const snapshot = useLatestSnapshot(entityId, branchId);
```

### Tip 2: Check Branch Status Before Actions

```typescript
const { canMerge, needsUpdate } = useBranchStatus(branchId);

if (needsUpdate) {
  // Show "Update from base branch" button
}
```

### Tip 3: Filter Branches by Type

```typescript
const { branches } = useBranches({
  filter: { 
    type: 'feature',
    status: 'active'
  }
});
```

### Tip 4: Get Version Statistics

```typescript
const { totalVersions, contributors, averageChangesPerVersion } = 
  useVersionStats(entityId);
```

### Tip 5: Identify Creation Method

```typescript
const { creationMethod } = useAIMetadata(entityId);

switch (creationMethod) {
  case 'ai-generated': // Show AI badge
  case 'ai-assisted':  // Show assisted badge
  case 'manual':       // No badge
  // ... etc
}
```

---

## 🚨 Important Notes

1. **AI Detection**: Check `automation.variant === 'ai-generated'` OR `useAIMetadata()` hook
2. **Version IDs**: Versions have unique IDs (`version-xxx`), distinct from entity IDs
3. **Branch Defaults**: `main` is always the default branch
4. **Snapshots**: Each version includes a full entity snapshot for rollback
5. **Changes**: Changes are tracked incrementally per version

---

## ✅ Next Steps

1. **Build UI Components**
   - Version history timeline
   - Diff viewer
   - Branch switcher
   - AI badge

2. **Integrate into Pages**
   - Add version tab to asset pages
   - Show AI badges on cards
   - Add branch selector to header

3. **Extend Data**
   - Add more versions to entities
   - Create more feature branches
   - Add version histories for services/assets

4. **Advanced Features**
   - Implement actual merge (currently simulation)
   - Add tag management
   - Create cherry-pick functionality

---

## 🎉 You're Ready!

The branching and versioning system is fully operational. All hooks are ready to use, data is populated, and you can start building UI components that leverage version control and AI transparency.

**Questions?** Check the full documentation in `BRANCHING_AND_VERSIONING.md`

**Need help?** See examples in `QUICK_REFERENCE.md`

**Ready to migrate?** See `MIGRATION_GUIDE.md`

---

**Last updated**: 2025-10-16  
**Version**: 1.0.0
