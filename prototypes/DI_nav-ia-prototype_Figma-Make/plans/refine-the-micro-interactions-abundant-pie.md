# Refine canvas micro-interactions

## Context

The DMN canvas currently presents nodes and edges as a near-static diagram: nodes can be selected and dragged at end-of-drag only, edges are immutable props, and there is no way to connect, delete, undo, auto-layout, or hit-test against connectors. The user wants the canvas to feel like a real editor — smooth dragging, fixed-size connectors that don't grow with zoom, click-to-add affordances on edges, drag-to-connect from terminals, force/dagre auto-layout with a rotation toggle, collision avoidance, edge selection, delete, undo/redo, all at 60 fps.

Today's source of truth is `props.nodes` / `props.edges` (passed from `DecisionModelPage.tsx`). Local `extraNodes` state holds palette additions but only commits on drag-end. There is no `onNodesChange`, `onEdgesChange`, `onConnect`, no custom edge component, no layout lib, no undo stack. Achieving the requested editor surface requires lifting state into the canvas, adding a custom edge, wiring keyboard + history hooks, and introducing `dagre` for layout. This is much wider than the selected `<CanvasOverlays>` block — the user has been notified.

## Scope vs. selection

The selected element is `<CanvasOverlays>`. Almost all of this work lives outside it. The only in-selection change is adding one rotation button to `<CanvasViewControls>`. Everything else (state lifting, edges, drag handlers, key handlers, layout, history) is outside the selection and requires the user's blanket OK.

## Approach

### 1. Lift graph state into the canvas

`CanvasInner` becomes the editor's source of truth. Replace prop-locked rendering with `useNodesState` / `useEdgesState` from `reactflow`, seeded from `props.nodes` / `props.edges` on first render. Drop the separate `extraNodes` array. Existing `handleNodeDragStop` and `addNodeAtViewportCenter` collapse into the unified state. The fit-on-mount / panel-toggle effects keep working — they already key off `nodeInternals` (measured), not the prop array.

Wire the standard handlers:
- `onNodesChange` → `applyNodeChanges(changes, nodes)` (60 fps drag works because RF keeps the change pipeline internal — the previous loop only happened because we mixed prop nodes with local extras).
- `onEdgesChange` → `applyEdgeChanges`.
- `onConnect` → `addEdge({ ...params, type: 'dmn' }, edges)`.

### 2. Custom DMN edge — fixed connector, "+" button, selected state

