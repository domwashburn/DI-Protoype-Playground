/**
 * CodeEditor - Unified Editor Interface
 * 
 * Provides a single component that can edit both BAL and Formula modes.
 * Internally delegates to the appropriate specialized editor.
 * 
 * USAGE:
 * ```tsx
 * <CodeEditor mode="bal" value={code} onChange={setCode} />
 * <CodeEditor mode="formula" value={formula} onChange={setFormula} variables={vars} />
 * ```
 */

import { forwardRef } from 'react';
import { FormulaEditor } from '../FormulaEditor';
import { BALEditor } from '../../../BALEditor';
import type { CodeEditorMode, CodeEditorProps, CodeEditorHandle } from './CodeEditor';

export { CodeEditorMode, CodeEditorProps, CodeEditorHandle };

/**
 * Unified CodeEditor component
 * Delegates to BALEditor or FormulaEditor based on mode
 */
export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  (props, ref) => {
    const { mode, ...rest } = props;
    
    if (mode === 'bal') {
      // Delegate to BAL Editor
      return (
        <BALEditor
          ref={ref}
          value={rest.value}
          onChange={rest.onChange}
          errors={rest.balErrors}
          onValidate={rest.onBalValidate}
          vocabularyMappings={rest.vocabularyMappings}
          className={rest.className}
        />
      );
    }
    
    // Delegate to Formula Editor
    return (
      <FormulaEditor
        value={rest.value}
        onChange={rest.onChange}
        variables={rest.variables}
        onVariablesChange={rest.onVariablesChange}
        formulaName={rest.formulaName}
        formulaDescription={rest.formulaDescription}
        formulaReturnType={rest.formulaReturnType}
        onFormulaMetadataChange={rest.onFormulaMetadataChange}
        placeholder={rest.placeholder}
        readOnly={rest.readOnly}
        className={rest.className}
        debugHighlight={rest.debugHighlight}
        errorHighlight={rest.errorHighlight}
        warningHighlights={rest.warningHighlights}
        onWarningHighlightsChange={rest.onWarningHighlightsChange}
        onLineIssuesChange={rest.onLineIssuesChange}
      />
    );
  }
);

CodeEditor.displayName = 'CodeEditor';

// Export convenience wrappers
export { BALEditor, FormulaEditor };
