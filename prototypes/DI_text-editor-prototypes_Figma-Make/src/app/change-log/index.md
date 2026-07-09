# Change Log Index

## Epics & Planned Features

### 🎯 Active Epics
- [EPIC: Advanced Threshold Evaluation with Gap Handling](./EPIC-AdvancedThresholdEvaluation.md) - ✅ Complete (Phase 1) - Intelligent gap handling with 7 strategies (nearest, interpolate, lower, upper, error, default, null)
- [EPIC: Formula Evaluation Debugger & Step-Through Replay](./EPIC-FormulaEvaluationDebugger.md) - 🚧 Phase 3 In Progress - Step-by-step formula execution debugger with playback controls and variable inspection

### 📋 Planned Epics
- [EPIC: Formula Type System & Runtime Type Checking](./EPIC-FormulaTypeSystem.md) - 📋 Planned - Comprehensive type system to prevent type mismatches, invalid operations, and improve error messages
- [EPIC: BAL Dynamic Keyword Highlighting](./EPIC-BALDynamicKeywordHighlighting.md) - 📋 Planned - Highlight user-defined terms from definitions and dictionary vocabulary as semantic keywords
- [EPIC: List/Array Type Support](./EPIC-ListArrayType.md) - 🚧 In Progress (Increment 3 Complete!) - Homogeneous List<T> type with 20+ built-in functions (MAP, FILTER, SUM, SLICE, SORT, etc.) - Core functionality production-ready!

---


## July 2026

### July 8, 2026
- [v02 - Rich Block Editor Phase 2 Blocks](./26-07-08_v02-RichBlockEditorPhase2Blocks.md) - ✅ Complete - Added Callout (nested content, 4 tones), Table (via `@lexical/table` with block-hosting cells), Image (DecoratorNode + caption), and DragHandlePlugin (hover rail with grip + insert-below). Extended slash command + registry; strangler isolation preserved.
- [v01 - Rich Block Editor Phase 1 Foundation](./26-07-08_v01-RichBlockEditorPhase1Foundation.md) - ✅ Complete - Added isolated Lexical editor foundation with Carbon-token CSS Modules, slash command groundwork, markdown shortcuts, and block barrel exports.

## November 2025

### November 13, 2025
- [v01 - Syntax Highlighting Regression Fixes](./25-11-13_v01-SyntaxHighlightingFixes.md) - ✅ Complete - Fixed 6 critical syntax highlighting regressions: keywords not blue, BAL text purple, comments breaking highlighting, template literals all green, object property access invalid, and unmatched quotes breaking across lines

### November 10, 2025
- [v01 - Natural Language Operator Autocomplete Fixes & Enhancements](./25-11-10_v01-OperatorAutocomplete.md) - ✅ Complete - Fixed broken operator autocomplete (duplicate text, click selection, apostrophes in verbalizations) and implemented smart value autocomplete that automatically suggests variables/attributes after operator keywords

### November 5, 2025
- [v01 - Variable Verbalization Phase 1: Foundation](./25-11-05_v01-VariableVerbalizationPhase1.md) - ✅ Complete - Implemented verbalization foundation: Variable type extension, bidirectional mapping utilities, VariableTable UI with real-time validation, sample data updates (Phase 1 of 7)

### November 4, 2025
- [Debug Output Column - Visual Demo](./DEBUG_OUTPUT_COLUMN_DEMO.md) - 📊 Demo - Interactive visual demonstration of the Debug Output Column feature with examples
- [v01 - Debug Output Column Complete](./25-11-04_v01-DebugOutputColumnComplete.md) - ✅ Complete - Implemented resizable Debug Output Column showing computed values for each line during debugging (Phases 1-3: Foundation, Resize, Polish)

---

## October 2025

### October 31, 2025
- [v02 - Loop Criteria Highlighting](./25-10-31_v02-LoopCriteriaHighlighting.md) - ✅ Complete - Enhanced debugger to display evaluation highlights and ghost values on loop criteria lines during each iteration (FOR iterator values, WHILE condition results)
- [v01 - Ghost Value Alignment Fix](./25-10-31_v01-GhostValueAlignmentFix.md) - ✅ Complete - Fixed severe misalignment of ghost value annotations caused by double-counting editor padding in positioning calculation

