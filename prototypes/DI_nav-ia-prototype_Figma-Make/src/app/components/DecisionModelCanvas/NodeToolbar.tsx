import type { DragEvent, MouseEvent } from 'react';
import { Tooltip } from '@carbon/react';
import styles from './DecisionModelCanvas.module.css';

/**
 * Palette of DMN node kinds the user can drop onto the canvas.
 * `kind` + `variant` map to entries in `dmnNodeTypes` / `DmnNodeData`.
 */
export type NodePaletteKind =
  | 'decision'
  | 'inputData'
  | 'prediction'
  | 'function'
  | 'generative';

export const NODE_DRAG_MIME = 'application/x-dmn-node-kind';

interface PaletteItem {
  kind: NodePaletteKind;
  label: string;
  icon: JSX.Element;
}

const PALETTE: PaletteItem[] = [
  {
    kind: 'decision',
    label: 'Add decision',
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M14,1 C14.5522847,1 15,1.52233446 15,2.16666667 L15,13.8333333 C15,14.4776655 14.5522847,15 14,15 L2,15 C1.44771525,15 1,14.4776655 1,13.8333333 L1,2.16666667 C1,1.52233446 1.44771525,1 2,1 L14,1 Z M12.2285714,9 L4,9 L4,10.0285714 L12.2285714,10.0285714 L12.2285714,9 Z M10.1714286,6 L4,6 L4,7.02857143 L10.1714286,7.02857143 L10.1714286,6 Z"
          fill="#97C1FF"
        />
      </svg>
    ),
  },
  {
    kind: 'inputData',
    label: 'Add input',
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M11.2,7 C10.6319357,7 10.1714286,7.46050712 10.1714286,8.02857143 C10.1714286,8.59663575 10.6319357,9.05714286 11.2,9.05714286 C11.7680644,9.05714286 12.2285715,8.59663575 12.2285715,8.02857143 C12.2285715,7.46050712 11.7680644,7 11.2,7 Z M8.11428572,7 C7.5462214,7 7.08571429,7.46050712 7.08571429,8.02857143 C7.08571429,8.59663575 7.5462214,9.05714286 8.11428572,9.05714286 C8.68235004,9.05714286 9.14285715,8.59663575 9.14285715,8.02857143 C9.14285715,7.46050712 8.68235004,7 8.11428572,7 Z M5.02857143,7 C4.46050712,7 4,7.46050712 4,8.02857143 C4,8.59663575 4.46050712,9.05714286 5.02857143,9.05714286 C5.59663575,9.05714286 6.05714286,8.59663575 6.05714286,8.02857143 C6.05714286,7.46050712 5.59663575,7 5.02857143,7 Z"
          fill="#72E090"
        />
      </svg>
    ),
  },
  {
    kind: 'prediction',
    label: 'Add prediction',
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 14.8571C0 15.5935 0.511675 16 1.14286 16H11L16 12V1.14286C16 0.406477 15.4883 0 14.8571 0L5 0L0 4L0 14.8571Z"
          fill="#E8DAFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 12H6V4H9C9.55229 4 10 4.51167 10 5.14286V8C10 8.63118 9.55229 9.14286 9 9.14286H7V12ZM7 8H9V5.14286H7V8Z"
          fill="#525252"
        />
      </svg>
    ),
  },
  {
    kind: 'function',
    label: 'Add function',
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M14,1 C14.5128358,1 14.9355072,1.30667273 14.9932723,1.86637156 L15,2 L15,11 L11,15 L2,15 C1.48716416,15 1.06449284,14.6933273 1.00672773,14.1336284 L1,14 L1,5 L5,1 L14,1 Z M11.2857143,7.14285714 C10.71765,7.14285714 10.2571429,7.60336425 10.2571429,8.17142857 C10.2571429,8.73949288 10.71765,9.2 11.2857143,9.2 C11.8537786,9.2 12.3142858,8.73949288 12.3142858,8.17142857 C12.3142858,7.60336425 11.8537786,7.14285714 11.2857143,7.14285714 Z M8.2,7.14285714 C7.63193568,7.14285714 7.17142857,7.60336425 7.17142857,8.17142857 C7.17142857,8.73949288 7.63193568,9.2 8.2,9.2 C8.76806432,9.2 9.22857143,8.73949288 9.22857143,8.17142857 C9.22857143,7.60336425 8.76806432,7.14285714 8.2,7.14285714 Z M5.11428571,7.14285714 C4.5462214,7.14285714 4.08571428,7.60336425 4.08571428,8.17142857 C4.08571428,8.73949288 4.5462214,9.2 5.11428571,9.2 C5.68235003,9.2 6.14285714,8.73949288 6.14285714,8.17142857 C6.14285714,7.60336425 5.68235003,7.14285714 5.11428571,7.14285714 Z"
          fill="#4DDFDD"
        />
      </svg>
    ),
  },
  {
    kind: 'generative',
    label: 'Add Generative AI',
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M14,1 C14.5128358,1 14.9355072,1.30667273 14.9932723,1.86637156 L15,2 L15,11 L11,15 L2,15 C1.48716416,15 1.06449284,14.6933273 1.00672773,14.1336284 L1,14 L1,5 L5,1 L14,1 Z M11.2857143,7.14285714 C10.71765,7.14285714 10.2571429,7.60336425 10.2571429,8.17142857 C10.2571429,8.73949288 10.71765,9.2 11.2857143,9.2 C11.8537786,9.2 12.3142858,8.73949288 12.3142858,8.17142857 C12.3142858,7.60336425 11.8537786,7.14285714 11.2857143,7.14285714 Z M8.2,7.14285714 C7.63193568,7.14285714 7.17142857,7.60336425 7.17142857,8.17142857 C7.17142857,8.73949288 7.63193568,9.2 8.2,9.2 C8.76806432,9.2 9.22857143,8.73949288 9.22857143,8.17142857 C9.22857143,7.60336425 8.76806432,7.14285714 8.2,7.14285714 Z M5.11428571,7.14285714 C4.5462214,7.14285714 4.08571428,7.60336425 4.08571428,8.17142857 C4.08571428,8.73949288 4.5462214,9.2 5.11428571,9.2 C5.68235003,9.2 6.14285714,8.73949288 6.14285714,8.17142857 C6.14285714,7.60336425 5.68235003,7.14285714 5.11428571,7.14285714 Z"
          fill="#fddc69"
        />
      </svg>
    ),
  },
];

interface NodeToolbarProps {
  onAdd: (kind: NodePaletteKind) => void;
}

export function NodeToolbar({ onAdd }: NodeToolbarProps) {
  const handleDragStart = (kind: NodePaletteKind) => (event: DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData(NODE_DRAG_MIME, kind);
    event.dataTransfer.effectAllowed = 'copy';
  };
  const handleClick = (kind: NodePaletteKind) => (_event: MouseEvent<HTMLButtonElement>) => {
    onAdd(kind);
  };
  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Add nodes">
      {PALETTE.map((item) => (
        <Tooltip key={item.kind} label={item.label} align="right" enterDelayMs={150}>
          <button
            type="button"
            className={styles.toolButton}
            aria-label={item.label}
            draggable
            onDragStart={handleDragStart(item.kind)}
            onClick={handleClick(item.kind)}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
