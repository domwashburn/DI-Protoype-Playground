import { useState, type MouseEvent } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  type EdgeProps,
} from 'reactflow';
import { Add } from '@carbon/icons-react';
import styles from '../DecisionModelCanvas.module.css';
import { PALETTE_TEMPLATES } from '../nodes';
import type { NodePaletteKind } from '../NodeToolbar';
import { routeOrthogonal, type Obstacle } from './orthogonalRouter';

interface NodeBox {
  x: number; y: number; w: number; h: number;
}

export interface DmnEdgeData {
  /** Render with dashed stroke (business-knowledge link). */
  dashed?: boolean;
  /** Called when the user picks a kind from the midpoint "+" popover. */
  onSplit?: (edgeId: string, kind: NodePaletteKind, midpoint: { x: number; y: number }) => void;
  /** Subway-map lane: vertical track centre for vertical flow. */
  centerY?: number;
  /** Subway-map lane: horizontal track centre for horizontal flow. */
  centerX?: number;
  /** Step offset before the elbow (distance from source/target). */
  offset?: number;
  /** Source node bbox (computed by the canvas, passed via data). */
  srcBox?: NodeBox;
  /** Target node bbox (computed by the canvas, passed via data). */
  tgtBox?: NodeBox;
  /** All other node bboxes — obstacles for routing. */
  obstacles?: Obstacle[];
  /** Outgoing-edge count from the source node (for centre-vs-spread). */
  srcOut?: number;
  /** Incoming-edge count to the target node (for centre-vs-spread). */
  tgtIn?: number;
  /** Source node kind — drives insert-palette filtering. */
  srcKind?: 'inputData' | 'decision' | 'businessKnowledge';
  /** Target node kind — drives insert-palette filtering. */
  tgtKind?: 'inputData' | 'decision' | 'businessKnowledge';
  /** True when the target is an *output* decision (cannot emit). */
  tgtIsOutput?: boolean;
  /** Highlight as a drop-target candidate during a connectionless-node drag. */
  dropTarget?: boolean;
  /** Edge participates in a circular reference (rendered red). */
  invalid?: boolean;
}

const PALETTE_ENTRIES = Object.keys(PALETTE_TEMPLATES) as NodePaletteKind[];

const KIND_LABEL: Record<NodePaletteKind, string> = {
  decision: 'Decision',
  inputData: 'Input',
  prediction: 'Prediction',
  function: 'Function',
  generative: 'Generative AI',
};

/**
 * Pick which palette kinds are valid for inserting on this connector.
 *
 * The inserted node N replaces an edge source → target with two new edges
 * source → N → target, so N must be able to *both* receive and emit:
 *   - InputData is output-only → never valid as an insert (cannot receive).
 *   - All other palette kinds (decision, BK variants) can both receive and
 *     emit, so they're allowed regardless of the surrounding context.
 *
 * The src/tgt kind props are wired up for future, more nuanced filtering
 * (e.g. preferring BK chains between BK endpoints) without another rewrite.
 */
function filterInsertKinds(_data: DmnEdgeData | undefined): NodePaletteKind[] {
  return PALETTE_ENTRIES.filter((k) => k !== 'inputData');
}

const EDGE_INSET = 8;

type Axis = 'x' | 'y';

/** Centre of a box along the requested axis. */
function centerOn(box: NodeBox, axis: Axis): number {
  return axis === 'x' ? box.x + box.w / 2 : box.y + box.h / 2;
}

/** Snap an endpoint along `self`'s perpendicular side so it lines up with the
 *  other endpoint's centre, clamped to a small inset from the side ends. */
function alignedOn(self: NodeBox, other: NodeBox, axis: Axis): number {
  const c = centerOn(other, axis);
  const min = axis === 'x' ? self.x + EDGE_INSET : self.y + EDGE_INSET;
  const max = axis === 'x'
    ? self.x + self.w - EDGE_INSET
    : self.y + self.h - EDGE_INSET;
  return Math.max(min, Math.min(max, c));
}

