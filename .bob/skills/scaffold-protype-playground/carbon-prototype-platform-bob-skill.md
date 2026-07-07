# Carbon Prototype Platform: Self-Contained IBM Bob Skill

Use this as a single self-contained IBM Bob skill/prompt. It contains the full deterministic scaffolding workflow and does not require the separate `core/` skill files.

## Bob Role

Act as IBM Bob operating as a Principal Software Architect and Full-Stack Platform Engineer specializing in JavaScript/TypeScript npm-workspaces monorepos and IBM Carbon v11.

## Before You Begin

Before writing a single file, ask the user:

> **What would you like to name this repository?**
> This becomes the `name` field in the root `package.json` and the title used throughout the `README.md`.
> Examples: `optim-prototypes`, `mdm-protos`, `doms-playground`.

Wait for the answer. Use the provided name (converted to a lowercase kebab-case slug) wherever `di-prototype-platform` appears in the skill. If the user provides a display title (e.g. "Optim Prototypes"), use the slugified form for `package.json` and the original casing for `README.md` headings and the hub `Header` label.

Do not proceed to Phase 1 until the repo name is confirmed.

## Goal

Scaffold a functioning full-stack monorepo directly in the current empty directory.

Do not generate a giant shell installer. Build the repository files directly.

## Non-Negotiables

- Use npm workspaces, not Git submodules.
- Use `packages/` for stable shared packages used across prototypes.
- Use `prototypes/` for experimental full-stack prototypes.
- Use `hub/` for the isolated management and documentation dashboard (`@platform/playground-app`).
- Use IBM Carbon v11 through `@carbon/react`.
- Use Dart Sass with `@use '@carbon/react'`; use `modern-compiler` API in all Vite/Storybook SCSS config.
- Use SCSS Modules for all component-level styles.
- Build and maintain custom components as self-contained barrel-exported components.
- Business logic utilities live directly in the hub (`hub/src/lib/utils.js`); a separate `@platform/business-logic` package is **not** required and not present in this repo.
- Include `@carbon-labs/mdx-components` in `hub/` for docs anchor navigation.
- Include docs, Box/OneDrive storage links, and stubbed Context fields in the registry.
- Build both the Hub view and the Detail view.
- Use Carbon visual language: IBM Plex, Carbon shell, gray/white workbench surfaces, Carbon spacing, Carbon icons, and operational density.
- Do not create a marketing landing page.
- Do not publish packages.

## Execution Mode

Work phase by phase. For each phase:

1. List the files you will create or edit.
2. Create or edit only those files.
3. Run the validation command when possible.
4. Fix failures before moving to the next phase.
5. Report changed files and validation status.

After all phases, run:

```bash
npm install
npm run check
npm run verify:ui
```

If Storybook dependencies are available, also run:

```bash
npm run build-storybook -w @platform/ui-components
```

## Phase 1: Root Workspace

### Files

- `package.json`
- `tsconfig.base.json`
- `.gitignore`
- `README.md`

### Root `package.json` Contract

Create a private ESM package using the repo name the user provided:

```json
{
  "name": "<repo-name>",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/*",
    "prototypes/*",
    "hub"
  ],
  "engines": {
    "node": ">=20.18.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "install:all": "npm install --workspaces --include-workspace-root",
    "dev": "npm run dev:hub",
    "dev:hub": "npm run dev -w @platform/playground-app",
    "dev:ui": "npm run storybook -w @platform/ui-components",
    "storybook:ui": "npm run storybook -w @platform/ui-components",
    "build": "npm run build --workspaces --if-present",
    "build:hub": "npm run build -w @platform/playground-app",
    "build:ui": "npm run build -w @platform/ui-components",
    "check": "npm run check --workspaces --if-present",
    "verify:ui": "node scripts/capture-artifacts.mjs"
  },
  "devDependencies": {
    "@playwright/test": "^1.61.1"
  }
}
```

### Root Support Files

