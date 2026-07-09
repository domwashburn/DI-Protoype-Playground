# Strangler Pattern Quick Reference

> **TL;DR:** Build new code alongside old code. Never replace directly. Prove it works. Migrate one thing at a time. Always have rollback plan.

---

## The Golden Rules

1. ✅ **DO** build new implementation in separate location
2. ✅ **DO** use feature flags for switching between old and new
3. ✅ **DO** prove new code works before migrating
4. ✅ **DO** migrate one component/hook/service at a time
5. ✅ **DO** keep old code until new code proven stable (1+ week)

6. ❌ **DON'T** modify old code during migration
7. ❌ **DON'T** half-migrate (some shared hooks, some old patterns)
8. ❌ **DON'T** migrate multiple things simultaneously
9. ❌ **DON'T** share CSS or globals that affect both old and new
10. ❌ **DON'T** delete old code without stabilization period

---

## Our Current State

### Old Architecture (Untouched)
```
/components/BALEditor/           ← BAL (BROKEN - needs restoration)
/components/MarkdownEditorNew/   ← Markdown (working)
/components/RichTextEditor/      ← Rich Text (working)
```

### New Architecture (In Progress)
```
/components/editors/
  core/                          ← Shared foundation (Phase 1 complete)
  code/
    FormulaEditor/               ← Formula (Phase 2 complete)
    shared/                      ← Shared hooks (mostly empty)
```

### What Went Wrong
- Tried to "unify" before shared foundation complete
- Modified BAL Editor (should have stayed untouched)
- Broke BAL scroll sync
- No feature flags, no rollback plan
- **Violated:** Never touch old code during migration

---

## Feature Flag Pattern

**Always use feature flags for cutover:**

```tsx
// App.tsx or routing layer
const USE_NEW_BAL_EDITOR = false; // Feature flag

export function App() {
  return (
    {USE_NEW_BAL_EDITOR ? (
      <NewBALEditor />  // /components/editors/code/BALEditor
    ) : (
      <BALEditor />     // /components/BALEditor
    )}
  );
}
```

**Benefits:**
- Instant rollback: Just flip flag to `false`
- Test in production without risk
- Gradual rollout (percentage of users, specific users, etc.)
- Easy A/B testing

---

## Migration Checklist (5 Minutes)

**Before you start:**
- [ ] Is shared foundation complete and proven? (If no, build that first)
- [ ] Is old code stable and working? (If no, fix that first)
- [ ] Do you have git tag: `before-[component]-migration`?
- [ ] Do you have rollback plan documented?

**During migration:**
- [ ] Build new implementation in SEPARATE location (don't touch old)
- [ ] Use shared hooks/services (don't duplicate code)
- [ ] Add feature flag for switching
- [ ] Test new implementation thoroughly
- [ ] Compare: Does new match old? (visual, functional, performance)

**Before cutover:**
- [ ] All tests pass (both old and new)
- [ ] No regressions in OTHER components
- [ ] Feature parity confirmed
- [ ] Performance acceptable

**After cutover:**
- [ ] Feature flag enabled (new implementation active)
- [ ] Monitor for 1+ week
- [ ] Quick rollback available (flip flag)
- [ ] Document any issues

**Cleanup:**
- [ ] Stabilization period complete (1+ week)
- [ ] Delete old implementation
- [ ] Remove feature flag
- [ ] Update documentation

---

## Common Mistakes

### Mistake 1: Modifying Old Code
```tsx
// ❌ WRONG - Importing shared hook into old editor
// /components/BALEditor/BALEditor.tsx (old architecture)
import { useCodeSyntax } from '../editors/code/shared/hooks/useCodeSyntax';
```

**Why wrong:** Creates dependency between old and new. Now old code requires new code to work.

**Fix:** Old code stays completely unchanged until ready to migrate.

---

### Mistake 2: Half-Migrating
```tsx
// ❌ WRONG - Using some new patterns, some old
import { useCodeSyntax } from '../shared/hooks/useCodeSyntax'; // New
// But still using old validation logic inline                   // Old
```

**Why wrong:** Component is neither old nor new. Hard to maintain, hard to migrate further.

**Fix:** All or nothing. Either component is old (uses zero shared hooks) or new (uses all shared hooks).

---

### Mistake 3: Migrating Multiple Things
```bash
# ❌ WRONG - Migrating BAL and Markdown simultaneously
git commit -m "Migrate BAL and Markdown to new architecture"
```

**Why wrong:** Can't isolate issues. If something breaks, which migration caused it?

**Fix:** One at a time. Validate after each.

---

### Mistake 4: No Rollback Plan
```tsx
// ❌ WRONG - Direct replacement
- <BALEditor />
+ <NewBALEditor />
```

**Why wrong:** If new code has issues, you're forced to fix forward. No quick escape.

**Fix:** Feature flag or git tag. Always have quick revert option.

---

## Decision Tree

**Should I migrate this component?**

```
Is shared foundation complete and proven?
├─ NO → Complete shared foundation first
└─ YES → Continue
           ↓
Is old component working correctly?
├─ NO → Fix old component first (or decide to replace with new)
└─ YES → Continue
           ↓
Is this the only thing being migrated right now?
├─ NO → Wait for other migration to complete
└─ YES → Continue
           ↓
Do you have time for stabilization period (1+ week)?
├─ NO → Don't start migration
└─ YES → Start migration with feature flag
```

---

## Quick Start: Migrate One Component

**Example: Migrating BAL Editor**

### Step 1: Prepare (5 min)
```bash
git tag before-bal-migration
# Document rollback: git checkout before-bal-migration
```

### Step 2: Build New (Parallel) (2-4 hours)
```
Create: /components/editors/code/BALEditor/
Copy and refactor using shared hooks
Don't touch: /components/BALEditor/ (old stays unchanged)
```

### Step 3: Add Feature Flag (5 min)
```tsx
const USE_NEW_BAL = false;
{USE_NEW_BAL ? <NewBALEditor /> : <BALEditor />}
```

### Step 4: Test (30 min)
```
Enable flag locally
Test all features
Compare old vs new
Performance check
```

### Step 5: Cutover (1 min)
```tsx
const USE_NEW_BAL = true; // Flip flag
```

### Step 6: Monitor (1 week)
```
Watch for issues
Quick rollback available: USE_NEW_BAL = false
Fix any issues in new code
```

### Step 7: Cleanup (10 min)
```bash
# After 1 week stable
rm -rf /components/BALEditor/
# Remove feature flag
# Update imports
```

---

## Why This Matters

**Traditional "Big Bang" Rewrite:**
- All or nothing
- High risk
- Long broken periods
- Hard to rollback
- Often fails

**Strangler Pattern:**
- Incremental progress
- Low risk (old keeps working)
- Short/no broken periods
- Easy rollback (feature flag)
- Higher success rate

**Trade-off:** Strangler is slower but safer.

**For our situation:** We're working with AI assistants on complex editors. Safety > Speed.

---

## Resources

**Full Documentation:**
- `/guidelines/Guidelines.md` - Section: "Migration Strategy - Strangler Pattern"
- `/change-log/25-10-28_v13-StranglerPatternGuidelines.md` - Detailed explanation
- `/change-log/25-10-28_v12-EDITOR_RECOVERY_PLAN.md` - Recovery plan using strangler pattern

**External:**
- Martin Fowler: https://martinfowler.com/bliki/StranglerFigApplication.html

---

**Last Updated:** October 28, 2025  
**Version:** 1.0  
**Status:** Active - use for all migrations
