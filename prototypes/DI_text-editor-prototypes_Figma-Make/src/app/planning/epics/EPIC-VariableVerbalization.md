# EPIC: Variable and Attribute Verbalization

**Epic ID:** EPIC-008  
**Epic Name:** Natural Language Variable References (Verbalization)  
**Status:** 📋 Planned  
**Priority:** Medium-High  
**Estimated Duration:** 8-12 days  
**Dependencies:** Evaluation Engine (Complete), Parser (Complete), Variable System (Complete)  
**Lead:** Senior Front End Architect  
**Created:** October 30, 2025  

---

## Executive Summary

Enable natural language references to variables and data model attributes using single-quoted strings (`'customer name'` instead of `$customerName`), making formulas more readable for business users and aligning with IBM ADS/ODM business rule syntax patterns. Each variable and attribute can have an optional plain-text verbalization that serves as an alias.

**Key Value:** Business users can write and understand formulas using natural language terms instead of technical variable names, lowering the barrier to entry for formula authoring.

---

## Vision

Enable formula authors to:
- **Assign verbalizations** to variables (`$customerName` → `'customer name'`)
- **Use verbalizations in formulas** - `'total revenue'` resolves to `$totalRevenue`
- **Reference nested attributes naturally** - `'customer'.'name'` or `'customer name'`
- **Maintain vocabulary alignment** - Data model attributes have verbalizations matching BAL Dictionary
- **Autocomplete both syntaxes** - Suggest both `$variable` and `'verbalization'`
- **Type-safe resolution** - Verbalizations resolve to typed variables at parse time
- **Unique verbalizations** - No conflicts or ambiguity

---

## Business Value

### Use Cases Enabled

**1. Business-Friendly Formula Authoring:**
```
// Technical syntax (current)
$commission = IF $salesAmount > 10000 THEN $salesAmount * 0.10 ELSE $salesAmount * 0.05 END

// Business syntax (with verbalization)
'commission' = IF 'sales amount' > 10000 THEN 'sales amount' * 0.10 ELSE 'sales amount' * 0.05 END
```

**2. Data Model Attribute References:**
```
// Technical syntax
IF $customer.status = "gold" THEN
  $discount = $customer.purchaseAmount * 0.20
END

// Business syntax
IF 'customer'.'status' = "gold" THEN
  'discount' = 'customer'.'purchase amount' * 0.20
END

// Or compound verbalization
IF 'customer status' = "gold" THEN
  'discount' = 'customer purchase amount' * 0.20
END
```

**3. Mixed Syntax (Technical Users):**
```
// Can mix technical and business terms
$finalPrice = 'original price' - 'discount'
```

**4. BAL/Business Rule Alignment:**
```
// Similar to BAL syntax
the commission of the sale is 
  10% of the sale amount if the sale amount is more than 10000,
  5% of the sale amount otherwise.

// Formula equivalent with verbalizations
'commission' = IF 'sale amount' > 10000 THEN 'sale amount' * 0.10 ELSE 'sale amount' * 0.05 END
```

---

## Goals & Success Criteria

### Primary Goals

1. ✅ **Variable Verbalization System**
   - Add optional `verbalization` property to Variable type
   - Bidirectional mapping: variable ↔ verbalization
   - Uniqueness validation (no duplicate verbalizations)
   - Variable table UI for editing verbalizations

2. ✅ **Attribute Verbalization System**
   - Add `verbalization` to data model attributes (parent and nested)
   - Nested attribute verbalizations compose: `'customer'.'name'` OR `'customer name'`
   - Alignment with BAL Dictionary vocabulary
   - Data model UI for editing verbalizations

3. ✅ **Parser Support**
   - Recognize single-quoted strings as variable/attribute references
   - Resolve verbalizations to actual variable names during parsing
   - Support both simple (`'customer name'`) and dotted (`'customer'.'name'`) syntax
   - Clear error messages for unresolved verbalizations

4. ✅ **Syntax Highlighting**
   - Highlight single-quoted variable references (distinct from string literals)
   - Color: Variable color (same as `$variable`)
   - Hover shows resolved variable name

5. ✅ **Autocomplete Integration**
   - Show both `$variable` and `'verbalization'` in suggestions
   - Group by type (variables, attributes, functions)
   - Filter/search works on both technical and verbalization

6. ✅ **Type System Integration**
   - Verbalizations resolve to typed variables
   - Type checking works with verbalized references
   - Error messages show both verbalization and variable name

