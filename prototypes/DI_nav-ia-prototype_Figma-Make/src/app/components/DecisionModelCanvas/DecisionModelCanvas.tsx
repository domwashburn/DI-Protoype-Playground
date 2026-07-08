import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  type Connection,
  type Edge,
  type EdgeChange,
  type EdgeMouseHandler,
  getNodesBounds,
  MarkerType,
  type Node,
  type NodeChange,
  type NodeMouseHandler,
  Position,
  ReactFlowProvider,
  useKeyPress,
  useReactFlow,
  useStore,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasOverlays, CanvasViewControls } from './CanvasOverlays';
import { NodeToolbar, NODE_DRAG_MIME, type NodePaletteKind } from './NodeToolbar';
import { dmnNodeTypes, PALETTE_TEMPLATES, makePaletteNode, type DmnNodeData } from './nodes';
import {
  assignEdgeLanes,
  dmnEdgeTypes,
  findCycleEdgeIds,
  findEdgeNear,
  hasPath,
  type DmnEdgeData,
} from './edges';
import { OrientationProvider, SIDE_FOR_ORIENTATION } from './OrientationContext';
import {
  relayout,
  snapToRanks,
  type LayoutOrientation,
} from './layout';
import { findFreeSpot } from './layout';
import { useGraphHistory } from './hooks';
import styles from './DecisionModelCanvas.module.css';

const INITIAL_MAX_ZOOM = 1;
const FIT_PADDING = 0.2;
const FIT_DURATION_MS = 320;
const RECENTER_FIT_THRESHOLD = 0.92;
const ORIENTATION_CYCLE: LayoutOrientation[] = ['BT', 'TB', 'LR', 'RL'];

export interface DecisionModelCanvasProps {
  nodes: Node<DmnNodeData>[];
  edges: Edge[];
  onNodeSelect?: (node: Node<DmnNodeData> | null) => void;
  onEdgeSelect?: (edge: Edge | null) => void;
  panelOpen?: boolean;
  panelWidth?: number;
}

