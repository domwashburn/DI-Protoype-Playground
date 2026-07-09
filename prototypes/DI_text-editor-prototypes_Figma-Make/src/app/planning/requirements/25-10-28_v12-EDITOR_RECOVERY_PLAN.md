# Editor System Recovery Plan

**Date:** October 28, 2025  
**Type:** Architectural Recovery & Issue Resolution  
**Status:** 📋 Planning Phase  
**Priority:** 🔴 CRITICAL

> **📖 Migration Strategy:** This recovery plan uses the **Strangler Pattern** for safe incremental migration.
> - Full documentation: `/guidelines/Guidelines.md` - Section "Migration Strategy - Strangler Pattern"
> - Quick reference: `/STRANGLER_PATTERN_QUICKREF.md`
> - Implementation guide: `/change-log/25-10-28_v13-StranglerPatternGuidelines.md`

---

## Executive Summary

This document provides a comprehensive assessment of the current editor system state, identifies all known issues and technical debt, and outlines a clear recovery plan to restore stability and align with the original architectural vision **using the Strangler Pattern** for safe incremental migration.

**Current Situation:**
- Formula Editor Phase 2 completed successfully
- **CRITICAL: BAL Editor is now broken (line numbers don't scroll with content)**
- Recent changes have introduced regressions and confusion
- Original architectural plan (v01-EditorArchitectureRefactor.md) appears to have been forgotten
- Multiple issues compounding across BAL Editor, Formula Editor, and shared components
- User experiencing frustration with increasing instability
- **Violated core principle: "BAL Editor remains untouched and fully functional throughout"**
- **Mid-migration state:** Two incompatible architectures coexisting without proper isolation

**Goal:**
- Return to stable, well-architected state
- Apply **Strangler Pattern** for safe incremental migration (see Guidelines.md v2.2)
- Align all editors with original unification plan OR maintain stable dual architecture
- Resolve all identified issues systematically
- Establish clear patterns and prevent future regressions

**Recovery Strategy:**
- Use Strangler Pattern principles: Build alongside, never replace directly
- Strict boundaries between old and new architectures
- Feature flags for risk-free cutover
- Rollback plans at every step
- See: `/guidelines/Guidelines.md` - "Migration Strategy - Strangler Pattern"
- Quick reference: `/STRANGLER_PATTERN_QUICKREF.md`

---

## Table of Contents

1. [Original Architecture Review](#original-architecture-review)
2. [Current State Assessment](#current-state-assessment)
3. [Issue Inventory](#issue-inventory)
4. [Root Cause Analysis](#root-cause-analysis)
5. [Recovery Plan](#recovery-plan)
6. [Implementation Phases](#implementation-phases)
7. [Quality Gates](#quality-gates)
8. [Success Metrics](#success-metrics)

---

## Original Architecture Review

### Core Architectural Principles (From v01)

**From `/change-log/25-10-24_v01-EditorArchitectureRefactor.md`:**

1. **Zero-Regression Approach**
   - Build new architecture alongside existing code
   - Never replace until proven
   - BAL Editor remains untouched and fully functional

2. **Shared Foundation**
   - `/components/editors/core/` - Shared across ALL editors
   - `/components/editors/code/shared/` - Shared across code editors (BAL, Formula, Function)
   - Reusable hooks: `useAutocompleteTriggers`, validation, syntax highlighting
   - Reusable components: `VariableTable`, autocomplete UI

3. **Directory Structure**
   ```
   /components/editors/
     core/                    # Shared across ALL editors
       hooks/
       types/
     code/                    # Code editors (BAL, Formula, Function)
       shared/
         components/
           VariableTable/
         hooks/
       FormulaEditor/
       (Future: FunctionEditor, VariableEditor)
     document/                # Document editors (MD, RTE)
     embedded/                # Embedded editor system
   ```

4. **Composition Over Configuration**
   - Components should compose, not configure
   - Clear separation of concerns
   - Each component has single responsibility

### What Was Successfully Completed (Phase 1 & 2)

✅ **Phase 1: Foundation (Sessions 1.1-1.4)**
- Directory structure created
- Core types defined (`EditorTypes.ts`, `SyntaxTypes.ts`, `ValidationTypes.ts`)
- `useAutocompleteTriggers` hook implemented
- `VariableTable` component implemented

✅ **Phase 2: Formula Editor (Sessions 2.1-2.4)**
- Formula Editor fully functional
- Variable management working
- Autocomplete for $ and # working
- Syntax highlighting implemented
- Real-time validation implemented
- Threshold configuration working
- EditorContainer integration complete
- Auto-save working
- Diff mode working

### What Was NOT Completed

❌ **Phase 1.5: Additional Core Hooks**
- `useEditorState.ts` - Never created
- `useSyntaxHighlight.ts` - Never created (syntax highlighting is editor-specific)
- `useValidation.ts` - Never created (validation is editor-specific)

❌ **Phase 3: Cross-Editor Features**
- Not started (mentions, dictionary, embedded editors)

❌ **Phase 4: BAL Migration (Optional)**
- Not started (BAL remains separate, as intended)

### Deviation from Plan & Current Migration State

**CRITICAL CONTEXT: We Are Mid-Migration**

The codebase is currently in a **partial migration state** from old editor structure to new unified architecture:

**Old Structure (Still in place):**
- `/components/BALEditor/` - BAL Editor (supposed to be untouched)
- `/components/MarkdownEditorNew/` - Markdown Editor
- `/components/RichTextEditor/` - Rich Text Editor

**New Structure (Partially implemented):**
- `/components/editors/core/` - Shared foundation (Phase 1 complete)
- `/components/editors/code/FormulaEditor/` - Formula Editor (Phase 2 complete)
- `/components/editors/code/shared/` - Shared code editor components (barely started)

**The Problem:**
We're stuck between two architectures. During the unification attempt, something changed in BAL Editor (which was supposed to remain completely untouched). This violates the core "zero regression" principle.

**Where We Went Wrong:**

1. **Touched BAL Editor During Unification**
   - BAL Editor was supposed to stay in `/components/BALEditor/` untouched
   - Something modified it and broke scroll synchronization
   - Original plan explicitly said "BAL remains separate, as intended" (Phase 4 optional)
   - We broke the golden rule: **Never touch working code during migration**

2. **Forgot the Shared Foundation Principle**
   - Each editor implemented its own syntax highlighting instead of using shared hook
   - Validation logic duplicated instead of using shared framework
   - Line number rendering duplicated instead of using shared component

3. **No Clear Separation Between Shared and Specific**
   - `useFormulaSyntax.ts` exists in FormulaEditor, but similar logic needed for BAL
   - No `useCodeSyntax.ts` in `/code/shared/` that both could use
   - Old editors (BAL, MD, RTE) still use old patterns
   - New editor (Formula) uses new patterns
   - No bridge between them

4. **Incremental Changes Without Architecture Review**
   - Small fixes and features added without checking alignment with original plan
   - No validation against architectural principles before making changes
   - Tried to "unify" without completing shared foundation first

5. **Missing Phase 1.5**
   - Should have completed shared hooks before building Formula Editor
   - Would have prevented duplication and misalignment
   - Now we have two incompatible patterns in the codebase

**The Migration Problem:**
We have 4 editors in 2 different architectural patterns:
- **Old Pattern:** BAL (broken), Markdown, Rich Text - still using original architecture
- **New Pattern:** Formula - using unified architecture from `/components/editors/`
- **No clear migration path** for old editors to new architecture
- **No isolation** - changes to "unify" are affecting old editors

---

## Current State Assessment

### Broken Components (Critical Fixes Needed)

🔴 **BAL Editor** (`/components/BALEditor/`) - **REGRESSION**
- **BROKEN:** Line numbers don't scroll with content
- Was fully functional before recent changes
- Syntax highlighting: Unknown status
- Autocomplete: Unknown status
- **VIOLATED:** "BAL Editor remains untouched" principle
- **PRIORITY:** Fix immediately - this was a working reference implementation

✅ **Formula Editor Core Features**
- Variable table CRUD
- Autocomplete for variables and attributes
- Threshold configuration
- Test panel
- EditorContainer integration
- Auto-save

### Problematic Components (Need Review)

⚠️ **Formula Editor Syntax Highlighting**
- **Issue:** Overlay rendering broken (keywords not highlighting)
- **Cause:** Missing CSS class `overlayContent`, direct `dangerouslySetInnerHTML` usage
- **Impact:** Users can't see syntax highlighting for keywords like "THEN", "IF", etc.

⚠️ **Formula Editor Validation**
- **Issue:** Showing false errors for partial variable names
- **Example:** Typing "$ord" shows error even though "$orderTotal" exists
- **Cause:** Validation doesn't check for prefix matches during typing
- **Impact:** Confusing error messages while user is still typing

⚠️ **Line Number Rendering**
- **Issue:** Line numbers not adjusting height for wrapped lines
- **Requirement:** "If a line wraps, the line number for that line should adjust in height to account for the wrap without adding a new line number"
- **Current Behavior:** Unknown - needs verification
- **Impact:** Misaligned line numbers with wrapped content

⚠️ **Ghost Value Formatting (From TD-001)**
- **Issue:** Bugs in ghost value formatting prevented datetime function implementation
- **Status:** Blocking future work
- **Priority:** High

### Code Quality Issues

🔴 **Duplication Across Editors**
- Syntax highlighting logic exists in both BAL and Formula editors
- Validation logic duplicated
- Line number rendering duplicated
- No shared base for code editors

🔴 **Architectural Drift**
- Original plan called for shared hooks in `/code/shared/`
- Current state has editor-specific hooks with duplicated logic
- No clear pattern for what should be shared vs. specific

🔴 **CSS Module Inconsistencies**
- Some components use non-existent CSS classes
- Overlay components don't follow consistent pattern between BAL and Formula

---

## Issue Inventory

### CRITICAL Issues (Must Fix Immediately)

#### CRIT-000: BAL Editor Line Numbers Not Scrolling ⚠️ REGRESSION
**Severity:** CRITICAL  
**Component:** BALEditor.tsx line number scrolling  
**User Impact:** Line numbers don't scroll with content - editor is broken

**Evidence:**
- User report: "The BAL editor is not perfect anymore, you've introduced bugs there too... key one being the line numbers not scrolling but the content does"

**Root Cause:**
- Unknown - BAL Editor was supposed to be completely untouched
- Violates core "zero regression" architectural principle
- Something changed that broke scroll synchronization

**Technical Details:**
- Location: `/components/BALEditor/BALEditor.tsx` and `BALEditor.module.css`
- Line numbers should scroll in sync with textarea content
- Currently line numbers are static while content scrolls

**Investigation Needed:**
1. What changed in BAL Editor recently?
2. Is this a CSS issue (overflow, positioning)?
3. Is this a JavaScript issue (scroll event handlers)?
4. When did this break (review recent change logs)?

**Acceptance Criteria:**
- [ ] Line numbers scroll perfectly in sync with textarea content
- [ ] Both vertical and horizontal scroll work correctly
- [ ] No visual lag or misalignment
- [ ] Works exactly as it did before any recent changes

**Priority:** HIGHEST - This is a regression in a component that was supposed to be untouched

---

#### CRIT-001: Formula Editor Syntax Highlighting Edge Cases ✅ FIXED
**Severity:** Critical  
**Component:** FormulaEditor.module.css overlay text color  
**User Impact:** Edge cases (mistyped functions, unknown keywords) were invisible

**Status:** ✅ RESOLVED (v15-FormulaSyntaxFallbackFix.md)

**Root Cause:**
- `.overlayContent` had `color: transparent`
- Only text wrapped in syntax `<span>` elements would be visible
- Unmatched text (typos, unknown keywords) inherited transparent color and became invisible

**Solution:**
- Changed `.overlayContent` to `color: var(--text-primary)`
- Now all text is visible with default color
- Syntax spans override with specific highlighting colors
- Matches BAL Editor pattern (which already had `color: var(--cds-text-primary)`)

**Fix Location:**
- `/components/editors/code/FormulaEditor/FormulaEditor.module.css` line 216

**Acceptance Criteria:**
- [x] Keywords (IF, THEN, ELSE, ELSIF, END, RETURN) highlight in blue
- [x] Variables ($var) highlight in purple
- [x] Attributes (#attr) highlight in blue
- [x] Operators highlight in pink
- [x] Numbers highlight correctly
- [x] Strings highlight in green
- [x] Edge cases (typos, unknown text) visible in default color
- [x] No transparent or white text

#### CRIT-002: Formula Editor Undefined Variable Highlighting ✅ COMPLETE
**Severity:** Critical  
**Component:** useFormulaSyntax.ts, useFormulaValidation.ts, FormulaEditor.tsx, ErrorWarningList.tsx  
**User Impact:** Undefined variables now show comprehensive error indicators

**Status:** ✅ COMPLETE (October 29, 2025)

**User Report:** "when I type an undefined variable, the text highlight doesn't change (red) and the row doesn't highlight with an error row highlight (with the error icon beside the row number)"

**Root Cause:**
- Syntax highlighting had **incorrect prefix matching** logic
- `$ord` (undefined) was shown as purple because it's a prefix of `$orderTotal`
- Should show red with wavy underline for ANY undefined variable

**Solution Implemented:**
- ✅ Removed prefix matching from syntax highlighting (useFormulaSyntax.ts)
- ✅ Simplified to exact match only
- ✅ Undefined variables now get `formula-variable-undefined` CSS class (red + wavy underline)
- ✅ Validation properly flags undefined variables

**What's Fixed:**
- [x] Text highlight changes to red for undefined variables
- [x] Wavy underline appears under undefined variables
- [x] Validation banner shows "Undefined variable" errors

**What's Still Missing:**
- [ ] Error row background highlight (light red background for error lines)
- [ ] Error icon beside line number in gutter
- [ ] Click error icon to jump to error
- [ ] Hover error icon to see error message

**Next Steps for Full Fix:**
1. Implement error row highlighting (similar to debug/warning highlights)
2. Add error icons in line number gutter
3. Wire up validation results to create ErrorHighlight objects
4. Render error indicators similar to existing debug/warning system

**Technical Details:**
- Validation in `useFormulaValidation.ts` line 190-206
- Pattern: `/\$([a-zA-Z_][a-zA-Z0-9_]*)/g`
- Check: `!variableNameSet.has(varName)`
- Syntax highlighter has prefix-checking logic, validator may not

**Test Cases Needed:**
1. Type "$o" → Should not error (prefix of "$orderTotal")
2. Type "$or" → Should not error (prefix of "$orderTotal")
3. Type "$ord" → Should not error (prefix of "$orderTotal")
4. Type "$orde" → Should not error (prefix of "$orderTotal")
5. Type "$orderTotal" → Should not error (exact match)
6. Type "$xyz" → SHOULD error (no match, not a prefix)
7. Type "$orderTota" → SHOULD error (typo, not a valid prefix)

**Acceptance Criteria:**
- [x] Typing partial variable name doesn't show error if it's a prefix of existing variable ✅
- [x] Completing variable name removes any previous error ✅
- [x] Typos (non-prefix partials) still show errors ✅
- [x] Validation and syntax highlighting use same logic ✅
- [x] Error/warning gutter icons displayed ✅
- [x] Line number styling for error/warning lines ✅
- [x] ErrorWarningList component with click-to-scroll ✅
- [x] Tooltips on gutter icons ✅

**Resolution:**
✅ **COMPLETE** - See [25-10-29_v01-CRIT002-Verification.md](./25-10-29_v01-CRIT002-Verification.md) for full implementation details.

**Known Cosmetic Issue:**
Row highlight background colors may be too subtle. See TD-003 in [25-10-28_v11-TechnicalDebt.md](./25-10-28_v11-TechnicalDebt.md). Deferred to future polish phase - current implementation provides sufficient visual feedback via gutter icons, bold line numbers, and ErrorWarningList component.

#### CRIT-003: Line Number Height Not Adjusting for Wrapped Lines
**Severity:** High  
**Component:** BAL Editor and Formula Editor line number rendering  
**User Impact:** Line numbers misaligned with wrapped content

**Evidence:**
- User requirement (repeated multiple times): "I DO NOT WANT hanging indents for ANY editor"
- "I want ALL lines to wrap at their tab level"
- "If a line starts with 2 spaces, wrapped text continues at column 2"
- "As lines wrap, the line number for that line should adjust in height to account for the wrap without adding a new line number"

**Current Behavior:**
- Unknown - needs testing
- BAL Editor: May have hanging indent behavior
- Formula Editor: May have hanging indent behavior

**Expected Behavior:**
```
Line Number | Content
──────────────────────────────────────────
     1      | $result = 100 + 200 +
            |   300 + 400
            | ↑ Line 1 number cell expands to match wrapped height
     2      | IF $result > 500 THEN
```

**Technical Details:**
- Line numbers in `.balLineNumbers` / `.formulaLineNumbers`
- Content in textarea with `white-space: pre-wrap` and `word-wrap: break-word`
- Line number divs need to match content line heights
- May need JavaScript to calculate wrapped line heights
- Or may need CSS Grid row spanning solution

**Acceptance Criteria:**
- [ ] No hanging indents in any editor
- [ ] Wrapped lines continue at their indentation level (not further indented)
- [ ] Line number cell height matches wrapped content height
- [ ] No extra line numbers added for wrapped portions
- [ ] Scrolling keeps line numbers aligned with content

### HIGH Priority Issues

#### HIGH-001: Ghost Value Formatting Bugs (From TD-001)
**Severity:** High  
**Component:** GhostValue.tsx  
**User Impact:** Blocks datetime function implementation

**See:** `/change-log/25-10-28_v11-TechnicalDebt.md` TD-001

**Summary:**
- Ghost value component has formatting bugs
- Prevented implementation of TIME_TO_SECONDS, DATE_ADD, WEEKDAY, etc.
- Functions were working but ghost value display broke
- Required rollback of all datetime utilities

**Acceptance Criteria:**
- [ ] GhostValue handles all types: number, string, boolean, date, time
- [ ] Type-safe formatting with proper type guards
- [ ] Edge cases handled: null, undefined, error states
- [ ] CSS layout works with all value types
- [ ] No visual regressions in debugger

### MEDIUM Priority Issues

#### MED-001: Architecture Drift - Mid-Migration Chaos
**Severity:** HIGH (upgraded from Medium)  
**Component:** Overall architecture - Dual architecture state  
**User Impact:** Maintenance burden, inconsistencies, regressions

**Description:**
We have **two incompatible editor architectures** coexisting:

**Old Architecture (Untouched, Working - except BAL now broken):**
- `/components/BALEditor/` - Original BAL implementation
- `/components/MarkdownEditorNew/` - Original Markdown implementation  
- `/components/RichTextEditor/` - Original Rich Text implementation
- Pattern: Component-specific, self-contained, no shared infrastructure

**New Architecture (Partially implemented):**
- `/components/editors/core/` - Shared foundation (Phase 1 complete)
- `/components/editors/code/FormulaEditor/` - New Formula Editor (Phase 2 complete)
- `/components/editors/code/shared/` - Shared code editor hooks (mostly empty)
- Pattern: Unified, shared hooks, composable components

**The Problem:**
1. **BAL Editor was modified** during "unification" attempt (broke scroll sync)
2. **No migration path** for old editors to new architecture
3. **Duplicated code** - Formula Editor reimplements what BAL already has
4. **Two patterns to maintain** - changes must account for both architectures
5. **Confusion about which pattern to use** for new features

**What Should Be Shared (New Architecture):**
- Line number rendering logic + scroll synchronization
- Syntax highlighting framework (with editor-specific rules)
- Validation framework (with editor-specific rules)
- Autocomplete positioning and keyboard nav (already shared via `useAutocompleteTriggers`)
- Overlay scrolling sync logic
- Common editor controls (copy, paste, undo/redo)

**What Should Be Editor-Specific:**
- Syntax highlighting RULES (which tokens, which colors)
- Validation RULES (what to validate, error messages)
- Editor-specific features (threshold config for Formula, vocabulary for BAL)
- Editor-specific UI (test panel, threshold config, etc.)

**Current State Reality Check:**
```
Old Architecture           New Architecture
-----------------         ------------------
BAL Editor (BROKEN)  -->  Should migrate to /editors/code/BALEditor
                          But WAIT until new architecture is stable
                          
Markdown Editor      -->  Should migrate to /editors/document/MarkdownEditor
                          Not planned yet
                          
Rich Text Editor     -->  Should migrate to /editors/document/RichTextEditor
                          Not planned yet
                          
Formula Editor             ✓ Already in /editors/code/FormulaEditor
```

**The Migration Must Be:**
1. **Sequential** - One editor at a time
2. **Validated** - Each migration must not break anything
3. **Complete** - Finish shared foundation FIRST before migrating
4. **Optional** - Old editors can stay old if new architecture isn't proven

**Current Problem:**
We tried to unify WITHOUT completing the shared foundation, and WITHOUT migrating editors properly. Result: BAL Editor touched and broken, no clear path forward.

**Acceptance Criteria:**
- [ ] Decide: Continue with dual architecture OR complete migration?
- [ ] If continuing migration: Complete `/code/shared/hooks/` foundation
- [ ] If continuing migration: Create migration checklist for each editor
- [ ] If stopping migration: Restore BAL Editor, document both patterns
- [ ] Clear documentation: Which pattern for which editor type
- [ ] No cross-contamination: Old editors stay old, new editors stay new
- [ ] **NEVER touch old editors during migration until ready to migrate them**

#### MED-002: Inconsistent Overlay Rendering Pattern
**Severity:** Medium  
**Component:** BAL Editor vs. Formula Editor  
**User Impact:** Maintenance confusion

**Description:**
- BAL Editor uses `useEffect` + `highlightRef.current.innerHTML = ...`
- Formula Editor tries to use `dangerouslySetInnerHTML` in JSX
- Should follow same pattern for consistency

**Acceptance Criteria:**
- [ ] Both editors use same overlay pattern
- [ ] Pattern documented and reusable
- [ ] New editors can follow clear example

### LOW Priority Issues

#### LOW-001: Missing Phase 1.5 Shared Hooks
**Severity:** Low  
**Component:** Core architecture  
**User Impact:** None (works without them, just less clean)

**Description:**
- Original plan included `useEditorState`, `useSyntaxHighlight`, `useValidation`
- These were never created
- Current editor-specific hooks work but aren't shared

**Decision:**
- Can be addressed as part of MED-001 (Architecture Drift)
- Not blocking functionality
- Would improve maintainability

---

## Root Cause Analysis

### Why Did This Happen?

**ROOT CAUSE: Attempted Unification Without Completing Foundation**

The fundamental mistake was trying to "unify" editors before the shared foundation was complete and proven. This violated the original plan's core principle: "Build new architecture alongside existing code. Never replace until proven."

**Specific Failures:**

**1. Touched BAL Editor During Migration (CRITICAL)**
- **What happened:** BAL Editor was modified during "unification" attempt
- **Result:** Broke scroll synchronization (line numbers don't scroll with content)
- **Original plan:** "BAL Editor remains untouched and fully functional throughout"
- **Why it's critical:** BAL was the working reference implementation
- **Lesson:** Never touch working code during migration period

**2. Phase 1.5 Was Never Completed**
- Original plan had Phase 1.5: Additional Core Hooks
- This was skipped and went straight to Phase 2 (Formula Editor)
- Without shared foundation, Formula Editor built its own implementations
- Result: Two different patterns for same functionality
- Lesson: Don't skip foundational steps

**3. Confused "Unify" with "Migrate"**
- **Unify:** Create shared components that work for multiple editors
- **Migrate:** Move existing editors to use shared components
- **What happened:** Tried to do both simultaneously
- **Result:** Broke existing editors while building new ones
- **Lesson:** Unify first (build shared foundation), migrate second (move editors over)

**4. No Isolation Between Old and New**
- Old editors (BAL, MD, RTE) and new editors (Formula) should be completely separate
- No code changes should affect both
- Something crossed the boundary and broke BAL
- Lesson: Strict isolation during migration, use feature flags or separate directories

**5. Architectural Principles Not Referenced During Development**
- Original plan document exists but wasn't consulted during incremental changes
- Small fixes and features added without checking alignment
- "Just make it work" approach instead of "make it work following the architecture"
- Lesson: Review architectural plan before every session

**6. No Validation Gates Between Sessions**
- Changes made without reviewing against architectural principles
- No checklist of "does this follow the plan?"
- No rollback plan when deviations detected
- No testing of "untouched" components to verify they're still untouched
- Lesson: Validate after every change

**7. Complexity Fatigue**
- Complex work (evaluation engine, debugger, type system) completed successfully
- Fatigue set in, attention to architectural details decreased
- "Quick fixes" introduced technical debt
- Lesson: Take breaks, refactor regularly, maintain quality standards

**8. Incremental Changes Without Refactoring**
- Each new feature added without refactoring to shared foundation
- "Works for now" became "accumulated debt"
- No dedicated refactoring sessions
- Lesson: Regular refactoring is not optional
- No dedicated refactoring sessions

### How to Prevent This in the Future

**1. Architecture Review Before Every Session**
- Start each session by reviewing relevant architectural docs
- Check: "Does this change align with the plan?"
- Reference original design documents

**2. Complete Phases in Order**
- Don't skip steps (like Phase 1.5)
- If a phase is deemed unnecessary, document WHY and update plan
- Don't proceed to next phase until current phase is complete

**3. Validation Gates**
- After each significant change, validate against principles
- Use checklists from original plan
- Document any deviations with justification

**4. Regular Refactoring Sessions**
- Every 5-10 feature sessions, do a refactoring session
- Look for duplication, drift, technical debt
- Realign with architecture

**5. Better Session Handoffs**
- Each session should end with state summary
- Next session should start with state review
- Include "architectural alignment check" in handoff

---

## Recovery Plan

### Guiding Principles for Recovery

1. **Stop Digging**
   - No more "quick fixes"
   - No more changes without architectural review
   - No more deviations from plan
   - **ABSOLUTE RULE: Do not touch BAL, Markdown, or Rich Text editors during recovery**

2. **Assess Before Acting**
   - Test and verify current behavior
   - Document actual vs. expected behavior
   - Understand root causes before fixing
   - **Find out WHAT changed in BAL Editor and WHY**

3. **Fix in Phases**
   - Critical issues first (BAL scroll sync)
   - High priority second (Formula Editor issues)
   - Medium/Low as time permits

4. **Test After Each Fix**
   - Validate fix works
   - Ensure no regressions
   - **Test ALL editors after every change, not just the one you're fixing**
   - Document what was fixed

5. **Strict Isolation**
   - Old architecture editors: `/components/BALEditor/`, `/components/MarkdownEditorNew/`, `/components/RichTextEditor/`
   - New architecture editors: `/components/editors/code/FormulaEditor/`
   - **No changes should affect both groups**
   - Any shared code must be in `/components/editors/core/` or `/components/editors/code/shared/`

6. **Make a Decision on Migration**
   - **Option A:** Stop migration, maintain dual architecture, restore BAL
   - **Option B:** Complete shared foundation first, then migrate BAL properly
   - **Cannot continue half-migrated state**
   - Must decide before Phase R4

7. **Align with Architecture**
   - Every fix should move closer to original plan
   - Don't create new deviations to fix old ones
   - If continuing migration: Refactor toward shared foundation
   - If stopping migration: Accept dual architecture and document patterns

### Recovery Phases

#### Phase R1: Assessment & Stabilization (Session 1) ✅ COMPLETE
**Goal:** Understand exact current state and fix critical breaking issues

**Tasks:**
1. Test and document current behavior for all known issues
2. **Fix CRIT-000 (BAL Editor line number scrolling) - HIGHEST PRIORITY** ✅
3. Fix CRIT-001 (Formula Editor syntax highlighting overlay)
4. Verify CRIT-002 (Validation - may already be working correctly)
5. Test CRIT-003 (Line number wrapping)

**Deliverables:**
- [x] **CRIT-000 fixed and validated (BAL + Formula Editor scroll sync restored)** ✅
  - See: `/change-log/25-10-28_v14-BALEditorScrollSyncFix.md`
  - Fixed both editors: Line numbers now sync to textarea instead of container
  - Fixed scrollbar placement: Scrollbar now on editor content, not line numbers
  - Strangler pattern applied: Minimal change, no architecture modification
- [x] **CRIT-001 fixed and validated (Formula Editor syntax highlighting)** ✅
  - See: `/change-log/25-10-28_v15-FormulaSyntaxFallbackFix.md`
  - Fixed overlay to use default text color for edge cases
- [x] **CRIT-002 fixed and validated (Variable validation with error indicators)** ✅
  - See: `/change-log/25-10-29_v01-CRIT002-Verification.md`
  - Error/warning gutter icons, line number styling, ErrorWarningList component
  - All acceptance criteria met
- [x] **CRIT-003 fixed and validated (Line number wrapping and height adjustment)** ✅
  - See: `/change-log/25-10-28_v20-LineNumberScrollSyncFix.md`
  - Line numbers adjust height for wrapped content

**Validation:**
- [x] **BAL Editor fully restored to working state** ✅
- [x] No regressions in BAL Editor functionality ✅
- [x] Strangler pattern compliance verified ✅
- [x] **All critical issues resolved** ✅

**Status:** ✅ **Phase R1 COMPLETE** - All Critical Issues Resolved
**Next:** Phase R3 - Ghost Value Fixes (TD-001)

#### Phase R2: Line Number Fixes (Session 2)
**Goal:** Ensure line numbers work correctly for wrapped content

**IMPORTANT:** Apply fixes to Formula Editor ONLY. Do not touch BAL Editor unless absolutely necessary for consistency.

**Tasks:**
1. Implement line number height adjustment for wrapped lines in **Formula Editor**
2. Test with various content lengths and indentation levels
3. Verify scrolling keeps alignment
4. **Only touch BAL if user explicitly requests it and if it's safe**

**Deliverables:**
- [ ] Line numbers adjust height for wrapped content
- [ ] No hanging indents
- [ ] Wrapped text continues at indentation level
- [ ] Scrolling maintains alignment
- [ ] **BAL Editor not touched unless explicitly requested**

**Validation:**
- [ ] Manual testing with wrap scenarios
- [ ] Both editors (if applicable) have same behavior
- [ ] No visual regressions

#### Phase R3: Ghost Value Fixes (Session 3)
**Goal:** Fix ghost value formatting to unblock datetime functions

**Tasks:**
1. Review GhostValue.tsx current implementation
2. Add type-safe formatting with guards
3. Test with all value types
4. Fix CSS layout issues
5. Re-enable datetime function implementation

**Deliverables:**
- [ ] GhostValue handles all types correctly
- [ ] Type-safe formatting implemented
- [ ] Edge cases handled
- [ ] Ready for datetime functions

**Validation:**
- [ ] Test with number, string, boolean, date, time values
- [ ] Test with null, undefined, errors
- [ ] No visual layout issues
- [ ] Ready for TD-002 implementation

#### Phase R4: Architecture Decision & Realignment (Sessions 4-5)
**Goal:** Make migration decision and implement appropriate architecture

**CRITICAL DECISION POINT:** Before starting this phase, must decide:

> **📊 Decision Framework:** Use `/MIGRATION_DECISION.md` to guide this decision.
> - Evaluates Option A (Dual Architecture) vs Option B (Unified Architecture)
> - Provides criteria, tradeoffs, and recommendation
> - Recommended: Start with Option A, revisit in 2-4 weeks

**Option A: Stop Migration - Dual Architecture**
- Accept that BAL, Markdown, Rich Text use old architecture
- Accept that Formula (and future Function/Variable editors) use new architecture
- Document both patterns clearly
- Create clear boundaries: no cross-contamination
- Pros: Lower risk, less work, both patterns stable
- Cons: Duplication, two patterns to maintain

**Option B: Complete Migration - Unified Architecture**
- Complete `/code/shared/` foundation (Phase 1.5 retroactively)
- Migrate Formula Editor to use shared hooks (prove it works)
- Then migrate BAL Editor properly (one-time migration)
- Pros: Single pattern, less duplication long-term
- Cons: Higher risk, more work, potential for more breakage

**If Option A (Stop Migration):**

**Tasks:**
1. Document dual architecture pattern
2. Create "Old Architecture" maintenance guide
3. Create "New Architecture" development guide
4. Establish clear rules: when to use which pattern
5. Update Guidelines.md with dual architecture guidance

**Deliverables:**
- [ ] Dual Architecture Documentation
- [ ] Clear boundaries and rules
- [ ] Both patterns documented and stable
- [ ] No future cross-contamination

**If Option B (Complete Migration):**

**Tasks:**
1. **Session 4.1:** Create `/code/shared/hooks/useCodeSyntax.ts` - Shared syntax highlighting
2. **Session 4.2:** Create `/code/shared/hooks/useCodeValidation.ts` - Shared validation
3. **Session 4.3:** Create `/code/shared/hooks/useLineNumbers.ts` - Shared line numbers
4. **Session 4.4:** Refactor Formula Editor to use shared hooks (prove it works)
5. **Session 4.5:** Document migration checklist for BAL Editor (do NOT migrate yet)

**Deliverables:**
- [ ] Complete shared foundation in `/code/shared/`
- [ ] Formula Editor using shared hooks (validated working)
- [ ] BAL Editor migration checklist (for future session)
- [ ] Clear shared vs. specific patterns
- [ ] Documentation updated

**Validation:**
- [ ] Formula Editor works exactly as before with shared hooks
- [ ] BAL Editor still untouched and working
- [ ] No duplicated code in new architecture
- [ ] Clear pattern for future editors
- [ ] Ready to migrate BAL (but don't do it yet without explicit user approval)

#### Phase R5: Documentation & Quality Gates (Session 6)
**Goal:** Prevent future drift with documentation and processes

**Tasks:**
1. Update architectural documentation
2. Create "Editor Development Checklist"
3. Document overlay pattern
4. Document shared vs. specific guidelines
5. Create visual architecture diagram
6. Update Guidelines.md if needed

**Deliverables:**
- [ ] Updated architecture docs
- [ ] Editor Development Checklist
- [ ] Shared vs. Specific guidelines
- [ ] Visual diagrams
- [ ] Process to prevent future drift

**Validation:**
- [ ] Documentation is clear and actionable
- [ ] Future developers can follow patterns
- [ ] Checklists prevent drift

---

## Implementation Phases (Detailed)

### Phase R1: Assessment & Stabilization

#### Session R1.0: BAL Editor Scroll Investigation (PRIORITY #1)

**Pre-Work (No Code Changes):**

**CRITICAL: Test BAL Editor scroll synchronization**
1. Open BAL Editor
2. Type enough content to require vertical scrolling
3. Scroll the content area
4. Observe: Do line numbers scroll with content?
5. Current behavior: Line numbers stay static, content scrolls (BROKEN)
6. Expected behavior: Line numbers and content scroll together
7. Screenshot the broken behavior

**Investigation:**
1. Review `/components/BALEditor/BALEditor.tsx`
   - Look for scroll event handlers
   - Check if anything changed recently
   - Compare to last known working version from git history
2. Review `/components/BALEditor/BALEditor.module.css`
   - Check overflow properties
   - Check positioning (absolute, fixed, sticky?)
   - Compare to last known working version
3. Review recent change logs (CRITICAL)
   - Search for "BAL" in change logs
   - Search for "unified" or "editor" in change logs
   - What sessions might have touched BAL Editor?
   - Were any "global" CSS changes made?
   - Check `/styles/globals.css` for changes
4. Check for shared components accidentally used
   - Did BAL start importing from `/components/editors/`?
   - Are there any new imports that could cause issues?
5. Check EditorContainer integration
   - Did EditorContainer change in a way that affects BAL?
   - Are there new wrapper divs or CSS classes?

**Root Cause Hypothesis:**
- **Most Likely:** CSS change in globals.css or EditorContainer affecting scroll container hierarchy
- Removed scroll event handler during "unification" attempt
- Changed positioning of line numbers (absolute → fixed?)
- Added wrapper div that breaks scroll sync
- Imported shared CSS that conflicts
- Z-index or overflow changes

**Deliverable:** 
```markdown
# BAL Editor Scroll Sync Investigation

## Current Behavior
- [Screenshot showing line numbers not scrolling]
- Line numbers: [static/fixed position]
- Content: [scrolls independently]

## Technical Analysis
- Last modified: [Date from git/change-log]
- Scroll handler: [Present/Missing]
- CSS overflow: [Values]
- CSS positioning: [Values]
- Recent changes: [List from change logs]

## Root Cause
- [Identified cause or "Unknown - needs code review"]

## Fix Approach
- [Proposed solution]
```

---

#### Session R1.1: Current State Testing

**Pre-Work (No Code Changes):**
1. Test Formula Editor syntax highlighting
   - Type keywords: IF, THEN, ELSE, ELSIF, END, RETURN
   - Do they highlight in blue?
   - Type variables: $orderTotal
   - Do they highlight in purple?
   - Type attributes: #customer.name
   - Do they highlight in teal?
   - Screenshot results

2. Test Formula Editor validation
   - Create variable "$orderTotal"
   - Type "$o" - does it error?
   - Type "$or" - does it error?
   - Type "$ord" - does it error?
   - Type "$orde" - does it error?
   - Type "$orderTotal" - does it error?
   - Type "$xyz" - does it error? (should)
   - Screenshot results

3. Test line number wrapping
   - In BAL Editor: Type long line that wraps
   - Does line number adjust height?
   - Does wrapped text align with indentation?
   - Screenshot results
   - Repeat for Formula Editor

**Deliverable:** Test Results Document
```markdown
# Current State Test Results

## Syntax Highlighting
- Keywords: [Working/Broken] - [Screenshot]
- Variables: [Working/Broken] - [Screenshot]
- Attributes: [Working/Broken] - [Screenshot]

## Validation
- Partial "$o": [Errors/No Error] - [Screenshot]
- Partial "$or": [Errors/No Error] - [Screenshot]
- etc.

## Line Number Wrapping
- BAL Editor: [Adjusts/Doesn't Adjust] - [Screenshot]
- Formula Editor: [Adjusts/Doesn't Adjust] - [Screenshot]
```

#### Session R1.2: Fix CRIT-000 (BAL Editor Scroll Sync) - HIGHEST PRIORITY

**Based on Session R1.0 investigation:**

**Likely Fix Options:**

**Option A: CSS Scroll Container Issue**
```css
/* If line numbers are positioned wrong */
.balEditorContainer {
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden; /* Container doesn't scroll */
}

.balLineNumbers {
  overflow-y: auto; /* Line numbers scroll */
  /* Should match textarea scroll */
}

.balTextarea {
  overflow-y: auto; /* Content scrolls */
}
```

**Option B: Missing Scroll Event Handler**
```typescript
// Add scroll synchronization
useEffect(() => {
  const textarea = textareaRef.current;
  const lineNumbers = lineNumbersRef.current;
  
  const handleScroll = () => {
    if (lineNumbers && textarea) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  };
  
  textarea?.addEventListener('scroll', handleScroll);
  return () => textarea?.removeEventListener('scroll', handleScroll);
}, []);
```

**Option C: Single Scroll Container**
```css
/* Wrap both in a single scrollable container */
.balEditorScrollContainer {
  overflow-y: auto;
  display: grid;
  grid-template-columns: auto 1fr;
}

.balLineNumbers,
.balTextarea {
  overflow: visible; /* Don't scroll individually */
}
```

**Acceptance Criteria:**
- [ ] Line numbers scroll perfectly in sync with textarea
- [ ] No lag or visual glitches
- [ ] Works exactly as it did before regression
- [ ] Both vertical and horizontal scroll work

---

#### Session R1.3: Fix CRIT-001 (Formula Editor Syntax Highlighting)

**If Testing Confirms It's Broken:**

**Option A: Match BAL Editor Pattern (Recommended)**

1. Remove `dangerouslySetInnerHTML` from overlay div
2. Update overlay in `useEffect`:
```typescript
useEffect(() => {
  if (overlayRef.current) {
    const highlighted = highlightSyntax(value);
    overlayRef.current.innerHTML = highlighted;
  }
}, [value, highlightSyntax]);
```

3. Remove `<pre className={styles.overlayContent}>` wrapper
4. Apply styles directly to overlay div

**Option B: Fix Missing CSS Class**

1. Add `.overlayContent` class to CSS module
2. Ensure proper styling matches overlay

**Acceptance Criteria:**
- [ ] Keywords highlight in blue
- [ ] Variables highlight in purple
- [ ] Attributes highlight in teal
- [ ] Overlay scrolls with textarea
- [ ] No visual regressions

#### Session R1.4: Verify CRIT-002 (Validation)

**Based on Testing:**

**If Already Working:**
- Document that it's working
- User's screenshot showed legitimate typo
- No fix needed

**If Broken:**
- Add prefix checking to validation (similar to syntax highlighter)
- Use same logic for consistency
- Test all scenarios from R1.1

**Acceptance Criteria:**
- [ ] Partial variable names don't error if prefix of existing variable
- [ ] Real typos still show errors
- [ ] Validation and highlighting use same logic

#### Session R1.5: Plan CRIT-003 Fix (Line Number Height for Wrapped Lines)

**Based on Testing:**

**If Broken, Research Solutions:**

**Option A: JavaScript Height Matching**
```typescript
useEffect(() => {
  if (!textareaRef.current || !lineNumbersRef.current) return;
  
  const lineElements = textareaRef.current.value.split('\n');
  const lineNumberElements = lineNumbersRef.current.children;
  
  // Calculate actual rendered height for each line
  // Set line number element height to match
}, [value]);
```

**Option B: CSS Grid Row Spanning**
```css
.editorGrid {
  display: grid;
  grid-template-columns: auto 1fr;
}

.lineNumber {
  grid-row: span var(--line-height-factor);
}
```

**Option C: Pre-formatted Overlay Measurement**
- Render invisible pre-formatted version
- Measure each line's actual height
- Apply to line number elements

**Deliverable:** Plan document for line number fix

---

### Phase R2: Line Number Fixes (Session 2)

**Implementation of chosen solution from R1.4**

**Tasks:**
1. Implement height adjustment logic
2. Test with various scenarios:
   - Short lines
   - Long lines that wrap
   - Lines with different indentation levels
   - Lines that wrap multiple times
3. Verify scrolling behavior
4. Apply to both editors if needed

**Acceptance Criteria:**
- [ ] Line numbers match wrapped content height
- [ ] No hanging indents anywhere
- [ ] Wrapped text continues at indentation level
- [ ] Scrolling maintains alignment
- [ ] No performance issues with long documents

---

### Phase R3: Ghost Value Fixes (Session 3)

**See TD-001 in `/change-log/25-10-28_v11-TechnicalDebt.md`**

**Tasks:**
1. Review `GhostValue.tsx` current implementation
2. Create type-safe formatter:
```typescript
function formatGhostValue(value: any, type?: ValueType): string {
  if (value === null || value === undefined) return 'null';
  
  switch (type) {
    case 'time':
      return formatTimeDuration(value);
    case 'date':
      return formatDate(value);
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
3. Test with all types
4. Fix CSS layout
5. Verify debugger works with all sample formulas

**Acceptance Criteria:**
- [ ] All value types format correctly
- [ ] No CSS layout issues
- [ ] Edge cases handled
- [ ] Ready to re-implement datetime functions (TD-002)

---

### Phase R4: Architecture Realignment (Sessions 4-5)

#### Session R4.1: Create Shared Syntax Highlighting

**Goal:** Extract common syntax highlighting to shared hook

**Create `/components/editors/code/shared/hooks/useCodeSyntax.ts`:**

```typescript
/**
 * useCodeSyntax - Shared syntax highlighting for code editors
 * 
 * Provides configurable syntax highlighting with token priority system.
 * Each editor provides its own rules, but the highlighting engine is shared.
 */
export function useCodeSyntax(
  value: string,
  rules: SyntaxRule[]
) {
  const highlightSyntax = useCallback((text: string): string => {
    // Shared highlighting logic
    // Token overlap resolution
    // HTML escaping
    // Priority handling
  }, [rules]);
  
  return { highlightSyntax };
}
```

**Refactor Formula Editor:**
```typescript
// In FormulaEditor/hooks/useFormulaSyntax.ts
import { useCodeSyntax } from '../../shared/hooks/useCodeSyntax';

export function useFormulaSyntax(value: string, variables: Variable[]) {
  const rules = useMemo(() => [
    { name: 'keyword', pattern: /\b(IF|THEN|ELSE|...)\b/g, cssClass: 'keyword', priority: 5 },
    { name: 'variable', pattern: /\$[a-z0-9_]+/gi, cssClass: 'variable', priority: 4 },
    // ... more rules
  ], [variables]);
  
  return useCodeSyntax(value, rules);
}
```

**Acceptance Criteria:**
- [ ] Shared hook created and documented
- [ ] Formula Editor uses shared hook
- [ ] No regressions in highlighting behavior
- [ ] Clear pattern for BAL Editor migration (optional)

#### Session R4.2: Create Shared Validation Framework

**Create `/components/editors/code/shared/hooks/useCodeValidation.ts`:**

```typescript
/**
 * useCodeValidation - Shared validation framework for code editors
 * 
 * Provides configurable validation with debouncing and error reporting.
 * Each editor provides its own validation rules.
 */
export function useCodeValidation(
  value: string,
  validators: ValidationRule[]
) {
  const validate = useCallback((text: string): ValidationResult => {
    // Run all validators
    // Collect errors/warnings
    // Return structured results
  }, [validators]);
  
  return { validate, errors, warnings };
}
```

**Refactor Formula Editor:**
```typescript
// In FormulaEditor/hooks/useFormulaValidation.ts
import { useCodeValidation } from '../../shared/hooks/useCodeValidation';

export function useFormulaValidation(value: string, variables: Variable[]) {
  const validators = useMemo(() => [
    { name: 'undefined-variables', validate: checkUndefinedVariables },
    { name: 'unmatched-parens', validate: checkParentheses },
    // ... more validators
  ], [variables]);
  
  return useCodeValidation(value, validators);
}
```

#### Session R4.3: Create Shared Line Number Component

**Create `/components/editors/code/shared/components/LineNumbers.tsx`:**

```typescript
/**
 * LineNumbers - Shared line number rendering for code editors
 * 
 * Handles line number display with wrapped line height adjustment.
 */
export function LineNumbers({
  value,
  errors,
  onScroll
}: LineNumbersProps) {
  // Shared line number rendering
  // Height adjustment for wrapped lines
  // Error indicators
  // Scroll synchronization
}
```

**Acceptance Criteria:**
- [ ] Shared component created
- [ ] Handles wrapped line heights
- [ ] Formula Editor uses shared component
- [ ] No regressions

#### Session R4.4: Documentation

**Update Documentation:**
- Document shared hooks and components
- Create "Adding a New Code Editor" guide
- Update architecture diagrams
- Document shared vs. specific patterns

---

### Phase R5: Quality Gates & Prevention (Session 6)

**Create `/components/editors/EDITOR_DEVELOPMENT_GUIDE.md`:**

```markdown
# Editor Development Guide

## Before Starting
- [ ] Read original architecture plan
- [ ] Understand shared vs. specific
- [ ] Check existing patterns

## During Development
- [ ] Use shared hooks where possible
- [ ] Add editor-specific only when necessary
- [ ] Document decisions
- [ ] Test continuously

## Before Committing
- [ ] No duplication with other editors
- [ ] Aligns with architecture
- [ ] Documentation updated
- [ ] No regressions
```

**Create Editor Architecture Diagram**

```
┌──────────────────────────────────────────┐
│      Editors Core Foundation            │
│  (Shared across ALL editor types)       │
│                                          │
│  • useAutocompleteTriggers               │
│  • Core Types (EditorTypes, etc.)       │
└──────────────────────────────────────────┘
                    ▲
                    │
    ┌───────────────┴───────────────┐
    │                               │
┌───────────────┐          ┌────────────────┐
│  Code Editors │          │ Document Editors│
│  Foundation   │          │   Foundation    │
│               │          │                 │
│ • useCodeSyntax│         │ • useViewMode   │
│ • useCodeValidation│     │ • useFormatting │
│ • LineNumbers  │         └─────────────────┘
└───────────────┘
        ▲
        │
  ┌─────┴─────┐
  │           │
┌─────┐  ┌────────┐
│ BAL │  │Formula │
│Editor│  │Editor  │
└─────┘  └────────┘
```

---

## Quality Gates

### Before Each Session
- [ ] Review architectural principles
- [ ] Understand what to build/fix
- [ ] Check if it aligns with plan
- [ ] Identify potential deviations

### During Each Session
- [ ] Use shared components/hooks where possible
- [ ] Document why creating new code
- [ ] Test frequently
- [ ] Check for duplication

### After Each Session
- [ ] All tests pass
- [ ] **TEST ALL EDITORS** (BAL, Formula, Markdown, Rich Text) - not just the one you changed
- [ ] No regressions in existing features
- [ ] **Verify BAL Editor still working** (scroll sync, syntax highlighting, autocomplete)
- [ ] Documentation updated
- [ ] Architectural alignment verified
- [ ] Change log updated
- [ ] **Confirm no cross-contamination** between old and new architectures

---

## Success Metrics

### Phase R1 Complete When:
- [ ] **BAL Editor scroll sync fully restored (HIGHEST PRIORITY)**
- [ ] All critical issues fixed or understood
- [ ] Formula Editor syntax highlighting works
- [ ] Validation behavior documented and correct
- [ ] Line number wrapping behavior documented
- [ ] Test results document created
- [ ] **Zero regressions - all editors working as expected**

### Phase R2 Complete When:
- [ ] Line numbers adjust height for wrapped content
- [ ] No hanging indents in any editor
- [ ] Wrapped text aligns at indentation level
- [ ] Scrolling maintains alignment
- [ ] Both editors (if applicable) behave consistently

### Phase R3 Complete When:
- [ ] Ghost value formatting works for all types
- [ ] Type-safe formatter implemented
- [ ] Edge cases handled
- [ ] Ready for datetime function re-implementation
- [ ] No visual regressions in debugger

### Phase R4 Complete When:
- [ ] Shared hooks created and documented
- [ ] Formula Editor uses shared foundation
- [ ] No duplication between editors
- [ ] Clear pattern for future editors
- [ ] Architecture aligns with original plan

### Phase R5 Complete When:
- [ ] Documentation complete and clear
- [ ] Development guide created
- [ ] Quality gates established
- [ ] Visual diagrams created
- [ ] Process prevents future drift

### Overall Success Criteria:
- [ ] **BAL Editor fully restored to working state**
- [ ] **Formula Editor all issues fixed**
- [ ] All user-reported issues resolved
- [ ] Editors stable and maintainable
- [ ] Architecture matches original vision
- [ ] Clear patterns for future work
- [ ] **ZERO REGRESSIONS - nothing broken that was working before**
- [ ] User confidence restored

---

## Next Steps

**Immediate (Tomorrow):**
1. Review this recovery plan
2. Discuss and align on approach
3. Begin Phase R1 (Assessment & Stabilization)

**This Week:**
1. Complete Phase R1
2. Complete Phase R2
3. Begin Phase R3

**Next Week:**
1. Complete Phase R3
2. Complete Phase R4
3. Complete Phase R5

---

## Appendix: Known Good States

### BAL Editor (WAS Reference Implementation - NOW BROKEN)
- **Location:** `/components/BALEditor/`
- **Status:** 🔴 **BROKEN - Line numbers don't scroll with content**
- **Was Status:** ✅ Working perfectly
- **What Broke:** Line number scroll synchronization
- **Patterns to Reference (Once Fixed):**
  - Overlay rendering: `useEffect` + `innerHTML`
  - Line numbers: Should scroll with textarea
  - Autocomplete: Custom implementation
  - Syntax highlighting: Regex-based with priority
- **PRIORITY:** Restore to working state IMMEDIATELY

### Formula Editor (Before Recent Changes)
- **Location:** `/components/editors/code/FormulaEditor/`
- **Status:** ⚠️ Some issues introduced
- **Working Features:**
  - Variable table CRUD
  - Threshold configuration
  - Test panel
  - Autocomplete for variables/attributes
- **Broken Features:**
  - Syntax highlighting overlay (CRIT-001)
  - Possibly validation (CRIT-002, needs verification)
  - Possibly line numbers (CRIT-003, needs verification)

---

**Last Updated:** October 28, 2025 (Updated with Strangler Pattern strategy)  
**Status:** Ready for Implementation  
**Critical Finding:** BAL Editor is now broken (line numbers don't scroll)  
**Migration Strategy:** Strangler Pattern (see Guidelines.md v2.2)  
**Quick Reference:** `/STRANGLER_PATTERN_QUICKREF.md`  
**Next Action:** Phase R1 - Fix BAL Editor using strangler principles

---

## Summary of Issues by Priority

### 🔴 CRITICAL (Session 1 - Fix Immediately)
1. **CRIT-000:** BAL Editor line numbers don't scroll with content (REGRESSION)
2. **CRIT-001:** Formula Editor syntax highlighting broken (keywords not showing)
3. **CRIT-002:** Formula Editor validation (needs verification if truly broken)
4. **CRIT-003:** Line number height not adjusting for wrapped lines

### 🟠 HIGH (Session 2-3)
1. **HIGH-001:** Ghost value formatting bugs (blocks datetime functions)

### 🟡 HIGH (Upgraded - Session 4-5 - Architecture Decision)
1. **MED-001 (NOW HIGH-002):** Architecture drift - Mid-migration chaos, dual architecture
2. **MED-002:** Inconsistent overlay rendering patterns

### ⚪ LOW (Future)
1. **LOW-001:** Missing Phase 1.5 shared hooks from original plan

**Total Issues:** 8 tracked issues
**Blocking Issues:** 4 critical + 2 high (MED-001 upgraded to HIGH-002)
**Time Estimate:** 6 focused sessions to complete all phases
**Critical Context:** We are mid-migration between two architectures - must make decision before Phase R4

---

## Key Questions to Answer Tomorrow

Before starting recovery, we need to answer:

1. **What changed in BAL Editor?**
   - Review git history / change logs
   - Find the specific change that broke scroll sync
   - Was it intentional or accidental?

2. **Do we want to continue the unified editor migration?**
   - **Option A:** Stop migration, restore BAL, maintain dual architecture
   - **Option B:** Complete shared foundation, migrate properly
   - User must decide which path to take

3. **What is the priority?**
   - Get everything working first (stabilize)
   - Then decide on architecture
   - OR make architecture decision first, then fix accordingly

4. **What are the boundaries?**
   - Which editors are "old architecture" (don't touch)?
   - Which editors are "new architecture" (can modify)?
   - How do we prevent future cross-contamination?

5. **What does success look like?**
   - All editors working perfectly
   - Clear architectural pattern (even if dual)
   - No more regressions
   - Clear path forward for future editors
