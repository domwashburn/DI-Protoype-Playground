# Branching and Versioning System

> **Note**: This document provides an overview of the branching and versioning system for decision automations. For the complete original documentation, see the original `BRANCHING_AND_VERSIONING.md` file.

## Overview

The automations data layer includes a Git-style branching and versioning system that allows for:
- Multiple development branches
- Version history tracking
- Diff comparison between versions
- Merge simulation and conflict detection

## Key Features

### Branches
- Main branch for production
- Feature branches for development
- Release branches for staging
- Hotfix branches for urgent fixes
- Experiment branches for testing

### Versioning
- Semantic versioning (MAJOR.MINOR.PATCH)
- Version history for all entities
- Change tracking and diffs
- Contributor attribution

### Data Files
- `/data/automations/branches-data.ts` - Branch definitions
- `/data/automations/branches-types.ts` - TypeScript types
- `/data/automations/versions-data.ts` - Version history
- `/data/automations/version-asset-changes.ts` - Change tracking
- `/data/automations/diffs.ts` - Diff utilities

## Usage

### Working with Branches

```typescript
import { useBranches, useBranch } from '@/data/hooks';

function MyComponent() {
  const { branches, defaultBranch } = useBranches();
  const { branch } = useBranch('branch-main');
  
  return <div>{branch.displayName}</div>;
}
```

### Version History

```typescript
import { useVersionHistory } from '@/data/hooks';

function VersionHistory({ entityId }: { entityId: string }) {
  const { versions, latest } = useVersionHistory(entityId);
  
  return (
    <div>
      <h3>Latest: {latest?.version}</h3>
      {versions.map(v => (
        <div key={v.id}>{v.version} - {v.message}</div>
      ))}
    </div>
  );
}
```

### Comparing Versions

```typescript
import { useVersionDiff } from '@/data/hooks';

function DiffView({ fromId, toId }: { fromId: string; toId: string }) {
  const { diff, summary, hasChanges } = useVersionDiff(fromId, toId);
  
  return (
    <div>
      <p>{summary}</p>
      {/* Render diff changes */}
    </div>
  );
}
```

## Branch Types

| Type | Purpose | Examples |
|------|---------|----------|
| main | Production code | main |
| develop | Integration branch | develop |
| feature | New features | feature/enhanced-scoring |
| hotfix | Urgent fixes | hotfix/auth-fix |
| release | Release preparation | release/2.0 |
| experiment | Testing ideas | experiment/genai-nodes |

## Best Practices

1. **Main branch** is always deployable
2. **Feature branches** branch from develop
3. **Hotfixes** branch from main for urgent fixes
4. **Release branches** prepare for production
5. **Experiments** can branch from anywhere

## API Reference

See [Quick Reference](../reference/quick-reference.md) for complete API documentation.

---

**See also:**
- [Deployment Data Sync](./deployment-data-sync.md)
- [Architecture Overview](../architecture/architecture.md)
