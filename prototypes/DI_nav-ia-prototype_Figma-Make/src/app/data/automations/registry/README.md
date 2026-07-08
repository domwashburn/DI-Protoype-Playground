

# Decision Automations Registry

This directory contains all decision automation data organized in a maintainable, modular structure.

## Directory Structure

Each automation has its own directory with human-readable names. Hash IDs are defined as data properties, not folder names.

```
/registry
  /automation-6-24-20                        # Human-readable folder name
    automation.ts                            # Automation metadata (includes hashId: 'a6k2p')
    index.ts                                 # Barrel export
    
    /services                                # Services for this automation
      /credit-risk-assessment                # Human-readable service folder
        service.ts                           # Service metadata (includes hashId: 'scr1k')
        data-models.ts                       # Data models for this service
        
        # Asset files (grouped by type)
        decision-models.ts                   # Decision model assets
        rule-models.ts                       # Rule model assets
        ml-models.ts                         # ML model assets
        task-models.ts                       # Task model assets
        
        /functions                           # Service functions
          local-variables.ts                 # Service-level local variables (shared)
          
          /credit-score-checker              # Individual function directory
            function.ts                      # Function metadata (includes hashId: 'fn01k')
            schema.ts                        # Input/output schemas
            local-variables.ts               # Function-scoped local variables
            index.ts                         # Function barrel export
          /validate-income
            # ... same structure
          index.ts                           # Functions barrel export
          
        index.ts                             # Service barrel export
        
      /fraud-detection                       # Another service
        # ... same structure
        
      index.ts                               # Services barrel export
      
    index.ts                                 # Automation barrel export
```

## Key Principles

### 1. Human-Readable Folder Names

**✅ DO:**
- Use descriptive, human-readable folder names
- Use kebab-case: `automation-6-24-20`, `credit-risk-assessment`
- Names match the human-readable IDs in the data

**❌ DON'T:**
- Use hash IDs as folder names (`a6k2p/`, `scr1k/`)
- Makes navigation impossible for humans

### 2. Hash IDs as Data Properties

Hash IDs are defined as properties in the data files:

```typescript
// automation.ts
export const automation: DecisionAutomation = {
  id: 'automation-6-24-20',    // Human-readable (matches folder name)
  hashId: 'a6k2p',              // Short hash for URLs
  // ...
};
```

### 3. Asset Organization - Option B

Assets are grouped by type in separate files:

- `decision-models.ts` - All decision model assets
- `rule-models.ts` - All rule model assets  
- `ml-models.ts` - All ML model assets
- `task-models.ts` - All task model assets

**Benefits:**
- Easy to find all assets of a specific type
- Single file per asset type keeps things organized
- More maintainable than one giant `assets.ts` file
- Less granular than individual asset directories (good balance)

### 4. Functions in Subdirectories

Functions follow the same pattern as the main Guidelines:

```
/functions
  /credit-score-checker          # Individual function directory
    function.ts                  # Function metadata
    schema.ts                    # Input/output schemas
    index.ts                     # Barrel export
  /validate-income
    # ...
  index.ts                       # Functions barrel export
```

### 5. Local Variables for Functions

**Two levels of local variables:**

**Service-Level Local Variables** (`/functions/local-variables.ts`):
- Shared constants across all functions in a service
- Credit score thresholds, risk categories, API config
- Common validation rules and configuration

**Function-Level Local Variables** (`/functions/<function-name>/local-variables.ts`):
- Scoped to specific function only
- Function-specific thresholds, mappings, error messages
- Configuration specific to that function's logic

**Example - Service Level:**
```typescript
// /functions/local-variables.ts
export const CREDIT_SCORE_THRESHOLDS = {
  EXCELLENT: 750,
  GOOD: 700,
  MINIMUM: 550,
} as const;

export const RISK_CATEGORIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;
```

**Example - Function Level:**
```typescript
// /functions/credit-score-checker/local-variables.ts
export const FACTOR_CODES = {
  UTIL: { code: 'UTIL', name: 'Credit Utilization' },
  PAY: { code: 'PAY', name: 'Payment History' },
} as const;

export const BUREAU_ENDPOINTS = {
  equifax: 'https://api.equifax.com/v1/credit-score',
  experian: 'https://api.experian.com/v1/credit-score',
} as const;
```

