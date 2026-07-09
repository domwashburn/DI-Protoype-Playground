# v13 - Strangler Pattern Migration Guidelines

**Date:** October 28, 2025  
**Type:** Architecture Documentation  
**Status:** Complete

---

## Summary

Updated `Guidelines.md` to v2.2 with comprehensive **Strangler Pattern** documentation for safe, incremental migrations of complex UI components, hooks, and services. This addresses our current mid-migration state and provides clear architectural principles to prevent future regressions.

---

## Context

### The Problem

We discovered that our codebase is in a **mid-migration state** between two incompatible architectures:

**Old Architecture:**
- `/components/BALEditor/` - BAL Editor (accidentally broken during migration)
- `/components/MarkdownEditorNew/` - Markdown Editor  
- `/components/RichTextEditor/` - Rich Text Editor

**New Architecture:**
- `/components/editors/core/` - Shared foundation
- `/components/editors/code/FormulaEditor/` - New Formula Editor
- `/components/editors/code/shared/` - Shared code editor hooks (incomplete)

**What Went Wrong:**
1. Attempted to "unify" editors without completing shared foundation first
2. Modified BAL Editor (which should have remained untouched) during unification
3. Broke BAL Editor's scroll synchronization
4. Created confusion about which pattern to use for changes
5. No clear migration path or rollback plan

### The Solution

Document and enforce the **Strangler Pattern** - a proven architectural pattern for safe incremental migrations that:
- Builds new code alongside old code (never replaces directly)
- Maintains strict boundaries to prevent cross-contamination
- Proves new architecture before migrating old code
- Always provides rollback capability
- Migrates one component at a time

---

## Implementation Details

### New Section Added to Guidelines.md

**Location:** After "State Management", before "Documentation Practices"

**Section:** `## Migration Strategy - Strangler Pattern`

**Content Includes:**

1. **Overview & Core Principles**
   - Build alongside, never replace directly
   - Prove before migrating
   - Strict boundaries between old and new
   - One thing at a time
   - Rollback plan always available

2. **Our Current Situation**
   - Documents our mid-migration state
   - Shows old vs. new architecture locations
   - Explains what went wrong (BAL Editor touched accidentally)

3. **Strangler Pattern for Editor Migration**
   - Phase 1: Build shared foundation (isolated)
   - Phase 2: Build new editor using shared foundation
   - Phase 3: Migrate first old editor (with feature flags)
   - Phase 4: Migrate remaining editors (optional)

4. **Strangler Pattern for Hooks**
   - Example: Migrating syntax highlighting to shared hook
   - Shows parallel implementation approach
   - Documents validation steps

5. **Strangler Pattern for Services**
   - Example: Evaluation engine refactor
   - V1 and V2 coexisting
   - Gradual migration of consumers

6. **Anti-Patterns to Avoid**
   - Never modify old code during migration
   - Never half-migrate a component
   - Never migrate multiple things simultaneously
   - Always use feature flags or isolation
   - Never share CSS across old and new

7. **Migration Checklist Template**
   - Pre-migration steps (git tags, documentation)
   - During migration (parallel implementation, feature flags)
   - Validation (testing, comparison, performance)
   - Cutover (enable flag, monitor, quick rollback)
   - Cleanup (stabilization period, delete old code)

8. **Key Takeaways**
   - Summary of core principles
   - Emphasis on safety over speed

### Terminology Updates

Added new **Migration Terms** section to terminology reference:
- Strangler Pattern
- Feature Flag
- Old Architecture / New Architecture
- Migration Boundary
- Stabilization Period
- Rollback Plan

### Version History

Updated to **v2.2** with changelog entry explaining the migration strategy addition.

---

## Files Changed

- `/guidelines/Guidelines.md` - Major addition (~400 lines of migration documentation)

---

## Examples Provided

### Feature Flag Pattern
```tsx
// In App.tsx or routing layer
const USE_NEW_BAL_EDITOR = false; // Feature flag

{USE_NEW_BAL_EDITOR ? (
  <NewBALEditor /> // from /components/editors/code/BALEditor
) : (
  <BALEditor />    // from /components/BALEditor
)}
```

### Parallel Hook Implementation
```tsx
// Old editor keeps old pattern
// /components/BALEditor/BALEditor.tsx
// Still uses old inline highlighting logic

// New editor uses shared hook
// /components/editors/code/FormulaEditor/FormulaEditor.tsx
import { useCodeSyntax } from '../shared/hooks/useCodeSyntax';
const highlightedCode = useCodeSyntax(code, 'formula');
```

