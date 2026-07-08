# Plan — Barrel-export the canvas and side-panel modules

## Context

`DecisionModelCanvas/` and `SidePanel/` each have top-level `index.ts` barrels, but their subdirectories (`edges/`, `nodes/`, `hooks/`, `layout/`, `diagrams/` for the canvas; `panels/` sub-groups for the side panel) are still a pile of loose `.tsx`/`.ts` files. Internal files reach into siblings with deep relative paths (`./edges/DmnEdge`, `./nodes/DmnNodes`, `./layout/dagreLayout`, `./panels/ServiceAssetPanels`, etc.), and a few consumers outside the modules bypass the top barrel entirely:

- `src/app/components/DecisionModelCanvas/NodeDetailsPanel.tsx:5` — imports `../SidePanel/panels/ServiceAssetPanels.module.css`.
- `src/app/components/CarbonHeader/CarbonHeader.tsx:25–26` — imports `../SidePanel/panels/HelpPanel` and `../SidePanel/panels/DecisionAssistantPanel` directly.

Outcome: every subdirectory owns a small barrel; internal siblings import from the subdirectory barrel (`./edges`) rather than deep-linking individual files; external consumers import only from `…/DecisionModelCanvas` and `…/SidePanel`. No behaviour changes; refactor is purely import-surface hygiene so we can move files around without breaking callers.

## Critical files

New barrels (add `index.ts` in each):
- `src/app/components/DecisionModelCanvas/edges/index.ts` — re-export `DmnEdge` (default + types), `routeOrthogonal` + `Obstacle`, `assignEdgeLanes`, `findEdgeNear`, `sampleEdge`, `hasPath`, `findCycleEdgeIds`.
- `src/app/components/DecisionModelCanvas/nodes/index.ts` — re-export `DmnNodes` map, `DmnNodeData`, `DmnNodeKind`, and the `dmnFactory` helpers.
- `src/app/components/DecisionModelCanvas/hooks/index.ts` — re-export `useGraphHistory` + its types.
- `src/app/components/DecisionModelCanvas/layout/index.ts` — re-export `relayout`, `snapToRanks`, `LayoutOrientation`, `findFreeSpot`.
- `src/app/components/DecisionModelCanvas/diagrams/index.ts` — re-export `pricingNodes`, `pricingEdges`.
- `src/app/components/SidePanel/panels/HelpPanel/index.ts` — verify/create; export the panel default.
- `src/app/components/SidePanel/panels/placeholders/index.ts` *(optional grouping)* — if we move `PlaceholderPanelA/B/C`, `PlaceholderInnerPanel`, `PlaceholderSubViews` into a `placeholders/` folder. Defer if it inflates the diff.

Updated top-level barrels:
- `src/app/components/DecisionModelCanvas/index.ts` — re-export from the new subdir barrels rather than deep files. Keep the current public surface (`DecisionModelCanvas`, `DecisionModelCanvasProps`, `DmnNodeData`, `DmnNodeKind`, `pricingNodes`, `pricingEdges`) and add any types now referenced externally (e.g. `LayoutOrientation` if pages need it).
- `src/app/components/SidePanel/index.ts` — unchanged public surface; verify `export * from './panels'` still covers everything used externally, and add `SubView` types if any consumer needs them.

Internal call-site rewrites (import from subdir barrel, not the file):
- `DecisionModelCanvas.tsx` — `./edges/DmnEdge` → `./edges`; `./nodes/DmnNodes` → `./nodes`; `./layout/dagreLayout` → `./layout`; `./hooks/useGraphHistory` → `./hooks`; `./diagrams/pricingDiagram` → `./diagrams`.
- `edges/*.ts(x)` intra-folder imports — keep file-to-file inside the same folder (avoids barrel cycles); cross-folder goes through the sibling barrel (`../layout`, `../nodes`).
- `nodes/DmnNodes.tsx`, `nodes/dmnFactory.ts` — same rule.
- `NodeDetailsPanel.tsx:5` — promote the internal `AssetPanelShell` helper from `ServiceAssetPanels.tsx` to a named export on the panels barrel, then consume `import { AssetPanelShell } from '../SidePanel'`. Drop the direct CSS-module reach-in.
- `CarbonHeader.tsx:25–26` — swap the two deep imports for `import { HelpPanel, DecisionAssistantPanel } from '../SidePanel'` (already re-exported via `panels/index.ts`).

Reuses (do **not** rewrite): every component/module already exists and keeps its default/named exports. This pass only adds `index.ts` shim files and mechanical import swaps.

## Implementation

### 1. Add subdirectory barrels

For each subfolder under `DecisionModelCanvas/`, create an `index.ts` that re-exports every symbol imported by a sibling folder. Keep exports explicit (`export { X } from './X'`) rather than `export *` so tree-shaking and rename-safety stay strong. Follow the existing top-level `index.ts` style (default + named + type re-exports).

### 2. Rewrite cross-folder imports to use barrels

Grep pass:
```
rg -n "from '\\.(\\./)?(edges|nodes|layout|hooks|diagrams)/[A-Za-z]" src/app/components/DecisionModelCanvas
rg -n "from '\\.\\./SidePanel/panels/" src/app
```
Replace each deep path with the folder barrel.

### 3. Fix the two known deep-import escapees

- `NodeDetailsPanel.tsx` — promote `AssetPanelShell`, swap the import to `../SidePanel`.
- `CarbonHeader.tsx` — swap the two deep imports to `../SidePanel`.

### 4. Verify the public surface is stable

`rg -n "from ['\"]\\.\\.?/(DecisionModelCanvas|SidePanel)/[^'\"]+/[^'\"]+['\"]" src/app` should return **zero** results after the refactor.

### 5. Optional: group placeholder panels

If the SidePanel `panels/` folder feels cluttered, move `PlaceholderPanelA/B/C`, `PlaceholderInnerPanel`, `PlaceholderSubViews` and their CSS modules into `panels/placeholders/` with its own `index.ts`. Defer if the diff gets noisy.

## Verification

1. `rg -n "from ['\"]\\.\\.?/(DecisionModelCanvas|SidePanel)/[^'\"]+/[^'\"]+['\"]" src/app` returns nothing.
2. Dev server hot-reloads cleanly; open the Decision Model page and confirm the canvas renders, nodes/edges paint, and the section-level panels (Model details / Dependencies / Error report / Activity) still open with the same slide+fade transitions.
3. Open Panel A/B/C on any service-asset page, click **Maximize**, then **Open inner panel**, then close everything — no runtime errors, no missing-module warnings, no CSS-module regression on `NodeDetailsPanel` (the promoted `AssetPanelShell` styling should look identical).
4. Global header assistant/help buttons still open the assistant + help panels (regression check for the `CarbonHeader.tsx` import swap).
5. `git diff --stat` shows only new `index.ts` files plus mechanical import path changes; no behavioural code touched.