7. ✅ **Validation & Debugging**
   - Validate verbalization uniqueness
   - Warn about unused verbalizations
   - Debugger shows verbalization alongside variable name
   - Clear error for undefined verbalization

### Success Metrics

- **Functionality:** All verbalized formulas execute correctly
- **Usability:** Business users can write formulas using verbalizations
- **Type Safety:** Type checking works with verbalizations
- **Documentation:** 10+ sample formulas demonstrating patterns
- **Performance:** Verbalization resolution adds <5ms overhead
- **Validation:** Unique verbalization enforcement prevents conflicts

---

## Architecture Impact Analysis

### Overall Assessment: **MEDIUM Complexity**

This feature requires **moderate changes** across parser, variable system, and UI components, but the architecture supports it well.

### Component-by-Component Analysis

#### 1. Variable Type System - **LOW Complexity**

**Changes Needed:**
- Add `verbalization?: string` property to Variable type
- Create bidirectional mapping utility
- Validation for uniqueness

**Example Type Extension:**
```typescript
// Current Variable type (in EditorTypes.ts)
export interface Variable {
  name: string;           // $customerName
  type: VariableType;
  defaultValue?: string;
  source: 'input' | 'defined' | 'formula';
  verbalization?: string; // "customer name"
}

// Verbalization mapping utilities
export interface VerbalizationMap {
  variableToVerbalization: Map<string, string>;  // $customerName → "customer name"
  verbalizationToVariable: Map<string, string>;  // "customer name" → $customerName
}

export function buildVerbalizationMap(variables: Variable[]): VerbalizationMap {
  const variableToVerbalization = new Map<string, string>();
  const verbalizationToVariable = new Map<string, string>();
  
  for (const variable of variables) {
    if (variable.verbalization) {
      variableToVerbalization.set(variable.name, variable.verbalization);
      verbalizationToVariable.set(variable.verbalization, variable.name);
    }
  }
  
  return { variableToVerbalization, verbalizationToVariable };
}
```

**Impact:** Minimal - straightforward type extension.

---

#### 2. Data Model Attributes - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add `verbalization?: string` to attribute definitions
- Support nested attribute verbalizations
- Provide composition strategies (dotted vs compound)

**Example Attribute Structure:**
```typescript
export interface DataModelAttribute {
  name: string;                      // "customer"
  verbalization?: string;            // "customer"
  type: 'string' | 'number' | 'object';
  properties?: DataModelAttribute[]; // Nested attributes
}

// Example: Customer object
const customerAttribute: DataModelAttribute = {
  name: 'customer',
  verbalization: 'customer',
  type: 'object',
  properties: [
    {
      name: 'name',
      verbalization: 'name',  // or "customer name" for compound
      type: 'string'
    },
    {
      name: 'purchaseAmount',
      verbalization: 'purchase amount',
      type: 'number'
    }
  ]
};

// Verbalization resolution strategies:
// 1. Dotted: 'customer'.'name' → $customer.name
// 2. Compound: 'customer name' → $customer.name
// 3. Mixed: 'customer'.'purchase amount' → $customer.purchaseAmount
```

**Implementation Decision Points:**
1. **Dotted notation only** - `'customer'.'name'` (simpler, clearer)
2. **Compound notation** - `'customer name'` (shorter, may conflict)
3. **Both** - Support both, prefer dotted for clarity

**Recommended:** Dotted notation for nested attributes (`'customer'.'name'`), with optional compound verbalizations for common cases.

**Impact:** Low-Medium - need to handle nested resolution logic.

---

#### 3. Tokenizer (Tokenizer.ts) - **LOW Complexity**

**Changes Needed:**
- Recognize single-quoted strings as potential variable references
- Distinguish from string literals (context-aware)

**Token Types:**
```typescript
export enum TokenType {
  // Existing...
  STRING = 'STRING',              // Double-quoted: "literal string"
  VARIABLE = 'VARIABLE',          // Dollar sign: $variableName
  VERBALIZATION = 'VERBALIZATION' // Single-quoted: 'customer name'
}
```

**Tokenization Example:**
```typescript
// Input: 'total revenue' = $price * $quantity
// Tokens:
[
  { type: 'VERBALIZATION', value: 'total revenue' },
  { type: 'EQUALS', value: '=' },
  { type: 'VARIABLE', value: '$price' },
  { type: 'MULTIPLY', value: '*' },
  { type: 'VARIABLE', value: '$quantity' }
]
```

**Context Awareness:**
- Single quotes inside double quotes = literal string
- Single quotes at expression level = verbalization
- Nested single quotes = dotted verbalization (`'customer'.'name'`)

