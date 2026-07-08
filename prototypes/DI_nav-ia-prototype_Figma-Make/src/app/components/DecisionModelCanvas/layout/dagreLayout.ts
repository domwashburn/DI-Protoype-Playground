import dagre from 'dagre';
import type { Edge, Node } from 'reactflow';

export type LayoutOrientation = 'TB' | 'BT' | 'LR' | 'RL';

const DEFAULT_NODE_WIDTH = 160;
const DEFAULT_NODE_HEIGHT = 60;

export interface RelayoutOptions {
  orientation: LayoutOrientation;
  /** Map of measured node sizes by id (from ReactFlow nodeInternals). */
  measured?: Map<string, { width?: number | null; height?: number | null }>;
  ranksep?: number;
  nodesep?: number;
  edgesep?: number;
}

/**
 * Run a hierarchical (dagre) layout over the given nodes/edges and return a
 * shallow-copied node array with new positions. Source/target handle pairs are
 * adjusted to point along the layout direction so connectors enter/exit the
 * correct sides.
 */
export function relayout<T = unknown>(
  nodes: Node<T>[],
  edges: Edge[],
  options: RelayoutOptions,
): Node<T>[] {
  const {
    orientation,
    measured,
    // Bumped ranksep so each inter-rank corridor has room for a lane band
    // (subway-map style). 120 px fits ≥5 lanes at 14 px stride with 15 px
    // stubs reserved on each side.
    ranksep = 120,
    nodesep = 56,
    edgesep = 16,
  } = options;

  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: orientation, ranksep, nodesep, edgesep });

  for (const node of nodes) {
    const m = measured?.get(node.id);
    const dagreNode: {
      width: number;
      height: number;
      rank?: 'min' | 'max' | 'same' | 'source' | 'sink';
    } = {
      width: m?.width ?? DEFAULT_NODE_WIDTH,
      height: m?.height ?? DEFAULT_NODE_HEIGHT,
    };
    // Pin InputData to dagre's "min" rank so every input sits on the same
    // row by default, regardless of how deep its consumer is in the tree.
    // For rankdir BT this is the bottom row; TB top; LR left; RL right.
    if (node.type === 'inputData') {
      dagreNode.rank = 'min';
    }
    g.setNode(node.id, dagreNode);
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target, {}, edge.id);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const layoutNode = g.node(node.id);
    if (!layoutNode) return node;
    const m = measured?.get(node.id);
    const w = m?.width ?? DEFAULT_NODE_WIDTH;
    const h = m?.height ?? DEFAULT_NODE_HEIGHT;
    return {
      ...node,
      position: { x: layoutNode.x - w / 2, y: layoutNode.y - h / 2 },
    };
  });
}

/**
 * Snap a manually-positioned node onto the nearest dagre rank/column line for
 * the given orientation. Operates on the centre coordinate of the moved node.
 */
export function snapToRanks(
  nodes: Node[],
  movedId: string,
  orientation: LayoutOrientation,
  measured?: Map<string, { width?: number | null; height?: number | null }>,
): { x: number; y: number } | null {
  const moved = nodes.find((n) => n.id === movedId);
  if (!moved) return null;
  const others = nodes.filter((n) => n.id !== movedId);
  if (others.length === 0) return moved.position;

  const m = measured?.get(movedId);
  const mw = m?.width ?? DEFAULT_NODE_WIDTH;
  const mh = m?.height ?? DEFAULT_NODE_HEIGHT;
  const cx = moved.position.x + mw / 2;
  const cy = moved.position.y + mh / 2;

  let nearestX: number | null = null;
  let bestDistX = Infinity;
  let nearestY: number | null = null;
  let bestDistY = Infinity;

  // Snap to other node centers (both rows and columns)
  for (const other of others) {
    const om = measured?.get(other.id);
    const ow = om?.width ?? DEFAULT_NODE_WIDTH;
    const oh = om?.height ?? DEFAULT_NODE_HEIGHT;
    const ocx = other.position.x + ow / 2;
    const ocy = other.position.y + oh / 2;

    const distX = Math.abs(cx - ocx);
    if (distX < bestDistX) {
      bestDistX = distX;
      nearestX = ocx;
    }

    const distY = Math.abs(cy - ocy);
    if (distY < bestDistY) {
      bestDistY = distY;
      nearestY = ocy;
    }
  }

  // Also try snapping to dagre rank distances (if we can infer them)
  // For now, snapping strictly to other node alignments is usually what users want.

  const SNAP_THRESHOLD = 24;
  
  const finalX = nearestX != null && bestDistX < SNAP_THRESHOLD ? nearestX - mw / 2 : moved.position.x;
  const finalY = nearestY != null && bestDistY < SNAP_THRESHOLD ? nearestY - mh / 2 : moved.position.y;

  if (finalX === moved.position.x && finalY === moved.position.y) {
    return moved.position;
  }

  return { x: finalX, y: finalY };
}

