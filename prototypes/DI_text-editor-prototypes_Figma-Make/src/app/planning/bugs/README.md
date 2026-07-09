# Bugs Directory

This directory contains critical bug investigations, root cause analyses, and recovery plans.

## Purpose

Bug documents track major issues that require:
- Dedicated planning and coordination
- Root cause analysis
- Multiple sessions to resolve
- System-wide recovery efforts
- Architectural fixes

## What Goes Here

### Items to Document
- ✅ Critical system regressions
- ✅ Complex bugs requiring investigation
- ✅ Recovery plans for broken features
- ✅ Multi-component bug tracking
- ✅ Root cause analyses

### Items NOT to Document
- ❌ Simple bugs fixed in one session (document in `/change-log/` only)
- ❌ Feature requests (use `/planning/enhancements/`)
- ❌ Known limitations (use `/planning/debt/`)

## Document Structure

Each bug document should include:
- **Severity** - Critical, High, Medium, Low
- **Component** - Affected part of the system
- **User Impact** - How this affects users
- **Evidence** - Bug reports, screenshots, reproduction steps
- **Root Cause** - Why the bug exists (after investigation)
- **Investigation** - Steps taken to diagnose
- **Fix Approach** - Proposed solution
- **Acceptance Criteria** - How to verify the fix

## Bug Files

### Open Bugs

**BUG-001: Debug Highlight Alignment Issue** (Medium Priority)
- **Component:** FormulaEditor
- **Summary:** Debug highlights progressively misaligned with code lines
- **Status:** Open - Multiple fix attempts unsuccessful
- [Full details →](./BUG-001-DebugHighlightAlignment.md)

### Historical References

Major bugs previously tracked in:
- **Recovery Plan:** `/planning/requirements/25-10-28_v12-EDITOR_RECOVERY_PLAN.md`

## Related Documentation

- **Debt:** `/planning/debt/` - Known issues that aren't actively being fixed
- **Requirements:** `/planning/requirements/` - Recovery plans and fix strategies
- **Change Log:** `/change-log/` - Bug fix implementation records

---

**Last Updated:** November 4, 2025