`tsconfig.base.json` must support ES2022, DOM, React JSX, strict mode, and no emit.

`.gitignore` must include:

- `node_modules/`
- `dist/`
- `storybook-static/`
- `.DS_Store`
- `.env`
- coverage and logs

`README.md` must explain:

- folder boundaries
- install command
- root scripts
- Carbon Sass entry
- how to add a new prototype
- local workspace links

### Validation

```bash
node --check package.json
```

## Phase 2: Stable Carbon UI Package

### Files

- `packages/ui-components/package.json`
- `packages/ui-components/vite.config.js`
- `packages/ui-components/src/carbon.scss`
- `packages/ui-components/src/styles.scss`
- `packages/ui-components/src/index.js`
- `packages/ui-components/.storybook/main.ts`
- `packages/ui-components/.storybook/preview.tsx`

> Note: This package currently has no React components exported from `src/index.js`. Component exports should be added here as shared primitives are needed. The hub-specific components live directly in `hub/src/components/`.

### Package Contract

Name:

```text
@platform/ui-components
```

Exports:

```json
{
  ".": "./src/index.js",
  "./carbon.scss": "./src/carbon.scss",
  "./styles.scss": "./src/styles.scss"
}
```

Dependencies:

- `@carbon/react`
- `@carbon/icons-react`
- `react`
- `react-dom`

Dev dependencies:

- `@storybook/react-vite`
- `@storybook/addon-essentials`
- `@storybook/addon-interactions`
- `@storybook/test`
- `@vitejs/plugin-react`
- `vite`
- `sass`

Peer dependencies: `react >=18`, `react-dom >=18`.

### Required Implementation

`src/carbon.scss`:

```scss
@use '@carbon/react';
```

`src/styles.scss` — Carbon shell overrides using Carbon tokens (no custom CSS variables for tokens that Carbon already provides):

```scss
@use '@carbon/react/scss/themes' as themes;
@use '@carbon/react/scss/theme' as *;
@use '@carbon/react/scss/spacing' as *;

.cds--header {
  background: #161616;
  border-block-end: 1px solid #393939;
}

.cds--side-nav {
  background: $layer;
  border-inline-end: 1px solid $border-subtle;
}

.cds--side-nav__items {
  padding-block-start: $spacing-03;
}

.cds--content {
  padding-inline: 0;
  padding-block-start: 0;
}
```

`vite.config.js` must:

- Use `@vitejs/plugin-react`.
- Resolve `~@ibm/plex` alias using `createRequire` + `@ibm/plex/package.json`.
- Set `css.preprocessorOptions.scss.api: 'modern-compiler'`.
- Build as ESM library with entry `./src/index.js`, externalising `react`, `react-dom`, `@carbon/react`, `@carbon/icons-react`.

`.storybook/main.ts` must:

- Use `@storybook/react-vite` framework.
- Add the same `~@ibm/plex` alias and `modern-compiler` SCSS config in `viteFinal`.
- Glob stories at `../src/**/*.stories.@(jsx|tsx)`.

Storybook `preview.tsx` must import:

```ts
import '../src/carbon.scss';
import '../src/styles.scss';
```

### Validation

```bash
npm run build -w @platform/ui-components
npm run build-storybook -w @platform/ui-components
```

## Phase 3: Hub — Playground App

The hub is the management control centre at `hub/`. It is package `@platform/playground-app`.

### Files