**Impact:** Low - straightforward token type addition.

---

#### 4. Parser (FormulaParser.ts) - **MEDIUM Complexity**

**Changes Needed:**
- Parse VERBALIZATION tokens
- Resolve verbalizations to variable names using map
- Support dotted verbalization syntax (`'parent'.'child'`)
- Generate AST nodes with resolved variable names

**Parsing Logic:**
```typescript
// Parse verbalization reference
parseVerbalizationReference(): VariableReference {
  const verbalization = this.expect('VERBALIZATION').value;
  
  // Check for dotted notation: 'parent'.'child'
  if (this.match('DOT')) {
    this.advance(); // consume dot
    const childVerbalization = this.expect('VERBALIZATION').value;
    
    // Resolve nested attribute
    const resolvedPath = this.resolveNestedVerbalization(verbalization, childVerbalization);
    
    return {
      type: 'PropertyAccess',
      object: resolvedPath.parent,
      property: resolvedPath.child
    };
  }
  
  // Resolve simple verbalization
  const resolvedVariable = this.resolveVerbalization(verbalization);
  
  if (!resolvedVariable) {
    throw new ParseError(
      `Undefined verbalization: '${verbalization}'. No variable with this verbalization exists.`
    );
  }
  
  return {
    type: 'Variable',
    name: resolvedVariable  // Resolved to $actualVariableName
  };
}

// Resolution helper
resolveVerbalization(verbalization: string): string | null {
  return this.verbalizationMap.verbalizationToVariable.get(verbalization) ?? null;
}
```

**Parser Context:**
```typescript
export class FormulaParser {
  private verbalizationMap: VerbalizationMap;
  
  constructor(
    tokens: Token[],
    variables: Variable[],
    attributes: DataModelAttribute[]
  ) {
    this.tokens = tokens;
    this.verbalizationMap = buildVerbalizationMap(variables, attributes);
  }
}
```

**Impact:** Medium - need verbalization context during parsing, resolution logic.

---

#### 5. Syntax Highlighting (useFormulaSyntax.ts) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Highlight single-quoted variable references (VERBALIZATION tokens)
- Use variable color (same as `$variable`)
- Distinguish from string literals (different color)

**Highlighting Pattern:**
```typescript
// Single-quoted verbalizations (variable references)
const verbalizationPattern = /'([^']+)'/g;

const highlightedCode = code.replace(verbalizationPattern, (match) => {
  return `<span class="syntax-variable">${match}</span>`;
});

// Double-quoted strings (literals)
const stringPattern = /"([^"]*)"/g;
const highlightedCode2 = highlightedCode.replace(stringPattern, (match) => {
  return `<span class="syntax-string">${match}</span>`;
});
```

**CSS Styling:**
```css
/* Variable references - both $variable and 'verbalization' */
.syntax-variable {
  color: var(--syntax-variable); /* e.g., blue */
}

/* String literals - "text" */
.syntax-string {
  color: var(--syntax-string); /* e.g., green */
}
```

**Impact:** Low-Medium - need to ensure single quotes colored as variables, not strings.

---

#### 6. Autocomplete (useAutocompleteTriggers.ts, Autocomplete.tsx) - **MEDIUM Complexity**

**Changes Needed:**
- Show both `$variable` and `'verbalization'` in suggestions
- Filter/search on both names
- Group suggestions by type
- Display both forms in suggestion UI

**Autocomplete Items:**
```typescript
export interface AutocompleteSuggestion {
  type: 'variable' | 'attribute' | 'function';
  displayText: string;        // "customer name"
  insertText: string;         // "'customer name'" or "$customerName"
  variableName?: string;      // $customerName (for verbalizations)
  verbalization?: string;     // "customer name"
  icon?: string;
}

// Generate suggestions for a variable
function createVariableSuggestions(variable: Variable): AutocompleteSuggestion[] {
  const suggestions: AutocompleteSuggestion[] = [];
  
  // Technical syntax option
  suggestions.push({
    type: 'variable',
    displayText: variable.name,          // $customerName
    insertText: variable.name,
    variableName: variable.name
  });
  
  // Verbalization option (if exists)
  if (variable.verbalization) {
    suggestions.push({
      type: 'variable',
      displayText: variable.verbalization,  // customer name
      insertText: `'${variable.verbalization}'`,
      variableName: variable.name,
      verbalization: variable.verbalization
    });
  }
  
  return suggestions;
}
```

