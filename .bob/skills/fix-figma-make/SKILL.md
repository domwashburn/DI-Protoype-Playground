---
name: fix-figma-make
description: >
  Audit and fix a Figma Make export dropped into this npm-workspaces monorepo.
  Detects and repairs all known issues: duplicate pnpm-alias dependency keys,
  reserved package names (@figma/…), stale pnpm/registry metadata fields,
  conflicting pnpm-workspace.yaml, missing react/react-dom peer dependencies,
  Figma-only import aliases (figma:asset/…), workspace name collisions, missing
  root dev scripts, dead shadcn/ui scaffolding (components/ui/), Carbon re-export
  wrappers (components/Carbon/), unused Figma image helpers (components/figma/),
  and superseded page files. Includes Carbon MCP and Context7 guidance for
  migrating shadcn/ui components to Carbon Design System. Use when a Figma Make
  project fails npm install with EINVALIDPACKAGENAME, workspace warnings, or
  other package.json errors; or when a user says "fix figma make",
  "figma make npm errors", "import figma prototype", or "clean up figma make".
---

# Fix Figma Make — Skill

Figma Make generates `package.json` files that are built for **pnpm** and the Figma Make runtime,
not for a standard npm-workspaces monorepo. When you drop one of these projects into this repo you
will see one or more of the issues catalogued below. This skill walks you through diagnosing and
repairing them.

## Repo context (di-prototype-platform)

This monorepo uses **npm workspaces** with the following glob layout:

```
packages/*   → stable shared packages   (scoped: @platform/…)
prototypes/* → Figma Make prototypes    (plain kebab: figma-make-…)
hub          → playground app           (scoped: @platform/playground-app)
```

Root `package.json` workspace scripts follow the pattern:

```json
"dev:<slug>": "npm run dev -w <package-name>"
```

Every fixed Figma Make prototype must be wired in here so it is runnable from the repo root.

---

## Step 1 — Locate the project and read repo context

Read the `package.json` in the Figma Make project directory. If the user has not provided the path,
look for any subdirectory under `prototypes/` that contains a `package.json` with `"name":
"@figma/my-make-file"` or `"_id"` / `"readme": "ERROR: No README data found!"` fields.

```tool
read_file("<prototype-dir>/package.json")
```

Also read the root `package.json` — you need the workspace glob layout **and** the existing
`scripts` block so you can add a new `dev:<slug>` entry without clobbering what's there:

```tool
read_file("package.json")     // workspace globs and scripts live here
```

---

## Step 2 — Run the diagnostic checklist

Evaluate every item in this checklist against the file you just read. Record which issues are
present — you will fix them all in Step 3.

### Issue A — Duplicate `"pkg@version"` alias keys (EINVALIDPACKAGENAME)

**Pattern:** `dependencies` contains pairs like:

```json
"@emotion/react": "11.14.0",
"@emotion/react@11.14.0": "npm:@emotion/react@11.14.0"
```

The second key (containing `@version`) is pnpm alias syntax. npm treats it as a package name and
rejects it with `EINVALIDPACKAGENAME`. **Every** such duplicated entry must be removed. The plain
key alone is sufficient.

**Detection rule:** any dependency key that matches `[package-name]@[semver]`.

---

### Issue B — Reserved / unpublishable package name

**Pattern:** `"name": "@figma/my-make-file"` (or any `@figma/*` name).

This name is owned by Figma Inc. and will cause npm to reject the package or emit workspace
warnings. Rename to a kebab-case slug derived from the prototype directory name.

**Convention used in this repo:**

```
prototypes/DI_nav-ia-prototype_Figma-Make  →  figma-make-di-nav-ia
prototypes/MyWidget_Figma-Make             →  figma-make-my-widget
```

Rule: strip `_Figma-Make` suffix, lowercase, hyphenate, prefix `figma-make-`.

---

### Issue C — Stale pnpm / registry metadata fields

These fields are written by pnpm or the npm registry and have no effect (or cause confusion) in a
source-controlled `package.json`. Remove them:

| Field | Why remove |
|---|---|
| `"_id"` | npm registry record, not a source field |
| `"readme": "ERROR: No README data found!"` | pnpm artefact |
| `"pnpm"` block (`overrides`, etc.) | pnpm-only; no effect under npm |
| `"peerDependenciesMeta"` | only needed if publishing; remove for private apps |

---

### Issue D — Conflicting `pnpm-workspace.yaml`

