# Decision Intelligence Prototype Platform

npm-workspaces monorepo for Decision Intelligence prototypes. Built on IBM Carbon v11.

## Folder boundaries

| Folder | Purpose |
|---|---|
| `packages/` | Stable shared packages (ui-components, business-logic) used across all prototypes |
| `prototypes/` | Experimental full-stack prototype workspaces — add new prototypes here |
| `hub/` | Management Control Center dashboard for browsing, documenting, and launching prototypes |
| `scripts/` | Verification and artifact capture scripts |
| `docs/` | Generated screenshots and repository diagrams |

## Install

```bash
npm install
```

## Root scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the hub dashboard |
| `npm run dev:ui` | Start Storybook for shared UI components |
| `npm run build` | Build all workspaces |
| `npm run build:hub` | Build hub only |
| `npm run check` | Run `check` in every workspace |
| `npm run verify:ui` | Run Playwright artifact capture |

## Carbon Sass entry

Carbon styles are imported through [`packages/ui-components/src/carbon.scss`](packages/ui-components/src/carbon.scss):

```scss
@use '@carbon/react';
```

Consumer apps import it as:

```js
import '@platform/ui-components/carbon.scss';
import '@platform/ui-components/styles.scss';
```

## Adding a prototype

1. Create `prototypes/<your-prototype>/` with its own `package.json` named `@platform/<your-prototype>`.
2. Add an entry to [`hub/src/data/registry.js`](hub/src/data/registry.js).
3. The prototype will appear in the hub automatically.

## Local workspace links

Packages reference each other via npm workspaces — no publishing required.

```json
"@platform/ui-components": "*",
"@platform/business-logic": "*"
```
