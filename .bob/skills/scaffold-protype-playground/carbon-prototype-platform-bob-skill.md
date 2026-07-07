# Carbon Prototype Platform: Self-Contained IBM Bob Skill

Use this as a single self-contained IBM Bob skill/prompt. It contains the full deterministic scaffolding workflow and does not require the separate `core/` skill files.

## Bob Role

Act as IBM Bob operating as a Principal Software Architect and Full-Stack Platform Engineer specializing in JavaScript/TypeScript npm-workspaces monorepos and IBM Carbon v11.

## Goal

Scaffold a functioning full-stack monorepo directly in the current empty directory.

Do not generate a giant shell installer. Build the repository files directly.

## Non-Negotiables

- Use npm workspaces, not Git submodules.
- Use `packages/` for stable shared packages.
- Use `apps-prototypes/` for experimental full-stack prototypes.
- Use `playground-app/` for the isolated management and documentation dashboard.
- Use IBM Carbon v11 through `@carbon/react`.
- Use Dart Sass with `@use '@carbon/react'`.
- Include `@carbon-labs/mdx-components` in `playground-app`.
- Include docs, Box or OneDrive storage links, and stubbed Context fields in the registry.
- Build both the hub/index and detail UI.
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

Create a private ESM package with:

```json
{
  "name": "carbon-prototype-platform",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/*",
    "apps-prototypes/*",
    "playground-app"
  ],
  "engines": {
    "node": ">=20.18.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "dev": "npm run dev:playground",
    "dev:playground": "npm run dev -w @platform/playground-app",
    "dev:frontend": "npm run dev -w @platform/frontend-react-1",
    "dev:api": "npm run dev -w @platform/backend-api",
    "dev:ui": "npm run storybook -w @platform/ui-components",
    "prototype:frontend-1": "npm run dev -w @platform/frontend-react-1",
    "prototype:backend-api": "npm run dev -w @platform/backend-api",
    "storybook:ui": "npm run storybook -w @platform/ui-components",
    "build": "npm run build --workspaces --if-present",
    "build:playground": "npm run build -w @platform/playground-app",
    "build:frontend": "npm run build -w @platform/frontend-react-1",
    "build:ui": "npm run build -w @platform/ui-components",
    "check": "npm run check --workspaces --if-present",
    "start:api": "npm run start -w @platform/backend-api",
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
- `packages/ui-components/src/components/PrototypeShell.jsx`
- `packages/ui-components/src/components/MetricTile.jsx`
- `packages/ui-components/src/components/StatusTag.jsx`
- `packages/ui-components/src/components/PrototypeShell.stories.jsx`
- `packages/ui-components/.storybook/main.ts`
- `packages/ui-components/.storybook/preview.tsx`

### Package Contract

Name:

```text
@platform/ui-components
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
- `@vitejs/plugin-react`
- `vite`
- `sass`

### Required Implementation

Create `src/carbon.scss`:

```scss
@use '@carbon/react';
```

Create `src/styles.scss` with a runtime Carbon spacing bridge:

```scss
:root {
  --cds-spacing-01: 0.125rem;
  --cds-spacing-02: 0.25rem;
  --cds-spacing-03: 0.5rem;
  --cds-spacing-04: 0.75rem;
  --cds-spacing-05: 1rem;
  --cds-spacing-06: 1.5rem;
  --cds-spacing-07: 2rem;
  --cds-spacing-08: 2.5rem;
  --cds-spacing-09: 3rem;
  --cds-spacing-10: 4rem;
}
```

Export these React components:

- `PrototypeShell`
- `MetricTile`
- `StatusTag`

`StatusTag` mapping:

- `Active` -> green
- `Draft` -> purple
- `Blocked` -> red
- `Paused` -> warm-gray
- `Archived` -> gray
- unknown -> gray

Storybook preview must import:

```ts
import '../src/carbon.scss';
import '../src/styles.scss';
```

### Validation

```bash
npm run build -w @platform/ui-components
npm run build-storybook -w @platform/ui-components
```

## Phase 3: Stable Business Logic Package

### Files

- `packages/business-logic/package.json`
- `packages/business-logic/src/index.js`

### Package Contract

Name:

```text
@platform/business-logic
```

This package must be node-safe. Do not import React, Carbon, Express, browser globals, Vite, or Storybook.

### Required Exports

- `validatePrototypeMetadata(prototype)`
- `normalizePrototypeMetadata(prototype)`
- `createLaunchDescriptor(prototype)`

Required registry fields:

