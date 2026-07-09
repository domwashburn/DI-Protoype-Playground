# Technical Debt Directory

This directory contains documentation tracking known technical debt, incomplete implementations, workarounds, and items requiring future cleanup or refactoring.

## Purpose

Technical debt documents serve as:
- Tracking for known issues that block future work
- Documentation of workarounds and their limitations
- Planning for refactoring and cleanup work
- Historical record of decisions and their consequences

## What Goes Here

### Items to Document
- ✅ Known bugs that require significant investigation
- ✅ Incomplete features or implementations
- ✅ Workarounds that should be replaced
- ✅ Performance issues
- ✅ Code quality issues (duplication, complexity)
- ✅ Missing functionality that was deferred
- ✅ Technical limitations that need addressing

### Items NOT to Document
- ❌ Future feature ideas (use `/planning/enhancements/` instead)
- ❌ Active bugs being worked on (document after resolution)
- ❌ Minor code style issues

## Document Structure

Each debt item should include:
- **Severity** - Critical, High, Medium, Low
- **Component** - What part of the system is affected
- **Impact** - How this affects users or development
- **Root Cause** - Why this debt exists (if known)
- **Recommended Fix** - How to resolve it
- **Dependencies** - What blocks resolution
- **Priority** - When this should be addressed
- **Workaround** - Temporary solution (if any)

## Debt Files

The following technical debt documents should be located in this directory:

1. **25-10-28_v11-TechnicalDebt.md** - Main technical debt log

## Resolution Process

When resolving debt:
1. Update the debt document with resolution details
2. Mark as ✅ RESOLVED with date
3. Link to implementation change log
4. Document what was fixed and how
5. Note any remaining related debt

## Related Documentation

- **Bugs:** `/planning/bugs/` - Critical bugs requiring dedicated planning
- **Requirements:** `/planning/requirements/` - Plans for resolving debt
- **Change Log:** `/change-log/` - Implementation records

---

**Last Updated:** October 29, 2025