**Pattern:** A `pnpm-workspace.yaml` exists inside the prototype directory.

This file is meaningless under npm workspaces and can confuse tooling. Delete it (or note it for
the user if they plan to switch to pnpm in future).

```tool
// Check for its existence:
glob("<prototype-dir>/pnpm-workspace.yaml")
```

---

### Issue E — Missing `react` and `react-dom` in `dependencies`

**Pattern:** `react` and `react-dom` are listed only under `peerDependencies` (Figma Make's
runtime provides them, so they are not bundled). In this repo they must be real `dependencies` so
the project can run standalone with `npm run dev`.

Check: if both `react` and `react-dom` are absent from `dependencies`, add them at the version
pinned in `peerDependencies` (typically `18.3.1`).

---

### Issue F — Missing TypeScript devDependencies

**Pattern:** The project has `.tsx` / `.ts` source files but no `typescript` in `devDependencies`.

Vite handles transpilation without `tsc`, so this is often harmless, but add `"typescript":
"^5.x"` if the project uses `tsconfig.json` and needs `tsc` for type-checking.

---

### Issue G — `figma:asset/` imports in source files

**Pattern:** Source files contain `import … from 'figma:asset/…'` or `src="figma:asset/…"`.

Figma Make resolves these through its own bundler. The project already has a `figmaAssetResolver`
Vite plugin in [`vite.config.ts`](vite.config.ts) that maps `figma:asset/<filename>` →
`src/assets/<filename>`. **No package.json change needed**, but verify:

1. The plugin is present in `vite.config.ts`.
2. The referenced asset files exist under `src/assets/`.

If assets are missing, flag them to the user — they need to be copied from the Figma Make export
manually.

---

### Issue J — Dead shadcn/ui scaffolding (`components/ui/`)

**Pattern:** A `components/ui/` directory exists containing 40–50 shadcn/ui component files
(`button.tsx`, `dialog.tsx`, `sidebar.tsx`, `utils.ts`, `use-mobile.ts`, etc.).

Figma Make generates this directory as a shadcn/ui component library. Once a prototype migrates to
Carbon Design System (`@carbon/react`), the entire directory becomes dead code.

**Detection rule:** Check whether any file **outside** `components/ui/` imports from it:

```tool
grep(
  pattern: "from ['\"](\.\./|\./)?(components/)?ui/",
  include: "*.ts,*.tsx",
  path: "<prototype-dir>/src"
)
```

- **If zero matches:** the entire `components/ui/` directory is dead — mark for deletion (see Step 3).
- **If matches exist:** the prototype has NOT fully migrated to Carbon. Use Carbon MCP and Context7
  to plan the migration (see Issue J-migration below).

#### Issue J-migration — Incomplete Carbon migration (components/ui/ still in use)

If `components/ui/` is still imported by active code, the prototype needs Carbon components to
replace the shadcn/ui ones before the directory can be deleted. Use these tools:

1. **Carbon MCP** (`mcp__carbon-mcp__docs_search`, `mcp__carbon-mcp__code_search`) — look up the
   Carbon equivalent for each shadcn/ui component that is still imported. Common mappings:

   | shadcn/ui component | Carbon (`@carbon/react`) equivalent |
   |---|---|
   | `Button` | `Button` |
   | `Dialog` / `AlertDialog` | `Modal` |
   | `Select` / `DropdownMenu` | `Dropdown` |
   | `Tabs` | `Tabs` |
   | `Checkbox` | `Checkbox` |
   | `Input` / `Textarea` | `TextInput` / `TextArea` |
   | `Table` | `DataTable` |
   | `Tooltip` | `Tooltip` |
   | `Badge` | `Tag` |
   | `Breadcrumb` | `Breadcrumb` |
   | `Accordion` | `Accordion` |
   | `Popover` | `Popover` |
   | `Switch` | `Toggle` |
   | `Progress` | `ProgressBar` |
   | `Skeleton` | `SkeletonText` / `SkeletonPlaceholder` |
   | `Separator` | `Divider` (or CSS `border`) |
   | `Avatar` | No direct equivalent — use Carbon `UserAvatar` from `@carbon/ibm-products` |
   | `Sidebar` | Carbon `SideNav` (from `@carbon/react`) |