- `hub/package.json`
- `hub/index.html`
- `hub/vite.config.js`
- `hub/src/main.jsx`
- `hub/src/global.scss`
- `hub/src/styles.scss`
- `hub/src/App.jsx`
- `hub/src/App.module.scss`
- `hub/src/data/registry.js`
- `hub/src/lib/utils.js`
- `hub/src/lib/useNavigationMode.js`
- `hub/src/views/HubView/HubView.jsx`
- `hub/src/views/HubView/HubView.module.scss`
- `hub/src/views/HubView/index.js`
- `hub/src/views/DetailView/DetailView.jsx`
- `hub/src/views/DetailView/DetailView.module.scss`
- `hub/src/views/DetailView/ContextSection.jsx`
- `hub/src/views/DetailView/DocsSection.jsx`
- `hub/src/views/DetailView/FilesSection.jsx`
- `hub/src/views/DetailView/index.js`
- `hub/src/components/AsideNav/`
- `hub/src/components/HubSummaryPanel/`
- `hub/src/components/MediaGallery/`
- `hub/src/components/MetadataPanel/`
- `hub/src/components/MetricTile/`
- `hub/src/components/PanelBlock/`
- `hub/src/components/RegistryRow/`
- `hub/src/components/ResourceCard/`
- `hub/src/components/StatusTag/`
- `hub/src/components/StorageIcon/`
- `hub/src/components/SummaryPanel/`

### Package Contract

```json
{
  "name": "@platform/playground-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Decision Intelligence prototype registry and Management Control Center.",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port 4173",
    "check": "npm run build"
  },
  "dependencies": {
    "@carbon-labs/mdx-components": "^0.26.0",
    "@carbon/icons-react": "^11.0.0",
    "@carbon/react": "^1.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.61.1",
    "@vitejs/plugin-react": "^4.3.4",
    "sass": "^1.77.0",
    "vite": "^5.4.0"
  }
}
```

`hub/vite.config.js` must:

- Use `@vitejs/plugin-react`.
- Resolve `~@ibm/plex` alias using `createRequire` + `@ibm/plex/package.json`.
- Set `css.preprocessorOptions.scss.api: 'modern-compiler'`.
- Set `server.port: 5173`.

> Note: The hub does **not** depend on `@platform/ui-components` at runtime. Carbon is imported directly in the hub's own SCSS files.

### Entry Point: `main.jsx`

Import order:

```js
import '@carbon-labs/mdx-components/scss/index.scss';
import './global.scss';
import './styles.scss';
```

### Theme Setup: `global.scss`

`global.scss` sets up Carbon theme tokens at the root:

```scss
@use '@carbon/react/scss/themes' as themes;
@use '@carbon/react/scss/theme' as *;

:root {
  @include theme(themes.$g10, true);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-carbon-theme='g10']) {
    @include theme(themes.$g90, true);
  }
}

[data-carbon-theme='g10'] { @include theme(themes.$g10, true); }
[data-carbon-theme='g90'] { @include theme(themes.$g90, true); }
```

`styles.scss` imports `@carbon/react` and applies the same shell overrides described in Phase 2.

### Theme Toggle

`App.jsx` reads the OS preference with `window.matchMedia('(prefers-color-scheme: dark)')` and toggles between `g10` / `g90` by setting `data-carbon-theme` on `document.documentElement`. Use `Asleep` and `Light` icons from `@carbon/icons-react` for the toggle button.

### Registry: `hub/src/data/registry.js`

```js
export const prototypeRegistry = [];
```

Required fields per registry entry:

- `id` — unique slug
- `title`
- `description`
- `lastUpdated` — ISO date string
- `designOwner`
- `contributors` — array of strings
- `statusTag` — `'Active' | 'Draft' | 'Blocked' | 'Paused' | 'Archived'`
- `epicTrackingUrl`
- `figmaSpecUrl`
- `rootLaunchCommand` — e.g. `npm run dev -w @platform/my-prototype`

Optional fields:

- `iconType` — `'app' | 'api' | 'ui'` (defaults to `Application` icon)
- `docs[]` — `{ title, description, type, href, status }`
- `storageLinks[]` — `{ label, href, provider }` where `provider` is `'Box'`, `'OneDrive'`, or other
- `context` — `{ status, summary, sources[] }`
- `media[]` — `MediaItem[]` (see MediaGallery spec)

### Library Utilities: `hub/src/lib/utils.js`

All business logic helpers live here — **not** in a separate package. Exports:

- `normalizePrototypeMetadata(prototype)` — adds `docs`, `storageLinks`, `context`, and `validation` fields. Validates `id` and `title`.
- `createLaunchDescriptor(prototype)` — returns `{ command, canLaunch }`.
- `getPrototypeIcon(prototype)` — maps `iconType` to `Application`, `DataStructured`, or `Package` from `@carbon/icons-react`.
- `statusTagType(status)` — maps status strings to Carbon Tag types.
  - `Active` → `green`
  - `Draft` → `blue`
  - `Blocked` → `red`
  - `Paused` → `warm-gray`
  - `Archived` → `gray`
  - unknown → `outline`
- `isExternalHref(href)` — returns true for `http(s)://` URLs.
- `filterRegistry(registry, query)` — case-insensitive text search across title, description, statusTag, designOwner, contributors, and context.summary.
- `getStatusOptions(prototypes)` — returns `['All', ...unique statusTags]`.
- `getStatusCount(prototypes, status)` — count for a given status string.

### Responsive Navigation Hook: `hub/src/lib/useNavigationMode.js`

Tracks the `(min-width: 66rem)` breakpoint with `matchMedia`. Returns `{ isPersistent, isExpanded, setExpanded }`. When the breakpoint is met, the nav is both persistent and expanded by default.

### Required Information Architecture

The first screen is the usable dashboard, not a landing page.

Views:

- Hub/index view (`HubView`)
- Detail view for selected registry item (`DetailView`)

App-level state:

- `activeView`: `'hub'` or `'detail'`
- `activeId`: selected prototype ID
- `isExpanded` / `isPersistent`: from `useNavigationMode`
- `query`: search string
- `statusFilter`: selected status string

## Phase 4: Hub View

### Hub Requirements

Include:

- Carbon `Header` with menu button, app name ("IBM | Decision Intelligence"), search icon, and theme toggle
- Carbon `SideNav` with search field and per-prototype `SideNavLink` entries
- Hero band with eyebrow + h1 + description + `HubSummaryPanel` (metric tiles)
- Main search control (`Search lg`)
- Status filter controls (ghost/primary toggle buttons) — hidden when only one status value exists
- Registry board generated from `prototypeRegistry`:
  - Board header row (workspace object / evidence / ownership / action)
  - One `RegistryRow` per prototype showing identity, evidence counts, ownership, and a Details button
- Empty state `Tile` when registry is empty
- Search empty state when a query returns no results

### Hub Components

All components in `hub/src/components/`. Each has its own `.jsx`, `.module.scss`, and `index.js` barrel:

#### `HubSummaryPanel`

Props: `stats: Array<{ label: string; value: number }>`. Renders a Carbon `Tile` with the stat grid (Registry objects, Active, Docs, Storage links).

#### `RegistryRow`

Props: `prototype`, `launch`, `PrototypeIcon`, `onSelectPrototype`.

Columns rendered inside each row:
1. **Identity**: icon, `StatusTag`, title (h3), description, launch command in `<code>`.
2. **Evidence**: docs count, storage links count, context status, launch readiness.
3. **Ownership**: design owner, last updated.
4. **Action**: tertiary `Details` button with `Launch` icon.

#### `StatusTag`

Props: `status`. Wraps Carbon `Tag` using `statusTagType()` from `utils.js`.

#### `MetricTile`

Props: `label`, `value`, `helperText`. Wraps Carbon `Tile`.

## Phase 5: Detail View

### Detail Requirements

Include:

- Back to Hub ghost button (top left, `ArrowLeft` icon)
- Hero band with eyebrow + h1 + description
- Carbon `Tabs` / `TabList` (contained, lg) in hero for Overview / Flows & Demos / Prototype Details sections
- `Column lg={12}` main content area
- `Column lg={4}` aside with `SummaryPanel`, `AsideNav`, `MetadataPanel`

Sections in main content:

