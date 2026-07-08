# Quick Reference: Data Layer & Registry Architecture

## 📁 File Locations

### Core Data Files
```
/data/automations/
├── registry/               # Registry architecture
│   ├── index.ts            # Central aggregation
│   ├── automation-6-24-20/
│   ├── claims-processing-automation/
│   └── [7 more automations...]
├── shared/                 # Shared utilities
│   ├── types.ts            # TypeScript types
│   ├── tags.ts             # Tag definitions
│   └── id-mappings.ts      # Hash ID mappings
├── lookups.ts              # Lookup/query functions
├── branches-types.ts       # Branching & versioning types
├── branches-data.ts        # 8 branches
├── versions-data.ts        # Version history
├── diffs.ts                # Diff calculation utilities
└── index.ts                # Main exports
```

### React Hooks
```
/data/hooks/
├── useAutomations.ts       # Automation hooks
├── useServices.ts          # Service hooks
├── useBranches.ts          # Branch hooks
├── useVersions.ts          # Version hooks
└── index.ts                # Main exports
```

### Documentation
```
/data/automations/docs/
├── README.md               # Documentation index
├── architecture/           # Architecture docs
│   ├── architecture.md
│   └── rework-summary.md
├── guides/                 # How-to guides
│   ├── branching-and-versioning.md
│   ├── deployment-data-sync.md
│   └── local-variables.md
├── migration/              # Migration docs
│   ├── migration-guide.md
│   ├── migration-complete.md
│   └── cleanup-summary.md
└── reference/              # Reference docs
    └── quick-reference.md  # This file
```

---

## 🎯 Common Tasks

### Get All Automations

```typescript
import { useAutomations } from '@/data/hooks';

function MyComponent() {
  const { automations, count } = useAutomations();
  return <div>Found {count} automations</div>;
}
```

### Filter Automations

```typescript
const { automations } = useAutomations({
  filter: { 
    status: 'deployed',
    variant: 'ai-generated'
  },
  sort: { 
    field: 'lastUpdatedDate', 
    direction: 'desc' 
  }
});
```

### Get Single Automation

```typescript
const { automation } = useAutomation('automation-6-24-20');
```

### Get Services for Automation

```typescript
const { services } = useServices({ 
  automationId: 'automation-6-24-20' 
});
```

### Get Assets for Service

```typescript
const { dataModels, mlModels, ruleModels, functions } = useServiceAssets('credit-risk-assessment');
```

### Get Version History

```typescript
const { versions, latest, contributors } = useVersionHistory('automation-6-24-20');
```

### Compare Versions

```typescript
const { diff, summary, hasChanges } = useVersionDiff(
  'version-auto-credit-1.0.0',
  'version-auto-credit-1.1.0'
);

console.log(summary); // "3 additions, 2 modifications, 0 deletions"
```

### Get Branches

```typescript
const { branches, activeBranches, defaultBranch } = useBranches();
```

### Get Branch Status

```typescript
const { aheadBy, behindBy, canMerge } = useBranchStatus('branch-feature-credit-scoring');
```

---

## 🗂️ Data Overview

### Automations (9 total)

| ID | Display Name | Status | Services | Implementation |
|----|--------------|--------|----------|----------------|
| automation-6-24-20 | Credit Risk Assessment | deployed | 2 | Full |
| customer-onboarding-automation | Customer Onboarding | deployed | 2 | Full |
| claims-processing-automation | Claims Processing | deployed | 3 | Full |
| dynamic-pricing-automation | Dynamic Pricing | deployed | 3 | Full |
| customer-churn-prevention | Customer Churn | deployed | 2 | Basic |
| patient-care-coordination | Patient Care | deployed | 3 | Basic |
| predictive-maintenance-automation | Predictive Maintenance | deployed | 3 | Basic |
| regulatory-compliance-monitoring | Regulatory Compliance | deployed | 2 | Basic |
| supply-chain-optimization | Supply Chain | deployed | 3 | Basic |

### Services (23 total)

Each automation has 2-3 decision services. Full implementations include:
- Service metadata
- Data models
- ML models
- Rule models
- Functions with local variables

### Assets

Types: data-model, decision-model, rule-model, ml-model, predictive-model, task-model, function, ruleflow, policy, dashboard

### Branches (8 total)

| Name | Type | Status | Ahead | Behind |
|------|------|--------|-------|--------|
| main | main | active | - | - |
| develop | develop | active | 5 | 0 |
| feature/enhanced-credit-scoring | feature | active | 8 | 2 |
| feature/realtime-fraud-detection | feature | active | 12 | 1 |
| feature/dashboard-ui-improvements | feature | active | 6 | 3 |
| release/2.0 | release | active | 15 | 0 |
| hotfix/authentication-fix | hotfix | merged | 0 | 0 |
| experiment/genai-decision-nodes | experiment | active | 20 | 5 |

---

## 🔍 Lookup Functions

### Automations

```typescript
import {
  getAutomationById,
  getAllAutomations,
  getAutomationsByStatus,
  getAutomationsByIndustry,
  getDeployedAutomations,
} from '@/data/automations';
```

### Services

