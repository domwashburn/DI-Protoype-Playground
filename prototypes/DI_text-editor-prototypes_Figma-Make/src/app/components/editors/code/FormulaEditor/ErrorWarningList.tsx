/**
 * ErrorWarningList - Display list of errors and warnings
 * 
 * Shows all validation errors and warnings with line numbers.
 * Used below the debugger section in the Formula Editor.
 */

import { AlertCircle, AlertTriangle } from 'lucide-react';
import styles from './ErrorWarningList.module.css';

export interface LineIssue {
  /** Line number (1-indexed) */
  line: number;
  /** Issue type */
  type: 'error' | 'warning';
  /** Issue message */
  message: string;
  /** Issue code (e.g., "UNDEFINED_VARIABLE") */
  code?: string;
}

export interface ErrorWarningListProps {
  /** List of issues to display */
  issues: LineIssue[];
  /** Callback when line number is clicked */
  onLineClick?: (line: number) => void;
}

export function ErrorWarningList({ issues, onLineClick }: ErrorWarningListProps) {
  if (issues.length === 0) {
    return null;
  }

  // Sort by line number, then by type (errors first)
  const sortedIssues = [...issues].sort((a, b) => {
    if (a.line !== b.line) return a.line - b.line;
    if (a.type === 'error' && b.type === 'warning') return -1;
    if (a.type === 'warning' && b.type === 'error') return 1;
    return 0;
  });

  // Count errors and warnings
  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Issues</span>
        <span className={styles.count}>
          {errorCount > 0 && (
            <span className={styles.errorCount}>
              {errorCount} error{errorCount !== 1 ? 's' : ''}
            </span>
          )}
          {errorCount > 0 && warningCount > 0 && <span className={styles.separator}>, </span>}
          {warningCount > 0 && (
            <span className={styles.warningCount}>
              {warningCount} warning{warningCount !== 1 ? 's' : ''}
            </span>
          )}
        </span>
      </div>
      
      <div className={styles.list}>
        {sortedIssues.map((issue, index) => (
          <div
            key={`${issue.line}-${issue.type}-${index}`}
            className={`${styles.issue} ${styles[issue.type]}`}
            onClick={() => onLineClick?.(issue.line)}
          >
            <div className={styles.issueIcon}>
              {issue.type === 'error' ? (
                <AlertCircle size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
            </div>
            <div className={styles.issueContent}>
              <div className={styles.issueLine}>Line {issue.line}</div>
              <div className={styles.issueMessage}>{issue.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
