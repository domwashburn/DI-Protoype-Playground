# v11 - Technical Debt Log

**Date:** October 28, 2025  
**Type:** Technical Debt Documentation  
**Status:** 📋 Tracked  

---

## Summary

This document tracks technical debt and outstanding issues that require future attention. Created after rolling back time/datetime utility functions implementation due to ghost value formatting bugs in the debugging system.

---

## Active Technical Debt

### TD-001: Ghost Value Formatting Bugs (HIGH PRIORITY)

**Severity:** High  
**Component:** Formula Debugger - GhostValue Component  
**Impact:** Prevents adding new datetime utility functions  
**Status:** 🔴 Blocking Future Work  

**Description:**

When adding comprehensive time and datetime utility functions (TIME_TO_SECONDS, TIME_TO_MINUTES, TIME_TO_HOURS, DATE_ADD, DATE_SUBTRACT, WEEKDAY, IS_WEEKEND, IS_WEEKDAY), bugs were introduced in the debugging system's ghost value formatting that required a rollback to a previous version.

**What Was Lost in Rollback:**

The following functions were successfully implemented with autocomplete integration and sample formulas, but had to be rolled back:

1. **Time Utility Functions:**
   - `TIME_TO_SECONDS(time)` - Convert time duration to seconds
   - `TIME_TO_MINUTES(time)` - Convert time duration to minutes  
   - `TIME_TO_HOURS(time)` - Convert time duration to hours

2. **Date Arithmetic Functions:**
   - `DATE_ADD(date, amount, unit)` - Add days/months/years to a date
   - `DATE_SUBTRACT(date, amount, unit)` - Subtract days/months/years from a date

3. **Weekday Functions:**
   - `WEEKDAY(date)` - Get day of week (0=Sunday, 6=Saturday)
   - `IS_WEEKEND(date)` - Check if date is Saturday or Sunday
   - `IS_WEEKDAY(date)` - Check if date is Monday-Friday

4. **Sample Formulas:**
   - Business Days Calculation
   - Weekend Delivery Check
   - Date Offset Calculation

**Known Issues (Ghost Value Formatting):**

The exact bugs are not fully documented, but issues occurred in:
- `/components/editors/code/FormulaEditor/GhostValue.tsx`
- `/components/editors/code/FormulaEditor/GhostValue.module.css`

Likely issues include:
- Incorrect formatting of time/datetime values in ghost overlays
- Type conversion errors when displaying computed values
- CSS layout issues with new value types
- Potential conflicts with existing date/number/string formatting

**Root Cause (Hypothesis):**

The `GhostValue` component may not properly handle:
1. Time type values (durations vs timestamps)
2. Date arithmetic results (time deltas)
3. Weekday number formatting
4. Boolean results from IS_WEEKEND/IS_WEEKDAY

**Required Investigation:**

Before re-implementing the time/datetime functions:
1. Review `GhostValue.tsx` formatting logic
2. Test ghost value rendering with all types: number, string, boolean, date, time
3. Add proper type guards and formatting utilities
4. Test ghost values during step-through debugging
5. Verify CSS layout handles all value types
6. Add edge case handling (null, undefined, error states)

**Recommended Fix Approach:**

1. **Create Type-Safe Formatter:**
   ```typescript
   // In GhostValue.tsx
   function formatGhostValue(value: any, type?: ValueType): string {
     if (value === null || value === undefined) return 'null';
     
     switch (type) {
       case 'time':
         return formatTimeDuration(value); // Handle HH:MM:SS display
       case 'date':
         return formatDate(value); // ISO or friendly format
       case 'boolean':
         return value ? 'true' : 'false';
       case 'number':
         return String(value);
       case 'string':
         return `"${value}"`;
       default:
         return String(value);
     }
   }
   ```

2. **Add Unit Tests:**
   - Test each type independently
   - Test mixed-type formulas
   - Test error states

3. **Visual Regression Testing:**
   - Manually test ghost values in debugger
   - Check all sample formulas
   - Verify layout with long values

**Priority:** High - Blocks adding important datetime functions

**Workaround:** None - Functions not available until fixed

**Related Files:**
- `/components/editors/code/FormulaEditor/GhostValue.tsx`
- `/components/editors/code/FormulaEditor/GhostValue.module.css`
- `/utils/timeFormatting.ts` (formatting utilities)
- `/utils/dateFormatting.ts` (formatting utilities)

---

### TD-002: Time/Datetime Function Re-Implementation

**Severity:** Medium  
**Component:** Evaluation Engine - Function Registry  
**Impact:** Missing useful datetime utility functions  
**Status:** ⏸️ Blocked by TD-001  
**Depends On:** TD-001 (Ghost Value Formatting)

**Description:**

Once TD-001 is resolved, re-implement the 8 time/datetime utility functions that were rolled back.

**Implementation Checklist:**

- [ ] Resolve TD-001 ghost value formatting bugs
- [ ] Re-add TIME_TO_SECONDS, TIME_TO_MINUTES, TIME_TO_HOURS
- [ ] Re-add DATE_ADD, DATE_SUBTRACT with unit parameter
- [ ] Re-add WEEKDAY, IS_WEEKEND, IS_WEEKDAY
- [ ] Add autocomplete entries for all functions
- [ ] Add 3 sample formulas demonstrating usage
- [ ] Test ghost value display for each function
- [ ] Test debugger step-through with datetime formulas
- [ ] Update function registry documentation
- [ ] Add to FormulaDetailsPanel function list

