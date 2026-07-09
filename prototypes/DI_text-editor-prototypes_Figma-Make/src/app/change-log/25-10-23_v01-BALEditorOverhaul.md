# BAL Editor Overhaul - Textarea + Overlay Architecture

**Date:** October 23, 2025  
**Version:** v01  
**Type:** Architectural Change

---

## Summary

Implemented a complete architectural overhaul of the BAL (Business Automation Language) Editor, replacing the previous contentEditable approach with a textarea + overlay dual-layer architecture. This resolved critical cursor jumping issues and enabled proper hanging indents for wrapped lines.

---

## Context

### Problem Statement

The original BAL Editor suffered from a critical usability issue: cursor jumping. When users typed or navigated within the editor, the cursor would unexpectedly jump to incorrect positions, making the editor essentially unusable for real work.

**Root Cause:**
- The contentEditable implementation attempted to apply hanging indent styling to wrapped lines
- Browser reconciliation between React's virtual DOM and contentEditable's internal state caused cursor position loss
- No reliable way to preserve cursor position during re-renders with contentEditable

### User Requirements

1. **Hanging Indents**: Wrapped lines must indent to align with the first character after line numbers and block indentation
2. **Stable Cursor**: Cursor must remain in the correct position during typing, navigation, and content changes
3. **Visual Consistency**: Line numbers, syntax highlighting, and indentation must remain visually accurate
4. **Performance**: Editor must handle documents of reasonable size without lag

---

## Implementation Details

### Architectural Pattern: Textarea + Overlay

**Core Concept:**
- **Textarea Layer** (bottom): Invisible textarea handles all user input and cursor management
- **Overlay Layer** (top): Styled div displays formatted content with hanging indents, line numbers, and syntax highlighting
- Perfect synchronization between layers ensures WYSIWYG experience

**Why This Works:**
- Textarea is the browser's native text input mechanism - cursor management is rock-solid
- Overlay provides complete visual control without interfering with input
- No contentEditable complexity or cursor reconciliation issues

### Component Structure

```
/components/BALEditor/
  BALEditor.tsx           # Main component orchestrating the dual-layer system
  BALEditor.module.css    # Co-located styles with hanging indent logic
  README.md               # Component documentation
  index.ts                # Barrel export
```

### Key Technical Decisions

#### 1. Hanging Indent Implementation

**CSS Solution:**
```css
.line {
  display: flex;
  text-indent: -12ch; /* Pull first line back */
  padding-left: calc(12ch + var(--indent-offset)); /* Push content forward */
}
```

**Calculation:**
- Line number width: 4ch (3 digits + space)
- Block indent: 2 spaces per level
- Text indent pulls entire paragraph back
- Padding pushes it forward, creating hanging indent effect

#### 2. Synchronization Strategy

**Textarea Configuration:**
```tsx
<textarea
  value={content}
  onChange={handleChange}
  onScroll={syncScroll}
  onSelect={handleSelect}
/>
```

**Overlay Rendering:**
```tsx
<div className={styles.overlay}>
  {lines.map((line, i) => (
    <div key={i} className={styles.line} style={getLineStyle(line)}>
      <span className={styles.lineNumber}>{i + 1}</span>
      <span className={styles.lineContent}>{formatContent(line)}</span>
    </div>
  ))}
</div>
```

**Synchronization Points:**
- Content changes: Overlay updates to match textarea value
- Scroll events: Overlay scrollTop syncs with textarea scrollTop
- Selection changes: Tracked but rendering is textarea's responsibility

#### 3. Font and Measurement Consistency

**Critical Requirement:**
Both layers must use identical typography:
```css
.textarea, .overlay {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0;
}
```

**Why This Matters:**
- Any mismatch causes overlay and textarea to drift apart
- Character width (`ch` units) must be identical
- Monospace font ensures predictable character widths

#### 4. Pointer Events Management

```css
.textarea {
  position: relative;
  z-index: 1;
  background: transparent;
  color: transparent;
  caret-color: black;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* Overlay doesn't capture clicks */
  z-index: 0;
}
```

---

## Files Changed

### Created
- `/components/BALEditor/BALEditor.tsx` - Main component with dual-layer architecture
- `/components/BALEditor/BALEditor.module.css` - Hanging indent styling and layer coordination
- `/components/BALEditor/README.md` - Component documentation
- `/components/BALEditor/index.ts` - Barrel export

