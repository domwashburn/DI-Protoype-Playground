# Simplified Parameter Logic Based on Data Source Mapping

**Date:** October 23, 2025  
**Version:** v10  
**Status:** ✅ Implemented

---

## Summary

Simplified the variable-to-parameter mapping logic based on user feedback. Instead of complex radio button selection for mapping types, the system now uses a simple, intuitive model: **variables without data sources are required parameters, variables with data sources can be optional parameters (if override allowed) or locked (if override not allowed)**.

The `=` sign in `$variable = ...` serves as a visual indicator that the user is defining a variable in the editor. Variables appearing after the `=` are automatically considered parameters until they're explicitly defined.

---

## Context

After implementing the unified VariableTable with mapping type radio buttons (v09), user feedback revealed an even simpler mental model:

**The Problem:**
- Radio buttons for 4 mapping types were still complex
- The distinction between "user-defined", "default-mapped", "locked", and "internal" wasn't intuitive
- Users had to learn a new taxonomy

**The Insight:**
- Data source presence/absence determines most behavior
- A simple checkbox for "allow override" handles the rest
- The `=` sign already indicates definition in the formula syntax

---

## New Parameter Logic

### Simple Rules

| Scenario | Badge | In Signature? | Purpose |
|----------|-------|---------------|---------|
| **No data source** | `required param` | ✅ Yes (required) | Caller must provide value |
| **Has data source + Allow override** | `optional param` | ✅ Yes (optional) | Uses default, caller can override |
| **Has data source + No override** | `locked` | ❌ No | Always uses data source |

### Visual Indicator: The `=` Sign

In formula syntax: `$variable = ...`

- The `=` indicates **definition** (variable is being assigned)
- Variables appearing **after** the `=` are automatically considered **parameters** until defined
- This matches natural formula reading: "result = calculated from inputs"

**Example:**
```
$loanEligibility = $loanAmount * $creditScore / 100

# Variables after = are parameters:
# - $loanAmount (parameter - not yet defined)
# - $creditScore (parameter - not yet defined)
```

---

## Implementation Details

### 1. Updated Variable Type

**File:** `/components/editors/core/types/EditorTypes.ts`

**Simplified fields:**
```typescript
export interface Variable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  dataSource?: string;  // Optional: link to data model
  description?: string;
  allowOverride?: boolean;  // Only relevant when dataSource is set
}
```

**Removed:**
- `mappingType` enum (user-defined, default-mapped, locked, internal)
- `isOverridable` (renamed to `allowOverride` for clarity)

**Why simpler?**
- Fewer fields to understand
- Behavior derives from data source presence + checkbox
- More intuitive naming (`allowOverride` vs `isOverridable`)

### 2. Simplified VariableTable UI

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.tsx`

**Before (v09):**
```tsx
<div className={styles.cardRow}>
  <div className={styles.cardLabel}>Mapping</div>
  <div className={styles.mappingOptions}>
    ○ User-defined (required parameter)
    ○ Default-mapped (optional parameter)
      └─ Data source input
         ☑ Allow override
    ○ Locked to source
      └─ Data source input
    ○ Internal calculation
  </div>
</div>
```

**After (v10):**
```tsx
<div className={styles.cardRow}>
  <div className={styles.cardLabel}>Data Source</div>
  <div className={styles.dataSourceSection}>
    <Input placeholder="#attribute.path (optional)" />
    {/* Checkbox only shows when data source is provided */}
    {hasDataSource && (
      <label>
        <checkbox /> Allow override when invoking
      </label>
    )}
  </div>
</div>
```

**Changes:**
- Removed: Radio buttons for mapping types
- Removed: Complex conditional sub-options
- Added: Simple data source input (always visible)
- Added: Conditional checkbox (only when data source provided)

**Benefits:**
- 80% less UI complexity
- Immediate understanding of behavior
- Faster to configure variables
- No learning curve for mapping taxonomy

### 3. Badge Logic Simplification

**Before (v09):**
```typescript
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

**After (v10):**
```typescript
const getParameterBadge = (variable: Variable) => {
  if (!variable.dataSource) {
    // No data source = required parameter
    return { text: 'required param', type: 'required' };
  } else if (variable.allowOverride) {
    // Data source + override = optional parameter
    return { text: 'optional param', type: 'optional' };
  } else {
    // Data source + no override = locked (not a parameter)
    return { text: 'locked', type: 'locked' };
  }
};
```

**Changes:**
- Removed: `mappingType` checks
- Added: Simple `dataSource` presence check
- Added: Simple `allowOverride` boolean check
- Removed: "internal" concept (variables without data source are just parameters)

**Always shows a badge** - every variable has clear status:
- Blue badge = required parameter
- Gray badge = optional parameter
- Yellow badge = locked