**UI Display:**
```tsx
<div className={styles.suggestion}>
  <div className={styles.mainText}>
    {suggestion.verbalization ? (
      <>
        <span className={styles.verbalization}>'{suggestion.verbalization}'</span>
        <span className={styles.variableName}>({suggestion.variableName})</span>
      </>
    ) : (
      <span className={styles.variableName}>{suggestion.variableName}</span>
    )}
  </div>
  <div className={styles.type}>{suggestion.type}</div>
</div>
```

**Impact:** Medium - need to generate dual suggestions and update UI.

---

#### 7. Variable Table UI (VariableTable.tsx) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add "Verbalization" column
- Editable text input for verbalization
- Validation for uniqueness
- Visual feedback for conflicts

**Table Structure:**
```tsx
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Verbalization</th> {/* NEW */}
      <th>Type</th>
      <th>Default Value</th>
      <th>Source</th>
    </tr>
  </thead>
  <tbody>
    {variables.map(variable => (
      <tr key={variable.name}>
        <td>{variable.name}</td>
        <td>
          <input
            type="text"
            value={variable.verbalization || ''}
            onChange={(e) => handleVerbalizationChange(variable.name, e.target.value)}
            placeholder="e.g., customer name"
            className={hasConflict(e.target.value) ? styles.conflict : ''}
          />
        </td>
        <td>{variable.type}</td>
        <td>{variable.defaultValue}</td>
        <td>{variable.source}</td>
      </tr>
    ))}
  </tbody>
</table>
```

**Validation:**
```typescript
function validateVerbalization(
  verbalization: string,
  currentVariable: string,
  allVariables: Variable[]
): { valid: boolean; error?: string } {
  if (!verbalization) {
    return { valid: true }; // Optional field
  }
  
  // Check for duplicates
  const duplicate = allVariables.find(
    v => v.verbalization === verbalization && v.name !== currentVariable
  );
  
  if (duplicate) {
    return {
      valid: false,
      error: `Duplicate verbalization: "${verbalization}" is already used by ${duplicate.name}`
    };
  }
  
  // Check for conflicts with variable names
  const conflictingVariable = allVariables.find(v => v.name === verbalization);
  if (conflictingVariable) {
    return {
      valid: false,
      error: `Verbalization "${verbalization}" conflicts with variable name ${conflictingVariable.name}`
    };
  }
  
  return { valid: true };
}
```

**Impact:** Low-Medium - UI update with validation.

---

#### 8. Data Model UI (BALDataModel.tsx) - **LOW-MEDIUM Complexity**

**Changes Needed:**
- Add verbalization editing for attributes
- Support nested attribute verbalizations
- Sync with BAL Dictionary vocabulary

**UI Enhancement:**
```tsx
<div className={styles.attribute}>
  <div className={styles.attributeName}>{attribute.name}</div>
  <input
    type="text"
    placeholder="Verbalization"
    value={attribute.verbalization || ''}
    onChange={(e) => handleAttributeVerbalizationChange(attribute.name, e.target.value)}
  />
  
  {/* Nested attributes */}
  {attribute.properties && (
    <div className={styles.nestedAttributes}>
      {attribute.properties.map(nested => (
        <div key={nested.name}>
          <span>{nested.name}</span>
          <input
            type="text"
            placeholder="Nested verbalization"
            value={nested.verbalization || ''}
            onChange={(e) => handleNestedVerbalizationChange(
              attribute.name,
              nested.name,
              e.target.value
            )}
          />
        </div>
      ))}
    </div>
  )}
</div>
```

**Impact:** Low-Medium - similar to variable table changes.

---

#### 9. Validation (useFormulaValidation.ts) - **LOW Complexity**

**Changes Needed:**
- Validate verbalization uniqueness
- Warn about undefined verbalizations
- Type checking with resolved variables

**Validation Rules:**
```typescript
function validateVerbalizationUsage(
  code: string,
  verbalizationMap: VerbalizationMap
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  
  // Find all verbalization references in code
  const verbalizationPattern = /'([^']+)'/g;
  let match;
  
  while ((match = verbalizationPattern.exec(code)) !== null) {
    const verbalization = match[1];
    
    // Check if verbalization resolves to a variable
    if (!verbalizationMap.verbalizationToVariable.has(verbalization)) {
      issues.push({
        type: 'error',
        message: `Undefined verbalization: '${verbalization}'`,
        location: match.index
      });
    }
  }
  
  return issues;
}
```

**Impact:** Low - straightforward validation addition.

---

#### 10. Debugger (TracingEvaluator, DebugControls) - **LOW Complexity**

**Changes Needed:**
- Show verbalization alongside variable name in debug output
- Ghost values show both forms
- Variable inspector displays verbalization