**Why Two Levels?**
- **Service-level**: Shared constants prevent duplication
- **Function-level**: Isolates function-specific config
- Clear separation of concerns
- Easy to find and update

### 6. Barrel Exports

Every directory has an `index.ts` barrel export:

```typescript
// Service index.ts
export { service } from './service';
export { dataModels } from './data-models';
export { decisionModels } from './decision-models';
export { ruleModels } from './rule-models';
export { mlModels } from './ml-models';
export { taskModels } from './task-models';
export * as functions from './functions';

// Functions index.ts
export * as localVariables from './local-variables'; // Service-level
export * as creditScoreChecker from './credit-score-checker';

// Function index.ts
export { func } from './function';
export { inputSchema, outputSchema } from './schema';
export * as localVariables from './local-variables'; // Function-level
```

## Usage Examples

### Import Entire Automation

```typescript
import * as creditRisk from './data/automations/registry/automation-6-24-20';

// Access automation
console.log(creditRisk.automation.displayName);

// Access specific service
console.log(creditRisk.services.creditRiskAssessment.service.name);

// Access data models
console.log(creditRisk.services.creditRiskAssessment.dataModels);

// Access specific asset type
console.log(creditRisk.services.creditRiskAssessment.mlModels);

// Access all assets (aggregated)
console.log(creditRisk.services.creditRiskAssessment.allAssets);

// Access functions
console.log(creditRisk.services.creditRiskAssessment.functions.creditScoreChecker.func);

// Access service-level local variables (shared across functions)
console.log(creditRisk.services.creditRiskAssessment.functions.localVariables.CREDIT_SCORE_THRESHOLDS);

// Access function-level local variables (specific to function)
console.log(creditRisk.services.creditRiskAssessment.functions.creditScoreChecker.localVariables.FACTOR_CODES);
```

### Import Specific Service

```typescript
import { 
  service, 
  dataModels, 
  mlModels,
  allAssets 
} from './data/automations/registry/automation-6-24-20/services/credit-risk-assessment';

console.log(service.displayName);
console.log(dataModels.length);
console.log(mlModels[0].accuracy);
console.log(allAssets.length); // All assets aggregated
```

### Import Specific Function

```typescript
import { 
  func, 
  inputSchema, 
  outputSchema,
  localVariables 
} from './data/automations/registry/automation-6-24-20/services/credit-risk-assessment/functions/credit-score-checker';

console.log(func.displayName);
console.log(inputSchema.properties);
console.log(outputSchema.properties);
console.log(localVariables.FACTOR_CODES);
console.log(localVariables.BUREAU_ENDPOINTS);
```

### Import Service-Level Local Variables

```typescript
import { localVariables } from './data/automations/registry/automation-6-24-20/services/credit-risk-assessment/functions';

// Use shared constants across multiple functions
const minCreditScore = localVariables.CREDIT_SCORE_THRESHOLDS.MINIMUM;
const riskCategories = localVariables.RISK_CATEGORIES;
const dtiLimit = localVariables.DTI_LIMITS.ACCEPTABLE;
```

## Maintenance Operations

### Add New Automation

1. Create directory: `/registry/new-automation-name/`
2. Create `automation.ts` with automation metadata
3. Create `/services/` directory
4. Create service directories with asset type files
5. Create `index.ts` barrel exports at each level
6. Add to main aggregation in `/data/automations/index.ts`

### Duplicate Automation

```bash
# Copy entire directory
cp -r registry/automation-6-24-20 registry/new-credit-automation

# Update IDs in:
# - automation.ts (id, hashId)
# - services/*/service.ts (id, hashId, automationId)
# - services/*/assets files (id, hashId, serviceId)
# - services/*/functions/*/function.ts (id, hashId, serviceId)

# Add to main aggregation
```

### Delete Automation

```bash
# Remove directory
rm -rf registry/automation-to-delete

# Remove from main aggregation in /data/automations/index.ts
```

### Add Service to Automation

