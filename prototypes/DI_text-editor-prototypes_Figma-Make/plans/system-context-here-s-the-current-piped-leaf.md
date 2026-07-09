# Fix Plan — BAL Editor punctuation / eval errors

## Context

The BAL editor is surfacing evaluation errors that appear to be about **semicolons, parentheses, and other punctuation** — but the codebase has no BAL-specific validator that checks those characters. Investigation shows a tangled error pipeline that violates the strangler pattern and is almost certainly the source of the spurious errors:

- **`BALEditor` → `handleBALValidation` (EditorContainer.tsx:440) → `editorService.validateBAL` (editorService.ts:221)** — this is a **mock regex validator** whose only two rules are `set` without quotes and `if` without `then`. It cannot produce paren/semicolon errors.
- **`useFormulaValidation` (FormulaEditor/hooks/useFormulaValidation.ts:281, 290, 330, 391, 398)** is the ONLY code in the project that emits messages like `"Unmatched closing parenthesis"`, `"Empty parentheses found"`, and `"Unclosed string literal"`. It is a **formula-only** hook.
- The unified `CodeEditor` (CodeEditor.tsx:232) gates it correctly (`mode === 'formula'`), but the `FormulaTestPanel` and formula validation infrastructure share utilities (`utils/formulaValidationUtils.ts` re-exports the `ValidationIssue` type), and the real `EvaluationEngine.parse()` throws `ParseError` for punctuation mismatches whenever BAL content is run through the Formula pathway (which the BAL editor currently does not do, but the test suite and any accidental cross-wire would).
- Separately, the real `Evaluator.evaluateIfExpression` (services/evaluationEngine/runtime/Evaluator.ts:660-699) is polluted with 7 `console.log('🔍 EVAL: ...')` statements and **silently returns `null` when an IF has no ELSE branch**, which masks real evaluation failures behind console noise.

The intended outcome: a BAL editor that only reports errors from a **BAL-appropriate** source, with the mock stub either removed or clearly labeled, and with the underlying evaluator freed of debug spam so real errors are visible.

## Recommended approach

Because the user's specific error text hasn't been captured yet, the plan splits into a **diagnose-first** step and then targeted fixes for the two known root causes.

### Step 1 — Capture the actual error text (5 min, read-only)

Before changing code, reproduce the error and read the exact message string shown in the BAL editor's error alert. This confirms which source is firing:

- If the message matches one of the two mock strings ("Variable name should be enclosed in quotes" / "Missing 'then' clause after 'if' condition") → root cause is Fix A only.
- If the message matches a `useFormulaValidation` string ("Unmatched closing parenthesis", "Empty parentheses found", "Unclosed string literal") → Formula validation is leaking into the BAL path; do Fix B.
- If the message comes from `EvaluationEngine` (`ParseError`, `UndefinedVariableError`, etc.) → the BAL test-run path is running content through the Formula parser; do Fix C.
- If none match, grep the exact string against the codebase to locate the source.

This step gates the rest of the plan and prevents changing the wrong file.

### Fix A — Remove or gate the mock BAL validator

**File:** `src/app/services/editorService.ts:221-249`

The `validateBAL` function is explicitly labeled "Mock validation - in production, this would call a real BAL parser/validator" (line 224). Its two regex rules are **wrong** for real BAL syntax — for example, `set foo to 5` is valid BAL that the mock flags as an error.

**Change:** Replace the mock rules with a permissive no-op that returns `{ valid: true, errors: [] }` and emits a single `console.warn` explaining that BAL validation is not yet implemented. This immediately stops false-positive errors from being shown, without wiring up a real parser (which is out of scope for this fix).

Also update `EditorContainer.tsx:440-449` (`handleBALValidation`) to remove the "Found N syntax error(s)" toast when errors are empty, and drop the misleading `toast.success('BAL syntax is valid')` (since the validator doesn't actually check anything).

### Fix B — Ensure Formula validation cannot fire on BAL content

**File to inspect:** `src/app/components/editors/code/CodeEditor/CodeEditor.tsx:232`

The mode gate here is correct today, but I want to add a defensive assertion that `mode !== 'bal'` before `useFormulaValidation` is invoked, so a future refactor cannot silently cross-wire BAL into the formula linter. Add a runtime check that logs a warning if `mode === 'bal'` and `useFormulaValidation` would fire.

Additionally, in `FormulaTestPanel` and any component that consumes `useFormulaValidation` output, ensure the `content` being validated is the **formula** content, not the BAL content. This is likely already correct; verify by reading the consumers listed in the grep results.

### Fix C — Clean up the real evaluator (defensive; do regardless of A/B outcome)

**File:** `src/app/services/evaluationEngine/runtime/Evaluator.ts:660-699`

Two issues in `evaluateIfExpression`:

1. **Remove all 7 `console.log('🔍 EVAL: ...')` statements** (lines 663-665, 668, 674, 678, 686, 688, 692). They pollute the console and make real errors invisible under the noise.
2. **Change the silent `null` fallback (line 699)** to throw a `RuntimeError` with message `"IF expression with no matching branch and no ELSE clause"`, propagating the AST location so it surfaces in the error list rather than returning `null` and cascading into downstream type errors that look like punctuation problems.

These are pure evaluator cleanups; they do not require changes to callers because the surrounding `try/catch` in `EvaluationEngine.evaluate` (line 195-239) already catches and formats the error.

### Files touched

- `src/app/services/editorService.ts` — neuter mock validator (Fix A)
- `src/app/components/EditorContainer/EditorContainer.tsx` — simplify BAL validation toast/handler (Fix A)
- `src/app/components/editors/code/CodeEditor/CodeEditor.tsx` — add defensive mode assertion (Fix B)
- `src/app/services/evaluationEngine/runtime/Evaluator.ts` — remove console logs, throw on no-branch (Fix C)

No new files. No changes to `BALEditor.tsx` itself (strangler-pattern isolation preserved).

### What this plan does NOT do

- Does not build a real BAL parser/validator. That is a substantially larger project (proper tokenizer, grammar, error recovery) and belongs in `/planning/requirements/` as its own effort.
- Does not migrate the BAL editor to the new `editors/code/` architecture. The strangler pattern says one thing at a time; this fix keeps the old editor untouched.
- Does not touch `FormulaParser`, `Context`, or variable resolution — those are working as designed.

## Verification

1. **Reproduce first:** Open the BAL editor, paste the code that was producing the semicolon/paren errors, and screenshot the exact error message before making any changes. Save this in the plan file's Step 1 as evidence.
2. **After Fix A:** Load the same content — the mock errors should be gone. `toast.success` should no longer fire on the validate button.
3. **After Fix B:** Grep `useFormulaValidation` usages and confirm none receive BAL content. Add a temporary `console.assert(mode !== 'bal')` and click through the BAL editor — no assertion should fire.
4. **After Fix C:** Run the existing `src/app/tests/evaluator.test.ts` suite (via `pnpm test` or the project's test runner) and confirm no regressions. Type an IF expression with no ELSE in the Formula editor — the error should now appear in the error list instead of silently evaluating to `null`.
5. **Manual sanity:** Type valid BAL like `set foo to 5\nif foo > 3 then approve` and confirm no errors appear.
