/**
 * Formula Editor Hooks barrel export
 * 
 * NOTE: useFormulaSyntax has been replaced by shared useCodeSyntax hook
 * See: /components/editors/code/shared/hooks/useCodeSyntax.ts
 */

export { useFormulaValidation } from './useFormulaValidation';
export { useFormulaVariables } from './useFormulaVariables';
export { useKeyboardShortcuts } from './useKeyboardShortcuts';
export { useInlineTypeahead } from './useInlineTypeahead';
export { useThresholdEvaluation } from './useThresholdEvaluation';
export { useDebugger } from './useDebugger';
export { useLineHeights } from './useLineHeights';

export type { UseFormulaValidationOptions, UseFormulaValidationReturn } from './useFormulaValidation';
export type { UseFormulaVariablesOptions, UseFormulaVariablesReturn } from './useFormulaVariables';
export type { UseKeyboardShortcutsOptions } from './useKeyboardShortcuts';
export type { UseInlineTypeaheadOptions, UseInlineTypeaheadReturn } from './useInlineTypeahead';
export type { UseThresholdEvaluationOptions, UseThresholdEvaluationReturn } from './useThresholdEvaluation';
export type { DebuggerState, DebuggerActions, UseDebuggerResult } from './useDebugger';
export type { LineHeight } from './useLineHeights';