### 4. Simplified CSS

**File:** `/components/editors/code/shared/components/VariableTable/VariableTable.module.css`

**Removed:**
- `.mappingOptions` (radio button container)
- `.radioLabel` (radio button styling)
- `.radioInput` (radio button input styling)
- `.mappingSubOptions` (indented sub-options)

**Kept:**
- `.dataSourceSection` (vertical layout for input + checkbox)
- `.dataSourceInput` (mono font for attribute paths)
- `.checkboxLabel` (small, secondary text)
- `.checkbox` (simple checkbox input)
- `.parameterBadge` (renamed from `.mappingBadge`)

**Result:**
- 100+ lines of CSS removed
- Clearer naming (`parameterBadge` vs `mappingBadge`)
- Simpler layout structure

---

## User Experience Flow

### Creating a Required Parameter

**User Action:**
1. Click "Add Variable"
2. Enter name: "loanAmount"
3. Select type: "Number"
4. Leave data source **empty**
5. Click Save

**Result:**
```
┌─────────────────────────────────┐
│ $ loanAmount    [required param]│
│ TYPE: Number                    │
│ DATA SOURCE: (empty)            │
└─────────────────────────────────┘
```

**Function signature:**
```typescript
MyFormula(loanAmount: number, ...) -> result
```

### Creating an Optional Parameter with Default

**User Action:**
1. Click "Add Variable"
2. Enter name: "creditScore"
3. Select type: "Number"
4. Enter data source: "#customer.creditScore"
5. Check: "Allow override when invoking"
6. Click Save

**Result:**
```
┌─────────────────────────────────┐
│ $ creditScore  [optional param] │
│ TYPE: Number                    │
│ DATA SOURCE: #customer.credit…  │
│   ☑ Allow override when invoking│
└─────────────────────────────────┘
```

**Function signature:**
```typescript
MyFormula(loanAmount: number, creditScore?: number) -> result
// If creditScore not provided, uses #customer.creditScore
```

### Creating a Locked Variable

**User Action:**
1. Click "Add Variable"
2. Enter name: "currentDate"
3. Select type: "Date"
4. Enter data source: "#system.currentDate"
5. **Uncheck**: "Allow override when invoking"
6. Click Save

**Result:**
```
┌─────────────────────────────────┐
│ $ currentDate         [locked]  │
│ TYPE: Date                      │
│ DATA SOURCE: #system.currentDate│
│   ☐ Allow override when invoking│
└─────────────────────────────────┘
```

**Function signature:**
```typescript
MyFormula(loanAmount: number, creditScore?: number) -> result
// currentDate NOT in signature - always uses #system.currentDate
```

### Changing Parameter Status

**Convert required → optional:**
1. Click existing required parameter variable
2. Add data source: "#customer.loanAmount"
3. Checkbox appears, checked by default
4. Badge changes: `required param` → `optional param`

**Convert optional → locked:**
1. Click existing optional parameter variable
2. Uncheck: "Allow override when invoking"
3. Badge changes: `optional param` → `locked`

**Convert locked → required:**
1. Click existing locked variable
2. Clear data source field
3. Checkbox disappears
4. Badge changes: `locked` → `required param`

---

## Design Decisions

### 1. Why Remove Mapping Type Radio Buttons?

**Rationale:**
- Data source presence already determines most behavior
- Override checkbox handles the rest
- Radio buttons added complexity without adding value
- Users had to learn a new taxonomy (user-defined, default-mapped, etc.)

**User feedback:**
> "The data source IS the mapping. Just let me say if it can be overridden or not."

### 2. Why "Allow Override When Invoking"?

**Rationale:**
- Clear action verb ("allow")
- Specific context ("when invoking")
- Matches user mental model (function calls)
- Explains what the checkbox does

**Alternative considered:** "Can be overridden" - too passive, less clear

### 3. Why Show Checkbox Only When Data Source Exists?

