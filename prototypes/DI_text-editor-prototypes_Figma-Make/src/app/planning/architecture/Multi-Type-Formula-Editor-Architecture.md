# Architecture: Multi-Type Formula Editor with Enhanced Variable System

**Document Type:** System Architecture  
**Status:** 📋 Planning  
**Priority:** High  
**Created:** October 29, 2025  
**Author:** Senior Front End Architect  

---

## Table of Contents

1. [Overview](#overview)
2. [Context & Current State](#context--current-state)
3. [Goals & Requirements](#goals--requirements)
4. [Proposed Architecture](#proposed-architecture)
5. [Component Specifications](#component-specifications)
6. [Data Models](#data-models)
7. [API Contracts](#api-contracts)
8. [Migration Strategy](#migration-strategy)
9. [Implementation Phases](#implementation-phases)
10. [Testing Strategy](#testing-strategy)
11. [Risks & Mitigations](#risks--mitigations)
12. [References](#references)

---

## Overview

### Problem Statement

The Formula Editor currently supports only KPI-type formulas with a limited variable system. To support Business Rules and eventual BAL integration, we need:

1. **Multi-type support** - KPIs, Business Rules, and BAL within the same editor framework
2. **Enhanced variable system** - Scoping, default values, list/object types, vocabulary definitions
3. **Input/Output management** - Smart parameters, custom output objects, type-specific I/O constraints
4. **ADS/ODM compliance** - Verbal operators and syntax alignment with IBM Automation Decision Services / Operational Decision Manager

### Goals

**Primary Goals:**
1. Extend Formula Editor to support KPIs, Business Rules, and BAL
2. Implement comprehensive variable system with scoping, defaults, and complex types
3. Build Input/Output object system for smart parameters and custom outputs
4. Add verbal operator support for Business Rules (ADS/ODM compliance)
5. Audit and align all syntax with GA version of ADS/ODM documentation

**Secondary Goals:**
1. Organize sample formulas by rule type (GENERAL, KPIs, Business Rules, Functions, Formulae)
2. Align BAL Editor architecture with Formula Editor patterns (prepare for unification)

### Success Criteria

- ✅ Formula Editor supports KPI, Business Rule, and BAL types
- ✅ Variables support scoping (formula-local vs. task-global), defaults, list/object types
- ✅ Input/Output system handles smart parameters and custom output objects
- ✅ Business Rules support verbal operators (e.g., "is greater than" instead of ">")
- ✅ All syntax validated against ADS/ODM GA documentation
- ✅ Sample organization clearly separates rule types
- ✅ BAL Editor architectural alignment complete

---

## Context & Current State

### Current Formula Editor

**Supported Features:**
- KPI formulas only
- Variable table with input/output/formula variables
- Basic types: number, string, boolean, date, time
- List<T> types (homogeneous)
- Object literals (recently added)
- Evaluation engine with debugging
- Syntax highlighting and validation

**Current Variable System:**
```typescript
interface Variable {
  id: string;
  name: string;
  type: VariableType;  // 'number' | 'string' | 'boolean' | 'date' | 'time'
  category: 'input' | 'output' | 'formula';
  value?: any;
  dataSource?: string;
}
```

**Current Formula Types:**
- Only supports "KPI" formulas
- No differentiation in syntax or capabilities

**Limitations:**
1. No formula type selection (KPI vs. Business Rule vs. BAL)
2. No variable scoping (all variables are formula-scoped currently)
3. No default values for variables
4. No "is list" or "is object" toggles for types
5. No vocabulary definitions (like BAL has)
6. No input/output object system
7. No verbal operators for Business Rules
8. No ADS/ODM syntax compliance validation

### Related Systems

**BAL Editor:**
- Located in `/components/BALEditor/`
- Separate architecture from Formula Editor
- Has vocabulary system and dictionary
- Uses different syntax highlighting approach
- Needs architectural alignment

**Evaluation Engine:**
- Located in `/services/evaluationEngine/`
- AST-based with tokenizer, parser, evaluator
- 40+ built-in functions
- Supports variables, conditionals, operators
- Needs extension for verbal operators

**Sample Data:**
- Located in `/SampleData/formulaSamples.ts`
- Currently mixed KPI and general examples
- Needs organization by rule type

---

## Goals & Requirements

### REQ-019: Variable System Enhancements

**Feature:** Enhanced variable model with scoping, defaults, complex types, and vocabulary

**Requirements:**

1. **Variable Scoping**
   - Variables can be scoped to individual formulas OR global to task asset
   - Formula-scoped: Only visible within the formula where defined
   - Task-scoped: Shared across all formulas in the same task/context
   - UI clearly indicates scope (icon, label, or tab organization)

2. **Default Values**
   - All variables can have optional default values
   - Defaults used when no input value provided
   - Defaults validated against variable type
   - UI shows default value in variable table

3. **Is List Toggle**
   - After selecting base type (number, string, boolean, date), toggle "Is List"
   - Converts type to List<baseType>
   - Example: number + is list = List<number>

4. **Is Object Toggle**
   - After selecting base type, toggle "Is Object"
   - Indicates variable holds object literal
   - Example: object + properties = { name: string, age: number }

5. **Vocabulary Definition**
   - Similar to BAL's vocabulary system
   - Define reusable terms with descriptions
   - Vocabulary terms available for autocomplete
   - Stored with formula metadata

**Data Model:**
```typescript
interface EnhancedVariable {
  id: string;
  name: string;
  baseType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  isList: boolean;        // NEW
  isObject: boolean;      // NEW
  objectSchema?: ObjectSchema;  // NEW (when isObject = true)
  scope: 'formula' | 'task';    // NEW
  category: 'input' | 'output' | 'formula';
  defaultValue?: any;     // NEW
  value?: any;
  dataSource?: string;
  description?: string;
}

interface ObjectSchema {
  properties: Record<string, {
    type: 'number' | 'string' | 'boolean' | 'date';
    required: boolean;
  }>;
}

interface VocabularyTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
}
```

---

### REQ-020: Input/Output Object System

**Feature:** Smart parameter management and custom output object construction

**Requirements:**

1. **Smart Parameters in Detail Panel**
   - Formula Detail Panel shows "Smart Parameters" section
   - Lists all formula parameters with types and descriptions
   - Indicates which parameters are required vs. optional
   - Shows default values where applicable

2. **Smart Parameters in Output Object**
   - Output object can include input parameters
   - Example: `{ result: 150, inputs: { price: 100, taxRate: 0.5 } }`
   - Toggle to enable/disable input inclusion

3. **Expose Inputs Toggle**
   - UI toggle: "Include inputs in output"
   - When enabled, adds `inputs: {}` to output object with all input variable values
   - When disabled, output only contains result and custom fields

4. **Threshold Value in Output**
   - Threshold evaluation results can be added to output
   - Example: `{ result: 150, threshold: "high", thresholdIndex: 2 }`
   - Checkbox in threshold configuration

5. **Custom Output Object Keys**
   - Allow defining custom keys for output object
   - Default: `{ result: <value> }`
   - Custom: `{ total: <value>, category: "premium", confidence: 0.95 }`
   - UI for adding custom output mappings

6. **Type-Specific I/O Constraints**
   - **KPI formulas:**
     - Must return single numeric value OR object with numeric result
     - Can include metadata (thresholds, confidence, etc.)
   - **Business Rules:**
     - Return boolean OR decision object
     - Must include reasoning/explanation in output
     - Input/output schema validation
   - **BAL formulas:**
     - Structured decision output
     - Requires vocabulary context

**Data Model:**
```typescript
interface FormulaIOConfig {
  includeInputs: boolean;
  includeThresholdInfo: boolean;
  customOutputKeys: CustomOutputKey[];
  outputValidation: OutputValidation;
}

interface CustomOutputKey {
  key: string;
  source: 'variable' | 'threshold' | 'constant';
  sourceRef?: string;  // Variable name or threshold property
  constantValue?: any;
}

interface OutputValidation {
  requiredKeys: string[];
  keyTypes: Record<string, VariableType>;
  customValidator?: (output: any) => ValidationResult;
}
```

---

### REQ-021: Business Rules Support

**Feature:** Verbal operator support for natural language business rules

**Requirements:**

1. **Verbal Operators (Per ADS Implementation)**
   - Support natural language equivalents of operators
   - Must align with IBM ADS/ODM GA documentation
   
   **Comparison Operators:**
   ```
   Symbol    Verbal Equivalents
   >         "is greater than", "is more than", "exceeds"
   >=        "is at least", "is greater than or equal to"
   <         "is less than", "is fewer than"
   <=        "is at most", "is less than or equal to"
   =         "is", "equals", "is equal to"
   !=        "is not", "does not equal", "is not equal to"
   ```
   
   **Logical Operators:**
   ```
   Symbol    Verbal Equivalents
   AND       "and"
   OR        "or"
   NOT       "not", "is not"
   ```
   
   **Arithmetic Operators:**
   ```
   Symbol    Verbal Equivalents
   +         "plus", "added to"
   -         "minus", "subtracted from"
   *         "times", "multiplied by"
   /         "divided by"
   %         "modulo", "remainder of"
   ```

2. **Business Rule Syntax Extensions**
   - Support "the" prefix for entity references
   - Example: "the customer's age is greater than 18"
   - Parse possessive forms ("customer's age")
   - Support articles (the, a, an)

3. **Decision Tables**
   - Tabular representation of business rules
   - Multiple conditions and actions
   - Priority/ordering support
   - Visual decision table editor (future enhancement)

4. **Rule Explanations**
   - Business rules must include explanation of decision
   - Example: "Rule fired: Customer qualifies for premium tier because age > 65 AND account balance >= 10000"
   - Explanation stored in output object

**Evaluation Engine Updates:**
```typescript
// Tokenizer updates
const VERBAL_OPERATORS = {
  'is greater than': '>',
  'is more than': '>',
  'exceeds': '>',
  'is at least': '>=',
  // ... etc
};

// Parser updates to handle verbal tokens
function parseVerbalComparison(tokens: Token[]): ComparisonNode {
  // Convert verbal operator to symbolic
  // Create ComparisonNode with symbolic operator
}

// Business Rule output format
interface BusinessRuleOutput {
  decision: boolean;
  explanation: string;
  rulesFired: string[];
  inputs: Record<string, any>;
  metadata?: any;
}
```

---

### REQ-022: ADS/ODM Syntax Compliance Audit

**Feature:** Comprehensive audit of formula syntax against ADS/ODM GA documentation

**Requirements:**

1. **Documentation Reference**
   - Obtain IBM ADS/ODM GA documentation
   - Document version numbers and publication dates
   - Create compliance matrix

2. **Syntax Audit Areas**
   - **Operators:** Symbolic and verbal
   - **Keywords:** IF, THEN, ELSE, ELSIF, END, RETURN, etc.
   - **Functions:** Built-in function names and signatures
   - **Data Types:** Type names and literal syntax
   - **Comments:** Comment syntax and placement rules
   - **Whitespace:** Significance and formatting rules

3. **Compliance Fixes**
   - Document any deviations from ADS/ODM standard
   - Create issues for non-compliant syntax
   - Prioritize fixes based on impact
   - Update tokenizer, parser, and evaluator

4. **Validation**
   - Create test suite of ADS/ODM example formulas
   - Ensure all examples parse and evaluate correctly
   - Document any intentional deviations with rationale

**Deliverable:**
```
/planning/requirements/ADS-ODM-Compliance-Audit.md
- Current state analysis
- Compliance matrix
- Required changes
- Test coverage plan
```

---

### REQ-023: Sample Organization by Rule Type

**Feature:** Organize formula samples by rule type for better discoverability

**Requirements:**

1. **Sample Categories**
   ```
   GENERAL     - General examples showing functionality (not industry-specific)
   KPIs        - Key Performance Indicator formulas
   BUSINESS_RULES - Business rule formulas with verbal operators
   FUNCTIONS   - Reusable function definitions
   FORMULAE    - General calculation formulas
   ```

2. **Sample Data Structure**
   ```typescript
   interface FormulaSample {
     id: string;
     name: string;
     category: SampleCategory;
     ruleType: 'KPI' | 'BUSINESS_RULE' | 'BAL' | 'GENERAL';
     code: string;
     description: string;
     expectedResult?: any;
     variables?: Variable[];
     tags?: string[];
   }
   
   type SampleCategory = 
     | 'GENERAL'
     | 'KPI'
     | 'BUSINESS_RULE'
     | 'FUNCTION'
     | 'FORMULA';
   ```

3. **UI Organization**
   - Sample selector grouped by category
   - Expandable sections for each category
   - Category counts (e.g., "KPIs (12)")
   - Search within categories
   - Tag-based filtering

4. **Sample Migration**
   - Review all existing samples
   - Assign appropriate categories
   - Create new Business Rule examples
   - Ensure each category has 5+ examples

---

### REQ-024: BAL Editor Architecture Alignment

**Feature:** Align BAL Editor with Formula Editor architecture (preparation for unification)

**Requirements:**

1. **Shared Component Extraction**
   - Identify components used by both editors
   - Extract to `/components/editors/code/shared/`
   - Examples: VariableTable, Autocomplete, syntax highlighting

2. **Architectural Patterns**
   - BAL Editor adopts Formula Editor patterns:
     - Hook-based architecture
     - CSS Modules for styling
     - Composition over configuration
     - Strangler pattern for migration

3. **Shared Services**
   - Evaluation engine compatibility
   - Shared validation utilities
   - Shared formatting utilities

4. **UI Consistency**
   - Same toolbar structure
   - Same panel layouts
   - Same keyboard shortcuts
   - Same visual treatments

5. **Preparation for Business Rule Editor**
   - BAL Editor alignment enables Business Rule variant
   - Business Rule Editor extends Formula Editor with:
     - Verbal operator support
     - BAL-like vocabulary integration
     - Decision table UI (future)

**Migration Plan:**
1. Extract shared components (strangler pattern)
2. Create `/components/editors/code/BALEditor/` (new architecture)
3. Migrate BAL Editor to new architecture
4. Validate feature parity
5. Cutover with feature flag
6. Build Business Rule Editor variant

---

## Proposed Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Formula Editor Shell                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Formula Type Selector: [KPI] [Business Rule] [BAL]    │ │
│  └────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │ Variable Table       │ Code Editor                   │   │
│  │                      │                               │   │
│  │ Scoped Variables:    │ // Business Rule Example      │   │
│  │ • Formula-scoped     │ IF the customer's age         │   │
│  │ • Task-scoped        │    is greater than 65         │   │
│  │                      │    AND account balance        │   │
│  │ Enhanced Features:   │    is at least 10000          │   │
│  │ • Default values     │ THEN                          │   │
│  │ • Is List toggle     │   eligibility = true          │   │
│  │ • Is Object toggle   │   tier = "premium"            │   │
│  │ • Vocabulary link    │   RETURN {                    │   │
│  │                      │     decision: eligibility,    │   │
│  │                      │     tier: tier,               │   │
│  │                      │     inputs: <auto>            │   │
│  │                      │   }                           │   │
│  │                      │ END                           │   │
│  └──────────────────────┴──────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Test Panel / Debug Panel                                  │
│  ┌────────────────────────────────────────────────────────┐│
│  │ Smart Parameters:                                      ││
│  │ • customer.age (number) = 70                          ││
│  │ • accountBalance (number) = 15000                     ││
│  │                                                        ││
│  │ Output Object Configuration:                          ││
│  │ ☑ Include inputs                                      ││
│  │ ☑ Include threshold info                             ││
│  │ Custom Keys: [+Add Key]                               ││
│  │                                                        ││
│  │ Result:                                               ││
│  │ {                                                     ││
│  │   decision: true,                                     ││
│  │   tier: "premium",                                    ││
│  │   inputs: { age: 70, accountBalance: 15000 },        ││
│  │   explanation: "Customer qualifies for premium..."    ││
│  │ }                                                     ││
│  └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
FormulaEditor (main component)
├── FormulaTypeSelector (NEW)
│   └── Type selection: KPI, Business Rule, BAL
│
├── EnhancedVariableTable (ENHANCED)
│   ├── ScopeSelector (NEW)
│   ├── DefaultValueInput (NEW)
│   ├── TypeModifiers (NEW)
│   │   ├── IsListToggle
│   │   └── IsObjectToggle
│   └── VocabularyLink (NEW)
│
├── CodeEditor (formula-specific syntax)
│   ├── VerbalOperatorSupport (NEW - Business Rules)
│   ├── BALSyntaxSupport (NEW - BAL formulas)
│   └── ExistingSyntaxHighlighting
│
├── FormulaTestPanel (ENHANCED)
│   ├── SmartParametersView (NEW)
│   ├── OutputConfigPanel (NEW)
│   │   ├── IncludeInputsToggle
│   │   ├── IncludeThresholdToggle
│   │   └── CustomKeysEditor
│   └── ResultViewer (enhanced with output object)
│
└── FormulaDetailsPanel (ENHANCED)
    ├── FunctionReference (existing)
    ├── SmartParametersSection (NEW)
    └── VocabularyBrowser (NEW)
```

---

## Component Specifications

### 1. FormulaTypeSelector

**Purpose:** Allow selection of formula type (KPI, Business Rule, BAL)

**Location:** `/components/editors/code/FormulaEditor/FormulaTypeSelector.tsx`

**Props:**
```typescript
interface FormulaTypeSelectorProps {
  selectedType: 'KPI' | 'BUSINESS_RULE' | 'BAL';
  onTypeChange: (type: FormulaType) => void;
  disabled?: boolean;
}
```

**UI Design:**
- Segmented control (Carbon Tab-like)
- Icons for each type (chart for KPI, decision tree for Business Rule, text for BAL)
- Disabled state when formula has content (require confirmation to switch)

**Behavior:**
- Switching type shows confirmation dialog if formula has content
- Updates syntax highlighting rules
- Updates available functions in autocomplete
- Updates validation rules

---

### 2. EnhancedVariableTable

**Purpose:** Extended variable table with scoping, defaults, and type modifiers

**Location:** `/components/editors/code/shared/components/VariableTable/EnhancedVariableTable.tsx`

**Props:**
```typescript
interface EnhancedVariableTableProps {
  variables: EnhancedVariable[];
  onVariableChange: (variable: EnhancedVariable) => void;
  onVariableAdd: () => void;
  onVariableDelete: (id: string) => void;
  formulaType: FormulaType;
  vocabularyTerms?: VocabularyTerm[];
  onVocabularyOpen?: () => void;
}
```

**UI Design:**
```
┌────────────────────────────────────────────────────────┐
│ Variables                        [Formula] [Task]      │ ← Scope tabs
├────────────────────────────────────────────────────────┤
│ Name        Type      Modifiers  Default   Category   │
├────────────────────────────────────────────────────────┤
│ revenue     number    [List]     1000      Input      │
│ customer    string    [Object]   -         Input      │
│ discount    number    -          0.1       Formula    │
│ result      boolean   -          false     Output     │
│                                                        │
│ [+ Add Variable]              [📖 Vocabulary]         │
└────────────────────────────────────────────────────────┘
```

**New UI Elements:**

1. **Scope Tabs:**
   - "Formula" tab: Variables scoped to this formula
   - "Task" tab: Variables shared across formulas in task

2. **Type Modifiers:**
   - After selecting base type, show modifiers:
   - [Is List] checkbox → converts to List<baseType>
   - [Is Object] checkbox → opens object schema editor

3. **Default Value Column:**
   - Input field for default value
   - Validated against variable type
   - Optional (can be empty)

4. **Vocabulary Button:**
   - Opens vocabulary browser
   - Shows vocabulary terms for autocomplete
   - Link to BAL-style vocabulary definitions

**Behavior:**
- Scope changes update variable visibility
- Type modifiers update variable type in real-time
- Default values validated on blur
- Vocabulary terms available in autocomplete

---

### 3. VerbalOperatorSupport

**Purpose:** Tokenize and parse verbal operators for Business Rules

**Location:** `/services/evaluationEngine/parsers/VerbalOperatorParser.ts`

**Interface:**
```typescript
interface VerbalOperatorParser {
  // Convert verbal phrase to symbolic operator
  parseVerbalOperator(phrase: string): SymbolicOperator | null;
  
  // Check if phrase is a verbal operator
  isVerbalOperator(phrase: string): boolean;
  
  // Get all verbal equivalents for symbolic operator
  getVerbalEquivalents(operator: SymbolicOperator): string[];
}

type SymbolicOperator = '>' | '>=' | '<' | '<=' | '=' | '!=' | '+' | '-' | '*' | '/' | '%' | 'AND' | 'OR' | 'NOT';
```

**Implementation:**
```typescript
const VERBAL_OPERATOR_MAP: Record<string, SymbolicOperator> = {
  'is greater than': '>',
  'is more than': '>',
  'exceeds': '>',
  'is at least': '>=',
  'is greater than or equal to': '>=',
  'is less than': '<',
  'is fewer than': '<',
  'is at most': '<=',
  'is less than or equal to': '<=',
  'is': '=',
  'equals': '=',
  'is equal to': '=',
  'is not': '!=',
  'does not equal': '!=',
  'is not equal to': '!=',
  'plus': '+',
  'added to': '+',
  'minus': '-',
  'subtracted from': '-',
  'times': '*',
  'multiplied by': '*',
  'divided by': '/',
  'modulo': '%',
  'remainder of': '%',
  'and': 'AND',
  'or': 'OR',
  'not': 'NOT'
};

export function parseVerbalOperator(phrase: string): SymbolicOperator | null {
  const normalized = phrase.toLowerCase().trim();
  return VERBAL_OPERATOR_MAP[normalized] || null;
}
```

**Tokenizer Integration:**
```typescript
// In Tokenizer.ts
function tokenize(code: string): Token[] {
  // ... existing tokenization
  
  // Check for multi-word verbal operators
  for (const [verbal, symbolic] of Object.entries(VERBAL_OPERATOR_MAP)) {
    if (currentPhrase.toLowerCase() === verbal) {
      tokens.push({
        type: 'OPERATOR',
        value: symbolic,
        verbalForm: verbal,  // Preserve original for error messages
        location: { ... }
      });
    }
  }
  
  // ... continue tokenization
}
```

---

### 4. SmartParametersView

**Purpose:** Display formula parameters with types and descriptions in test panel

**Location:** `/components/editors/code/FormulaEditor/SmartParametersView.tsx`

**Props:**
```typescript
interface SmartParametersViewProps {
  parameters: FormulaParameter[];
  values: Record<string, any>;
  onValueChange: (paramName: string, value: any) => void;
}

interface FormulaParameter {
  name: string;
  type: VariableType;
  required: boolean;
  defaultValue?: any;
  description?: string;
}
```

**UI Design:**
```
┌────────────────────────────────────────┐
│ Smart Parameters                       │
├────────────────────────────────────────┤
│ customer.age (number) *                │
│ [70              ] Default: 0          │
│                                        │
│ accountBalance (number) *              │
│ [15000           ] Default: 0          │
│                                        │
│ loyaltyTier (string)                   │
│ [gold           ] Default: "standard"  │
│                                        │
│ * Required                             │
└────────────────────────────────────────┘
```

**Features:**
- Shows all input variables
- Indicates required vs. optional (asterisk)
- Shows default values
- Inline editing of values
- Type validation

---

### 5. OutputConfigPanel

**Purpose:** Configure output object structure and custom keys

**Location:** `/components/editors/code/FormulaEditor/OutputConfigPanel.tsx`

**Props:**
```typescript
interface OutputConfigPanelProps {
  config: FormulaIOConfig;
  onConfigChange: (config: FormulaIOConfig) => void;
  formulaType: FormulaType;
}
```

**UI Design:**
```
┌────────────────────────────────────────┐
│ Output Configuration                   │
├────────────────────────────────────────┤
│ ☑ Include inputs in output             │
│ ☑ Include threshold information        │
│                                        │
│ Custom Output Keys:                    │
│ ┌────────────────────────────────────┐ │
│ │ result → formula result (default)  │ │
│ │ tier → variable: customerTier      │ │
│ │ confidence → constant: 0.95        │ │
│ │ [+ Add Custom Key]                 │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Preview:                               │
│ {                                      │
│   result: <computed>,                  │
│   tier: "premium",                     │
│   confidence: 0.95,                    │
│   inputs: { age: 70, ... }             │
│ }                                      │
└────────────────────────────────────────┘
```

**Features:**
- Toggle for including inputs
- Toggle for including threshold info
- Custom key editor
- Live preview of output structure
- Validation of custom keys

---

### 6. VocabularyBrowser

**Purpose:** Browse and manage vocabulary terms (similar to BAL Dictionary)

**Location:** `/components/editors/code/FormulaEditor/VocabularyBrowser.tsx`

**Props:**
```typescript
interface VocabularyBrowserProps {
  terms: VocabularyTerm[];
  onTermAdd: (term: VocabularyTerm) => void;
  onTermEdit: (term: VocabularyTerm) => void;
  onTermDelete: (termId: string) => void;
  onTermSelect?: (term: VocabularyTerm) => void;
}
```

**UI Design:**
```
┌──────────────────────────────────────────┐
│ Formula Vocabulary                       │
│ [Search terms...]                        │
├──────────────────────────────────────────┤
│ Business Terms:                          │
│ • customer                               │
│   A person who purchases products        │
│                                          │
│ • premium tier                           │
│   Highest loyalty level (age > 65 OR     │
│   lifetime spend > $10,000)              │
│                                          │
│ • account balance                        │
│   Current balance in customer account    │
│                                          │
│ [+ Add Term]                             │
└──────────────────────────────────────────┘
```

**Features:**
- List of vocabulary terms
- Term definitions
- Search/filter terms
- Add/edit/delete terms
- Insert term into formula (autocomplete)

---

## Data Models

### Enhanced Variable Model

```typescript
interface EnhancedVariable {
  id: string;
  name: string;
  
  // Type system
  baseType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  isList: boolean;
  isObject: boolean;
  objectSchema?: ObjectSchema;
  
  // Computed type (for backward compatibility)
  get type(): VariableType {
    if (this.isObject) return 'object';
    if (this.isList) return `list-${this.baseType}`;
    return this.baseType;
  }
  
  // Scoping
  scope: 'formula' | 'task';
  
  // Variable category
  category: 'input' | 'output' | 'formula';
  
  // Values
  defaultValue?: any;
  value?: any;
  
  // Metadata
  description?: string;
  dataSource?: string;
  vocabularyRef?: string;  // Reference to vocabulary term
}

interface ObjectSchema {
  properties: Record<string, ObjectProperty>;
}

interface ObjectProperty {
  type: 'number' | 'string' | 'boolean' | 'date';
  required: boolean;
  defaultValue?: any;
  description?: string;
}
```

### Formula Type Model

```typescript
type FormulaType = 'KPI' | 'BUSINESS_RULE' | 'BAL';

interface FormulaMetadata {
  id: string;
  name: string;
  type: FormulaType;
  description?: string;
  
  // Variables
  variables: EnhancedVariable[];
  
  // Vocabulary
  vocabularyTerms: VocabularyTerm[];
  
  // I/O Configuration
  ioConfig: FormulaIOConfig;
  
  // Code
  code: string;
  
  // Validation
  validationRules?: ValidationRule[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  author?: string;
  version?: string;
}
```

### Input/Output Configuration

```typescript
interface FormulaIOConfig {
  // Input handling
  requiredInputs: string[];  // Variable names that must have values
  
  // Output handling
  includeInputs: boolean;
  includeThresholdInfo: boolean;
  customOutputKeys: CustomOutputKey[];
  
  // Type-specific validation
  outputValidation: OutputValidation;
}

interface CustomOutputKey {
  key: string;
  source: 'variable' | 'threshold' | 'constant' | 'computed';
  sourceRef?: string;
  constantValue?: any;
  computeExpression?: string;  // For computed values
}

interface OutputValidation {
  requiredKeys: string[];
  keyTypes: Record<string, VariableType>;
  customValidator?: string;  // Serialized validator function
}
```

### Vocabulary Model

```typescript
interface VocabularyTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  synonyms?: string[];
  relatedTerms?: string[];
  usageExample?: string;
  
  // For autocomplete
  autocompleteText: string;
  autocompleteDetail: string;
}
```

---

## API Contracts

### Enhanced Variable Table API

```typescript
interface VariableTableAPI {
  // Variable CRUD
  addVariable(variable: Partial<EnhancedVariable>): EnhancedVariable;
  updateVariable(id: string, updates: Partial<EnhancedVariable>): void;
  deleteVariable(id: string): void;
  getVariable(id: string): EnhancedVariable | undefined;
  getAllVariables(): EnhancedVariable[];
  
  // Scoping
  getFormulaVariables(): EnhancedVariable[];
  getTaskVariables(): EnhancedVariable[];
  
  // Category filtering
  getInputVariables(): EnhancedVariable[];
  getOutputVariables(): EnhancedVariable[];
  getFormulaVariables(): EnhancedVariable[];
  
  // Type modifiers
  toggleIsList(variableId: string): void;
  toggleIsObject(variableId: string): void;
  setObjectSchema(variableId: string, schema: ObjectSchema): void;
  
  // Default values
  setDefaultValue(variableId: string, value: any): void;
  getDefaultValue(variableId: string): any;
}
```

### Formula Type Selector API

```typescript
interface FormulaTypeSelectorAPI {
  // Type management
  getFormulaType(): FormulaType;
  setFormulaType(type: FormulaType): void;
  
  // Type-specific configuration
  getTypeConfig(type: FormulaType): FormulaTypeConfig;
  
  // Validation
  canSwitchType(newType: FormulaType): boolean;
  getSwitchWarnings(newType: FormulaType): string[];
}

interface FormulaTypeConfig {
  type: FormulaType;
  syntaxMode: 'symbolic' | 'verbal' | 'bal';
  availableFunctions: string[];
  requiredOutputKeys: string[];
  allowedVariableTypes: VariableType[];
}
```

### Output Configuration API

```typescript
interface OutputConfigAPI {
  // Configuration management
  getConfig(): FormulaIOConfig;
  updateConfig(config: Partial<FormulaIOConfig>): void;
  
  // Custom keys
  addCustomKey(key: CustomOutputKey): void;
  removeCustomKey(keyName: string): void;
  updateCustomKey(keyName: string, updates: Partial<CustomOutputKey>): void;
  
  // Output generation
  generateOutput(formulaResult: any, context: ExecutionContext): any;
  validateOutput(output: any): ValidationResult;
  
  // Preview
  getOutputPreview(formulaResult: any): any;
}
```

### Vocabulary API

```typescript
interface VocabularyAPI {
  // Term management
  addTerm(term: VocabularyTerm): void;
  updateTerm(termId: string, updates: Partial<VocabularyTerm>): void;
  deleteTerm(termId: string): void;
  getTerm(termId: string): VocabularyTerm | undefined;
  getAllTerms(): VocabularyTerm[];
  
  // Search
  searchTerms(query: string): VocabularyTerm[];
  getTermsByCategory(category: string): VocabularyTerm[];
  
  // Autocomplete integration
  getAutocompleteTerms(): AutocompleteSuggestion[];
}
```

---

## Migration Strategy

### Phase-Based Approach

We'll use the **Strangler Pattern** to migrate safely:

1. **Build new features alongside existing code**
2. **Validate with one formula type first** (KPI)
3. **Gradually add Business Rule and BAL support**
4. **Use feature flags** for safe rollout
5. **Maintain backward compatibility** throughout

### Migration Phases

**Phase 1: Variable System Enhancement**
- Add EnhancedVariable model (backward compatible)
- Extend VariableTable component
- Add scoping, defaults, type modifiers
- Test with existing KPI formulas

**Phase 2: Formula Type Infrastructure**
- Add FormulaTypeSelector component
- Implement type switching logic
- Add type-specific configuration
- Test type switching

**Phase 3: Input/Output System**
- Build OutputConfigPanel
- Implement custom output key system
- Add SmartParametersView
- Test with KPI formulas

**Phase 4: Business Rules Support**
- Implement verbal operator parser
- Update tokenizer for verbal operators
- Add Business Rule samples
- Test Business Rule formulas

**Phase 5: Vocabulary System**
- Build VocabularyBrowser component
- Integrate vocabulary with autocomplete
- Add vocabulary management UI
- Test vocabulary features

**Phase 6: BAL Editor Alignment**
- Extract shared components
- Build new BAL Editor in `/components/editors/code/BALEditor/`
- Migrate BAL Editor (strangler pattern)
- Feature flag cutover

**Phase 7: ADS/ODM Compliance**
- Audit all syntax against ADS/ODM docs
- Fix compliance issues
- Validate with ADS/ODM test suite
- Document deviations

---

## Implementation Phases

### Phase 1: Variable System Enhancement (3-4 days)

**Goal:** Extend variable system with scoping, defaults, and type modifiers

**Tasks:**
1. Create EnhancedVariable data model
2. Update VariableTable component
   - Add scope tabs (Formula / Task)
   - Add default value column
   - Add type modifier checkboxes (Is List, Is Object)
3. Add ObjectSchemaEditor modal
4. Update variable hooks (useFormulaVariables)
5. Migration script for existing variables
6. Unit tests for enhanced variable system
7. Integration tests with Formula Editor

**Deliverables:**
- `/services/evaluationEngine/types/EnhancedVariable.ts`
- `/components/editors/code/shared/components/VariableTable/EnhancedVariableTable.tsx`
- `/components/editors/code/shared/components/VariableTable/ObjectSchemaEditor.tsx`
- `/components/editors/code/FormulaEditor/hooks/useEnhancedVariables.ts`
- Migration script
- Test suite

**Validation:**
- Existing formulas continue to work
- New variable features functional
- No breaking changes to existing code

---

### Phase 2: Formula Type Infrastructure (2-3 days)

**Goal:** Add formula type selection and type-specific configuration

**Tasks:**
1. Create FormulaTypeSelector component
2. Add FormulaType to formula metadata
3. Implement type switching logic with confirmation
4. Add type-specific configuration system
5. Update syntax highlighting per type
6. Update autocomplete per type
7. Unit tests for type selector
8. Integration tests

**Deliverables:**
- `/components/editors/code/FormulaEditor/FormulaTypeSelector.tsx`
- `/services/evaluationEngine/types/FormulaTypeConfig.ts`
- Updated FormulaEditor.tsx with type selector
- Type-specific syntax highlighting
- Test suite

**Validation:**
- Type selection works correctly
- Switching types shows confirmation
- Type-specific features load correctly

---

### Phase 3: Input/Output System (3-4 days)

**Goal:** Build I/O configuration and smart parameter management

**Tasks:**
1. Create FormulaIOConfig data model
2. Build OutputConfigPanel component
3. Build SmartParametersView component
4. Implement custom output key editor
5. Update evaluator to generate custom outputs
6. Add output preview functionality
7. Update test panel with I/O features
8. Unit tests for I/O system
9. Integration tests

**Deliverables:**
- `/services/evaluationEngine/types/FormulaIOConfig.ts`
- `/components/editors/code/FormulaEditor/OutputConfigPanel.tsx`
- `/components/editors/code/FormulaEditor/SmartParametersView.tsx`
- Updated Evaluator with output generation
- Updated FormulaTestPanel
- Test suite

**Validation:**
- Custom outputs generated correctly
- Smart parameters displayed correctly
- Include inputs/threshold toggles work

---

### Phase 4: Business Rules Support (4-5 days)

**Goal:** Add verbal operator support for Business Rules

**Tasks:**
1. Research ADS/ODM verbal operator documentation
2. Create verbal operator map
3. Implement VerbalOperatorParser
4. Update Tokenizer for verbal operators
5. Update Parser for verbal syntax
6. Add Business Rule syntax highlighting
7. Create Business Rule sample formulas
8. Add Business Rule specific validation
9. Unit tests for verbal operators
10. Integration tests with Business Rules

**Deliverables:**
- `/services/evaluationEngine/parsers/VerbalOperatorParser.ts`
- Updated Tokenizer.ts
- Updated FormulaParser.ts
- Business Rule syntax highlighting rules
- 10+ Business Rule samples
- Test suite

**Validation:**
- Verbal operators parse correctly
- Business Rules evaluate correctly
- Symbolic and verbal syntax both work

---

### Phase 5: Vocabulary System (3-4 days)

**Goal:** Build vocabulary management for Business Rules and BAL

**Tasks:**
1. Create VocabularyTerm data model
2. Build VocabularyBrowser component
3. Add vocabulary storage/persistence
4. Integrate vocabulary with autocomplete
5. Add vocabulary link in variable table
6. Create vocabulary management UI
7. Add vocabulary to sample formulas
8. Unit tests for vocabulary system
9. Integration tests

**Deliverables:**
- `/services/evaluationEngine/types/VocabularyTerm.ts`
- `/components/editors/code/FormulaEditor/VocabularyBrowser.tsx`
- Vocabulary storage service
- Updated autocomplete with vocabulary
- Test suite

**Validation:**
- Vocabulary terms managed correctly
- Autocomplete includes vocabulary
- Vocabulary persists across sessions

---

### Phase 6: BAL Editor Alignment (5-7 days)

**Goal:** Align BAL Editor architecture with Formula Editor

**Tasks:**
1. Extract shared components to `/components/editors/code/shared/`
2. Create new BAL Editor in `/components/editors/code/BALEditor/`
3. Migrate BAL syntax highlighting to new architecture
4. Migrate BAL autocomplete to new architecture
5. Migrate BAL vocabulary to new architecture
6. Add feature flag for BAL Editor switching
7. Comprehensive testing of new BAL Editor
8. Feature flag cutover
9. Remove old BAL Editor (after stabilization period)

**Deliverables:**
- Shared components extracted
- `/components/editors/code/BALEditor/` (new architecture)
- Feature flag implementation
- Migration documentation
- Test suite

**Validation:**
- New BAL Editor has feature parity
- No regressions in BAL functionality
- Performance acceptable

---

### Phase 7: ADS/ODM Compliance Audit (3-5 days)

**Goal:** Validate syntax compliance with ADS/ODM GA documentation

**Tasks:**
1. Obtain ADS/ODM GA documentation
2. Create compliance matrix spreadsheet
3. Audit operators (symbolic and verbal)
4. Audit keywords (IF, THEN, ELSE, etc.)
5. Audit built-in functions
6. Audit data type syntax
7. Create ADS/ODM test suite from documentation examples
8. Fix compliance issues
9. Document intentional deviations
10. Update documentation

**Deliverables:**
- `/planning/requirements/ADS-ODM-Compliance-Audit.md`
- Compliance matrix spreadsheet
- ADS/ODM test suite
- Compliance fixes
- Documentation updates

**Validation:**
- All ADS/ODM examples parse and evaluate correctly
- Deviations documented with rationale
- Compliance documented

---

### Phase 8: Sample Organization (1-2 days)

**Goal:** Organize samples by rule type for better discoverability

**Tasks:**
1. Update FormulaSample interface with category
2. Review and categorize all existing samples
3. Create new Business Rule samples
4. Update sample selector UI with categories
5. Add category filtering
6. Add search within categories
7. Documentation updates

**Deliverables:**
- Updated sample data structure
- Categorized samples
- 5+ samples per category
- Updated sample selector UI
- Documentation

**Validation:**
- All samples categorized correctly
- Sample selector shows categories
- Filtering and search work

---

## Testing Strategy

### Unit Tests

**Variable System:**
- EnhancedVariable model operations
- Scope filtering (formula vs. task)
- Type modifier toggling
- Default value validation
- Object schema validation

**Formula Type:**
- Type selection and switching
- Type-specific configuration loading
- Type validation

**I/O System:**
- Custom output key generation
- Output object assembly
- Smart parameter validation
- Include inputs/threshold toggles

**Verbal Operators:**
- Verbal operator parsing
- Tokenization of verbal phrases
- Conversion to symbolic operators

**Vocabulary:**
- Term CRUD operations
- Search and filtering
- Autocomplete integration

### Integration Tests

**Formula Editor:**
- Variable table with enhanced features
- Type switching with formula content
- I/O configuration with formula execution
- Vocabulary integration with autocomplete

**Evaluation Engine:**
- Business Rule formulas with verbal operators
- Custom output object generation
- Variable scoping in evaluation context
- Vocabulary term resolution

**Sample Formulas:**
- All sample formulas execute correctly
- Results match expected values
- No regressions from enhancements

### End-to-End Tests

**User Workflows:**
1. Create KPI formula with scoped variables and defaults
2. Create Business Rule with verbal operators
3. Configure custom output object
4. Switch formula types
5. Use vocabulary in formula
6. Test formula with smart parameters

**Migration Scenarios:**
1. Existing formulas continue to work
2. Variables migrate to enhanced model
3. Output format backward compatible
4. No data loss during migration

---

## Risks & Mitigations

### Risk 1: Breaking Changes to Existing Formulas

**Risk:** Enhanced variable system or I/O changes break existing formulas

**Mitigation:**
- Maintain backward compatibility with EnhancedVariable
- Provide migration script for existing formulas
- Feature flags for gradual rollout
- Comprehensive testing before cutover
- Rollback plan ready

**Contingency:**
- Keep old variable system available via feature flag
- Revert to previous version if critical issues

---

### Risk 2: ADS/ODM Documentation Unavailable

**Risk:** Cannot obtain IBM ADS/ODM GA documentation for compliance audit

**Mitigation:**
- Request documentation from IBM through official channels
- Use publicly available ADS/ODM resources
- Consult with subject matter experts
- Document assumptions and mark for future validation

**Contingency:**
- Implement based on best understanding of ADS/ODM patterns
- Mark syntax as "best effort" until documentation available
- Plan for future compliance pass when documentation obtained

---

### Risk 3: Verbal Operator Ambiguity

**Risk:** Verbal operators have ambiguous parsing (e.g., "is not greater than")

**Mitigation:**
- Define clear precedence rules
- Document supported verbal forms
- Provide clear error messages for ambiguous syntax
- Test extensively with edge cases

**Contingency:**
- Support subset of verbal operators initially
- Expand support based on user feedback
- Provide symbolic fallback for ambiguous cases

---

### Risk 4: Performance Degradation

**Risk:** Enhanced features slow down editor or evaluation

**Mitigation:**
- Performance benchmarks before and after changes
- Optimize hot paths (tokenization, parsing, evaluation)
- Lazy load vocabulary and configuration
- Cache computed values

**Contingency:**
- Feature flags to disable expensive features
- Optimization pass if performance issues detected
- Async loading of heavy components

---

### Risk 5: BAL Editor Migration Complexity

**Risk:** BAL Editor has unique features hard to migrate

**Mitigation:**
- Thorough analysis of BAL Editor features before migration
- Strangler pattern for safe incremental migration
- Feature flag for quick rollback
- Extended testing period

**Contingency:**
- Delay BAL migration if risks too high
- Keep old BAL Editor as fallback
- Prioritize Business Rule support over BAL integration

---

## References

### Related Documents

**EPICs:**
- [EPIC: Formula Type System](/planning/epics/EPIC-FormulaTypeSystem.md)
- [EPIC: List/Array Type Support](/planning/epics/EPIC-ListArrayType.md)
- [EPIC: BAL Dynamic Keyword Highlighting](/planning/epics/EPIC-BALDynamicKeywordHighlighting.md)

**Requirements:**
- [Formula Engine Architecture](/planning/requirements/25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [Structured Data Plan](/planning/requirements/PLAN-ListArrayIncrement3.1-StructuredData.md)

**Guidelines:**
- [Development Guidelines](/guidelines/Guidelines.md)
- [Strangler Pattern Guidelines](/planning/requirements/25-10-28_v13-StranglerPatternGuidelines.md)

**Implementation:**
- [Editor Recovery Plan](/planning/requirements/25-10-28_v12-EDITOR_RECOVERY_PLAN.md)

### External References

**IBM ADS/ODM Documentation:**
- IBM Automation Decision Services (ADS) GA Documentation
- IBM Operational Decision Manager (ODM) GA Documentation
- Decision Model and Notation (DMN) Specification
- Business Rule Syntax Standards

**Related Technologies:**
- IBM Carbon Design System v11
- React Hook Patterns
- AST-based Parsing Patterns

---

## Approval & Sign-off

**Architecture Review:**
- [ ] Senior Front End Architect
- [ ] Technical Lead
- [ ] Product Owner

**Stakeholder Approval:**
- [ ] Engineering Manager
- [ ] Product Manager
- [ ] UX Designer

**Ready for Implementation:**
- [ ] Architecture approved
- [ ] Phases defined
- [ ] Risks identified and mitigated
- [ ] Testing strategy agreed
- [ ] Migration plan validated

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Next Review:** After Phase 1 implementation  
**Related Architecture:** None (new initiative)
