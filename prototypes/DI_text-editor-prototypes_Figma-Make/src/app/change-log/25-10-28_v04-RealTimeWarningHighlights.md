# Real-Time Warning Highlights - Complete Implementation

**Date:** October 28, 2025  
**Version:** v04  
**Status:** 🚧 In Progress

## Summary

Implementing real-time warning highlights for the Formula Editor that show warnings BEFORE running the formula. Warnings are detected through debounced validation and displayed with yellow/amber highlights and warning icons in the line number gutter.

## Key Features

1. **Debounced Validation** - Run validation on every keystroke (debounced ~500ms)
2. **Warning Extraction** - Convert character position to line numbers
3. **Warning Highlights** - Yellow/amber line highlights for warnings
4. **Warning Icons** - ⚠️ icons in line number gutter with tooltips
5. **Position Calculation** - Use CSS `calc()` with variables for precise positioning

## Implementation Plan

### Phase 1: Position Fix ✅
- [x] Add `--formula-line-height-px` CSS variable (22.4px)
- [x] Change highlight positioning to use `calc(var(--line-index) * var(--formula-line-height-px))`
- [x] Remove static pixel calculations

### Phase 2: Warning State Management 🚧
- [ ] Add `warningHighlights` state to App.tsx
- [ ] Pass through EditorContainer to FormulaEditor
- [ ] Update FormulaEditor props to accept `warningHighlights?: WarningHighlight[]`

### Phase 3: Warning Extraction 🚧
- [ ] Create `extractWarningLines()` utility function
- [ ] Convert validation warning positions (character indices) to line numbers
- [ ] Handle warnings without position information

### Phase 4: Debounced Validation 🚧
- [ ] Add debounced effect in FormulaEditor
- [ ] Run validation on value change (debounced 500ms)
- [ ] Extract warnings and update parent state
- [ ] Clear warnings when formula is empty or valid

### Phase 5: Warning Rendering ✅
- [x] Add warning highlights to unified highlight container
- [x] Style with yellow/amber colors (IBM Yellow 30, 10% opacity)
- [x] Add warning icons to line number gutter
- [x] Add tooltips with warning messages

## Technical Details

### CSS Variables for Positioning

**Problem:** Static pixel calculations (`(line - 1) * 22.4`) were causing offset issues.

**Solution:** Use CSS custom properties with `calc()`:

```css
:root {
  --formula-line-height-px: 22.4px; /* calc(14px * 1.6) */
}
```

```tsx
<div 
  style={{
    '--line-index': errorHighlight.line - 1,
    top: `calc(var(--line-index) * var(--formula-line-height-px))`,
    height: 'var(--formula-line-height-px)'
  } as React.CSSProperties}
/>
```

### Warning Extraction Utility

```typescript
/**
 * Extract line numbers from validation warnings
 * Converts character positions to line numbers
 */
export function extractWarningLines(
  formula: string,
  warnings: ValidationIssue[]
): WarningHighlight[] {
  const lines = formula.split('\n');
  const warningHighlights: WarningHighlight[] = [];
  
  for (const warning of warnings) {
    if (warning.position) {
      // Convert character position to line number
      const line = getLineNumberFromPosition(formula, warning.position.start);
      warningHighlights.push({
        line,
        message: warning.message,
        code: warning.code,
      });
    } else {
      // Warning without position - try to find it in formula text
      // For example, "Division by zero" warning might occur on line with "/ 0"
      const line = findWarningInFormula(formula, warning);
      if (line !== null) {
        warningHighlights.push({
          line,
          message: warning.message,
          code: warning.code,
        });
      }
    }
  }
  
  return warningHighlights;
}

/**
 * Convert character position to line number
 */
function getLineNumberFromPosition(text: string, position: number): number {
  const beforePosition = text.substring(0, position);
  const linesBefore = beforePosition.split('\n');
  return linesBefore.length;
}

/**
 * Try to find warning pattern in formula (fallback for warnings without positions)
 */
function findWarningInFormula(formula: string, warning: ValidationIssue): number | null {
  const lines = formula.split('\n');
  
  // Pattern matching for specific warning types
  if (warning.code === 'DIVISION_BY_ZERO') {
    // Find line with "/ 0" pattern
    for (let i = 0; i < lines.length; i++) {
      if (/\/\s*0\s*(?![0-9.])/.test(lines[i])) {
        return i + 1; // 1-indexed
      }
    }
  }
  
  // Add more patterns as needed
  
  return null;
}
```