**Debug Variable Display:**
```tsx
<div className={styles.debugVariable}>
  <span className={styles.variableName}>{variable.name}</span>
  {variable.verbalization && (
    <span className={styles.verbalization}>"{variable.verbalization}"</span>
  )}
  <span className={styles.value}>{variable.value}</span>
</div>

// Example output:
// $customerName "customer name" = "John Doe"
```

**Impact:** Low - display enhancement only.

---

## Implementation Phases

### Phase 1: Variable Verbalization Foundation (2-3 days)

**Goal:** Add verbalization support to variable system.

**Tasks:**
1. Extend Variable type with `verbalization?: string`
2. Create verbalization mapping utilities
3. Add verbalization column to VariableTable UI
4. Implement uniqueness validation
5. Update sample data with verbalizations
6. Test bidirectional mapping

**Deliverables:**
- Variables can have verbalizations
- Variable table UI allows editing
- Validation prevents conflicts
- Sample variables with verbalizations

---

### Phase 2: Parser Integration (2-3 days)

**Goal:** Parse and resolve verbalized variable references.

**Tasks:**
1. Add VERBALIZATION token type to tokenizer
2. Update parser to handle single-quoted references
3. Implement verbalization resolution logic
4. Support dotted notation (`'parent'.'child'`)
5. Add error messages for undefined verbalizations
6. Test resolution with sample formulas

**Deliverables:**
- Single-quoted variable references work
- Verbalizations resolve to actual variables
- Clear errors for undefined verbalizations
- Dotted notation supported

---

### Phase 3: Syntax Highlighting (1-2 days)

**Goal:** Visual distinction for verbalized references.

**Tasks:**
1. Update syntax highlighting patterns
2. Color verbalizations as variables (not strings)
3. Test with mixed syntax formulas
4. Add hover tooltips showing resolved variable

**Deliverables:**
- Verbalizations highlighted correctly
- Visual distinction from string literals
- Hover shows resolved variable name

---

### Phase 4: Autocomplete Integration (2-3 days)

**Goal:** Suggest both technical and verbalized forms.

**Tasks:**
1. Generate dual suggestions (variable + verbalization)
2. Update autocomplete UI to show both
3. Filter/search on both forms
4. Group suggestions by type
5. Test autocomplete with verbalizations

**Deliverables:**
- Autocomplete shows both `$variable` and `'verbalization'`
- Search works on both forms
- Clear UI showing relationship

---

### Phase 5: Data Model Attribute Verbalizations (2-3 days)

**Goal:** Support attribute verbalizations.

**Tasks:**
1. Add verbalization to DataModelAttribute type
2. Update BALDataModel UI for editing
3. Implement nested attribute verbalization composition
4. Sync with BAL Dictionary vocabulary
5. Test with complex nested attributes

**Deliverables:**
- Attributes have verbalizations
- Nested attributes supported
- UI for editing attribute verbalizations
- BAL Dictionary integration

---

### Phase 6: Type System & Validation Integration (1-2 days)

**Goal:** Type-safe verbalization usage.

**Tasks:**
1. Update type checking to work with verbalizations
2. Add validation for verbalization uniqueness
3. Warn about undefined verbalizations
4. Test type checking with verbalized formulas

**Deliverables:**
- Type checking works with verbalizations
- Validation catches undefined verbalizations
- Clear error messages

---

### Phase 7: Debugger & Documentation (1-2 days)

**Goal:** Complete integration and documentation.

**Tasks:**
1. Update debugger to show verbalizations
2. Create 15+ sample formulas with verbalizations
3. Document verbalization syntax and patterns
4. Add help text to formula editor
5. Performance testing

**Deliverables:**
- Debugger shows verbalization + variable
- Comprehensive samples
- Complete documentation
- Production-ready quality

---

## Syntax Examples

### Simple Variable Verbalization

**Variable Definition:**
```typescript
{
  name: '$totalRevenue',
  type: 'number',
  verbalization: 'total revenue'
}
```

**Formula (Technical):**
```
$totalRevenue = $price * $quantity
```

**Formula (Business):**
```
'total revenue' = 'price' * 'quantity'
```

**Formula (Mixed):**
```
$totalRevenue = 'price' * 'quantity'
```

---

### Attribute Verbalization (Dotted Notation)

**Attribute Definition:**
```typescript
{
  name: 'customer',
  verbalization: 'customer',
  type: 'object',
  properties: [
    { name: 'name', verbalization: 'name', type: 'string' },
    { name: 'status', verbalization: 'status', type: 'string' }
  ]
}
```

