# Migration Decision Framework

**Purpose:** Help decide whether to continue unified architecture migration or maintain stable dual architecture.

**Decision Point:** Before Phase R4 of Editor Recovery Plan

**Status:** ⏳ Decision Pending

---

## The Question

After stabilizing all editors (Phase R1-R3 complete), we must decide:

**Option A: Stop Migration - Maintain Dual Architecture**
- Keep BAL, Markdown, Rich Text in old architecture
- Keep Formula (and future editors) in new architecture
- Document both patterns clearly
- Accept duplication

**Option B: Complete Migration - Unified Architecture**
- Complete `/code/shared/` foundation
- Migrate BAL Editor properly (using strangler pattern)
- Eventually migrate Markdown and Rich Text (optional)
- Single architectural pattern

---

## Decision Criteria

### Technical Factors

| Factor | Option A: Dual Architecture | Option B: Unified Architecture |
|--------|---------------------------|-------------------------------|
| **Risk** | ✅ Low - no more changes to stable code | ⚠️ Medium - migration could introduce bugs |
| **Complexity** | ⚠️ Two patterns to understand | ✅ One pattern once complete |
| **Maintenance** | ⚠️ Duplicate logic in old and new | ✅ Shared hooks reduce duplication |
| **Future editors** | ⚠️ Which pattern to use? | ✅ Clear: use unified pattern |
| **Testing burden** | ⚠️ Test both patterns | ✅ Test one pattern (eventually) |
| **Onboarding** | ⚠️ Must learn both patterns | ✅ Learn one pattern |

### Resource Factors

| Factor | Option A: Dual Architecture | Option B: Unified Architecture |
|--------|---------------------------|-------------------------------|
| **Time investment** | ✅ Minimal (document patterns) | ⚠️ Significant (2-4 sessions per editor) |
| **Immediate value** | ✅ High (stabilize quickly) | ⚠️ Low (refactoring, no new features) |
| **Long-term value** | ⚠️ Low (technical debt persists) | ✅ High (cleaner codebase) |
| **Opportunity cost** | ✅ Can build features instead | ⚠️ Delays feature development |

### Risk Factors

| Factor | Option A: Dual Architecture | Option B: Unified Architecture |
|--------|---------------------------|-------------------------------|
| **Can we break BAL again?** | ✅ No - won't touch it | ⚠️ Yes - migration could break it |
| **Can we rollback?** | ✅ N/A - nothing to rollback | ✅ Yes - strangler pattern with feature flags |
| **Proven approach?** | ✅ Yes - keep what works | ⚠️ Shared foundation only proven with Formula |
| **AI assistant risk** | ⚠️ Must enforce "don't touch old" | ⚠️ Must enforce strangler pattern |

### Strategic Factors

| Factor | Option A: Dual Architecture | Option B: Unified Architecture |
|--------|---------------------------|-------------------------------|
| **Scalability** | ⚠️ Two patterns scale poorly | ✅ One pattern scales well |
| **Team growth** | ⚠️ Confusion for new devs | ✅ Clear pattern to learn |
| **Code quality** | ⚠️ Duplication and drift | ✅ DRY principles |
| **Flexibility** | ✅ Can revisit later | ⚠️ Harder to revert to dual |

---

## Recommendation Framework

### Choose Option A (Dual Architecture) If:

✅ **Priority is stability and speed**
- Need to ship features quickly
- Can't afford migration risk
- Small team or limited time
- Don't plan to build many more editors

✅ **Old editors are working perfectly**
- BAL, Markdown, RTE stable (after recovery)
- Users happy with current functionality
- No plans for major editor enhancements

✅ **Risk tolerance is low**
- Production environment
- Can't afford downtime or regressions
- Previous migration attempts failed
- User confidence needs restoration

### Choose Option B (Unified Architecture) If:

✅ **Priority is long-term code quality**
- Can invest 2-4 sessions per editor
- Want to reduce technical debt
- Plan to build more editors (Function, Variable, etc.)
- Want cleaner codebase for team growth

✅ **Shared foundation is proven**
- Formula Editor stable for 1+ week
- Shared hooks validated
- Performance acceptable
- Pattern well-documented

✅ **Have rollback capability**
- Feature flags implemented
- Git tags in place
- Can revert quickly if issues
- Strangler pattern properly followed

---

## The Hybrid Option (Not Recommended)

**Option C: Selective Migration**
- Migrate BAL (similar to Formula) using strangler pattern
- Keep Markdown and Rich Text in old architecture
- Three patterns total: Old, New, Document editors

**Why not recommended:**
- Still have dual architecture complexity
- Still have migration risk for BAL
- BAL migration benefit unclear if keeping other old editors
- Adds complexity without full benefits of either A or B

**Exception:** Might make sense if:
- BAL Editor needs significant new features anyway
- Would essentially rebuild BAL regardless
- Formula and BAL would share substantial code
- Markdown/RTE unlikely to ever need changes

---

## Decision Process

### Step 1: Assess Current State (After Phase R1-R3)

**Check:**
- [ ] All editors stable and working?
- [ ] Formula Editor proven stable (1+ week)?
- [ ] BAL Editor fully restored?
- [ ] Shared foundation complete?
- [ ] Team capacity for migration (if Option B)?

### Step 2: Answer Key Questions

1. **How many more code editors do we plan to build?**
   - 0-1 editors → Lean toward Option A
   - 2-3 editors → Lean toward Option B
   - 4+ editors → Strongly favor Option B

