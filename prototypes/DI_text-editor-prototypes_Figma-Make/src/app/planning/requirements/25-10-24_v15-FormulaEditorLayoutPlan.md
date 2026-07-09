# Formula Editor Layout Enhancement Plan

**Date:** October 24, 2025  
**Version:** v15  
**Type:** Feature Enhancement Plan  
**Status:** Planning

---

## Executive Summary

Apply the BAL Editor's professional layout and styling (numbered lines, font size, monospace font) to the Formula Editor while retaining **ALL** existing functionality (autocomplete, syntax highlighting, validation, thresholds, etc.).

### Goal

Make the Formula Editor visually consistent with the BAL Editor by:
1. ✅ Adding **line numbers** with error highlighting
2. ✅ Using **IBM Plex Mono** monospace font
3. ✅ Matching **font size** (14px) and **line height** (1.6)
4. ✅ Applying BAL's **spacing** and **layout structure**
5. ✅ **Retaining 100%** of current Formula functionality

### Non-Goals

- ❌ Changing Formula Editor **functionality**
- ❌ Modifying **autocomplete** behavior
- ❌ Altering **syntax highlighting** logic
- ❌ Changing **validation** system
- ❌ Touching **threshold** features
- ❌ Breaking **inline typeahead**

---

## Current State Analysis

### BAL Editor Layout

**Key Visual Features:**
```
┌──────────────────────────────────────────────────────┐
│ [Error Banner - if errors exist]                    │
├────────┬─────────────────────────────────────────────┤
│   1    │ if employee.years of service >= 5 then     │ ← Line numbers
│   2    │   set 'eligible' to true                   │    (48px wide)
│   3 ⚠  │   set bonus to 1000                        │ ← Error indicator
│   4    │ end                                        │
│   ...  │                                            │
└────────┴─────────────────────────────────────────────┘
         ↑                                             ↑
    Line number                               Content area
    column with                               (textarea + overlay)
    error states
```

**Structure:**
1. **Container** - Error banner (conditional) + editor wrapper
2. **Line Numbers** - Fixed-width column (48px), scrolls with content
3. **Content Area** - Textarea + syntax highlighting overlay
4. **Font** - IBM Plex Mono, 14px, line-height 1.6

**CSS Variables Used:**
```css
--editor-line-number-width: 48px;
--editor-font-size: 14px;
--editor-line-height: 1.6;
--editor-padding: var(--cds-spacing-05); /* 16px */
font-family: 'IBM Plex Mono', 'Courier New', monospace;
```

### Formula Editor Current Layout