**Formula:**
```
IF 'customer'.'status' = "gold" THEN
  'discount' = 'customer'.'purchase amount' * 0.20
END
```

---

### Compound Attribute Verbalization (Optional)

**Alternative Attribute Definition:**
```typescript
{
  name: 'customer',
  verbalization: 'customer',
  type: 'object',
  properties: [
    { 
      name: 'name', 
      verbalization: 'customer name',  // Compound verbalization
      type: 'string' 
    }
  ]
}
```

**Formula (Shorter):**
```
IF 'customer status' = "gold" THEN
  'discount' = 'customer purchase amount' * 0.20
END
```

---

### Business Rule Example

**Variables:**
- `$saleAmount` → `'sale amount'`
- `$commission` → `'commission'`
- `$threshold` → `'high value threshold'`

**Formula:**
```
'commission' = IF 'sale amount' > 'high value threshold' 
  THEN 'sale amount' * 0.10 
  ELSE 'sale amount' * 0.05 
END
```

**Reads Like Natural Language:**
> The commission is 10% of the sale amount if the sale amount is greater than the high value threshold, otherwise 5% of the sale amount.

---

## Design Decisions

### 1. Single Quotes vs. Double Quotes

**Decision:** Use single quotes for verbalizations.

**Rationale:**
- Single quotes: Variable references (verbalizations)
- Double quotes: String literals
- Clear visual distinction
- Aligns with some SQL dialects

**Alternative Considered:** Double quotes for verbalizations
- **Rejected:** Conflicts with string literals

---

### 2. Dotted Notation for Nested Attributes

**Decision:** Support dotted notation (`'customer'.'name'`).

**Rationale:**
- Mirrors technical syntax (`$customer.name`)
- Clear parent-child relationship
- Easier to parse and resolve
- Less ambiguity than compound verbalizations

**Optional Enhancement:** Also support compound verbalizations (`'customer name'`) for common cases.

---

### 3. Verbalization Uniqueness Scope

**Decision:** Verbalizations must be unique across all variables and attributes.

**Rationale:**
- Prevents ambiguity in resolution
- Clear error messages
- Simpler mental model for users

**Alternative Considered:** Allow duplicates with context-based resolution
- **Rejected:** Too complex, error-prone

---

### 4. Case Sensitivity

**Decision:** Verbalization matching is case-insensitive.

**Rationale:**
- Business users expect natural language flexibility
- "Customer Name" = "customer name" = "CUSTOMER NAME"
- Aligns with BAL patterns

**Implementation:** Store canonical lowercase form, match case-insensitively.

---

### 5. Optional vs. Required Verbalizations

**Decision:** Verbalizations are optional.

**Rationale:**
- Not all variables need natural language aliases
- Technical users may prefer `$variable` syntax
- Gradual adoption - add verbalizations as needed

---

## Validation Rules

### Uniqueness Validation

```typescript
// Rule: No two variables can have the same verbalization
✅ $customerName → 'customer name'
✅ $orderDate → 'order date'
❌ $shippingDate → 'order date' (conflict!)

// Error message:
"Duplicate verbalization: 'order date' is already used by $orderDate"
```

---

### Conflict with Variable Names

```typescript
// Rule: Verbalization cannot match any variable name
✅ $totalRevenue → 'total revenue'
❌ $customerName → 'totalRevenue' (conflicts with $totalRevenue)

// Error message:
"Verbalization 'totalRevenue' conflicts with variable name $totalRevenue"
```

---

### Undefined Verbalization

```typescript
// Formula uses undefined verbalization
'unknown variable' = 100

// Error message:
"Undefined verbalization: 'unknown variable'. No variable with this verbalization exists."
```

---

### Reserved Words

```typescript
// Rule: Verbalizations cannot be reserved keywords
❌ $myVar → 'IF'
❌ $myVar → 'THEN'
❌ $myVar → 'ELSE'

// Error message:
"Verbalization 'IF' is a reserved keyword and cannot be used"
```

---

## Sample Formulas with Verbalizations

### Commission Calculation
```
// Variables:
// $salesAmount → 'sales amount'
// $commission → 'commission'
// $tier → 'sales tier'

'sales tier' = SWITCH 'sales amount'
  CASE < 1000
    "bronze"
  CASE < 5000
    "silver"
  CASE >= 5000
    "gold"
END

'commission' = SWITCH 'sales tier'
  CASE "gold"
    'sales amount' * 0.15
  CASE "silver"
    'sales amount' * 0.10
  CASE "bronze"
    'sales amount' * 0.05
END
```

