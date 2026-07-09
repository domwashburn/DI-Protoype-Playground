# Named Formulas (Excel-like Function Invocation)

**Date:** October 23, 2025  
**Version:** v07  
**Status:** 📋 Planned (Not Yet Implemented)

---

## Summary

Plan for implementing named formulas that can be invoked like Excel functions. Each formula will have a user-defined name and can be called from other formulas using `=FunctionName()` syntax, enabling formula composition and reusability across the application.

---

## Context

Currently, the Formula Editor allows users to:
- Define internal variables (e.g., `$baseScore`, `$result`)
- Link to external data sources (e.g., `#customer.creditScore`)
- Perform calculations with real-time syntax highlighting

However, formulas are isolated - they cannot be reused or invoked from other formulas. To enable:
- **Formula composition** - build complex formulas from simpler ones
- **Reusability** - define once, use many times
- **Modularity** - separate concerns into named, testable functions
- **Excel-like workflow** - familiar pattern for business users

We need to add named formula support with function invocation syntax.

---

## Requirements

### Functional Requirements

1. **Formula Naming**
   - Each formula has a user-defined name (e.g., "LoanEligibilityScore")
   - Name must be unique across all formulas
   - Name must be a valid identifier (alphanumeric, starts with letter)
   - Default name: "UntitledFormula" or context-based

2. **Function Signature**
   - Formula name (required)
   - Input parameters (optional)
   - Return type (inferred from calculation)
   - Description/documentation (optional)

3. **Parameters**
   - Formulas can accept input parameters
   - Parameters are distinct from internal variables
   - Parameters use different syntax (no `$` prefix? or different marker?)
   - Type support: Number, String, Boolean, Date

4. **Invocation Syntax**
   - `=FormulaName()` - invoke with no parameters
   - `=FormulaName(arg1, arg2)` - invoke with parameters
   - `=FormulaName(#customer.creditScore, 50000)` - mix of references and literals
   - Works in Formula Editor and potentially BAL Editor

5. **Formula Registry**
   - Central registry of all named formulas
   - Searchable and discoverable
   - Provides metadata for autocomplete
   - Validates invocations (parameter count, types)

6. **Autocomplete Integration**
   - Formula names appear in autocomplete suggestions
   - Show function signature in autocomplete popup
   - Show parameter names and types
   - Link to formula definition

---

## User Experience Flow

### 1. Creating a Named Formula

**User creates a formula:**
1. Opens Formula Editor tab
2. Enters formula name: "LoanEligibilityScore"
3. (Optional) Defines parameters: `creditScore: Number`, `income: Number`
4. Defines internal variables: `$baseScore`, `$debtRatio`
5. Links data sources: `#customer.totalDebt`
6. Writes calculation logic
7. Formula is automatically registered and available for invocation

**UI Layout:**
```
┌─────────────────────────────────────────┐
│ Formula Editor                          │
├─────────────────────────────────────────┤
│ Name: [LoanEligibilityScore          ] │
│ Description: [Calculate loan eligibi…] │
├─────────────────────────────────────────┤
│ [Formula content editor]                │
│                                         │
│ IF $baseScore >= 700 THEN               │
│   $result = "Approved"                  │
│ ELSE                                    │
│   $result = "Denied"                    │
│ END IF                                  │
└─────────────────────────────────────────┘
```

### 2. Using a Named Formula

**User invokes formula elsewhere:**
1. Opens another Formula Editor or BAL Editor
2. Types `=Loan` (autocomplete suggests "LoanEligibilityScore")
3. Selects formula from autocomplete
4. Autocomplete shows: `LoanEligibilityScore(creditScore: Number, income: Number) -> String`
5. User completes: `=LoanEligibilityScore(#customer.creditScore, #customer.income)`
6. Formula executes and returns result

**Autocomplete Popup:**
```
┌────────────────────────────────────────────┐
│ = LoanEligibilityScore                     │
│   LoanEligibilityScore(creditScore,        │
│                        income) -> String    │
│   Calculate loan eligibility based on      │
│   credit score and income                  │
│                                            │
│   Parameters:                              │
│   • creditScore: Number - Credit score     │
│   • income: Number - Annual income         │
│                                            │
│   Returns: String ("Approved", "Denied")   │
└────────────────────────────────────────────┘
```

---

## Architecture Plan

### 1. Formula Metadata Structure

**Type Definitions:**

```typescript
// Formula parameter definition
export interface FormulaParameter {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'date';
  description?: string;
  required: boolean;
  defaultValue?: string | number | boolean;
}

// Formula metadata
export interface FormulaDefinition {
  id: string;
  name: string;
  description?: string;
  parameters: FormulaParameter[];
  returnType: 'number' | 'string' | 'boolean' | 'date';
  content: string; // The formula code
  variables: Variable[]; // Internal variables
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

// Formula registry entry
export interface FormulaRegistryEntry {
  definition: FormulaDefinition;
  usage: {
    invocationCount: number;
    lastUsed?: string;
    usedBy: string[]; // IDs of formulas/rules that invoke this
  };
}
```

