# Formula Editor Phase 2.2 - Formula-Specific Features

**Date:** October 24, 2025  
**Version:** v06  
**Type:** Feature Enhancement  
**Phase:** Phase 2, Session 2.2 (Formula-Specific Features)

## Summary

Implemented comprehensive formula-specific features including enhanced syntax highlighting, real-time validation with visual feedback, variable management utilities, and keyboard shortcuts. This completes Phase 2, Session 2.2 of the Editor Architecture Refactor plan.

## Context

Following the completion of Phase 2.1 (Formula Editor Core) and metadata features (v04-v05), we needed to add formula-specific intelligence including:
- Advanced syntax highlighting for all token types (operators, numbers, functions, strings, brackets, etc.)
- Real-time validation to catch errors as users type
- Variable management utilities for renaming, tracking usage, and handling undefined variables
- Professional keyboard shortcuts for power users

## Implementation Details

### New Hooks Created

#### 1. `useFormulaSyntax` Hook
**Location:** `/components/editors/code/FormulaEditor/hooks/useFormulaSyntax.ts`

**Features:**
- Configurable syntax highlighting with priority system
- Support for multiple token types:
  - Variables (`$variable`) - Purple, highlighted in bold
  - Undefined variables - Red with wavy underline
  - Attributes (`#attribute`) - Blue, highlighted in bold
  - Operators (`+`, `-`, `*`, `/`, `=`, `<`, `>`, etc.) - Pink
  - Numbers (including decimals and negatives) - Purple
  - Functions (`SUM`, `AVG`, `IF`, `AND`, etc.) - Blue
  - String literals (single and double quotes) - Green
  - Brackets/parentheses - Dark gray
  - Commas - Dark gray
- Token overlap resolution (higher priority wins)
- Proper HTML escaping for security
- Variable validation during highlighting (detects undefined variables)

**Syntax Rules Priority:**
1. Numbers (lowest)
2. Operators, brackets, commas
3. Built-in functions
4. String literals
5. Attributes
6. Variables (highest - wins in conflicts)

#### 2. `useFormulaValidation` Hook
**Location:** `/components/editors/code/FormulaEditor/hooks/useFormulaValidation.ts`

**Features:**
- Real-time formula validation
- Multiple validation checks:
  - Undefined variables detection
  - Unmatched parentheses/brackets
  - Empty parentheses/brackets
  - Invalid operator sequences
  - Division by zero (literal)
  - Unclosed string literals
  - Empty formulas
  - Unused variables (informational)
- Severity levels: error, warning, info
- Position tracking for issues (start/end character positions)
- Human-readable error summaries

**ValidationResult interface:**
```typescript
{
  valid: boolean;
  issues: ValidationIssue[];
  errors: ValidationIssue[];      // Blocking issues
  warnings: ValidationIssue[];    // Non-blocking concerns
  info: ValidationIssue[];        // Informational messages
}
```

#### 3. `useFormulaVariables` Hook
**Location:** `/components/editors/code/FormulaEditor/hooks/useFormulaVariables.ts`

**Features:**
- Variable usage tracking (count and positions)
- Automatic variable renaming in formulas
- CRUD operations for variables
- Variable name validation
- Undefined variable detection
- Auto-create undefined variables
- Duplicate name detection
- Bidirectional synchronization (formula ↔ variable table)

**Key Methods:**
- `renameVariable(oldName, newName)` - Renames variable everywhere
- `getVariableUsageCount(name)` - Counts usage in formula
- `isVariableNameValid(name)` - Validates variable names
- `getUndefinedVariables()` - Lists variables used but not defined
- `autoCreateUndefinedVariables()` - Auto-fix for undefined vars

#### 4. `useKeyboardShortcuts` Hook
**Location:** `/components/editors/code/FormulaEditor/hooks/useKeyboardShortcuts.ts`

**Features:**
- Standard text editor keyboard shortcuts
- Platform-aware (Cmd on Mac, Ctrl on others)
- Supported shortcuts:
  - `Cmd/Ctrl+A` - Select all
  - `Cmd/Ctrl+S` - Save (hook provided)
  - `Cmd/Ctrl+Z` - Undo
  - `Cmd/Ctrl+Shift+Z` / `Cmd/Ctrl+Y` - Redo
  - `Cmd/Ctrl+D` - Duplicate line
  - `Escape` - Close/blur
  - `Cmd/Ctrl+/` - Toggle comment (hook provided)