### Service Migration (V1 + V2 Coexistence)
```
/services/evaluationEngine/     # Old engine (keep working)
/services/evaluationEngineV2/   # New engine (build isolated)
```

---

## Benefits

### Immediate Benefits
1. **Clear migration path** - No more confusion about how to proceed
2. **Risk reduction** - Feature flags enable instant rollback
3. **Zero regression principle** - Old code untouched until ready
4. **Validates approach** - Prove new architecture works before committing

### Long-term Benefits
1. **Reusable pattern** - Apply to any future migrations (not just editors)
2. **Team alignment** - Everyone follows same process
3. **Reduced technical debt** - Proper migration vs. quick hacks
4. **Knowledge capture** - Pattern documented for future developers

### Specific to Current Situation
1. **Fixes BAL Editor safely** - Can restore old code while building new
2. **Completes Formula Editor** - Validates shared foundation works
3. **Provides decision framework** - Should we continue migration or maintain dual architecture?
4. **Prevents future accidents** - Clear rules about what not to touch

---

## Alignment with Recovery Plan

This documentation directly supports **Phase R4: Architecture Decision & Realignment** from the Editor Recovery Plan (`25-10-28_v12-EDITOR_RECOVERY_PLAN.md`).

**Specifically addresses:**
- Decision point: Continue migration or stop?
- If continuing: How to complete shared foundation
- If continuing: How to migrate BAL Editor properly
- If stopping: How to maintain dual architecture safely

**Enforces principles:**
- Never touch old editors during recovery (strict boundaries)
- Prove before migrating (validation steps)
- Rollback plans (feature flags, git tags)
- One thing at a time (sequential migration)

---

## Usage Instructions

### For AI Assistant
When working on migrations:
1. Reference this section before modifying any component
2. Follow the checklist for each migration
3. Never violate anti-patterns
4. Document feature flags and rollback plans

### For Developers
When planning architectural changes:
1. Review "Migration Strategy - Strangler Pattern" section
2. Use migration checklist template
3. Create git tags before major changes
4. Implement feature flags for risky changes

### For Code Reviews
Check that:
- [ ] Migration follows strangler pattern principles
- [ ] Old code not modified during migration
- [ ] Feature flags implemented for cutover
- [ ] Rollback plan documented
- [ ] Validation steps completed

---

## Next Steps

### Immediate (Phase R1 - Current)
1. ✅ Document strangler pattern (this change log)
2. ⏳ Fix BAL Editor using strangler principles (restore old code)
3. ⏳ Fix Formula Editor issues without touching BAL

### Near-term (Phase R4 - Architecture Decision)
1. Decide: Continue migration or maintain dual architecture?
2. If continuing: Complete `/code/shared/` hooks following strangler pattern
3. If continuing: Create feature flag for BAL Editor migration
4. If stopping: Document dual architecture maintenance guidelines

### Long-term (Future Migrations)
1. Apply strangler pattern to any hook refactoring
2. Apply strangler pattern to any service refactoring
3. Use migration checklist for all significant changes
4. Update guidelines with lessons learned

---

## References

**External Resources:**
- Martin Fowler's Strangler Fig Application: https://martinfowler.com/bliki/StranglerFigApplication.html
- Sam Newman's Monolith to Microservices (Chapter on Strangler Pattern)

**Internal Documentation:**
- `/change-log/25-10-28_v12-EDITOR_RECOVERY_PLAN.md` - Recovery plan this supports
- `/change-log/25-10-24_v01-EditorArchitectureRefactor.md` - Original unified editor plan
- `/guidelines/Guidelines.md` - Updated guidelines document

---

## Lessons Learned

### What We Learned
1. **"Unify" ≠ "Migrate"** - Building shared foundation is different from migrating existing code
2. **Isolation is critical** - One accidental import can break working code
3. **Feature flags are essential** - Enable risk-free experimentation and instant rollback
4. **Document boundaries** - Clear rules prevent accidental violations
5. **Validate incrementally** - Prove each step before proceeding

### What We'll Do Differently
1. **Complete shared foundation** before attempting any editor migration
2. **Use feature flags** for all risky changes
3. **Create git tags** before every migration step
4. **Test all editors** after every change (not just the one being modified)
5. **Follow checklist** religiously for each migration

### Why This Matters
The strangler pattern is slower than "big bang" rewrites, but it's dramatically safer and more likely to succeed. This is especially important when:
- Working with AI assistants (need clear boundaries and rules)
- Complex interdependencies (editors, hooks, services all connected)
- Production code (can't afford long broken states)
- Multiple features in flight (need isolation between changes)

---

**Status:** Guidelines v2.2 complete and ready for use in recovery phases.
