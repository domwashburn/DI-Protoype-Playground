# Removed Active Token Suppression for Undefined Variables

**Date:** October 29, 2025  
**Type:** UX Enhancement  
**Scope:** Formula Editor Validation & Syntax Highlighting

---

## Summary

Removed the "active token suppression" feature that was hiding undefined variable errors while editing. Now, undefined variables **always** show error highlighting (red + wavy underline), even while the cursor is inside them. Errors only disappear when the variable becomes valid.

---

## User Request

> "One small change ... when editing a variable with an undefined highlight, it should remain undefined until the value is valid"

**Previous Behavior:**
1. Type `$unknownVar` → Shows red highlight (undefined)
2. Click inside `$unknownVar` to edit → Red highlight **disappears** (suppressed)
3. Change to `$orderTotal` → Red highlight stays gone (now valid)

**New Behavior:**
1. Type `$unknownVar` → Shows red highlight (undefined)
2. Click inside `$unknownVar` to edit → Red highlight **remains** (persistent)
3. Change to `$orderTotal` → Red highlight disappears (now valid)

---

## What Changed

### 1. Removed Active Token Tracking

**File:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**Before:**
```tsx
// Tracked cursor position inside variable tokens
const activeVariableToken = useMemo(() => {
  // ... logic to find active token
}, [value, cursorPosition]);

const { highlightSyntax } = useFormulaSyntax(variables, activeVariableToken);
const { validate } = useFormulaValidation(variables, activeVariableToken);
```

**After:**
```tsx
// No active token tracking
const { highlightSyntax } = useFormulaSyntax(variables);
const { validate } = useFormulaValidation(variables);
```

**Impact:** Removed ~20 lines of cursor tracking logic.

### 2. Updated Syntax Highlighting Hook

**File:** `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`

**Before:**
```tsx
export function useFormulaSyntax(
  variables: Variable[] = [],
  activeVariableToken: ActiveToken | null = null
) {
  // ...
  const shouldShowAsUndefined = !isValid && !isActiveToken;
  className: shouldShowAsUndefined ? 'formula-variable-undefined' : rule.className
}
```

**After:**
```tsx
export function useFormulaSyntax(
  variables: Variable[] = []
) {
  // ...
  // Always show undefined variables in red (no suppression while editing)
  className: isValid ? rule.className : 'formula-variable-undefined'
}
```

**Impact:** Simplified logic, removed conditional suppression.

### 3. Updated Validation Hook

**File:** `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`

**Before:**
```tsx
export function useFormulaValidation(
  variables: Variable[] = [],
  activeVariableToken: ActiveToken | null = null
) {
  // ...
  const isActiveToken = activeVariableToken && 
    match.index === activeVariableToken.start;
  
  if (!variableNameSet.has(varName) && !isActiveToken) {
    issues.push({ /* error */ });
  }
}
```

**After:**
```tsx
export function useFormulaValidation(
  variables: Variable[] = []
) {
  // ...
  // Always flag undefined variables (no suppression while editing)
  if (!variableNameSet.has(varName)) {
    issues.push({ /* error */ });
  }
}
```

**Impact:** Removed conditional logic, errors always shown.

### 4. Removed Type Definitions

**Removed from both hooks:**
```tsx
export interface ActiveToken {
  start: number;
  end: number;
  text: string;
}
```

**Impact:** Cleaner type definitions, less complexity.

---

## Rationale

### Why Active Token Suppression Was Added (v17)

**Original goal:** Prevent "false positive" errors while typing partial variable names.

**Example problem it solved:**
- User types `$ord` while `$orderTotal` exists
- Without suppression: Shows error even though user is still typing
- With suppression: No error while cursor is inside `$ord`

**Why it was considered helpful:** Reduced visual noise during typing.

### Why It Was Removed

**User preference:** Errors should persist until variable is actually valid.

**Benefits of always showing errors:**
1. **Immediate feedback** - User knows instantly if a variable is undefined
2. **Clear editing state** - Red highlight shows "this needs fixing"
3. **Simpler mental model** - "Red = bad, purple = good" with no exceptions
4. **Consistent behavior** - Same rules apply whether typing or editing

**Edge case example:**
- User has `$wrongName` (undefined, showing red)
- User clicks into it to fix it
- **With suppression:** Red disappears, user might think it's fixed
- **Without suppression:** Red persists, reminding user to fix it

---

## Code Simplification

**Lines removed:** ~40 lines of tracking and conditional logic  
**Complexity reduced:** No cursor position tracking, no conditional suppression