- **Overview** (`id="overview-tab"`)
  - Tag row (status, validation, docs count)
  - `Health` PanelBlock with three `MetricTile` instances
  - `Resources` PanelBlock with epic, Figma, and workspace `ResourceCard` instances
- **Flows & Demos** (`id="flows-demos-tab"`)
  - `Launch` PanelBlock with `CodeSnippet`
  - `FilesSection` (storage links)
  - `MediaGallery`
- **Prototype Details** (`id="prototype-details-tab"`)
  - `DocsSection`
  - `ContextSection`

### Detail Components

All in `hub/src/components/` or `hub/src/views/DetailView/`:

#### `SummaryPanel`

Props: `status`, `lastUpdated`, `launchReady`, `figmaSpecUrl`. Shows `StatusTag`, a description list, and a tertiary Figma button.

#### `AsideNav`

Uses `@carbon-labs/mdx-components` `AnchorLinks` and `AnchorLink` components to render section anchor links. Props: `sections: Array<{ id, label }>`.

#### `MetadataPanel`

Props: `heading?`, `items: Array<{ term, description }>`. Renders a `<dl>` of key/value pairs.

#### `PanelBlock`

Props: `id`, `title`, `description?`, `badge?`, `accent?`, `children`. Wraps Carbon `Tile`. `accent` applies a secondary accent style.

#### `ResourceCard`

Props: `icon`, `heading`, `subText?`, `children`. Simple `<article>` with icon, heading, optional sub-text, and child content (typically a `Link`).

#### `StorageIcon`

Props: `provider`. Maps `'Box'` → `BoxIcon`, `'OneDrive'` → `Cloud`, fallback → `FolderShared` (all from `@carbon/icons-react`).

#### `DocsSection`

Renders a `PanelBlock` listing doc cards. Each doc card shows: `Documentation` icon, title, status `Tag`, description, type, and either an external `Link` or an inline `<code>` path.

#### `FilesSection`

Renders a `PanelBlock` with a resource card grid for each `storageLink`. Uses `StorageIcon` and Carbon `Link` to open the folder. Shows an empty-state paragraph when no links.

#### `ContextSection`

Renders a `PanelBlock` (with `accent` flag) showing a `Tag` (purple) for context status, a summary paragraph, and an optional sources list. Icon badge: `Wikis` from `@carbon/icons-react`.

### MediaGallery Spec

Located at `hub/src/components/MediaGallery/`.

#### Behaviour

- **Main stage**: 4:3 aspect-ratio preview with `object-fit: contain` letterboxing.
- **Thumbnail rail**: horizontally scrollable strip with `scroll-snap-type: x mandatory`. Active thumb scrolled into view automatically.
- **Lightbox**: full-screen overlay (`position: fixed`, `z-index: 9000`). Opens on stage click. Keyboard: `←`/`→` navigate, `Esc` closes. Click outside inner panel also closes. Focus is trapped on the close button when opened.
- **Video items**: shown with poster image and `PlayOutline` badge in stage and thumbnails; `<video controls autoPlay>` in lightbox.
- **Placeholder fallback**: when `items` is empty or omitted, renders 5 `placehold.co` placeholder items so the gallery is never blank.
- **Playwright inject contract**: reads `window.__MEDIA_GALLERY_ITEMS__` at mount and uses it instead of props or placeholders.

#### Props

```ts
interface MediaItem {
  id:       string;
  type:     'image' | 'video';
  src:      string;
  poster?:  string;
  alt:      string;
  caption?: string;
}

interface MediaGalleryProps {
  items?: MediaItem[];
  title?: string;  // default: "Screenshots & Recordings"
}
```

#### Playwright inject contract

```ts
await page.evaluate((items) => {
  window.__MEDIA_GALLERY_ITEMS__ = items;
}, capturedItems);
await page.reload();
```

## Phase 6: Verification Artifacts

### Files

