import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useState } from 'react';
import type { NodeKey } from 'lexical';
import styles from '../../RichBlockEditor/RichBlockEditor.module.css';
import { $isImageNode } from './ImageNode';

export interface ImageBlockProps {
  nodeKey: NodeKey;
  src: string;
  altText: string;
  caption: string;
  width?: number;
  height?: number;
}

export function ImageBlock({ nodeKey, src, altText, caption, width, height }: ImageBlockProps) {
  const [editor] = useLexicalComposerContext();
  const [draftCaption, setDraftCaption] = useState(caption);

  const persistCaption = useCallback(
    (value: string) => {
      editor.update(() => {
        const node = editor.getEditorState()._nodeMap.get(nodeKey);
        if (node && $isImageNode(node)) node.setCaption(value);
      });
    },
    [editor, nodeKey],
  );

  return (
    <figure data-lexical-node-key={nodeKey} className={styles.imageFigure}>
      <img
        src={src}
        alt={altText}
        width={width}
        height={height}
        className={styles.imageEl}
        loading="lazy"
      />
      <figcaption className={styles.imageCaption}>
        <input
          type="text"
          value={draftCaption}
          placeholder="Add a caption"
          aria-label="Image caption"
          className={styles.imageCaptionInput}
          onChange={(event) => setDraftCaption(event.target.value)}
          onBlur={() => persistCaption(draftCaption)}
        />
      </figcaption>
    </figure>
  );
}