```typescript
import {
  getServiceById,
  getAllServices,
  getServicesByAutomationId,
  getServicesByType,
} from '@/data/automations';
```

### Assets

```typescript
import {
  getAssetById,
  getAllAssets,
  getAssetsByServiceId,
  getAssetsByType,
} from '@/data/automations';
```

### Branches

```typescript
import {
  getBranchById,
  getBranchByName,
  getDefaultBranch,
  getActiveBranches,
  getFeatureBranches,
  getBranchHierarchy,
} from '@/data/automations';
```

### Versions

```typescript
import {
  getVersionById,
  getLatestVersion,
  getVersionHistory,
  getAllChanges,
  getVersionStats,
} from '@/data/automations';
```

---

## 📊 Type Definitions

### Main Types

```typescript
import type {
  // Entities
  DecisionAutomation,
  DecisionService,
  DataModel,
  Function,
  MLModel,
  RuleModel,
  
  // Supporting types
  Status,
  Tag,
  
  // Branching
  Branch,
  Version,
  Diff,
  
  // Filters
  AutomationFilter,
  ServiceFilter,
} from '@/data/automations';
```

### Common Enums

```typescript
// Status
type Status = 'draft' | 'deployed' | 'archived';

// Asset Types (in shared/types.ts)
interface DataModel { ... }
interface MLModel { ... }
interface RuleModel { ... }
interface Function { ... }

// Branch Types
type BranchType = 'main' | 'develop' | 'feature' | 'hotfix' | 'release' | 'experiment';
```

---

## 🎨 Entity Relationships

```
DecisionAutomation (1)
  └── has many DecisionServices (N)
        ├── has many DataModels (N)
        ├── has many MLModels (N)
        ├── has many RuleModels (N)
        └── has many Functions (N)
              └── has many Sub-Functions (N)

Branch (1)
  └── has many Versions (N)
        └── has one Entity Snapshot
```

---

## 💡 Code Patterns

### Show Version History

```typescript
import { useVersionTimeline } from '@/data/hooks';

function VersionTimeline({ entityId }: { entityId: string }) {
  const timeline = useVersionTimeline(entityId);
  
  return (
    <div>
      {timeline.map(entry => (
        <div key={entry.version.id}>
          <div>{entry.version.version}</div>
          <div>{entry.author}</div>
          <div>{entry.message}</div>
        </div>
      ))}
    </div>
  );
}
```

### Branch Switcher

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
        </option>
      ))}
    </select>
  );
}
```

### Diff Viewer

```typescript
import { useVersionDiff } from '@/data/hooks';

function DiffViewer({ fromId, toId }: { fromId: string; toId: string }) {
  const { diff, summary } = useVersionDiff(fromId, toId);
  
  if (!diff) return null;
  
  return (
    <div>
      <h3>{summary}</h3>
      {diff.changes.map((change, i) => (
        <div key={i}>
          <div>{change.path}</div>
          <div>{change.changeType}</div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚨 Common Gotchas

### 1. Always Use Hooks, Not Direct Imports

❌ **Don't:**
```typescript
import { allAutomations } from '@/data/automations/registry';

function MyComponent() {
  return <div>{allAutomations.length}</div>; // No memoization!
}
```

✅ **Do:**
```typescript
import { useAutomations } from '@/data/hooks';

function MyComponent() {
  const { automations } = useAutomations(); // Memoized!
  return <div>{automations.length}</div>;
}
```

### 2. Version IDs vs Entity IDs

```typescript
// Version ID
const versionId = 'version-auto-credit-1.0.0';

// Entity ID
const entityId = 'automation-6-24-20';

// Get version
const { version } = useVersion(versionId);

// Get version history for entity
const { versions } = useVersionHistory(entityId);
```

### 3. Branch ID vs Branch Name

```typescript
// By ID
const { branch } = useBranch('branch-main');

// By name
const { branch } = useBranchByName('main');
```

### 4. Filtering is Client-Side

All filtering happens in React (client-side). For large datasets, this would move to backend API.

---

## 📦 Registry Structure

### Adding a New Automation

1. Create directory with human-readable name:
```
registry/my-new-automation/
```

2. Add automation.ts:
```typescript
export const automation: DecisionAutomation = {
  id: 'my-new-automation',
  hashId: 'abc123',
  name: 'My New Automation',
  serviceIds: ['service-1'],
  // ... other metadata
};
```

3. Add services directory:
```
services/
  service-1/
    service.ts
    data-models.ts
    ml-models.ts
    rule-models.ts
    functions/
      local-variables.ts
      my-function/
        function.ts
        local-variables.ts
```

4. Export from index.ts:
```typescript
export * from './automation';
export * as services from './services';
```

5. Registry automatically aggregates!

---

## 📚 Learn More

- **Documentation Index**: `/data/automations/docs/README.md`
- **Architecture**: `/data/automations/docs/architecture/architecture.md`
- **Branching**: `/data/automations/docs/guides/branching-and-versioning.md`
- **Migration**: `/data/automations/docs/migration/migration-guide.md`
- **Local Variables**: `/data/automations/docs/guides/local-variables.md`

---

**Last updated:** 2025-11-10  
**Version:** 2.0.0 (Registry Architecture)