**Current Structure:**
```
┌──────────────────────────────────────────────────────┐
│ Formula Expression             [Convert to Variable] │ ← Header
├──────────────────────────────────────────────────────┤
│                                                      │
│ $baseScore = (#customer.creditScore / 850) * 100    │ ← No line numbers
│                                                      │
│ IF #customer.income >= 50000 THEN                   │
│   $baseScore = $baseScore + 10                      │
│ END                                                  │
│                                                      │
│ [Autocomplete popup when typing]                    │
│ [Inline typeahead ghost text]                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Current Font:**
- Uses default browser font (likely system sans-serif)
- No explicit font-family set
- Standard font size from globals.css

**Current Features (MUST RETAIN):**
- ✅ Textarea + overlay architecture
- ✅ Autocomplete for $ (variables) and # (attributes)
- ✅ Inline typeahead with ghost text
- ✅ Syntax highlighting (variables, attributes, keywords, operators, numbers)
- ✅ Real-time validation with error display
- ✅ Keyboard shortcuts (Tab, Enter, Escape, Arrows)
- ✅ Focus states and border changes
- ✅ Synchronized scrolling between textarea and overlays

---

## Design Specification

### Target Layout

```
┌──────────────────────────────────────────────────────┐
│ Formula Expression             [Convert to Variable] │ ← Header (unchanged)
├────────┬─────────────────────────────────────────────┤
│   1    │ $baseScore = (#customer.creditScore / 850)│ ← Line numbers added
│   2    │              * 100                         │
│   3    │                                            │
│   4    │ IF #customer.income >= 50000 THEN          │
│   5    │   $baseScore = $baseScore + 10             │
│   6 ⚠  │ ENDD                                       │ ← Error on line 6
│   7    │                                            │
│   8    │ $baseScore                                 │
└────────┴─────────────────────────────────────────────┘
         ↑                                             ↑
    Line numbers                              Content area
    (48px wide)                              (monospace font)
    
    [Autocomplete popup - still works]
    [Inline typeahead - still works]
    [All functionality preserved]
```

### Typography

**Change from:**
```css
/* Current - uses default */
.textarea {
  font-family: var(--font-family-sans); /* IBM Plex Sans */
  font-size: inherit;
  line-height: inherit;
}
```

**Change to:**
```css
/* Target - monospace like BAL */
.textarea {
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: var(--editor-font-size); /* 14px */
  line-height: var(--editor-line-height); /* 1.6 */
}
```

### Layout Structure

**HTML Structure:**
```tsx
<div className={styles.formulaEditor}>
  {/* Existing header - unchanged */}
  <div className={styles.editorHeader}>
    <label>Formula Expression</label>
    <Button>Convert to Variable</Button>
  </div>
  
  {/* NEW: Error banner (if validation errors) */}
  {validationErrors.length > 0 && (
    <div className={styles.errorBanner}>
      {validationErrors.map(error => (
        <div key={error.line}>Line {error.line}: {error.message}</div>
      ))}
    </div>
  )}
  
  {/* Modified: Add wrapper for line numbers + content */}
  <div className={styles.editorContainer}>
    {/* NEW: Line numbers column */}
    <div className={styles.lineNumbers} ref={lineNumbersRef}>
      {lineNumbers.map((num, idx) => (
        <div 
          key={num}
          className={`${styles.lineNumber} ${
            hasErrorOnLine(num) ? styles.hasError : ''
          }`}
        >
          {num}
        </div>
      ))}
    </div>
    
    {/* Existing: Content area (textarea + overlays) */}
    <div className={styles.editorContent} ref={contentRef}>
      {/* Syntax highlighting overlay */}
      <div className={styles.overlay} ref={overlayRef}>
        {/* Existing syntax highlighting - unchanged */}
      </div>
      
      {/* Typeahead overlay */}
      <div className={styles.typeaheadOverlay} ref={typeaheadOverlayRef}>
        {/* Existing typeahead - unchanged */}
      </div>
      
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        spellCheck={false}
      />
      
      {/* Existing: Autocomplete popup */}
      {showAutocomplete && (
        <div className={styles.autocomplete} style={autocompletePosition}>
          {/* Existing autocomplete - unchanged */}
        </div>
      )}
    </div>
  </div>
</div>
```

---

## Implementation Plan

### Phase 1: CSS Preparation (Low Risk)

**Objective:** Add CSS for line numbers and monospace typography without changing JSX.

**Tasks:**
1. Add line number styles to `FormulaEditor.module.css`
2. Update typography to use IBM Plex Mono
3. Add error banner styles
4. Copy relevant BAL Editor CSS patterns

**Files Modified:**
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css`

**CSS Changes:**
```css
/* Add to FormulaEditor.module.css */

/* ========================================
   Typography Update - Monospace
   ======================================== */

.textarea,
.overlay,
.typeaheadOverlay {
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: var(--editor-font-size); /* 14px */
  line-height: var(--editor-line-height); /* 1.6 */
}

/* ========================================
   Error Banner (NEW)
   ======================================== */

.errorBanner {
  padding: var(--cds-spacing-04);
  background: var(--validation-error-bg);
  border-bottom: 1px solid var(--cds-support-error);
  max-height: 150px;
  overflow-y: auto;
}

.errorItem {
  margin-bottom: var(--cds-spacing-03);
  color: var(--text-error);
  font-size: 13px;
}

.errorItem:last-child {
  margin-bottom: 0;
}

/* ========================================
   Editor Container (Modified)
   ======================================== */

.editorContainer {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--background-primary);
}

.editorContainer.focused {
  border-color: var(--border-interactive);
  box-shadow: 0 0 0 2px var(--border-focus);
}

/* ========================================
   Line Numbers Column (NEW)
   ======================================== */

.lineNumbers {
  flex-shrink: 0;
  width: var(--editor-line-number-width); /* 48px */
  background: var(--cds-layer-01);
  border-right: 1px solid var(--border-subtle);
  padding: var(--editor-padding) 0;
  overflow: hidden;
  user-select: none;
}

.lineNumber {
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  font-size: var(--editor-font-size);
  line-height: var(--editor-line-height);
  color: var(--text-secondary);
  text-align: right;
  padding-right: var(--cds-spacing-03);
  min-height: calc(var(--editor-font-size) * var(--editor-line-height));
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.lineNumber.hasError {
  background: var(--validation-error-bg);
  color: var(--cds-support-error);
  font-weight: 600;
  cursor: help;
}

/* ========================================
   Editor Content Area (Modified)
   ======================================== */

.editorContent {
  flex: 1;
  overflow: auto;
  position: relative;
  background: var(--background-primary);
}

/* Remove border from editorWrapper since it's now on editorContainer */
.editorWrapper {
  /* Remove: border, border-radius */
  /* Keep: everything else */
}
```

**Validation:**
- [ ] CSS compiles without errors
- [ ] No visual regressions when line numbers aren't rendered yet
- [ ] Font changes to IBM Plex Mono
- [ ] Font size becomes 14px

**Rollback:** Revert CSS changes.

---

### Phase 2: JSX Structure Update (Medium Risk)

**Objective:** Add line numbers column and error banner to JSX.

**Tasks:**
1. Add state for line numbers array
2. Add error banner conditional rendering
3. Wrap content area with new container structure
4. Add line numbers column

**Files Modified:**
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**JSX Changes:**

```tsx
// Add state for line numbers
const [lineNumbers, setLineNumbers] = useState<number[]>([]);

// Calculate line numbers when value changes
useEffect(() => {
  const lines = value.split('\n').length;
  setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
}, [value]);

// Helper function to check if line has error
const hasErrorOnLine = (lineNum: number): boolean => {
  return validationErrors.some(err => err.line === lineNum);
};

// In render:
return (
  <div className={styles.formulaEditor}>
    {/* Existing header - unchanged */}
    <div className={styles.editorHeader}>
      <label className={styles.editorLabel}>Formula Expression</label>
      {showConvertButton && (
        <button onClick={onConvertToVariable} className={styles.convertButton}>
          <Wand2 size={16} />
          Convert to Variable
        </button>
      )}
    </div>

    {/* NEW: Error banner */}
    {validationErrors.length > 0 && (
      <div className={styles.errorBanner}>
        {validationErrors.map((error, idx) => (
          <div key={idx} className={styles.errorItem}>
            <strong>Line {error.line}:</strong> {error.message}
          </div>
        ))}
      </div>
    )}

    {/* Modified: Container wrapping line numbers + content */}
    <div className={`${styles.editorContainer} ${focused ? styles.focused : ''}`}>
      {/* NEW: Line numbers column */}
      <div className={styles.lineNumbers} ref={lineNumbersRef}>
        {lineNumbers.map((num) => (
          <div
            key={num}
            className={`${styles.lineNumber} ${
              hasErrorOnLine(num) ? styles.hasError : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Existing content area - structure unchanged */}
      <div className={styles.editorContent} ref={editorContentRef}>
        {/* All existing overlays and textarea - unchanged */}
        <div className={styles.overlay} ref={overlayRef}>
          {/* Existing syntax highlighting */}
        </div>
        
        <div className={styles.typeaheadOverlay} ref={typeaheadOverlayRef}>
          {/* Existing typeahead */}
        </div>
        
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          spellCheck={false}
        />
        
        {/* Existing autocomplete */}
        {showAutocomplete && (
          <AutocompletePopup ... />
        )}
      </div>
    </div>
  </div>
);
```

**Validation:**
- [ ] Line numbers appear and count correctly
- [ ] Line numbers scroll with content
- [ ] Error highlighting works on line numbers
- [ ] Error banner appears when validation errors exist
- [ ] **All existing functionality still works**
  - [ ] Autocomplete triggers correctly
  - [ ] Inline typeahead still shows
  - [ ] Syntax highlighting displays
  - [ ] Validation still runs
  - [ ] Keyboard shortcuts work

**Rollback:** Revert JSX changes, keep CSS for future use.

---

### Phase 3: Scroll Synchronization (Medium Risk)

**Objective:** Ensure line numbers scroll perfectly in sync with editor content.

**Tasks:**
1. Add scroll event handler to sync line numbers
2. Ensure overlays scroll with textarea (already exists)
3. Test scroll behavior

**Files Modified:**
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx`