---

### Shipping Priority
```
// Attributes:
// $order.priority → 'order'.'priority'
// $order.weight → 'order'.'weight'

'shipping days' = SWITCH 'order'.'priority'
  CASE "express"
    IF 'order'.'weight' > 50 THEN 2 ELSE 1 END
  CASE "standard"
    5
  DEFAULT
    7
END
```

---

### Discount Calculation
```
// Variables:
// $customerType → 'customer type'
// $purchaseAmount → 'purchase amount'
// $discount → 'discount'

'discount' = IF 'customer type' = "VIP" THEN
  IF 'purchase amount' > 1000 THEN 0.20 ELSE 0.10 END
ELSIF 'customer type' = "Member" THEN
  0.05
ELSE
  0.00
END

'final price' = 'purchase amount' * (1 - 'discount')
```

---

## UI/UX Considerations

### Variable Table with Verbalizations

**Visual Design:**
```
+----------------+-------------------+--------+--------------+
| Name           | Verbalization     | Type   | Default      |
+----------------+-------------------+--------+--------------+
| $customerName  | customer name     | string | ""           |
| $orderTotal    | total order value | number | 0            |
| $discountRate  | discount rate     | number | 0.05         |
+----------------+-------------------+--------+--------------+
```

**Validation Feedback:**
- ✅ Green checkmark for valid verbalization
- ❌ Red error icon for conflicts
- ⚠️ Warning icon for potential issues (e.g., too similar to another)

---

### Autocomplete Display

**Suggestion List:**
```
Variables:
  🔹 $customerName
  🔹 'customer name' ($customerName)
  🔹 $orderTotal
  🔹 'total order value' ($orderTotal)

Attributes:
  🔸 $customer.name
  🔸 'customer'.'name' ($customer.name)
```

**Icons:**
- 🔹 Variable (blue)
- 🔸 Attribute (orange)
- 🔧 Function (gray)

---

### Syntax Highlighting Colors

```css
/* Variables (both forms) */
.syntax-variable {
  color: var(--syntax-variable); /* Blue */
}

/* Example: */
$customerName     /* Blue */
'customer name'   /* Blue */

/* String literals */
.syntax-string {
  color: var(--syntax-string); /* Green */
}

/* Example: */
"John Doe"        /* Green */
```

---

### Hover Tooltips

**Verbalization Hover:**
```
Hovering over: 'customer name'

Tooltip:
┌─────────────────────────┐
│ Variable: $customerName │
│ Type: string            │
│ Verbalization:          │
│   "customer name"       │
└─────────────────────────┘
```

**Variable Hover:**
```
Hovering over: $customerName

Tooltip:
┌─────────────────────────┐
│ Variable: $customerName │
│ Also known as:          │
│   'customer name'       │
│ Type: string            │
└─────────────────────────┘
```

---

## BAL Dictionary Integration

### Vocabulary Alignment

**Goal:** Attribute verbalizations should match BAL Dictionary vocabulary terms.

**Implementation:**
1. BAL Dictionary defines vocabulary terms
2. Data model attributes use same verbalization
3. Sync mechanism keeps them aligned

**Example:**

**BAL Dictionary Entry:**
```
Term: "customer name"
Definition: The full name of the customer
Type: string
```

**Data Model Attribute:**
```typescript
{
  name: 'customer.name',
  verbalization: 'customer name', // Matches BAL Dictionary
  type: 'string'
}
```

**Result:** Consistent terminology across BAL rules and formulas.

---

## Technical Considerations

### Performance Optimization

**Verbalization Resolution Caching:**
```typescript
class VerbalizationCache {
  private cache = new Map<string, string>();
  
  resolve(verbalization: string, map: VerbalizationMap): string | null {
    if (this.cache.has(verbalization)) {
      return this.cache.get(verbalization)!;
    }
    
    const resolved = map.verbalizationToVariable.get(verbalization) ?? null;
    this.cache.set(verbalization, resolved);
    return resolved;
  }
  
  invalidate() {
    this.cache.clear();
  }
}
```

**Expected Overhead:** <5ms for verbalization resolution during parsing.

---

### Case-Insensitive Matching

**Storage:**
- Store verbalization in original case for display
- Create lowercase index for matching