New file `src/app/components/DecisionModelCanvas/edges/DmnEdge.tsx`. Built on `BaseEdge` + `EdgeLabelRenderer`.
- Render a `smoothstep` path (already the project's edge style) but apply `vector-effect="non-scaling-stroke"` so stroke stays 1.5 px regardless of zoom.
- The arrow marker is also rendered as a small inline SVG inside `EdgeLabelRenderer` (positioned at the path end via the `targetX/Y` props) — keeps it constant size since `EdgeLabelRenderer` injects a counter-transform against the viewport.
- Midpoint "+" button: rendered inside `EdgeLabelRenderer` at the path midpoint. Clicking it opens a small Carbon `Popover` palette of the 5 DMN kinds — picking one splits the edge (`from → new → to`). Reuse the `PALETTE_TEMPLATES` map already defined in `DecisionModelCanvas.tsx` (lift to `nodes/dmnFactory.ts`).
- Selected styling driven by the `selected` prop: thicker stroke (still non-scaling) + Carbon focus blue (`--cds-focus`).

Register in `edgeTypes = { dmn: DmnEdge }` and update `diagrams/pricingDiagram.ts` to set `type: 'dmn'`.

### 3. Drag from terminal → connect

Flip `nodesConnectable` to `true` in the `<ReactFlow>` element. In `nodes/nodes.module.css`, drop the `opacity: 0; pointer-events: none` on `.handle` and replace with a Carbon-style hit target: 8 px transparent halo, 4 px visible dot on hover (`--cds-interactive-01`). The four handles already exist on every DMN node (`s-top`, `t-top`, `s-bottom`, `t-bottom`, `DmnNodes.tsx:38-43`). `onConnect` handles the wiring.

### 4. Drop palette node onto a connector

Extend the existing `handleDrop` in `DecisionModelCanvas.tsx`. After computing the flow position, hit-test against edges:
- For each edge, compute its `smoothstep` polyline (use ReactFlow's `getSmoothStepPath`).
- Distance from drop point to nearest segment; if ≤ 24 px in flow units → split mode: insert new node at the drop position, replace the edge with two new ones (`source → new`, `new → target`).
- Else → existing detached-node behavior.

Hit-test helper: `src/app/components/DecisionModelCanvas/edges/edgeHitTest.ts`.

### 5. DMN hierarchical auto-layout + orientation toggle (dagre)

Add `dagre` (`pnpm add dagre @types/dagre`). New file `src/app/components/DecisionModelCanvas/layout/dagreLayout.ts` exports `relayout(nodes, edges, orientation)` returning new positions, configured for DMN conventions:
- `rankdir` from orientation (`TB | LR | BT | RL`); DMN default is `BT` (information sources at bottom, top-level decisions at top).
- `ranksep: 80`, `nodesep: 48`, `edgesep: 16` (tuned for DMN node sizes).
- Per-node width/height pulled from `nodeInternals` (measured) so the layout respects real card dimensions, not nominal ones.

**Auto-layout on structural change.** A new effect in `CanvasInner` watches the *structural* signature of the graph — `nodes.length`, `edges.length`, the set of node ids, and the set of edge `${source}->${target}` keys — and when any of those change (add/remove node, add/remove edge, edge split), it calls `relayout(...)` and animates each node's position over 320 ms with `cubic-bezier(0.4, 0.14, 0.3, 1)` (same RAF tween as `panTo`).

What does **not** trigger auto-layout: pure position changes (manual drags), selection, dimension events. Those would create a feedback loop. Manual drags are respected — once the user drags a node, it stays put until the next structural change pushes a fresh layout.

**Snapping.** Two snap behaviors:
1. **Grid snap during drag**: set `snapToGrid` on `<ReactFlow>` and `snapGrid={[16, 16]}` (matches the dot-grid background `gap={16}`). Engaged always; cheap and gives the canvas a tactile feel.
2. **Layout snap on drop**: on `onNodeDragStop`, snap the dropped node onto the nearest dagre rank-line for the current orientation (e.g. for `BT`, snap `y` to the nearest occupied `y`-rank ± half `ranksep`). Keeps manual placement aligned with the auto-layout grid so the diagram doesn't drift.

**Initial layout.** On first measurement (when `allMeasured` first flips to true) the canvas runs one `relayout` pass and then runs the existing fit-to-view. This replaces the static positions in `pricingDiagram.ts` as initial truth — those become a fallback only.

**🔁 button.** Single rotation button (`Renew` icon from `@carbon/icons-react`) in `CanvasViewControls` (`CanvasOverlays.tsx`), between "Fit to view" and the minimap toggle. Click cycles `BT → TB → LR → RL → BT`. Orientation lives in `CanvasInner` state and is a dependency of the auto-layout effect, so cycling re-runs the layout.

### 6. Collision avoidance

Two layers:
1. **At insertion** (palette click / drop): place the node at the requested position, then let the auto-layout pass (§5) resolve the final coordinates. Auto-layout never overlaps because dagre allocates one rank/column slot per node.
2. **During manual drag**: drop snap (§5) lands the node on a rank line; an AABB sweep against `nodeInternals` then nudges along the cross-axis by `nodesep` units until clear (max 8 attempts, then accept overlap). Helper: `layout/findFreeSpot.ts`.

### 7. Edge selection

Free with `elementsSelectable` already on. Add `onEdgeClick`, surface selection back via a new optional `onEdgeSelect?: (edge | null) => void` prop on `DecisionModelCanvasProps`. The custom edge already styles the `selected` state (§2).

### 8. Delete

Use `useKeyPress(['Delete', 'Backspace'])` from `reactflow` inside `CanvasInner`. On press: remove selected nodes (and their incident edges) and selected edges via `applyNodeChanges` / `applyEdgeChanges`. No confirmation modal — undo covers it.

### 9. Undo / redo

New hook `src/app/components/DecisionModelCanvas/hooks/useGraphHistory.ts`. Lightweight, no dependency:
- Holds `past[], future[]` of `{ nodes, edges }` snapshots (structural-only — drag positions are debounced into a single history entry per drag via `onNodeDragStop`).
- `push(snapshot)` clears `future`, caps `past` at 50.
- `undo()` / `redo()` swap heads.
- `useKeyPress(['Meta+z', 'Control+z'])` → undo; `Meta+Shift+z` / `Control+y` → redo.

Integration: `CanvasInner` calls `history.push(currentSnapshot)` in `onConnect`, `onNodeDragStop`, palette add, edge split, and delete.

### 10. 60 fps

The previous loop came from feeding measured-dimension changes back through state. With state fully owned via `useNodesState` and the prop-derived `orderedNodes` memo dropped (RF handles render order internally), drag is purely a transform update inside RF — no React re-render per frame. Confirm with the React Profiler: drag should produce zero React commits between `onNodeDragStart` and `onNodeDragStop`.

The `+` button and arrow marker rely on `EdgeLabelRenderer`, which already counter-transforms the viewport, so they stay pixel-constant without per-zoom re-renders.

## Critical files

| File | Change |
| --- | --- |
| `DecisionModelCanvas.tsx` | Lift state, wire `onNodesChange`/`onEdgesChange`/`onConnect`/`onEdgeClick`, key handlers, history, drop hit-test, relayout. |
| `CanvasOverlays.tsx` | Add 🔁 (`Renew` icon) button and `onRotate` prop to `CanvasViewControls`. **(in selection)** |
| `nodes/DmnNodes.tsx` + `nodes/nodes.module.css` | Visible interactive handles. |
| `nodes/dmnFactory.ts` *(new)* | Move `PALETTE_TEMPLATES` + `makePaletteNode` here for reuse by edge "+" button. |
| `edges/DmnEdge.tsx` *(new)* | Custom edge with non-scaling stroke, "+" button, arrow, selected state. |
| `edges/edgeHitTest.ts` *(new)* | Distance-from-edge utility for drop-onto-connector. |
| `layout/dagreLayout.ts` *(new)* | `relayout(nodes, edges, orientation)`. |
| `layout/findFreeSpot.ts` *(new)* | Collision-aware position nudger. |
| `hooks/useGraphHistory.ts` *(new)* | Undo/redo stack hook. |
| `diagrams/pricingDiagram.ts` | Set edges `type: 'dmn'`. |
| `DecisionModelCanvas.module.css` | Edge/"+" button styles, hover states, selection ring. |
| `package.json` | Add `dagre`, `@types/dagre`. |

## Verification

1. **Smooth drag (60 fps)**: open Performance tab, record a 3 s node drag — expect a clean main-thread frame budget under 16 ms with no React commits during drag.
2. **Non-scaling connector**: zoom 25 % ↔ 200 %, stroke width and arrow size remain visually constant; node-text scales as expected.
3. **Drag-to-connect**: hover a node terminal, drag a wire to another node, drop — new edge appears with `dmn` type, persists across zoom and re-layout.
4. **Edge "+"**: click the midpoint button, pick "Add input" — edge is replaced with two edges through a new input node.
5. **Drop onto connector**: drag a palette item over an edge — node is inserted and edge splits.
6. **Auto-layout on structural change**: add a node, connect, split, delete — diagram re-flows automatically with a 320 ms tween, no manual relayout press needed.
7. **Rotate**: click 🔁 four times, layout cycles BT → TB → LR → RL → BT.
8. **Snap**: drag a node, release between rank lines — node snaps to the nearest rank/column. Grid snap visible on every drag (16 px).
9. **Collision**: spam-click "Add decision" — auto-layout always produces a non-overlapping diagram.
10. **Select connector**: click an edge, see Carbon focus styling, info surfaces via `onEdgeSelect`.
11. **Delete**: select node or edge, press Delete — removed plus incident edges; layout re-flows; press Cmd+Z to restore.
12. **Undo/redo**: every primitive (add, connect, drag, split, delete) round-trips through Cmd+Z / Cmd+Shift+Z.