**Code Changes:**

```tsx
// Add ref for line numbers container
const lineNumbersRef = useRef<HTMLDivElement>(null);
const editorContentRef = useRef<HTMLDivElement>(null);

// Existing scroll handler - add line number sync
const handleScroll = useCallback(() => {
  const textarea = textareaRef.current;
  const overlay = overlayRef.current;
  const typeaheadOverlay = typeaheadOverlayRef.current;
  const lineNumbers = lineNumbersRef.current;
  const editorContent = editorContentRef.current;

  if (!textarea || !overlay || !typeaheadOverlay) return;

  // Existing: Sync overlays with textarea
  overlay.scrollTop = textarea.scrollTop;
  overlay.scrollLeft = textarea.scrollLeft;
  typeaheadOverlay.scrollTop = textarea.scrollTop;
  typeaheadOverlay.scrollLeft = textarea.scrollLeft;

  // NEW: Sync line numbers with content
  if (lineNumbers && editorContent) {
    lineNumbers.scrollTop = editorContent.scrollTop;
  }
}, []);

// Attach scroll listener to editorContent instead of textarea
useEffect(() => {
  const editorContent = editorContentRef.current;
  
  if (editorContent) {
    editorContent.addEventListener('scroll', handleScroll);
    return () => {
      editorContent.removeEventListener('scroll', handleScroll);
    };
  }
}, [handleScroll]);
```