- `id`
- `title`
- `description`
- `lastUpdated`
- `designOwner`
- `contributors`
- `statusTag`
- `epicTrackingUrl`
- `figmaSpecUrl`
- `rootLaunchCommand`

Optional fields preserved by normalization:

- `docs`
- `storageLinks`
- `context`

Behavior:

- `validatePrototypeMetadata` returns `{ valid, errors }`.
- Missing required fields appear in `errors`.
- `contributors` must be an array.
- `normalizePrototypeMetadata` returns original metadata plus `validation`.
- `createLaunchDescriptor` returns `command`, `canLaunch`, and `workspaceRootHint`.

### Validation

```bash
node --check packages/business-logic/src/index.js
```

## Phase 4: Express API Prototype

### Files

- `apps-prototypes/backend-api/package.json`
- `apps-prototypes/backend-api/src/server.js`

### Package Contract

Name:

```text
@platform/backend-api
```

Dependencies:

- `@platform/business-logic`
- `cors`
- `express`

Scripts:

```json
{
  "dev": "node --watch src/server.js",
  "start": "node src/server.js",
  "check": "node --check src/server.js"
}
```

### Required Implementation

- Use Express JSON middleware and CORS.
- Default port: `4000`, overridable by `process.env.PORT`.
- Implement:
  - `GET /health`
  - `GET /api/prototypes`
  - `GET /api/prototypes/:id`
- Use `normalizePrototypeMetadata` from `@platform/business-logic`.

### Validation

```bash
npm run check -w @platform/backend-api
```

## Phase 5: Vite React Prototype

### Files

- `apps-prototypes/frontend-react-1/package.json`
- `apps-prototypes/frontend-react-1/index.html`
- `apps-prototypes/frontend-react-1/vite.config.js`
- `apps-prototypes/frontend-react-1/src/main.jsx`
- `apps-prototypes/frontend-react-1/src/App.jsx`
- `apps-prototypes/frontend-react-1/src/styles.scss`

### Package Contract

Name:

```text
@platform/frontend-react-1
```

Dependencies:

- `@carbon/react`
- `@platform/ui-components`
- `react`
- `react-dom`

Dev dependencies:

- `@vitejs/plugin-react`
- `sass`
- `vite`

### Required Implementation

`src/main.jsx` import order:

```js
import '@platform/ui-components/carbon.scss';
import '@platform/ui-components/styles.scss';
import './styles.scss';
```

Render a lightweight prototype using:

- `PrototypeShell`
- `MetricTile`
- `StatusTag`

This app is a raw prototype sandbox. It is not the management dashboard.

### Validation

```bash
npm run build -w @platform/frontend-react-1
```

## Phase 6: Playground Registry

### Files

- `playground-app/package.json`
- `playground-app/index.html`
- `playground-app/vite.config.js`
- `playground-app/src/main.jsx`
- `playground-app/src/data/registry.js`

### Package Contract

Name:

```text
@platform/playground-app
```

Dependencies:

- `@carbon-labs/mdx-components`
- `@carbon/icons-react`
- `@carbon/react`
- `@platform/business-logic`
- `@platform/ui-components`
- `react`
- `react-dom`

Dev dependencies:

- `@vitejs/plugin-react`
- `sass`
- `vite`

### Required Registry Shape

`playground-app/src/data/registry.js` exports:

```js
export const prototypeRegistry = [];
```

Every registry object includes:

- `id`
- `title`
- `description`
- `lastUpdated`
- `designOwner`
- `contributors`
- `statusTag`
- `epicTrackingUrl`
- `figmaSpecUrl`
- `rootLaunchCommand`
- `docs`
- `storageLinks`
- `context`

Seed entries:

- `frontend-react-1`
- `backend-api`
- `ui-components`

Each seed entry must include:

- at least two embedded docs records
- one Box-style storage link
- one OneDrive-style storage link
- `context.status: "Stubbed"`
- `context.summary`
- `context.sources`

`src/main.jsx` import order:

```js
import '@platform/ui-components/carbon.scss';
import '@platform/ui-components/styles.scss';
import '@carbon-labs/mdx-components/scss/index.scss';
import './styles.scss';
```

### Validation

```bash
npm run build -w @platform/playground-app
```

## Phase 7: Playground Hub and Detail UI

### Files

- `playground-app/src/App.jsx`
- `playground-app/src/styles.scss`

### Required Information Architecture

The first screen is the usable dashboard, not a landing page.

Views:

- Hub/index view
- Detail view for selected registry item

