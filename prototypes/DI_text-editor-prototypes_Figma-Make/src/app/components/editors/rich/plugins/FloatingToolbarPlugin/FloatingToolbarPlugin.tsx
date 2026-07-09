import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';
import styles from '../../RichBlockEditor/RichBlockEditor.module.css';

export function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => editor.registerUpdateListener(({ editorState }) => {
    editorState.read(() => {
      const selection = $getSelection();
      setVisible($isRangeSelection(selection) && !selection.isCollapsed());
    });
  }), [editor]);

  if (!visible) return null;

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Text formatting">
      <button className={styles.toolbarButton} type="button" onMouseDown={(event) => { event.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'); }}>Bold</button>
      <button className={styles.toolbarButton} type="button" onMouseDown={(event) => { event.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'); }}>Italic</button>
      <button className={styles.toolbarButton} type="button" onMouseDown={(event) => { event.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'); }}>Underline</button>
      <button className={styles.toolbarButton} type="button" onMouseDown={(event) => { event.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code'); }}>Code</button>
    </div>
  );
}
