# Undefined Variable Highlighting Fix

**Date:** October 28, 2025  
**Type:** Bug Fix  
**Phase:** R1 - Critical Issues  
**Issue:** CRIT-002 (Partial Fix)

---

## Summary

Fixed syntax highlighting to properly mark undefined variables with red color and wavy underline. Removed incorrect prefix matching logic that was causing undefined variables to appear valid (purple) when they should show as errors (red).

---

## Problem

**CRIT-002: Undefined Variables Not Highlighted as Errors**

When user types undefined variables (not in variable table), they show as valid:
- **Text color:** Purple (same as valid variables)
- **Underline:** None  
- **Expected:** Red color with wavy underline

**Example:**
- Variables defined: `$orderTotal`, `$amount`, `$discount`
- User types: `$ord` (undefined variable)
- **Before fix:** Shows purple (looks valid) ❌
- **After fix:** Shows red with wavy underline (error) ✅

**Root Cause:**
Syntax highlighting had prefix matching logic that marked `$ord` as valid if it was a prefix of `$orderTotal`. This was incorrect - partial variable names should be treated as undefined/errors.

---

## Solution

**Removed prefix matching from syntax highlighting:**

**Before (useFormulaSyntax.ts lines 152-167):**
```typescript
if (rule.name === 'variable') {
  const varName = match[0].substring(1); // Remove $
  const isValid = variableNames.includes(varName);
  // ❌ Check if this is a prefix of any existing variable (partial typing)
  const isPartialMatch = variableNames.some(v => v.startsWith(varName));
  // Only mark as undefined if it's neither valid nor a partial match
  const shouldMarkUndefined = !isValid && !isPartialMatch;
  
  tokens.push({
    start: match.index,
    end: match.index + match[0].length,
    className: shouldMarkUndefined ? 'formula-variable-undefined' : rule.className,
    text: match[0],
    priority: rule.priority,
  });
}
```

**After (useFormulaSyntax.ts lines 152-160):**
```typescript
if (rule.name === 'variable') {
  const varName = match[0].substring(1); // Remove $
  const isValid = variableNames.includes(varName);
  // ✅ Simple exact match check - no prefix matching
  
  tokens.push({
    start: match.index,
    end: match.index + match[0].length,
    className: isValid ? rule.className : 'formula-variable-undefined',
    text: match[0],
    priority: rule.priority,
  });
}
```

**How It Works Now:**
1. User has variables: `$orderTotal`, `$orderDate`, `$amount`
2. User types: `$ord`
3. Syntax highlighting checks: `variableNames.includes("ord")` → **false**
4. Applies className: `'formula-variable-undefined'`
5. CSS renders: Red color (`#da1e28`) with wavy underline

---

## CSS Styling (Already Existed)

The CSS for undefined variables was already implemented in `FormulaEditor.module.css`:

```css
:global(.formula-variable-undefined) {
  color: var(--syntax-variable-undefined);  /* Red: #da1e28 */
  font-weight: 500;
  text-decoration: wavy underline;
  text-decoration-color: var(--validation-error);  /* Red: #da1e28 */
}
```

The problem was NOT the CSS - the problem was that the class wasn't being applied due to prefix matching logic.

---

## Files Changed

1. `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts` (lines 152-167)
   - Removed prefix matching logic
   - Simplified to exact match only
   - Undefined variables now properly get `formula-variable-undefined` class

2. `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts` (lines 190-210)
   - Reverted incorrect prefix matching that was mistakenly added
   - Validation now properly flags undefined variables as errors

---

## What This Fixes

✅ **Undefined variables now show RED with wavy underline**
- Immediate visual feedback that variable doesn't exist
- Consistent with error state

✅ **Validation errors now appear in banner**
- "Undefined variable: $ord" message shows correctly
- Error banner appears when undefined variables exist

---

## What This Does NOT Fix (Future Work)

❌ **Error row highlights** (error icon beside line number)
- NOT implemented yet
- Separate feature from syntax highlighting
- Would require additional implementation

❌ **Error row background highlight**
- NOT implemented yet  
- Separate feature from syntax highlighting
- Would require changes to line rendering

**These are separate features that need to be implemented as part of continuing CRIT-002 work.**

---

## Testing Scenarios

### Scenario 1: Undefined Variable
**Setup:** Variables defined: `$orderTotal`, `$amount`

**Steps:**
1. Type `$ord` in editor
2. Check text color → **Red** ✅
3. Check underline → **Wavy red underline** ✅
4. Check validation banner → **"Undefined variable: $ord"** ✅

---

### Scenario 2: Valid Variable
**Setup:** Variables defined: `$orderTotal`, `$amount`

**Steps:**
1. Type `$orderTotal` in editor
2. Check text color → **Purple** (valid) ✅
3. Check underline → **None** ✅
4. Check validation banner → **No error** ✅

---

### Scenario 3: Mixed Valid and Invalid
**Setup:** Variables defined: `$orderTotal`, `$amount`

**Code:**
```
$orderTotal * 1.05 + $xyz
```

**Expected:**
- `$orderTotal` → Purple (valid)
- `$xyz` → Red with wavy underline (invalid)
- Validation banner: "1 error: Undefined variable: $xyz"

---

### Scenario 4: Multiple Undefined Variables
**Setup:** Variables defined: `$orderTotal`, `$amount`

**Code:**
```
$abc + $xyz + $orderTotal
```

