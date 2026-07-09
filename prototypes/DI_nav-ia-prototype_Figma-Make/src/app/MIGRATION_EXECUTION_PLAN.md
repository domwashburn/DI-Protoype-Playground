> ⚠️ **SUPERSEDED** — This document is no longer the authoritative plan. Refer to [`src/app/ai/plans/CARBON_MIGRATION_PLAN.md`](./ai/plans/CARBON_MIGRATION_PLAN.md) for the current execution tracker and all active sub-phases.

# Carbon v11 Migration - Comprehensive Execution Plan

**Purpose:** A step-by-step implementation guide with every file change, dependency, and verification step needed to migrate this codebase to IBM Carbon Design System v11 compliance using the Strangler Fig pattern.

---

## Styling Rules (Apply to ALL Steps)

Every file touched during migration MUST follow these rules. These are non-negotiable and should be verified at each step.

### Rule 1: CSS Modules for All Component Styles

All component styling MUST use CSS Modules (`.module.css` files). Never use inline `style={{}}` props unless the value is **dynamically computed at runtime based on user interaction or data** (e.g., a progress bar width driven by a percentage, drag position, or resize handle).

```tsx
// CORRECT - CSS Module
import styles from './MyComponent.module.css';
<div className={styles.container}>

// CORRECT - Dynamic value that MUST be inline (data-driven)
<div className={styles.progressBar} style={{ width: `${percent}%` }}>

// INCORRECT - Static styling via inline style
<div style={{ padding: '16px', background: '#f4f4f4' }}>

// INCORRECT - Tailwind utility classes for spacing/color/typography
<div className="p-4 bg-gray-100 text-sm font-bold">
```

### Rule 2: All Design Tokens from Carbon CSS Variables

Every color, spacing, border, radius, shadow, and typography value MUST reference a Carbon CSS variable. Never hardcode hex colors, pixel values for spacing, or font properties.

```css
/* CORRECT */
.panel {
  background: var(--cds-layer);
  padding: var(--cds-spacing-05);
  border: 1px solid var(--cds-border-subtle);
  color: var(--cds-text-primary);
  font-family: var(--cds-font-family);
  font-size: var(--cds-body-compact-01-font-size);
  transition: transform var(--cds-productive-02) ease-in-out;
}

/* INCORRECT */
.panel {
  background: #ffffff;
  padding: 16px;
  border: 1px solid #e0e0e0;
  color: #161616;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  transition: transform 110ms ease-in-out;
}
```

### Rule 3: No Tailwind for Typography, Spacing, or Color

Do NOT use Tailwind utility classes for:
- Font size (`text-sm`, `text-2xl`)
- Font weight (`font-bold`, `font-medium`)
- Line height (`leading-none`, `leading-tight`)
- Spacing (`p-4`, `gap-2`, `m-8`)
- Colors (`bg-gray-100`, `text-blue-600`)

Tailwind is acceptable ONLY for:
- Layout utilities (`flex`, `grid`, `items-center`, `justify-between`) where a CSS Module class would be overkill
- Display (`hidden`, `block`, `inline-flex`)
- Position (`relative`, `absolute`, `fixed`)
- Size (`w-full`, `h-full`, `size-4` for icons)

### Rule 4: Carbon Component Classes Over Custom CSS

When using `@carbon/react` components, rely on Carbon's built-in class system. Only add CSS Module overrides when Carbon's defaults don't meet the design spec. Document WHY the override exists.

```css
/* CORRECT - Override with documented reason */
.headerOverride {
  /* Override Carbon Header height to match our 48px header spec */
  /* Carbon default is 48px so this should match, but explicit for safety */
  height: 48px;
}

/* INCORRECT - Reimplementing what Carbon already provides */
.button {
  background: var(--cds-interactive);
  color: var(--cds-text-on-color);
  /* ... rebuilding Carbon Button from scratch */
}
```

### Rule 5: No `!important` Unless Documented

