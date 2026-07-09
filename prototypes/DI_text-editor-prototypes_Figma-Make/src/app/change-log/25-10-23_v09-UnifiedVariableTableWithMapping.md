# Unified Variable Table with Mapping Types

**Date:** October 23, 2025  
**Version:** v09  
**Status:** ✅ Implemented

---

## Summary

Simplified the Named Formulas parameter management by **unifying parameters and variables into a single VariableTable component** with mapping type selection. Instead of separate ParameterTable and VariableTable components, users now manage all variables in one place and choose their mapping type, which determines whether they appear in the function signature.

---

## Context

After implementing the initial ParameterTable component (v08), user feedback revealed that having separate tables for parameters and variables was unnecessarily complex. The key insight: **parameters and variables are the same thing** - they're just variables with different mapping behaviors that determine their role in the function signature.

### The Problem with Separate Tables
- Confusing distinction between "parameter" and "variable"
- Two separate UIs to manage similar concepts
- Unclear relationship between parameters and function signature
- More complex mental model for users

### The Solution: Mapping Types
Variables with different mapping types serve different roles:
1. **User-defined** - Required parameters (no data source)
2. **Default-mapped** - Optional parameters with defaults (data source + override)
3. **Locked** - Not in signature (data source, no override)
4. **Internal** - Not in signature (calculated internally)

---

## Implementation Details

### 1. Enhanced Variable Type

**File:** `/components/editors/core/types/EditorTypes.ts`

**Added fields to Variable interface:**
```typescript
export interface Variable {
  // ... existing fields
  
  /** Variable mapping type - determines function signature behavior */
  mappingType?: 'user-defined' | 'default-mapped' | 'locked' | 'internal';
  
  /** Can caller override the default mapping? (only applies when mappingType is 'default-mapped') */
  isOverridable?: boolean;
}
```

**Mapping Type Behaviors:**

| Mapping Type | In Signature? | Data Source? | Override? | Purpose |
|--------------|---------------|--------------|-----------|---------|
| **user-defined** | ✅ Yes (required) | ❌ No | N/A | Caller must provide value |
| **default-mapped** | ✅ Yes (optional) | ✅ Yes | ✅ Optional | Uses default or caller override |
| **locked** | ❌ No | ✅ Yes | ❌ No | Always uses data source |
| **internal** | ❌ No | ❌ No | N/A | Calculated internally |

### 2. Enhanced VariableTable Component

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.tsx`

**Key Enhancements:**

#### Radio Button Selection for Mapping Type
Replaced simple "Data Source" field with comprehensive mapping options:

```tsx
<div className={styles.cardRow}>
  <div className={styles.cardLabel}>Mapping</div>
  <div className={styles.mappingOptions}>
    {/* User-defined */}
    <label className={styles.radioLabel}>
      <input type="radio" value="user-defined" ... />
      <span>User-defined (required parameter)</span>
    </label>

    {/* Default-mapped with sub-options */}
    <label className={styles.radioLabel}>
      <input type="radio" value="default-mapped" ... />
      <span>Default-mapped (optional parameter)</span>
    </label>
    {mappingType === 'default-mapped' && (
      <div className={styles.mappingSubOptions}>
        <Input placeholder="#attribute.path" ... />
        <label>
          <checkbox /> Allow caller to override
        </label>
      </div>
    )}

    {/* Locked with sub-options */}
    <label className={styles.radioLabel}>
      <input type="radio" value="locked" ... />
      <span>Locked to source (not in signature)</span>
    </label>
    {mappingType === 'locked' && (
      <div className={styles.mappingSubOptions}>
        <Input placeholder="#attribute.path" ... />
      </div>
    )}

    {/* Internal */}
    <label className={styles.radioLabel}>
      <input type="radio" value="internal" ... />
      <span>Internal calculation</span>
    </label>
  </div>