**Validation:**
- [ ] Line numbers scroll perfectly in sync with content
- [ ] No jank or lag during scrolling
- [ ] Horizontal scroll doesn't affect line numbers (only vertical)
- [ ] All overlays still sync correctly

**Rollback:** Remove scroll sync logic.

---

### Phase 4: Polish & Edge Cases (Low Risk)

**Objective:** Handle edge cases and polish the implementation.

**Tasks:**
1. Handle empty editor (show line 1)
2. Handle very long files (virtualization not needed initially)
3. Test with autocomplete open
4. Test with inline typeahead active
5. Test with validation errors
6. Test keyboard navigation
7. Test focus states

**Edge Cases to Test:**

1. **Empty Editor:**
   ```
   ┌────────┬─────────────────────────────────┐
   │   1    │ [cursor here]                   │
   └────────┴─────────────────────────────────┘
   ```

2. **Single Line:**
   ```
   ┌────────┬─────────────────────────────────┐
   │   1    │ $result = 100                   │
   └────────┴─────────────────────────────────┘
   ```

3. **With Autocomplete:**
   ```
   ┌────────┬─────────────────────────────────┐
   │   1    │ $base                           │
   │   2    │ ┌─────────────────┐             │
   │   3    │ │ $baseScore      │             │
   │        │ │ $baseCost       │             │
   │        │ └─────────────────┘             │
   └────────┴─────────────────────────────────┘
   ```

4. **With Inline Typeahead:**
   ```
   ┌────────┬─────────────────────────────────┐
   │   1    │ IF <ghost>SEIF</ghost>          │
   └────────┴─────────────────────────────────┘
   ```

5. **With Validation Errors:**
   ```
   ┌──────────────────────────────────────────┐
   │ Line 3: Undefined variable $unknownVar   │
   ├────────┬─────────────────────────────────┤
   │   1    │ $result = 100                   │
   │   2    │ IF $result > 50 THEN            │
   │   3 ⚠  │   $unknownVar = 10              │
   │   4    │ END                             │
   └────────┴─────────────────────────────────┘
   ```