**Expected:**
- `$abc` → Red with wavy underline
- `$xyz` → Red with wavy underline
- `$orderTotal` → Purple (valid)
- Validation banner: "2 errors: Undefined variable: $abc, Undefined variable: $xyz"

---

## Why Prefix Matching Was Wrong

**Initial thinking:** "While user is typing `$ord` to build `$orderTotal`, don't show error"

**Why this is incorrect:**
1. **User doesn't know if they made a typo** - Is it `$ord` or `$order` or `$orderT`?
2. **Autocomplete handles typing assistance** - That's what autocomplete is for
3. **Immediate feedback is important** - User should see red = "this doesn't exist yet"
4. **Consistent with validation** - Validation shows error, highlighting should too

**Correct approach:**
- Show error immediately (red)
- Autocomplete suggestions help user complete the variable name
- Once user selects from autocomplete or types full name, error disappears

---

## Validation Changes (Reverted)

I initially ADDED prefix matching to validation (thinking that was the fix), but this was wrong. I reverted it.

**What I incorrectly added:**
```typescript
const isPartialMatch = variables.some(v => v.name.startsWith(varName));
if (!isValid && !isPartialMatch) {
  // Show error
}
```

**Why this was wrong:**
- Made validation MORE lenient (fewer errors shown)
- But user reported validation was TOO lenient (not showing errors when it should)
- Complete misunderstanding of the issue

**Correct behavior (restored):**
```typescript
if (!variableNameSet.has(varName)) {
  // Show error - simple exact match
}
```

---

## User Experience Improvement

**Before:**
```
User types: $ord
Syntax highlighting: Purple (looks valid)
Validation banner: No error (prefix match)
User thinks: "Looks good!"
Later: Formula fails because $ord doesn't exist
```

**After:**
```
User types: $ord
Syntax highlighting: Red with wavy underline (error)
Validation banner: "Undefined variable: $ord"
Autocomplete: Shows "$orderTotal", "$orderDate" as suggestions
User thinks: "Oh, this doesn't exist. I need to select from autocomplete or define it."
User selects "$orderTotal" from autocomplete
Syntax highlighting: Purple (valid)
Validation banner: No error
```

**Much clearer UX!** Red = error, purple = valid. Simple and immediate feedback.

---

## Edge Cases

**1. Empty variable name:** `$`
- Not a valid identifier (regex won't match)
- No highlighting applied

**2. Variable name with numbers:** `$var123`
- Valid identifier pattern
- Checks if "var123" is in variable names
- Shows red if not defined

**3. Case sensitivity:** `$Order` vs `$order`
- Case-sensitive matching (JavaScript convention)
- `$Order` and `$order` are different variables

**4. Partial variable in expression:**
```
$ord * 100
```
- `$ord` highlighted as red
- `* 100` highlighted normally
- Validation error: "Undefined variable: $ord"

---

## Related Issues

**CRIT-002 Status: Partial Fix ✅**
- Syntax highlighting: ✅ FIXED (shows red for undefined variables)
- Validation errors: ✅ FIXED (shows error messages)
- Error row highlights: ❌ NOT IMPLEMENTED (separate feature)
- Error row icons: ❌ NOT IMPLEMENTED (separate feature)

**Remaining work for CRIT-002:**
1. Implement error row highlighting (background color for lines with errors)
2. Implement error icons beside line numbers
3. Consider: Click error icon to jump to error location
4. Consider: Hover error icon to see error message

**Still Outstanding from Recovery Plan:**
- CRIT-003: Line number height adjustments for wrapped lines

---

## Next Steps

To fully complete CRIT-002, need to implement:

**1. Error Row Highlighting:**
- Add light red background to lines with validation errors
- Similar to how debug/warning highlights work

**2. Error Icons Beside Line Numbers:**
- Add error icon in line number gutter for lines with errors
- Tooltip on hover to show error message
- Click to focus that line

**3. Warning Row Highlights:**
- Already partially implemented (warning highlights passed as prop)
- May need to add warning icons beside line numbers too

**Reference Implementation:**
Look at how debug highlights work in FormulaEditor:
- `errorHighlight` prop already exists
- `styles.errorLineHighlight` CSS class already exists  
- Just need to populate errorHighlight based on validation results

---

## Technical Notes

**Why This Is Just "Partial Fix":**

The user reported 3 issues with undefined variable detection:
1. ✅ Text highlight doesn't change to red → **FIXED**
2. ❌ Row doesn't highlight with error background → **NOT IMPLEMENTED**
3. ❌ No error icon beside row number → **NOT IMPLEMENTED**

So this change fixes 1 out of 3 parts of the reported issue.

**Architecture Note:**

Error highlighting could be implemented by:
1. Running validation on each change (already happening)
2. Extracting error line numbers from validation result
3. Creating ErrorHighlight objects for each error line
4. Passing to editor similar to how warningHighlights works
5. Rendering error row backgrounds similar to debug/warning highlights

**This would be a good Phase R2 task after completing CRIT-003.**

---

## Conclusion

This fix addresses the most visible part of CRIT-002 - undefined variables now properly show as red with wavy underlines, providing immediate visual feedback to users. Validation error messages also appear correctly in the banner.

However, full error row highlighting (background colors and icons in the line number gutter) still needs to be implemented as a follow-up task.

The key insight: **Prefix matching was the wrong approach. Immediate error feedback with autocomplete assistance is the right approach.**