**Before (3 steps):**
1. Track cursor position
2. Find active variable token
3. Conditionally suppress errors

**After (1 step):**
1. Check if variable is defined → show error if not

---

## User Experience Impact

### Typing New Variables

**Scenario:** User types `$newVar` (doesn't exist yet)

**Before:** 
- Type `$n` → No error (still typing)
- Type `$ne` → No error (still typing)
- Type `$new` → No error (still typing)
- Type `$newVar` → Error appears when cursor moves away

**After:**
- Type `$n` → Error immediately
- Type `$ne` → Error immediately
- Type `$new` → Error immediately
- Type `$newVar` → Error immediately (until variable is created)

**Impact:** More immediate feedback, user knows to define the variable.

### Editing Existing Undefined Variables

**Scenario:** User has `$wrongName` and wants to fix it to `$orderTotal`

**Before:**
- Click into `$wrongName` → Red highlight disappears
- User might think "oh it's fixed now?" → No, it's just suppressed
- Type to change it → Error reappears when cursor moves

**After:**
- Click into `$wrongName` → Red highlight **persists**
- Clear signal: "this is still wrong, needs fixing"
- Type to change it → Red disappears only when it matches `$orderTotal`

**Impact:** Clearer feedback, less confusion.

---

## Validation & Testing

### Test Case 1: Type New Undefined Variable

**Input:** Type `$unknownVar` character by character

**Expected:**
- ✅ Red highlight appears with first character `$u`
- ✅ Red highlight persists through all characters
- ✅ Gutter error icon appears
- ✅ Error in ErrorWarningList

**Result:** ✅ PASS

### Test Case 2: Edit Existing Undefined Variable

**Input:** 
1. Have `$wrongName` (undefined, showing red)
2. Click inside it
3. Change to `$orderTotal`

**Expected:**
- ✅ Red highlight persists while cursor is inside
- ✅ Red highlight remains during editing
- ✅ Red highlight disappears when text becomes `$orderTotal`

**Result:** ✅ PASS

### Test Case 3: Partial Match During Editing

**Input:** Have `$orderTotal` defined, edit `$wrongName` → `$ord`

**Expected:**
- ✅ Red highlight shows for `$ord` (even though it's a prefix of `$orderTotal`)
- ✅ Red stays until user types full `$orderTotal`

**Result:** ✅ PASS

### Test Case 4: Validation Banner

**Input:** Type `$unknown1 + $unknown2`

**Expected:**
- ✅ Validation banner shows "2 errors"
- ✅ Both variables show red highlight
- ✅ Both show in ErrorWarningList

**Result:** ✅ PASS

---

## Breaking Changes

**None.** This is purely a UX change. No API changes, no data structure changes.

**Affects:**
- Formula Editor syntax highlighting behavior
- Formula Editor validation behavior

**Does NOT affect:**
- Other editors (BAL, Markdown, RichText)
- Evaluation engine
- Test panel
- Variable management

---

## Related Changes

**Reverts:** Partially reverts [v17 - Active Token Suppression](./25-10-28_v17-ActiveTokenSuppression.md)

**Maintains:**
- Error/warning gutter icons (CRIT-002)
- Line number styling
- ErrorWarningList component
- All other validation logic

---

## Documentation Updates

**Updated documentation comments in:**
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`
- `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`
- `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`

**Notes added:**
> "Removed active token suppression - undefined variables stay highlighted while editing"

---

## Future Considerations

If users request "smart" suppression in the future, we could implement:

**Option 1: Prefix Matching**
- Only suppress if typed text is a prefix of a valid variable
- Example: `$ord` suppressed if `$orderTotal` exists
- Example: `$xyz` still shows error (not a prefix)

**Option 2: Debounced Errors**
- Show errors only after user stops typing for 500ms
- Gives time to complete variable name
- Still shows errors for static content

**Option 3: "Quick Fix" Suggestions**
- Show error but offer quick fix: "Did you mean $orderTotal?"
- User can click to auto-complete

**Current decision:** Keep it simple. Always show errors.

---

## Conclusion

**Status:** ✅ Complete

Removed active token suppression to provide clearer, more consistent error feedback. Undefined variables now **always** show error highlighting, making it immediately obvious which variables need to be fixed or defined.

**User benefit:** Less confusion, clearer editing state, immediate feedback.

**Code benefit:** Simpler logic, fewer edge cases, easier to maintain.

---

**Implementation time:** 15 minutes  
**Files changed:** 3  
**Lines removed:** ~40  
**Lines added:** ~5 (documentation)