function CanvasInner({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeSelect,
  onEdgeSelect,
  panelOpen = false,
  panelWidth = 320,
}: DecisionModelCanvasProps) {
  const flow = useReactFlow();
  const containerWidth = useStore((s) => s.width);
  const containerHeight = useStore((s) => s.height);
  const nodeInternals = useStore((s) => s.nodeInternals);
  const allMeasured = useStore((s) =>
    s.nodeInternals.size > 0 &&
    Array.from(s.nodeInternals.values()).every((n) => n.width != null && n.height != null),
  );

  // Editor state — owned by the canvas; props seed initial data only.
  const [nodes, setNodes] = useState<Node<DmnNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge<DmnEdgeData>[]>(initialEdges as Edge<DmnEdgeData>[]);
  const [orientation, setOrientation] = useState<LayoutOrientation>('BT');
  // Edge currently highlighted as a drop target while a connectionless node
  // is being dragged over it. Cleared on drag end (whether we split or not).
  const [hoveredDropEdgeId, setHoveredDropEdgeId] = useState<string | null>(null);
  // Auto-pan when dragging a node toward the viewport edge. Off by default —
  // can be disorienting; users opt in via the canvas controls. When ON we
  // also lower autoPanSpeed so the pan is gentle rather than a snap.
  const [autoPanOnDrag, setAutoPanOnDrag] = useState(false);
  const history = useGraphHistory<DmnNodeData>();

  const didInitRef = useRef(false);
  const didInitialLayoutRef = useRef(false);
  const prevPanelOpenRef = useRef(panelOpen);
  const panRafRef = useRef<number | null>(null);
  const layoutRafRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);


  const measuredSizes = useMemo(() => {
    const map = new Map<string, { width?: number | null; height?: number | null }>();
    nodeInternals.forEach((n, id) => map.set(id, { width: n.width, height: n.height }));
    return map;
  }, [nodeInternals]);

  /* ------------------------------------------------------------------ */
  /* Pan / fit helpers (preserved from prior canvas)                     */
  /* ------------------------------------------------------------------ */

  const panTo = useCallback(
    (targetX: number, targetY: number, durationMs = FIT_DURATION_MS) => {
      if (panRafRef.current != null) cancelAnimationFrame(panRafRef.current);
      const start = flow.getViewport();
      const startTime = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / durationMs);
        const k = ease(t);
        flow.setViewport({
          x: start.x + (targetX - start.x) * k,
          y: start.y + (targetY - start.y) * k,
          zoom: start.zoom,
        });
        if (t < 1) panRafRef.current = requestAnimationFrame(tick);
        else panRafRef.current = null;
      };
      panRafRef.current = requestAnimationFrame(tick);
    },
    [flow],
  );

  useEffect(() => {
    return () => {
      if (panRafRef.current != null) cancelAnimationFrame(panRafRef.current);
      if (layoutRafRef.current != null) cancelAnimationFrame(layoutRafRef.current);
      // Drag sample map is keyed off node ids; clear on unmount so a remount
      // (e.g. tab switch back to the canvas) starts fresh.
      dragSamplesRef.current.clear();
    };
  }, []);

  const isGraphMostlyVisible = useCallback(
    (zoom: number, visibleWidth: number, visibleHeight: number) => {
      if (nodeInternals.size === 0) return true;
      const measuredNodes = Array.from(nodeInternals.values()) as Node[];
      const bounds = getNodesBounds(measuredNodes);
      const wRatio = (bounds.width * zoom) / visibleWidth;
      const hRatio = (bounds.height * zoom) / visibleHeight;
      return wRatio <= RECENTER_FIT_THRESHOLD && hRatio <= RECENTER_FIT_THRESHOLD;
    },
    [nodeInternals],
  );

  // Fit / panel-toggle pan, identical to prior behavior.
  useEffect(() => {
    if (!containerWidth || !containerHeight) return;
    if (nodeInternals.size === 0 || !allMeasured) return;

    const togglingPanel = didInitRef.current && prevPanelOpenRef.current !== panelOpen;

    if (togglingPanel) {
      prevPanelOpenRef.current = panelOpen;
      const vp = flow.getViewport();
      const postToggleVisibleWidth = Math.max(
        containerWidth - (panelOpen ? panelWidth : 0),
        1,
      );
      if (isGraphMostlyVisible(vp.zoom, postToggleVisibleWidth, containerHeight)) return;
      const delta = panelOpen ? -panelWidth / 2 : panelWidth / 2;
      panTo(vp.x + delta, vp.y);
      return;
    }

    const offsetRight = panelOpen ? panelWidth : 0;
    const visibleWidth = Math.max(containerWidth - offsetRight, 1);
    const measuredNodes = Array.from(nodeInternals.values()) as Node[];
    const bounds = getNodesBounds(measuredNodes);
    if (bounds.width === 0 || bounds.height === 0) return;
    const padFactor = 1 + FIT_PADDING * 2;
    const zoom = Math.min(
      INITIAL_MAX_ZOOM,
      visibleWidth / (bounds.width * padFactor),
      containerHeight / (bounds.height * padFactor),
    );
    const cx = bounds.x + bounds.width / 2;
    const cy = bounds.y + bounds.height / 2;
    const x = (containerWidth - offsetRight) / 2 - cx * zoom;
    const y = containerHeight / 2 - cy * zoom;
    flow.setViewport(
      { x, y, zoom },
      { duration: didInitRef.current ? FIT_DURATION_MS : 0 },
    );
    didInitRef.current = true;
    prevPanelOpenRef.current = panelOpen;
  }, [panelOpen, panelWidth, containerWidth, containerHeight, nodeInternals, allMeasured, flow, panTo, isGraphMostlyVisible]);

  /* ------------------------------------------------------------------ */
  /* Auto-layout on structural change                                    */
  /* ------------------------------------------------------------------ */

  // Animate from current node positions to dagre-computed positions over
  // FIT_DURATION_MS using the project's expressive curve (easeOutCubic feel).
  const animateToPositions = useCallback(
    (targets: Map<string, { x: number; y: number }>) => {
      if (layoutRafRef.current != null) cancelAnimationFrame(layoutRafRef.current);
      const startTime = performance.now();
      const startPositions = new Map<string, { x: number; y: number }>();
      setNodes((current) => {
        current.forEach((n) => startPositions.set(n.id, { ...n.position }));
        return current;
      });
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / FIT_DURATION_MS);
        const k = ease(t);
        setNodes((current) =>
          current.map((n) => {
            const start = startPositions.get(n.id);
            const target = targets.get(n.id);
            if (!start || !target) return n;
            return {
              ...n,
              position: {
                x: start.x + (target.x - start.x) * k,
                y: start.y + (target.y - start.y) * k,
              },
            };
          }),
        );
        if (t < 1) layoutRafRef.current = requestAnimationFrame(tick);
        else layoutRafRef.current = null;
      };
      layoutRafRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  // Build a stable structural signature so the layout effect only fires when
  // the graph's topology changes — not on every drag / selection / dimension.
  const structuralKey = useMemo(() => {
    const nodeKey = nodes.map((n) => `${n.id}:${n.type ?? ''}`).sort().join('|');
    const edgeKey = edges.map((e) => `${e.source}>${e.target}:${e.id}`).sort().join('|');
    return `${nodeKey}::${edgeKey}::${orientation}`;
  }, [nodes, edges, orientation]);

  // Track which node ids existed at the previous layout pass *and* the
  // orientation in effect last time. Used to distinguish "first layout" /
  // "orientation switch" (full dagre re-arrangement) from "node added or
  // edge re-wired" (preserve every existing position; only collision-resolve
  // new nodes).
  const prevLaidOutIdsRef = useRef<Set<string>>(new Set());
  const prevOrientationRef = useRef<LayoutOrientation | null>(null);

  useEffect(() => {
    if (!allMeasured) return;
    if (nodes.length === 0) return;

    const orientationChanged = prevOrientationRef.current !== orientation;
    const isInitial = !didInitialLayoutRef.current;

    // Map of current real positions by id (where things actually are now).
    const currentPos = new Map<string, { x: number; y: number }>();
    nodes.forEach((n) => currentPos.set(n.id, n.position));

    if (isInitial || orientationChanged) {
      // Full dagre layout: only fires on the first pass and on orientation
      // changes (where the geometry must change axis). Other structural
      // changes intentionally skip this branch so manual placements stick.
      const laidOut = relayout(nodes, edges, { orientation, measured: measuredSizes });
      const dagrePos = new Map<string, { x: number; y: number }>();
      laidOut.forEach((n) => dagrePos.set(n.id, n.position));

      if (isInitial) {
        // Snap immediately on the very first pass — no tween for seed data.
        setNodes((curr) =>
          curr.map((n) => {
            const t = dagrePos.get(n.id);
            return t ? { ...n, position: t } : n;
          }),
        );
        didInitialLayoutRef.current = true;
      } else {
        // Orientation rotated: animate every node to its new dagre slot.
        animateToPositions(dagrePos);
      }
      prevLaidOutIdsRef.current = new Set(nodes.map((n) => n.id));
      prevOrientationRef.current = orientation;
      return;
    }

    // Pure structural change (split, palette drop, new connection, etc.):
    // run dagre to compute the *ideal* arrangement, then anchor the result
    // into the existing tree's coordinate frame so the diagram doesn't fly
    // off. Existing nodes keep their current real position (they don't move
    // with the gentle reflow); new nodes inherit the dagre-derived rank slot
    // translated into the same frame, then pass through findFreeSpot to
    // resolve collisions with existing siblings.
    const laidOut = relayout(nodes, edges, { orientation, measured: measuredSizes });
    const dagrePos = new Map<string, { x: number; y: number }>();
    laidOut.forEach((n) => dagrePos.set(n.id, n.position));

    // Centroid translation: mean displacement between dagre's idealized
    // positions and the current positions of nodes that already exist. Using
    // the mean (not the first matching node) keeps the translation stable
    // under small per-edit shifts.
    const prevIds = prevLaidOutIdsRef.current;
    let dx = 0;
    let dy = 0;
    let anchored = 0;
    for (const node of nodes) {
      if (!prevIds.has(node.id)) continue;
      const d = dagrePos.get(node.id);
      if (!d) continue;
      dx += node.position.x - d.x;
      dy += node.position.y - d.y;
      anchored += 1;
    }
    if (anchored > 0) {
      dx /= anchored;
      dy /= anchored;
    }

    const targets = new Map<string, { x: number; y: number }>();
    for (const node of nodes) {
      if (prevIds.has(node.id)) {
        // Existing nodes don't move — preserve their current position so the
        // diagram doesn't shuffle on every edit.
        targets.set(node.id, node.position);
        continue;
      }
      const d = dagrePos.get(node.id);
      const placed = d
        ? { x: d.x + dx, y: d.y + dy }
        : node.position;
      const m = measuredSizes.get(node.id);
      const free = findFreeSpot(
        placed,
        { width: m?.width ?? 160, height: m?.height ?? 60 },
        nodes.map((n) => {
          const p = targets.get(n.id) ?? n.position;
          return { ...n, position: p };
        }),
        measuredSizes,
        orientation,
      );
      targets.set(node.id, free);
    }

    prevLaidOutIdsRef.current = new Set(nodes.map((n) => n.id));
    prevOrientationRef.current = orientation;

    // Animate only the nodes whose target differs (effectively just the new
    // ones — existing nodes have target == current).
    animateToPositions(targets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structuralKey, allMeasured]);

  /* ------------------------------------------------------------------ */
  /* React Flow handlers                                                 */
  /* ------------------------------------------------------------------ */

  // Velocity-aware drag snap. Per-node we keep a smoothed (EMA) speed; snap
  // engages once the smoothed speed falls below ENGAGE_SPEED, and disengages
  // again only after speed climbs above DISENGAGE_SPEED. Using an EMA + the
  // hysteresis band gives a momentum-feel: a flick stays free while it has
  // momentum, then locks to the grid as the gesture decays. A truly slow
  // drag also stays snapped from the start (since the EMA never crosses the
  // engage threshold).
  type DragSample = { x: number; y: number; t: number; vAvg: number; snapped: boolean };
  const dragSamplesRef = useRef<Map<string, DragSample>>(new Map());

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    const ENGAGE_SPEED = 0.4;     // px/ms (~400 px/s) — fall below to start snapping
    const DISENGAGE_SPEED = 0.65; // px/ms — must exceed to break free again
    const ALPHA = 0.35;           // EMA weight on the newest sample
    const GRID = 16;
    const snap = (v: number) => Math.round(v / GRID) * GRID;

    const transformed = changes.map((change) => {
      if (change.type !== 'position' || !('position' in change) || !change.position) return change;
      const id = change.id;
      // Drag finished: clear sample; final rank-snap takes over.
      if (change.dragging === false) {
        dragSamplesRef.current.delete(id);
        return change;
      }
      if (change.dragging !== true) return change;

      const now = performance.now();
      const prev = dragSamplesRef.current.get(id);
      const next = change.position;
      // First frame of a drag: no prior sample. Engage snap immediately so a
      // slow careful drag latches from the first move.
      if (!prev) {
        dragSamplesRef.current.set(id, { x: next.x, y: next.y, t: now, vAvg: 0, snapped: true });
        return { ...change, position: { x: snap(next.x), y: snap(next.y) } };
      }
      const dt = Math.max(1, now - prev.t);
      const dist = Math.hypot(next.x - prev.x, next.y - prev.y);
      const instSpeed = dist / dt;
      const vAvg = ALPHA * instSpeed + (1 - ALPHA) * prev.vAvg;
      // Hysteresis: only flip snapped state at the right band edge.
      let snapped = prev.snapped;
      if (snapped && vAvg > DISENGAGE_SPEED) snapped = false;
      else if (!snapped && vAvg < ENGAGE_SPEED) snapped = true;
      dragSamplesRef.current.set(id, { x: next.x, y: next.y, t: now, vAvg, snapped });
      if (snapped) {
        return { ...change, position: { x: snap(next.x), y: snap(next.y) } };
      }
      return change;
    });

    setNodes((curr) => applyNodeChanges(transformed, curr));
  }, []);

  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((curr) => applyEdgeChanges(changes, curr));
  }, []);

  const handleConnect = useCallback(
    (params: Connection) => {
      history.push({ nodes, edges });
      setEdges((curr) =>
        addEdge(
          {
            ...params,
            id: `e_${params.source}_${params.target}_${Date.now()}`,
            type: 'dmn',
            data: { dashed: false },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#8d8d8d', width: 10, height: 10 },
          },
          curr,
        ) as Edge<DmnEdgeData>[],
      );
    },
    [history, nodes, edges],
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      onNodeSelect?.(node as Node<DmnNodeData>);
      if (!containerWidth || !containerHeight) return;
      const offsetRight = panelOpen ? panelWidth : 0;
      const visibleWidth = Math.max(containerWidth - offsetRight, 1);
      const vp = flow.getViewport();
      if (isGraphMostlyVisible(vp.zoom, visibleWidth, containerHeight)) return;
      const measured = nodeInternals.get(node.id);
      const w = measured?.width ?? 0;
      const h = measured?.height ?? 0;
      const cx = node.position.x + w / 2;
      const cy = node.position.y + h / 2;
      const targetX = (containerWidth - offsetRight) / 2 - cx * vp.zoom;
      const targetY = containerHeight / 2 - cy * vp.zoom;
      panTo(targetX, targetY);
    },
    [
      onNodeSelect,
      nodeInternals,
      panelOpen,
      panelWidth,
      containerWidth,
      containerHeight,
      flow,
      panTo,
      isGraphMostlyVisible,
    ],
  );

  const handleEdgeClick: EdgeMouseHandler = useCallback(
    (_event, edge) => {
      onEdgeSelect?.(edge);
    },
    [onEdgeSelect],
  );

  const handlePaneClick = useCallback(() => {
    onNodeSelect?.(null);
    onEdgeSelect?.(null);
  }, [onNodeSelect, onEdgeSelect]);

  // While a connectionless node drags, hit-test against the edges and update
  // the highlighted "drop target" id. Skipped for nodes that already have a
  // connection (only orphan nodes can split an edge by drop).
  const handleNodeDrag: NodeMouseHandler = useCallback(
    (_event, node) => {
      const hasConnection = edges.some((e) => e.source === node.id || e.target === node.id);
      if (hasConnection) {
        if (hoveredDropEdgeId !== null) setHoveredDropEdgeId(null);
        return;
      }
      const m = measuredSizes.get(node.id);
      const w = m?.width ?? 160;
      const h = m?.height ?? 60;
      const center = { x: node.position.x + w / 2, y: node.position.y + h / 2 };
      // Tolerance scales with half the node's smaller dimension so any part
      // of the dragged node body overlapping the edge counts as a hover —
      // dropping feels forgiving instead of requiring pixel-perfect aim.
      const tolerance = Math.max(32, Math.min(w, h) / 2 + 8);
      const hit = findEdgeNear(center, edges, nodes, measuredSizes, tolerance, 32, orientation);
      const nextId = hit?.id ?? null;
      if (nextId !== hoveredDropEdgeId) setHoveredDropEdgeId(nextId);
    },
    [edges, nodes, measuredSizes, orientation, hoveredDropEdgeId],
  );

  // Drag end:
  //  1. If the dragged node was hovering a drop-target edge AND has zero
  //     connections AND the resulting split is valid — split the edge: remove
  //     it, create source→node and node→target, and place the node into the
  //     inter-rank "level" so the auto-layout doesn't have to re-rank it
  //     from scratch and the diagram stays readable.
  //  2. Otherwise snap onto the nearest rank line so manual placement stays
  //     aligned with the auto-layout grid.
  const handleNodeDragStop: NodeMouseHandler = useCallback(
    (_event, node) => {
      const dropEdgeId = hoveredDropEdgeId;
      setHoveredDropEdgeId(null);

      const hasConnection = edges.some((e) => e.source === node.id || e.target === node.id);

      if (dropEdgeId && !hasConnection) {
        const E = edges.find((e) => e.id === dropEdgeId);
        // Validation for split (connectionless node N replaces edge S→T with
        // S→N and N→T). Cycle/duplicate are impossible because N has zero
        // existing edges. The remaining checks:
        //   - N must be able to receive (not InputData).
        //   - N must be able to emit  (not an output Decision).
        // S→T already existed and was valid, so S can emit and T can receive.
        const draggedData = node.data as DmnNodeData | undefined;
        const canReceive = node.type !== 'inputData';
        const canEmit = !(node.type === 'decision' && !!draggedData?.output);

        if (E && canReceive && canEmit) {
          // Rank-level placement: drop into the inter-rank gap on the flow
          // axis; preserve the user's drop coordinate on the perpendicular
          // axis. Auto-layout will refine on the next structural pass.
          const sNode = nodes.find((n) => n.id === E.source);
          const tNode = nodes.find((n) => n.id === E.target);
          const sm = sNode ? measuredSizes.get(sNode.id) : undefined;
          const tm = tNode ? measuredSizes.get(tNode.id) : undefined;
          const m = measuredSizes.get(node.id);
          const w = m?.width ?? 160;
          const h = m?.height ?? 60;

          let newPos = node.position;
          if (sNode && tNode) {
            const sw = sm?.width ?? 160, sh = sm?.height ?? 60;
            const tw = tm?.width ?? 160, th = tm?.height ?? 60;
            const sides = SIDE_FOR_ORIENTATION[orientation];
            const flowVertical =
              sides.source === Position.Top || sides.source === Position.Bottom;
            if (flowVertical) {
              const sCenterY = sNode.position.y + sh / 2;
              const tCenterY = tNode.position.y + th / 2;
              newPos = {
                x: node.position.x,
                y: (sCenterY + tCenterY) / 2 - h / 2,
              };
            } else {
              const sCenterX = sNode.position.x + sw / 2;
              const tCenterX = tNode.position.x + tw / 2;
              newPos = {
                x: (sCenterX + tCenterX) / 2 - w / 2,
                y: node.position.y,
              };
            }
          }

          history.push({ nodes, edges });
          setNodes((curr) =>
            curr.map((n) => (n.id === node.id ? { ...n, position: newPos } : n)),
          );
          setEdges((curr) => {
            const without = curr.filter((e) => e.id !== E.id);
            const leftEdge: Edge<DmnEdgeData> = {
              id: `${E.id}_a_${Date.now()}`,
              source: E.source,
              target: node.id,
              type: 'dmn',
              data: E.data,
              markerEnd: E.markerEnd,
            };
            const rightEdge: Edge<DmnEdgeData> = {
              id: `${E.id}_b_${Date.now()}`,
              source: node.id,
              target: E.target,
              type: 'dmn',
              data: E.data,
              markerEnd: E.markerEnd,
            };
            return [...without, leftEdge, rightEdge];
          });
          return; // skip rank-snap; structural reflow handles final placement
        }
      }

      history.push({ nodes, edges });
      setNodes((curr) => {
        const snapped = snapToRanks(curr, node.id, orientation, measuredSizes);
        if (!snapped) return curr;
        return curr.map((n) => (n.id === node.id ? { ...n, position: snapped } : n));
      });
    },
    [history, nodes, edges, orientation, measuredSizes, hoveredDropEdgeId],
  );

  /* ------------------------------------------------------------------ */
  /* Palette: click & drag-and-drop                                      */
  /* ------------------------------------------------------------------ */

  const insertNodeAt = useCallback(
    (kind: NodePaletteKind, flowPos: { x: number; y: number }, splitEdge?: Edge) => {
      history.push({ nodes, edges });
      const pendingNode = makePaletteNode(kind, flowPos);
      const placed = findFreeSpot(
        flowPos,
        { width: 160, height: 60 },
        nodes,
        measuredSizes,
        orientation,
      );
      const node: Node<DmnNodeData> = { ...pendingNode, position: placed };

      setNodes((curr) => [...curr, node]);

      if (splitEdge) {
        setEdges((curr) => {
          const without = curr.filter((e) => e.id !== splitEdge.id);
          const left: Edge<DmnEdgeData> = {
            id: `${splitEdge.id}_a_${Date.now()}`,
            source: splitEdge.source,
            target: node.id,
            type: 'dmn',
            data: splitEdge.data,
            markerEnd: splitEdge.markerEnd,
          };
          const right: Edge<DmnEdgeData> = {
            id: `${splitEdge.id}_b_${Date.now()}`,
            source: node.id,
            target: splitEdge.target,
            type: 'dmn',
            data: splitEdge.data,
            markerEnd: splitEdge.markerEnd,
          };
          return [...without, left, right];
        });
      }
    },
    [history, nodes, edges, orientation, measuredSizes],
  );

  const addNodeAtViewportCenter = useCallback(
    (kind: NodePaletteKind) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      const cx = (rect?.left ?? 0) + (rect?.width ?? containerWidth ?? 0) / 2;
      const cy = (rect?.top ?? 0) + (rect?.height ?? containerHeight ?? 0) / 2;
      const flowPos = flow.screenToFlowPosition({ x: cx, y: cy });
      insertNodeAt(kind, flowPos);
    },
    [containerWidth, containerHeight, flow, insertNodeAt],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes(NODE_DRAG_MIME)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      const kind = event.dataTransfer.getData(NODE_DRAG_MIME) as NodePaletteKind;
      if (!kind || !PALETTE_TEMPLATES[kind]) return;
      event.preventDefault();
      const flowPos = flow.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const hit = findEdgeNear(flowPos, edges, nodes, measuredSizes, 24, 32, orientation);
      insertNodeAt(kind, flowPos, hit ?? undefined);
    },
    [flow, edges, nodes, measuredSizes, orientation, insertNodeAt],
  );

  // Edge "+" callback — split the edge at the midpoint with a new node.
  const handleEdgeSplit = useCallback(
    (edgeId: string, kind: NodePaletteKind, midpoint: { x: number; y: number }) => {
      const edge = edges.find((e) => e.id === edgeId);
      if (!edge) return;
      insertNodeAt(kind, midpoint, edge);
    },
    [edges, insertNodeAt],
  );

  /* ------------------------------------------------------------------ */
  /* Orientation-aware handle defaults + subway-map lane assignment      */
  /* ------------------------------------------------------------------ */

  // Terminal sides follow the canvas orientation:
  //   BT → output top,    input bottom
  //   TB → output bottom, input top
  //   LR → output right,  input left
  //   RL → output left,   input right
  // Both NodeShell (handle render) and the canvas (default sourceHandle /
  // targetHandle on edges) derive their ids from the same map so they always
  // agree.
  const defaultHandles = useMemo(() => {
    const map = SIDE_FOR_ORIENTATION[orientation];
    return { source: map.sourceId, target: map.targetId };
  }, [orientation]);

  const lanes = useMemo(
    () => assignEdgeLanes(edges as Edge[], nodes, measuredSizes, orientation),
    [edges, nodes, measuredSizes, orientation],
  );

  // Per-edge geometry pack: bbox of source + target, every other node's bbox
  // (router obstacles), and outgoing/incoming sibling counts.
  const edgePack = useMemo(() => {
    const boxes = new Map<string, { x: number; y: number; w: number; h: number }>();
    const kinds = new Map<string, 'inputData' | 'decision' | 'businessKnowledge'>();
    const isOutput = new Map<string, boolean>();
    for (const n of nodes) {
      const m = measuredSizes.get(n.id);
      boxes.set(n.id, {
        x: n.position.x,
        y: n.position.y,
        w: m?.width ?? 160,
        h: m?.height ?? 60,
      });
      if (n.type === 'inputData' || n.type === 'decision' || n.type === 'businessKnowledge') {
        kinds.set(n.id, n.type);
      }
      if (n.type === 'decision' && (n.data as DmnNodeData)?.output) {
        isOutput.set(n.id, true);
      }
    }
    const srcCounts: Record<string, number> = {};
    const tgtCounts: Record<string, number> = {};
    for (const e of edges) {
      srcCounts[e.source] = (srcCounts[e.source] ?? 0) + 1;
      tgtCounts[e.target] = (tgtCounts[e.target] ?? 0) + 1;
    }
    const cycleIds = findCycleEdgeIds(
      edges as { id: string; source: string; target: string }[],
    );
    return { boxes, kinds, isOutput, srcCounts, tgtCounts, cycleIds };
  }, [nodes, edges, measuredSizes]);

  // Inject the split callback, default handles, lane data, and the geometry
  // pack into every edge.
  const edgesWithCallbacks = useMemo<Edge<DmnEdgeData>[]>(
    () =>
      edges.map((e) => {
        const lane = lanes.get(e.id) ?? {};
        const srcBox = edgePack.boxes.get(e.source);
        const tgtBox = edgePack.boxes.get(e.target);
        const obstacles: { x: number; y: number; w: number; h: number }[] = [];
        edgePack.boxes.forEach((box, nid) => {
          if (nid !== e.source && nid !== e.target) obstacles.push(box);
        });
        const invalid = edgePack.cycleIds.has(e.id);
        const markerEnd = invalid
          ? { type: MarkerType.ArrowClosed, color: '#da1e28', width: 10, height: 10 }
          : e.markerEnd;
        return {
          ...e,
          markerEnd,
          // Always re-resolve handles to the orientation-derived ids — when
          // the user rotates the layout, every edge migrates to the new sides.
          sourceHandle: defaultHandles.source,
          targetHandle: defaultHandles.target,
          data: {
            ...(e.data ?? {}),
            onSplit: handleEdgeSplit,
            centerX: lane.centerX,
            centerY: lane.centerY,
            offset: lane.offset,
            srcBox,
            tgtBox,
            obstacles,
            srcOut: edgePack.srcCounts[e.source] ?? 0,
            tgtIn: edgePack.tgtCounts[e.target] ?? 0,
            srcKind: edgePack.kinds.get(e.source),
            tgtKind: edgePack.kinds.get(e.target),
            tgtIsOutput: edgePack.isOutput.get(e.target) ?? false,
            invalid,
            dropTarget: hoveredDropEdgeId === e.id,
          },
        };
      }),
    [edges, handleEdgeSplit, defaultHandles, lanes, edgePack, hoveredDropEdgeId],
  );

  /* ------------------------------------------------------------------ */
  /* Connection validation                                               */
  /* ------------------------------------------------------------------ */

  // Enforce DMN connection polarity end-to-end. Even though InputData/output
  // decisions only render the appropriate handle types, isValidConnection
  // adds belt-and-braces protection against misuse, *and* blocks any
  // connection that would introduce a circular reference into the graph.
  const isValidConnection = useCallback(
    (connection: Connection): boolean => {
      if (!connection.source || !connection.target) return false;
      if (connection.source === connection.target) return false; // no self-loops
      const source = nodes.find((n) => n.id === connection.source);
      const target = nodes.find((n) => n.id === connection.target);
      if (!source || !target) return false;
      // Output decisions are sinks — they cannot emit.
      if (source.type === 'decision' && (source.data as DmnNodeData)?.output) return false;
      // InputData are pure sources — they cannot receive.
      if (target.type === 'inputData') return false;
      // Duplicate: an edge between this exact source/target pair already
      // exists. The graph is a simple DAG — only one connection per pair.
      if (edges.some((e) => e.source === connection.source && e.target === connection.target)) {
        return false;
      }
      // Circular reference: if a path target → … → source already exists,
      // adding source → target would close a cycle.
      if (hasPath(edges as { id: string; source: string; target: string }[], connection.target, connection.source)) {
        return false;
      }
      return true;
    },
    [nodes, edges],
  );

  /* ------------------------------------------------------------------ */
  /* Delete + undo/redo                                                  */
  /* ------------------------------------------------------------------ */

  const deletePressed = useKeyPress(['Delete', 'Backspace']);
  const undoPressed = useKeyPress(['Meta+z', 'Control+z']);
  const redoPressed = useKeyPress(['Meta+Shift+z', 'Control+y', 'Control+Shift+z']);

  // Rising-edge-only refs: useKeyPress stays `true` while held, so we only
  // fire the action on the false→true transition.
  const deletePrevRef = useRef(false);
  const undoPrevRef = useRef(false);
  const redoPrevRef = useRef(false);

  useEffect(() => {
    if (deletePressed && !deletePrevRef.current) {
      const selectedNodeIds = nodes.filter((n) => n.selected).map((n) => n.id);
      const selectedEdgeIds = edges.filter((e) => e.selected).map((e) => e.id);
      if (selectedNodeIds.length > 0 || selectedEdgeIds.length > 0) {
        history.push({ nodes, edges });
        setNodes((curr) => curr.filter((n) => !selectedNodeIds.includes(n.id)));
        setEdges((curr) =>
          curr.filter(
            (e) =>
              !selectedEdgeIds.includes(e.id) &&
              !selectedNodeIds.includes(e.source) &&
              !selectedNodeIds.includes(e.target),
          ),
        );
      }
    }
    deletePrevRef.current = deletePressed;
  }, [deletePressed, nodes, edges, history]);

  useEffect(() => {
    if (undoPressed && !undoPrevRef.current) {
      const snap = history.undo();
      if (snap) {
        setNodes(snap.nodes);
        setEdges(snap.edges as Edge<DmnEdgeData>[]);
      }
    }
    undoPrevRef.current = undoPressed;
  }, [undoPressed, history]);

  useEffect(() => {
    if (redoPressed && !redoPrevRef.current) {
      const snap = history.redo();
      if (snap) {
        setNodes(snap.nodes);
        setEdges(snap.edges as Edge<DmnEdgeData>[]);
      }
    }
    redoPrevRef.current = redoPressed;
  }, [redoPressed, history]);

  const handleRotate = useCallback(() => {
    setOrientation((curr) => {
      const idx = ORIENTATION_CYCLE.indexOf(curr);
      return ORIENTATION_CYCLE[(idx + 1) % ORIENTATION_CYCLE.length];
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  const nodeTypes = useMemo(() => dmnNodeTypes, []);
  const edgeTypes = useMemo(() => dmnEdgeTypes, []);

  return (
    <OrientationProvider orientation={orientation}>
    <div
      ref={wrapperRef}
      className={styles.canvasDropTarget}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        className={styles.canvasLayer}
        nodes={nodes}
        edges={edgesWithCallbacks}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        isValidConnection={isValidConnection}
        connectionLineType={ConnectionLineType.Step}
        connectionLineStyle={{ stroke: '#0f62fe', strokeWidth: 1.5 }}
        autoPanOnNodeDrag={autoPanOnDrag}
        autoPanOnConnect={autoPanOnDrag}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        proOptions={{ hideAttribution: true }}
        minZoom={0.2}
        maxZoom={2}
        nodesDraggable
        nodesConnectable
        nodesFocusable
        elementsSelectable
        panOnDrag
        panOnScroll
        zoomOnPinch
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#c6c6c6" />
      </ReactFlow>
      <CanvasOverlays>
        <NodeToolbar onAdd={addNodeAtViewportCenter} />
        <CanvasViewControls
          onZoomIn={() => flow.zoomIn()}
          onZoomOut={() => flow.zoomOut()}
          onFit={() => flow.fitView({ padding: 0.2 })}
          onReset={() => flow.setViewport({ x: 0, y: 0, zoom: 1 })}
          onRotate={handleRotate}
          orientation={orientation}
          autoPanOnDrag={autoPanOnDrag}
          onToggleAutoPan={() => setAutoPanOnDrag((v) => !v)}
        />
      </CanvasOverlays>
    </div>
    </OrientationProvider>
  );
}

export default function DecisionModelCanvas(props: DecisionModelCanvasProps) {
  const { panelOpen = false, panelWidth = 320 } = props;
  const stageStyle = { ['--panel-reserved-width' as string]: `${panelWidth}px` } as React.CSSProperties;
  const stageClassName = panelOpen ? `${styles.stage} ${styles.stagePanelOpen}` : styles.stage;
  return (
    <div className={stageClassName} style={stageStyle}>
      <ReactFlowProvider>
        <CanvasInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}
