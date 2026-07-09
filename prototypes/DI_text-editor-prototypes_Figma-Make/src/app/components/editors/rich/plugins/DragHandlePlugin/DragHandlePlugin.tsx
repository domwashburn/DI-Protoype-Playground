import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getNearestNodeFromDOMNode, $getRoot, type LexicalNode } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../RichBlockEditor/RichBlockEditor.module.css';

interface HandleAnchor {
  top: number;
  height: number;
  nodeKey: string;
}

function findBlockUnderPointer(editorRoot: HTMLElement, clientX: number, clientY: number): HTMLElement | null {
  const rect = editorRoot.getBoundingClientRect();
  if (clientX < rect.left || clientX > rect.right) return null;
  const blocks = Array.from(editorRoot.querySelectorAll<HTMLElement>(':scope > *'));
  for (const block of blocks) {
    const blockRect = block.getBoundingClientRect();
    if (clientY >= blockRect.top && clientY <= blockRect.bottom) return block;
  }
  return null;
}

export function DragHandlePlugin() {
  const [editor] = useLexicalComposerContext();
  const [anchor, setAnchor] = useState<HandleAnchor | null>(null);
  const draggedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const editorRoot = editor.getRootElement();
    if (!editorRoot) return;
    const parent = editorRoot.parentElement;
    if (!parent) return;

    const handleMove = (event: MouseEvent) => {
      const block = findBlockUnderPointer(editorRoot, event.clientX, event.clientY);
      if (!block) {
        setAnchor(null);
        return;
      }
      let nodeKey: string | null = null;
      editor.getEditorState().read(() => {
        const node = $getNearestNodeFromDOMNode(block);
        nodeKey = node?.getKey() ?? null;
      });
      if (!nodeKey) {
        setAnchor(null);
        return;
      }
      const parentRect = parent.getBoundingClientRect();
      const blockRect = block.getBoundingClientRect();
      setAnchor({
        top: blockRect.top - parentRect.top,
        height: blockRect.height,
        nodeKey,
      });
    };

    const handleLeave = (event: MouseEvent) => {
      const nextTarget = event.relatedTarget as Node | null;
      if (nextTarget && parent.contains(nextTarget)) return;
      setAnchor(null);
    };

    parent.addEventListener('mousemove', handleMove);
    parent.addEventListener('mouseleave', handleLeave);
    return () => {
      parent.removeEventListener('mousemove', handleMove);
      parent.removeEventListener('mouseleave', handleLeave);
    };
  }, [editor]);

  const insertBelow = useCallback(
    (nodeKey: string) => {
      editor.update(() => {
        const node = editor.getEditorState()._nodeMap.get(nodeKey) as LexicalNode | undefined;
        if (!node) return;
        const paragraph = $createParagraphNode();
        node.insertAfter(paragraph);
        paragraph.select();
      });
    },
    [editor],
  );

  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLButtonElement>, nodeKey: string) => {
      draggedKeyRef.current = nodeKey;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('application/x-lexical-drag', nodeKey);
    },
    [],
  );

  const onDragEnd = useCallback(() => {
    const draggedKey = draggedKeyRef.current;
    draggedKeyRef.current = null;
    if (!draggedKey) return;
  }, []);

  const onDropTarget = useCallback(
    (event: React.DragEvent, targetKey: string) => {
      event.preventDefault();
      const sourceKey = event.dataTransfer.getData('application/x-lexical-drag');
      if (!sourceKey || sourceKey === targetKey) return;
      editor.update(() => {
        const root = $getRoot();
        const nodes = root.getChildren();
        const source = nodes.find((child) => child.getKey() === sourceKey);
        const target = nodes.find((child) => child.getKey() === targetKey);
        if (!source || !target) return;
        source.remove();
        target.insertAfter(source);
      });
    },
    [editor],
  );

  if (!anchor) return null;

  return (
    <div
      className={styles.dragRail}
      style={{ top: anchor.top, height: anchor.height }}
      aria-hidden="false"
    >
      <button
        type="button"
        aria-label="Insert block below"
        className={styles.dragRailAdd}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => insertBelow(anchor.nodeKey)}
      >
        +
      </button>
      <button
        type="button"
        aria-label="Drag to reorder block"
        className={styles.dragRailHandle}
        draggable
        onDragStart={(event) => onDragStart(event, anchor.nodeKey)}
        onDragEnd={onDragEnd}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => onDropTarget(event, anchor.nodeKey)}
      >
        ⋮⋮
      </button>
    </div>
  );
}