**Implementation:**
```typescript
class CaseInsensitiveVerbalizationMap {
  private display = new Map<string, string>();    // 'Customer Name' → $customerName
  private lookup = new Map<string, string>();     // 'customer name' → $customerName
  
  set(verbalization: string, variableName: string) {
    this.display.set(verbalization, variableName);
    this.lookup.set(verbalization.toLowerCase(), variableName);
  }
  
  resolve(verbalization: string): string | null {
    return this.lookup.get(verbalization.toLowerCase()) ?? null;
  }
  
  getDisplayForm(verbalization: string): string {
    const resolved = this.resolve(verbalization);
    if (!resolved) return verbalization;
    
    // Find original case
    for (const [display, variable] of this.display.entries()) {
      if (variable === resolved) {
        return display;
      }
    }
    
    return verbalization;
  }
}
```

---

## Dependencies

### Required (Must Be Complete)
- ✅ Evaluation Engine
- ✅ Parser Infrastructure
- ✅ Variable System
- ✅ Tokenizer

### Recommended (Should Be Complete)
- ✅ Formula Editor UI
- ✅ Variable Table Component
- ✅ Autocomplete System

### Optional (Nice to Have)
- BAL Dictionary component (for vocabulary sync)
- Type System (for type-safe verbalizations)

---

## Risks & Mitigation

### Risk 1: Verbalization Conflicts
**Probability:** Medium  
**Impact:** High (ambiguous resolution, errors)  
**Mitigation:**
- Strict uniqueness validation
- Clear error messages
- Case-insensitive matching to catch near-duplicates
- UI shows conflicts immediately

---

### Risk 2: User Confusion (Mixed Syntax)
**Probability:** Medium  
**Impact:** Medium (inconsistent formulas)  
**Mitigation:**
- Documentation with clear examples
- Autocomplete shows both forms
- Allow mixed syntax (don't force one or the other)
- Help text in editor

---

### Risk 3: Performance with Large Variable Sets
**Probability:** Low  
**Impact:** Low (slight parsing delay)  
**Mitigation:**
- Verbalization map built once, cached
- O(1) lookup with Map data structure
- Benchmark with 1000+ variables

---

### Risk 4: BAL Dictionary Sync Issues
**Probability:** Medium  
**Impact:** Medium (terminology inconsistency)  
**Mitigation:**
- Automatic sync mechanism
- Validation warns when verbalization doesn't match vocabulary
- Manual override option for edge cases

---

## Success Criteria

### Functional Requirements
- ✅ Variables can have optional verbalizations
- ✅ Attributes can have optional verbalizations
- ✅ Single-quoted references resolve correctly
- ✅ Dotted notation works for nested attributes
- ✅ Autocomplete suggests both forms
- ✅ Syntax highlighting correct
- ✅ Type checking works with verbalizations
- ✅ Validation prevents conflicts
- ✅ Debugger shows verbalization + variable

### Usability Requirements
- ✅ Business users can write formulas using verbalizations
- ✅ Clear error messages for undefined verbalizations
- ✅ UI makes it easy to add/edit verbalizations
- ✅ Hover tooltips show relationship

### Performance Requirements
- ✅ Verbalization resolution adds <5ms overhead
- ✅ Autocomplete performance unchanged
- ✅ No UI lag when editing verbalizations

### Documentation Requirements
- ✅ 15+ sample formulas with verbalizations
- ✅ Syntax guide
- ✅ Best practices document
- ✅ Help integration

---

## Related Epics

- [Formula Type System](/planning/epics/EPIC-FormulaTypeSystem.md) - Type checking with verbalizations
- [Multi-Type Formula Editor](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md) - Enhanced variable system
- [BAL Dynamic Keyword Highlighting](/planning/epics/EPIC-BALDynamicKeywordHighlighting.md) - Vocabulary integration

---

## Future Enhancements

### Phase 2 (Future):
1. **Plural Forms** - `'customers'` → `'customer'` (auto-detect)
2. **Synonyms** - Multiple verbalizations for same variable
3. **Localization** - Verbalizations in multiple languages
4. **Auto-Suggestion** - AI-suggested verbalizations based on variable name
5. **Verbalization Templates** - Common patterns (e.g., "total X", "X rate")

---

## Change Log

**October 30, 2025** - Epic created with comprehensive architecture analysis

---

## Next Steps

1. ✅ Epic approved and added to master requirements
2. Review and refine phase breakdown
3. Schedule Phase 1 (Variable Verbalization Foundation) start date
4. Coordinate with BAL Dictionary team for vocabulary sync
5. Set up tracking in project management system

---

**Epic Owner:** Senior Front End Architect  
**Status:** Awaiting Approval  
**Estimated Start:** After current epic priorities  
**Estimated Duration:** 8-12 days (7 phases)
