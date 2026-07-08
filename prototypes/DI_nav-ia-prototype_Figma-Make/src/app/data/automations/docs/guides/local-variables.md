# Local Variables System

## Overview

The registry architecture includes a **two-level local variables system** for managing constants and configuration values across automation functions. This provides clear scope and organization for service-level and function-level constants.

## Architecture

### Two Levels of Local Variables

1. **Service-level constants** - Shared across all functions in a service
2. **Function-level constants** - Specific to individual functions

```
services/
  credit-risk-assessment/
    functions/
      local-variables.ts          ← Service-level constants
      calculate-risk-score/
        function.ts
        local-variables.ts        ← Function-level constants
      credit-score-checker/
        function.ts
        local-variables.ts        ← Function-level constants
```

## Service-Level Local Variables

**Location**: `services/[service-name]/functions/local-variables.ts`

**Purpose**: Constants used by multiple functions within the service

**Example**:
```typescript
// /services/credit-risk-assessment/functions/local-variables.ts

/**
 * Service-level Local Variables
 * Credit Risk Assessment Service
 * 
 * These constants are shared across all functions in this service.
 */

// Risk thresholds
export const HIGH_RISK_THRESHOLD = 0.7;
export const MEDIUM_RISK_THRESHOLD = 0.4;
export const LOW_RISK_THRESHOLD = 0.2;

// Credit limits
export const DEFAULT_CREDIT_LIMIT = 5000;
export const MAX_CREDIT_LIMIT = 100000;
export const MIN_CREDIT_LIMIT = 1000;

// Processing timeouts
export const API_TIMEOUT_MS = 5000;
export const BATCH_SIZE = 100;
```

## Function-Level Local Variables

**Location**: `services/[service-name]/functions/[function-name]/local-variables.ts`

**Purpose**: Constants specific to a single function

**Example**:
```typescript
// /services/credit-risk-assessment/functions/calculate-risk-score/local-variables.ts

/**
 * Function-level Local Variables
 * Calculate Risk Score Function
 * 
 * These constants are specific to the risk score calculation.
 */

// Score weights
export const CREDIT_SCORE_WEIGHT = 0.4;
export const INCOME_WEIGHT = 0.3;
export const DEBT_RATIO_WEIGHT = 0.2;
export const HISTORY_WEIGHT = 0.1;

// Calculation parameters
export const MIN_CREDIT_SCORE = 300;
export const MAX_CREDIT_SCORE = 850;
export const INCOME_MULTIPLIER = 3.5;

// Validation rules
export const MIN_INCOME_REQUIRED = 15000;
export const MAX_DEBT_RATIO = 0.43;
```

## Importing Local Variables

### From Function Files

```typescript
// /services/credit-risk-assessment/functions/calculate-risk-score/function.ts

import {
  HIGH_RISK_THRESHOLD,
  DEFAULT_CREDIT_LIMIT,
} from '../local-variables'; // Service-level

import {
  CREDIT_SCORE_WEIGHT,
  INCOME_WEIGHT,
  MIN_CREDIT_SCORE,
} from './local-variables'; // Function-level

export const calculateRiskScore: Function = {
  id: 'calculate-risk-score',
  // ... metadata
  
  execute: (data) => {
    const weightedScore = 
      (data.creditScore * CREDIT_SCORE_WEIGHT) +
      (data.income * INCOME_WEIGHT);
    
    if (weightedScore > HIGH_RISK_THRESHOLD) {
      return DEFAULT_CREDIT_LIMIT;
    }
    // ... calculation logic
  }
};
```

### From Other Services

Services should not directly import local variables from other services. If constants need to be shared across services, they should be moved to a shared location:

```typescript
// /data/automations/shared/constants.ts
export const GLOBAL_TIMEOUT_MS = 5000;
export const BATCH_PROCESSING_SIZE = 100;
```

## Benefits

### ✅ Clear Scope
- Service-level vs function-level constants are clearly separated
- Easy to find where constants are defined
- Reduces confusion about where to add new constants

### ✅ Maintainability
- Constants are co-located with the code that uses them
- Easy to update without affecting other parts of the system
- Self-documenting through file structure

### ✅ Reusability
- Service-level constants can be shared across functions
- Function-level constants keep implementations independent
- Clear boundaries prevent tight coupling

### ✅ Type Safety
- All constants are exported with TypeScript types
- IDE autocomplete for all constant names
- Compile-time checking for typos

## Best Practices

### 1. Use Descriptive Names
```typescript
// ✅ Good
export const HIGH_RISK_THRESHOLD = 0.7;
export const MAX_CREDIT_LIMIT = 100000;

// ❌ Bad
export const THRESHOLD = 0.7;
export const LIMIT = 100000;
```

### 2. Group Related Constants
```typescript
// Risk thresholds
export const HIGH_RISK_THRESHOLD = 0.7;
export const MEDIUM_RISK_THRESHOLD = 0.4;
export const LOW_RISK_THRESHOLD = 0.2;

// Credit limits
export const DEFAULT_CREDIT_LIMIT = 5000;
export const MAX_CREDIT_LIMIT = 100000;
export const MIN_CREDIT_LIMIT = 1000;
```

### 3. Add JSDoc Comments
```typescript
/**
 * High risk threshold
 * Applicants with risk score above this value are considered high risk
 */
export const HIGH_RISK_THRESHOLD = 0.7;
```

### 4. Use Appropriate Level
- **Service-level**: Constants used by multiple functions
- **Function-level**: Constants used by only one function

### 5. Consider Environment Variables
For values that change between environments (dev/staging/prod), consider using environment variables instead:

```typescript
export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

## Migration Guide

### Adding Local Variables to Existing Service

1. Create service-level local variables file:
```bash
touch services/my-service/functions/local-variables.ts
```

2. Add shared constants:
```typescript
// services/my-service/functions/local-variables.ts
export const SHARED_CONSTANT = 'value';
```

3. Create function-level local variables:
```bash
touch services/my-service/functions/my-function/local-variables.ts
```

4. Add function-specific constants:
```typescript
// services/my-service/functions/my-function/local-variables.ts
export const FUNCTION_CONSTANT = 'value';
```

5. Import in function files:
```typescript
import { SHARED_CONSTANT } from '../local-variables';
import { FUNCTION_CONSTANT } from './local-variables';
```

## Examples from Registry

### automation-6-24-20 (Credit Risk Assessment)
```
services/
  credit-risk-assessment/
    functions/
      local-variables.ts          ← Service-level
      calculate-risk-score/
        local-variables.ts        ← Function-level
      credit-score-checker/
        local-variables.ts        ← Function-level
      validate-income/
        local-variables.ts        ← Function-level
```

### dynamic-pricing-automation
```
services/
  pricing-engine/
    functions/
      local-variables.ts          ← Service-level
      calculate-price/
        local-variables.ts        ← Function-level
      apply-discounts/
        local-variables.ts        ← Function-level
```

## See Also

- [Architecture Overview](../architecture/architecture.md) - Registry architecture
- [Migration Guide](../migration/migration-guide.md) - Migrating to registry
- [Quick Reference](../reference/quick-reference.md) - API reference