2. **Context7** (`mcp__context7__resolve-library-id` → `mcp__context7__query-docs`) — fetch
   up-to-date Carbon React API docs and code examples for each target component:

   ```tool
   mcp__context7__resolve-library-id(libraryName: "@carbon/react", query: "Button component props")
   mcp__context7__query-docs(libraryId: "/carbon-design-system/carbon", query: "Modal component API")
   ```

3. Create a sub-task plan for each shadcn/ui consumer file that needs updating, replacing each
   import and usage with the Carbon equivalent before deleting `components/ui/`.

---

### Issue K — Dead Carbon re-export wrapper (`components/Carbon/index.ts`)

**Pattern:** A file `components/Carbon/index.ts` (or `components/Carbon/index.tsx`) exists that
re-exports Carbon components:

```ts
export { Button } from '@carbon/react';
export { OverflowMenu, OverflowMenuItem } from '@carbon/react';
export { Breadcrumb, BreadcrumbItem } from '@carbon/react';
```

This is a migration stepping-stone — it was created so existing code could import from a local
path while Carbon was being adopted, then never cleaned up.

**Detection rule:** Check for any inbound imports:

```tool
grep(pattern: "from ['\"][./]+Carbon['\"]", include: "*.ts,*.tsx", path: "<prototype-dir>/src")
```

- **If zero matches:** the wrapper is dead — mark for deletion.
- **If matches exist:** the wrapper is still in use. Use Carbon MCP to confirm each re-exported
  symbol exists directly in `@carbon/react`, then update each consumer to import directly before
  deleting the wrapper.

---

### Issue L — Dead Figma image helper (`components/figma/ImageWithFallback.tsx`)

**Pattern:** A `components/figma/` directory exists containing `ImageWithFallback.tsx` (a custom
component for handling Figma-generated image imports with a fallback).

**Detection rule:**

```tool
grep(pattern: "ImageWithFallback", include: "*.ts,*.tsx", path: "<prototype-dir>/src")
```

- **If only self-references (the definition file itself):** dead — mark for deletion.
- **If imported elsewhere:** keep it, but note the consumer files.

After deleting `ImageWithFallback.tsx`, if `components/figma/` is now empty, delete the directory.

---

### Issue M — Superseded page files

**Pattern:** A page component exists in `components/pages/` that has been replaced by a newer
equivalent but was never deleted. Common examples from Figma Make migrations:

- `DecisionAssistantPage.tsx` — replaced by `ChatLayoutTemplate`
- `SidePanelDemoPage.tsx` — dev scratch page never added to routes

**Detection rule:** For every file in `components/pages/`, check:

1. Is it imported in `routes.tsx` (or equivalent router config)?
2. Is it imported by any other active component?

```tool
grep(pattern: "DecisionAssistantPage|SidePanelDemoPage", include: "*.ts,*.tsx", path: "<prototype-dir>/src")
```

Any page file with zero inbound imports and no route entry is a dead file — mark for deletion.
Also check for an accompanying `.module.css` file and delete it alongside the `.tsx`.

---

### Issue I — Root workspace dev script missing

**Pattern:** The root `package.json` has no `"dev:<slug>"` script for this prototype.

After fixing the package name (Issue B), add a convenience script to the **root** `package.json`
so the prototype is runnable from the repo root alongside the hub:

```json
"dev:<slug>": "npm run dev -w <package-name>"
```

Example: `"dev:di-nav-ia": "npm run dev -w figma-make-di-nav-ia"`

This mirrors the existing pattern (`dev:hub`, `dev:ui`) used by the rest of the monorepo.

---

### Issue H — Workspace name collision

**Pattern:** After renaming (Issue B), the new name already exists as another workspace package in
this monorepo.

Check: `grep -r '"name":' packages/ hub/ prototypes/` and confirm uniqueness of the chosen name.
Append `-v2` (or a short disambiguator) if a collision exists.

---

## Step 3 — Propose the fix

Present a concise summary table of every issue found:

```
ISSUE   FOUND   ACTION
A       ✅ yes  Remove 38 duplicate alias keys
B       ✅ yes  Rename "@figma/my-make-file" → "figma-make-di-nav-ia"
C       ✅ yes  Remove _id, readme, pnpm fields, peerDependenciesMeta
D       ✅ yes  Delete pnpm-workspace.yaml
E       ✅ yes  Add react@18.3.1 and react-dom@18.3.1 to dependencies
F       ❌ n/a  typescript not needed (no tsconfig / type-checking)
G       ❌ n/a  figmaAssetResolver present, all assets confirmed
H       ❌ n/a  Name "figma-make-di-nav-ia" is unique
I       ✅ yes  Add "dev:di-nav-ia" script to root package.json
J       ✅ yes  Delete components/ui/ (zero external imports — shadcn/ui fully superseded)
K       ✅ yes  Delete components/Carbon/index.ts (zero inbound imports)
L       ✅ yes  Delete components/figma/ImageWithFallback.tsx (zero imports)
M       ✅ yes  Delete DecisionAssistantPage.tsx, SidePanelDemoPage.tsx (no routes, no imports)
```