Avoid `!important`. If unavoidable (e.g., overriding a Carbon component's internal styles), add a comment explaining why and file it for future removal.

### Rule 6: Per-Step Styling Audit

Every step's verification checklist includes:
- [ ] Zero new inline styles (unless dynamic/interaction-driven)
- [ ] All new CSS uses CSS Modules
- [ ] All design values reference Carbon CSS variables
- [ ] No new Tailwind classes for typography/spacing/color

---

## Complete Dependency Map

### Import Chain: `/components/Carbon/` (Custom Button/Menu Clones)

**`Button` imported by (9 consumers):**
1. `/components/PageHeader.tsx` - `import { Button } from './Carbon'`
2. `/components/pages/DecisionAutomationsPage.tsx` - `import { Button } from '../Carbon'`
3. `/components/pages/HomePage.tsx` - `import { Button } from '../Carbon'`
4. `/components/SideRailNavigation/SideRailHeader.tsx` - `import { Button } from '../Carbon'`
5. `/components/SideRailNavigation/SideRailActionButton.tsx` - `import { Button } from '../Carbon'`
6. `/components/InboxLayout/InboxActionButton.tsx` - `import { Button } from '../Carbon'`
7. `/components/HomePage/HomePageHeader.tsx` - `import { Button } from '../Carbon'`
8. `/components/HomePage/PinnedDecisionAutomationSection.tsx` - `import { Button } from '../Carbon'`
9. `/components/HomePage/RecentDecisionAutomationsSection.tsx` - `import { Button } from '../Carbon'`

**`OverflowMenuButton`, `MenuItem`, `MenuDivider` imported by (2 consumers):**
1. `/components/CardLayout/Card.tsx` - `import { OverflowMenuButton, MenuItem, MenuDivider } from '../Carbon'`
2. `/components/LargeListItem.tsx` - `import { OverflowMenuButton, MenuItem, MenuDivider } from './Carbon'`

### Import Chain: `/components/Modal/`

**`Modal` imported by (4 consumers):**
1. `/components/pages/BranchesPage.tsx` - `import Modal from '../Modal'`
2. `/components/pages/VersionsPage.tsx` - `import { Modal } from '../Modal'`
3. `/components/pages/DeployAutomationPage.tsx` - `import { Modal } from '../Modal'`
4. `/components/HomePage/HomePageHeader.tsx` - `import { Modal, DisplaySettingsContent } from '../Modal'`

### Import Chain: `/components/Tearsheet.tsx`

**`Tearsheet` imported by (1 consumer):**
1. `/components/InboxLayout/InboxActionButton.tsx` - `import Tearsheet from '../Tearsheet'`

### Import Chain: `/components/OverflowMenu.tsx` (Root-level, portal-based)

**`OverflowMenu` imported by (1 consumer):**
1. `/components/InboxLayout/InboxActionButton.tsx` - `import OverflowMenu from '../OverflowMenu'`

### Import Chain: `/components/FigmaActionButton.tsx`

**`FigmaActionButton` imported by (1 consumer):**
1. `/components/BreadcrumbActionBar.tsx` - `import FigmaActionButton from './FigmaActionButton'`

### Import Chain: Panel System

**`PanelManager/usePanelManager` imported by:**
- `App.tsx`, `ApplicationLayoutTemplate.tsx`, `PageHeader.tsx`
- `UniversalPanelWrapper.tsx`, `GlobalPanelRenderer.tsx`, `AutomationShellPanelRenderer.tsx`
- `SectionInfluencedLayout.tsx`, `SectionPanelRenderer.tsx`
- All panel content components (`SettingsPanel`, `HelpPanel`, `AssetDetailsPanel`, etc.)

**`SidePanelContext/useSidePanel` imported by:**
- `InfluencedLayout.tsx`, `GridLayout.tsx`, `UniversalPanelWrapper.tsx`

### Import Chain: `@carbon/icons-react` (Already correct - KEEP)

Used in: `App.tsx`, `ApplicationLayoutTemplate.tsx`, `BreadcrumbActionBar.tsx`, `DecisionAutomationSideNav.tsx`, `DecisionAssetsTable.tsx`, `Modal.tsx`, `Tearsheet.tsx`, `PageHeader.tsx`, `GlobalHeader.tsx`, multiple panel components, `BranchesPage.tsx`, `DecisionAutomationsPage.tsx`

### Import Chain: `lucide-react` (To be replaced with Carbon icons)

Used in:
1. `/components/GlobalHeader.tsx` - `Bot` icon
2. `/components/pages/AutomationDetailPage.tsx` - `ChevronRight`
3. `/components/pages/TaskModelPage.tsx` - `Folder, FileText, Search, LayoutGrid, List, AlignJustify, Code`
4. `/components/SidePanel/panels/DecisionAssistantPanel.tsx` - `PanelLeftOpen, X`
5. `/components/SidePanel/panels/HelpPanel.tsx` - `X, Book, FileText, MessageCircle, Video, ExternalLink, Lightbulb`
6. `/components/SidePanel/panels/PlaceholderPanelA.tsx` - `X, Box`
7. `/components/SidePanel/panels/PlaceholderPanelB.tsx` - `X, Box`
8. `/components/SidePanel/panels/PlaceholderPanelC.tsx` - `X, Box`

### Import Chain: `/components/ui/` (shadcn/Radix - CONFIRMED UNUSED)

**Zero imports from any `.tsx` component file.** All 48 files are dead code.

---

## Step 0: Delete Dead Code

### 0.1 Delete all `/components/ui/` files

**Files to delete (48 files):**
```
/components/ui/accordion.tsx
/components/ui/alert-dialog.tsx
/components/ui/alert.tsx
/components/ui/aspect-ratio.tsx
/components/ui/avatar.tsx
/components/ui/badge.tsx
/components/ui/breadcrumb.tsx
/components/ui/button.tsx
/components/ui/calendar.tsx
/components/ui/card.tsx
/components/ui/carousel.tsx
/components/ui/chart.tsx
/components/ui/checkbox.tsx
/components/ui/collapsible.tsx
/components/ui/command.tsx
/components/ui/context-menu.tsx
/components/ui/dialog.tsx
/components/ui/drawer.tsx
/components/ui/dropdown-menu.tsx
/components/ui/form.tsx
/components/ui/hover-card.tsx
/components/ui/input-otp.tsx
/components/ui/input.tsx
/components/ui/label.tsx
/components/ui/menubar.tsx
/components/ui/navigation-menu.tsx
/components/ui/pagination.tsx
/components/ui/popover.tsx
/components/ui/progress.tsx
/components/ui/radio-group.tsx
/components/ui/resizable.tsx
/components/ui/scroll-area.tsx
/components/ui/select.tsx
/components/ui/separator.tsx
/components/ui/sheet.tsx
/components/ui/sidebar.tsx
/components/ui/skeleton.tsx
/components/ui/slider.tsx
/components/ui/sonner.tsx
/components/ui/switch.tsx
/components/ui/table.tsx
/components/ui/tabs.tsx
/components/ui/textarea.tsx
/components/ui/toggle-group.tsx
/components/ui/toggle.tsx
/components/ui/tooltip.tsx
/components/ui/use-mobile.ts
/components/ui/utils.ts
```

**Verification:** App compiles and all routes work. No visual changes.

### 0.2 Delete accumulated root-level markdown files

**Files to delete (non-essential docs):**
```
/CLEANUP_COMPLETE.md
/HOMEPAGE_4_12_LAYOUT_FIX.md
/HOMEPAGE_4_12_LAYOUT_TEST.md
/HOMEPAGE_4_12_VISUAL_TEST.md
/HOMEPAGE_CARDS_FIXED.md
/HOMEPAGE_CONTENT_LAYOUTS_OPTIMIZED.md
/HOMEPAGE_GRID_IMPLEMENTATION_COMPLETE.md
/HOMEPAGE_GRID_VISUAL_GUIDE.md
/HOMEPAGE_IMPLEMENTATION_PLAN.md
/HOMEPAGE_LAYOUT_FIXES.md
/HOMEPAGE_RECENT_CARDS_FINAL.md
/HOMEPAGE_RECENT_CARDS_GRID_FIX.md
/HOMEPAGE_RECENT_SECTION_FIX.md
/PANEL_FIX_APPROACH.md
/PANEL_RENDERING_RECONCILIATION.md
/TIMELINE_UPDATE_SUMMARY.md
/VERSIONS_PAGE_MIGRATION.md
/VERSIONS_VIEW_IMPLEMENTATION.md
/CARBON_MIGRATION_PLAN.md
```

**Files to KEEP:**
```
/Attributions.md          -- Legal
/guidelines/Guidelines.md -- Active guidelines
```

**Verification:** App compiles.

---

## Step 1: React Router Migration

### 1.1 Create route configuration

**Create:** `/routes.ts`

```tsx
import { createBrowserRouter } from 'react-router';

// Import layouts
import AppLayout from './layouts/AppLayout';

// Import pages (keep existing page components, just wire routing)
import HomePage from './components/pages/HomePage';
import DecisionAssistantPage from './components/pages/DecisionAssistantPage';
import DecisionAutomationsPage from './components/pages/DecisionAutomationsPage';
import AutomationDetailPage from './components/pages/AutomationDetailPage';
import RulesAndPoliciesPage from './components/pages/RulesAndPoliciesPage';
import DashboardsPage from './components/pages/DashboardsPage';
import ObjectivesAndGoalsPage from './components/pages/ObjectivesAndGoalsPage';
import ResourceHubPage from './components/pages/ResourceHubPage';
import ResourceDetailsPage from './components/pages/ResourceDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'decision-assistant', Component: DecisionAssistantPage },
      { path: 'decision-automations', Component: DecisionAutomationsPage },
      { path: 'automation/:automationId', Component: AutomationDetailPage },
      { path: 'rules-and-policies', Component: RulesAndPoliciesPage },
      { path: 'dashboards', Component: DashboardsPage },
      { path: 'objectives-and-goals', Component: ObjectivesAndGoalsPage },
      { path: 'resource-hub', Component: ResourceHubPage },
      { path: 'resource-hub/:resourceId', Component: ResourceDetailsPage },
      { path: '*', Component: HomePage },
    ],
  },
]);
```

### 1.2 Create AppLayout (Strangler wrapper around existing App shell)

**Create:** `/layouts/AppLayout.tsx`

This component extracts the shell logic from `App.tsx` (GlobalHeader + NavigationPanel + UniversalPanelWrapper + BreadcrumbActionBar) and renders `<Outlet />` for child routes.

**Key logic to preserve from App.tsx:**
- `PanelManagerProvider` wrapping
- `GlobalHeader` + toggle state
- `GlobalNavigationPanel` + open/close
- `UniversalPanelWrapper` panel rendering delegation
- `BreadcrumbActionBar` for automation-detail and resource-detail routes
- `GlobalPanelRenderer` as sibling
- Panel-top-offset CSS variable based on route
- Close global panels when navigation opens

**Changes to existing files:**
- `App.tsx` - Simplify to just `<RouterProvider router={router} />`
- Each page component needs `useNavigate()` instead of `onNavigate` props
- `NavigationRoute` type moves to a shared types file

### 1.3 Update page components for router

**Files that need navigation prop changes:**
- `HomePage.tsx` - Replace `onNavigateToAutomation` with `useNavigate()`
- `DecisionAutomationsPage.tsx` - Replace `onNavigateToAutomation` with `useNavigate()`
- `ObjectivesAndGoalsPage.tsx` - Replace `onNavigate` with `useNavigate()`
- `ResourceHubPage.tsx` - Replace `onNavigateToResource` with `useNavigate()`
- `ResourceDetailsPage.tsx` - Get `resourceId` from `useParams()` instead of props
- `AutomationDetailPage.tsx` - Get `automationId` from `useParams()` instead of props

**ApplicationLayoutTemplate.tsx** - This is the most complex. Currently receives:
- `automationId` as prop -> Get from `useParams()`
- `automationName` as computed value -> Compute internally
- `onViewStateChange` callback -> Replace with URL params or context
- `navigationRef` for parent breadcrumb control -> Internalize

### 1.4 Verification

- [ ] All L1 navigation routes work (Home, Decision Assistant, Decision Automations, Rules, Dashboards, Objectives, Resource Hub)
- [ ] Automation detail page loads with correct `automationId`
- [ ] Resource detail page loads with correct `resourceId`
- [ ] Browser back/forward works
- [ ] Panel system still functions at all levels (section, page, global)
- [ ] Breadcrumbs still render correctly
- [ ] Branch switcher still functions
- [ ] Chat layout still works

---

## Step 2: Replace `lucide-react` Icons with `@carbon/icons-react`

### 2.1 Icon mapping

| lucide-react | @carbon/icons-react | Used in |
|-------------|-------------------|---------|
| `Bot` | `WatsonxAi` or `Bot` (use `ChatBot` from Carbon) | `GlobalHeader.tsx` |
| `ChevronRight` | `ChevronRight` (already exists in Carbon) | `AutomationDetailPage.tsx` |
| `Folder` | `Folder` | `TaskModelPage.tsx` |
| `FileText` | `Document` | `TaskModelPage.tsx` |
| `Search` | `Search` | `TaskModelPage.tsx` |
| `LayoutGrid` | `Grid` | `TaskModelPage.tsx` |
| `List` | `List` | `TaskModelPage.tsx` |
| `AlignJustify` | `Menu` | `TaskModelPage.tsx` |
| `Code` | `Code` | `TaskModelPage.tsx` |
| `PanelLeftOpen` | `SidePanelOpen` | `DecisionAssistantPanel.tsx` |
| `X` | `Close` (already used elsewhere) | 5 panel components |
| `Book` | `Book` | `HelpPanel.tsx` |
| `MessageCircle` | `Chat` | `HelpPanel.tsx` |
| `Video` | `Video` | `HelpPanel.tsx` |
| `ExternalLink` | `Launch` | `HelpPanel.tsx` |
| `Lightbulb` | `Idea` | `HelpPanel.tsx` |
| `Box` | `Cube` | `PlaceholderPanelA/B/C.tsx` |
| `Send` | `Send` | `ChatInterface.tsx` |
| `User` | `User` | `ChatInterface.tsx` |

### 2.2 Files to change

1. `/components/GlobalHeader.tsx` - Replace `Bot` import
2. `/components/pages/AutomationDetailPage.tsx` - Replace `ChevronRight` import
3. `/components/pages/TaskModelPage.tsx` - Replace 7 icon imports
4. `/components/SidePanel/panels/DecisionAssistantPanel.tsx` - Replace `PanelLeftOpen`, `X`
5. `/components/SidePanel/panels/HelpPanel.tsx` - Replace 7 icon imports
6. `/components/SidePanel/panels/PlaceholderPanelA.tsx` - Replace `X`, `Box`
7. `/components/SidePanel/panels/PlaceholderPanelB.tsx` - Replace `X`, `Box`
8. `/components/SidePanel/panels/PlaceholderPanelC.tsx` - Replace `X`, `Box`
9. `/components/ChatInterface.tsx` - Replace `Send`, `Bot`, `User`

**Note:** Carbon icons use a `size` prop (number) instead of lucide's className sizing. Each replacement needs adjustment:
```tsx
// Before (lucide)
<X className="size-4" />

// After (Carbon)
<Close size={16} />
```

### 2.3 Verification

- [ ] All icons render at correct sizes
- [ ] Icon colors match (Carbon icons use `fill="currentColor"` by default)
- [ ] No lucide-react imports remain

---

## Step 3: Replace Custom Button with `@carbon/react` Button

### 3.1 Strategy: Barrel Export Swap

The custom `Carbon/Button.tsx` already matches Carbon's API (`kind`, `size`, `disabled`). The simplest migration is to update the barrel export to re-export from `@carbon/react`.

**Edit:** `/components/Carbon/index.ts`

```tsx
// BEFORE
export { default as Button } from './Button';
export type { ButtonProps, ButtonSize, ButtonKind, ButtonTheme } from './Button';

// AFTER
export { Button } from '@carbon/react';
export type { ButtonProps } from '@carbon/react';
// Note: ButtonSize, ButtonKind, ButtonTheme are internal Carbon types
```

### 3.2 Prop compatibility audit

Carbon `@carbon/react` Button props vs custom clone:

| Prop | Custom Clone | `@carbon/react` Button | Compatible? |
|------|-------------|----------------------|-------------|
| `kind` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger' \| 'danger--primary' \| 'danger--tertiary' \| 'danger--ghost'` | Same | YES |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | Same | YES |
| `disabled` | boolean | boolean | YES |
| `className` | string | string | YES |
| `children` | ReactNode | ReactNode | YES |
| `onClick` | function | function | YES |
| `renderIcon` | ReactNode | ComponentType | DIFFERENT |
| `iconDescription` | string | string | YES |
| `isSelected` | boolean | N/A in base Button | CUSTOM - remove |
| `theme` | `'white' \| 'g10' \| 'g90' \| 'g100'` | N/A (use Theme component) | CUSTOM - remove |

**Breaking changes to fix in consumers:**
- `renderIcon` - Custom clone accepts `ReactNode`, Carbon expects `ComponentType`. Need to audit each consumer using `renderIcon`.
- `isSelected` - Used by custom clone, not in Carbon. Check if any consumers use it.
- `theme` - Not a Carbon Button prop. Check if any consumers use it.

### 3.3 Audit each consumer for prop compatibility

**Files to audit and potentially update (9 files):**

1. `/components/PageHeader.tsx` - Check Button usage
2. `/components/pages/DecisionAutomationsPage.tsx` - Check Button usage
3. `/components/pages/HomePage.tsx` - Check Button usage
4. `/components/SideRailNavigation/SideRailHeader.tsx` - Check Button usage
5. `/components/SideRailNavigation/SideRailActionButton.tsx` - Check Button usage
6. `/components/InboxLayout/InboxActionButton.tsx` - Check Button usage
7. `/components/HomePage/HomePageHeader.tsx` - Check Button usage
8. `/components/HomePage/PinnedDecisionAutomationSection.tsx` - Check Button usage
9. `/components/HomePage/RecentDecisionAutomationsSection.tsx` - Check Button usage

**For each file, check:**
- Is `renderIcon` used? If so, change from `<Icon />` to `Icon` (component reference)
- Is `isSelected` used? If so, implement via className
- Is `theme` used? If so, wrap with Carbon `<Theme>` component
- Is `ref` forwarded? Carbon Button supports `forwardRef`

### 3.4 Also replace IconButton

**Edit:** `/components/Carbon/index.ts` to also re-export Carbon's `IconButton`:

```tsx
export { Button, IconButton } from '@carbon/react';
```

**IconButton consumers:**
- `/components/Carbon/OverflowMenuButton.tsx` - imports local `IconButton`

### 3.5 Files to delete after migration

```
/components/Carbon/Button.tsx
/components/Carbon/Button.module.css
/components/Carbon/Button.README.md
/components/Carbon/Button.COMPOSITION.md
/components/Carbon/Button.examples.tsx
/components/Carbon/BUTTON_IMPLEMENTATION.md
/components/Carbon/IconButton.tsx
/components/Carbon/IconButton.module.css
```

### 3.6 Verification

- [ ] All 9 consumer files render buttons correctly
- [ ] Button kinds display correctly (primary, secondary, tertiary, ghost, danger)
- [ ] Button sizes are correct
- [ ] Disabled state works
- [ ] onClick handlers fire
- [ ] Icons in buttons render correctly
- [ ] No visual regressions in button styling

---

## Step 4: Replace Custom Modal with `@carbon/react` Modal

### 4.1 Create wrapper or update barrel export

**Option A: Direct replacement via `/components/Modal/index.ts`**

Create a thin adapter that maps existing props to Carbon Modal props:

```tsx
// /components/Modal/index.ts
// Re-export Carbon Modal with our naming conventions
export { Modal as CarbonModal } from '@carbon/react';
export { default as Modal } from './ModalAdapter';
export { default as DisplaySettingsContent } from './DisplaySettingsContent';
```

**Create:** `/components/Modal/ModalAdapter.tsx`

Maps current API:
```
isOpen            -> open
onClose           -> onRequestClose  
title             -> modalHeading
size='small'      -> size='sm'
size='medium'     -> size='md'  
size='large'      -> size='lg'
primaryButtonText -> primaryButtonText
secondaryButtonText -> secondaryButtonText
onPrimaryClick    -> onRequestSubmit
onSecondaryClick  -> onSecondarySubmit
children          -> children (inside ModalBody)
```

### 4.2 Update consumers (4 files)

1. `/components/pages/BranchesPage.tsx` - `import Modal from '../Modal'` -> verify adapter works
2. `/components/pages/VersionsPage.tsx` - `import { Modal } from '../Modal'` -> verify
3. `/components/pages/DeployAutomationPage.tsx` - `import { Modal } from '../Modal'` -> verify
4. `/components/HomePage/HomePageHeader.tsx` - `import { Modal, DisplaySettingsContent } from '../Modal'` -> verify

### 4.3 Files to delete after migration

```
/components/Modal/Modal.tsx (replaced by ModalAdapter)
/components/Modal/Modal.module.css
```

**Keep:** `/components/Modal/DisplaySettingsContent.tsx` (content component, not a modal primitive)

### 4.4 Verification

- [ ] All 4 modal instances open correctly
- [ ] Modal closes on Escape key
- [ ] Modal closes on backdrop click
- [ ] Primary and secondary buttons work
- [ ] Modal sizes render correctly
- [ ] Focus trap works
- [ ] Body scroll is locked when modal is open

---

## Step 5: Replace Custom OverflowMenu Components

### 5.1 Strategy

Replace custom `Carbon/OverflowMenuButton.tsx`, `Carbon/OverflowMenuContent.tsx`, `Carbon/MenuItem.tsx`, `Carbon/MenuDivider.tsx` AND root-level `OverflowMenu.tsx` with `@carbon/react` equivalents.

**Carbon provides:**
- `OverflowMenu` - Trigger button + menu container
- `OverflowMenuItem` - Menu item

### 5.2 Create adapter or map directly

The custom `OverflowMenuButton` is a composition of `IconButton` + portal-based `OverflowMenuContent`. Carbon's `OverflowMenu` handles this natively.

**Consumers to update:**

1. `/components/CardLayout/Card.tsx` - Uses `OverflowMenuButton`, `MenuItem`, `MenuDivider`
   - Replace with Carbon `OverflowMenu` + `OverflowMenuItem`
   - `MenuDivider` -> Use `OverflowMenuItem` with `hasDivider` prop

2. `/components/LargeListItem.tsx` - Uses `OverflowMenuButton`, `MenuItem`, `MenuDivider`
   - Same replacement pattern

3. `/components/InboxLayout/InboxActionButton.tsx` - Uses root `OverflowMenu` 
   - Replace with Carbon `OverflowMenu`

### 5.3 Update barrel export

**Edit:** `/components/Carbon/index.ts`

```tsx
export { OverflowMenu, OverflowMenuItem } from '@carbon/react';
// Remove: OverflowMenuButton, OverflowMenuContent, MenuItem, MenuDivider
```

### 5.4 Files to delete

```
/components/Carbon/OverflowMenuButton.tsx
/components/Carbon/OverflowMenuContent.tsx
/components/Carbon/OverflowMenuContent.module.css
/components/Carbon/MenuItem.tsx
/components/Carbon/MenuItem.module.css
/components/Carbon/MenuDivider.tsx
/components/Carbon/MenuDivider.module.css
/components/OverflowMenu.tsx
/components/OverflowMenu.module.css
```

### 5.5 Verification

- [ ] Card overflow menus open and display correctly
- [ ] Menu items are clickable
- [ ] Menu dividers render
- [ ] Danger items styled correctly
- [ ] Menu closes on outside click
- [ ] Menu closes on Escape
- [ ] LargeListItem overflow menus work
- [ ] InboxActionButton combo button menus work

---

## Step 6: Replace Tearsheet with `@carbon/ibm-products` Tearsheet

### 6.1 Create adapter

**Create:** `/components/TearsheetAdapter.tsx`

Map existing props to `@carbon/ibm-products` Tearsheet:

```
isOpen              -> open
onClose             -> onClose
title               -> title
description         -> description  
primaryButtonText   -> actions[0] with kind='primary'
secondaryButtonText -> actions[1] with kind='secondary'
tertiaryButtonText  -> actions[2] with kind='ghost'
onPrimaryClick      -> actions[0].onClick
onSecondaryClick    -> actions[1].onClick
onTertiaryClick     -> actions[2].onClick
children            -> children
```

### 6.2 Update consumer

1. `/components/InboxLayout/InboxActionButton.tsx` - `import Tearsheet from '../Tearsheet'`
   - Update import to use adapter or directly use Carbon Tearsheet

### 6.3 Files to delete

```
/components/Tearsheet.tsx
/components/Tearsheet.module.css
/components/TearsheetNarrow.tsx
/components/TearsheetNarrow.module.css
```

### 6.4 Verification

- [ ] Tearsheet slides up from bottom
- [ ] Close button works
- [ ] Action buttons work
- [ ] Escape key closes tearsheet
- [ ] Animation is smooth (240ms productive motion)

---

## Step 7: Replace Global Header with Carbon UI Shell Header

### 7.1 Create new Carbon Header component

**Create:** `/components/CarbonHeader/CarbonHeader.tsx`

Using `@carbon/react` components:
- `Header`
- `HeaderMenuButton` (replaces custom ToggleButton)
- `HeaderName` (replaces product name section)
- `HeaderGlobalBar` (replaces utility buttons container)
- `HeaderGlobalAction` (replaces each utility button)
- `SkipToContent` (accessibility)

**Preserve all behavior from `GlobalHeader.tsx`:**
- Navigation toggle (hamburger menu)
- "Give feedback" link
- Documents button
- Decision Assistant button (opens global influence panel)
- Help button (opens global overlay panel)
- User profile button with initials
- Active state on panel trigger buttons
- Close navigation when opening global panel

### 7.2 Replace inline SVG icons

Current `GlobalHeader.tsx` uses inline SVGs for: Menu, Close, DocumentMultiple02, Help

Replace with `@carbon/icons-react`:
- Menu icon -> `Menu` from `@carbon/icons-react`
- Close icon -> `Close` from `@carbon/icons-react`  
- DocumentMultiple02 -> `DocumentMultiple02` from `@carbon/icons-react`
- Help -> `Help` from `@carbon/icons-react`
- Bot (lucide) -> `ChatBot` from `@carbon/icons-react`

### 7.3 Update App.tsx (or AppLayout.tsx after routing)

Replace `<GlobalHeader />` with `<CarbonHeader />`

### 7.4 Files to delete

```
/components/GlobalHeader.tsx
/components/GlobalHeader.module.css
```

### 7.5 Verification

- [ ] Header renders at 48px height
- [ ] Hamburger toggle opens/closes navigation
- [ ] "IBM Decision Intelligence" product name displays
- [ ] All utility buttons render and function
- [ ] Panel triggers still open correct panels
- [ ] Active states show on panel trigger buttons
- [ ] User profile button with initials renders
- [ ] Dark theme (g100) applied to header

---

## Step 8: Replace Navigation Panel with Carbon SideNav

### 8.1 Create Carbon SideNav component

**Create:** `/components/CarbonSideNav/CarbonSideNav.tsx`

Using `@carbon/react`:
- `SideNav`
- `SideNavItems`
- `SideNavLink`
- `SideNavDivider` (if available, else custom)

**Map current navigation items:**

Current items in `NavigationPanel.tsx` (with inline SVG icons):
1. Home -> `Home` icon
2. Decision assistant -> `ChatBot` icon
3. Decision automations -> `FlowModeler` or `DecisionTree` icon
4. Rules & policies -> `Rule` icon
5. Dashboards -> `Dashboard` icon
6. Objectives & goals -> `Target` or `Flag` icon
7. Resource hub -> `Catalog` icon

**Preserve behavior:**
- Slide-in overlay pattern
- Active item highlighting based on current route
- Close on item selection (mobile)
- Dark theme (g100)

### 8.2 Update App.tsx/AppLayout.tsx

Replace `<GlobalNavigationPanel />` with `<CarbonSideNav />`

### 8.3 Files to delete

```
/components/NavigationPanel.tsx
/components/GlobalNavigationPanel.module.css
```

### 8.4 Verification

- [ ] All 7 navigation items render
- [ ] Icons display correctly
- [ ] Active state matches current route
- [ ] Clicking item navigates and closes panel
- [ ] Overlay/slide animation works
- [ ] Dark theme colors match header

---

## Step 9: Replace Breadcrumb with Carbon Breadcrumb

### 9.1 Update BreadcrumbActionBar to use Carbon Breadcrumb

**Edit:** `/components/BreadcrumbActionBar.tsx`

Replace custom breadcrumb rendering with:
```tsx
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
```

Keep the action bar layout (buttons, branch switcher, panel triggers) - those are custom patterns.

### 9.2 Also update FigmaActionButton

Replace `FigmaActionButton` with Carbon `Button` where used in `BreadcrumbActionBar.tsx`.

### 9.3 Files to potentially delete

```
/components/FigmaActionButton.tsx
/components/FigmaActionButton.module.css
```

### 9.4 Verification

- [ ] Breadcrumbs render with correct hierarchy
- [ ] Breadcrumb separator "/" renders
- [ ] Clickable breadcrumbs navigate correctly
- [ ] Current page breadcrumb is non-clickable
- [ ] Action buttons still render
- [ ] Branch switcher still works
- [ ] Panel trigger icons still work

---

## Step 10: Replace Custom Tooltip

### 10.1 Replace Tooltip in SideRailNavigation

**Edit:** `/components/SideRailNavigation/Tooltip.tsx`

Replace with `@carbon/react` `Tooltip`:
```tsx
import { Tooltip } from '@carbon/react';
```

### 10.2 Update SideRailNavigation barrel export

**Edit:** `/components/SideRailNavigation/index.ts` - update Tooltip export

### 10.3 Files to delete

```
/components/SideRailNavigation/Tooltip.tsx
/components/SideRailNavigation/Tooltip.module.css
```

### 10.4 Verification

- [ ] Side rail tooltips appear on hover over collapsed rail items
- [ ] Tooltips position correctly (right of rail)
- [ ] Tooltips disappear on mouse leave

---

## Step 11: Replace TreeNavigation with Carbon TreeView

### 11.1 Update TreeNavigation

**Edit:** `/components/TreeNavigation/TreeNavigation.tsx`

Replace with `@carbon/react`:
```tsx
import { TreeView, TreeNode } from '@carbon/react';
```

**Current consumers:**
- `TaskModelPage.tsx` - `import { TreeNavigation, TreeNode } from '../TreeNavigation'`

### 11.2 Files to delete

```
/components/TreeNavigation/TreeNavigation.tsx
/components/TreeNavigation/TreeNavigation.module.css
/components/TreeNavigation/TreeNavigationItem.tsx
/components/TreeNavigation/TreeNavigationItem.module.css
/components/TreeNavigation/index.ts
/components/TreeNavigation/README.md
```

### 11.3 Verification

- [ ] Tree renders with correct hierarchy
- [ ] Nodes expand/collapse
- [ ] Active node highlighted
- [ ] Icons render in tree nodes
- [ ] Click handler fires on node selection

---

## Step 12: Panel System - Deep Compatibility Analysis & Migration

### 12.1 `@carbon/ibm-products` SidePanel vs. Our Panel System

**Thorough evaluation of whether Carbon's SidePanel can replace our custom panel infrastructure.**

#### Carbon SidePanel API (from `@carbon/ibm-products`)

```tsx
<SidePanel
  open={boolean}                    // Controls visibility
  onRequestClose={fn}               // Close callback
  title="Panel Title"               // Built-in header with title
  subtitle="Subtitle"               // Built-in subtitle
  size="sm"                         // 'xs'(256px) | 'sm'(320px) | 'md'(480px) | 'lg'(640px)
  placement="right"                 // 'right' | 'left'
  slideIn={boolean}                 // Slide animation
  selectorPageContent="#content"    // CSS selector for content to push
  preventCloseOnClickOutside        // Optional backdrop behavior
  includeOverlay={boolean}          // Show backdrop overlay
  actions={[...]}                   // Built-in action buttons in footer
/>
```

#### Pattern-by-Pattern Compatibility

**Pattern 1: Global Overlay Panel (`GlobalPanelRenderer`)**

Current CSS: Fixed position, `top: 48px`, `right: 0`, `z-index: 9000`, g100 dark theme, custom content (no built-in header), `translateX` slide animation with `--cds-productive-02` timing, content stays mounted during 300ms close transition.

| Requirement | Carbon SidePanel | Verdict |
|------------|-----------------|---------|
| Fixed to viewport, right side | Yes, renders as portal | MATCH |
| Top offset: 48px (below header) | NO - fills full viewport height | **MISMATCH** |
| z-index: 9000 | Carbon uses its own z-index stack | **CONFLICT** |
| Dark theme (g100 background) | Would need `<Theme theme="g100">` wrapper | PARTIAL |
| Width: 240/320/384px variants | `size` prop only supports: 256/320/480/640 | **PARTIAL** (no 240 or 384) |
| Custom panel content (no built-in header) | Carbon FORCES its own header with title/close | **MISMATCH** |
| No backdrop | `includeOverlay={false}` | MATCH |
| Slide animation with `--cds-productive-02` timing | Carbon has its own animation timing | PARTIAL |
| Content stays mounted during 300ms close transition | Carbon unmounts immediately on close | **MISMATCH** |

**VERDICT: NOT suitable for Global Overlay.** The forced header, full-viewport height, and immediate unmount break our patterns.

---

**Pattern 2: Page Overlay Panel (`AutomationShellPanelRenderer`)**

Current CSS: Fixed position, `top: var(--panel-top-offset, 88px)`, `z-index: 6000`, 320px width, backdrop via `::before` pseudo-element, `requestAnimationFrame`-controlled animation.

| Requirement | Carbon SidePanel | Verdict |
|------------|-----------------|---------|
| Fixed position, top: 88px (header + breadcrumb) | NO - full viewport | **MISMATCH** |
| z-index: 6000 | Carbon's own z-index system | **CONFLICT** |
| Width: 320px always | `size="sm"` gives 320px | MATCH |
| Backdrop (::before pseudo-element) | `includeOverlay` | MATCH |
| Positioned relative to automation shell | Carbon positions relative to viewport | **MISMATCH** |
| Custom panel content (no built-in header) | Carbon FORCES its own header | **MISMATCH** |
| `requestAnimationFrame` controlled animation | Carbon controls its own animation | **MISMATCH** |

**VERDICT: NOT suitable for Page Overlay.** Custom top offset and scoped positioning are unsupported.

---

**Pattern 3: Page Influence Panel (`InfluencedLayout`)**

Current CSS: Flexbox container, `margin-right: 320px` on content when open, absolutely positioned panel within container, selective child influence (breadcrumb NOT pushed, content area IS pushed).

| Requirement | Carbon SidePanel | Verdict |
|------------|-----------------|---------|
| Content gets `margin-right: 320px` when open | `selectorPageContent` pushes content | PARTIAL |
| Selective influence: breadcrumb NOT pushed, content IS pushed | `selectorPageContent` pushes ALL matched content | **MISMATCH** |
| Panel within flex container (not viewport-fixed) | Carbon renders as portal at `<body>` level | **MISMATCH** |
| Children-based influence (first child exempt via slicing) | No concept of selective children | **MISMATCH** |
| Responsive: overlay fallback on mobile (<672px) | No automatic responsive behavior | **MISMATCH** |

**VERDICT: NOT suitable for Page Influence.** The selective influence pattern (exempting breadcrumbs from push) is fundamentally unsupported.

---

**Pattern 4: Section Influence Panel (`SectionInfluencedLayout`)**

Current CSS: Scoped to section container, `margin-right` based on panel width (240/320/384), absolute within section, `z-index: 1`, responsive fallback to overlay.

| Requirement | Carbon SidePanel | Verdict |
|------------|-----------------|---------|
| Scoped to section container only | Carbon operates at page/viewport level | **MISMATCH** |
| Only pushes sibling content within flex | Pushes via CSS selector on page | **MISMATCH** |
| z-index: 1 (lowest tier, within content flow) | Carbon's z-index would override everything | **MISMATCH** |
| Multiple width variants (240/320/384) | Limited to Carbon's size options (256/320/480/640) | **PARTIAL** |
| Responsive: falls back to overlay on mobile (<672px) | No automatic responsive behavior | **MISMATCH** |

**VERDICT: NOT suitable for Section Influence.** Section-scoped influence is completely unsupported by Carbon SidePanel.

---

### 12.2 Decision: KEEP Custom Panel Infrastructure

**Based on the pattern-by-pattern analysis above, `@carbon/ibm-products` SidePanel CANNOT replace our panel system.** The fundamental architecture differs:

- **Our system:** Panels exist at multiple DOM levels (section, page, global) with scoped influence and selective child exemption
- **Carbon SidePanel:** Single portal-based panel at viewport level with page-wide push

**Files to KEEP (entire custom panel infrastructure):**

| File | Role | Why Keep |
|------|------|----------|
| `PanelManager.tsx` | State management: open/close, levels, patterns, transition-aware unmount | No Carbon equivalent for multi-tier state |
| `SidePanelContext.tsx` | Layout coordination (isPanelOpen boolean signal) | Feeds data to layout components |
| `UniversalPanelWrapper.tsx` | Rendering delegation (which renderer handles which panel) | Orchestration logic, no Carbon equivalent |
| `InfluencedLayout.tsx` + `.module.css` | Page-level push/influence with selective children (breadcrumb exempt) | **No Carbon equivalent** |
| `GridLayout.tsx` + `.module.css` | Page-level overlay with custom top-offset | Carbon SidePanel doesn't support custom offsets |
| `SectionInfluencedLayout.tsx` + `.module.css` | Section-level push/influence scoped to a container | **No Carbon equivalent** |
| `GlobalPanelRenderer.tsx` + `.module.css` | Global overlay with g100 theme, custom z-index + top offset | Carbon SidePanel doesn't support custom offsets or themes |
| `AutomationShellPanelRenderer.tsx` + `.module.css` | Page overlay within automation shell with side-rail awareness | Custom positioning relative to shell |
| `SectionPanelRenderer.tsx` + `.module.css` | Section overlay rendering | Custom positioning |
| `PanelTriggerButton.tsx` + `.module.css` | Trigger component tied to SidePanelContext | Works with our context, not Carbon's |
| `PanelIntegration.tsx` | Utility hooks for panel triggers | Convenience layer |
| All panel content components (`HelpPanel`, `SettingsPanel`, `AssetDetailsPanel`, etc.) | Panel bodies with domain-specific content | Application logic, not UI primitives |

### 12.3 What DOES Change: CSS Compliance Audit

Even though we keep the infrastructure, ALL panel CSS must be audited and fixed to be fully Carbon-compliant per the Styling Rules at the top of this document.

**Current CSS violations found in panel system:**

1. **`GlobalPanelRenderer.module.css`** line 11:
   - `z-index: 9000` - Magic number. Must reference a CSS variable.
   - `top: 48px` - Hardcoded pixel value. Must reference `--header-height`.

2. **`AutomationShellPanelRenderer.module.css`** line 40:
   - `background-color: rgba(0, 0, 0, 0.5)` in backdrop - Must use `var(--cds-overlay)` token.
   - `z-index: 6000` - Magic number. Must reference a CSS variable.

3. **`InfluencedLayout.module.css`** line 83:
   - `background: rgba(22, 22, 22, 0.32)` in mobile backdrop - Must use `var(--cds-overlay)`.
   - `z-index: 101` and `z-index: 100` - Must reference CSS variables.

4. **`SectionInfluencedLayout.module.css`** line 96:
   - `background: rgba(22, 22, 22, 0.32)` - Must use `var(--cds-overlay)`.

5. **`GridLayout.module.css`** line 21:
   - `background: rgba(22, 22, 22, 0.32)` in backdrop - Must use `var(--cds-overlay)`.

### 12.4 Specific CSS fixes to apply

**Add to `/styles/globals.css` - Panel z-index and layout variables:**

```css
:root {
  /* Panel Z-Index System - Documented ranges with room between tiers */
  --z-panel-section: 1;
  --z-panel-page: 100;
  --z-panel-page-backdrop: 99;
  --z-panel-automation-shell: 6000;
  --z-panel-global: 9000;
  --z-panel-global-backdrop: 8999;
  --z-modal: 10000;

  /* Panel positioning offsets */
  --header-height: 48px;
  --breadcrumb-height: 40px;

  /* Panel width system */
  --panel-width-narrow: 240px;
  --panel-width-standard: 320px;
  --panel-width-wide: 384px;
}
```

**Update each panel `.module.css` to reference these variables:**

| Find (hardcoded) | Replace with (variable) |
|-------------------|------------------------|
| `z-index: 9000` | `z-index: var(--z-panel-global)` |
| `z-index: 6000` | `z-index: var(--z-panel-automation-shell)` |
| `z-index: 101` | `z-index: calc(var(--z-panel-page) + 1)` |
| `z-index: 100` | `z-index: var(--z-panel-page)` |
| `top: 48px` | `top: var(--header-height)` |
| `height: calc(100vh - 48px)` | `height: calc(100vh - var(--header-height))` |
| `width: 320px` (panel) | `width: var(--panel-width-standard)` |
| `width: 240px` (panel) | `width: var(--panel-width-narrow)` |
| `width: 384px` (panel) | `width: var(--panel-width-wide)` |
| `margin-right: 320px` | `margin-right: var(--panel-width-standard)` |
| `margin-right: 240px` | `margin-right: var(--panel-width-narrow)` |
| `margin-right: 384px` | `margin-right: var(--panel-width-wide)` |
| `rgba(22, 22, 22, 0.32)` | `var(--cds-overlay)` |
| `rgba(0, 0, 0, 0.5)` | `var(--cds-overlay)` |

**Also audit all panel content `.module.css` files:**
- `HelpPanel.module.css`, `SettingsPanel.module.css`, `AssetDetailsPanel.module.css`, `ServiceDetailsPanel.module.css`, `DecisionAssistantPanel.module.css`, `PlaceholderPanelA/B/C.module.css`, `ResourceDetailsPanel.module.css`
- Verify all spacing uses `--cds-spacing-*` tokens
- Verify all text colors use `--cds-text-*` tokens  
- Verify all backgrounds use `--cds-layer`, `--cds-background`, or `--cds-header-*` tokens
- Verify all borders use `--cds-border-subtle`
- Verify no inline styles exist in the corresponding `.tsx` files

### 12.5 Panel content components: Replace lucide icons

Panel content components use `lucide-react` icons (these are also listed in Step 2 but repeated here as part of panel system scope):

| Component | lucide icons to replace | Carbon replacement |
|-----------|------------------------|-------------------|
| `HelpPanel.tsx` | `X, Book, FileText, MessageCircle, Video, ExternalLink, Lightbulb` | `Close, Book, Document, Chat, Video, Launch, Idea` |
| `DecisionAssistantPanel.tsx` | `PanelLeftOpen, X` | `SidePanelOpen, Close` |
| `PlaceholderPanelA.tsx` | `X, Box` | `Close, Cube` |
| `PlaceholderPanelB.tsx` | `X, Box` | `Close, Cube` |
| `PlaceholderPanelC.tsx` | `X, Box` | `Close, Cube` |
| `AssetDetailsPanel.tsx` | Already uses Carbon `Close` | No change needed |
| `SettingsPanel.tsx` | Already uses Carbon `Close` | No change needed |
| `ServiceDetailsPanel.tsx` | Already uses Carbon `Close` | No change needed |

### 12.6 Carbon Grid Compatibility with Panel Influence Pattern

**Question: Does Carbon `<Grid>` / `<Column>` work inside our panel influence layouts?**

**How the influence pattern works (CSS):**

```css
/* InfluencedLayout.module.css */
.panelContainer {
  display: flex;                          /* Flexbox container */
}
.mainContent {
  flex: 1;                                /* Takes remaining space */
  margin-right: 0;                        /* Default: full width */
  transition: all var(--cds-productive-02);
}
.mainContent[data-panel-open="true"] {
  margin-right: var(--panel-width-standard); /* Panel open: shrink */
}
.sidePanel {
  position: absolute;                     /* Panel overlays from right */
  right: 0;
  width: var(--panel-width-standard);
}
```

**How Carbon Grid works:**

Carbon's `<Grid>` renders as `display: grid; grid-template-columns: repeat(16, 1fr); width: 100%`. When placed inside `.mainContent`, the Grid's 16 columns recalculate within the available width (which shrinks by 320px when panel opens).

**Example - 1200px viewport:**
```
Panel closed: .mainContent = 1200px → Grid = 1200px → 16 cols at 75px each
Panel open:   .mainContent = 880px  → Grid = 880px  → 16 cols at 55px each
```

Columns compress proportionally. Content reflows. **This IS the Carbon Grid Influencer pattern** as described at https://carbondesignsystem.com/elements/2x-grid/overview/#grid-influencers.

**Test: Grid inside SectionInfluencedLayout**

Same mechanism: section's `.mainContent` shrinks via `margin-right`, Carbon Grid recalculates.

**VERDICT: Carbon `<Grid>` / `<Column>` IS fully compatible with our panel influence pattern.** No modifications needed. The Grid responds to its container width, and our panel system controls that width.

**Test scenarios to run during Step 13:**
- [ ] Carbon Grid inside `InfluencedLayout` reflows columns when page panel opens/closes
- [ ] Carbon Grid inside `SectionInfluencedLayout` reflows when section panel opens/closes
- [ ] Column responsive breakpoints (`sm`, `md`, `lg`) trigger correctly when panel reduces available width
- [ ] Card grids inside influenced layouts maintain correct column counts
- [ ] No layout shift or jank during panel open/close transitions

### 12.7 Verification

**CSS compliance (per Styling Rules):**
- [ ] All panel CSS uses Carbon tokens (no hardcoded colors, spacing, timing)
- [ ] Z-index variables defined in `globals.css` and referenced in ALL panel CSS files
- [ ] Panel width variables (`--panel-width-standard`, etc.) used for all width/margin values
- [ ] Header height variable used for all top offset calculations
- [ ] Overlay backdrop uses `var(--cds-overlay)` not hardcoded rgba values
- [ ] No inline styles in any panel `.tsx` component (except dynamic interaction values)
- [ ] All panel animations use `--cds-productive-02` timing token
- [ ] All new/modified CSS is in `.module.css` files (no inline styles)

**Functional (no regressions):**
- [ ] Global overlay panels open/close with smooth animation
- [ ] Global influence panels push ALL content (breadcrumb + page content)
- [ ] Page influence panels push content selectively (breadcrumb exempt, content pushed)
- [ ] Page overlay panels open/close within automation shell
- [ ] Section influence panels push only their section's sibling content
- [ ] Panels close on route change (non-global panels only)
- [ ] Global panels persist across route changes
- [ ] Panels close on Escape key
- [ ] Panel toggle behavior works (click same trigger closes)
- [ ] Only one panel open at a time (new panel replaces open panel)
- [ ] 320px panel width maintained at all tiers
- [ ] Z-index layering correct: section(1) < page(100) < automation-shell(6000) < global(9000)
- [ ] Responsive: panels fall back to overlay on mobile (<672px)
- [ ] Carbon Grid components reflow correctly inside influenced layouts

---

## Step 13: Replace Custom Grid CSS with Carbon Grid Components

### 13.1 Strategy

The custom grid CSS in `globals.css` (~200 lines of `.cds--grid`, `.cds--col-*` classes) conflicts with Carbon's actual grid classes. Replace usage with Carbon Grid components.

**Carbon Grid components:**
```tsx
import { Grid, Column } from '@carbon/react';

<Grid>
  <Column sm={4} md={8} lg={16}>Full width</Column>
  <Column sm={4} md={4} lg={8}>Half width</Column>
</Grid>
```

### 13.2 Files using custom grid classes

Search for `cds--grid`, `cds--col-`, `cds--subgrid`, `card-grid` class usage across all `.tsx` and `.module.css` files.

**Update each to use Carbon Grid/Column components or the built-in Carbon grid classes.**

### 13.3 Clean up globals.css

Remove the entire "IBM Carbon 16-Column Grid System" section from `/styles/globals.css` (~250 lines from line 343 onward).

### 13.4 Verification

- [ ] Home page card grids display correctly at all breakpoints
- [ ] Decision automations card grid works
- [ ] All page layouts maintain correct proportions
- [ ] Responsive behavior works (sm, md, lg, xl, max breakpoints)
- [ ] No broken layouts

---

## Step 14: Align Token System

### 14.1 Verify Carbon theme tokens

With `@carbon/styles/css/styles.css` already imported, Carbon's theme tokens should be available. Verify that the manually-defined `--cds-*` variables in `globals.css` match what Carbon provides.

### 14.2 Remove manual token definitions

Remove the manual `--cds-*` variable definitions (lines 6-98 of `globals.css`) if Carbon's import provides them.

**KEEP:** Custom design tokens (lines 100+) that are app-specific extensions.

### 14.3 Verification

- [ ] All colors match before/after
- [ ] Spacing is identical
- [ ] Typography renders correctly
- [ ] No visual regressions

---

## Step 15: Chat Interface Migration (Optional/Future)

### 15.1 Evaluate `@carbon/chat` or `@carbon/ai-chat`

Check if `@carbon/chat` package is available and compatible. If so:

**Replace:**
- `/components/ChatInterface.tsx` -> Carbon Chat components
- `/components/ChatSidebar.tsx` -> Carbon Chat sidebar (if available)

**Keep custom if Carbon Chat doesn't support:**
- Conversation switching
- Custom data hooks integration
- Existing layout

### 15.2 This step is lower priority and can be deferred

---

## Step 16: Final Cleanup

### 16.1 Delete all replaced files

Consolidated list of all files to delete across all steps:

```
# Step 0 - Dead code
/components/ui/*.tsx (48 files)
/components/ui/utils.ts
/components/ui/use-mobile.ts
All root-level .md files (except Attributions.md)

# Step 3 - Button
/components/Carbon/Button.tsx
/components/Carbon/Button.module.css
/components/Carbon/Button.README.md
/components/Carbon/Button.COMPOSITION.md
/components/Carbon/Button.examples.tsx
/components/Carbon/BUTTON_IMPLEMENTATION.md
/components/Carbon/IconButton.tsx
/components/Carbon/IconButton.module.css

# Step 4 - Modal
/components/Modal/Modal.tsx (after ModalAdapter confirmed)
/components/Modal/Modal.module.css

# Step 5 - Overflow Menu
/components/Carbon/OverflowMenuButton.tsx
/components/Carbon/OverflowMenuContent.tsx
/components/Carbon/OverflowMenuContent.module.css
/components/Carbon/MenuItem.tsx
/components/Carbon/MenuItem.module.css
/components/Carbon/MenuDivider.tsx
/components/Carbon/MenuDivider.module.css
/components/OverflowMenu.tsx
/components/OverflowMenu.module.css

# Step 6 - Tearsheet
/components/Tearsheet.tsx
/components/Tearsheet.module.css
/components/TearsheetNarrow.tsx
/components/TearsheetNarrow.module.css

# Step 7 - Header
/components/GlobalHeader.tsx
/components/GlobalHeader.module.css

# Step 8 - Navigation
/components/NavigationPanel.tsx
/components/GlobalNavigationPanel.module.css

# Step 9 - Breadcrumb action button
/components/FigmaActionButton.tsx
/components/FigmaActionButton.module.css

# Step 10 - Tooltip
/components/SideRailNavigation/Tooltip.tsx
/components/SideRailNavigation/Tooltip.module.css

# Step 11 - TreeNavigation
/components/TreeNavigation/ (entire directory)
```

### 16.2 Update `/components/Carbon/index.ts` final state

```tsx
// Carbon Design System v11 Components - Re-exported from @carbon/react
// This barrel maintains our existing import patterns while using official components
export { Button, IconButton, OverflowMenu, OverflowMenuItem } from '@carbon/react';
```

### 16.3 Final verification checklist

- [ ] Zero imports from deleted files
- [ ] Zero lucide-react imports
- [ ] All `@carbon/react` components render correctly
- [ ] All `@carbon/ibm-products` components render correctly
- [ ] Full keyboard navigation works
- [ ] All panel tiers function (section, page, global)
- [ ] All routes navigate correctly
- [ ] Browser back/forward works
- [ ] All data displays correctly (tables, cards, lists)
- [ ] Responsive at all Carbon breakpoints (sm, md, lg, xl, max)
- [ ] IBM Plex Sans typography throughout
- [ ] No hardcoded colors/spacing (all via CSS variables)
- [ ] No `!important` overrides of Carbon styles

---

## Execution Order & Dependencies

```
Step 0  (Cleanup)           -- No dependencies, do first
  |
Step 1  (React Router)      -- Foundation for all subsequent steps
  |
Step 2  (Lucide → Carbon icons) -- Independent, can parallel with Step 3
  |
Step 3  (Button)            -- Depends on Step 1 (routing stable)
  |
Step 4  (Modal)             -- Independent of Step 3
  |
Step 5  (OverflowMenu)      -- Independent of Step 4
  |
Step 6  (Tearsheet)         -- Independent, can parallel with Steps 4-5
  |
Step 7  (Header)            -- Depends on Step 1 (routing), Step 2 (icons)
  |
Step 8  (SideNav)           -- Depends on Step 7 (header integration)
  |
Step 9  (Breadcrumb)        -- Depends on Step 3 (Button)
  |
Step 10 (Tooltip)           -- Independent
  |
Step 11 (TreeView)          -- Independent
  |
Step 12 (Panel System)      -- Depends on Steps 3, 7, 8 (all consumers stable)
  |
Step 13 (Grid)              -- Depends on Step 12 (panel layouts)
  |
Step 14 (Tokens)            -- Last styling step
  |
Step 15 (Chat)              -- Optional, independent
  |
Step 16 (Final Cleanup)     -- After all steps verified
```

**Parallelizable groups:**
- Steps 2, 3, 4, 5, 6 can overlap (independent component replacements)
- Steps 10, 11 can run anytime after Step 1
- Step 15 can run anytime

**Critical path:** Step 0 → Step 1 → Step 7 → Step 8 → Step 12 → Step 13 → Step 16

---

## Session Planning

| Session | Steps | Estimated Changes |
|---------|-------|-------------------|
| Session 1 | Step 0 (Delete dead code) | Delete 48+ files |
| Session 2 | Step 1.1-1.2 (Router setup + AppLayout) | Create 2 files, edit App.tsx |
| Session 3 | Step 1.3 (Update page navigation props) | Edit ~8 page files |
| Session 4 | Step 2 (Replace lucide icons) | Edit 9 files |
| Session 5 | Step 3 (Replace Button) | Edit barrel + audit 9 consumers |
| Session 6 | Steps 4 + 5 (Modal + OverflowMenu) | Edit 7 files, create 1 adapter |
| Session 7 | Step 6 (Tearsheet) | Edit 1 file, create 1 adapter |
| Session 8 | Step 7 (Carbon Header) | Create 1 component, edit App.tsx |
| Session 9 | Step 8 (Carbon SideNav) | Create 1 component, edit App.tsx |
| Session 10 | Step 9 (Breadcrumb) | Edit BreadcrumbActionBar |
| Session 11 | Steps 10 + 11 (Tooltip + TreeView) | Edit 3 files |
| Session 12 | Step 12 (Panel System) | Edit 3 renderers |
| Session 13 | Steps 13 + 14 (Grid + Tokens) | Edit globals.css, multiple pages |
| Session 14 | Step 16 (Final cleanup + verification) | Delete files, final audit |

**Total: ~14 sessions**