### 2. Formula Registry Service

**Location:** `/services/formulaRegistry.ts`

```typescript
class FormulaRegistry {
  private formulas: Map<string, FormulaRegistryEntry>;
  
  /**
   * Register a new formula
   */
  register(definition: FormulaDefinition): void {
    if (this.formulas.has(definition.name)) {
      throw new Error(`Formula "${definition.name}" already exists`);
    }
    
    this.formulas.set(definition.name, {
      definition,
      usage: {
        invocationCount: 0,
        usedBy: []
      }
    });
  }
  
  /**
   * Update existing formula
   */
  update(name: string, definition: Partial<FormulaDefinition>): void {
    const entry = this.formulas.get(name);
    if (!entry) {
      throw new Error(`Formula "${name}" not found`);
    }
    
    entry.definition = { ...entry.definition, ...definition };
  }
  
  /**
   * Get formula by name
   */
  get(name: string): FormulaDefinition | undefined {
    return this.formulas.get(name)?.definition;
  }
  
  /**
   * Get all registered formulas
   */
  getAll(): FormulaDefinition[] {
    return Array.from(this.formulas.values()).map(e => e.definition);
  }
  
  /**
   * Search formulas by name or description
   */
  search(query: string): FormulaDefinition[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(f => 
      f.name.toLowerCase().includes(lowerQuery) ||
      f.description?.toLowerCase().includes(lowerQuery)
    );
  }
  
  /**
   * Validate formula invocation
   */
  validateInvocation(
    name: string, 
    args: Array<{ type: string; value: any }>
  ): { valid: boolean; errors: string[] } {
    const formula = this.get(name);
    if (!formula) {
      return { valid: false, errors: [`Formula "${name}" not found`] };
    }
    
    const errors: string[] = [];
    
    // Check parameter count
    const requiredParams = formula.parameters.filter(p => p.required);
    if (args.length < requiredParams.length) {
      errors.push(
        `Expected at least ${requiredParams.length} arguments, got ${args.length}`
      );
    }
    
    if (args.length > formula.parameters.length) {
      errors.push(
        `Expected at most ${formula.parameters.length} arguments, got ${args.length}`
      );
    }
    
    // Check parameter types
    args.forEach((arg, i) => {
      const param = formula.parameters[i];
      if (param && arg.type !== param.type) {
        errors.push(
          `Parameter "${param.name}" expects ${param.type}, got ${arg.type}`
        );
      }
    });
    
    return { valid: errors.length === 0, errors };
  }
  
  /**
   * Record formula usage
   */
  recordUsage(name: string, usedBy: string): void {
    const entry = this.formulas.get(name);
    if (entry) {
      entry.usage.invocationCount++;
      entry.usage.lastUsed = new Date().toISOString();
      if (!entry.usage.usedBy.includes(usedBy)) {
        entry.usage.usedBy.push(usedBy);
      }
    }
  }
  
  /**
   * Get formula dependencies
   */
  getDependencies(name: string): string[] {
    const formula = this.get(name);
    if (!formula) return [];
    
    // Parse formula content to find invocations
    // Look for =FunctionName() patterns
    const invokePattern = /=([A-Z][a-zA-Z0-9]*)\(/g;
    const matches = [...formula.content.matchAll(invokePattern)];
    return matches.map(m => m[1]);
  }
  
  /**
   * Check for circular dependencies
   */
  hasCircularDependency(name: string, visited = new Set<string>()): boolean {
    if (visited.has(name)) return true;
    
    visited.add(name);
    const deps = this.getDependencies(name);
    
    return deps.some(dep => this.hasCircularDependency(dep, new Set(visited)));
  }
}

export const formulaRegistry = new FormulaRegistry();
```

### 3. Formula Editor UI Updates

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**New UI Sections:**

1. **Formula Header (above editor)**
   - Name input field
   - Description field (optional)
   - Publish toggle (make available for invocation)

2. **Parameters Section (in sidebar)**
   - Above Variables section
   - Add/edit/delete parameters
   - Define parameter type and description