- `scripts/capture-artifacts.mjs`
- generated `docs/screenshots/playground-hub.png`
- generated `docs/screenshots/playground-detail-frontend.png`
- generated `docs/screenshots/playground-backend-selected.png`
- generated `docs/screenshots/playground-mobile-hub.png`
- generated `docs/screenshots/playground-mobile-detail.png`
- generated `docs/repository-structure.svg`
- generated `docs/repository-structure.txt`

### Script Contract

`scripts/capture-artifacts.mjs` must:

1. Start the hub with Vite on a free localhost port when `PLAYGROUND_URL` is not provided (spawns from `hub/` directory).
2. Reuse `PLAYGROUND_URL` when provided.
3. Launch Playwright Chromium.
4. Capture hub screenshot after verifying `[aria-label="Decision Intelligence Prototype Hub"]` is visible.
5. Click the first Details button and capture a detail screenshot.
6. Click a "backend" nav link and capture a backend-selected screenshot.
7. Capture mobile hub and mobile detail screenshots at 375×812 viewport.
8. Generate a repository tree as both plain text and SVG (capped at 50 lines for SVG).

Tree ignore directories: `.git`, `dist`, `node_modules`, `screenshots`, `storybook-static`.  
Tree ignore files: `.DS_Store`.

Full-page captures should inject screenshot-only CSS to make Carbon fixed shell elements absolute, without changing application runtime behaviour.

### Validation

```bash
node scripts/capture-artifacts.mjs
```

## Carbon Visual Rules

- Use `@carbon/react` primitives exclusively for UI components.
- Use `@carbon/icons-react` icons.
- Use Carbon Labs MDX components (`@carbon-labs/mdx-components`) only for docs/navigation: `AnchorLinks` and `AnchorLink` in `AsideNav`.
- Import IBM Plex through Carbon (via `@ibm/plex` alias in Vite config).
- Always import style tokens from Carbon — do not recreate Carbon tokens as custom CSS variables unless a runtime bridge is absolutely required.
- Surface palette:
  - page/band background: `$background` (g10: `#f4f4f4`)
  - surface tile: `$layer` (g10: `#ffffff`)
  - border: `$border-subtle`
  - inverse header: `#161616`
- Do not use decorative gradients, marketing hero art, or deeply nested card patterns.
- Keep the layout dense, scannable, and operational.

## Responsive Rules

- Desktop (≥ 66rem): persistent side nav, two-column detail layout (lg=12 + lg=4), board-style registry.
- Mobile (< 66rem): collapsed nav (hamburger), single-column detail, stacked evidence metrics.
- Text must not overlap, clip, or depend on viewport-width font sizing.

## Final Acceptance Checklist

- [ ] Root `package.json` workspaces include `packages/*`, `prototypes/*`, and `hub`.
- [ ] `npm install` completes without errors.
- [ ] `npm run build -w @platform/ui-components` succeeds.
- [ ] `npm run build -w @platform/playground-app` succeeds.
- [ ] `npm run check` passes for all workspaces.
- [ ] Hub opens at `http://localhost:5173` and shows the prototype registry.
- [ ] Registry search filters the side nav and main board simultaneously.
- [ ] Status filter buttons appear and filter correctly when multiple statuses exist.
- [ ] Detail view opens on Details click and shows Health, Resources, Launch, Files, Docs, Context sections.
- [ ] Back to Hub navigates back to HubView.
- [ ] Theme toggle switches between g10 and g90.
- [ ] Storybook builds for `@platform/ui-components` (when stories exist).
- [ ] `node scripts/capture-artifacts.mjs` captures all screenshots and generates repository tree files.
- [ ] No console errors at runtime.

## Final Bob Response

After completing all phases, report:

1. Files created or modified (with paths).
2. Validation results for each phase.
3. Any deviations from the spec and why.
4. How to start the hub: `npm run dev`.
5. How to add a new prototype: create `prototypes/<slug>/` and add an entry to `hub/src/data/registry.js`.