1. Create service directory: `/services/new-service/`
2. Create `service.ts`, `data-models.ts`, asset type files
3. Create `/functions/` directory if needed
4. Create `index.ts` barrel export
5. Add to `/services/index.ts`
6. Add service ID to automation's `serviceIds` array

### Add Asset to Service

1. Open appropriate asset type file (e.g., `ml-models.ts`)
2. Add new asset to the array
3. Add asset ID to service's `assetIds` array in `service.ts`

### Add Function to Service

1. Create function directory: `/functions/new-function/`
2. Create `function.ts` and `schema.ts`
3. Create `index.ts` barrel export
4. Add to `/functions/index.ts`
5. Add function ID to service's `functionIds` array

## Hash ID System

### Hash ID → Readable Name

Hash IDs are short 5-character identifiers for URLs and cross-referencing:

- Automation: `a6k2p` → `automation-6-24-20`
- Service: `scr1k` → `credit-risk-assessment`
- Function: `fn01k` → `credit-score-checker`
- Data Model: `dmcu1` → `customer-data-model`
- Asset: `acdm1` → `credit-decision-model`

### URL Usage

**Human-readable paths (primary navigation):**
```
/automations/automation-6-24-20
/automations/automation-6-24-20/services/credit-risk-assessment
```

**Shareable hash URLs (for copy/paste, external references):**
```
/automations?id=a6k2p
/automations/automation-6-24-20/services?id=scr1k
```

### Mappings

All hash ID mappings are maintained in `/shared/id-mappings.ts`:

```typescript
import { getHashId, getReadableId } from './shared/id-mappings';

// Get hash from readable
const hashId = getHashId('automations', 'automation-6-24-20'); // 'a6k2p'

// Get readable from hash
const readableId = getReadableId('automations', 'a6k2p'); // 'automation-6-24-20'
```

## Data Models Integration

Each service has a `data-models.ts` file that defines the data structures used by that service:

```typescript
// data-models.ts
export const dataModels: DataModel[] = [
  {
    id: 'customer-data-model',
    hashId: 'dmcu1',
    serviceId: 'credit-risk-assessment',
    schema: {
      type: 'object',
      properties: {
        customerId: { type: 'string' },
        creditScore: { type: 'number', minimum: 300, maximum: 850 },
        // ...
      },
      required: ['customerId'],
    },
  },
];
```

Assets and functions reference data models by ID:

```typescript
// In ml-models.ts
{
  id: 'credit-risk-ml-model',
  inputDataModelIds: ['customer-data-model', 'credit-application-data-model'],
  outputDataModelIds: ['risk-score-data-model'],
}

// In function.ts
{
  id: 'credit-score-checker',
  inputDataModelId: 'customer-data-model',
  outputDataModelId: 'risk-score-data-model',
}
```

## Migration Status

### Completed
- ✅ Infrastructure setup (`/shared/` directory with types, tags, id-mappings)
- ✅ Sample automation: `automation-6-24-20` (Credit Risk)
  - ✅ 2 services: credit-risk-assessment, fraud-detection
  - ✅ Data models integrated
  - ✅ Assets grouped by type
  - ✅ Functions in subdirectories
  - ✅ Full barrel export structure

### In Progress
- 🔄 Additional sample automations (customer-onboarding, claims-processing)

### Pending
- ⏳ Migrate remaining 12 automations
- ⏳ Update main aggregation (`/data/automations/index.ts`)
- ⏳ Update lookup functions to work with new structure
- ⏳ Update hooks to use new data structure
- ⏳ Archive old files

## Benefits

### Maintainability
✅ Easy to find - human-readable folder names  
✅ Easy to duplicate - copy directory, update IDs  
✅ Easy to delete - remove directory  
✅ Easy to understand - clear structure  

### Consistency
✅ Same pattern at all levels (automation, service, function)  
✅ Barrel exports throughout  
✅ Data models integrated at service level  

### Flexibility
✅ Assets grouped by type for easy access  
✅ Functions in subdirectories for extensibility  
✅ Hash IDs for short URLs and cross-references  
✅ Human-readable IDs for navigation and maintenance  

---

**Next Steps:** Complete migration of remaining automations and update main aggregation.