</div>
```

#### Visual Badges
Added mapping badges next to variable names to show their role:

```tsx
const getMappingBadge = (variable: Variable) => {
  const mappingType = variable.mappingType || 'internal';
  
  if (mappingType === 'user-defined') {
    return { text: 'required param', type: 'required' };
  } else if (mappingType === 'default-mapped') {
    return { text: 'optional param', type: 'optional' };
  } else if (mappingType === 'locked') {
    return { text: 'locked', type: 'locked' };
  }
  
  return null; // internal - no badge
};
```

**Badge Colors:**
- **Required param** - Blue (interactive color)
- **Optional param** - Gray (secondary color)
- **Locked** - Yellow/warning color

#### Conditional Sub-Options
Data source field and override checkbox only appear when relevant:
- **Default-mapped**: Shows data source input + "Allow caller to override" checkbox
- **Locked**: Shows data source input only
- **User-defined/Internal**: No data source fields

### 3. CSS Styling

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.module.css`

**New Styles Added:**

```css
/* Mapping Options */
.mappingOptions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-03);
}

.radioLabel {
  display: flex;
  align-items: center;
  gap: var(--spacing-02);
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-size: 14px;
  line-height: 20px;
  color: var(--text-primary);
  user-select: none;
  padding: var(--spacing-02) 0;
}

.mappingSubOptions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-02);
  margin-left: var(--spacing-06);
  padding-left: var(--spacing-03);
  border-left: 2px solid var(--border-subtle);
}

.mappingBadge {
  font-family: var(--font-family-sans);
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  padding: 2px var(--spacing-03);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.32px;
  flex-shrink: 0;
  white-space: nowrap;
}

.mappingBadge[data-type="required"] {
  background: var(--background-interactive);
  color: var(--text-on-color);
}

.mappingBadge[data-type="optional"] {
  background: var(--background-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
}

.mappingBadge[data-type="locked"] {
  background: var(--background-warning);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}
```

### 4. Removed Separate ParameterTable

**Deleted Files:**
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.tsx`
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.module.css`
- `/components/editors/code/shared/components/ParameterTable/index.ts`

**Removed from exports:**
- `/components/editors/code/shared/components/index.ts` - Removed ParameterTable export

### 5. Simplified Sidebar Tabs

**File:** `/App.tsx`

**Before (3 tabs):**
- Parameters
- Variables
- Testing Checklist

**After (2 tabs):**
- **Variables** (manages all variables with mapping types)
- **Testing Checklist**

**Removed State:**
```typescript
// ❌ Removed
const [formulaParameters, setFormulaParameters] = useState<Parameter[]>([]);
const handleParameterCreate = ...
const handleParameterUpdate = ...
const handleParameterDelete = ...
```

**Simplified Sidebar:**
```tsx
<div className={styles.sidebarTabs}>
  <button onClick={() => setFormulaSidebarTab('variables')}>
    Variables
  </button>
  <button onClick={() => setFormulaSidebarTab('testing')}>
    Testing Checklist
  </button>
</div>

<div className={styles.sidebarContent}>
  {formulaSidebarTab === 'variables' ? (
    <VariableTable
      variables={formulaVariables}
      onCreate={handleVariableCreate}
      onUpdate={handleVariableUpdate}
      onDelete={handleVariableDelete}
    />
  ) : (
    <FeatureList editorType="formula" />
  )}
</div>
```

---

## User Experience Flow

### Creating a Required Parameter (User-Defined)

1. User clicks "Add Variable"
2. Enters name: "loanAmount"
3. Selects type: "Number"
4. **Selects mapping**: "User-defined (required parameter)"
5. Clicks Save
6. Variable appears with blue **"required param"** badge
7. Will appear in function signature as required parameter

**Result:**
```
┌─────────────────────────────────┐
│ $ loanAmount    [required param]│
│ TYPE: Number                    │
│ MAPPING: User-defined           │
└─────────────────────────────────┘
```

### Creating an Optional Parameter (Default-Mapped)

1. User clicks "Add Variable"
2. Enters name: "creditScore"
3. Selects type: "Number"
4. **Selects mapping**: "Default-mapped (optional parameter)"
5. Input field appears for data source
6. Enters: "#customer.creditScore"
7. Checks: "Allow caller to override"
8. Clicks Save
9. Variable appears with gray **"optional param"** badge
10. Will appear in function signature as optional parameter with default

