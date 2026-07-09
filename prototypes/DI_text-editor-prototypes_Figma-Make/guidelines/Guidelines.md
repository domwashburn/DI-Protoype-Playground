# Development Guidelines v2.1

This document provides comprehensive guidelines for developing applications using IBM Carbon Design System v11 with AI assistance.

---

## Table of Contents

1. [AI Collaboration Guidelines](#ai-collaboration-guidelines)
2. [Design System & Styling](#design-system--styling)
3. [Application Architecture](#application-architecture)
4. [Component Development](#component-development)
5. [Layout & Grid System](#layout--grid-system)
6. [Panel System](#panel-system)
7. [State Management](#state-management)
8. [Migration Strategy - Strangler Pattern](#migration-strategy---strangler-pattern)
9. [Documentation Practices](#documentation-practices)
10. [Technical Patterns](#technical-patterns)
11. [Terminology Reference](#terminology-reference)

---

## AI Collaboration Guidelines

### Providing Context
When starting a new AI session, provide comprehensive background context:

* **Current project state**: What's been built, recent changes, current focus
* **Specific constraints**: Design system (Carbon v11), styling approach (CSS Modules + CSS Variables), typography requirements
* **Reference documentation**: Point to `/design-documentation/` files, component READMEs, and this guidelines file
* **Existing patterns**: Reference similar components or implementations in the codebase

**Example session opening:**
> "I'm working on [application name]. We use Carbon Design System v11, CSS Modules for scoping, CSS variables from `/styles/globals.css` for all styling values, and [font family] for all typography. We recently implemented a delegation pattern for panel rendering (see `/design-documentation/Panel-System.md`). I need to add [feature]..."

### Planning Before Implementation
For complex features or architectural changes:

1. **Discuss approach first** - Ask the AI to outline multiple options with tradeoffs before generating code
2. **Provide product context** - Explain user needs and business requirements
3. **Reference similar patterns** - Point to existing implementations that should inform the new work
4. **Validate approach** - Agree on the approach before code generation begins

**Example:**
> "Before implementing, let's discuss approaches for [feature]. We need to handle [requirements]. Similar to how we implemented [existing feature], but with [differences]. What are our options?"

### Iterative Development
* Start with planning discussion
* Implement core functionality
* Generate documentation during development (not after)
* Refactor as you go
* Update documentation to reflect changes

### Requesting Documentation
The AI can proactively create:

* Component READMEs with usage examples
* Architectural decision records
* Implementation guides
* Quick start guides
* Pattern libraries

**Example:**
> "Create a README for this component that documents its composition pattern, props, usage examples, and integration with the panel system."

---

## Design System & Styling

### IBM Carbon Design System v11

**Primary reference:** https://carbondesignsystem.com/

**Key Carbon Resources:**
* Component index: https://carbondesignsystem.com/components/overview/components/
* UI Patterns: https://carbondesignsystem.com/patterns/overview/
* Color system: https://carbondesignsystem.com/elements/color/overview/
* Typography: https://carbondesignsystem.com/elements/typography/type-sets/
* Grid & Layout: https://carbondesignsystem.com/elements/2x-grid/usage/
* Grid Influencers: https://carbondesignsystem.com/elements/2x-grid/overview/#grid-influencers
* Icons: https://carbondesignsystem.com/elements/icons/usage/
* Charts: https://charts.carbondesignsystem.com/introduction

**Component Priority:**
1. Use IBM Carbon React v11 components first
2. Use Carbon patterns when no component exists
3. Only create custom components when no Carbon equivalent exists

### Styling Implementation

**CSS Variables (Design System Values):**
* **ALL** colors, spacing, borders, radius, and typography values MUST come from CSS variables defined in `/styles/globals.css`
* Never hardcode design system values
* CSS variables enable design system updates without code changes

**Example:**
```css
/* ✅ CORRECT - Uses CSS variables */
.panel {
  background: var(--background-primary);
  padding: var(--spacing-05);
  border-radius: var(--radius-md);
  color: var(--text-primary);
}

/* ❌ INCORRECT - Hardcoded values */
.panel {
  background: #ffffff;
  padding: 16px;
  border-radius: 4px;
  color: #161616;
}
```

**CSS Modules (Component Scoping):**
* Use CSS Modules for all component-specific styles
* Provides scoping and prevents style conflicts
* File naming: `ComponentName.module.css`

**Example:**
```tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return <div className={styles.container}>...</div>;
}
```

**Hybrid Pattern - CSS Variables + CSS Modules:**
```css
/* MyComponent.module.css */
.container {
  /* Scoped class name via CSS Modules */
  /* Design system values via CSS Variables */
  background: var(--background-primary);
  padding: var(--spacing-05);
}
```

### Typography Rules

**IBM Plex Sans ONLY:**
* All text must use IBM Plex Sans font family defined in `/styles/globals.css`
* Do NOT use other font families
* Do NOT use Tailwind typography classes (text-2xl, font-bold, leading-none, etc.)
* Typography is defined in globals.css for each HTML element

**Example:**
```css
/* globals.css already defines typography */
h1 {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
}

/* Do NOT override unless specifically requested by user */
```

### SCSS vs CSS
* Prefer SCSS over vanilla CSS when possible
* SCSS provides better organization and nesting
* Still use CSS variables for design system values

### Important & Inline Styles
* **AVOID** `!important` unless absolutely necessary
* **AVOID** inline styles unless absolutely necessary
* Prefer proper CSS cascade and specificity

### Overriding Component Default Styling

**CRITICAL:** Many base components (shadcn/ui, third-party libraries) come with default styling for gap, typography, spacing, etc.

**You MUST explicitly override these defaults in your CSS to match Guidelines:**

```css
/* ✅ CORRECT - Explicitly override component defaults */
.myButton {
  /* Override any default font styling */
  font-family: var(--font-family-sans);
  font-size: inherit; /* Or specific CSS variable if needed */
  line-height: inherit;
  
  /* Override any default spacing */
  gap: var(--spacing-03); /* Use our spacing scale */
  padding: var(--spacing-04);
  
  /* Use our color system */
  background: var(--background-primary);
  color: var(--text-primary);
}

/* ❌ INCORRECT - Relying on component defaults */
.myButton {
  /* Missing explicit overrides means component defaults will apply */
  background: var(--background-primary);
}
```

**Why This Matters:**
* Component libraries have their own design systems that conflict with Carbon
* Default gaps, typography, and spacing won't match our design tokens
* Explicit overrides ensure consistency across the application
* Makes it clear what styling is intentional vs. inherited

**Common Properties to Override:**
* `font-family`, `font-size`, `font-weight`, `line-height`
* `gap`, `padding`, `margin`
* `color`, `background`, `border`
* `border-radius`

---

## Application Architecture

### Application Structure

**Application Shell** - Top-level structure:
* Global header
* Global navigation (L1)
* Application content area  
* Global panels, modals, and tearsheets

**Page Shell** - Page-specific context:
* Breadcrumb + action bar
* Side rail navigation (optional)
* Panels (page and section level)
* Content area containing "views"

**Views** - Content within Page Shell:
* Data tables
* Card grids
* Detail views
* etc.

### File Organization

**Component Structure:**
```
/components
  /ComponentName
    ComponentName.tsx          # Main component
    ComponentName.module.css   # Styles
    README.md                  # Documentation
    index.ts                   # Barrel export
    /SubComponent.tsx          # Sub-components if needed
```

**Page Structure:**
```
/components/pages
  PageName.tsx
  PageName.module.css
  _shared.module.css          # Shared page styles
```

**Data Layer:**
```
/data
  /automations
  /objectives
  /chats
  /hooks                      # Custom data hooks
```

### Routing & Navigation
* Implement proper routing with browser history
* Support L1, L2, and L3 navigation levels
* Use page components rather than complex switch statements

---

## Component Development

### Composition Over Configuration

**Prefer composable components over prop-heavy components.**

**✅ GOOD - Composition Pattern:**
```tsx
<InsetPanel>
  <InsetPanelHeader title="Details" onClose={handleClose} />
  <InsetPanelToolbar>
    <Button>Edit</Button>
    <Button>Delete</Button>
  </InsetPanelToolbar>
  <div>Panel content</div>
</InsetPanel>
```

**❌ AVOID - Configuration Pattern:**
```tsx
<InsetPanel
  showHeader
  headerTitle="Details"
  onClose={handleClose}
  showToolbar
  toolbarButtons={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete }
  ]}
>
  <div>Panel content</div>
</InsetPanel>
```

**Why Composition Wins:**
* More flexible without prop explosion
* Clearer code - you see the structure
* Easier to extend - add new sub-components
* Better TypeScript support
* Safer refactoring - changes to one sub-component don't affect others

### Smart vs. Dumb Components

**Dumb Components (Presentational):**
* Receive data via props
* Focus on rendering UI
* Reusable across different contexts
* No data fetching or business logic
* Located in `/components`

**Smart Components (Container):**
* Fetch data using custom hooks
* Handle business logic
* Manage local state
* Orchestrate dumb components
* Usually page components

**Example:**
```tsx
// Smart component (page)
export function ObjectivesPage() {
  const { objectives } = useObjectives();
  const { automations } = useAutomations();
  
  return (
    <ObjectivesList 
      objectives={objectives}
      automations={automations}
    />
  );
}

// Dumb component
export function ObjectivesList({ objectives, automations }) {
  return (
    <ul>
      {objectives.map(obj => (
        <ObjectiveCard key={obj.id} objective={obj} />
      ))}
    </ul>
  );
}
```

### Component Documentation

**Every reusable component should have a README.md with:**
* Component purpose
* Composition pattern (parent + children components)
* Props documentation
* Usage examples
* Integration notes (e.g., "Works with SidePanelContext")

**Reference Examples:**
* `/components/InsetPanel/README.md`
* `/components/Timeline/README.md`
* `/components/SidePanel/README.md`

### Custom Hooks

**When to create:**
* Data access abstraction (useAutomations, useObjectives)
* Reusable logic across components
* Complex state management

**Documentation requirements:**
* Comment the purpose at the top of the file
* Document parameters and return values
* Provide usage example

**Example:**
```tsx
/**
 * useAutomations
 * 
 * Provides access to decision automations data layer.
 * 
 * @returns {Object} Automation data and utilities
 * @returns {Automation[]} automations - All automations
 * @returns {Function} getAutomationById - Get single automation
 * @returns {Function} addAutomation - Add new automation
 * 
 * @example
 * const { automations, getAutomationById } = useAutomations();
 */
export function useAutomations() {
  // Implementation
}
```

### Avoid Monolithic Components

**Don't create:**
* Single components with 500+ lines
* Components that do everything
* Complex switch statements for different states

**Instead:**
* Break into smaller, focused components
* Create separate page components
* Use composition to combine components
* Extract reusable logic to hooks

---

## Layout & Grid System

### CSS Grid for Page Layout

**Use CSS Grid for page and section structure:**
* Named grid areas for semantic layout
* Two-dimensional positioning
* Responsive region sizing
* Aligns with Carbon Design System patterns

**Example:**
```css
.pageLayout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "content";
  height: 100vh;
}

.header {
  grid-area: header;
}

.content {
  grid-area: content;
}
```

### Flexbox for Component Layout

**Use Flexbox for component internals:**
* Simple spacing and alignment
* One-dimensional flows
* Component-level layout

**Pattern:**
* Grid: Page and section layout structure
* Flexbox: Component internals
* Often use both in the same component at different levels

### Carbon Grid Implementation

**Follow Carbon v11 Grid patterns:**
* Use Carbon Grid, Sub-grid, Grid area implementations
* Reference: https://carbondesignsystem.com/elements/2x-grid/usage/

### Grid Influencers

**Carbon's Grid Influencer Pattern:**
* Content shifts to accommodate panels
* Grid columns automatically adjust
* Smooth transitions via CSS grid recalculation

**Our Implementation:**
* Side rail + panel combinations work automatically
* Content reflow is smooth and declarative
* See `/design-documentation/Panel-System.md` for details

---

## Panel System

**IMPORTANT:** See `/design-documentation/Panel-System.md` for comprehensive panel architecture documentation.

### Panel Types

**Global Panel:**
* Scope: Application-wide, overlays everything
* Example: Settings panel
* Z-index: 200
* Backdrop: z-index 199

**Page Panel:**
* Scope: Automation shell level, overlays content
* Example: Help panel
* Z-index: 100
* Backdrop: z-index 99

**Section Panel:**
* Scope: Within content, influences layout (grid influencer pattern)
* Example: Asset details, Service details
* Z-index: 1
* No backdrop - content shifts to accommodate

### Panel Delegation Pattern

**Key Principle:** Pages declare panels, PageLayoutTemplate renders them.

**✅ CORRECT - Declaration:**
```tsx
// In page component
export function MyPage() {
  return (
    <PageLayoutTemplate
      sectionPanels={{
        assetDetails: <AssetDetailsPanel />
      }}
    >
      <PanelTriggerButton 
        panelType="section"
        panelId="assetDetails"
      >
        Open Asset Details
      </PanelTriggerButton>
    </PageLayoutTemplate>
  );
}
```

**❌ INCORRECT - Direct Rendering:**
```tsx
// Don't render panels directly in page
export function MyPage() {
  return (
    <div>
      <AssetDetailsPanel />  {/* ❌ Panel rendered directly */}
    </div>
  );
}
```

**Why Delegation Matters:**
* Prevents duplicate rendering
* Single source of truth for panel rendering
* Clear separation: declaration vs. rendering
* Easy to add new panel types

### Panel Width Standard

**All panels use 320px width:**
* Consistent visual rhythm
* Aligns with Carbon spacing scale
* Maintains readability

```css
.panel {
  width: 320px;
}
```

### Z-index System

**Use ranges, not individual values:**

```css
/* Base content */
.content { z-index: auto; }

/* Section panels */
.sectionPanel { z-index: 1; }

/* Page panels */
.pagePanel { z-index: 100; }
.pagePanelBackdrop { z-index: 99; }

/* Global panels */
.globalPanel { z-index: 200; }
.globalPanelBackdrop { z-index: 199; }
```

**Why ranges?** Leaves room for elements that need to slot in between.

### Panel Opening Context

**Use SidePanelContext:**
```tsx
import { useSidePanel } from './components/SidePanel';

function MyComponent() {
  const { openPanel, closePanel } = useSidePanel();
  
  return (
    <button onClick={() => openPanel('section', 'assetDetails')}>
      Open Panel
    </button>
  );
}
```

**Or PanelTriggerButton component:**
```tsx
<PanelTriggerButton 
  panelType="section" 
  panelId="assetDetails"
>
  Open Asset Details
</PanelTriggerButton>
```

---

## State Management

### React Context for Coordination

**Use Context when:**
* Multiple components need shared state
* Coordinating cross-component actions
* Avoiding excessive prop drilling

**Example - SidePanelContext:**
```tsx
// Provides panel state to entire tree
<SidePanelProvider>
  <App />
</SidePanelProvider>
```

**Components can:**
* Subscribe to shared state
* Trigger coordinated actions
* Remain loosely coupled

### Custom Hooks for Data Layer

**Pattern:**
* Components don't import data directly
* Custom hooks abstract data access
* Easy to swap mock → real API

**Example:**
```tsx
// Data hook
export function useAutomations() {
  return {
    automations: mockAutomations,
    getAutomationById: (id) => mockAutomations.find(a => a.id === id)
  };
}

// Component usage
function MyComponent() {
  const { automations } = useAutomations();
  return <div>{automations.map(...)}</div>;
}
```

**Benefits:**
* Centralized data logic
* Swappable implementations
* Easy testing (mock the hook)
* Component reusability

### Bidirectional Relationships

**For entity relationships (e.g., objectives ↔ automations):**
* Track relationships from both sides
* Keep data in sync
* Enable navigation in both directions

**Implementation:**
* Data layer manages bidirectional updates
* Custom hooks expose both sides
* UI components in both contexts

**See:** `/data/AUTOMATION_RELATIONSHIPS_GUIDE.md`

---

## Migration Strategy - Strangler Pattern

### Overview

**The Strangler Pattern** is a safe, incremental approach to migrating complex systems by building new functionality alongside existing code, gradually redirecting usage to the new implementation, and eventually removing the old code once the new code is proven stable.

**Named after:** Strangler vines that grow around trees, eventually replacing them.

**Why We Use It:**
* Eliminates "big bang" rewrites that often fail
* Reduces risk - old code keeps working while new code is built
* Allows validation at each step
* Maintains zero-regression principle
* Enables rollback at any point

### Core Principles

**1. Build Alongside, Never Replace Directly**
* New architecture exists in parallel with old architecture
* No modifications to working old code during migration
* Complete isolation between old and new systems

**2. Prove Before Migrating**
* New shared foundation must be complete and tested
* Validate new architecture with ONE editor first
* Only migrate additional editors after validation

**3. Strict Boundaries**
* Old code in separate directories from new code
* No imports crossing the boundary
* No shared CSS that could affect both systems
* Feature flags or router-level separation if needed

**4. One Thing At A Time**
* Migrate one component/hook/service at a time
* Validate after each migration
* Never migrate multiple things simultaneously

**5. Rollback Plan Always Available**
* Git tags before each migration step
* Document how to revert each change
* Keep old code until new code proven in production

### Our Current Situation

**Context:** We are mid-migration from old editor architecture to new unified architecture.

**Old Architecture (Stable, Untouched):**
```
/components/
  BALEditor/           # Original BAL implementation
  MarkdownEditorNew/   # Original Markdown implementation
  RichTextEditor/      # Original Rich Text implementation
```

**New Architecture (In Progress):**
```
/components/editors/
  core/                # Shared foundation (Phase 1 complete)
  code/
    FormulaEditor/     # New Formula Editor (Phase 2 complete)
    shared/            # Shared code editor hooks (mostly empty)
```

**Problem:** We accidentally touched BAL Editor during "unification" and broke it. This violated strangler pattern principles.

**Solution:** Apply strangler pattern rigorously for recovery and future migrations.

### Strangler Pattern for Editor Migration

#### Phase 1: Build Shared Foundation (Isolated)

**Location:** `/components/editors/core/` and `/components/editors/code/shared/`

**Build in isolation:**
* Shared hooks (syntax highlighting, validation, line numbers)
* Shared components (autocomplete, variable table)
* Shared types and utilities
* **Zero interaction with old editors**

**Validation:**
* Unit test each shared hook independently
* Document API and usage patterns
* Create examples showing how to use

**Completion Criteria:**
* All shared hooks functional and tested
* Documentation complete
* Examples working
* Old editors completely untouched

#### Phase 2: Build New Editor Using Shared Foundation

**Location:** `/components/editors/code/FormulaEditor/`

**Build completely new:**
* Don't modify old BAL Editor
* Use shared foundation hooks
* Implement editor-specific logic
* Validate with real usage

**Validation:**
* Formula Editor fully functional
* All features working (syntax highlighting, validation, autocomplete)
* No regressions in old editors (test BAL, Markdown, RTE)
* Performance acceptable

**Completion Criteria:**
* Formula Editor production-ready
* Shared hooks proven to work
* Old editors still fully functional
* Documentation showing how shared hooks were used

#### Phase 3: Migrate First Old Editor

**ONLY after Phase 2 validated and stable for 1+ week**

**Target:** BAL Editor (most similar to Formula)

**Process:**
1. **Create Migration Branch**
   ```
   git checkout -b migrate-bal-editor
   git tag before-bal-migration
   ```

2. **Create New BAL Editor Using Shared Foundation**
   ```
   /components/editors/code/BALEditor/  # New location
   ```

3. **Build in Parallel**
   * Old BAL Editor stays in `/components/BALEditor/`
   * New BAL Editor built in `/components/editors/code/BALEditor/`
   * Use shared hooks from `/components/editors/code/shared/`
   * Replicate ALL functionality

4. **Feature Flag to Switch**
   ```tsx
   // In App.tsx or routing layer
   const USE_NEW_BAL_EDITOR = false; // Feature flag
   
   {USE_NEW_BAL_EDITOR ? (
     <NewBALEditor /> // from /components/editors/code/BALEditor
   ) : (
     <BALEditor />    // from /components/BALEditor
   )}
   ```

5. **Validate Side-by-Side**
   * Test new BAL Editor thoroughly
   * Compare with old BAL Editor
   * Ensure visual parity
   * Ensure functional parity
   * Performance testing

6. **Gradual Cutover**
   * Set `USE_NEW_BAL_EDITOR = true`
   * Monitor for issues
   * Quick rollback if problems: `USE_NEW_BAL_EDITOR = false`

7. **Stabilization Period**
   * Use new BAL Editor for 1+ week
   * Fix any issues that arise
   * Keep old code in place

8. **Remove Old Code**
   * Only after new code proven stable
   * Delete `/components/BALEditor/`
   * Remove feature flag
   * Clean up imports

**Rollback Plan:**
* Feature flag to false
* OR: `git revert` to before-bal-migration tag
* Old code works immediately

#### Phase 4: Migrate Remaining Editors (If Desired)

**Same process for Markdown and RichText:**
* Only migrate if there's value (they may stay old architecture)
* One at a time, never together
* Full validation each time
* Feature flags for quick rollback

### Strangler Pattern for Hooks

**Example: Migrating syntax highlighting logic to shared hook**

**1. Build New Shared Hook (Isolated)**
```tsx
// /components/editors/code/shared/hooks/useCodeSyntax.ts
export function useCodeSyntax(
  code: string,
  language: 'bal' | 'formula'
) {
  // Shared syntax highlighting logic
  // Language-specific rules passed as parameter
}
```

**2. Use in New Editor First**
```tsx
// /components/editors/code/FormulaEditor/FormulaEditor.tsx
import { useCodeSyntax } from '../shared/hooks/useCodeSyntax';

export function FormulaEditor() {
  const highlightedCode = useCodeSyntax(code, 'formula');
  // Use it
}
```

**3. Validate New Hook**
* Test thoroughly with Formula Editor
* Ensure performance acceptable
* Document usage pattern

**4. Migrate Old Editor (Optional)**
```tsx
// /components/editors/code/BALEditor/BALEditor.tsx (after migration)
import { useCodeSyntax } from '../shared/hooks/useCodeSyntax';

export function BALEditor() {
  const highlightedCode = useCodeSyntax(code, 'bal');
  // Same hook, different language
}
```

**5. OLD Editor Keeps Old Pattern Until Migration**
```tsx
// /components/BALEditor/BALEditor.tsx (before migration)
// Still uses old inline highlighting logic
// Don't touch this until ready to migrate
```

### Strangler Pattern for Services

**Example: Migrating evaluation engine**

**Current State:**
```
/services/evaluationEngine/  # Shared by all editors
```

**If we need to refactor evaluation engine:**

**1. Build New Engine Alongside Old**
```
/services/evaluationEngine/     # Old engine (keep working)
/services/evaluationEngineV2/   # New engine (build isolated)
```

**2. Use New Engine in One Place First**
```tsx
// Formula Editor switches to V2
import { EvaluationEngine } from '../../services/evaluationEngineV2';
```

**3. Validate New Engine**
* Test thoroughly
* Performance benchmarks
* Edge case testing

**4. Gradually Migrate Other Consumers**
```tsx
// BAL Editor eventually switches
import { EvaluationEngine } from '../../services/evaluationEngineV2';
```

**5. Remove Old Engine**
* Only after all consumers migrated
* Delete `/services/evaluationEngine/`
* Rename V2 to standard name if desired

### Anti-Patterns to Avoid

**❌ NEVER DO THIS:**

**1. Modify Old Code During Migration**
```tsx
// BALEditor.tsx - OLD ARCHITECTURE
// ❌ Adding new shared hook while editor is still "old"
import { useCodeSyntax } from '../editors/code/shared/hooks/useCodeSyntax';
```
*Why bad:* Breaks isolation, creates dependencies between old and new

**2. Half-Migrate a Component**
```tsx
// ❌ Using some shared hooks, some old patterns
import { useCodeSyntax } from '../editors/code/shared/hooks'; // New
// But still using old validation logic inline
```
*Why bad:* Creates hybrid that's hard to maintain and migrate further

**3. Migrate Multiple Things Simultaneously**
```tsx
// ❌ Migrating BAL Editor and Markdown Editor at same time
```
*Why bad:* Can't isolate issues, too much risk, hard to rollback

**4. No Feature Flags or Isolation**
```tsx
// ❌ Directly replacing old code
// Deleted: <BALEditor />
// Added: <NewBALEditor />
```
*Why bad:* No rollback plan, forced to fix forward if issues

**5. Shared CSS Across Old and New**
```css
/* globals.css */
/* ❌ CSS that affects both old and new editors */
.editor { /* Could break old editors */ }
```
*Why bad:* Changes to support new architecture can break old code

### Migration Checklist Template

Use this checklist for any migration:

**Pre-Migration:**
- [ ] Document current state (what works, what doesn't)
- [ ] Create git tag: `before-[component]-migration`
- [ ] Document rollback procedure
- [ ] Ensure old code is stable and tested
- [ ] Shared foundation complete and validated (if applicable)

**During Migration:**
- [ ] Build new implementation in separate location
- [ ] Use shared hooks/services (don't duplicate code)
- [ ] Add feature flag for switching between old and new
- [ ] Test new implementation thoroughly
- [ ] Compare new vs old (visual, functional, performance)
- [ ] Document any differences or limitations

**Validation:**
- [ ] New implementation has feature parity with old
- [ ] All tests pass
- [ ] No regressions in OTHER components
- [ ] Performance acceptable (benchmark if needed)
- [ ] Edge cases tested
- [ ] Accessibility maintained

**Cutover:**
- [ ] Enable feature flag (switch to new implementation)
- [ ] Monitor for issues (1+ week)
- [ ] Quick rollback available (feature flag or git revert)
- [ ] Document any issues and fixes
- [ ] User validation (if applicable)

**Cleanup:**
- [ ] Stabilization period complete (1+ week with new code)
- [ ] Delete old implementation
- [ ] Remove feature flag
- [ ] Update documentation
- [ ] Update imports across codebase
- [ ] Clean up any old utilities/helpers no longer needed

### Key Takeaways

1. **Never touch working code during migration** - Build new alongside old
2. **Prove before migrating** - Validate new architecture with one component first
3. **One thing at a time** - Migrate components/hooks/services sequentially
4. **Always have rollback plan** - Feature flags, git tags, documentation
5. **Strict boundaries** - No cross-contamination between old and new
6. **Stabilization periods** - Don't rush to delete old code

**The strangler pattern is slower than "big bang" rewrites, but it's safer and more likely to succeed.**

---

## Documentation Practices

### Living Documentation

**Document during development, not after:**
* Preserve context and decisions
* Create reference material for next features
* Build session-to-session continuity

### Documentation Types

**Component Documentation:**
* README.md for each reusable component
* Usage examples
* Props/composition patterns
* Integration notes

**Architectural Documentation:**
* System architecture (`/design-documentation/Panel-System.md`)
* Pattern guides
* Decision records

**Implementation Documentation:**
* Quick starts
* Integration guides
* Migration guides

### Change Log Management

**IMPORTANT:** All implementation summaries, feature documentation, and architectural changes must be tracked in a centralized change log system.

**Directory Structure:**
```
/change-log
  index.md                           # Master index with links to all changes
  25-10-23_v01-BALEditorOverhaul.md  # Individual change documents
  25-10-23_v02-PanelSystem.md
  25-10-24_v01-AutocompleteFeature.md
```

**Naming Convention:**
* Format: `YY-MM-DD_vNN-DescriptiveName.md`
* `YY-MM-DD`: Date of implementation (2-digit year, month, day)
* `vNN`: Version number for that day (v01, v02, v03, etc.)
* `DescriptiveName`: Brief, PascalCase description of the change

**Change Log Index (`/change-log/index.md`):**
* Chronologically ordered list (newest first)
* Links to each change document
* Brief one-line description per entry
* Organized by date with clear sections

**Example Index Structure:**
```markdown
# Change Log Index

## October 2025

### October 24, 2025
- [v01 - Autocomplete Feature](./25-10-24_v01-AutocompleteFeature.md) - Added BAL autocomplete with vocabulary suggestions

### October 23, 2025
- [v02 - Panel System](./25-10-23_v02-PanelSystem.md) - Implemented delegation pattern for panel management
- [v01 - BAL Editor Overhaul](./25-10-23_v01-BALEditorOverhaul.md) - Textarea + overlay architecture for hanging indents
```

**Individual Change Document Content:**
* **Summary**: Brief overview of the change
* **Context**: Why the change was needed
* **Implementation Details**: Key technical decisions and patterns
* **Files Changed**: List of affected files
* **Breaking Changes**: Any breaking changes (if applicable)
* **Next Steps**: Suggested future enhancements or follow-ups
* **References**: Links to related documentation, components, or issues

**When to Create a Change Log Entry:**
* Major feature implementations
* Architectural changes or refactors
* Bug fixes that required significant investigation
* Breaking changes
* New patterns or conventions established

**DO NOT create change log entries for:**
* Minor text or comment updates
* Small style tweaks
* Documentation-only changes (unless establishing new documentation patterns)

### Planning Directory Organization

**IMPORTANT:** Forward-looking planning documentation is organized separately from chronological implementation logs.

**Directory Structure:**
```
/planning
  README.md                          # Planning directory overview
  
  /epics                             # Large, multi-phase initiatives
    README.md
    EPIC-FeatureName.md
  
  /requirements                      # Feature/architecture requirements and plans
    README.md
    25-10-23_v06-FeaturePlan.md
    PLAN-FeatureName.md
  
  /phases                            # Phase completion summaries and demos
    README.md
    PHASE3_VISUAL_DEMO.md
    LIST_ARRAY_COMPLETE_SUMMARY.md
  
  /debt                              # Technical debt tracking
    README.md
    25-10-28_v11-TechnicalDebt.md
  
  /enhancements                      # Future improvements
    README.md
    FUTURE-EnhancementName.md
  
  /bugs                              # Bug tracking
    README.md
    BUG-001-Description.md
```

**Key Differences from Change Log:**
* **Change Log (`/change-log/`)**: Chronological history of what was implemented (past-focused)
* **Planning (`/planning/`)**: Roadmap of what needs to be built (future-focused)

**When to Use Planning Directory:**
* Creating EPICs that span multiple implementations
* Writing requirements documents before implementation
* Planning architectural changes
* Tracking technical debt that needs addressing
* Documenting future enhancements not yet prioritized
* Tracking bugs before they're fixed

**After Implementation:**
* Implementation details go to `/change-log/` as dated entries
* Planning documents stay in `/planning/` as reference
* Can link between change log (implementation) and planning (requirements)

### Documentation as Design Validation

**Pattern - Document-Driven Development:**
1. Build initial implementation
2. Write accessible/human-readable documentation
3. Identify gaps and confusing aspects
4. Refactor based on documentation feedback
5. Update documentation to match

**If you can't explain it clearly, the API isn't clear enough.**

---

## Technical Patterns

### Panel Animations with requestAnimationFrame

**Problem:** CSS transitions don't trigger if state changes too quickly.

**Solution:** Use requestAnimationFrame to delay state change.

```tsx
useEffect(() => {
  if (isOpen) {
    // Delay state change to next frame
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  } else {
    setIsAnimating(false);
  }
}, [isOpen]);
```

**Why it works:**
1. Browser renders element in closed state
2. Browser calculates initial styles
3. requestAnimationFrame delays to next frame
4. State changes to open
5. CSS transition triggers

**Carbon timing:** Use 240ms for productive animations (fast enough to feel responsive, slow enough to track visually).

### Modern CSS Over JavaScript

**Prefer CSS for:**
* Animations and transitions
* Layout and positioning
* Visual styling
* Hover/focus states

**Use JavaScript only when:**
* CSS cannot achieve the result
* Need to respond to state changes
* Need to calculate values dynamically
* Need timing coordination (like requestAnimationFrame for transitions)

### Keyboard Navigation

**Always implement:**
* Escape key to close panels/modals
* Tab navigation through interactive elements
* Enter/Space for button actions
* Arrow keys for list navigation where appropriate

**Why:**
* Accessibility requirement
* Power user efficiency
* Reveals UI structure clarity (if keyboard nav is confusing, UI structure probably is too)

### Code Refactoring

**Refactor as you go:**
* Don't let technical debt accumulate
* Keep components focused and small
* Extract reusable patterns
* Improve code quality continuously
* **IMPORTANT:** Don't change functionality during refactoring

### Known Limitations & Future Enhancements

**HTML Textarea Line Wrapping:**

**Limitation:** HTML `<textarea>` elements always wrap text to column 0. They cannot be styled to make wrapped lines continue at indentation levels (e.g., if a line starts at 2 spaces, wrapped portions go back to column 0, not column 2).

**Impact:** Code editors using textareas (BAL Editor, Formula Editor) have standard wrapping behavior where indented lines wrap back to the left margin.

**Why:** This is a fundamental limitation of HTML textarea elements - they don't support the CSS `padding-left` + `text-indent` technique that works for other elements because the textarea content model is plain text, not HTML/CSS.

**Future Production Enhancement:**
* Replace textarea with `contenteditable` div for full CSS control over wrapping
* Use a professional code editor library (CodeMirror, Monaco Editor) that handles this natively
* Implement custom text rendering with Canvas API for maximum control

**Current Workaround:** Accepted limitation. Line heights and row highlighting correctly adapt to wrapped content, but wrapped lines return to column 0.

**Related:** See CRIT-003 in change logs for line height adjustment implementation.

---

## Terminology Reference

**Precise terminology improves communication and prevents misunderstandings.**

### Layout Terms

| Term | Definition |
|------|------------|
| **Application Shell** | Top-level structure: global header + L1 nav + content area + global overlays |
| **Page Shell** | Page-specific context: breadcrumb + side rail + panels + views |
| **Views** | Content within Page Shell (tables, grids, detail views, etc.) |

### Panel Terms

| Term | Definition |
|------|------------|
| **Global Panel** | Application-wide panel, overlays everything (z-index: 200) |
| **Page Panel** | Automation shell panel, overlays content (z-index: 100) |
| **Section Panel** | Content-level panel, influences layout via grid (z-index: 1) |
| **Panel Trigger Button** | Button that opens a panel (uses SidePanelContext) |
| **Grid Influencer** | Element that influences grid layout when open (Carbon pattern) |

### Navigation Terms

| Term | Definition |
|------|------------|
| **L1 Navigation** | Global navigation (top-level sections) |
| **L2 Navigation** | Section navigation (within a global section) |
| **L3 Navigation** | Detail navigation (within a section item) |
| **Side Rail** | Vertical navigation within Page Shell |
| **Breadcrumb** | Path showing current location in hierarchy |

### Component Terms

| Term | Definition |
|------|------------|
| **Composition** | Building components from smaller sub-components |
| **Presentational Component** | Dumb component, receives data via props |
| **Container Component** | Smart component, fetches data and handles logic |
| **Custom Hook** | Reusable React hook (usually prefixed with `use`) |

### Data Terms

| Term | Definition |
|------|------------|
| **Bidirectional Relationship** | Two-way link between entities (e.g., objectives ↔ automations) |
| **Data Layer** | Abstraction over data access (currently mock data) |
| **Custom Hook** | Data access abstraction (useAutomations, useObjectives, etc.) |

### Migration Terms

| Term | Definition |
|------|------------|
| **Strangler Pattern** | Incremental migration by building new alongside old, gradually replacing |
| **Feature Flag** | Runtime switch to enable/disable new implementation |
| **Old Architecture** | Existing implementation in original location (e.g., `/components/BALEditor/`) |
| **New Architecture** | Unified implementation in new location (e.g., `/components/editors/code/`) |
| **Migration Boundary** | Strict separation between old and new code during migration |
| **Stabilization Period** | Time using new code before removing old code (typically 1+ week) |
| **Rollback Plan** | Documented procedure to revert to old implementation if issues arise |

---

## Quick Reference

### Starting a New Component

1. **Plan first** - Discuss composition pattern and integration
2. **Create component structure:**
   ```
   /components/MyComponent
     MyComponent.tsx
     MyComponent.module.css
     README.md
     index.ts
   ```
3. **Use composition pattern** - Parent + children components
4. **Use CSS variables** - All design system values from `/styles/globals.css`
5. **Use CSS Modules** - Component-scoped styles
6. **Document during development** - Create README with usage examples

### Starting a New Feature

1. **Provide context** - Current state, constraints, references
2. **Plan approach** - Discuss options before coding
3. **Reference patterns** - Point to similar implementations
4. **Implement incrementally** - Core first, then enhancements
5. **Document as you go** - Preserve decisions and rationale
6. **Refactor continuously** - Keep code clean

### Working with Panels

1. **Choose panel type** - Global, Page, or Section
2. **Create panel component** - In `/components/SidePanel/panels/`
3. **Declare in PageLayoutTemplate** - Don't render directly
4. **Use PanelTriggerButton** - Or openPanel from useSidePanel hook
5. **Follow width standard** - 320px for all panels
6. **Use correct z-index** - Global: 200, Page: 100, Section: 1

### Working with Data

1. **Use custom hooks** - Don't import data directly
2. **Keep components presentational** - Data via props
3. **Handle logic in pages** - Pages orchestrate data + components
4. **Document bidirectional relationships** - Track both sides
5. **Plan for API migration** - Mock data now, real API later

---

## Common Patterns

### Page Component Pattern

```tsx
// Smart component - handles data and orchestration
export function MyPage() {
  // Data hooks
  const { data } = useMyData();
  const { openPanel } = useSidePanel();
  
  // Event handlers
  const handleAction = () => {
    // Business logic
  };
  
  return (
    <PageLayoutTemplate
      breadcrumbs={[...]}
      sectionPanels={{
        details: <DetailsPanel />
      }}
    >
      <PageHeaderWrapper title="My Page">
        <PanelTriggerButton panelType="section" panelId="details">
          Open Details
        </PanelTriggerButton>
      </PageHeaderWrapper>
      
      <MyContent data={data} onAction={handleAction} />
    </PageLayoutTemplate>
  );
}
```

### Composable Component Pattern

```tsx
// Parent component
export function InsetPanel({ children }: InsetPanelProps) {
  return <div className={styles.panel}>{children}</div>;
}

// Sub-components
export function InsetPanelHeader({ title, onClose }: HeaderProps) {
  return (
    <div className={styles.header}>
      <h3>{title}</h3>
      <button onClick={onClose}>×</button>
    </div>
  );
}

export function InsetPanelToolbar({ children }: ToolbarProps) {
  return <div className={styles.toolbar}>{children}</div>;
}

// Usage
<InsetPanel>
  <InsetPanelHeader title="Details" onClose={handleClose} />
  <InsetPanelToolbar>
    <Button>Action</Button>
  </InsetPanelToolbar>
  <div>Content</div>
</InsetPanel>
```

### Custom Data Hook Pattern

```tsx
export function useMyData() {
  const [data, setData] = useState(mockData);
  
  const getById = (id: string) => {
    return data.find(item => item.id === id);
  };
  
  const add = (item: MyItem) => {
    setData([...data, item]);
  };
  
  return {
    data,
    getById,
    add
  };
}
```

---

## Questions to Ask

If something is unclear, ask questions like:

* "What's the user's primary goal with this feature?"
* "Should this be a Global, Page, or Section panel?"
* "Is there an existing pattern I should follow?"
* "What Carbon component or pattern is appropriate here?"
* "How should this integrate with existing layouts?"
* "What data relationships need to be maintained?"

---

## Version History

**v2.3** - Planning Directory Organization (October 29, 2025)
* Added **Planning Directory Organization** section to Documentation Practices
* Documented `/planning/` directory structure (epics, requirements, debt, enhancements, bugs)
* Clarified difference between `/change-log/` (past-focused) and `/planning/` (future-focused)
* Added guidance on when to use planning directory vs. change log
* **Context:** Completed migration of 24 planning files to organized structure

**v2.2** - Migration Strategy - Strangler Pattern (October 28, 2025)
* Added comprehensive **Migration Strategy - Strangler Pattern** section
* Documented principles for safe, incremental migrations
* Specific guidance for editor, hook, and service migrations
* Feature flag patterns for risk-free cutover
* Migration checklist template
* Anti-patterns and common mistakes to avoid
* Real-world example: Our current dual-architecture state
* Terminology additions for migration concepts
* **Context:** Addresses mid-migration challenges and provides path forward

**v2.1** - Change log system and component styling guidance (October 23, 2025)
* Added centralized change log directory structure (`/change-log/`)
* Documented naming convention for change log entries (YY-MM-DD_vNN-Name.md)
* Added critical guidance on overriding component default styling
* Clarified importance of explicit CSS overrides for third-party components

**v2.0** - Comprehensive update incorporating emergent patterns and AI collaboration best practices
* Added AI Collaboration Guidelines
* Documented architectural patterns (delegation, composition)
* Added technical patterns (requestAnimationFrame, z-index system)
* Comprehensive panel system documentation
* State management patterns
* Documentation practices
* Quick reference and common patterns

**v1.0** - Initial guidelines
* Basic React component guidelines
* Carbon Design System references
* Application layout terminology