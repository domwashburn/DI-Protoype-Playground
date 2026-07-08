# Data Layer Architecture

## Executive Summary

A production-grade, normalized data layer for Decision Intelligence applications built with scalability, type safety, and performance in mind.

**Built by**: Senior UI Architect with UX Engineering expertise  
**Purpose**: Provide a single source of truth for Decision Automations, Services, and Assets  
**Status**: ✅ Production-ready for prototypes  

---

## Design Philosophy

### 1. Normalized Data Architecture

**Problem**: Nested data structures lead to duplication and sync issues.

**Solution**: Entities reference each other by ID, creating a normalized relational structure.

```typescript
// ❌ BAD: Nested/Denormalized
const automation = {
  id: 'auto-1',
  name: 'My Automation',
  services: [
    {
      id: 'svc-1',
      name: 'My Service',
      assets: [
        { id: 'asset-1', name: 'Asset 1' },
        { id: 'asset-2', name: 'Asset 2' },
      ]
    }
  ]
}

// ✅ GOOD: Normalized
const automation = {
  id: 'auto-1',
  name: 'My Automation',
  serviceIds: ['svc-1', 'svc-2']  // References, not embedded objects
}

const service = {
  id: 'svc-1',
  name: 'My Service',
  automationId: 'auto-1',  // Back-reference
  assetIds: ['asset-1', 'asset-2']
}
```

**Benefits**:
- Single source of truth (no data duplication)
- Easy updates (change in one place)
- Predictable queries (always use lookup functions)
- Scalable (add millions of entities without nested traversal)

---

### 2. Type-Safe with Discriminated Unions

**Problem**: Different asset types have different properties.

**Solution**: Use TypeScript discriminated unions for compile-time safety.

```typescript
type Asset = 
  | TaskModelAsset
  | DecisionModelAsset
  | MLModelAsset
  // ... more types

// TypeScript knows which properties exist!
function renderAsset(asset: Asset) {
  if (asset.type === 'task-model') {
    // ✅ TypeScript knows: asset is TaskModelAsset
    console.log(asset.errorCount);  // Valid!
    // ❌ TypeScript error: accuracy doesn't exist on TaskModelAsset
    // console.log(asset.accuracy);
  }
  
  if (asset.type === 'ml-model') {
    // ✅ TypeScript knows: asset is MLModelAsset
    console.log(asset.accuracy);  // Valid!
  }
}
```

**Benefits**:
- Compile-time type checking
- IDE autocomplete for all properties
- Impossible states are unrepresentable
- Refactoring confidence

---

### 3. Composable and Extensible

**Problem**: Requirements change, new asset types are needed.

**Solution**: Modular architecture with clear extension points.

```typescript
// Adding a new asset type:

// 1. Define the type
export interface NewAssetType extends BaseAsset {
  type: 'new-asset-type';
  customProperty: string;
}

// 2. Add to union
export type Asset = 
  | TaskModelAsset
  | NewAssetType  // ← Add here
  | ...

// 3. Create mock data
export const newAssets: NewAssetType[] = [...]

// 4. Done! TypeScript enforces it everywhere.
```

**Benefits**:
- Add features without breaking existing code
- Clear boundaries between modules
- Easy to understand and maintain
- Future-proof architecture

---

### 4. Performance-Optimized

**Problem**: Recalculating filters and lookups on every render is slow.

**Solution**: Efficient lookups + React hooks with memoization.

```typescript
// Lookup functions are O(1) or O(n) with early returns
export function getServicesByAutomationId(automationId: string) {
  return decisionServices.filter(s => s.automationId === automationId);
  // Only iterates services, not all data
}

// React hooks use useMemo to prevent recalculation
export function useServices(options) {
  const services = useMemo(() => {
    return getServices(options.filter);
  }, [options.filter]); // Only recalculates when filter changes
  
  return { services };
}
```

