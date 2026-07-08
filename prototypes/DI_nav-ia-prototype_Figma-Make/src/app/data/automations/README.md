# Decision Automations Data Layer

A comprehensive, scalable, and type-safe data layer for Decision Intelligence applications built with React and TypeScript.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Data Structure](#data-structure)
- [Usage Guide](#usage-guide)
- [React Hooks](#react-hooks)
- [API Reference](#api-reference)
- [Extending the Data Layer](#extending-the-data-layer)
- [Best Practices](#best-practices)

---

## Overview

This data layer provides a **normalized, type-safe, and performant** foundation for managing Decision Automations, Services, and Assets in a Decision Intelligence application.

### Key Features

✅ **Type-Safe**: Full TypeScript coverage with discriminated unions  
✅ **Normalized**: Entities reference each other by ID, avoiding duplication  
✅ **Scalable**: Easy to add new asset types or extend existing ones  
✅ **Performant**: Efficient lookups with memoization support  
✅ **React-Ready**: Custom hooks for seamless React integration  
✅ **Single Source of Truth**: All data in one place  
✅ **Well-Documented**: Comprehensive inline documentation  

---

## Architecture

### Directory Structure

```
/data
  /automations
    ├── types.ts              # TypeScript type definitions
    ├── automations.ts        # Automation data
    ├── services.ts           # Service data
    ├── assets.ts             # Main asset data
    ├── assets-extended.ts    # ML models, policies, dashboards
    ├── assets-sub.ts         # Sub-assets (ruleflows, functions, artifacts)
    ├── lookups.ts            # Query and filter utilities
    ├── index.ts              # Main export
    └── README.md             # This file
  /hooks
    ├── useAutomations.ts     # Automation hooks
    ├── useServices.ts        # Service hooks
    ├── useAssets.ts          # Asset hooks
    └── index.ts              # Hook exports
```

### Data Model

```
Decision Automation (1:N) ──> Services (1:N) ──> Assets
                                                    │
                                                    └─> Sub-Assets
                                                         ├─ Ruleflows
                                                         ├─ Functions
                                                         └─ Artifacts
```

### Entity Relationships

1. **Decision Automation**: Top-level container
   - Contains multiple Services
   - Has metadata like tags, industry, branch
   - Tracks execution statistics

2. **Decision Service**: Functional grouping
   - Belongs to one Automation
   - Contains multiple Assets
   - Has API endpoint and analytics

3. **Asset**: Reusable component
   - Belongs to one Service
   - Can have sub-assets (parent-child relationship)
   - Types: Decision Models, ML Models, Task Models, Rules, etc.

4. **Sub-Asset**: Nested within parent assets
   - Task Models contain: Ruleflows, Functions, Artifacts
   - Reference parent via `parentAssetId`

---

## Getting Started

### Installation

The data layer is already integrated into your project. No additional installation required.

### Basic Import

```typescript
import {
  // Lookup functions
  getAutomations,
  getServicesByAutomationId,
  getAllAssets,
  
  // Types
  type DecisionAutomation,
  type DecisionService,
  type Asset,
} from '@/data/automations';
```

### Using React Hooks

```typescript
import {
  useAutomations,
  useServices,
  useTaskModelCounts,
} from '@/data/hooks';

function MyComponent() {
  const { automations } = useAutomations();
  // Use automations...
}
```

---

## Data Structure

### Decision Automation

```typescript
interface DecisionAutomation {
  id: string;
  name: string;
  displayName?: string;
  description: string;
  status: 'draft' | 'deployed' | 'archived';
  variant: 'standard' | 'ai-generated';
  
  // Relationships
  serviceIds: string[];  // Array of service IDs
  
  // Metadata
  tags: Tag[];
  industry?: string;
  branch?: string;
  
  // Timestamps
  createdDate: string;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  
  // Analytics
  executionCount?: number;
  lastExecuted?: string;
}
```

### Decision Service

```typescript
interface DecisionService {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'deployed' | 'archived';
  type: 'decision-service' | 'ml-service' | 'rule-service';
  
  // Relationships
  automationId: string;  // Parent automation
  assetIds: string[];    // Child assets
  
  // API Configuration
  endpoint?: string;
  authentication?: 'oauth' | 'api-key' | 'none';
  
  // Analytics
  requestCount?: number;
  avgResponseTime?: number;  // milliseconds
  successRate?: number;      // percentage
}
```

### Asset Types

Assets use a **discriminated union** pattern for type safety:

```typescript
type Asset =
  | TaskModelAsset
  | DecisionModelAsset
  | RuleModelAsset
  | MLModelAsset
  | RuleflowAsset
  | FunctionAsset
  | PolicyAsset
  | DashboardAsset
  | DataModelAsset;
```

Each asset type has specific properties but shares a common base:

```typescript
interface BaseAsset {
  id: string;
  name: string;
  type: AssetType;
  status: 'draft' | 'deployed' | 'archived';
  
  // Relationships
  serviceId: string;        // Parent service
  parentAssetId?: string;   // For nested assets
  dependencies?: string[];  // Other assets referenced
  
  // Metadata
  tags: Tag[];
  createdDate: string;
  lastUpdatedDate: string;
}
```

---

## Usage Guide

### 1. Get All Automations

```typescript
import { getAutomations } from '@/data/automations';

const allAutomations = getAutomations();
console.log(`Found ${allAutomations.length} automations`);
```

### 2. Filter Automations

```typescript
// Get deployed automations
const deployed = getAutomations({ status: 'deployed' });

// Get AI-generated automations
const aiGenerated = getAutomations({ variant: 'ai-generated' });

// Search by text
const searchResults = getAutomations({ search: 'credit' });

// Combine filters
const filtered = getAutomations({
  status: 'deployed',
  industry: 'Banking',
  search: 'risk',
});
```

### 3. Get Services for an Automation

```typescript
import { getServicesByAutomationId } from '@/data/automations';

const services = getServicesByAutomationId('automation-6-24-20');
console.log(`Found ${services.length} services`);
```

### 4. Get Assets for a Service

```typescript
import { getAllAssets } from '@/data/automations';

const assets = getAllAssets('service-credit-risk');
console.log(`Found ${assets.length} assets`);
```

### 5. Get Task Model Counts

```typescript
import { getTaskModelCounts } from '@/data/automations';

const counts = getTaskModelCounts('asset-credit-tm-001');
// Returns: {
//   artifacts: 3,
//   functions: 8,
//   ruleflows: 2,
//   errors: 3,
//   dependencies: 2
// }
```

### 6. Get Sub-Assets

```typescript
import { getSubAssets } from '@/data/automations';

// Get all functions in a task model
const functions = getSubAssets('asset-credit-tm-001')
  .filter(asset => asset.type === 'function');
```

### 7. Sort Results

```typescript
import { getAutomations, sortAutomations } from '@/data/automations';

const automations = getAutomations();
const sorted = sortAutomations(automations, {
  field: 'lastUpdatedDate',
  direction: 'desc',
});
```

---

## React Hooks

### useAutomations

Get filtered and sorted automations with automatic memoization.

```typescript
import { useAutomations } from '@/data/hooks';

function AutomationsList() {
  const { automations, count } = useAutomations({
    filter: { status: 'deployed' },
    sort: { field: 'lastUpdatedDate', direction: 'desc' },
  });
  
  return (
    <div>
      <h1>Deployed Automations ({count})</h1>
      {automations.map(auto => (
        <div key={auto.id}>{auto.name}</div>
      ))}
    </div>
  );
}
```

### useServices

Get services with automatic filtering and memoization.

```typescript
import { useServices } from '@/data/hooks';

function ServicesList({ automationId }: { automationId: string }) {
  const { services, count } = useServices({ automationId });
  
  return (
    <div>
      <h2>Services ({count})</h2>
      {services.map(svc => (
        <div key={svc.id}>
          {svc.name} - {svc.type}
        </div>
      ))}
    </div>
  );
}
```

### useTaskModelCounts

Get counts for task model tabs with badges.

```typescript
import { useTaskModelCounts } from '@/data/hooks';

function TaskModelTabs({ taskModelId }: { taskModelId: string }) {
  const { counts } = useTaskModelCounts(taskModelId);
  
  return (
    <Tabs>
      <Tab>Artifacts ({counts.artifacts})</Tab>
      <Tab>Functions ({counts.functions})</Tab>
      <Tab>Error report ({counts.errors})</Tab>
      <Tab>Run</Tab>
      <Tab>Dependencies ({counts.dependencies})</Tab>
    </Tabs>
  );
}
```

---

## API Reference

### Automation Functions

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `getAutomations()` | `filter?: AutomationFilter` | `DecisionAutomation[]` | Get filtered automations |
| `getAutomationById()` | `id: string` | `DecisionAutomation \| undefined` | Get automation by ID |
| `getAutomationStatistics()` | `id: string` | `AutomationStatistics \| undefined` | Get automation stats |
| `sortAutomations()` | `automations, sortOptions` | `DecisionAutomation[]` | Sort automations |

### Service Functions

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `getServices()` | `filter?: ServiceFilter` | `DecisionService[]` | Get filtered services |
| `getServiceById()` | `id: string` | `DecisionService \| undefined` | Get service by ID |
| `getServicesByAutomationId()` | `automationId: string` | `DecisionService[]` | Get services for automation |
| `getServiceStatistics()` | `id: string` | `ServiceStatistics \| undefined` | Get service stats |
| `sortServices()` | `services, sortOptions` | `DecisionService[]` | Sort services |

### Asset Functions

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `getAssets()` | `filter?: AssetFilter` | `Asset[]` | Get filtered assets |
| `getAssetById()` | `id: string` | `Asset \| undefined` | Get asset by ID |
| `getAllAssets()` | `serviceId: string` | `Asset[]` | Get all assets for service |
| `getSubAssets()` | `parentAssetId: string` | `Asset[]` | Get sub-assets |
| `getTaskModelCounts()` | `taskModelId: string` | `TaskModelCounts` | Get counts for tabs |
| `sortAssets()` | `assets, sortOptions` | `Asset[]` | Sort assets |

---

## Extending the Data Layer

### Adding a New Asset Type

1. **Define the Type** in `types.ts`:

```typescript
export interface NewAssetType extends BaseAsset {
  type: 'new-asset-type';
  
  // Add specific properties
  customProperty: string;
  customMetrics?: number;
}

// Add to union type
export type Asset = 
  | TaskModelAsset
  | NewAssetType  // Add here
  | ...
```

2. **Create Mock Data** in `assets.ts` or `assets-extended.ts`:

```typescript
export const newAssets: NewAssetType[] = [
  {
    id: 'asset-new-001',
    name: 'Example New Asset',
    type: 'new-asset-type',
    status: 'deployed',
    serviceId: 'service-example',
    customProperty: 'value',
    // ... other properties
  },
];
```

3. **Update Lookups** if needed in `lookups.ts`

4. **TypeScript will enforce** the new type everywhere it's used!

### Adding New Properties

Simply add to the relevant interface in `types.ts`. TypeScript will catch any missing implementations.

---

## Best Practices

### ✅ DO

- Use the provided hooks in React components
- Filter data as early as possible
- Use TypeScript for type safety
- Leverage memoization with `useMemo`
- Use discriminated unions for asset type checking

### ❌ DON'T

- Modify the raw data arrays directly
- Store derived data (calculate it on demand)
- Duplicate entity data (use IDs for references)
- Skip type annotations (use the provided types)

### Performance Tips

1. **Use Specific Lookups**: `getServicesByAutomationId()` is faster than filtering all services
2. **Memoize Expensive Calculations**: Use `useMemo` for sorting/filtering
3. **Filter Early**: Apply filters before sorting
4. **Use React Hooks**: They handle memoization for you

### Type Safety Example

```typescript
// TypeScript knows the asset type!
function renderAsset(asset: Asset) {
  if (asset.type === 'task-model') {
    // TypeScript narrows to TaskModelAsset
    console.log(asset.errorCount);  // ✅ Works
    console.log(asset.accuracy);     // ❌ Error: not on TaskModelAsset
  }
  
  if (asset.type === 'ml-model') {
    // TypeScript narrows to MLModelAsset
    console.log(asset.accuracy);     // ✅ Works
    console.log(asset.errorCount);   // ❌ Error: not on MLModelAsset
  }
}
```

---

## Migration Guide

### Updating Existing Code

**Before:**
```typescript
// Hardcoded data in component
const automations = [
  { id: 'test-1', name: 'Test 1', ... },
  { id: 'test-2', name: 'Test 2', ... },
];
```

**After:**
```typescript
import { useAutomations } from '@/data/hooks';

function MyComponent() {
  const { automations } = useAutomations();
  // Data is centralized and type-safe!
}
```

---

## Future Enhancements

This data layer is designed to evolve:

- **Backend Integration**: Replace mock data with API calls
- **Caching**: Add React Query or SWR for caching
- **Real-time Updates**: WebSocket support for live data
- **Optimistic Updates**: Client-side mutations
- **Offline Support**: IndexedDB caching
- **Data Validation**: Zod or Yup schemas

---

## Questions?

For questions or issues with the data layer:

1. Check this README
2. Review the inline documentation in the source files
3. Look at the usage examples in `/data/hooks/`
4. Check the type definitions in `/data/automations/types.ts`

---

**Built with ❤️ for scalable Decision Intelligence applications**
