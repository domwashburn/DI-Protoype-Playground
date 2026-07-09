# RTE & Markdown Editor Foundations Plan

**Date:** October 24, 2025  
**Version:** v22  
**Type:** Planning  
**Status:** 📋 Planning

---

## Summary

Before implementing the @mention system across editors, we need to fix the foundational issues in the Rich Text Editor (RTE) and Markdown Editor. These editors are **related** (both text editing experiences that will share mention features) but **separate** (fundamentally different editing paradigms).

---

## Current State Analysis

### ✅ What's Working Well

**Rich Text Editor:**
- Block-based editing paradigm (Notion-style) is solid
- Block types: paragraph, headings, lists, code, quote, callout, checkbox, divider
- Add/delete/reorder blocks works
- Keyboard shortcuts (Enter for new block, Backspace to delete empty block)
- Focus management
- CSS Modules with design system variables (mostly correct)

**Markdown Editor:**
- 4 view modes: Plain Text, Formatted, Split View, Preview
- Toolbar with formatting buttons
- Basic markdown parser (headings, bold, italic, lists, code, links, tables, etc.)
- CSS Modules with design system variables (mostly correct)
- Split view works

### 🐛 Issues to Fix

#### **Issue 1: Inconsistent CSS Variable Usage**

**Problem:**
- RTE uses **aliases**: `--background-primary`, `--border-subtle`, `--spacing-03`
- Markdown uses **direct CDS tokens**: `--cds-background`, `--cds-border-subtle`, `--cds-spacing-03`
- Both are valid (globals.css defines both), but **inconsistency is confusing**

**Decision Needed:**
Which naming system should we standardize on?

**Option A: Use Aliases** (Recommended)
```css
/* ✅ Shorter, more semantic */
background: var(--background-primary);
padding: var(--spacing-05);
border: 1px solid var(--border-subtle);
```

**Option B: Use Direct CDS Tokens**
```css
/* ✅ More explicit Carbon alignment */
background: var(--cds-background);
padding: var(--cds-spacing-05);
border: 1px solid var(--cds-border-subtle);
```

**Recommendation:** **Option A (Aliases)** because:
- Shorter, easier to read
- More semantic (background-primary vs cds-background)
- Easier to refactor if we change design systems
- Already used in most newer components (BAL Editor, Formula Editor)
- Aliases still map to CDS tokens under the hood

**Action:** Standardize Markdown Editor to use aliases like RTE already does.

---

#### **Issue 2: Markdown Editor "Formatted" Mode Issues**

**Problem:**
The "Formatted" mode uses `contentEditable` which has several issues:

1. **Bidirectional sync is broken**: 
   - Component parses markdown → HTML and sets via `dangerouslySetInnerHTML`
   - User edits the HTML via `contentEditable`
   - `onInput` extracts `textContent` (plain text only!)
   - This loses all formatting - not truly bidirectional

2. **contentEditable is notoriously buggy**:
   - Browser inconsistencies
   - Hard to control cursor position
   - Paste handling is unpredictable
   - Can't preserve markdown structure

3. **The current implementation doesn't work properly**:
   ```tsx
   // This just extracts plain text, losing formatting
   const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
     if (isEditable && onChange) {
       const text = e.currentTarget.textContent || '';
       onChange(text); // ❌ Lost all markdown!
     }
   };
   ```

**What the user requested:**
- "Editable preview mode for the Markdown editor"