export function DmnEdge(props: EdgeProps<DmnEdgeData>) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    data,
    markerEnd,
  } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Geometry + counts come pre-computed from the canvas memo (via edge data).
  // Reading them here instead of subscribing to the React Flow store inside
  // every edge keeps re-renders bounded.
  const src = data?.srcBox ?? null;
  const tgt = data?.tgtBox ?? null;
  const obstacles = data?.obstacles ?? [];
  const srcOut = data?.srcOut ?? 1;
  const tgtIn = data?.tgtIn ?? 1;

  // Endpoint snap is *axis-aware* per the canvas orientation:
  //   - For BT / TB the handle side is top/bottom, so endpoints span the X
  //     axis along the side (snap X, leave Y at the handle).
  //   - For LR / RL the handle side is left/right, so endpoints span the Y
  //     axis along the side (snap Y, leave X at the handle).
  // Single-connector sides snap to the side centre; multi-connector sides
  // spread aligned to the counterpart's column/row.
  const vertical =
    sourcePosition === Position.Top || sourcePosition === Position.Bottom;
  const axis: Axis = vertical ? 'x' : 'y';
  const snapS = src
    ? srcOut <= 1
      ? centerOn(src, axis)
      : tgt
        ? alignedOn(src, tgt, axis)
        : centerOn(src, axis)
    : null;
  const snapT = tgt
    ? tgtIn <= 1
      ? centerOn(tgt, axis)
      : src
        ? alignedOn(tgt, src, axis)
        : centerOn(tgt, axis)
    : null;
  const sX = vertical ? (snapS ?? sourceX) : sourceX;
  const sY = vertical ? sourceY : (snapS ?? sourceY);
  const tX = vertical ? (snapT ?? targetX) : targetX;
  const tY = vertical ? targetY : (snapT ?? targetY);

  // Pure orthogonal — bend rails get pushed past obstacles. Lane offsets
  // (centerX/centerY) keep parallel routes from collapsing onto each other.
  const [path, labelX, labelY] = routeOrthogonal({
    sourceX: sX,
    sourceY: sY,
    sourcePosition,
    targetX: tX,
    targetY: tY,
    targetPosition,
    obstacles,
    centerX: data?.centerX,
    centerY: data?.centerY,
  });

  // Stroke priority: invalid (red) > drop-target candidate (focus blue) >
  // selected (focus blue) > dashed BK (light grey) > solid (grey). Drop-target
  // highlight uses the same blue as selected but with a thicker stroke so it
  // reads as "land here" while the user is dragging a connectionless node.
  const isDropTarget = !!data?.dropTarget;
  const stroke = data?.invalid
    ? '#da1e28'
    : isDropTarget
      ? 'var(--cds-focus, #0f62fe)'
      : data?.dashed
        ? '#a8a8a8'
        : '#8d8d8d';
  const strokeWidth = isDropTarget ? 2.5 : selected ? 2 : 1.25;
  const className = [
    selected ? styles.dmnEdgePathSelected : styles.dmnEdgePath,
    isDropTarget ? styles.dmnEdgeDropTarget : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handlePlus = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPopoverOpen((open) => !open);
  };

  const handlePick = (kind: NodePaletteKind) => {
    setPopoverOpen(false);
    data?.onSplit?.(id, kind, { x: labelX, y: labelY });
  };

  // The "+" insert affordance only appears when the edge is hovered or
  // selected (or its popover is open) — never as ambient chrome.
  const showPlus = hovered || selected || popoverOpen;

  return (
    <>
      {/* Wider invisible hit-strip beneath the visible stroke catches hover
          events along the full route — a 1.25 px line is too thin to grab. */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        pointerEvents="stroke"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke,
          strokeWidth,
          strokeDasharray: data?.dashed ? '3 3' : undefined,
        }}
        className={className}
      />
      {showPlus && (
        <EdgeLabelRenderer>
          <div
            className={styles.dmnEdgeLabel}
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              type="button"
              aria-label="Insert node on connector"
              className={styles.dmnEdgePlus}
              onClick={handlePlus}
            >
              <Add size={16} />
            </button>
            {popoverOpen && (
              <div role="menu" className={styles.dmnEdgePopover}>
                {filterInsertKinds(data).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    role="menuitem"
                    className={styles.dmnEdgePopoverItem}
                    onClick={() => handlePick(kind)}
                  >
                    {KIND_LABEL[kind]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const dmnEdgeTypes = { dmn: DmnEdge };