### October 29, 2025
- [v02 - Removed Active Token Suppression](./25-10-29_v02-ActiveTokenSuppressionRemoval.md) - ✅ Complete - Removed active token suppression so undefined variables stay highlighted in red while editing, providing clearer feedback until variable becomes valid
- [v01 - CRIT-002 Verification - Error/Warning System Complete](./25-10-29_v01-CRIT002-Verification.md) - ✅ Complete - Verified and documented complete implementation of CRIT-002: error/warning gutter icons, line number styling, ErrorWarningList component with click-to-scroll, and tooltips. All acceptance criteria met.

### October 27, 2025
- [v02 - List/Array Type Increment 3: Advanced Functions](./25-10-27_v02-ListArrayTypeIncrement3.md) - ✅ Complete - Implemented 10 advanced list functions (SLICE, CONCAT, UNIQUE, SORT, SORT_DESC, JOIN, SPLIT, INDEX_OF, RANGE) completing core list toolkit
- [v01 - List/Array Type Increment 2: Core Functions](./25-10-27_v01-ListArrayTypeIncrement2.md) - ✅ Complete - Implemented 10 essential list functions (LENGTH, LIST_SUM, LIST_AVG, LIST_MIN, LIST_MAX, CONTAINS, FIRST, LAST, REVERSE) with sample formulas
- [v00 - List/Array Type Increment 1: Foundation](./25-10-27_v00-ListArrayTypeIncrement1.md) - ✅ Complete - Foundation for list/array support: ListType, tokenizer, AST nodes, parser, evaluator, and tracing with homogeneous type checking

### October 28, 2025
- [v20 - Line Number Scroll Sync Fix + Line Wrapping Measurement Fix](./25-10-28_v20-LineNumberScrollSyncFix.md) - ✅ Complete - Fixed THREE critical bugs: (1) Line wrapping measurements at narrow widths by accounting for padding, (2) Scroll architecture using single-scroller pattern, (3) Debug highlights not clearing when switching samples (CRIT-003 COMPLETE)
- [v19 - Line Wrapping Alignment Fix](./25-10-28_v19-LineWrappingAlignmentFix.md) - ✅ Complete - Fixed textarea/overlay misalignment by reverting to standard wrapping (column 0); documented HTML textarea limitation; enhanced line height measurement with double rAF and complete style copying (CRIT-003 resolution)
- [v18 - Line Wrapping Indentation (CRIT-003)](./25-10-28_v18-LineWrappingIndentation-CRIT003.md) - ⚠️ Reverted - Attempted indentation-preserving wrapping caused misalignment (see v19 for fix)
- [v17 - Active Token Suppression](./25-10-28_v17-ActiveTokenSuppression.md) - ✅ Complete - Suppresses undefined variable errors while actively typing; errors only show after user confirms token (CRIT-002 UX improvement)
- [v16 - Undefined Variable Highlighting Fix](./25-10-28_v16-UndefinedVariableHighlightingFix.md) - 🔧 Partial - Fixed syntax highlighting to show undefined variables in red with wavy underline (CRIT-002 partial - still need error row highlights and icons)
- [v15 - Formula Syntax Fallback Fix](./25-10-28_v15-FormulaSyntaxFallbackFix.md) - ✅ Complete - Fixed syntax overlay to use default text color for edge cases (mistyped functions, unknown keywords) instead of transparent (CRIT-001 resolved)
- [v14 - BAL Editor Scroll Sync Fix](./25-10-28_v14-BALEditorScrollSyncFix.md) - ✅ Complete - Fixed line number scroll synchronization bug and added visible scrollbar styling (Phase R1 complete, following strangler pattern)
- [v13 - Strangler Pattern Migration Guidelines](./25-10-28_v13-StranglerPatternGuidelines.md) - ✅ Complete - Added comprehensive migration strategy to Guidelines.md v2.2 documenting strangler pattern for safe incremental migrations
- [v12 - Editor Recovery Plan](./25-10-28_v12-EDITOR_RECOVERY_PLAN.md) - 📋 Plan - Comprehensive recovery plan addressing mid-migration state, BAL Editor regression, and dual architecture challenges
- [v11 - Technical Debt Log](./25-10-28_v11-TechnicalDebt.md) - 📋 Tracked - Documented ghost value formatting bugs that caused rollback of time/datetime utility functions, blocking future datetime feature development
- [v10 - Automatic Type Coercion](./25-10-28_v10-AutomaticTypeCoercion.md) - ✅ Complete - Implemented automatic type coercion for implicit conversions like `number → time`, making date arithmetic formulas work seamlessly
- [v09 - Date Attribute Type Fix](./25-10-28_v09-DateAttributeTypeFix.md) - ✅ Complete - Fixed ticket timestamp attributes to use `date` type instead of `number`, resolving type mismatch in SLA formula
- [v08 - Date Arithmetic Type Improvement](./25-10-28_v08-DateArithmeticTypeImprovement.md) - ✅ Complete - Fixed type system so `date - date` correctly produces `time` type (duration) instead of raw number
- [v07 - Time Type Implementation](./25-10-28_v07-TimeTypeImplementation.md) - ✅ Complete - Added time as a fifth variable type with multiple format options (HH:MM:SS, minutes, hours, etc.) for better time-based calculations
- [v06 - Assignment Type Validation](./25-10-28_v06-AssignmentTypeValidation.md) - ✅ Complete - Added heuristic type inference to detect type mismatches in formula assignments (e.g., assigning string to number variable)
- [v05 - Type Coercion Fix & Inline Type Mismatch Warnings](./25-10-28_v05-TypeCoercionAndInlineWarnings.md) - ✅ Complete - Fixed type coercion bug and added real-time type mismatch warnings (like ESLint) with validateTestValue utilities
- [v04 - Real-Time Warning Highlights](./25-10-28_v04-RealTimeWarningHighlights.md) - ✅ Complete - Added real-time warning highlighting system with orange underlines, inline messages, and warning banner
- [v03 - Error Highlighting Complete](./25-10-28_v03-ErrorHighlightingComplete.md) - ✅ Complete - Completed error highlighting with red squiggles, error messages on hover, and error banner
- [v02 - Error Highlighting Partial Implementation](./25-10-28_v02-ErrorHighlightingPartialImplementation.md) - ⚠️ Partial - Initial error highlighting implementation (completed in v03)
- [v01 - Error And Debug Highlight Foundation](./25-10-28_v01-ErrorAndDebugHighlightFoundation.md) - ✅ Complete - Unified highlighting system supporting debug (blue), error (red), and warning (orange) highlights

