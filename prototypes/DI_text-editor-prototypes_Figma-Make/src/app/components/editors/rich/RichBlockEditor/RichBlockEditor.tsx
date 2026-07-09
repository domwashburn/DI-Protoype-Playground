import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $convertFromMarkdownString } from '@lexical/markdown';
import type { EditorState, LexicalEditor } from 'lexical';
import { createRichBlockEditorConfig } from './config';
import styles from './RichBlockEditor.module.css';
import type { RichBlockEditorProps } from '../types';
import { useBlockEditor } from '../hooks/useBlockEditor';
import { richMarkdownTransformers, serializeEditorToMarkdown } from '../serializers/markdown';
import { SlashCommandPlugin } from '../plugins/SlashCommandPlugin';
import { FloatingToolbarPlugin } from '../plugins/FloatingToolbarPlugin';
import { DragHandlePlugin } from '../plugins/DragHandlePlugin';

function Placeholder({ children }: { children: string }) {
  return <div className={styles.placeholder}>{children}</div>;
}

function buildInitialEditorState(initialContent?: string) {
  if (!initialContent) return undefined;
  return (editor: LexicalEditor) => {
    editor.update(() => {
      if (initialContent.trim().startsWith('{')) {
        const parsed = editor.parseEditorState(initialContent);
        editor.setEditorState(parsed);
        return;
      }
      $convertFromMarkdownString(initialContent, richMarkdownTransformers);
    });
  };
}

export function RichBlockEditor({
  initialContent,
  mode = 'rich',
  placeholder = 'Start writing, or type / for blocks',
  readOnly = false,
  onChange,
}: RichBlockEditorProps) {
  const { blocks, isMarkdownMode } = useBlockEditor(mode);
  const config = {
    ...createRichBlockEditorConfig(`RichBlockEditor-${mode}`, !readOnly),
    editorState: buildInitialEditorState(initialContent),
  };

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (!onChange) return;
    editorState.read(() => {
      onChange({
        html: $generateHtmlFromNodes(editor),
        markdown: serializeEditorToMarkdown(),
        json: JSON.stringify(editorState.toJSON()),
      });
    });
  };

  return (
    <section className={styles.shell} aria-label={isMarkdownMode ? 'Markdown block editor' : 'Rich block editor'}>
      <header className={styles.header}>
        <h2 className={styles.title}>Lexical block editor foundation</h2>
        <span className={styles.modeBadge}>{isMarkdownMode ? 'Markdown-compatible subset' : 'Rich block mode'}</span>
      </header>
      <LexicalComposer initialConfig={config}>
        <div className={styles.editorFrame}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.editor} aria-label="Document editor" />}
            placeholder={<Placeholder>{placeholder}</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <MarkdownShortcutPlugin transformers={richMarkdownTransformers} />
          <TablePlugin hasCellMerge hasCellBackgroundColor />
          <OnChangePlugin onChange={handleChange} />
          <SlashCommandPlugin blocks={blocks} />
          <FloatingToolbarPlugin />
          <DragHandlePlugin />
        </div>
      </LexicalComposer>
    </section>
  );
}
