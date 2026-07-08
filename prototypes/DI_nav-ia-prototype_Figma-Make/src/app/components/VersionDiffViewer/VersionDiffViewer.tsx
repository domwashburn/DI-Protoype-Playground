import { useState } from 'react';
import { Add, Subtract } from '@carbon/icons-react';
import styles from './VersionDiffViewer.module.css';

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface VersionDiffViewerProps {
  assetName: string;
  assetType: string;
  oldVersion: string;
  newVersion: string;
  oldContent?: string;
  newContent?: string;
  onClose?: () => void;
}

export default function VersionDiffViewer({
  assetName,
  assetType,
  oldVersion,
  newVersion,
  oldContent = '',
  newContent = '',
  onClose,
}: VersionDiffViewerProps) {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  // Generate diff lines
  const diffLines = generateDiffLines(oldContent, newContent);
  const stats = calculateStats(diffLines);

  return (
    <div className={styles.diffViewerContainer}>
      {/* Header */}
      <div className={styles.diffHeader}>
        <div className={styles.diffHeaderInfo}>
          <h2 className={styles.diffTitle}>{assetName}</h2>
          <div className={styles.diffMeta}>
            {assetType} • Comparing v{oldVersion} → v{newVersion}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.diffToolbar}>
        <div className={styles.viewModeToggle}>
          <button
            className={`${styles.viewModeButton} ${viewMode === 'split' ? styles.active : ''}`}
            onClick={() => setViewMode('split')}
          >
            Split
          </button>
          <button
            className={`${styles.viewModeButton} ${viewMode === 'unified' ? styles.active : ''}`}
            onClick={() => setViewMode('unified')}
          >
            Unified
          </button>
        </div>

        <div className={styles.diffStats}>
          <div className={`${styles.diffStat} ${styles.additions}`}>
            <Add size={16} />
            {stats.additions} addition{stats.additions !== 1 ? 's' : ''}
          </div>
          <div className={`${styles.diffStat} ${styles.deletions}`}>
            <Subtract size={16} />
            {stats.deletions} deletion{stats.deletions !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.diffContent}>
        {viewMode === 'split' ? (
          <SplitView
            oldContent={oldContent}
            newContent={newContent}
            oldVersion={oldVersion}
            newVersion={newVersion}
          />
        ) : (
          <UnifiedView diffLines={diffLines} />
        )}
      </div>
    </div>
  );
}

// Split View Component
function SplitView({
  oldContent,
  newContent,
  oldVersion,
  newVersion,
}: {
  oldContent: string;
  newContent: string;
  oldVersion: string;
  newVersion: string;
}) {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');

  return (
    <div className={styles.splitView}>
      {/* Old Version */}
      <div className={styles.diffPane}>
        <div className={styles.diffPaneHeader}>
          <h3 className={styles.diffPaneTitle}>v{oldVersion}</h3>
          <span className={`${styles.diffPaneLabel} ${styles.old}`}>Before</span>
        </div>
        <div className={styles.diffPaneContent}>
          {oldLines.map((line, index) => (
            <div key={index} className={styles.diffLine}>
              <div className={styles.diffLineNumber}>{index + 1}</div>
              <div className={styles.diffLineContent}>{line || ' '}</div>
            </div>
          ))}
        </div>
      </div>

      {/* New Version */}
      <div className={styles.diffPane}>
        <div className={styles.diffPaneHeader}>
          <h3 className={styles.diffPaneTitle}>v{newVersion}</h3>
          <span className={`${styles.diffPaneLabel} ${styles.new}`}>After</span>
        </div>
        <div className={styles.diffPaneContent}>
          {newLines.map((line, index) => (
            <div key={index} className={styles.diffLine}>
              <div className={styles.diffLineNumber}>{index + 1}</div>
              <div className={styles.diffLineContent}>{line || ' '}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Unified View Component
function UnifiedView({ diffLines }: { diffLines: DiffLine[] }) {
  if (diffLines.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>No differences found</p>
      </div>
    );
  }

  return (
    <div className={styles.unifiedView}>
      {diffLines.map((line, index) => (
        <div key={index} className={`${styles.diffLine} ${styles[line.type]}`}>
          <div className={styles.diffLineNumber}>
            {line.type === 'removed' && line.oldLineNumber}
            {line.type === 'added' && line.newLineNumber}
            {line.type === 'unchanged' && line.oldLineNumber}
          </div>
          <div className={styles.diffLineContent}>
            {line.type === 'added' && '+ '}
            {line.type === 'removed' && '- '}
            {line.type === 'unchanged' && '  '}
            {line.content}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to generate diff lines
function generateDiffLines(oldContent: string, newContent: string): DiffLine[] {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');
  const diffLines: DiffLine[] = [];

  // Simple line-by-line diff (in production, would use a proper diff algorithm)
  const maxLength = Math.max(oldLines.length, newLines.length);
  
  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === newLine) {
      diffLines.push({
        type: 'unchanged',
        content: oldLine || '',
        oldLineNumber: i + 1,
        newLineNumber: i + 1,
      });
    } else if (oldLine === undefined) {
      diffLines.push({
        type: 'added',
        content: newLine,
        newLineNumber: i + 1,
      });
    } else if (newLine === undefined) {
      diffLines.push({
        type: 'removed',
        content: oldLine,
        oldLineNumber: i + 1,
      });
    } else {
      // Lines are different
      diffLines.push({
        type: 'removed',
        content: oldLine,
        oldLineNumber: i + 1,
      });
      diffLines.push({
        type: 'added',
        content: newLine,
        newLineNumber: i + 1,
      });
    }
  }

  return diffLines;
}

// Calculate diff statistics
function calculateStats(diffLines: DiffLine[]): { additions: number; deletions: number } {
  return {
    additions: diffLines.filter(line => line.type === 'added').length,
    deletions: diffLines.filter(line => line.type === 'removed').length,
  };
}