### October 25, 2025
- [v24 - Formula Debugger Phase 3 Highlight Movement Plan](./25-10-25_v24-FormulaDebuggerPhase3-HighlightMovementPlan.md) - 🚧 Blocked - Comprehensive troubleshooting plan for debug highlight movement bug (highlight not moving between steps)
- [v23 - Formula Debugger Phase 3 Complete](./25-10-25_v23-FormulaDebuggerPhase3Complete.md) - ⚠️ Partial - Wired up debug overlay with line highlighting, ghost values, and auto-scroll. Line highlight not moving (see v24)
- [v22 - Formula Debugger Phase 3 Implementation](./25-10-25_v22-FormulaDebuggerPhase3Implementation.md) - ✅ Complete - Added debug overlay to Formula Editor with line highlighting, ghost values, and branch indicators
- [v21 - Formula Debugger Phase 3 Plan](./25-10-25_v21-FormulaDebuggerPhase3Plan.md) - 📋 Plan - Phase 3 design document for editor integration and line highlighting
- [v20 - Assignments In IF Blocks Fix](./25-10-25_v20-AssignmentsInIfBlocks.md) - ✅ Complete - Fixed critical parser bug where assignments inside IF/THEN/ELSE blocks were treated as comparisons instead of assignments
- [v19 - Formula Comment Support](./25-10-25_v19-FormulaCommentSupport.md) - ✅ Complete - Added `//` single-line comment support to tokenizer with syntax highlighting
- [v18 - Formula Debugger Phase 2 Complete](./25-10-25_v18-FormulaDebuggerPhase2Complete.md) - ✅ Complete - Full debugger UI with step controls, variable inspector, debug mode toggle, and TracingEvaluator integration
- [v17 - Formula Debugger Phase 2 Plan](./25-10-25_v17-FormulaDebuggerPhase2.md) - 📋 Plan - Phase 2 design document for debugger UI components
- [v16 - Formula Debugger Phase 1](./25-10-25_v16-FormulaDebuggerPhase1.md) - ✅ Complete - Implemented execution trace recording infrastructure (ExecutionTracer, TracingEvaluator)