State:

- active view: hub or detail
- active prototype ID
- nav expanded
- desktop persistent nav detection
- search query
- status filter

### Hub Requirements

Include:

- Carbon `Header`
- Carbon `SideNav`
- registry search in side nav
- hero/title area
- summary metric panel
- main search control
- status filter controls
- registry board generated from `prototypeRegistry`
- evidence cells for docs, files, context, and launch readiness
- Details action for each registry row

### Detail Requirements

Include:

- back to hub action
- hero/title area
- active status summary
- Carbon Labs MDX anchor links
- launch command `CodeSnippet`
- Docs section
- Health section
- Meeting Recordings and Files section
- Context section for future LLM wiki integration
- Resources grid
- metadata aside
- screenshot anchor placeholder

### Carbon Visual Rules

- Use `@carbon/react` primitives.
- Use `@carbon/icons-react` icons.
- Use Carbon Labs MDX components only for docs/navigation primitives where useful.
- Use IBM Plex through Carbon.
- Use Carbon spacing through a local CSS custom-property bridge if runtime spacing variables are not emitted.
- Use IBM Carbon gray/white workbench surfaces:
  - page: `#f4f4f4`
  - surface: `#ffffff`
  - subtle surface: `#f4f4f4`
  - border: `#e0e0e0`
  - inverse header: `#161616`
- Do not use decorative gradients, marketing hero art, or nested cards.
- Keep the layout dense, scannable, and operational.

### Responsive Rules

- Desktop: persistent side nav, two-column hero/detail layout, board-style registry.
- Mobile: collapsed nav, single-column detail, two-column evidence metrics where readable.
- Text must not overlap, clip, or depend on viewport-width font sizing.

### Validation

```bash
npm run build -w @platform/playground-app
```

## Phase 8: Verification Artifacts

### Files

- `scripts/capture-artifacts.mjs`
- generated `docs/screenshots/playground-hub.png`
- generated `docs/screenshots/playground-detail-frontend.png`
- generated `docs/screenshots/playground-backend-selected.png`
- generated `docs/screenshots/playground-mobile-hub.png`
- generated `docs/screenshots/playground-mobile-detail.png`
- generated `docs/screenshots/repository-structure.png`
- generated `docs/repository-structure.svg`
- generated `docs/repository-structure.txt`

### Script Contract

`scripts/capture-artifacts.mjs` must:

1. Start `playground-app` with Vite on a strict free localhost port when `PLAYGROUND_URL` is not provided.
2. Reuse `PLAYGROUND_URL` when provided.
3. Launch Playwright Chromium.
4. Verify visible hub content.
5. Capture hub screenshot.
6. Click the first Details action.
7. Verify Docs, Box, OneDrive, and Context are visible.
8. Capture detail screenshot.
9. Select Backend API Prototype in the side nav.
10. Verify backend command and docs are visible.
11. Capture backend-selected screenshot.
12. Capture mobile hub and mobile detail screenshots.
13. Generate repository tree text, SVG, and PNG.

Tree ignore directories:

- `.git`
- `dist`
- `node_modules`
- `screenshots`
- `storybook-static`

Tree ignore files:

- `.DS_Store`

For full-page captures, inject screenshot-only CSS that makes Carbon fixed shell elements absolute. Do not change application runtime behavior for users.

### Validation

```bash
npm run verify:ui
```

## Final Acceptance Checklist

Confirm these files exist:

- `package.json`
- `packages/ui-components/src/carbon.scss`
- `packages/ui-components/src/styles.scss`
- `packages/business-logic/src/index.js`
- `apps-prototypes/backend-api/src/server.js`
- `apps-prototypes/frontend-react-1/src/App.jsx`
- `playground-app/src/data/registry.js`
- `playground-app/src/App.jsx`
- `playground-app/src/styles.scss`
- `scripts/capture-artifacts.mjs`
- `docs/screenshots/playground-hub.png`
- `docs/screenshots/playground-detail-frontend.png`
- `docs/screenshots/playground-mobile-hub.png`
- `docs/screenshots/playground-mobile-detail.png`
- `docs/screenshots/repository-structure.png`
- `docs/repository-structure.txt`

Run:

```bash
npm install
npm run check
npm run verify:ui
```

Optional:

```bash
npm audit --omit=dev
```

## Final Bob Response

Return:

- current working directory
- install command
- dev command and local URL
- validation command results
- screenshot artifact paths
- repository tree artifact paths
- any skipped validation and reason

Keep the final response concise and evidence-based.