**Validation:**
- [ ] Empty editor shows line 1
- [ ] Line numbers update immediately when typing
- [ ] Autocomplete doesn't break line number alignment
- [ ] Inline typeahead doesn't break line number alignment
- [ ] Error highlighting on line numbers works
- [ ] Focus states work correctly
- [ ] Keyboard shortcuts still work
- [ ] No performance issues with long formulas

**Rollback:** N/A (polish only)

---

## Files Affected

### Modified Files

```
/components/editors/code/FormulaEditor/
  FormulaEditor.tsx              # Add line numbers JSX + scroll sync
  FormulaEditor.module.css       # Add line numbers CSS + monospace typography
```

### No Changes Required

```
/components/editors/code/FormulaEditor/
  FormulaDetailsPanel.tsx        # Unchanged
  ThresholdConfig.tsx            # Unchanged
  ThresholdBadge.tsx             # Unchanged
  hooks/                         # All unchanged
    useFormulaSyntax.ts
    useFormulaValidation.ts
    useFormulaVariables.ts
    useKeyboardShortcuts.ts
    useInlineTypeahead.ts
    useThresholdEvaluation.ts
```

### Reference Files (Copy patterns from)

```
/components/BALEditor/
  BALEditor.tsx                  # Line number rendering logic
  BALEditor.module.css           # Line number styles
```

---

## Risk Assessment

### Low Risk ✅

**Phase 1: CSS Preparation**
- Only CSS changes
- No functional changes
- Easy to revert
- Preview changes without breaking anything

**Phase 4: Polish**
- Only handles edge cases
- No core changes
- Safe improvements

### Medium Risk ⚠️

**Phase 2: JSX Structure Update**
- Adds new JSX elements
- Changes component structure
- Could affect layout

**Mitigation:**
- Thorough testing after implementation
- Keep existing structure intact
- Only wrap, don't modify existing elements
- Test all features comprehensively

**Phase 3: Scroll Synchronization**
- Changes scroll behavior
- Could cause jank if implemented poorly

**Mitigation:**
- Use existing scroll sync pattern from current code
- Test on long formulas
- Use `useCallback` for performance
- Monitor performance during testing

### High Risk ❌

**None** - This is primarily a visual/layout enhancement with minimal functional changes.

---

## Testing Checklist

### Visual Tests

- [ ] Line numbers appear on the left
- [ ] Line numbers have correct width (48px)
- [ ] Line numbers use IBM Plex Mono font
- [ ] Font size is 14px everywhere
- [ ] Line height is 1.6 everywhere
- [ ] Error banner appears when validation fails
- [ ] Error highlighting on line numbers works
- [ ] Layout looks professional and clean

### Functional Tests (Must All Pass)

**Autocomplete:**
- [ ] $ trigger shows variable suggestions
- [ ] # trigger shows attribute suggestions
- [ ] Arrow keys navigate suggestions
- [ ] Enter selects suggestion
- [ ] Escape closes autocomplete
- [ ] Tab accepts suggestion

**Inline Typeahead:**
- [ ] Ghost text appears when typing keywords
- [ ] Tab accepts ghost text
- [ ] Enter accepts ghost text
- [ ] Arrow keys move through suggestions

