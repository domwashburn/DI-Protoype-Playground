# RTE & Markdown Editor Foundations Fix

**Date:** October 24, 2025  
**Version:** v23  
**Type:** Foundation Fix  
**Status:** ✅ Complete

---

## Summary

Fixed foundational issues in RTE and Markdown editors before implementing @mention system. Standardized CSS variables, removed buggy contentEditable implementation, and improved code quality. Both editors now have consistent, reliable foundations ready for mention integration.

---

## Changes Implemented

### Phase 1: CSS Variable Standardization ✅

**Changed:** Markdown Editor CSS to use **aliases** instead of direct CDS tokens for consistency.

**Before (Markdown):**
```css
background: var(--cds-background);
padding: var(--cds-spacing-05);
color: var(--cds-text-primary);
```

**After (Markdown):**
```css
background: var(--background-primary);
padding: var(--spacing-05);
color: var(--text-primary);
```

**Now Consistent With:** BAL Editor, Formula Editor, RTE (all use aliases)

**Benefits:**
- Shorter, more readable CSS
- More semantic naming
- Easier to refactor if design system changes
- Consistent across all editors
- Still maps to CDS tokens under the hood via globals.css

---

### Phase 2: Remove Markdown contentEditable "Formatted" Mode ✅

**Problem:**
The "Formatted" mode used `contentEditable` which had several critical issues:
1. **Broken bidirectional sync** - parsed markdown → HTML, but onChange only extracted plain text
2. **Browser inconsistencies** - different behavior across browsers
3. **Unpredictable cursor behavior** - hard to control selection/caret
4. **Lost formatting** - user edits didn't preserve markdown structure
5. **Paste handling issues** - inconsistent paste behavior

**Solution:**
Removed "Formatted" mode entirely and simplified to 3 reliable modes:

**New Mode Structure:**
1. **Plain Text** - Raw markdown editing (textarea)
2. **Split View** - Plain text editor + live preview side-by-side
3. **Preview** - Read-only rendered markdown

**User Benefits:**
- ✅ More predictable editing experience
- ✅ No contentEditable bugs
- ✅ Clear separation: edit in Plain Text, see results in Preview
- ✅ Split View gives best of both worlds
- ✅ Simpler, easier to maintain

**Code Changes:**
- Removed `isEditable` prop from `MarkdownPreview`
- Removed `contentEditable` logic
- Removed `handleInput` function
- Removed `"formatted"` from ViewMode type (now `'plain' | 'split' | 'preview'`)
- Removed unused CSS (`.mdFormattedEditor`, `.mdRaw`, `.mdPreviewEdit`, `contenteditable="true"` styles)
- Updated component documentation with note about why Formatted mode was removed

---

## Files Modified

```
/components/MarkdownEditorNew/
  MarkdownEditorNew.tsx                    # Removed contentEditable, simplified modes
  MarkdownEditorNew.module.css             # Standardized CSS variables, cleanup

/change-log/
  25-10-24_v22-RTE_MarkdownFoundationsPlan.md  # Plan document
  25-10-24_v23-RTE_MarkdownFoundationsFix.md   # This document
  index.md                                      # Updated index
```

---

## Architecture Decisions

### Decision 1: Use CSS Variable Aliases

**Chose:** Aliases (`--background-primary`) over direct CDS tokens (`--cds-background`)

**Rationale:**
- Shorter, more readable
- More semantic
- Consistent with newer components (BAL Editor, Formula Editor)
- Still maps to CDS tokens, just through one level of indirection
- Easier to refactor if design system changes

### Decision 2: Remove contentEditable

**Chose:** Remove "Formatted" mode entirely vs fixing contentEditable

**Alternatives Considered:**
1. **Fix contentEditable** - Would require complex bidirectional sync, still browser-buggy
2. **Block-based editing** (like Notion) - Too complex, not requested, can add later
3. **Remove mode entirely** ✅ - Simplest, most reliable, users have Plain Text + Split View

**Rationale:**
- contentEditable is notoriously buggy across browsers
- Current implementation didn't work properly anyway
- Users have better alternatives (Plain Text, Split View)
- Simpler is better - focus on solid core features
- Can revisit block-based editing later if needed

---

## Testing Notes

**What to test:**
- ✅ Markdown Editor loads in Plain Text mode
- ✅ Switch between Plain Text, Split View, Preview modes
- ✅ Formatting buttons work in Plain Text and Split View
- ✅ Preview renders markdown correctly
- ✅ Split View shows live preview updates
- ✅ No console errors
- ✅ CSS variables render correctly (no missing styles)

**Regression Testing:**
- ✅ RTE still works (no changes made)
- ✅ BAL Editor still works (no changes made)
- ✅ Formula Editor still works (no changes made)

---

## Next Steps

### Phase 3: Add Mention Integration Points 🔜

**RTE:**
- Add @ trigger detection in block inputs
- Add method to insert mention at cursor
- Mention rendering: styled `<span>` with data attributes

**Markdown:**
- Add @ trigger detection in textarea
- Add method to insert mention markdown syntax
- Mention syntax: `[@Name](mention://type/id)`
- Parser recognizes mention links

**Files to modify:**
- `/components/RichTextEditor/RichTextEditor.tsx`
- `/components/MarkdownEditorNew/MarkdownEditorNew.tsx`

**Time estimate:** 45 minutes

### Phase 4: Documentation 🔜

- Update RTE README with mention support
- Update Markdown README with mention support
- Add mention examples to sample data
- Test keyboard navigation
- Test edge cases

**Time estimate:** 30 minutes

---

## Breaking Changes

### Markdown Editor

**Removed:**
- `'formatted'` view mode (use `'split'` instead)
- `isEditable` prop on `MarkdownPreview` component

**Migration:**
If you were using:
```tsx
<MarkdownEditor initialMode="formatted" />
```

Change to:
```tsx
<MarkdownEditor initialMode="split" />
```

Split View provides the same benefits (edit + preview) without contentEditable bugs.

---

## Related Documentation

- **Plan:** `/change-log/25-10-24_v22-RTE_MarkdownFoundationsPlan.md`
- **Guidelines:** `/guidelines/Guidelines.md` (v2.1)
- **CSS Variables:** `/styles/globals.css`

---

## Success Criteria

✅ **Phase 1 Complete:**
- Both editors use consistent CSS variable naming (aliases)
- All styles reference design system tokens
- No hardcoded colors, spacing, or fonts

✅ **Phase 2 Complete:**
- Markdown "Formatted" mode removed
- No contentEditable bugs
- Users can edit and preview markdown reliably via Plain Text + Split View
- Simpler, more maintainable code

---

## Lessons Learned

1. **contentEditable is a trap** - Seems convenient but is notoriously buggy. Avoid unless absolutely necessary.
2. **Simpler is better** - Removing a feature can improve UX if it wasn't working well.
3. **Consistent naming matters** - Mixing CSS variable naming conventions creates confusion. Pick one and stick with it.
4. **Document during development** - Writing the change log helped identify edge cases and validate the approach.

---

## Status

✅ **COMPLETE** - Phases 1 & 2 implemented and tested. Ready for Phase 3 (mention integration points).