Ask for confirmation before applying if the user wants to review. For routine fixes (all issues
A–E), proceed without asking.

---

## Step 3b — Dead component scan (always run)

**Run this scan on every Figma Make import, even if Issues A–I all pass.** Figma Make always
generates `components/ui/` and often generates the other scaffolding directories. They may be
harmless on day one but become dead weight as the prototype evolves.

### Scan procedure

```tool
// 1. Check for components/ui/ with no external consumers
grep(pattern: "from ['\"](\.\./|\./)?(components/)?ui/", include: "*.ts,*.tsx", path: "<prototype-dir>/src")

// 2. Check for components/Carbon/ wrapper
glob(pattern: "<prototype-dir>/src/**/components/Carbon/index.{ts,tsx}")

// 3. Check for components/figma/ helpers
glob(pattern: "<prototype-dir>/src/**/components/figma/*.{ts,tsx}")

// 4. Check each file in components/pages/ for inbound imports
grep(pattern: "<PageComponentName>", include: "*.ts,*.tsx", path: "<prototype-dir>/src")
```

If any dead code is found, add it to the issues table and include deletion in Step 4.

### Dependency audit (after deleting components/ui/)

After removing `components/ui/`, check `package.json` for dependencies that were only used by that
directory. These are now dead and can be uninstalled:

| Package | Used only by `components/ui/` |
|---|---|
| `class-variance-authority` | ✅ likely — CVA is shadcn/ui's variant utility |
| `clsx` | ⚠️ check — may also be used in app code |
| `tailwind-merge` | ✅ likely — only used by `cn()` in `utils.ts` |
| `@radix-ui/*` (all packages) | ✅ likely — Radix is shadcn/ui's primitive layer |
| `vaul` | ✅ likely — shadcn/ui Drawer primitive |
| `cmdk` | ✅ likely — shadcn/ui Command primitive |
| `input-otp` | ✅ likely — shadcn/ui OTP input |
| `recharts` | ⚠️ check — may be used directly in app charts |
| `next-themes` | ⚠️ check — may be used in theme provider |
| `sonner` | ✅ likely — shadcn/ui toast primitive |

For each package, run:
```tool
grep(pattern: "from ['\"]<package-name>['\"]", include: "*.ts,*.tsx", path: "<prototype-dir>/src/app")
```
If zero matches: add to `npm uninstall` list. Run the uninstall **after** the build confirms clean.

---

## Step 4 — Apply the fix

### 4a — Rewrite `package.json`

Use `write_file` to produce a clean `package.json` following this contract:

```jsonc
{
  "name": "<kebab-slug>",          // Issue B fix
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev":   "vite",
    "build": "vite build"
  },
  "dependencies": {
    // All original deps, plain keys only (no @version aliases) — Issue A fix
    // react and react-dom added here if missing — Issue E fix
    "react":     "<version>",
    "react-dom": "<version>"
  },
  "devDependencies": {
    // Original devDeps preserved verbatim
  },
  "peerDependencies": {
    // Keep if the project is intended to be consumed as a library (rare).
    // For a private prototype app, remove entirely.
  }
  // No _id, readme, pnpm, peerDependenciesMeta — Issue C fix
}
```

