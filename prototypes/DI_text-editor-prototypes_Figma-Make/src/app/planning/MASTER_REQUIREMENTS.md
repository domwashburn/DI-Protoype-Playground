# Master Requirements: Platform Architecture & Feature Roadmap

**Document Type:** Master Requirements Overview  
**Status:** 🚧 Active Planning  
**Last Updated:** October 29, 2025  
**Scope:** All planning documents, architectural decisions, and feature requirements  

---

## Document Purpose

This master requirements document provides a comprehensive roadmap of all planned features, architectural decisions, and technical specifications across the multi-editor platform. It organizes requirements by category and shows relationships between planning documents and their implementations.

---

## Table of Contents

1. [Architecture & Migration](#architecture--migration)
2. [Formula Engine & Evaluation](#formula-engine--evaluation)
3. [Formula Debugger](#formula-debugger)
4. [Type System & Validation](#type-system--validation)
5. [Data Types & Structures](#data-types--structures)
6. [Editor Features](#editor-features)
7. [UI/UX Enhancements](#uiux-enhancements)
8. [Future Features](#future-features)

---

## Architecture & Migration

### Editor Recovery & Migration Strategy

**REQ-001: Editor Recovery Plan**  
**Status:** ✅ Phase R1 Complete  
**Priority:** Critical  
**Document:** [25-10-28_v12-EDITOR_RECOVERY_PLAN.md](/planning/requirements/25-10-28_v12-EDITOR_RECOVERY_PLAN.md)

**Overview:**  
Comprehensive recovery plan addressing mid-migration state challenges, BAL Editor regression, and dual architecture (old vs new) coordination following migration from styled-jsx to CSS Modules.

**Key Requirements:**
- Stabilize editor infrastructure following strangler pattern
- Implement error/warning gutter icon system (CRIT-002)
- Fix line wrapping with proper height measurement (CRIT-003)
- Ensure scroll synchronization across overlays
- Document migration lessons learned

**Phases:**
- ✅ **Phase R1** - CRIT-001, CRIT-002, CRIT-003 resolution
- 📋 **Phase R2** - Long-term stabilization and optimization

**Implementation:**
- [v01 - CRIT-002 Verification](/change-log/25-10-29_v01-CRIT002-Verification.md)
- [v20 - CRIT-003 Complete](/change-log/25-10-28_v20-LineNumberScrollSyncFix.md)
- [v14 - BAL Editor Scroll Sync](/change-log/25-10-28_v14-BALEditorScrollSyncFix.md)

---

**REQ-002: Strangler Pattern Migration Guidelines**  
**Status:** ✅ Complete (Documented)  
**Priority:** Critical  
**Document:** [25-10-28_v13-StranglerPatternGuidelines.md](/planning/requirements/25-10-28_v13-StranglerPatternGuidelines.md)

**Overview:**  
Comprehensive guidelines for safe incremental migrations using the strangler pattern to avoid "big bang" rewrites and maintain zero-regression principle.

**Key Requirements:**
- Build new architecture alongside old (never replace directly)
- Prove before migrating (validate with one component first)
- Strict boundaries between old and new code
- Feature flags for safe cutover
- Rollback plans always available

**Migration Checklist Template:**
- Pre-migration: Documentation, git tags, rollback procedure
- During migration: Separate location, feature flags, thorough testing
- Validation: Feature parity, performance, edge cases
- Cutover: Monitor, quick rollback capability
- Cleanup: Stabilization period (1+ week) before deleting old code

**Implementation:**
- [Guidelines v2.2](/guidelines/Guidelines.md) - Migration Strategy section
- Used successfully in Formula Editor creation
- Applied to BAL Editor recovery (Phase R1)

---

## Formula Engine & Evaluation

### Core Evaluation Architecture

**REQ-003: Formula Engine Architecture**  
**Status:** ✅ Complete  
**Priority:** High  
**Documents:**  
- [25-10-25_v04-FormulaEngineArchitecturePlan.md](/planning/requirements/25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [25-10-25_v05-FormulaEngineArchitectureAddendum.md](/planning/requirements/25-10-25_v05-FormulaEngineArchitectureAddendum.md)

**Overview:**  
Production-ready AST-based formula evaluation engine with tokenizer, parser, evaluator, and comprehensive function registry supporting variable assignments, conditionals, and 40+ built-in functions.

**Key Requirements:**
- Tokenizer with accurate location tracking
- Recursive descent parser generating AST
- Tree-walk evaluator for runtime execution
- Function registry with 40+ functions
- Error recovery and validation
- Support for variables, conditionals, operators
- Comment support (`//` single-line)

**Architecture:**
```
Formula Code
    ↓
Tokenizer → Tokens
    ↓
Parser → AST
    ↓
Evaluator → Result
```

**Components:**
- `/services/evaluationEngine/parsers/Tokenizer.ts`
- `/services/evaluationEngine/parsers/FormulaParser.ts`
- `/services/evaluationEngine/ast/ASTNodes.ts`
- `/services/evaluationEngine/runtime/Evaluator.ts`
- `/services/evaluationEngine/runtime/FunctionRegistry.ts`
- `/services/evaluationEngine/runtime/Context.ts`

**Implementation:**
- [v07 - Evaluation Engine Implementation](/change-log/25-10-25_v07-EvaluationEngineImplementation.md)
- [v08 - Defined Variable Calculation](/change-log/25-10-25_v08-DefinedVariableCalculation.md)
- [v19 - Comment Support](/change-log/25-10-25_v19-FormulaCommentSupport.md)
- [v20 - Assignments in IF Blocks Fix](/change-log/25-10-25_v20-AssignmentsInIfBlocks.md)

---

### Threshold Evaluation

**REQ-004: Threshold Evaluation Architecture**  
**Status:** ✅ Phase 1 Complete  
**Priority:** High  
**Document:** [25-10-25_v06-ThresholdEvaluationArchitecture.md](/planning/requirements/25-10-25_v06-ThresholdEvaluationArchitecture.md)

**Overview:**  
Production-ready threshold evaluation system with intelligent gap handling strategies for cases where input falls between defined thresholds.

**Key Requirements:**
- Threshold array with value-result pairs
- 7 gap handling strategies (nearest, interpolate, lower, upper, error, default, null)
- ThresholdEvaluator service
- ThresholdConfig UI component
- Integration with Formula Editor

**Gap Strategies:**
1. **NEAREST** - Return closest threshold value
2. **INTERPOLATE** - Linear interpolation between thresholds
3. **LOWER** - Use lower threshold value
4. **UPPER** - Use upper threshold value
5. **ERROR** - Throw error for gaps
6. **DEFAULT** - Return default value
7. **NULL** - Return null for gaps

**Components:**
- `/services/evaluationEngine/threshold/ThresholdEvaluator.ts`
- `/services/evaluationEngine/threshold/ThresholdValidator.ts`
- `/components/editors/code/FormulaEditor/ThresholdConfig.tsx`
- `/components/editors/code/FormulaEditor/ThresholdBadge.tsx`
- `/utils/thresholdEvaluation.ts`

**Implementation:**
- [v11 - Threshold Configuration](/change-log/25-10-24_v11-ThresholdConfiguration.md)
- [v12 - Threshold Evaluation](/change-log/25-10-24_v12-ThresholdEvaluation.md)
- [v13 - Gap Handling Phase 1](/change-log/25-10-25_v13-ThresholdGapHandlingPhase1.md)
- [v14 - Threshold Sample Data](/change-log/25-10-25_v14-ThresholdSampleData.md)

**Related Epic:** [EPIC-AdvancedThresholdEvaluation.md](/planning/epics/EPIC-AdvancedThresholdEvaluation.md)

---

## Formula Debugger

### Debugger Infrastructure & UI

**REQ-005: Formula Debugger Phase 3 Plan**  
**Status:** 🚧 In Progress (80% complete)  
**Priority:** High  
**Document:** [25-10-25_v21-FormulaDebuggerPhase3Plan.md](/planning/requirements/25-10-25_v21-FormulaDebuggerPhase3Plan.md)

**Overview:**  
Visual debugging integration with Formula Editor featuring line highlighting, ghost values showing intermediate results, branch indicators, and auto-scroll to current execution step.

**Key Requirements:**
- Debug overlay positioned over editor
- Current line highlighting (blue background)
- Ghost values displayed inline for each step
- Branch indicators (taken/skipped)
- Auto-scroll to current execution step
- Coordinate system conversion (line → pixel)

**Visual Features:**
```
Code Editor:
  1  IF $orderTotal > 1000 THEN          ← Current line (blue highlight)
  2    $discount = 0.15                  → Ghost: 0.15
  3  ELSE
  4    $discount = 0.10
  5  END
```

**Components:**
- `/components/editors/code/FormulaEditor/GhostValue.tsx` - Inline value display
- `/components/editors/code/FormulaEditor/BranchIndicator.tsx` - Branch state indicators
- Debug overlay rendering system
- Line-to-pixel coordinate mapping

**Implementation:**
- [v22 - Phase 3 Implementation](/change-log/25-10-25_v22-FormulaDebuggerPhase3Implementation.md)
- [v23 - Phase 3 Partial Complete](/change-log/25-10-25_v23-FormulaDebuggerPhase3Complete.md)
- [v07 - Debug Highlight Scroll Sync](/change-log/25-10-27_v07-DebugHighlightScrollSync.md)

**Related Epic:** [EPIC-FormulaEvaluationDebugger.md](/planning/epics/EPIC-FormulaEvaluationDebugger.md)

---

**REQ-006: Formula Debugger Phase 3 Highlight Movement**  
**Status:** 📋 Planned (Troubleshooting)  
**Priority:** High  
**Document:** [25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md](/planning/requirements/25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md)

**Overview:**  
Comprehensive troubleshooting plan for debug highlight movement bug where line highlighting doesn't update between debugger steps.

**Key Requirements:**
- Diagnose why highlights don't move between steps
- Verify state updates propagate correctly
- Check overlay re-rendering triggers
- Ensure coordinate calculations update
- Add logging and debug output

**Investigation Areas:**
1. State management (currentStep updates)
2. Effect dependencies and triggers
3. Highlight coordinate calculations
4. Overlay rendering lifecycle
5. CSS transition interference

**Related:** [EPIC-FormulaEvaluationDebugger.md](/planning/epics/EPIC-FormulaEvaluationDebugger.md)

---

**REQ-007: Debug Output Column**  
**Status:** 📋 Planned  
**Priority:** Medium  
**Document:** [25-10-29_v03-DebugOutputColumnPlan.md](/planning/requirements/25-10-29_v03-DebugOutputColumnPlan.md)

**Overview:**  
Dedicated output column in Formula Debugger showing RETURN values, expression results, and evaluation context for each debug step.

**Key Requirements:**
- Output column positioned next to code editor
- Show RETURN statement values
- Display expression evaluation results
- Context information (step number, node type)
- Synchronized scrolling with code

**Visual Layout:**
```
┌─────────────────┬──────────────────┐
│ Code Editor     │ Output Column    │
├─────────────────┼──────────────────┤
│ 1  $x = 10      │ → 10             │
│ 2  $y = $x * 2  │ → 20             │
│ 3  RETURN $y    │ RETURN: 20       │
└─────────────────┴──────────────────┘
```

**Benefits:**
- Clearer understanding of step results
- RETURN value always visible
- Better debugging experience
- Reduces need for variable inspector for simple values

**Related Epic:** [EPIC-FormulaEvaluationDebugger.md](/planning/epics/EPIC-FormulaEvaluationDebugger.md)

---

## Type System & Validation

### Type Checking & Safety

**REQ-008: Formula Type System**  
**Status:** 📋 Planned (Foundation exists)  
**Priority:** High  
**Epic:** [EPIC-FormulaTypeSystem.md](/planning/epics/EPIC-FormulaTypeSystem.md)

**Overview:**  
Comprehensive type system with static and runtime type checking to prevent type mismatches, invalid operations, and improve error messages.

**Key Requirements:**
- Type declarations for all variables
- Static type checking during validation
- Runtime type checking during evaluation
- Function argument type validation
- Explicit type coercion (no implicit conversions)
- Clear type error messages with location info

**Planned Phases:**
1. **Phase 1:** Type Checking Infrastructure (TypeChecker utility)
2. **Phase 2:** Static Type Checking (validation integration)
3. **Phase 3:** Runtime Type Checking (evaluator integration)
4. **Phase 4:** Function Type Signatures (all built-in functions)
5. **Phase 5:** UI Integration (error highlighting, tooltips, autocomplete)

**Type Rules:**
```typescript
// Assignment type checking
$revenue = 1000        // ✅ Valid (number → number)
$revenue = "1000"      // ❌ Type error (string → number)

// Comparison type checking
IF $count > 10         // ✅ Valid (number > number)
IF $count > "10"       // ❌ Type error (number > string)

// Function argument type checking
ROUND($price, 2)       // ✅ Valid (number, number)
ROUND("10.5", 2)       // ❌ Type error (string, number)
```

**Foundation Complete:**
- ✅ TypeSystem.ts with basic type definitions
- ✅ Validation infrastructure
- ✅ AST location information
- ✅ Error reporting infrastructure
- 🚧 Partial type checking in assignments (v06)
- 🚧 Type coercion for date arithmetic (v10)

**Estimated Timeline:** 9-14 days (5 phases)

**References:**
- [EPIC: Formula Type System](/planning/epics/EPIC-FormulaTypeSystem.md)
- [v06 - Assignment Type Validation](/change-log/25-10-28_v06-AssignmentTypeValidation.md)
- [v10 - Automatic Type Coercion](/change-log/25-10-28_v10-AutomaticTypeCoercion.md)

---

## Data Types & Structures

### List/Array Type Support

**REQ-009: List/Array Type Increment 1 - Foundation**  
**Status:** ✅ Complete  
**Priority:** High  
**Document:** [25-10-27_v00-ListArrayTypeIncrement1.md](/planning/requirements/25-10-27_v00-ListArrayTypeIncrement1.md)

**Overview:**  
Foundation for List/Array type support including type system, tokenizer updates, AST nodes, parser, and evaluator support for homogeneous lists.

**Key Requirements:**
- List<T> type definition (T = number | string | boolean | date)
- Tokenizer support for `[`, `]`, `,`
- ListLiteralNode AST node
- Parser support for list literals
- Evaluator support for list values
- Homogeneous type checking

**Implementation:**
- [v00 - Increment 1 Foundation](/change-log/25-10-27_v00-ListArrayTypeIncrement1.md)

**Related Epic:** [EPIC-ListArrayType.md](/planning/epics/EPIC-ListArrayType.md)

---

**REQ-010: List/Array Type Increment 2 - Core Functions**  
**Status:** ✅ Complete  
**Priority:** High  
**Document:** [25-10-27_v01-ListArrayTypeIncrement2.md](/planning/requirements/25-10-27_v01-ListArrayTypeIncrement2.md)

**Overview:**  
Essential list functions for aggregation, search, and basic transformations.

**Key Requirements:**
- Aggregation: LENGTH, LIST_SUM, LIST_AVG, LIST_MIN, LIST_MAX
- Search: CONTAINS, FIRST, LAST
- Transform: REVERSE
- Sample formulas demonstrating usage

**Implementation:**
- [v01 - Increment 2 Core Functions](/change-log/25-10-27_v01-ListArrayTypeIncrement2.md)

**Related Epic:** [EPIC-ListArrayType.md](/planning/epics/EPIC-ListArrayType.md)

---

**REQ-011: List/Array Type Increment 3 - Advanced Functions**  
**Status:** ✅ Complete  
**Priority:** High  
**Document:** [25-10-27_v02-ListArrayTypeIncrement3.md](/planning/requirements/25-10-27_v02-ListArrayTypeIncrement3.md)

**Overview:**  
Advanced list operations completing the core list toolkit with 10 additional functions.

**Key Requirements:**
- Subset operations: SLICE
- Combining: CONCAT
- De-duplication: UNIQUE
- Sorting: SORT, SORT_DESC
- String operations: JOIN, SPLIT
- Search: INDEX_OF
- Generation: RANGE

**Implementation:**
- [v02 - Increment 3 Advanced Functions](/change-log/25-10-27_v02-ListArrayTypeIncrement3.md)
- [List/Array Complete Summary](/planning/phases/LIST_ARRAY_COMPLETE_SUMMARY.md)

**Related Epic:** [EPIC-ListArrayType.md](/planning/epics/EPIC-ListArrayType.md)

---

**REQ-012: List/Array Increment 3.1 - Structured Data**  
**Status:** 📋 Planned  
**Priority:** Medium  
**Document:** [PLAN-ListArrayIncrement3.1-StructuredData.md](/planning/requirements/PLAN-ListArrayIncrement3.1-StructuredData.md)

**Overview:**  
Object literal support for structured data with property access via dot notation.

**Key Requirements:**
- Object literal syntax: `{ "key": "value" }`
- Property access: `$customer.name`
- Nested object support: `$order.customer.address.city`
- Type-safe property access
- Object construction and manipulation functions

**Planned Features:**
```
// Object literals
LET $customer = {
  "name": "John Doe",
  "tier": "gold",
  "spend": 2500
}

// Property access
$customer.name          // → "John Doe"
$customer.tier          // → "gold"

// Nested access
$order.customer.name    // → "John Doe"
```

**Related Epic:** [EPIC-ListArrayType.md](/planning/epics/EPIC-ListArrayType.md)

---

## Editor Features

### Formula Editor Layout & UI

**REQ-013: Formula Editor Layout Plan**  
**Status:** ✅ Complete  
**Priority:** High  
**Document:** [25-10-24_v15-FormulaEditorLayoutPlan.md](/planning/requirements/25-10-24_v15-FormulaEditorLayoutPlan.md)

**Overview:**  
Comprehensive layout design for Formula Editor with toolbar, variable table, editor area, and test/debug panels.

**Key Requirements:**
- Toolbar with mode switcher (Edit | Test | Debug)
- Variable table with input/output/formula tabs
- Code editor with line numbers and syntax highlighting
- Test panel with variable inputs and result display
- Debug panel with step controls and variable inspector
- Responsive layout adapting to available space

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│ Toolbar: [Edit|Test|Debug]             │
├──────────────┬──────────────────────────┤
│ Variable     │ Code Editor              │
│ Table        │                          │
│              │ Line numbers + syntax    │
│ Input vars   │ highlighting             │
│ Output vars  │                          │
│ Formula vars │                          │
├──────────────┴──────────────────────────┤
│ Test/Debug Panel                        │
│ [Step Controls] [Variable Inspector]   │
└─────────────────────────────────────────┘
```

**Implementation:**
- [v16 - Formula Editor Layout Implementation](/change-log/25-10-24_v16-FormulaEditorLayoutImplementation.md)

---

### Mention & Autocomplete Systems

**REQ-014: Nested Mentions System Plan**  
**Status:** 🚧 Partial (RTE/Markdown complete)  
**Priority:** Medium  
**Document:** [25-10-24_v13-NestedMentionsSystemPlan.md](/planning/requirements/25-10-24_v13-NestedMentionsSystemPlan.md)

**Overview:**  
Hierarchical @mention system supporting nested structures like @Artifact/NestedItem/NestedItem for KPIs, Dashboards, Documents, and Automations.

**Key Requirements:**
- @mention autocomplete with fuzzy search
- Nested structure support (up to 3 levels)
- Category-specific mention types
- Visual distinction between levels
- Keyboard navigation (arrow keys, enter, escape)
- Slash command integration

**Mention Syntax:**
```
@KPI/Revenue/Monthly
@Dashboard/Sales/Q4
@Document/Policies/HR/Benefits
@Automation/CustomerOnboarding
```

**Implementation:**
- ✅ RTE/Markdown mention integration
- 📋 Formula Editor mention support (planned)
- 📋 BAL Editor mention support (planned)

**References:**
- [v17 - Mentions Phase 1 Foundation](/change-log/25-10-24_v17-MentionsPhase1-Foundation.md)
- [v25 - RTE Mention Integration](/change-log/25-10-24_v25-RTE_MentionIntegration.md)

---

### Rich Text & Markdown Features

**REQ-015: RTE/Markdown Foundations Plan**  
**Status:** ✅ Complete  
**Priority:** High  
**Document:** [25-10-24_v22-RTE_MarkdownFoundationsPlan.md](/planning/requirements/25-10-24_v22-RTE_MarkdownFoundationsPlan.md)

**Overview:**  
Foundation for Rich Text Editor and Markdown Editor with proper selection handling, keyboard shortcuts, and mention integration.

**Key Requirements:**
- Selection management (getSelection, setSelection)
- Keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)
- Block type menu (paragraph, heading, list)
- Mention autocomplete integration
- Slash command menu
- Markdown preview mode

**Implementation:**
- [v23 - RTE/Markdown Foundations Fix](/change-log/25-10-24_v23-RTE_MarkdownFoundationsFix.md)
- [v24 - RTE Interaction Patterns](/change-log/25-10-24_v24-RTE_InteractionPatterns.md)
- [v25 - RTE Mention Integration](/change-log/25-10-24_v25-RTE_MentionIntegration.md)
- [v26 - Slash Commands](/change-log/25-10-24_v26-RTE_KeyboardPriorityAndSlashCommand.md)

---

## UI/UX Enhancements

### BAL Editor Enhancements

**REQ-016: BAL Dynamic Keyword Highlighting**  
**Status:** 📋 Planned  
**Priority:** Medium  
**Epic:** [EPIC-BALDynamicKeywordHighlighting.md](/planning/epics/EPIC-BALDynamicKeywordHighlighting.md)

**Overview:**  
Dynamic keyword highlighting for BAL Editor where user-defined terms from definitions and dictionary vocabulary are highlighted as semantic keywords.

**Key Requirements:**
- Parse "the X" definition patterns
- Extract vocabulary from BAL Dictionary
- Apply highlighting to matching terms
- Context-aware highlighting (definition vs usage)
- Different colors for system keywords vs user keywords
- Hover tooltips showing definitions
- Autocomplete integration

**Highlighting Examples:**
```
// "the customer" is defined
Define the customer as person who places order

// "customer" highlighted as defined term when used
If the customer is premium tier
```

**Related Epic:** [EPIC-BALDynamicKeywordHighlighting.md](/planning/epics/EPIC-BALDynamicKeywordHighlighting.md)

---

## Future Features

### Versioning & Collaboration

**REQ-017: Diff Mode & Versioning Plan**  
**Status:** 📋 Planned  
**Priority:** Medium  
**Document:** [25-10-23_v06-DiffModeVersioningPlan.md](/planning/requirements/25-10-23_v06-DiffModeVersioningPlan.md)

**Overview:**  
Visual diff viewer for comparing formula versions with side-by-side or unified diff views, version history, and rollback capabilities.

**Key Requirements:**
- Version history storage and retrieval
- Side-by-side diff view
- Unified diff view (inline +/-)
- Line-by-line change highlighting
- Change annotations (added, removed, modified)
- Rollback to previous version
- Version comparison selector

**Visual Concepts:**
```
Side-by-Side:
┌──────────────┬──────────────┐
│ Version 1    │ Version 2    │
├──────────────┼──────────────┤
│ $x = 10      │ $x = 10      │
│ $y = $x * 2  │ $y = $x * 3  │ ← Modified
│              │ $z = 5       │ ← Added
└──────────────┴──────────────┘

Unified:
  $x = 10
- $y = $x * 2
+ $y = $x * 3
+ $z = 5
```

---

**REQ-018: Named Formulas Plan**  
**Status:** 📋 Planned  
**Priority:** Medium  
**Document:** [25-10-23_v07-NamedFormulasPlan.md](/planning/requirements/25-10-23_v07-NamedFormulasPlan.md)

**Overview:**  
Reusable formula definitions that can be saved, named, and imported across different contexts.

**Key Requirements:**
- Formula naming and description
- Formula library/catalog
- Import/export capabilities
- Parameter definitions
- Version tracking for named formulas
- Formula search and discovery
- Category organization

**Use Cases:**
```
// Define named formula
FORMULA calculateDiscount(orderTotal, tier):
  IF tier = "gold" THEN
    orderTotal * 0.15
  ELSIF tier = "silver" THEN
    orderTotal * 0.10
  ELSE
    orderTotal * 0.05
  END

// Use named formula
$discount = calculateDiscount($orderTotal, $customerTier)
```

---

## Multi-Type Formula Editor

### Enhanced Variable System & I/O Management

**REQ-019: Variable System Enhancements**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** High  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Enhanced variable model with scoping, default values, complex types (list/object), and vocabulary definitions for enterprise decision automation.

**Key Requirements:**

1. **Variable Scoping**
   - Formula-scoped: Variables visible only within the formula
   - Task-scoped: Variables shared across all formulas in task/context
   - UI indication of scope (tabs or icons)

2. **Default Values**
   - Optional default values for all variables
   - Defaults used when no input value provided
   - Type-validated defaults

3. **Is List Toggle**
   - After selecting base type, toggle "Is List"
   - Converts type to List<baseType>
   - Example: number → List<number>

4. **Is Object Toggle**
   - After selecting base type, toggle "Is Object"
   - Defines object schema with properties
   - Example: object with { name: string, age: number }

5. **Vocabulary Definition**
   - Similar to BAL's vocabulary system
   - Define reusable business terms with descriptions
   - Available in autocomplete
   - Stored with formula metadata

**Data Model:**
```typescript
interface EnhancedVariable {
  id: string;
  name: string;
  baseType: 'number' | 'string' | 'boolean' | 'date' | 'time';
  isList: boolean;
  isObject: boolean;
  objectSchema?: ObjectSchema;
  scope: 'formula' | 'task';
  category: 'input' | 'output' | 'formula';
  defaultValue?: any;
  value?: any;
  description?: string;
  vocabularyRef?: string;
}
```

**Implementation Phase:** Phase 1 (3-4 days)

**Components:**
- `/services/evaluationEngine/types/EnhancedVariable.ts`
- `/components/editors/code/shared/components/VariableTable/EnhancedVariableTable.tsx`
- `/components/editors/code/shared/components/VariableTable/ObjectSchemaEditor.tsx`

---

**REQ-020: Input/Output Object System**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** High  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Smart parameter management and custom output object construction for flexible I/O handling.

**Key Requirements:**

1. **Smart Parameters in Detail Panel**
   - Display formula parameters with types and descriptions
   - Indicate required vs. optional parameters
   - Show default values

2. **Smart Parameters in Output Object**
   - Include input parameters in output
   - Example: `{ result: 150, inputs: { price: 100, taxRate: 0.5 } }`
   - Toggle to enable/disable

3. **Expose Inputs Toggle**
   - UI toggle: "Include inputs in output"
   - Adds `inputs: {}` to output object

4. **Threshold Value in Output**
   - Include threshold evaluation results
   - Example: `{ result: 150, threshold: "high", thresholdIndex: 2 }`

5. **Custom Output Object Keys**
   - Define custom keys for output
   - Default: `{ result: <value> }`
   - Custom: `{ total: <value>, category: "premium", confidence: 0.95 }`

6. **Type-Specific I/O Constraints**
   - **KPIs:** Must return numeric value or object with numeric result
   - **Business Rules:** Return boolean or decision object with reasoning
   - **BAL:** Structured decision output with vocabulary context

**Data Model:**
```typescript
interface FormulaIOConfig {
  includeInputs: boolean;
  includeThresholdInfo: boolean;
  customOutputKeys: CustomOutputKey[];
  outputValidation: OutputValidation;
}
```

**Implementation Phase:** Phase 3 (3-4 days)

**Components:**
- `/components/editors/code/FormulaEditor/OutputConfigPanel.tsx`
- `/components/editors/code/FormulaEditor/SmartParametersView.tsx`
- `/services/evaluationEngine/types/FormulaIOConfig.ts`

---

**REQ-021: Business Rules Support**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** High  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Verbal operator support for natural language business rules aligned with IBM ADS/ODM.

**Key Requirements:**

1. **Verbal Operators**
   - Support natural language equivalents:
   ```
   Symbol    Verbal Equivalents
   >         "is greater than", "is more than", "exceeds"
   >=        "is at least", "is greater than or equal to"
   <         "is less than", "is fewer than"
   <=        "is at most", "is less than or equal to"
   =         "is", "equals", "is equal to"
   !=        "is not", "does not equal"
   AND       "and"
   OR        "or"
   NOT       "not", "is not"
   ```

2. **Business Rule Syntax Extensions**
   - Support "the" prefix for entity references
   - Example: "the customer's age is greater than 18"
   - Parse possessive forms
   - Support articles (the, a, an)

3. **Rule Explanations**
   - Business rules include decision explanation
   - Example: "Rule fired: Customer qualifies for premium tier because age > 65 AND account balance >= 10000"
   - Explanation in output object

**Implementation Phase:** Phase 4 (4-5 days)

**Components:**
- `/services/evaluationEngine/parsers/VerbalOperatorParser.ts`
- Updated Tokenizer and Parser for verbal syntax
- Business Rule syntax highlighting rules

---

**REQ-022: ADS/ODM Syntax Compliance Audit**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** High  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Comprehensive audit of formula syntax against IBM ADS/ODM GA documentation.

**Key Requirements:**
- Obtain ADS/ODM GA documentation
- Create compliance matrix
- Audit operators (symbolic and verbal)
- Audit keywords (IF, THEN, ELSE, ELSIF, END, RETURN)
- Audit built-in functions
- Audit data types and literal syntax
- Validate with ADS/ODM test suite
- Document deviations with rationale

**Implementation Phase:** Phase 7 (3-5 days)

**Deliverable:**
- `/planning/requirements/ADS-ODM-Compliance-Audit.md`
- Compliance matrix
- Test suite
- Compliance fixes

---

**REQ-023: Sample Organization by Rule Type**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** Medium  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Organize formula samples by rule type for better discoverability.

**Key Requirements:**
- Sample categories: GENERAL, KPIs, BUSINESS_RULES, FUNCTIONS, FORMULAE
- Category-based UI organization
- Expandable sections with counts
- Search within categories
- Tag-based filtering
- 5+ examples per category

**Data Model:**
```typescript
interface FormulaSample {
  id: string;
  name: string;
  category: 'GENERAL' | 'KPI' | 'BUSINESS_RULE' | 'FUNCTION' | 'FORMULA';
  ruleType: 'KPI' | 'BUSINESS_RULE' | 'BAL' | 'GENERAL';
  code: string;
  description: string;
  expectedResult?: any;
}
```

**Implementation Phase:** Phase 8 (1-2 days)

**Components:**
- Updated `/SampleData/formulaSamples.ts`
- Updated sample selector UI

---

**REQ-024: BAL Editor Architecture Alignment**  
**Status:** 📋 Planned (Architecture Complete)  
**Priority:** High  
**Architecture:** [Multi-Type-Formula-Editor-Architecture.md](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)

**Overview:**  
Align BAL Editor with Formula Editor architecture patterns (preparation for unification).

**Key Requirements:**
- Extract shared components to `/components/editors/code/shared/`
- BAL Editor adopts Formula Editor patterns (hooks, CSS Modules, composition)
- Shared evaluation engine integration
- UI consistency (toolbar, panels, shortcuts)
- Preparation for Business Rule Editor variant

**Migration Plan:**
1. Extract shared components (strangler pattern)
2. Create `/components/editors/code/BALEditor/` (new architecture)
3. Migrate BAL Editor to new architecture
4. Validate feature parity
5. Cutover with feature flag
6. Build Business Rule Editor variant

**Implementation Phase:** Phase 6 (5-7 days)

**Components:**
- `/components/editors/code/BALEditor/` (new location)
- Shared components extracted

---

## Requirements Status Summary

### Completed Requirements
- ✅ **REQ-001:** Editor Recovery Plan (Phase R1 Complete)
- ✅ **REQ-002:** Strangler Pattern Guidelines
- ✅ **REQ-003:** Formula Engine Architecture
- ✅ **REQ-004:** Threshold Evaluation Architecture
- ✅ **REQ-009:** List/Array Increment 1 - Foundation
- ✅ **REQ-010:** List/Array Increment 2 - Core Functions
- ✅ **REQ-011:** List/Array Increment 3 - Advanced Functions
- ✅ **REQ-013:** Formula Editor Layout
- ✅ **REQ-015:** RTE/Markdown Foundations

### In Progress Requirements
- 🚧 **REQ-005:** Formula Debugger Phase 3 (80% complete)
- 🚧 **REQ-014:** Nested Mentions System (RTE/Markdown done)

### Planned Requirements
- 📋 **REQ-006:** Formula Debugger Phase 3 Highlight Movement
- 📋 **REQ-007:** Debug Output Column
- 📋 **REQ-008:** Formula Type System
- 📋 **REQ-012:** List/Array Increment 3.1 - Structured Data
- 📋 **REQ-016:** BAL Dynamic Keyword Highlighting
- 📋 **REQ-017:** Diff Mode & Versioning
- 📋 **REQ-018:** Named Formulas
- 📋 **REQ-019:** Variable System Enhancements (Architecture Complete)
- 📋 **REQ-020:** Input/Output Object System (Architecture Complete)
- 📋 **REQ-021:** Business Rules Support (Architecture Complete)
- 📋 **REQ-022:** ADS/ODM Syntax Compliance Audit (Architecture Complete)
- 📋 **REQ-023:** Sample Organization by Rule Type (Architecture Complete)
- 📋 **REQ-024:** BAL Editor Architecture Alignment (Architecture Complete)

---

## Priority Matrix

### Critical Priority (Blocking)
- None currently blocking

### High Priority (Active Development)
- REQ-005: Formula Debugger Phase 3 completion
- REQ-019: Variable System Enhancements (ready for implementation)
- REQ-020: Input/Output Object System (ready for implementation)
- REQ-021: Business Rules Support (ready for implementation)
- REQ-022: ADS/ODM Compliance Audit (ready for implementation)
- REQ-024: BAL Editor Architecture Alignment (ready for implementation)

### Medium Priority (Planned)
- REQ-007: Debug Output Column
- REQ-008: Formula Type System (foundation exists)
- REQ-012: Structured Data (object literals)
- REQ-016: BAL Dynamic Keyword Highlighting
- REQ-017: Diff Mode & Versioning
- REQ-018: Named Formulas
- REQ-023: Sample Organization (ready for implementation)

### Low Priority (Future)
- REQ-006: Debugger highlight troubleshooting (if needed)

---

## Dependencies & Blockers

### Active Blockers
- **TD-001** (Ghost Value Formatting) blocks:
  - Re-implementation of datetime utility functions
  - Some debugger polish work

### Prerequisite Dependencies
- **REQ-008** (Type System) depends on:
  - ✅ Evaluation Engine complete
  - ✅ Validation infrastructure exists
  - ✅ AST location tracking complete

- **REQ-012** (Structured Data) depends on:
  - ✅ List/Array foundation complete
  - ✅ Type system foundation exists
  - 📋 Consider type system completion first

- **REQ-016** (BAL Dynamic Highlighting) depends on:
  - ✅ BAL Editor stable
  - ✅ BAL Dictionary component exists
  - ✅ Syntax highlighting infrastructure ready

---

## Implementation Roadmap

### Immediate Next Steps (1-2 weeks)
1. Complete Formula Debugger Phase 3
   - Fix highlight movement if needed (REQ-006)
   - Implement timeline controls
   - Add breakpoint system
2. Resolve TD-001 (Ghost Value Formatting)
   - Re-implement datetime functions
3. Plan Type System implementation (REQ-008)

### Short Term (1 month)
1. Implement Formula Type System (REQ-008)
   - 5 phases, 9-14 days estimated
   - High impact on code quality
2. Consider Debug Output Column (REQ-007)
   - Enhances debugger experience
3. Evaluate Structured Data (REQ-012)
   - Depends on type system progress

### Medium Term (2-3 months)
1. BAL Dynamic Keyword Highlighting (REQ-016)
2. Diff Mode & Versioning (REQ-017)
3. Named Formulas (REQ-018)

### Long Term (Future)
1. Advanced debugger features
   - Watch expressions
   - Conditional breakpoints
   - Performance profiling
2. Formula optimization hints
3. Multi-formula workflows

---

## Cross-References

### Planning Documents by Category

**Architecture:**
- [Multi-Type Formula Editor Architecture](/planning/architecture/Multi-Type-Formula-Editor-Architecture.md)
- [Editor Recovery Plan](/planning/requirements/25-10-28_v12-EDITOR_RECOVERY_PLAN.md)
- [Strangler Pattern Guidelines](/planning/requirements/25-10-28_v13-StranglerPatternGuidelines.md)

**Formula Engine:**
- [Formula Engine Architecture Plan](/planning/requirements/25-10-25_v04-FormulaEngineArchitecturePlan.md)
- [Formula Engine Architecture Addendum](/planning/requirements/25-10-25_v05-FormulaEngineArchitectureAddendum.md)
- [Threshold Evaluation Architecture](/planning/requirements/25-10-25_v06-ThresholdEvaluationArchitecture.md)

**Formula Debugger:**
- [Debugger Phase 3 Plan](/planning/requirements/25-10-25_v21-FormulaDebuggerPhase3Plan.md)
- [Debugger Phase 3 Highlight Movement](/planning/requirements/25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md)
- [Debug Output Column Plan](/planning/requirements/25-10-29_v03-DebugOutputColumnPlan.md)

**List/Array Type:**
- [Increment 1 - Foundation](/planning/requirements/25-10-27_v00-ListArrayTypeIncrement1.md)
- [Increment 2 - Core Functions](/planning/requirements/25-10-27_v01-ListArrayTypeIncrement2.md)
- [Increment 3 - Advanced Functions](/planning/requirements/25-10-27_v02-ListArrayTypeIncrement3.md)
- [Increment 3.1 - Structured Data](/planning/requirements/PLAN-ListArrayIncrement3.1-StructuredData.md)

**Editor Features:**
- [Formula Editor Layout Plan](/planning/requirements/25-10-24_v15-FormulaEditorLayoutPlan.md)
- [Nested Mentions System Plan](/planning/requirements/25-10-24_v13-NestedMentionsSystemPlan.md)
- [RTE/Markdown Foundations Plan](/planning/requirements/25-10-24_v22-RTE_MarkdownFoundationsPlan.md)

**Future Features:**
- [Diff Mode & Versioning Plan](/planning/requirements/25-10-23_v06-DiffModeVersioningPlan.md)
- [Named Formulas Plan](/planning/requirements/25-10-23_v07-NamedFormulasPlan.md)

### Related Documents

**Epics:**
- [Master Epic Document](/planning/MASTER_EPIC.md)
- [Formula Evaluation Debugger Epic](/planning/epics/EPIC-FormulaEvaluationDebugger.md)
- [List/Array Type Epic](/planning/epics/EPIC-ListArrayType.md)
- [Formula Type System Epic](/planning/epics/EPIC-FormulaTypeSystem.md)
- [Advanced Threshold Evaluation Epic](/planning/epics/EPIC-AdvancedThresholdEvaluation.md)
- [BAL Dynamic Keyword Highlighting Epic](/planning/epics/EPIC-BALDynamicKeywordHighlighting.md)

**Technical Debt:**
- [Technical Debt Log](/planning/debt/25-10-28_v11-TechnicalDebt.md)

**Phase Documentation:**
- [Phase 3 Visual Demo](/planning/phases/PHASE3_VISUAL_DEMO.md)
- [List/Array Complete Summary](/planning/phases/LIST_ARRAY_COMPLETE_SUMMARY.md)

**Guidelines:**
- [Development Guidelines v2.3](/guidelines/Guidelines.md)

**Change Log:**
- [Change Log Index](/change-log/index.md)

---

## Maintenance

### How to Use This Document

1. **Planning New Features:**
   - Check if requirement already exists
   - Identify dependencies and blockers
   - Create new REQ-XXX entry if needed
   - Link to relevant epic

2. **Tracking Implementation:**
   - Update requirement status as work progresses
   - Add implementation change log references
   - Document lessons learned

3. **Prioritization:**
   - Review priority matrix regularly
   - Update based on user feedback and technical needs
   - Consider dependencies when scheduling

4. **Cross-Referencing:**
   - Link requirements to epics
   - Link implementations to requirements
   - Maintain bidirectional references

### Update Schedule

- **After each implementation:** Update requirement status and add change log reference
- **Weekly:** Review in-progress requirements and blockers
- **Monthly:** Review priority matrix and roadmap
- **Quarterly:** Comprehensive review and reorganization if needed

---

## Document History

**v1.1** - October 29, 2025  
- Added REQ-019 through REQ-024 for Multi-Type Formula Editor
- Added Multi-Type Formula Editor Architecture reference
- Updated priority matrix with new high-priority requirements
- 6 new requirements ready for implementation

**v1.0** - October 29, 2025  
- Initial master requirements document
- Consolidated 18 planning documents
- Organized by category with cross-references
- Added priority matrix and roadmap

---

**Document Owner:** Senior Front End Architect  
**Last Review:** October 29, 2025  
**Next Review:** After Multi-Type Formula Editor Phase 1 completion  
**Related:** [Master Epic Document](/planning/MASTER_EPIC.md)