2. **What's our risk tolerance right now?**
   - Low (need stability) → Option A
   - Medium (can handle managed risk) → Option B with strangler pattern
   - High (willing to experiment) → Option B

3. **What's our timeline for next features?**
   - Need features this week → Option A
   - Can wait 2-3 weeks → Option B
   - Flexible timeline → Option B

4. **How confident are we in strangler pattern?**
   - Low confidence → Option A (safer)
   - High confidence → Option B (execute well)

5. **What does the user want?**
   - Stability and features → Option A
   - Clean architecture → Option B
   - Let them decide!

### Step 3: Make Decision

**Decision:** [To be filled in]

**Rationale:** [Why this decision makes sense for our situation]

**Date:** [When decision made]

**Committed By:** [User approval]

### Step 4: Document Decision

**If Option A (Dual Architecture):**
- [ ] Create `DUAL_ARCHITECTURE_GUIDE.md`
- [ ] Document old pattern (BAL, Markdown, RTE)
- [ ] Document new pattern (Formula, future editors)
- [ ] Create clear rules: when to use which pattern
- [ ] Update Guidelines.md with dual architecture guidance

**If Option B (Unified Architecture):**
- [ ] Create `BAL_MIGRATION_PLAN.md` using strangler pattern template
- [ ] Set up feature flags for BAL migration
- [ ] Create git tag `before-unified-architecture-migration`
- [ ] Document rollback procedure
- [ ] Schedule migration sessions (Phases R4.1-R4.5)

---

## Strangler Pattern Readiness (If Choosing Option B)

Before committing to Option B, verify strangler pattern prerequisites:

**Shared Foundation Complete:**
- [ ] `/components/editors/code/shared/hooks/useCodeSyntax.ts` - Syntax highlighting
- [ ] `/components/editors/code/shared/hooks/useCodeValidation.ts` - Validation
- [ ] `/components/editors/code/shared/hooks/useLineNumbers.ts` - Line number rendering
- [ ] All hooks tested with Formula Editor
- [ ] All hooks documented with examples
- [ ] Performance validated

**Feature Flag Infrastructure:**
- [ ] Can easily add feature flags to App.tsx
- [ ] Understand how to implement flag switching
- [ ] Can toggle flag locally for testing
- [ ] Can deploy flag disabled, then enable later

**Rollback Capability:**
- [ ] Git tags before each migration
- [ ] Documentation of revert procedure
- [ ] Team knows how to rollback
- [ ] Confidence in quick recovery

**Time & Resources:**
- [ ] Have 2-4 sessions available for BAL migration
- [ ] Can afford 1 week stabilization period
- [ ] Can delay features during migration
- [ ] Team aligned on priority

**If all checked:** Ready for Option B

**If some unchecked:** Consider Option A, or complete prerequisites first

---

## Example Decision Template

```markdown
## DECISION: [Option A / Option B]

**Date:** October [X], 2025
**Status:** ✅ Committed

### Rationale

We chose [Option A/B] because:

1. [Primary reason - e.g., "Stability is highest priority right now"]
2. [Secondary reason - e.g., "Only plan to build 1 more editor"]
3. [Risk factor - e.g., "Can't afford migration risk in production"]

### Tradeoffs Accepted

By choosing [Option A/B], we accept:

- [Tradeoff 1 - e.g., "Maintaining two patterns"]
- [Tradeoff 2 - e.g., "Duplication between BAL and Formula"]
- [Tradeoff 3 - e.g., "Higher onboarding complexity"]

### Next Steps

- [ ] [Action 1]
- [ ] [Action 2]
- [ ] [Action 3]

### Review Date

We will review this decision on [Date] and consider if circumstances have changed.
```

---

## Recommended Decision Path

Based on current context (mid-migration, BAL broken, user frustrated):

**Recommended:** **Option A - Dual Architecture** (Short term)

**Why:**
1. **Restore user confidence** - Get everything stable quickly
2. **Proven old editors work** - BAL was solid before we touched it
3. **Formula validates new pattern** - We have one new-architecture editor proven
4. **Can revisit later** - Not locked in forever
5. **Lower risk** - No more changes to newly-restored BAL

**Path:**
1. Phase R1-R3: Stabilize all editors
2. Choose Option A: Document dual architecture
3. Build features for 2-4 weeks
4. Review: Did we need unified architecture? Or is dual working fine?
5. If dual architecture painful → Revisit Option B with full strangler pattern
6. If dual architecture fine → Continue with dual, it's working

**This gives us:**
- ✅ Quick return to stability
- ✅ Time to validate new architecture with more Formula usage
- ✅ Flexibility to revisit decision with more data
- ✅ Option to migrate BAL later if truly needed
- ✅ Restored user confidence

**Future trigger to revisit:**
- If building 3rd code editor (Variable/Function editor)
- If BAL needs major refactor anyway
- If duplication causes significant bugs
- If team growth requires simpler architecture

---

## References

- `/guidelines/Guidelines.md` - Migration Strategy - Strangler Pattern
- `/STRANGLER_PATTERN_QUICKREF.md` - Quick reference
- `/change-log/25-10-28_v12-EDITOR_RECOVERY_PLAN.md` - Recovery plan
- `/change-log/25-10-24_v01-EditorArchitectureRefactor.md` - Original unified plan

---

**Status:** ⏳ Decision Pending - Review before Phase R4
**Recommended:** Option A (Dual Architecture) - Revisit in 2-4 weeks
