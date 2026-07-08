# Plan: Unify service-asset model tabs (Carbon Tabs)

## Context
The five service-asset model detail pages (Decision, Task, Gen AI, Optimization, Predictive (ML)) currently each define their own tab set, leading to inconsistent navigation. Screenshots `src/imports/image-30..34.png` confirm the target state: all five share one tab set — **Build, Test Cases, History, Error Report, Dependencies** — with Gen AI showing Test Cases, History, and Dependencies as **disabled**.

`PageHeader` currently renders its tabs with a custom DOM. Per project guidelines and the user's instruction, replace that custom render with the official **Carbon v11 Tabs** from `@carbon/react`. Scope stays narrow: tabs only — no header, action, layout, or panel changes.

## Carbon API to use (verified via Carbon MCP)
```tsx
import { Tabs, TabList, Tab } from '@carbon/react';

<Tabs selectedIndex={index} onChange={({ selectedIndex }) => onTabChange(tabs[selectedIndex].id)}>
  <TabList aria-label="…">
    {tabs.map(t => <Tab key={t.id} disabled={t.disabled}>{t.label}</Tab>)}
  </TabList>
</Tabs>
```
Notes:
- Carbon Tabs is **index-driven**; map ids ↔ indices inside `PageHeader`.
- We use only `Tabs` + `TabList` + `Tab` (no `TabPanels`/`TabPanel`) because each page already renders its own body content keyed off `activeTab`. This is a supported Carbon pattern (TabPanels are optional).
- `<Tab disabled>` is the supported way to grey out a tab — no custom styling required.

## Changes

### 1. `src/app/components/PageHeader.tsx`
- Add `disabled?: boolean` to the `TabItem` interface (around line 33-38).
- Replace the existing custom tabs JSX with Carbon `Tabs` / `TabList` / `Tab`.
- Derive `selectedIndex` from the `isActive` flag on the incoming `tabs` (fallback to 0).
- `onChange` resolves the index back to `tabs[selectedIndex].id` and calls `onTabChange`; skip the call when the resolved tab is `disabled` (Carbon already prevents selection, but guard for safety).
- Keep `count` rendering by appending a Carbon-styled count beside the label inside `<Tab>` (a small `<span>` next to `{label}`) — visual parity with today's count badge. No other PageHeader behavior changes.

### 2. The five model page files
Replace only the `tabs:` array (and matching `useState` default + `activeTab === ...` body branches). Headers, statuses, actions, left panels, and surrounding layout stay untouched.

Unified tab ids:
```
build, test-cases, history, error-report, dependencies
```

- **`DecisionModelPage.tsx`** — swap `details/schema/versions` → unified set; default `activeTab = "build"`.
- **`OptimizationModelPage.tsx`** — swap `configuration/constraints/results` → unified set; default `"build"`.
- **`PredictiveModelPage.tsx`** — swap `overview/features/performance` → unified set; default `"build"`.
- **`GenAINodePage.tsx`** — unified set; default `"build"`. Mark `test-cases`, `history`, `dependencies` as `disabled: true` (per image-32: only Build and Error Report enabled).
- **`TaskModelPage.tsx`** — swap `artifacts/functions/error-report/run/dependencies` → unified set; default `"build"`. **Keep the left panel and `useSubAssets`/`useTaskModelCounts` wiring exactly as is** — its render condition simply won't match the new ids, matching current "no panel" behavior for other models (per user: no other UI changes). Map `count` badges: Error Report → `counts.errors`, Dependencies → `counts.dependencies`. Update body switch to the new ids with placeholder content per tab.

## Out of scope
- Left-panel layout / `useSubAssets` tree behavior in Task Model
- Header actions, statuses, badges
- Routing, URL params, `viewState.assetType` switch in `ApplicationLayoutTemplate`
- Migrating to Carbon `TabPanels`/`TabPanel` (kept current body-render pattern)

## Verification
1. Dev server is already running — open the app preview.
2. Navigate Automation → each of the 5 service-asset models.
3. Confirm each page shows exactly: Build | Test Cases | History | Error Report | Dependencies, rendered by Carbon Tabs (verify DOM uses `.cds--tabs` / `.cds--tab--list`), with **Build** active by default.
4. On Gen AI: confirm Test Cases, History, Dependencies render with `aria-disabled="true"` and are non-clickable.
5. On Task Model: confirm counts still flow to Error Report / Dependencies tabs.
6. Visual diff against `src/imports/image-30..34.png`.
