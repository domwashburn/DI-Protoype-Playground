# Migration Guide: Registry Architecture

## Overview

This guide walks through migrating decision automations from the old monolithic file structure to the new registry-based architecture with human-readable folder names.

## Migration Status

✅ **Complete** - All 9 automations have been migrated to the registry architecture.

## Old Architecture (Deprecated)

```
/data/automations/
├── automations.ts          # Monolithic automations file
├── services.ts             # Monolithic services file
├── assets.ts               # Monolithic assets file
├── assets-extended.ts      # Extended assets
└── assets-sub.ts           # Sub-assets
```

## New Architecture (Current)

```
/data/automations/
├── registry/
│   ├── index.ts                              # Central aggregation
│   ├── automation-6-24-20/
│   │   ├── automation.ts
│   │   ├── index.ts
│   │   └── services/
│   │       ├── credit-risk-assessment/
│   │       │   ├── service.ts
│   │       │   ├── data-models.ts
│   │       │   ├── ml-models.ts
│   │       │   ├── rule-models.ts
│   │       │   ├── functions/
│   │       │   │   ├── local-variables.ts
│   │       │   │   └── calculate-risk-score/
│   │       │   └── index.ts
│   │       └── index.ts
│   └── [8 more automations...]
├── shared/
│   ├── types.ts            # Shared TypeScript types
│   ├── tags.ts             # Tag definitions
│   └── id-mappings.ts      # Hash ID mappings
├── index.ts                # Main export (uses registry)
└── lookups.ts              # Lookup functions (uses registry)
```

## Migration Steps

### Step 1: Understand Registry Structure

Each automation follows this structure:

```
automation-name/
  ├── automation.ts         # Automation metadata
  ├── index.ts              # Barrel export
  └── services/
      ├── service-name/
      │   ├── service.ts
      │   ├── data-models.ts
      │   ├── ml-models.ts
      │   ├── rule-models.ts
      │   ├── functions/
      │   │   ├── local-variables.ts
      │   │   ├── function-name/
      │   │   │   ├── function.ts
      │   │   │   └── local-variables.ts
      │   │   └── index.ts
      │   └── index.ts
      └── index.ts
```

### Step 2: Create Automation Directory

```bash
mkdir -p registry/my-automation/services
```

### Step 3: Create Automation Metadata

```typescript
// registry/my-automation/automation.ts
import type { DecisionAutomation } from '../../shared/types';
import { commonTags } from '../../shared/tags';

export const automation: DecisionAutomation = {
  id: 'my-automation',
  hashId: 'abc123',
  name: 'My Automation',
  displayName: 'My Automation',
  description: 'Description of my automation',
  status: 'deployed',
  variant: 'standard',
  serviceIds: ['service-1', 'service-2'],
  linkedObjectiveIds: [],
  tags: [commonTags[0]],
  industry: 'Finance',
  branch: 'main',
  createdDate: '2024-01-01T00:00:00.000Z',
  lastUpdatedDate: '2024-01-01T00:00:00.000Z',
  lastUpdatedBy: 'user@example.com',
  createdBy: 'user@example.com',
  version: '1.0.0',
  executionCount: 0,
  lastExecuted: '2024-01-01T00:00:00.000Z',
};
```

### Step 4: Create Service Directories

```bash
mkdir -p registry/my-automation/services/service-1/functions
```

### Step 5: Create Service Metadata

```typescript
// registry/my-automation/services/service-1/service.ts
import type { DecisionService } from '../../../../shared/types';

export const service: DecisionService = {
  id: 'service-1',
  hashId: 's1abc',
  name: 'Service 1',
  displayName: 'Service 1',
  description: 'Service description',
  status: 'deployed',
  type: 'decision-service',
  automationId: 'my-automation',
  assetIds: [],
  functionIds: [],
  dataModelIds: [],
  tags: [],
  branch: 'main',
  createdDate: '2024-01-01T00:00:00.000Z',
  lastUpdatedDate: '2024-01-01T00:00:00.000Z',
  lastUpdatedBy: 'user@example.com',
  createdBy: 'user@example.com',
  version: '1.0.0',
  endpoint: 'https://api.example.com/v1/service',
  authentication: 'oauth',
  requestCount: 0,
  avgResponseTime: 0,
  successRate: 100,
};
```

### Step 6: Create Asset Files

```typescript
// registry/my-automation/services/service-1/data-models.ts
import type { DataModel } from '../../../../shared/types';

export const dataModels: DataModel[] = [
  {
    id: 'data-model-1',
    hashId: 'dm1abc',
    name: 'Customer Data',
    displayName: 'Customer Data',
    description: 'Customer information',
    status: 'deployed',
    type: 'data-model',
    serviceId: 'service-1',
    tags: [],
    branch: 'main',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastUpdatedDate: '2024-01-01T00:00:00.000Z',
    lastUpdatedBy: 'user@example.com',
    createdBy: 'user@example.com',
    version: '1.0.0',
    schema: {
      fields: [
        { name: 'customerId', type: 'string', required: true },
        { name: 'name', type: 'string', required: true },
      ],
    },
  },
];
```

### Step 7: Create Barrel Exports

```typescript
// registry/my-automation/services/service-1/index.ts
export { service } from './service';
export { dataModels } from './data-models';
export { mlModels } from './ml-models';
export { ruleModels } from './rule-models';
export * as functions from './functions';

// registry/my-automation/services/index.ts
export * as service1 from './service-1';
export * as service2 from './service-2';

// registry/my-automation/index.ts
export { automation } from './automation';
export * as services from './services';
```

### Step 8: Verify Registry Aggregation

The central registry automatically aggregates all data:

```typescript
// registry/index.ts already handles aggregation
import * as automation1 from './automation-1';
import * as automation2 from './automation-2';

export const allAutomations = [
  automation1.automation,
  automation2.automation,
  // ...
];
```

## Backward Compatibility

All existing imports continue to work:

```typescript
// These still work!
import { decisionAutomations, decisionServices } from '@/data/automations';
import { getAutomationById } from '@/data/automations';
import { useAutomations } from '@/data/hooks';
```

## Benefits of Registry Architecture

### ✅ Human-Readable
- Folder names match automation names
- Easy to navigate
- Clear hierarchy

### ✅ Scalable
- Add automation: Create folder
- Registry auto-aggregates
- No central file to update

### ✅ Maintainable
- Clear module boundaries
- Easy to find code
- Documentation co-located

### ✅ Type-Safe
- Shared types enforce consistency
- TypeScript validates relationships
- Compile-time errors

## Common Issues

### Issue: TypeScript errors after migration

**Solution**: Ensure all imports use the correct paths:
```typescript
import type { DecisionAutomation } from '../../shared/types';
```

### Issue: Data not appearing in UI

**Solution**: Verify barrel exports are correct:
```typescript
// Each index.ts should export its module
export { automation } from './automation';
```

### Issue: Duplicate data

**Solution**: Ensure old files are deleted and only registry is used.

## See Also

- [Migration Complete](./migration-complete.md) - Final migration status
- [Cleanup Summary](./cleanup-summary.md) - What was deleted
- [Architecture Overview](../architecture/architecture.md) - Registry architecture details
- [Local Variables Guide](../guides/local-variables.md) - Using local variables