Key rules for the rewrite:
- **Preserve all plain dependency versions exactly** — only remove the alias-key duplicates.
- **Keep `"private": true`** — these are never published.
- **Remove `peerDependencies` entirely** for prototype apps (they're not consumed as libraries).
  If it is needed (library mode), keep it but remove `peerDependenciesMeta`.

### 4b-extra — Delete dead scaffolding (Issues J, K, L, M)

For each dead directory or file confirmed in the scan:

```tool
// Issue J — entire shadcn/ui library
execute_command("rm -rf <prototype-dir>/src/app/components/ui")

// Issue K — Carbon re-export wrapper
execute_command("rm -rf <prototype-dir>/src/app/components/Carbon")

// Issue L — Figma image helper
execute_command("rm -rf <prototype-dir>/src/app/components/figma")

// Issue M — superseded page files (adjust names as found)
execute_command("rm <prototype-dir>/src/app/components/pages/DecisionAssistantPage.tsx")
execute_command("rm <prototype-dir>/src/app/components/pages/DecisionAssistantPage.module.css")
```

After each deletion, verify with a targeted grep that zero references remain in `*.ts`/`*.tsx`
files. Markdown doc references (e.g. `MIGRATION_EXECUTION_PLAN.md`) are acceptable to leave.

If Issue J-migration applies (shadcn/ui still in use), do NOT delete `components/ui/` yet — create
a sub-task plan for the Carbon migration first (see Issue J-migration guidance above).

### 4b — Delete `pnpm-workspace.yaml` (Issue D)

```tool
execute_command("rm prototypes/<dir>/pnpm-workspace.yaml")
```

### 4c — Wire into root `package.json` (Issue I)

Use `search_and_replace` to add a single `"dev:<slug>"` line inside the root `scripts` block.
Do **not** rewrite the whole file — targeted insert only.

The slug is derived from the package name by stripping the `figma-make-` prefix:

```
figma-make-di-nav-ia  →  dev:di-nav-ia
figma-make-my-widget  →  dev:my-widget
```

Insert the new entry directly after the last existing `"dev:…"` line in root `scripts`:

```json
"dev:di-nav-ia": "npm run dev -w figma-make-di-nav-ia"
```

---

## Step 4c — Uninstall dead dependencies (post-deletion)

After all dead directories are deleted and the build is confirmed clean, uninstall packages that
were only used by `components/ui/`. Run the dependency audit from Step 3b, then:

```tool
execute_command("npm uninstall -w <package-name> <pkg1> <pkg2> … 2>&1 | tail -10")
```

Confirm the build still passes after uninstall.

---

## Step 5 — Validate

Run the install scoped to the repaired workspace:

```tool
execute_command("npm install -w <package-name> 2>&1 | tail -20")
```

A successful result looks like:

```
added N packages, and audited M packages in Xs
```

**Failure patterns and their resolutions:**

| Error | Cause | Resolution |
|---|---|---|
| `EINVALIDPACKAGENAME` | Missed alias key (Issue A) | Re-read deps, find any remaining `@version` keys |
| `workspace … no workspace folder present` | Name mismatch between `package.json` and root workspace glob | Check `"name"` matches `prototypes/<dirname>` slug; or adjust root workspace glob |
| `ERESOLVE` peer dep conflict | A dep requires a React version not in `dependencies` | Pin to the version already in deps or add the missing peer |
| `404 Not Found` | Typo in package name during rename | Revert to original name, reslug carefully |

If install succeeds, verify both invocation paths work:

```bash
npm run dev -w <package-name>         # workspace-scoped (always works)
npm run dev:<slug>                    # root convenience script (new)
```

---

## Step 6 — Report

Summarise what was done:

```
✅ Fixed package.json for <prototype-dir>
   - Removed N duplicate pnpm alias keys (Issue A)
   - Renamed package "@figma/…" → "<new-name>" (Issue B)
   - Stripped stale pnpm/registry fields (Issue C)
   - Deleted pnpm-workspace.yaml (Issue D)
   - Added react@X.X.X + react-dom@X.X.X to dependencies (Issue E)
   - Added "dev:<slug>" to root package.json scripts (Issue I)

npm install:       ✅ N packages added, M audited
npm run dev:<slug> ✅ Vite server started at http://localhost:5173
```

If any issues remain open (e.g. missing Figma assets for Issue G), list them explicitly with the
files the user needs to add manually.

---

## Reference — naming conventions for this repo

| Prototype dir (under `prototypes/`) | Package name | Root script key |
|---|---|---|
| `DI_nav-ia-prototype_Figma-Make` | `figma-make-di-nav-ia` | `dev:di-nav-ia` |
| `MyWidget_Figma-Make` | `figma-make-my-widget` | `dev:my-widget` |
| `AIChat_Exploration_Figma-Make` | `figma-make-ai-chat-exploration` | `dev:ai-chat-exploration` |

**Slug rule:** lowercase the directory name, strip `_Figma-Make` (or `-Figma-Make`) suffix,
replace underscores/remaining special chars with hyphens, collapse consecutive hyphens, prefix
`figma-make-`. The root script key is the slug without the `figma-make-` prefix.