**Benefits**:
- Fast lookups (no nested traversal)
- Memoized results (prevent unnecessary recalculation)
- Lazy evaluation (only compute what's needed)
- Scales to thousands of entities

---

## Architecture Layers

### Layer 1: Type Definitions

**File**: `shared/types.ts`  
**Purpose**: Define all TypeScript interfaces and types

```
shared/types.ts
  ├─ BaseMetadata (shared by all entities)
  ├─ DecisionAutomation
  ├─ DecisionService
  ├─ Asset types (BaseAsset, Function, DataModel, MLModel, RuleModel, etc.)
  ├─ Filter types (AutomationFilter, ServiceFilter, etc.)
  └─ Utility types (AssetCounts, Statistics, etc.)
```

**Principles**:
- Shared base types (DRY)
- Discriminated unions for variants
- Optional vs required properties clearly marked
- Comprehensive JSDoc comments

---

### Layer 2: Data Storage

**Structure**: Registry-based with human-readable folder names  
**Purpose**: Store mock data in a normalized, modular structure

```
registry/
  ├─ automation-6-24-20/
  │   ├─ automation.ts
  │   └─ services/
  │       ├─ credit-risk-assessment/
  │       │   ├─ service.ts
  │       │   ├─ data-models.ts
  │       │   ├─ ml-models.ts
  │       │   ├─ rule-models.ts
  │       │   └─ functions/
  │       └─ fraud-detection/
  ├─ claims-processing-automation/
  └─ [8 more automations...]
```

**Principles**:
- Realistic mock data
- Relationships via IDs
- Complete metadata
- Representative of production data
- Barrel export pattern for clean imports

---

### Layer 3: Lookup Functions

**File**: `lookups.ts`  
**Purpose**: Query and filter data efficiently

```typescript
// Query patterns:
getAutomations(filter?)       // Get all with optional filter
getAutomationById(id)         // Get one by ID
getServicesByAutomationId(id) // Get related entities
sortAutomations(items, sort)  // Sort results

// Advanced queries:
getAssetHierarchy(assetId)    // Get full tree
getAssetBreadcrumb(assetId)   // Get navigation path
```

**Principles**:
- Pure functions (no side effects)
- Consistent API (same pattern for all entities)
- Efficient (minimize iterations)
- Composable (small functions, combine as needed)

---

### Layer 4: React Hooks

**Files**: `useAutomations.ts`, `useServices.ts`, etc. (in `/data/hooks/`)  
**Purpose**: React integration with state management

```typescript
// Hook patterns:
useAutomations(options)      // List with filters
useAutomation(id)            // Single entity
useAutomationStats(id)       // Computed stats

// Specialized hooks:
useServiceAssets(serviceId)  // For relationships
```

**Principles**:
- Memoized results (useMemo)
- Consistent API (same options pattern)
- Loading/error states (ready for async)
- Type-safe (full TypeScript)

---

### Layer 5: Main Export

**File**: `index.ts`  
**Purpose**: Single entry point for consumers

```typescript
// One import, everything available:
import {
  // Types
  type DecisionAutomation,
  type Asset,
  
  // Lookup functions
  getAutomations,
  getServices,
  
  // Convenience
  getAllData,
  globalSearch,
} from '@/data/automations';
```

**Principles**:
- Single import location
- Organized exports
- Re-export from sub-modules
- Clear naming

---

## Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    React Component                   │
│                                                      │
│  const { automations } = useAutomations({ ... })    │
└──────────────────────┬───────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│                    React Hook                        │
│                  (useAutomations)                    │
│                                                      │
│  useMemo(() => getAutomations(filter), [filter])    │
└──────────────────────┬───────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│                  Lookup Function                     │
│                  (getAutomations)                    │
│                                                      │
│  1. Filter automations array                         │
│  2. Apply search term                                │
│  3. Return results                                   │
└──────────────────────┬───────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│                     Data Store                       │
│                   (registry/)                        │
│                                                      │
│  export const automation = {...}                    │
└─────────────────────────────────────────────────────┘
```

---

## Scalability Considerations

### Current Capacity

| Entity | Count | Notes |
|--------|-------|-------|
| Automations | 9 | Manageable in memory |
| Services | 23 | 2-3 per automation |
| Assets | ~100+ | Multiple types, nested |

**Performance**: All operations are sub-millisecond with current data size.

### Scaling to Production

When scaling to 10,000+ entities:

1. **Pagination**: Implement virtual scrolling or pagination
2. **Indexing**: Add Map-based indexes for O(1) lookups
3. **Lazy Loading**: Load sub-assets on demand
4. **API Integration**: Replace mock data with API calls
5. **Caching**: Add React Query or SWR for smart caching

Example index optimization:

```typescript
// Create index for O(1) lookup
const servicesByAutomationIndex = new Map<string, DecisionService[]>();
decisionServices.forEach(service => {
  const services = servicesByAutomationIndex.get(service.automationId) || [];
  services.push(service);
  servicesByAutomationIndex.set(service.automationId, services);
});

// O(1) lookup instead of O(n) filter
export function getServicesByAutomationId(automationId: string) {
  return servicesByAutomationIndex.get(automationId) || [];
}
```

---

## Testing Strategy

### Unit Tests

Test lookup functions in isolation:

```typescript
describe('getAutomations', () => {
  it('filters by status', () => {
    const result = getAutomations({ status: 'deployed' });
    expect(result.every(a => a.status === 'deployed')).toBe(true);
  });
  
  it('searches by name', () => {
    const result = getAutomations({ search: 'credit' });
    expect(result.length).toBeGreaterThan(0);
  });
});
```

### Integration Tests

Test React hooks with Testing Library:

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useAutomations } from './useAutomations';

describe('useAutomations', () => {
  it('returns all automations', () => {
    const { result } = renderHook(() => useAutomations());
    expect(result.current.automations.length).toBeGreaterThan(0);
  });
  
  it('filters automations', () => {
    const { result } = renderHook(() => 
      useAutomations({ filter: { status: 'deployed' } })
    );
    expect(result.current.automations.every(a => a.status === 'deployed')).toBe(true);
  });
});
```

### E2E Tests

Test complete user flows:

```typescript
describe('Automation List Page', () => {
  it('displays all automations', async () => {
    render(<DecisionAutomationsPage />);
    const cards = await screen.findAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);
  });
  
  it('filters by status', async () => {
    render(<DecisionAutomationsPage />);
    const filter = screen.getByLabelText('Status');
    await userEvent.selectOptions(filter, 'deployed');
    // Verify filtered results
  });
});
```

---

## Production Readiness Checklist

### ✅ Completed

- [x] Normalized data structure
- [x] Full TypeScript coverage
- [x] Comprehensive types
- [x] Lookup functions
- [x] React hooks
- [x] Memoization
- [x] Documentation
- [x] Example integration
- [x] Extension guide
- [x] Registry architecture
- [x] Two-level local variables system

### 🔄 Future Enhancements

- [ ] Unit test coverage
- [ ] API integration layer
- [ ] Caching strategy
- [ ] Optimistic updates
- [ ] Error handling
- [ ] Loading states
- [ ] Retry logic
- [ ] Offline support

---

## Comparison to Alternatives

### vs Redux

| Feature | This Architecture | Redux |
|---------|------------------|-------|
| Setup Complexity | Low (just import hooks) | High (store, reducers, actions) |
| Boilerplate | Minimal | Significant |
| Type Safety | Excellent (discriminated unions) | Good (with Redux Toolkit) |
| Learning Curve | Low (just hooks) | Medium-High |
| Performance | Excellent (memoized) | Excellent |
| Best For | Prototypes, read-heavy apps | Complex state, write-heavy |

**Verdict**: Perfect for prototypes and Decision Intelligence dashboards. Redux better for complex state management with frequent writes.

### vs React Query

| Feature | This Architecture | React Query |
|---------|------------------|-------------|
| Data Source | Local (mock data) | Remote (APIs) |
| Caching | Manual (useMemo) | Automatic |
| Refetching | N/A (static data) | Automatic |
| Mutations | N/A | Built-in |
| Offline | Always works | Requires setup |
| Best For | Prototypes, demos | Production apps |

**Verdict**: Use this for prototypes with mock data. Add React Query later when integrating real APIs.

### vs GraphQL/Apollo

| Feature | This Architecture | GraphQL/Apollo |
|---------|------------------|----------------|
| Query Language | JavaScript functions | GraphQL |
| Type Safety | Excellent | Excellent (with codegen) |
| Setup | Minimal | Complex |
| Network | N/A (local) | HTTP/WebSocket |
| Caching | Simple | Advanced |
| Best For | Prototypes | Large-scale production |

**Verdict**: This is simpler for prototypes. GraphQL better for large production apps with complex data requirements.

---

## Conclusion

This data layer provides a **production-ready foundation** for Decision Intelligence prototypes with:

✅ **Enterprise-grade architecture** (normalized, type-safe, performant)  
✅ **Developer experience** (intuitive API, great docs)  
✅ **Scalability** (clear path to production)  
✅ **Maintainability** (modular, well-documented)  

**Use this for**: Prototypes, demos, MVPs, design validation  
**Upgrade to**: API integration, caching, real-time updates for production  

---

**Questions? See `/data/automations/README.md` for complete documentation.**