**Component Structure:**
```tsx
function FormulaEditor() {
  const [formulaName, setFormulaName] = useState('UntitledFormula');
  const [description, setDescription] = useState('');
  const [parameters, setParameters] = useState<FormulaParameter[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  
  // Register formula when published
  useEffect(() => {
    if (isPublished && formulaName) {
      formulaRegistry.register({
        id: generateId(),
        name: formulaName,
        description,
        parameters,
        returnType: inferReturnType(content),
        content,
        variables,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }, [isPublished, formulaName, parameters, content]);
  
  return (
    <div className={styles.formulaEditor}>
      {/* Formula Header */}
      <div className={styles.header}>
        <Input
          value={formulaName}
          onChange={(e) => setFormulaName(e.target.value)}
          placeholder="Formula Name"
          className={styles.nameInput}
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className={styles.descriptionInput}
        />
        <Switch
          checked={isPublished}
          onCheckedChange={setIsPublished}
          label="Publish for reuse"
        />
      </div>
      
      {/* Main Editor Area */}
      <div className={styles.editorArea}>
        {/* Formula content editor */}
      </div>
      
      {/* Sidebar */}
      <Tabs defaultValue="variables">
        <TabsList>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parameters">
          <ParameterTable
            parameters={parameters}
            onAdd={handleAddParameter}
            onEdit={handleEditParameter}
            onDelete={handleDeleteParameter}
          />
        </TabsContent>
        
        <TabsContent value="variables">
          <VariableTable
            variables={variables}
            onAdd={handleAddVariable}
            onEdit={handleEditVariable}
            onDelete={handleDeleteVariable}
          />
        </TabsContent>
        
        <TabsContent value="testing">
          <TestingChecklist />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 4. Parameter Table Component

**New Component:** `/components/editors/code/shared/components/ParameterTable/`

**Similar to VariableTable but for function parameters:**

```tsx
export interface ParameterTableProps {
  parameters: FormulaParameter[];
  onAdd: (parameter: FormulaParameter) => void;
  onEdit: (id: string, updates: Partial<FormulaParameter>) => void;
  onDelete: (id: string) => void;
}

