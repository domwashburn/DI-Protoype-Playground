# Planning Documentation

This directory contains all planning, architecture, and forward-looking documentation for the project. Implementation change logs remain in `/change-log/`.

## Directory Structure

### `/epics/`
**Purpose:** Multi-phase feature initiatives and large-scale improvements

Multi-session epics that span multiple implementation phases. These documents define the overall vision, phases, and success criteria for major features.

**Examples:**
- Advanced Threshold Evaluation system
- Formula Type System
- List/Array Type support
- Formula Debugger

### `/requirements/`
**Purpose:** Architectural plans, feature design documents, and technical specifications

Detailed planning documents for features, architectural changes, and system designs. These are referenced during implementation and serve as the "blueprint" for development work.

**Examples:**
- Editor architecture refactor plans
- Formula engine architecture
- Feature-specific plans (layout, mentions, debugger phases)
- Natural language syntax phases (operators, functions, control structures)
- Strangler pattern guidelines

### `/bugs/`
**Purpose:** Critical bug tracking and recovery plans

Major bug investigations, root cause analyses, and recovery plans. These track critical issues that require dedicated planning and coordination to resolve.

**Examples:**
- Editor recovery plans
- Critical issue investigations
- System regression analyses

### `/debt/`
**Purpose:** Technical debt tracking and resolution planning

Documents tracking known technical debt, incomplete implementations, workarounds, and items requiring future cleanup or refactoring.

**Examples:**
- Ghost value formatting issues
- Missing datetime functions
- Deferred optimizations
- Known limitations

### `/enhancements/`
**Purpose:** Future feature ideas and improvement proposals

Forward-looking documents for features not yet prioritized or scheduled. These capture ideas, research, and preliminary designs for potential future work.

**Examples:**
- Future type system improvements
- Editor enhancement proposals
- Performance optimization ideas
- UX improvement concepts

### `/phases/`
**Purpose:** Phase documentation and completion summaries

Multi-phase feature completion summaries, visual demonstrations, and phase-level documentation. These documents describe the structure of phased implementations and celebrate completed work.

**Examples:**
- Formula Debugger Phase 3 visual demo
- List/Array implementation complete summary
- Multi-increment feature summaries

---

## Cross-Referencing

When referencing planning documents from implementation change logs or code:

```markdown
<!-- From change logs -->
**Plan:** [Debug Output Column](/planning/requirements/25-10-29_v03-DebugOutputColumnPlan.md)
**Epic:** [Formula Type System](/planning/epics/EPIC-FormulaTypeSystem.md)
**Debt:** [Technical Debt Log](/planning/debt/25-10-28_v11-TechnicalDebt.md)

<!-- From code comments -->
// See: /planning/requirements/25-10-28_v12-EDITOR_RECOVERY_PLAN.md
// Epic: /planning/epics/EPIC-ListArrayType.md
```

---

## Guidelines

### What Goes in Planning vs. Change Log

**Planning (`/planning/`):**
- ✅ Forward-looking documents (plans, proposals, specs)
- ✅ Multi-phase epics and initiatives
- ✅ Architectural designs and patterns
- ✅ Bug investigations and recovery plans
- ✅ Technical debt tracking
- ✅ Future enhancement proposals

**Change Log (`/change-log/`):**
- ✅ Implementation summaries (what was built)
- ✅ Feature completion reports
- ✅ Bug fix documentation
- ✅ Refactoring records
- ✅ Migration completion reports
- ✅ Session-by-session implementation logs

**Rule of Thumb:**
- If it describes **what should be built** → `/planning/`
- If it describes **what was built** → `/change-log/`
- Some documents serve both purposes and may reference each other

---

## Document Naming Conventions

### Epics
- Format: `EPIC-DescriptiveName.md`
- Example: `EPIC-FormulaTypeSystem.md`

### Requirements/Plans
- Format: `YY-MM-DD_vNN-DescriptiveName.md` OR `PLAN-DescriptiveName.md`
- Example: `25-10-29_v03-DebugOutputColumnPlan.md`
- Example: `PLAN-ListArrayIncrement3.1-StructuredData.md`

### Bugs
- Format: `YY-MM-DD_vNN-BugName.md` OR descriptive name
- Example: `25-10-28_v12-EDITOR_RECOVERY_PLAN.md`

### Debt
- Format: `YY-MM-DD_vNN-TechnicalDebt.md`
- Example: `25-10-28_v11-TechnicalDebt.md`

### Enhancements
- Format: `FUTURE-FeatureName.md`
- Example: `FUTURE-VariableTypeListSupport.md`

---

## Maintenance

When adding new planning documents:

1. **Choose the correct subfolder** based on document type
2. **Follow naming conventions** for consistency
3. **Update this README** if adding new categories
4. **Cross-reference** from implementation change logs
5. **Update Guidelines.md** if introducing new patterns

---

**Last Updated:** October 29, 2025  
**Maintained By:** Development Team