### Debounced Validation Effect

```typescript
// Real-time warning detection (debounced)
useEffect(() => {
  const timer = setTimeout(() => {
    if (!value.trim()) {
      // Clear warnings on empty formula
      onWarningHighlightsChange?.([]);
      return;
    }
    
    const validationResult = validate(value);
    
    if (validationResult.warnings.length > 0) {
      const warnings = extractWarningLines(value, validationResult.warnings);
      onWarningHighlightsChange?.(warnings);
    } else {
      onWarningHighlightsChange?.([]);
    }
  }, 500); // 500ms debounce
  
  return () => clearTimeout(timer);
}, [value, validate, onWarningHighlightsChange]);
```

### State Chain

```
App.tsx
  ├── warningHighlights: WarningHighlight[]
  ├── setWarningHighlights(warnings: WarningHighlight[])
  └── passes to ↓

EditorContainer.tsx
  ├── warningHighlights prop
  ├── onWarningHighlightsChange prop
  └── passes to ↓

FormulaEditor.tsx
  ├── warningHighlights prop (array)
  ├── onWarningHighlightsChange callback
  ├── Debounced validation effect
  └── Renders warning highlights in unified container
```

## Visual Design

**Warning Highlights:**
- Background: `rgba(241, 194, 27, 0.1)` (IBM Yellow 30, 10% opacity)
- Left border: `3px solid var(--support-warning)` (IBM Yellow 30)
- Icon: ⚠️ AlertTriangle (14px) in warning color
- Tooltip: Warning message on hover

**Z-Index Layering:**
- Warning highlights: z-index 0 (same as error highlights)
- Debug current line: z-index 1 (above warnings/errors)
- Syntax highlighting: z-index 1
- Typeahead: z-index 2
- Autocomplete: z-index 10

## Files to Modify

1. `/App.tsx` - Add warningHighlights state
2. `/components/EditorContainer/EditorContainer.tsx` - Pass through props
3. `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - ✅ Already updated (prop types)
4. `/components/editors/code/FormulaEditor/FormulaEditor.module.css` - ✅ Already updated (styles)
5. `/utils/formulaValidationUtils.ts` - NEW: Create warning extraction utilities

## Testing

**Test Cases:**
1. **Division by Zero** - Type `$result = 10 / 0` → should show yellow highlight on line 1
2. **Empty Parentheses** - Type `SUM()` → should show warning
3. **Multiple Warnings** - Formula with multiple issues should show all highlights
4. **Debounce** - Warnings should appear after 500ms of inactivity
5. **Clear on Fix** - Fixing the warning should remove the highlight
6. **Clear on Empty** - Emptying the formula should clear all warnings

## Benefits

1. **Catch Issues Early** - See warnings before running formula
2. **Better Developer Experience** - Immediate feedback while typing
3. **Prevent Runtime Errors** - Some warnings can become runtime errors
4. **Consistent with Errors** - Same visual system as error highlights
5. **Non-Intrusive** - Yellow/amber is visually distinct but not alarming

## Next Steps

1. Complete warning state wiring through component tree
2. Create warning extraction utility
3. Implement debounced validation effect
4. Test with all warning types
5. Add warning icons to line number gutter
6. Document patterns for adding new warning types

## Related Documents

- `/change-log/25-10-28_v03-ErrorHighlightingComplete.md` - Error highlighting foundation
- `/change-log/EPIC-FormulaEvaluationDebugger.md` - Overall debugger epic