**Syntax Highlighting:**
- [ ] Variables ($) are highlighted purple
- [ ] Attributes (#) are highlighted blue
- [ ] Keywords (IF, THEN, ELSE, END) are highlighted
- [ ] Operators (+, -, *, /, =, <, >) are highlighted pink
- [ ] Numbers are highlighted purple
- [ ] Strings (if any) are highlighted green

**Validation:**
- [ ] Real-time validation still runs
- [ ] Errors appear in error banner
- [ ] Error line numbers are highlighted
- [ ] Validation errors have correct line numbers

**Keyboard Shortcuts:**
- [ ] Cmd+A selects all
- [ ] Escape closes autocomplete
- [ ] Arrow keys work in autocomplete
- [ ] Tab/Enter work in autocomplete

**Scroll Behavior:**
- [ ] Line numbers scroll with content (vertical only)
- [ ] Syntax overlay scrolls with textarea
- [ ] Typeahead overlay scrolls with textarea
- [ ] No jank or lag during scrolling

**Focus States:**
- [ ] Focus border appears when focused
- [ ] Focus border disappears when blurred
- [ ] Typing works immediately after focus

### Regression Tests

- [ ] Variable table still works
- [ ] Convert to Variable button still works
- [ ] Formula metadata panel still works
- [ ] Threshold configuration still works
- [ ] Auto-save still works
- [ ] Document switching still works
- [ ] Diff mode still works

---

## Success Criteria

### Must Have ✅

1. **Line numbers visible** on the left side of the editor
2. **IBM Plex Mono font** used throughout the editor
3. **14px font size** matching BAL Editor
4. **1.6 line height** matching BAL Editor
5. **Error highlighting** on line numbers when validation fails
6. **Error banner** shows validation errors with line numbers
7. **100% of existing functionality** still works (autocomplete, syntax highlighting, validation, typeahead, keyboard shortcuts)

### Nice to Have 🎯

1. Smooth scroll synchronization (no jank)
2. Hover states on line numbers
3. Click line number to go to line (future enhancement)
4. Line number tooltips showing error details (future enhancement)

### Must Not Have ❌

1. **Any** broken existing functionality
2. Performance regressions
3. Layout shifts or jank
4. Loss of autocomplete behavior
5. Loss of syntax highlighting
6. Loss of validation

---

## Implementation Order

**Recommended sequence:**

1. **Phase 1: CSS Preparation** (30 min)
   - Add CSS for line numbers and monospace
   - Preview in browser (won't show line numbers yet, but font will change)
   - Validate font changes

2. **Phase 2: JSX Structure Update** (60 min)
   - Add line numbers column
   - Add error banner
   - Test thoroughly

3. **Phase 3: Scroll Synchronization** (30 min)
   - Add scroll sync logic
   - Test scrolling behavior

4. **Phase 4: Polish & Edge Cases** (30 min)
   - Handle edge cases
   - Test all features
   - Fix any issues

**Total estimated time:** 2-3 hours

---

## Rollback Strategy

**If something breaks:**

### Phase 1 Rollback
```bash
# Revert CSS changes
git checkout HEAD -- FormulaEditor.module.css
```

### Phase 2 Rollback
```bash
# Revert JSX changes
git checkout HEAD -- FormulaEditor.tsx
# Keep CSS for future use
```

### Phase 3 Rollback
```bash
# Remove scroll sync, keep line numbers
# Manually remove scroll event listeners
```

### Complete Rollback
```bash
# Revert all changes
git checkout HEAD -- FormulaEditor.tsx FormulaEditor.module.css
```

---

## Future Enhancements (Out of Scope)

**Not included in this plan, but could be added later:**

1. **Click line number to select line**
2. **Hover line number to see error details**
3. **Gutter icons** for breakpoints, bookmarks, etc.
4. **Line highlight** on hover
5. **Minimap** for long formulas
6. **Code folding** for IF/ELSE blocks
7. **Multiple cursor** support

---

## Related Documentation

- **BAL Editor README:** `/components/BALEditor/README.md`
- **BAL Editor Implementation:** `/change-log/25-10-23_v01-BALEditorOverhaul.md`
- **Formula Editor Phase 2:** `/change-log/25-10-24_v06-FormulaEditorPhase2-2.md`
- **Guidelines:** `/guidelines/Guidelines.md`
- **Globals CSS:** `/styles/globals.css`

---

## Questions to Address

1. **Should line numbers be selectable?** No - set `user-select: none` to prevent selection.

2. **Should clicking a line number do anything?** Not in this phase - keep it simple.

3. **What about very long formulas (100+ lines)?** Start simple, add virtualization later if needed.

4. **Should we add a gutter for icons?** Not in this phase - just line numbers.

5. **How do we handle error banner with many errors?** Max height of 150px with scroll, same as BAL Editor.

---

**Status:** 📝 Ready for Implementation Discussion