### Modified
- `/App.tsx` - Updated to import from new BALEditor component structure

### Deprecated (Not Deleted)
- `/components/BALEditorContentEditable.tsx` - Previous contentEditable implementation
- `/components/BALEditorOptimized.tsx` - Previous optimization attempt
- `/components/BALEditorSimple.tsx` - Simple fallback version
- `/styles/BALEditorOptimized.module.css` - Styles for deprecated components

---

## Breaking Changes

### Import Path Change

**Before:**
```tsx
import { BALEditor } from './components/BALEditorOptimized';
```

**After:**
```tsx
import { BALEditor } from './components/BALEditor';
```

### Props Interface (No Changes)

The component props remain unchanged, ensuring backward compatibility for any existing usage.

---

## Testing & Validation

### Test Cases Covered

1. **Cursor Stability**
   - ✅ Typing at start of line
   - ✅ Typing at end of line
   - ✅ Typing in middle of line
   - ✅ Backspace/Delete operations
   - ✅ Arrow key navigation
   - ✅ Mouse click positioning

2. **Hanging Indents**
   - ✅ Single-line statements align correctly
   - ✅ Wrapped lines indent to first character position
   - ✅ Nested blocks maintain proper indentation hierarchy
   - ✅ Line numbers remain fixed width

3. **Performance**
   - ✅ Smooth scrolling on 100+ line documents
   - ✅ No lag during rapid typing
   - ✅ Efficient re-render on content changes

4. **Edge Cases**
   - ✅ Empty lines render correctly
   - ✅ Very long lines wrap properly
   - ✅ Copy/paste operations work correctly
   - ✅ Undo/redo maintains cursor position

### Known Limitations

1. **Syntax Highlighting**: Current implementation shows plain text; syntax highlighting can be added as overlay enhancement
2. **IME Support**: International text input methods not yet tested
3. **Mobile Support**: Touch interactions not optimized

---

## Next Steps

### Immediate Enhancements

1. **Syntax Highlighting**
   - Add token-based syntax highlighting to overlay
   - Highlight keywords: GIVEN, WHEN, THEN, AND, OR, etc.
   - Style operators and values appropriately

2. **Tab Support**
   - Implement tab key handling for proper indentation
   - Support shift+tab for de-indenting

3. **Autocomplete**
   - Integrate vocabulary suggestions
   - Show autocomplete dropdown at cursor position

### Future Enhancements

1. **Line Actions**
   - Add line-level drag handles for reordering
   - Implement line selection and bulk operations

2. **Error Highlighting**
   - Real-time syntax validation
   - Visual error indicators in gutter

3. **Code Folding**
   - Collapse/expand GIVEN/WHEN/THEN blocks
   - Improve navigation of large rule sets

4. **Search & Replace**
   - In-editor find functionality
   - Multi-line search and replace

---

## References

### Documentation
- `/components/BALEditor/README.md` - Component usage and API
- `BAL_EDITOR_ARCHITECTURE_ANALYSIS.md` - Detailed architectural analysis
- `BAL_EDITOR_TEST_CASES.md` - Comprehensive test coverage

### Related Components
- `/components/BALAutocomplete.tsx` - Vocabulary autocomplete (to be integrated)
- `/components/BALDictionary.tsx` - Vocabulary reference panel
- `/components/EditorContainer.tsx` - Parent container with tabs

### Design Patterns
- Guidelines.md - Component Development best practices
- Composition over Configuration pattern
- CSS Modules + CSS Variables hybrid styling

---

## Lessons Learned

1. **ContentEditable is Problematic**: Browser implementations are inconsistent and cursor management is unreliable for complex formatting requirements

2. **Native Controls Win**: Using native textarea for input and synthetic rendering for display provides best of both worlds

3. **Typography Precision Matters**: Even small mismatches in font rendering cause cumulative drift between layers

4. **Document Everything**: Clear documentation during implementation helps identify edge cases and refine the API

5. **Architecture Over Patches**: Addressing root cause (contentEditable limitations) rather than patching symptoms (cursor jumping) resulted in more maintainable solution

---

## Contributors

This implementation was completed through AI-assisted development following the patterns established in Guidelines.md v2.0.