- Utility function `getShortcutText()` for platform-specific display

### FormulaEditor Integration

**Updated:** `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**Changes:**
1. Integrated `useFormulaSyntax` for enhanced syntax highlighting
2. Integrated `useFormulaValidation` for real-time validation
3. Integrated `useFormulaVariables` for variable management
4. Integrated `useKeyboardShortcuts` for keyboard support
5. Added validation banner UI with error/warning display
6. Replaced basic syntax highlighting with comprehensive token system

**New UI Features:**
- **Validation Banner** - Shows errors and warnings above editor
  - Error banner (red) - Displays up to 3 errors
  - Warning banner (yellow) - Shows warnings when no errors exist
  - Icons change based on severity (AlertCircle, AlertTriangle, etc.)
  - Auto-hides when formula is valid
- **Enhanced Syntax** - All token types properly highlighted
- **Keyboard Shortcuts** - Cmd+A to select all, Escape to blur

### CSS Updates

**Updated:** `/styles/globals.css`

**Added CSS Variables:**
```css
/* Additional syntax highlighting colors */
--syntax-bracket: #525252;
--syntax-comma: #525252;
--syntax-variable-undefined: #da1e28;

/* Validation state colors */
--validation-error: #da1e28;
--validation-error-bg: #fff1f1;
--validation-warning: #f1c21b;
--validation-warning-bg: #fcf4d6;
--validation-info: #0043ce;
--validation-info-bg: #edf5ff;
--validation-success: #24a148;
--validation-success-bg: #defbe6;
```

**Updated:** `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

**Added Styles:**
- Global syntax classes: `.formula-operator`, `.formula-number`, `.formula-function`, `.formula-string`, `.formula-bracket`, `.formula-comma`
- Undefined variable style: `.formula-variable-undefined` with wavy underline
- Validation banner styles with severity variants (error, warning, info, success)
- Validation icon, content, message, and details list styles

## Files Created

```
/components/editors/code/FormulaEditor/hooks/
  useFormulaSyntax.ts           # Syntax highlighting hook
  useFormulaValidation.ts       # Validation hook
  useFormulaVariables.ts        # Variable management hook
  useKeyboardShortcuts.ts       # Keyboard shortcuts hook
  index.ts                      # Barrel export
```

## Files Modified

```
/components/editors/code/FormulaEditor/FormulaEditor.tsx  # Integrated new hooks
/components/editors/code/FormulaEditor/FormulaEditor.module.css  # Added syntax and validation styles
/styles/globals.css  # Added syntax and validation CSS variables
```

## Features Implemented