**What this likely means:**
A mode where you can see the **rendered preview** but click to **edit inline** (similar to Notion or GitHub's issue comments).

**Proposed Solution: Hybrid Edit-in-Place**

Instead of making the entire preview contentEditable:

1. **Preview mode shows rendered markdown** (read-only by default)
2. **Click any element → Switches to inline edit mode for that block**
3. **Edit markdown source** for that specific block
4. **Blur → Re-renders that block** as preview

This is similar to how Notion works - you're editing markdown but seeing the result.

**Architecture:**
```tsx
// Each block can be in "preview" or "edit" mode
<div className="md-block">
  {isEditing ? (
    <textarea value={blockMarkdown} onChange={...} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: rendered }} onClick={() => setEditing(true)} />
  )}
</div>
```

**Alternative (Simpler):**
Keep current 4 modes, but **remove the buggy contentEditable** from "Formatted" mode. Make "Formatted" mode identical to "Preview" mode (read-only rendered view).

- Users can edit in "Plain Text" mode
- Users can see results in "Preview" mode (or "Formatted" mode)
- "Split View" gives both simultaneously

This is simpler and more predictable.

---

#### **Issue 3: Missing Features for Future Mention Support**

**Both editors need:**

1. **Cursor position tracking** ✅ (Already exists in `/utils/cursorPosition.ts`)
2. **Text insertion at cursor** ✅ (RTE has `insertMarkdown`, can adapt)
3. **Autocomplete trigger detection** ✅ (Already exists in `/components/editors/core/hooks/useAutocompleteTriggers.ts`)
4. **Integration points for mention UI** ⚠️ (Need to add)

**What's needed:**
- Both editors need a way to detect `@` trigger
- Both editors need a way to insert mention syntax at cursor
- RTE: Mentions can be inline text in blocks
- Markdown: Mentions can be markdown link syntax `[@John Doe](mention://user/123)`

---

#### **Issue 4: Missing Validation & Error States**

**Both editors lack:**
- Validation feedback
- Error highlighting
- Warning states
- Success states

**This is OK for now** - can add when needed. Not blocking mention system.

---

#### **Issue 5: Accessibility Issues**

**Both editors lack:**
- ARIA labels
- Keyboard navigation documentation
- Screen reader support

**This is OK for now** - can add in polish phase. Not blocking mention system.

---

## Proposed Implementation Plan

### Phase 1: Standardize CSS Variables ✅

**Goal:** Consistent CSS variable usage across both editors

**Tasks:**
1. Update Markdown Editor CSS to use aliases (`--background-primary`) instead of direct CDS tokens (`--cds-background`)
2. Ensure consistency with RTE, BAL Editor, Formula Editor
3. Document the standard in Guidelines.md

**Files to modify:**
- `/components/MarkdownEditorNew/MarkdownEditorNew.module.css`

**Time estimate:** 15 minutes

---

### Phase 2: Fix Markdown "Formatted" Mode 🔄

**Goal:** Make Formatted mode actually useful (or remove it)

**Option A: Remove contentEditable** (Recommended - Simpler)
- Make "Formatted" mode identical to "Preview" mode (read-only)
- Users edit in "Plain Text" or "Split View"
- Simple, predictable, no contentEditable bugs

**Option B: Implement Block-Based Editing**
- Break markdown into blocks (like RTE)
- Each block can toggle between edit/preview
- More complex, more powerful

**Recommendation:** **Option A** for now. If user wants block-based markdown editing, we can revisit in Phase 2B.

**Tasks:**
1. Remove `isEditable` prop from MarkdownPreview
2. Remove contentEditable logic
3. Make "Formatted" mode render-only (same as Preview)
4. Update documentation

**Files to modify:**
- `/components/MarkdownEditorNew/MarkdownEditorNew.tsx`

**Time estimate:** 20 minutes

---

### Phase 3: Add Mention Integration Points 🔧

**Goal:** Prepare both editors for @mention system

**Tasks:**

**RTE:**
1. Add trigger detection (@ key) to block inputs
2. Add method to insert mention at cursor position
3. Add mention rendering (could be styled span or link)
4. Expose mention event handlers via props

**Markdown:**
1. Add trigger detection (@ key) to textarea
2. Add method to insert mention markdown syntax
3. Mention syntax: `[@Name](mention://type/id)`
4. Markdown parser recognizes mention links

**Files to modify:**
- `/components/RichTextEditor/RichTextEditor.tsx`
- `/components/MarkdownEditorNew/MarkdownEditorNew.tsx`

**Time estimate:** 45 minutes

---

### Phase 4: Documentation & Testing 📚

**Goal:** Ensure editors are well-documented and tested

**Tasks:**
1. Update RTE README with mention support
2. Update Markdown README with mention support
3. Add samples showing mention usage
4. Test keyboard navigation
5. Test cursor position edge cases

**Files to create/modify:**
- `/components/RichTextEditor/README.md`
- `/components/MarkdownEditorNew/README.md`
- `/SampleData/richTextSamples.ts`
- `/SampleData/markdownSamples.ts`

**Time estimate:** 30 minutes

---

## Architecture Decisions

### Decision 1: CSS Variable Naming

**Decision:** Use **aliases** (`--background-primary`) instead of direct CDS tokens.

**Rationale:**
- Shorter, more readable
- More semantic
- Easier to refactor
- Consistent with newer components
- Still maps to CDS tokens under the hood

---

### Decision 2: Markdown Formatted Mode

**Decision:** Remove contentEditable, make Formatted mode read-only (same as Preview).

**Rationale:**
- contentEditable is buggy and unpredictable
- Current implementation doesn't preserve markdown
- Users have Plain Text and Split View for editing
- Simpler is better - focus on solid core features
- Can revisit block-based markdown editing later if needed

**Alternative considered:**
- Block-based markdown editing (like Notion)
- Too complex for current phase
- Not requested by user
- Can add later if needed

---

### Decision 3: Mention Syntax in Markdown

**Decision:** Use markdown link syntax for mentions: `[@Name](mention://type/id)`

**Rationale:**
- Standard markdown syntax
- Parseable by existing markdown parsers
- Can be styled in preview
- Doesn't break markdown compatibility
- `mention://` protocol makes it clear it's a mention

**Alternative considered:**
- Custom syntax like `@[Name:id]`
- Would require custom parser
- Breaks markdown compatibility
- Harder to port to other systems

---

### Decision 4: RTE Mention Rendering

**Decision:** Render mentions as styled `<span>` elements with data attributes.

**Rationale:**
- Simple to implement
- Can be styled with CSS
- Data attributes preserve mention metadata
- Works with block-based architecture

```tsx
<span 
  className="mention" 
  data-mention-type="user"
  data-mention-id="123"
>
  @John Doe
</span>
```

**Alternative considered:**
- Render as links `<a href="mention://user/123">@John Doe</a>`
- More semantic
- But blocks are plain text focused
- Links might be confusing in this context

---

## Files Modified

```
/components/MarkdownEditorNew/
  MarkdownEditorNew.tsx                    # Remove contentEditable logic
  MarkdownEditorNew.module.css             # Standardize CSS variables

/components/RichTextEditor/
  RichTextEditor.tsx                       # Add mention integration points
  README.md                                # Document mention support

/components/MarkdownEditorNew/
  README.md                                # Document mention support

/SampleData/
  richTextSamples.ts                       # Add mention examples
  markdownSamples.ts                       # Add mention examples
```

---

## Related Work

### Completed:
- ✅ BAL Editor foundation (v01)
- ✅ Formula Editor foundation (v01-v19)
- ✅ Autocomplete trigger detection (v17 - Phase 1 Mentions)
- ✅ Cursor position utilities (existing)

### Upcoming:
- 📋 Mention detection hook (Phase 3.1.2)
- 📋 Mention autocomplete UI
- 📋 Mention entity data integration
- 📋 Mention navigation (/)

---

## Success Criteria

**Phase 1 Complete:**
- ✅ Both editors use consistent CSS variable naming (aliases)
- ✅ All styles reference design system tokens
- ✅ No hardcoded colors, spacing, or fonts

**Phase 2 Complete:**
- ✅ Markdown "Formatted" mode is functional or removed
- ✅ No contentEditable bugs
- ✅ Users can edit and preview markdown reliably

**Phase 3 Complete:**
- ✅ RTE can detect @ trigger and insert mentions
- ✅ Markdown can detect @ trigger and insert mention links
- ✅ Both editors expose mention event handlers
- ✅ Mention syntax is documented

**Phase 4 Complete:**
- ✅ Both editors have updated READMEs
- ✅ Mention usage examples in sample data
- ✅ Keyboard navigation tested
- ✅ Edge cases handled

---

## Questions for User

Before proceeding with implementation:

1. **CSS Variables:** Agree with standardizing on aliases (`--background-primary`) vs direct CDS tokens (`--cds-background`)?

2. **Markdown Formatted Mode:** Should we:
   - Option A: Remove contentEditable, make it read-only (simpler, recommended)
   - Option B: Implement block-based editing (more complex, more powerful)

3. **Mention Syntax:** Agree with markdown link syntax `[@Name](mention://type/id)` for mentions?

4. **Priority:** Should we fix these foundations now, or proceed with mention system implementation first?

---

## Next Steps

Once user confirms approach:

1. **Phase 1:** CSS variable standardization (15 min)
2. **Phase 2:** Fix Markdown Formatted mode (20 min)
3. **Phase 3:** Add mention integration points (45 min)
4. **Phase 4:** Documentation & testing (30 min)

**Total estimated time:** ~2 hours

After foundations are solid, we can proceed with:
- Phase 3.1.2: Core mention detection hook (`useMentionDetection`)
- Phase 3.2: Mention autocomplete UI
- Phase 3.3: Entity integration
- Phase 3.4: Nested navigation (/)

---

## Status

📋 **Planning** - Awaiting user confirmation on approach before implementation