**Result:**
```
┌─────────────────────────────────┐
│ $ creditScore  [optional param] │
│ TYPE: Number                    │
│ MAPPING: Default-mapped         │
│   Default: #customer.creditScore│
│   ☑ Allow caller to override    │
└─────────────────────────────────┘
```

### Creating a Locked Variable

1. User clicks "Add Variable"
2. Enters name: "currentDate"
3. Selects type: "Date"
4. **Selects mapping**: "Locked to source (not in signature)"
5. Input field appears for data source
6. Enters: "#system.currentDate"
7. Clicks Save
8. Variable appears with yellow **"locked"** badge
9. Will NOT appear in function signature

**Result:**
```
┌─────────────────────────────────┐
│ $ currentDate         [locked]  │
│ TYPE: Date                      │
│ MAPPING: Locked to source       │
│   Source: #system.currentDate   │
└─────────────────────────────────┘
```

### Creating an Internal Variable

1. User clicks "Add Variable"
2. Enters name: "baseScore"
3. Selects type: "Number"
4. **Selects mapping**: "Internal calculation"
5. Clicks Save
6. Variable appears with NO badge (it's internal)
7. Will NOT appear in function signature

**Result:**
```
┌─────────────────────────────────┐
│ $ baseScore                     │
│ TYPE: Number                    │
│ MAPPING: Internal calculation   │
└─────────────────────────────────┘
```

### Changing Mapping Type

1. User clicks existing variable to expand
2. Changes radio selection in MAPPING section
3. If switching to/from default-mapped or locked:
   - Data source input appears/disappears
   - Override checkbox appears/disappears
4. Badge updates automatically
5. Function signature behavior changes

---

## Design Decisions

### 1. Why Unified Table?

**Rationale:**
- **Simpler mental model**: One concept (variables), different behaviors (mapping types)
- **Single source of truth**: All variable configuration in one place
- **Clearer relationship**: Mapping type clearly determines function signature behavior
- **Less navigation**: No switching between tabs to see all formula inputs

### 2. Why Radio Buttons Instead of Dropdown?

**Rationale:**
- **Visibility**: All options always visible, no hidden choices
- **Discoverability**: Users see all mapping types immediately
- **Explanation**: Each option has descriptive text explaining what it does
- **Touch-friendly**: Easier to select on touch devices
- **Standard pattern**: Radio buttons are the correct UI for mutually exclusive choices

### 3. Why Conditional Sub-Options?

**Rationale:**
- **Progressive disclosure**: Only show relevant fields when needed
- **Clearer affordances**: Data source field only appears when it's used
- **Prevents errors**: Can't enter data source for user-defined or internal variables
- **Visual hierarchy**: Indentation shows sub-options belong to parent choice

### 4. Why Badges for Parameters?

**Rationale:**
- **Immediate visibility**: Scan list to see which variables are parameters
- **Status indicator**: Color coding (blue = required, gray = optional, yellow = locked)
- **Compact**: Doesn't take much space
- **Consistent pattern**: Similar to status badges in other UIs

### 5. Why Explicit "Allow Override" Checkbox?

**Rationale:**
- **Clear intent**: User explicitly chooses whether callers can override
- **Default is sensible**: Checked by default (usually want flexibility)
- **Discoverability**: Users understand what "override" means
- **Prevents confusion**: No ambiguity about whether override is allowed

---

## Function Signature Generation (Future)

When Phase 3 (Autocomplete) is implemented, the function signature will be generated from mapping types:

**Example Formula:** `ComplexLoanApproval`

**Variables:**
```typescript
[
  { name: 'loanAmount', type: 'number', mappingType: 'user-defined' },
  { name: 'loanTerm', type: 'number', mappingType: 'user-defined' },
  { 
    name: 'creditScore', 
    type: 'number', 
    mappingType: 'default-mapped',
    dataSource: '#customer.creditScore',
    isOverridable: true
  },
  { 
    name: 'income', 
    type: 'number', 
    mappingType: 'default-mapped',
    dataSource: '#customer.annualIncome',
    isOverridable: true
  },
  {
    name: 'riskThreshold',
    type: 'number',
    mappingType: 'locked',
    dataSource: '#system.riskThreshold'
  },
  { name: 'decision', type: 'string', mappingType: 'internal' }
]
```

**Generated Signature:**
```typescript
ComplexLoanApproval(
  loanAmount: number,              // Required (user-defined)
  loanTerm: number,                // Required (user-defined)
  creditScore?: number,            // Optional (default-mapped)
  income?: number                  // Optional (default-mapped)
) -> string

// Note: riskThreshold (locked) and decision (internal) are NOT in signature
```

**Invocation Examples:**
```typescript
// Minimal - uses defaults
=ComplexLoanApproval(25000, 60)

// Partial override - custom credit score
=ComplexLoanApproval(25000, 60, 780)

// Full override - all custom values
=ComplexLoanApproval(25000, 60, 780, 95000)

// Mix of sources
=ComplexLoanApproval(
  #loan.requestedAmount,    // Attribute
  36,                        // Literal
  #applicant.fico,          // Override default with different attribute
  $calculatedIncome         // Override with variable from context
)
```

---

## Benefits Over Separate ParameterTable

### ✅ Simplicity
- One component to learn, not two
- One place to manage all variables
- Clearer relationship between variables and function signature

### ✅ Flexibility
- Easy to change mapping type without recreating variable
- Can see all variables in one view
- Less cognitive load for users

### ✅ Discoverability
- Radio buttons show all options upfront
- Explanatory text explains what each mapping type does
- Visual badges make parameter status immediately obvious

### ✅ Consistency
- Same UI patterns throughout (card-based, inline editing)
- Consistent with how other editors handle variable management
- No confusion about where to create which type of variable

### ✅ Maintainability
- One component to maintain, not two
- Shared logic for CRUD operations
- Easier to add new mapping types in future

---

## Breaking Changes

**None** - This is a refactor of the v08 implementation that was just created. No external APIs or user data affected.

---

## Migration Notes

**For users who saw v08 (ParameterTable):**
- Parameters tab has been removed
- All parameter functionality is now in Variables tab
- Select mapping type to control function signature behavior
- Same end result, simpler workflow

---

## Files Changed

### Modified
- `/components/editors/core/types/EditorTypes.ts` - Added mappingType and isOverridable to Variable
- `/components/editors/code/shared/components/VariableTable/VariableTable.tsx` - Added mapping type selection
- `/components/editors/code/shared/components/VariableTable/VariableTable.module.css` - Added mapping styles
- `/components/editors/code/shared/components/index.ts` - Removed ParameterTable export
- `/App.tsx` - Removed Parameters tab and parameter state

### Deleted
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.tsx`
- `/components/editors/code/shared/components/ParameterTable/ParameterTable.module.css`
- `/components/editors/code/shared/components/ParameterTable/index.ts`

---

## Testing Checklist

✅ **Variable Creation**
- [x] Create user-defined variable (required parameter)
- [x] Create default-mapped variable (optional parameter)
- [x] Create locked variable (not in signature)
- [x] Create internal variable (no mapping)
- [x] Validate no duplicate names
- [x] Validate no blank names

✅ **Mapping Type Selection**
- [x] Radio buttons work correctly
- [x] Conditional sub-options appear/disappear
- [x] Data source input shows for default-mapped and locked
- [x] Override checkbox shows for default-mapped only
- [x] Badge updates when mapping type changes

✅ **Variable Editing**
- [x] Edit variable name inline
- [x] Change variable type via dropdown
- [x] Change mapping type via radio buttons
- [x] Edit data source when applicable
- [x] Toggle override checkbox when applicable
- [x] Visual badges update correctly

✅ **Variable Deletion**
- [x] Delete variable removes from list
- [x] No orphaned state

✅ **UI States**
- [x] Empty state displays correctly
- [x] Card hover states work
- [x] Adding card shows with correct styling
- [x] Keyboard navigation (Enter to save, Escape to cancel)
- [x] Focus management during inline editing

✅ **Sidebar Navigation**
- [x] Two tabs render correctly (Variables, Testing)
- [x] Variables tab shows VariableTable with mapping
- [x] Testing tab shows FeatureList
- [x] Active tab indicator works
- [x] Tab state persists during editor use

✅ **Styling**
- [x] Uses CSS variables for all design values
- [x] Explicit overrides of component defaults
- [x] Consistent with original VariableTable styling
- [x] Responsive card layout
- [x] Proper spacing and alignment
- [x] Badge colors distinct and accessible

---

## Next Steps

When continuing Named Formulas implementation:

1. **Phase 1 (Foundation)**
   - Formula naming input (header section)
   - Formula registry service
   - Metadata storage and retrieval
   - Generate function signature from variables with mapping types

2. **Phase 3 (Autocomplete)**
   - Formula name suggestions
   - Signature display in autocomplete
   - Parameter hints showing required/optional
   - Link to formula definition

3. **Phase 4 (Execution)**
   - Formula invocation with mapping type logic
   - Argument validation against signature
   - Handle default values for optional parameters
   - Execute locked variable data source queries

4. **Advanced Features**
   - Visual signature preview
   - Parameter reordering (affects signature order)
   - Bulk mapping type changes
   - Export/import formula definitions

---

## Retrospective

### What Went Well

✅ **User Feedback Acted Upon:**
- User immediately identified over-complexity
- Simple suggestion ("parameters should not be separate")
- Quick pivot to simpler solution

✅ **Simpler Mental Model:**
- One concept: variables
- One configuration: mapping type
- Clear relationship: mapping → signature behavior

✅ **Clean Implementation:**
- Enhanced existing component rather than creating new one
- Reused patterns (radio buttons, conditional fields)
- Minimal code changes to App.tsx

✅ **Visual Clarity:**
- Badges immediately show parameter status
- Color coding is intuitive
- Conditional fields prevent configuration errors

### What Could Be Improved

⚠️ **Initial Over-Engineering:**
- Should have questioned separate tables from the start
- Complexity was a code smell
- User feedback was necessary to correct course

⚠️ **No Drag-and-Drop Reordering:**
- Parameter order matters for function signature
- Creation order determines signature order
- Should add reordering in future phase

⚠️ **No Visual Signature Preview:**
- Would be helpful to see generated signature
- "What will this look like when invoked?"
- Future enhancement opportunity

### Lessons Learned

💡 **Listen to User Feedback:**
- Users often spot over-complexity immediately
- "This seems too complicated" is valid feedback
- Simple solutions are usually better

💡 **Question Separate Tables:**
- If two tables have similar CRUD operations, they're probably the same thing
- Configuration fields (mapping type) are better than separate tables
- One table with filters/badges > multiple tables

💡 **Radio Buttons Are Your Friend:**
- Perfect for mutually exclusive choices
- Descriptive labels explain what each choice does
- Conditional sub-options provide progressive disclosure

💡 **Badges Beat Tabs:**
- Visual indicators (badges) are more efficient than navigation (tabs)
- Color coding conveys meaning instantly
- Less clicking, more information density

---

## Related Documentation

- `/change-log/25-10-23_v07-NamedFormulasPlan.md` - Overall Named Formulas plan (updated with this approach)
- `/change-log/25-10-23_v08-ParameterTableImplementation.md` - Previous approach (superseded)
- `/components/editors/code/shared/components/VariableTable/` - Enhanced VariableTable component

---

## Change Log Entry

**Status:** ✅ Implemented - Simplified parameter management by unifying with VariableTable

**Summary:** Removed separate ParameterTable component and enhanced VariableTable with mapping type selection (user-defined, default-mapped, locked, internal) to control function signature behavior. One table, simpler mental model, clearer relationship between variables and parameters.

**Breaking Changes:** None - internal refactor only

**Migration Notes:** Parameters tab removed, all functionality now in Variables tab with mapping type selection