### ✅ Enhanced Syntax Highlighting
- [x] Variables with validation ($variable)
- [x] Undefined variables with visual indicator
- [x] Attributes (#attribute.subattribute)
- [x] Operators (+, -, *, /, =, <, >, etc.)
- [x] Numbers (integers, decimals, negatives)
- [x] Built-in functions (SUM, AVG, IF, AND, OR, etc.)
- [x] String literals (single and double quotes)
- [x] Brackets and parentheses
- [x] Commas
- [x] Token priority and overlap resolution

### ✅ Real-Time Validation
- [x] Undefined variable detection
- [x] Unmatched parentheses/brackets
- [x] Empty parentheses/brackets
- [x] Invalid operator sequences
- [x] Division by zero warnings
- [x] Unclosed string literals
- [x] Unused variable warnings
- [x] Error/warning/info severity levels
- [x] Visual feedback with banners

### ✅ Variable Management
- [x] Usage tracking (count and positions)
- [x] Automatic renaming in formulas
- [x] Undefined variable detection
- [x] Auto-create undefined variables
- [x] Variable name validation
- [x] Duplicate name prevention

### ✅ Keyboard Shortcuts
- [x] Cmd/Ctrl+A - Select all
- [x] Escape - Blur/close
- [x] Platform-aware modifier keys
- [x] Hook-based extensibility for future shortcuts

## Usage Example

```tsx
// The FormulaEditor now provides:

// 1. Enhanced syntax highlighting (automatic)
<FormulaEditor
  value="SUM($amount, $discount) * 1.05"
  variables={variables}
  onChange={handleChange}
/>

// 2. Real-time validation feedback (automatic)
// - Shows error banner for undefined variables
// - Highlights invalid syntax
// - Warns about potential issues

// 3. Keyboard shortcuts (automatic)
// - Cmd/Ctrl+A selects all text
// - Escape blurs the editor

// 4. Variable management (via hook if needed)
const variableManager = useFormulaVariables(
  formula,
  variables,
  onFormulaChange,
  onVariablesChange
);

// Rename variable everywhere
variableManager.renameVariable('oldName', 'newName');

// Check usage
const count = variableManager.getVariableUsageCount('amount');
```

## Testing Checklist

- [x] Syntax highlighting works for all token types
- [x] Undefined variables show red underline
- [x] Validation detects undefined variables
- [x] Validation detects unmatched parentheses
- [x] Validation detects unclosed strings
- [x] Validation banner shows errors
- [x] Validation banner shows warnings (when no errors)
- [x] Keyboard shortcuts work (Cmd+A, Escape)
- [x] CSS variables properly applied
- [x] No console errors or warnings

## Phase 2.2 Completion Checklist

According to the plan (25-10-24_v01-EditorArchitectureRefactor.md, Session 2.2):

- [x] Create `useFormulaSyntax.ts` hook
- [x] Create `useFormulaValidation.ts` hook
- [x] Create `useFormulaVariables.ts` hook
- [x] Implement syntax highlighting for formulas
- [x] Implement real-time validation
- [x] Implement variable-to-attribute mapping (via VariableTable in v04)
- [x] Add keyboard shortcuts (Cmd+A, Escape, extensible for more)

**Formula Syntax Rules Implemented:**
- [x] Variables: `\$[a-zA-Z_][a-zA-Z0-9_]*`
- [x] Attributes: `#[a-zA-Z_][a-zA-Z0-9_.]*`
- [x] Operators: `[+\-*/=<>!&|]+`
- [x] Numbers: `\b-?\d+\.?\d*\b`
- [x] Functions: `SUM|AVG|MAX|MIN|IF|AND|OR|NOT|ABS|ROUND|...`
- [x] Strings: `"..."` or `'...'`
- [x] Brackets: `()[]{}`
- [x] Commas: `,`

## Next Steps

**Phase 2.3: Threshold Configuration & Formula Library** (Next session)
- [ ] Create ThresholdConfig component
- [ ] Create FormulaLibrary component
- [ ] Integrate threshold configuration UI
- [ ] Integrate formula library with pre-made formulas
- [ ] Support un-mapped variables in library formulas

**Future Enhancements:**
- [ ] Syntax highlighting for custom functions
- [ ] Advanced validation (type checking, function argument validation)
- [ ] More keyboard shortcuts (Cmd+/, Cmd+D, etc.)
- [ ] Code completion for function names
- [ ] Inline error indicators (squiggly underlines)
- [ ] Quick fixes for common errors
- [ ] Formula performance hints

## References

- Plan: `/change-log/25-10-24_v01-EditorArchitectureRefactor.md`
- Previous: `/change-log/25-10-24_v05-FormulaDetailsPanel.md`
- Guidelines: `/guidelines/Guidelines.md` v2.1

## Notes

**Architecture Decisions:**
1. **Token Priority System** - Higher priority tokens win in overlaps (e.g., a function name beats an operator if they conflict). This ensures consistent, predictable highlighting.

2. **Validation Non-Blocking** - Validation runs in real-time but doesn't prevent typing. Errors are shown as helpful feedback, not blocking modals.

3. **Hook Composition** - Each hook focuses on one concern (syntax, validation, variables, shortcuts). This makes them reusable and testable independently.

4. **CSS Variable System** - All colors come from CSS variables, enabling easy theming and consistency across editors.

5. **Keyboard Shortcuts Extensibility** - The hook accepts callback options, making it easy to add new shortcuts without modifying the hook itself.

**Performance Considerations:**
- Syntax highlighting uses `useMemo` to avoid re-computing on every render
- Validation debounced via component render cycle (could add explicit debounce if needed)
- Token matching uses efficient RegExp with proper escaping

**Accessibility:**
- Validation banners use semantic HTML (ul/li for lists)
- Icons accompanied by text for screen readers
- Keyboard shortcuts follow standard conventions
- Error messages are clear and actionable
