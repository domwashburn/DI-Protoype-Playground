/**
 * BALTestPanel - BAL Editor Test Panel
 * 
 * Wrapper around UnifiedTestPanel for BAL mode.
 * Provides test interface for BAL rules with data model integration.
 * 
 * Usage:
 * ```tsx
 * <BALTestPanel
 *   balCode={code}
 *   automationId={automationId}
 *   onErrorHighlight={handleErrorHighlight}
 * />
 * ```
 */

import { forwardRef } from 'react';
import { UnifiedTestPanel } from '../../testing/UnifiedTestPanel';
import type { 
  UnifiedTestPanelProps,
  UnifiedTestPanelHandle,
  ErrorHighlight,
  WarningHighlight
} from '../../testing/UnifiedTestPanel';
import type { LineIssue } from '../FormulaEditor/ErrorWarningList';

export interface BALTestPanelProps {
  /** BAL code to test */
  balCode: string;
  /** Automation ID for data model */
  automationId?: string;
  /** Error highlight callback */
  onErrorHighlight?: (highlight: ErrorHighlight | null) => void;
  /** Warning highlights callback */
  onWarningHighlight?: (highlights: WarningHighlight[] | null) => void;
  /** Line issues */
  lineIssues?: LineIssue[];
}

/**
 * BAL Test Panel Component
 * Simple wrapper around UnifiedTestPanel in BAL mode
 */
export const BALTestPanel = forwardRef<UnifiedTestPanelHandle, BALTestPanelProps>((props, ref) => {
  const {
    balCode,
    automationId,
    onErrorHighlight,
    onWarningHighlight,
    lineIssues = []
  } = props;

  return (
    <UnifiedTestPanel
      ref={ref}
      mode="bal"
      balCode={balCode}
      automationId={automationId}
      onErrorHighlight={onErrorHighlight}
      onWarningHighlight={onWarningHighlight}
      lineIssues={lineIssues}
    />
  );
});

BALTestPanel.displayName = 'BALTestPanel';