export function ParameterTable({ 
  parameters, 
  onAdd, 
  onEdit, 
  onDelete 
}: ParameterTableProps) {
  return (
    <div className={styles.parameterTable}>
      <div className={styles.header}>
        <h3>Input Parameters</h3>
        <p>Define parameters that callers must provide</p>
      </div>
      
      {/* Parameter cards */}
      {parameters.map(param => (
        <ParameterCard
          key={param.name}
          parameter={param}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      
      {/* Add new parameter */}
      <AddParameterCard onAdd={onAdd} />
    </div>
  );
}
```

### 5. Autocomplete Integration

**File:** `/components/editors/core/hooks/useAutocompleteTriggers.ts`

**Enhancement to include formula names:**

```typescript
export function useAutocompleteTriggers(editorType: EditorType) {
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  
  // Get formula suggestions from registry
  const getFormulaSuggestions = (query: string) => {
    const formulas = formulaRegistry.search(query);
    
    return formulas.map(f => ({
      type: 'formula' as const,
      value: f.name,
      label: f.name,
      description: f.description,
      signature: buildSignature(f),
      insertText: buildInvocation(f),
      detail: `Returns: ${f.returnType}`
    }));
  };
  
  // Build function signature string
  const buildSignature = (formula: FormulaDefinition) => {
    const params = formula.parameters
      .map(p => `${p.name}: ${p.type}`)
      .join(', ');
    return `${formula.name}(${params}) -> ${formula.returnType}`;
  };
  
  // Build invocation template
  const buildInvocation = (formula: FormulaDefinition) => {
    const params = formula.parameters
      .map((p, i) => `${p.name}`)
      .join(', ');
    return `=${formula.name}(${params})`;
  };
  
  // Detect = trigger for formula invocation
  const handleInput = (text: string, cursorPosition: number) => {
    // Check for formula invocation trigger
    if (text[cursorPosition - 1] === '=') {
      const formulaSuggestions = getFormulaSuggestions('');
      setSuggestions(formulaSuggestions);
      return;
    }
    
    // Check for partial formula name
    const beforeCursor = text.substring(0, cursorPosition);
    const match = beforeCursor.match(/=([A-Z][a-zA-Z0-9]*)$/);
    if (match) {
      const query = match[1];
      const formulaSuggestions = getFormulaSuggestions(query);
      setSuggestions(formulaSuggestions);
      return;
    }
    
    // ... existing variable/attribute suggestions
  };
  
  return {
    suggestions,
    handleInput,
    insertSuggestion
  };
}
```

### 6. Formula Invocation Execution

**Pattern for executing formula invocations:**

```typescript
class FormulaExecutor {
  /**
   * Execute a formula with given arguments
   */
  execute(
    formulaName: string,
    args: any[],
    context: ExecutionContext
  ): any {
    const formula = formulaRegistry.get(formulaName);
    if (!formula) {
      throw new Error(`Formula "${formulaName}" not found`);
    }
    
    // Validate arguments
    const validation = formulaRegistry.validateInvocation(
      formulaName,
      args.map(a => ({ type: typeof a, value: a }))
    );
    
    if (!validation.valid) {
      throw new Error(`Invalid invocation: ${validation.errors.join(', ')}`);
    }
    
    // Build execution context with parameters
    const paramContext = formula.parameters.reduce((ctx, param, i) => {
      ctx[param.name] = args[i];
      return ctx;
    }, {} as Record<string, any>);
    
    // Execute formula content with parameter context
    const result = this.evaluateFormula(
      formula.content,
      { ...context, ...paramContext }
    );
    
    // Record usage
    formulaRegistry.recordUsage(formulaName, context.callerId);
    
    return result;
  }
  
  private evaluateFormula(
    content: string,
    context: ExecutionContext
  ): any {
    // Parse and evaluate formula content
    // This would integrate with existing formula evaluation logic
    // and handle nested formula invocations
    
    // Detect nested invocations
    const invokePattern = /=([A-Z][a-zA-Z0-9]*)\((.*?)\)/g;
    let evaluatedContent = content;
    
    for (const match of content.matchAll(invokePattern)) {
      const [fullMatch, name, argsStr] = match;
      const args = this.parseArguments(argsStr, context);
      const result = this.execute(name, args, context);
      evaluatedContent = evaluatedContent.replace(fullMatch, String(result));
    }
    
    // Evaluate the final expression
    return this.evaluate(evaluatedContent, context);
  }
}
```

---

## Implementation Plan

### Phase 1: Foundation (Formula Naming & Registry)
**Goal:** Basic infrastructure for named formulas

1. Create `FormulaDefinition` and related types
2. Implement `FormulaRegistry` service
3. Add formula name input to Formula Editor UI
4. Store formula metadata when name is set
5. Test basic registration and retrieval

**Files:**
- `/components/editors/core/types/EditorTypes.ts` - Add types
- `/services/formulaRegistry.ts` - New service
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Add name input
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Header styles

### Phase 2: Parameters (Input Definition)
**Goal:** Define and manage formula parameters

1. Create `ParameterTable` component (similar to VariableTable)
2. Add Parameters tab to Formula Editor sidebar
3. CRUD operations for parameters
4. Parameter type selection (Number, String, Boolean, Date)
5. Visual distinction between parameters and internal variables

**Files:**
- `/components/editors/code/shared/components/ParameterTable/` - New component
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Add Parameters tab
- Update sidebar tabs layout

### Phase 3: Autocomplete Integration
**Goal:** Formula name suggestions in autocomplete

1. Extend `useAutocompleteTriggers` to include formulas
2. Detect `=` trigger for formula invocations
3. Search formula registry for matching names
4. Display function signature in autocomplete popup
5. Insert invocation template with parameter placeholders

**Files:**
- `/components/editors/core/hooks/useAutocompleteTriggers.ts` - Add formula suggestions
- `/components/BALAutocomplete/BALAutocomplete.tsx` - Display formula signatures

### Phase 4: Invocation Execution
**Goal:** Execute formula invocations

1. Create `FormulaExecutor` class
2. Parse formula invocations in content
3. Validate argument count and types
4. Execute nested formulas recursively
5. Handle execution context and parameter binding
6. Error handling for invalid invocations

**Files:**
- `/services/formulaExecutor.ts` - New service
- Integration with existing formula evaluation

### Phase 5: Advanced Features
**Goal:** Polish and power features

1. **Circular Dependency Detection**
   - Prevent formulas from creating circular references
   - Warn user when attempting to create circular dependency

2. **Formula Browser/Library**
   - Searchable list of all registered formulas
   - Filter by category/tag
   - Usage statistics

3. **Testing & Validation**
   - Test formulas with sample inputs
   - Expected output validation
   - Unit test creation for formulas

4. **Documentation Generation**
   - Auto-generate documentation from formula metadata
   - Export formulas as documentation
   - Example usage generation

5. **Formula Versioning**
   - Track formula versions
   - Safe updates (detect breaking changes)
   - Migration assistance

---

## Files to Create/Modify

### New Files
- `/services/formulaRegistry.ts` - Formula registry service
- `/services/formulaExecutor.ts` - Formula execution engine
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.tsx`
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.module.css`
- `/components/editors/code/shared/components/ParameterTable/index.ts`
- `/components/editors/code/shared/components/ParameterTable/README.md`
- `/components/FormulaLibrary/` - (Phase 5) Formula browser component

### Modified Files
- `/components/editors/core/types/EditorTypes.ts` - Add formula types
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Add name/description/parameters
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - Header section styles
- `/components/editors/core/hooks/useAutocompleteTriggers.ts` - Formula suggestions
- `/components/BALAutocomplete/BALAutocomplete.tsx` - Display formula signatures
- `/SampleData/formulaSamples.ts` - Add named formula examples

---

## UI Mockups

### Formula Editor Header

```
┌──────────────────────────────────────────────────────────┐
│ Formula Editor                                    [×]    │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐  │
│ │ Name                                                │  │
│ │ ┌────────────────────────────────────────────────┐ │  │
│ │ │ LoanEligibilityScore                           │ │  │
│ │ └────────────────────────────────────────────────┘ │  │
│ │                                                    │  │
│ │ Description (optional)                             │  │
│ │ ┌────────────────────────────────────────────────┐ │  │
│ │ │ Calculate loan eligibility based on credit     │ │  │
│ │ │ score, income, and debt-to-income ratio        │ │  │
│ │ └────────────────────────────────────────────────┘ │  │
│ │                                                    │  │
│ │ [ ] Publish for reuse in other formulas           │  │
│ └────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│ [Formula content area]                                   │
└──────────────────────────────────────────────────────────┘
```

### Parameters Tab (Sidebar)

```
┌─────────────────────────────────┐
│ [Parameters] Variables Testing  │
├─────────────────────────────────┤
│ Input Parameters                │
│ Define parameters that callers  │
│ must provide                    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ creditScore                 │ │
│ │ TYPE                        │ │
│ │ Number                   ▼  │ │
│ │ DESCRIPTION                 │ │
│ │ Customer's credit score     │ │
│ │ REQUIRED                    │ │
│ │ [✓] Required parameter      │ │
│ │                    [Edit][×]│ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ income                      │ │
│ │ TYPE                        │ │
│ │ Number                   ▼  │ │
│ │ DESCRIPTION                 │ │
│ │ Customer's annual income    │ │
│ │ REQUIRED                    │ │
│ │ [✓] Required parameter      │ │
│ │                    [Edit][×]│ │
│ └─────────────────────────────┘ │
│                                 │
│ [+ Add Parameter]               │
└─────────────────────────────────┘
```

### Autocomplete with Formula Suggestions

```
Type: =Loan

┌────────────────────────────────────────────┐
│ = LoanEligibilityScore                  📊 │
│   LoanEligibilityScore(creditScore,       │
│                        income) -> String   │
│   ───────────────────────────────────────  │
│   Calculate loan eligibility based on      │
│   credit score, income, and DTI ratio      │
│                                            │
│ = LoanRiskCalculation                   📊 │
│   LoanRiskCalculation(loanAmount,          │
│                       term) -> Number      │
│   ───────────────────────────────────────  │
│   Calculate risk score for loan approval   │
└────────────────────────────────────────────┘
```

---

## Parameter vs. Variable Syntax

### Option 1: Parameters use @ prefix
- Parameters: `@creditScore`, `@income`
- Variables: `$baseScore`, `$debtRatio`
- Attributes: `#customer.totalDebt`

**Pros:** Clear visual distinction  
**Cons:** Adds another symbol to learn

### Option 2: Parameters are bare identifiers
- Parameters: `creditScore`, `income`
- Variables: `$baseScore`, `$debtRatio`
- Attributes: `#customer.totalDebt`

**Pros:** Simpler, more familiar (like function parameters in code)  
**Cons:** Less visually distinct

### Option 3: Parameters use same $ prefix
- Parameters: `$creditScore`, `$income` (defined in Parameters tab)
- Variables: `$baseScore`, `$debtRatio` (defined in Variables tab)
- Attributes: `#customer.totalDebt`

**Pros:** Consistent with variable syntax, minimal new concepts  
**Cons:** Harder to distinguish parameters from internal variables

**Recommendation:** Option 2 (bare identifiers) for simplicity and familiarity

---

## Variable Mapping Types

**IMPORTANT:** Variables in named formulas can have three distinct mapping behaviors that control how they're exposed in the function signature and how callers can interact with them.

### 1. User-Defined Variables (No Mapping)

**Definition:** Variables with NO `dataSource` mapping - purely defined by the caller.

**Characteristics:**
- No `dataSource` property set
- MUST be included in function signature
- Caller MUST provide a value when invoking
- Flexible - can receive literals, attributes, or other formula results

**Example - Simple Math Formula:**
```typescript
// Formula: SimpleMath
variables: [
  { name: 'value1', type: 'number', description: 'First value' },     // No dataSource
  { name: 'value2', type: 'number', description: 'Second value' },    // No dataSource
  { name: 'multiplier', type: 'number', description: 'Multiplier' },  // No dataSource
  { name: 'result', type: 'number', description: 'Result' }           // Internal calculation
]

// Function Signature:
// SimpleMath(value1: number, value2: number, multiplier: number) -> number

// Invocation Examples:
$answer = =SimpleMath(10, 20, 2)              // Literals
$answer = =SimpleMath($x, $y, 1.5)            // Other variables
$answer = =SimpleMath(#order.qty, 5, 1.1)    // Mix of attribute and literals
```

**UI Display in Parameters Tab:**
```
┌─────────────────────────────────┐
│ value1                          │
│ TYPE                            │
│ Number                       ▼  │
│ MAPPING                         │
│ User-defined (required)         │
│ DESCRIPTION                     │
│ First value                     │
└─────────────────────────────────┘
```

### 2. Default-Mapped Variables (Overridable)

**Definition:** Variables WITH a `dataSource` that serves as a default but can be overridden by the caller.

**Characteristics:**
- Has `dataSource` property (e.g., `#customer.creditScore`)
- Included in function signature with default indicator
- Caller CAN provide override value (optional)
- If no override provided, uses mapped data source
- Provides flexibility with sensible defaults

**Example - Loan Eligibility with Defaults:**
```typescript
// Formula: LoanEligibility
variables: [
  { 
    name: 'creditScore', 
    type: 'number', 
    dataSource: '#customer.creditScore',    // Has default mapping
    isOverridable: true,                     // Can be overridden
    description: 'Credit score (defaults to customer.creditScore)' 
  },
  { 
    name: 'income', 
    type: 'number', 
    dataSource: '#customer.annualIncome',   // Has default mapping
    isOverridable: true,                     // Can be overridden
    description: 'Annual income (defaults to customer.annualIncome)' 
  },
  { 
    name: 'baseScore', 
    type: 'number', 
    description: 'Calculated base score' 
  }
]

// Function Signature:
// LoanEligibility(creditScore?: number = #customer.creditScore, 
//                 income?: number = #customer.annualIncome) -> number

// Invocation Examples:
$score = =LoanEligibility()                     // Uses both defaults
$score = =LoanEligibility(750)                  // Override creditScore, use income default
$score = =LoanEligibility(750, 85000)           // Override both
$score = =LoanEligibility(#applicant.fico)     // Override with different attribute
$score = =LoanEligibility($customScore, 50000) // Override with variable + literal
```

**UI Display in Parameters Tab:**
```
┌─────────────────────────────────┐
│ creditScore                     │
│ TYPE                            │
│ Number                       ▼  │
│ MAPPING                         │
│ [✓] Override default            │
│ Default: #customer.creditScore  │
│ DESCRIPTION                     │
│ Credit score                    │
└─────────────────────────────────┘
```

### 3. Locked Variables (Not in Signature)

**Definition:** Variables WITH a `dataSource` that are NOT exposed in the function signature - always pull from their mapped source.

**Characteristics:**
- Has `dataSource` property (e.g., `#system.currentDate`)
- NOT included in function signature
- Caller CANNOT override
- Used for internal calculations that need specific system data
- Provides security and consistency

**Example - Age Calculation with Locked System Date:**
```typescript
// Formula: CalculateAge
variables: [
  { 
    name: 'birthDate', 
    type: 'date', 
    description: 'Customer birth date' 
  },
  { 
    name: 'currentDate', 
    type: 'date', 
    dataSource: '#system.currentDate',         // Locked to system date
    isOverridable: false,                       // CANNOT be overridden
    isLocked: true,                             // Locked indicator
    description: 'Current date (system-provided)' 
  },
  { 
    name: 'age', 
    type: 'number', 
    description: 'Calculated age in years' 
  }
]

// Function Signature:
// CalculateAge(birthDate: date) -> number
// Note: currentDate is NOT in signature!

// Invocation Examples:
$customerAge = =CalculateAge(#customer.dob)       // Only birthDate needed
$age = =CalculateAge("1990-05-15")                // Literal date

// ❌ INVALID - Cannot override locked variable:
$age = =CalculateAge(#customer.dob, "2025-01-01") // ERROR: Too many arguments
```

**UI Display in Variables Tab (NOT Parameters Tab):**
```
┌─────────────────────────────────┐
│ currentDate                  🔒 │
│ TYPE                            │
│ Date                            │
│ DATA SOURCE                     │
│ #system.currentDate (locked)    │
│ DESCRIPTION                     │
│ Current date (system-provided)  │
│ [Cannot be overridden]          │
└─────────────────────────────────┘
```

### 4. Internal Calculation Variables

**Definition:** Variables that are calculated WITHIN the formula - not inputs, not mapped.

**Characteristics:**
- No `dataSource` property
- NOT included in function signature
- Caller CANNOT provide values
- Used for intermediate calculations
- Results, temporary values, etc.

**Example:**
```typescript
variables: [
  { name: 'baseScore', type: 'number', description: 'Calculated base score' },
  { name: 'result', type: 'number', description: 'Final result' }
]

// NOT in function signature - purely internal
```

---

## Variable Mapping Summary Table

| Type | Has dataSource? | In Signature? | Caller Can Override? | Example Use Case |
|------|-----------------|---------------|----------------------|------------------|
| **User-Defined** | ❌ No | ✅ Yes (required) | ✅ Yes (must provide) | Generic inputs: `value1`, `multiplier` |
| **Default-Mapped** | ✅ Yes | ✅ Yes (optional with default) | ✅ Yes (optional) | Common data with fallback: `creditScore = #customer.creditScore` |
| **Locked** | ✅ Yes | ❌ No | ❌ No | System data: `currentDate = #system.currentDate` |
| **Internal Calculation** | ❌ No | ❌ No | ❌ No | Intermediate results: `baseScore`, `result` |

---

## Real-World Example: Comprehensive Formula

**Formula Name:** ComplexLoanApproval

**Parameters (in signature):**
```typescript
// User-defined (required):
- loanAmount: Number - Requested loan amount
- loanTerm: Number - Loan term in months

// Default-mapped (optional with defaults):
- creditScore: Number (default: #customer.creditScore)
- income: Number (default: #customer.annualIncome)
- existingDebt: Number (default: #customer.totalDebt)
```

**Variables (NOT in signature):**
```typescript
// Locked (always from data source):
- riskThreshold: Number (#system.config.riskThreshold) - System risk limit
- currentRate: Number (#market.interestRate) - Current market rate

// Internal calculations:
- debtRatio: Number - Calculated DTI
- monthlyPayment: Number - Calculated payment
- riskScore: Number - Calculated risk
- decision: String - Final decision
```

**Function Signature:**
```
ComplexLoanApproval(
  loanAmount: number,              // Required
  loanTerm: number,                // Required
  creditScore?: number,            // Optional (default: #customer.creditScore)
  income?: number,                 // Optional (default: #customer.annualIncome)  
  existingDebt?: number            // Optional (default: #customer.totalDebt)
) -> string
```

**Invocation Examples:**
```typescript
// Minimal - uses all defaults for customer data
$decision = =ComplexLoanApproval(25000, 60)

// Partial override - custom credit score, use other defaults  
$decision = =ComplexLoanApproval(25000, 60, 780)

// Full override - all custom values
$decision = =ComplexLoanApproval(25000, 60, 780, 95000, 15000)

// Mix of sources
$decision = =ComplexLoanApproval(
  #loan.requestedAmount,           // Attribute
  36,                               // Literal
  #applicant.fico,                  // Different attribute
  $calculatedIncome,                // Variable from current context
  #applicant.currentDebt            // Another attribute
)
```

---

## Updated Type Definitions

```typescript
export interface FormulaVariable {
  id: string;
  name: string;
  type: 'number' | 'string' | 'boolean' | 'date';
  description?: string;
  
  // Mapping configuration
  dataSource?: string;              // e.g., '#customer.creditScore'
  isOverridable?: boolean;          // Can caller override? (only if dataSource exists)
  isLocked?: boolean;               // Locked to dataSource? (true = not in signature)
  
  // Function signature inclusion
  isParameter?: boolean;            // Auto-calculated based on mapping rules
  isRequired?: boolean;             // Required in signature? (user-defined = true)
  defaultValue?: string;            // Default mapping for display
}

// Mapping type determination logic:
function determineVariableMappingType(variable: FormulaVariable): VariableMappingType {
  if (!variable.dataSource) {
    // No data source
    if (isInternalCalculation(variable)) {
      return 'internal-calculation';  // Not in signature
    } else {
      return 'user-defined';           // In signature, required
    }
  } else {
    // Has data source
    if (variable.isLocked) {
      return 'locked';                 // Not in signature, cannot override
    } else {
      return 'default-mapped';         // In signature, optional with default
    }
  }
}

type VariableMappingType = 
  | 'user-defined'          // No mapping, required parameter
  | 'default-mapped'        // Has mapping, optional parameter with default
  | 'locked'                // Has mapping, not in signature
  | 'internal-calculation'; // No mapping, not in signature
```

---

## UI Components Updates

### ParameterTable Component

**Should display:**
1. **User-defined variables** (no dataSource, required)
2. **Default-mapped variables** (has dataSource, isOverridable=true)

**Should NOT display:**
3. Locked variables (shown in Variables tab instead)
4. Internal calculation variables (shown in Variables tab instead)

### VariableTable Component

**Should display:**
1. **Locked variables** (has dataSource, isLocked=true) - with lock icon 🔒
2. **Internal calculation variables** (no dataSource, internal use only)

**Should NOT display:**
3. User-defined variables (shown in Parameters tab)
4. Default-mapped variables (shown in Parameters tab)

---

## Example: Named Formula

### Formula Definition

**Name:** LoanEligibilityScore  
**Description:** Calculate loan eligibility based on credit score and income

**Parameters:**
- `creditScore: Number` - Customer's credit score (300-850)
- `income: Number` - Customer's annual income

**Internal Variables:**
- `$baseScore: Number` - Normalized base score
- `$incomeMultiplier: Number` - Income adjustment factor
- `$result: String` - Final eligibility decision

**Formula Content:**
```
# Calculate base score from credit
IF creditScore >= 750 THEN
  $baseScore = 100
ELSE IF creditScore >= 700 THEN
  $baseScore = 85
ELSE IF creditScore >= 650 THEN
  $baseScore = 70
ELSE
  $baseScore = 50
END IF

# Apply income adjustment
IF income >= 100000 THEN
  $incomeMultiplier = 1.2
ELSE IF income >= 75000 THEN
  $incomeMultiplier = 1.1
ELSE IF income >= 50000 THEN
  $incomeMultiplier = 1.0
ELSE
  $incomeMultiplier = 0.9
END IF

# Calculate final score
$finalScore = $baseScore * $incomeMultiplier

# Determine eligibility
IF $finalScore >= 90 THEN
  $result = "Approved"
ELSE IF $finalScore >= 70 THEN
  $result = "Conditional"
ELSE
  $result = "Denied"
END IF

RETURN $result
```

### Invocation Examples

**Example 1: Direct invocation with literals**
```
$eligibility = =LoanEligibilityScore(720, 85000)
# Result: "Conditional"
```

**Example 2: Invocation with attribute references**
```
$eligibility = =LoanEligibilityScore(#customer.creditScore, #customer.income)
# Result depends on customer data
```

**Example 3: Invocation within another formula**
```
# In a different formula
$loanDecision = =LoanEligibilityScore(#applicant.creditScore, #applicant.annualIncome)

IF $loanDecision == "Approved" THEN
  $interestRate = 3.5
ELSE IF $loanDecision == "Conditional" THEN
  $interestRate = 4.5
ELSE
  $interestRate = 6.0
END IF
```

---

## Technical Considerations

### 1. Circular Dependency Prevention

**Problem:** Formula A invokes Formula B which invokes Formula A (infinite loop)

**Solution:**
- Track dependency graph
- Detect cycles before registration
- Prevent circular references
- Show warning to user

**Implementation:**
```typescript
formulaRegistry.hasCircularDependency('FormulaA'); // Returns true if circular
```

### 2. Type Safety

**Problem:** Passing wrong type of argument to parameter

**Solution:**
- Runtime type checking
- Validation before execution
- Clear error messages
- Optional: static type analysis

### 3. Performance

**Problem:** Nested formula invocations could be slow

**Solution:**
- Memoize formula results
- Cache frequently used formulas
- Limit recursion depth
- Optimize hot paths

### 4. Versioning

**Problem:** Formula changes could break dependent formulas

**Solution:**
- Version tracking for formulas
- Breaking change detection
- Safe update workflows
- Deprecation warnings

### 5. Testing

**Problem:** How to test formulas with parameters?

**Solution:**
- Test cases with sample inputs
- Expected output validation
- Edge case testing
- Integration testing for nested invocations

---

## Sample Data

### Example Named Formulas for Testing

**Formula 1: CreditScoreRating**
- Parameters: `score: Number`
- Returns: `String`
- Content: Convert numeric score to rating (Excellent, Good, Fair, Poor)

**Formula 2: DebtToIncomeRatio**
- Parameters: `totalDebt: Number`, `income: Number`
- Returns: `Number`
- Content: Calculate DTI as percentage

**Formula 3: LoanEligibilityScore**
- Parameters: `creditScore: Number`, `income: Number`
- Returns: `String`
- Content: Complex eligibility logic (as shown above)

**Formula 4: MonthlyPayment**
- Parameters: `principal: Number`, `rate: Number`, `term: Number`
- Returns: `Number`
- Content: Calculate monthly loan payment

**Formula 5: TotalInterest**
- Parameters: `principal: Number`, `rate: Number`, `term: Number`
- Returns: `Number`
- Content: Calculate total interest over loan term (uses `=MonthlyPayment()`)

---

## Success Criteria

✅ **Feature is successful when:**
1. Users can name their formulas with unique identifiers
2. Users can define input parameters with types and descriptions
3. Formulas are automatically registered when published
4. Autocomplete suggests available formulas with signatures
5. Formulas can be invoked using `=FunctionName()` syntax
6. Parameters are correctly passed and bound during execution
7. Nested formula invocations work correctly
8. Circular dependencies are prevented
9. Type validation prevents invalid invocations
10. Clear error messages guide users when issues occur
11. Formula library/browser lets users discover available formulas
12. Performance is acceptable even with nested invocations
13. Code follows Guidelines.md v2.1 patterns
14. Components are documented with READMEs
15. Integration tests pass

---

## Future Enhancements

1. **Formula Marketplace**
   - Share formulas across teams/organizations
   - Import/export formulas
   - Formula templates and libraries

2. **Visual Formula Builder**
   - Drag-and-drop formula composition
   - Visual parameter configuration
   - Flow-based formula design

3. **Formula Debugging**
   - Step through formula execution
   - Inspect parameter values
   - Trace invocation chain

4. **Performance Analytics**
   - Execution time tracking
   - Usage analytics
   - Optimization suggestions

5. **AI-Assisted Formula Generation**
   - Natural language to formula
   - Suggest formulas based on data
   - Auto-complete complex logic

6. **Formula Governance**
   - Approval workflows for published formulas
   - Access control and permissions
   - Audit trail for changes

---

## Related Documentation

- `/change-log/25-10-23_v06-DiffModeVersioningPlan.md` - Related formula versioning
- `/components/editors/code/FormulaEditor/README.md` - (to be updated)
- `/components/editors/code/shared/components/VariableTable/README.md` - Similar pattern
- `/guidelines/Guidelines.md` - Component patterns

---

## Notes

- This is a planning document; implementation will be done in future sessions
- Parameter syntax needs user feedback (@ prefix vs bare identifiers vs $ prefix)
- Formula registry could be extended to support versioning in the future
- Consider integration with BAL Editor for formula invocation
- Excel-like syntax is intentional for familiarity
- This enables powerful formula composition and reusability

---

## Change Log Entry

**Status:** 📋 Planned - Documented in change log but not yet implemented

**Next Steps:**
1. Review parameter syntax options with team/user
2. Get approval on technical approach
3. Decide on phased implementation schedule
4. Start with Phase 1 (Foundation) - low risk, high value
5. Consider starting Formula Registry as standalone service for testing