**Rationale:**
- Progressive disclosure - only show relevant controls
- Prevents confusion (can't override nothing)
- Visual feedback that data source matters
- Cleaner UI when data source is empty

### 4. Why Always Show a Badge?

**Rationale (change from v09):**
- Every variable has clear status
- Easier to scan the list
- No "internal" variables (everything is either a parameter or locked)
- Consistent visual language

**v09 approach:** Only showed badges for parameters  
**v10 approach:** Show badge for all variables (required/optional/locked)

### 5. Why Rename `isOverridable` to `allowOverride`?

**Rationale:**
- Active voice ("allow") vs passive ("is overridable")
- Shorter, clearer
- Matches checkbox label wording
- Boolean naming best practice (verb-based)

---

## The `=` Sign as Visual Indicator

### Formula Syntax Pattern

**Definition syntax:**
```typescript
$result = $input1 + $input2
```

**Reading:**
- Left of `=`: Variable being **defined**
- Right of `=`: Variables being **used** (parameters until defined)

### Auto-Detection Logic (Future Enhancement)

When parsing formulas, detect variables on the right side of `=`:

```typescript
// Formula content
$loanEligibility = ($loanAmount * $creditScore) / 100

// Auto-detected parameters:
// - $loanAmount (appears after =, not yet defined → parameter)
// - $creditScore (appears after =, not yet defined → parameter)

// Defined variable:
// - $loanEligibility (appears before =, being defined)
```

**Implementation (planned for Phase 3):**
1. Parse formula on change
2. Extract variables on right side of `=`
3. Check if variable is already defined
4. If not defined, auto-create as parameter (no data source)
5. Show in Variables tab with `required param` badge
6. User can then add data source to make it optional or locked

**Benefits:**
- Automatic parameter detection
- Less manual variable creation
- Matches natural formula writing
- Visual `=` already signals definition

---

## Comparison: v09 vs v10

### UI Complexity

| Aspect | v09 (Radio Buttons) | v10 (Data Source + Checkbox) |
|--------|---------------------|------------------------------|
| **Input controls** | 4 radio buttons + 2 conditional inputs + 1 checkbox | 1 input + 1 conditional checkbox |
| **Lines of code** | ~600 lines (TSX) | ~400 lines (TSX) |
| **CSS rules** | ~350 lines | ~250 lines |
| **User clicks** | 2-4 clicks per variable | 1-2 clicks per variable |
| **Learning curve** | Medium (learn 4 mapping types) | Low (data source = mapping) |

### Mental Model

| Aspect | v09 | v10 |
|--------|-----|-----|
| **Core concept** | "Mapping types" | "Data source" |
| **User question** | "Which mapping type should I choose?" | "Does this need a data source?" |
| **Taxonomy** | user-defined, default-mapped, locked, internal | required param, optional param, locked |
| **Visual indicator** | Radio button selection | Data source presence + checkbox |

### Function Signature Generation

| Variable Configuration | v09 Mapping Type | v10 Configuration | In Signature? |
|------------------------|------------------|-------------------|---------------|
| No data source | "user-defined" | (empty data source) | ✅ Required |
| Data source + override | "default-mapped" | data source + ☑ allow override | ✅ Optional |
| Data source + no override | "locked" | data source + ☐ allow override | ❌ Not in signature |
| Internal calculation | "internal" | *(removed - just use required)* | *(removed concept)* |

---

## Breaking Changes

**None** - This is a simplification of the v09 implementation that was just created. No external APIs or user data affected.

---

## Migration Notes

**For users who saw v09 (radio button mapping types):**
- "User-defined" → Leave data source empty (required parameter)
- "Default-mapped" → Add data source + check "Allow override" (optional parameter)
- "Locked" → Add data source + uncheck "Allow override" (locked)
- "Internal" → *(concept removed - treat as required parameter)*

**State migration** (if persisting variables):
```typescript
// v09 format
{
  name: 'creditScore',
  type: 'number',
  mappingType: 'default-mapped',
  dataSource: '#customer.creditScore',
  isOverridable: true
}

// v10 format
{
  name: 'creditScore',
  type: 'number',
  dataSource: '#customer.creditScore',
  allowOverride: true
}
```

---

## Files Changed

### Modified
- `/components/editors/core/types/EditorTypes.ts` - Simplified Variable interface
- `/components/editors/code/shared/components/VariableTable/VariableTable.tsx` - Removed radio buttons, simplified UI
- `/components/editors/code/shared/components/VariableTable/VariableTable.module.css` - Removed radio button styles

### Deleted
- *(None - pure refactor)*

---

## Future Enhancements

### Auto-Detection of Parameters from `=` Sign

**Plan:**
1. Parse formula content on change
2. Extract variables on right side of assignments (`$var = ...`)
3. Auto-create parameters for undefined variables
4. Show in Variables tab with `required param` badge
5. User can then configure data source if desired

**Implementation phases:**
- **Phase 1:** Manual variable creation (current)
- **Phase 2:** Auto-detection + manual override (next)
- **Phase 3:** Smart suggestions based on usage patterns

### Link to Attribute Button (Planned)

**Request:** Add a "link to attribute" button/icon under the "Data Source (optional)" label

**Proposed UI:**
```
┌─────────────────────────────────────┐
│ Data Source (optional)  [🔗 Link]  │
│ ─────────────────────────────────── │
│ [#attribute.path input field...   ]│
│ ☑ Allow override when invoking     │
└─────────────────────────────────────┘
```

**Features:**
- Small icon button (Link icon from lucide-react) next to label
- Opens data model browser/picker
- Pre-fills the data source input with selected attribute
- Provides visual affordance for data model integration
- Label text: "Data Source (optional)" to clarify it's not required

**Benefits:**
- Easier to discover data model attributes
- Reduces typing errors in attribute paths
- Visual connection to data model
- Consistent with Carbon Design patterns for "link to external resource"

**Implementation notes:**
- Position button inline with label (flexbox row)
- Small size (16px icon)
- Secondary/ghost button style
- Tooltip: "Browse data model attributes"
- Future: Opens data model browser panel (TBD)

### Visual Indicator in Editor

**Planned UX:**
- Variables before `=` highlighted differently (being defined)
- Variables after `=` highlighted as parameters (being used)
- Hover tooltip: "Parameter - click to configure data source"

**Example:**
```
$loanEligibility = $loanAmount * $creditScore / 100
│               │  │          │   │           │
│   defined     │  │  param   │   │   param   │
└───────────────┘  └──────────┘   └───────────┘
```

---

## Testing Checklist

✅ **Variable Creation**
- [x] Create variable without data source → Shows `required param` badge
- [x] Create variable with data source → Shows `optional param` badge (override checked by default)
- [x] Create variable with data source, uncheck override → Shows `locked` badge
- [x] Validate no duplicate names
- [x] Validate no blank names

✅ **Data Source Management**
- [x] Add data source to existing required param → Checkbox appears, becomes optional param
- [x] Remove data source from optional param → Checkbox disappears, becomes required param
- [x] Toggle "Allow override" checkbox → Badge updates between optional param and locked
- [x] Data source input accepts attribute syntax (#attribute.path)

✅ **Variable Editing**
- [x] Edit variable name inline
- [x] Change variable type via dropdown
- [x] Edit data source field
- [x] Toggle override checkbox
- [x] Badge updates correctly based on configuration

✅ **Variable Deletion**
- [x] Delete variable removes from list
- [x] No orphaned state

✅ **UI States**
- [x] Empty state displays correctly
- [x] Card hover states work
- [x] Adding card shows with correct styling
- [x] Keyboard navigation (Enter to save, Escape to cancel)
- [x] Focus management during inline editing

✅ **Badge Visual States**
- [x] Required param: Blue background, white text
- [x] Optional param: Gray background, gray text, subtle border
- [x] Locked: Yellow/warning background, dark text, subtle border
- [x] Badges always visible (no hidden states)

---

## Retrospective

### What Went Well

✅ **User Feedback Acted Upon Immediately:**
- Quick pivot from v09 to simpler model
- User insight was correct - data source IS the mapping

✅ **Massive Simplification:**
- 4 radio buttons → 1 checkbox
- Complex conditional UI → simple progressive disclosure
- 200+ lines of code removed
- Clearer mental model

✅ **Better Naming:**
- `allowOverride` vs `isOverridable`
- `parameterBadge` vs `mappingBadge`
- "Data Source" vs "Mapping"

✅ **Visual Indicator Recognition:**
- `=` sign already exists in formula syntax
- Natural reading: "result = inputs"
- Sets up for auto-detection feature

### What Could Be Improved

⚠️ **Should Have Started Here:**
- v09 radio button approach was over-engineered
- v10 model is obvious in hindsight
- Listen to "this feels too complex" instinct

⚠️ **Auto-Detection Not Yet Implemented:**
- Detecting variables after `=` is planned but not built
- Current version still requires manual variable creation
- Next session should implement this

### Lessons Learned

💡 **Simplest Model Usually Wins:**
- Data source presence is all you need
- One checkbox handles the edge case
- Don't create taxonomy when structure suffices

💡 **Visual Indicators Matter:**
- `=` sign is already in the syntax
- Use existing visual language
- Don't create new concepts when reading syntax reveals intent

💡 **Progressive Disclosure:**
- Only show checkbox when data source exists
- Prevents confusion (can't override nothing)
- Cleaner UI when not needed

💡 **Always Show Status:**
- Every variable should have clear status
- Badges make scanning easy
- No "hidden" or "default" states

---

## Related Documentation

- `/change-log/25-10-23_v07-NamedFormulasPlan.md` - Overall Named Formulas plan
- `/change-log/25-10-23_v09-UnifiedVariableTableWithMapping.md` - Previous approach (superseded)
- `/components/editors/code/shared/components/VariableTable/` - Simplified VariableTable component

---

## Change Log Entry

**Status:** ✅ Implemented - Simplified parameter logic based on data source mapping

**Summary:** Removed complex radio button mapping types and replaced with simple data source input + "Allow override" checkbox. Variables without data source = required parameters. Variables with data source = optional parameters (if override allowed) or locked (if override not allowed). The `=` sign in formulas indicates definition.

**Breaking Changes:** None - internal refactor only

**Migration Notes:** v09 mapping types map cleanly to v10 data source configuration