**Reference Implementation:**

The original implementation was complete and working, just needs to be re-added after TD-001 is fixed. Implementation details:

- Functions added to `/services/evaluationEngine/runtime/FunctionRegistry.ts`
- Autocomplete integrated in `/components/editors/code/FormulaEditor/hooks/useInlineTypeahead.ts`
- Sample formulas added to `/SampleData/formulaSamples.ts`

**Priority:** Medium - Nice to have, but not critical for core functionality

---

### TD-003: Error/Warning Row Highlight Visibility

**Severity:** Low  
**Component:** Formula Editor - Line Number Row Highlighting  
**Impact:** Visual feedback for error lines is too subtle  
**Status:** 🟡 Cosmetic Issue  

**Description:**

The error and warning row background highlights in the Formula Editor line number column are not sufficiently visible. While the functionality works correctly (error icons display, line numbers get the correct CSS classes), the background colors at 0.2 and 0.18 opacity may still be too subtle for users to notice.

**Current Implementation:**
```css
.lineNumberError {
  background: rgba(218, 30, 40, 0.2);
  color: var(--cds-support-error);
  font-weight: 600;
}

.lineNumberWarning {
  background: rgba(247, 154, 0, 0.18);
  color: var(--text-warning);
  font-weight: 600;
}
```

**Issue:**
- Background opacity was increased from 0.1 to 0.2/0.18 for better visibility
- User report indicates it's still "not quite" visible enough
- May need further opacity increase or alternative visual treatment
- Not a functional issue - error detection and display works correctly

**Potential Solutions:**

1. **Increase Opacity Further:**
   - Error: 0.25-0.3 opacity
   - Warning: 0.22-0.28 opacity
   - Risk: May be too visually "loud"

2. **Add Left Border:**
   ```css
   .lineNumberError {
     border-left: 3px solid var(--cds-support-error);
   }
   ```

3. **Add Background Pattern:**
   - Subtle striped or dotted pattern
   - More visible than solid color at low opacity

4. **Gradient Background:**
   - Fade from solid color at left to transparent at right
   - Better visual connection to gutter icon

**Testing Needed:**
- Try different opacity values in live editor
- Test with various themes/lighting conditions
- Get user feedback on visibility preferences
- Ensure accessibility (color contrast ratios)

**Priority:** Low - Cosmetic issue, not blocking functionality

**Workaround:** Error icons in gutter and ErrorWarningList component provide alternative visual feedback

**Related Files:**
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` (lines 118-127)
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` (line 842)

**Decision:** Defer to future polish phase. Current implementation is functional and provides multiple visual cues (icon, bold line number, list panel). Row highlighting is supplementary.

---

## Future Enhancements

### FE-001: Comprehensive Ghost Value Type Display

**Description:**

Enhance ghost value display to show type information and formatted values for all types:

```
$duration = 3665 seconds  // 01:01:05 (1 hour, 1 minute, 5 seconds)
$deliveryDate = 2024-12-25  // Wednesday, December 25, 2024
$isWeekend = false  // Weekday
```

**Benefits:**
- Better debugging experience
- Clearer value interpretation
- Easier to spot type issues

**Implementation Ideas:**
- Add tooltip with full type info
- Show human-readable format alongside raw value
- Color-code by type (date=blue, time=purple, etc.)

---

### FE-002: Debug Value Comparison View

**Description:**

Show side-by-side comparison of values before/after operations:

```
Step 3: DATE_ADD
  Input:  $startDate = 2024-01-15
  Amount: 30 days
  Result: 2024-02-14  ← New value
```

**Benefits:**
- Easier to understand transformations
- Catch incorrect calculations quickly
- Educational for formula authors

---

## Resolution Template

When resolving technical debt items, update them with:

```markdown
### TD-XXX: [Title] ✅ RESOLVED

**Resolution Date:** [Date]  
**Resolved In:** [Change log version]  
**Solution:** [Brief description]

**What Was Fixed:**
1. [Bullet points]
2. [Details of fix]

**Testing Done:**
- [Test 1]
- [Test 2]

**See:** [Link to implementation change log]
```

---

## Notes

This document tracks technical debt items that:
- Block future feature development
- Represent incomplete implementations
- Require refactoring or cleanup
- Document known limitations

Each item should include:
- Clear description of the issue
- Impact on users or development
- Root cause (if known)
- Recommended fix approach
- Dependencies and blockers
- Priority and workarounds

---

## Next Steps

1. **Immediate:**
   - ✅ Document rollback and lost work (this document)
   - 🔲 Investigate GhostValue.tsx formatting logic
   - 🔲 Create reproduction test cases for ghost value bugs

2. **Short Term:**
   - 🔲 Fix TD-001 (Ghost Value Formatting)
   - 🔲 Add unit tests for ghost value type rendering
   - 🔲 Re-implement time/datetime functions (TD-002)

3. **Long Term:**
   - 🔲 Consider FE-001 (Enhanced ghost value display)
   - 🔲 Consider FE-002 (Debug value comparison view)

---

**Last Updated:** October 28, 2025  
**Owner:** Development Team  
**Next Review:** After TD-001 resolution
