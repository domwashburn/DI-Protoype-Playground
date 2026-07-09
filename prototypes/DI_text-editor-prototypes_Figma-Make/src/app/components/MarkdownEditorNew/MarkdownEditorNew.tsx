/**
 * MarkdownEditor Component (Presentational) - Version 2
 * 
 * Markdown editor with multiple editing modes:
 * - Edit: Plain Text - raw markdown editing
 * - Edit: Preview - rendered markdown preview (read-only)
 * - Edit: Split View - side-by-side plain text and preview
 * - Preview (View Only) - read-only rendered view
 * 
 * Note: "Formatted" mode previously used contentEditable but was removed due to
 * browser inconsistencies and bidirectional sync issues. Use Plain Text or Split View for editing.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useState, useRef, useEffect } from 'react';
// CARBON_CONVERT: Replace lucide-react icons with @carbon/icons-react
import { Eye, Code2, Columns } from 'lucide-react';
import styles from './MarkdownEditorNew.module.css';

export interface MarkdownEditorProps {
  /** Current markdown content */
  value: string;
  /** Callback when content changes */
  onChange: (value: string) => void;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Initial view mode */
  initialMode?: 'plain' | 'split' | 'preview';
  /** Custom className */
  className?: string;
}

type ViewMode = 'plain' | 'split' | 'preview';

/**
 * MarkdownEditor - Full-featured markdown editor with multiple view modes
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  initialMode = 'plain',
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  return (
    <div className={`${styles.mdEditorContainer} ${className}`}>
      {/* Toolbar */}
      <div className={styles.mdToolbar}>
        {/* Formatting buttons - only show when not in preview mode */}
        {viewMode !== 'preview' && (
          <>
            <div className={styles.mdToolbarGroup}>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('**', '**')}
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('*', '*')}
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('~~', '~~')}
                title="Strikethrough"
              >
                <s>S</s>
              </button>
            </div>

            <div className={styles.mdToolbarGroup}>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('# ', '')}
                title="Heading 1"
              >
                H1
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('## ', '')}
                title="Heading 2"
              >
                H2
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('### ', '')}
                title="Heading 3"
              >
                H3
              </button>
            </div>

            <div className={styles.mdToolbarGroup}>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('- ', '')}
                title="Bullet List"
              >
                •
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('1. ', '')}
                title="Numbered List"
              >
                1.
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('- [ ] ', '')}
                title="Checkbox"
              >
                ☑
              </button>
            </div>

            <div className={styles.mdToolbarGroup}>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('[', '](url)')}
                title="Link"
              >
                🔗
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('`', '`')}
                title="Inline Code"
              >
                &lt;/&gt;
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('```\n', '\n```')}
                title="Code Block"
              >
                &#123; &#125;
              </button>
              <button
                className={styles.mdToolbarBtn}
                onClick={() => insertMarkdown('> ', '')}
                title="Quote"
              >
                &quot;
              </button>
            </div>

            <div className={styles.mdToolbarSpacer}></div>
          </>
        )}

        {/* View mode buttons */}
        <div className={styles.mdToolbarGroup}>
          <button
            className={`${styles.mdViewBtn} ${viewMode === 'plain' ? styles.active : ''}`}
            onClick={() => setViewMode('plain')}
            title="Edit: Plain Text"
          >
            <Code2 size={16} />
            <span>Plain Text</span>
          </button>
          <button
            className={`${styles.mdViewBtn} ${viewMode === 'split' ? styles.active : ''}`}
            onClick={() => setViewMode('split')}
            title="Edit: Split View"
          >
            <Columns size={16} />
            <span>Split</span>
          </button>
          <button
            className={`${styles.mdViewBtn} ${viewMode === 'preview' ? styles.active : ''}`}
            onClick={() => setViewMode('preview')}
            title="Preview (View Only)"
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className={`${styles.mdContent} ${styles[`mdMode${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`]}`}>
        {/* Plain Text Mode */}
        {viewMode === 'plain' && (
          <div className={styles.mdEditorPane}>
            <textarea
              ref={textareaRef}
              className={styles.mdTextarea}
              value={value}
              onChange={handleChange}
              readOnly={readOnly}
              placeholder="Enter markdown here..."
              spellCheck={false}
            />
          </div>
        )}

        {/* Split View Mode */}
        {viewMode === 'split' && (
          <>
            <div className={styles.mdEditorPane}>
              <textarea
                ref={textareaRef}
                className={styles.mdTextarea}
                value={value}
                onChange={handleChange}
                readOnly={readOnly}
                placeholder="Enter markdown here..."
                spellCheck={false}
              />
            </div>
            <div className={styles.mdPreviewPane}>
              <MarkdownPreview content={value} />
            </div>
          </>
        )}

        {/* Preview Mode */}
        {viewMode === 'preview' && (
          <div className={styles.mdPreviewPane}>
            <MarkdownPreview content={value} />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Markdown Preview Component - Read-only rendered markdown
 */
interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const parseMarkdown = (md: string): string => {
    let html = md;

    // Tables - process before other inline formatting
    html = html.replace(/^\|(.+)\|[ \t]*\n\|[-: |]+\|[ \t]*\n((?:\|.+\|[ \t]*\n?)*)/gm, (match, header, rows) => {
      const headerCells = header.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
      const rowLines = rows.trim().split('\n');
      const rowsHtml = rowLines.map((row: string) => {
        const cells = row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell);
        const cellsHtml = cells.map((cell: string) => {
          let cellContent = cell;
          cellContent = cellContent.replace(/`([^`]+)`/g, '<code>$1</code>');
          cellContent = cellContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
          cellContent = cellContent.replace(/__([^_]+)__/g, '<strong>$1</strong>');
          cellContent = cellContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
          cellContent = cellContent.replace(/_([^_]+)_/g, '<em>$1</em>');
          cellContent = cellContent.replace(/~~([^~]+)~~/g, '<del>$1</del>');
          cellContent = cellContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
          return `<td>${cellContent}</td>`;
        }).join('');
        return `<tr>${cellsHtml}</tr>`;
      }).join('');
      
      const headerHtml = headerCells.map((cell: string) => {
        let cellContent = cell;
        cellContent = cellContent.replace(/`([^`]+)`/g, '<code>$1</code>');
        cellContent = cellContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        cellContent = cellContent.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        cellContent = cellContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        cellContent = cellContent.replace(/_([^_]+)_/g, '<em>$1</em>');
        return `<th>${cellContent}</th>`;
      }).join('');
      
      return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
    });

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => 
      `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code)}</code></pre>`
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');

    // Blockquotes
    html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

    // Task lists
    html = html.replace(/^- \[([ x])\] (.+)/gim, (_, checked, text) => 
      `<label class="task-item"><input type="checkbox" ${checked === 'x' ? 'checked' : ''} disabled /> ${text}</label>`
    );

    // Unordered lists
    html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
    html = html.replace(/^- (.+)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');

    // Paragraphs
    html = html.replace(/^(?!<[hol>]|<ul|<pre|<blockquote|<table)(.+)$/gim, '<p>$1</p>');

    return html;
  };

  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  return (
    <div className={styles.mdPreview}>
      <div
        className={styles.mdPreviewContent}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />
    </div>
  );
};