# Panel System

## Overview

The application uses a multi-level panel system that allows content to slide in from the right side of the screen. Panels provide contextual information and actions without navigating away from the current page.

## Panel Types

### Global Panels
**Purpose**: Application-wide panels that can be opened from anywhere

**Behavior**: 
- Overlay the entire application content
- Display above all other content (highest z-index)
- Include a backdrop that dims the underlying content
- Triggered from the global header or top-level actions

**Examples**: Settings, Help, User Profile

**Width**: Always 320px (standard)

---

### Page Panels
**Purpose**: Panels specific to a page or automation shell

**Behavior**:
- Overlay the content area of the current page
- Respect layout boundaries (e.g., side rail on automation detail pages)
- Include a backdrop that dims the underlying content
- Triggered from breadcrumb actions or page-level controls

**Examples**: Asset details, Service information, Resource details

**Width**: Always 320px (standard)

---

### Section Panels
**Purpose**: Contextual panels that relate to a specific section of content

**Behavior**:
- **Push/Influence** the content area (content shifts left to make room)
- Appear directly below the page header
- No backdrop overlay
- Content remains visible and accessible while panel is open
- Triggered from tab-level actions or section controls

**Examples**: Filters, Quick actions, Contextual help

**Width**: Always 320px (standard)

## Panel Behaviors

### Overlay Pattern
Used by **Global Panels** and **Page Panels**

**Characteristics**:
- Panel slides in from the right
- Backdrop appears behind the panel
- Content underneath is not accessible
- Clicking backdrop or pressing Escape closes the panel
- Full-height panels

### Influence/Push Pattern
Used by **Section Panels**

**Characteristics**:
- Panel slides in from the right
- Main content area shifts left to accommodate the panel
- Both panel and content remain accessible
- No backdrop
- Pressing Escape closes the panel
- Height starts below the page header

## Animation Behavior

All panels use smooth slide-in animations:

1. **Opening**: Panel slides from right to left over 240ms (using `--cds-productive-02` timing)
2. **Closing**: Panel slides from left to right over 240ms
3. **Animation Delay**: Panels use `requestAnimationFrame` to ensure smooth CSS transitions

**Why the delay?**
Without a small delay, the browser applies the "open" state immediately when the panel element is created, preventing the CSS transition from triggering. The `requestAnimationFrame` delay ensures the browser has time to:
1. Render the panel in its initial closed state
2. Apply the open state on the next frame
3. Trigger the smooth CSS transition

## Layout Integration

### On Automation Detail Pages
- **Side Rail**: 48px fixed width on the left
- **Page Panels**: Positioned with left offset of 48px to respect the side rail
- **Section Panels**: Integrated within the main content area

### On Top-Level Pages (Objectives, Automations, etc.)
- **No Side Rail**: Full-width content area
- **Page Panels**: Positioned from the right edge
- **Section Panels**: Integrated within the main content area

## Panel Behavior During Side Rail Navigation

### Navigation Context
When navigating between pages within the Automation Shell (side rail visible), the application handles panels differently based on their type and scope.

### Page Panel Behavior
**When navigating between automation pages** (e.g., from Overview → Decision Service):

1. **Panel State Reset**: Page panels automatically close when navigating to a new page
2. **Why**: Page panels are contextual to the specific page content. When you navigate away, that context is lost
3. **Example**: If you have the "Asset Details" panel open on the Decision Service page and click to view "Branches", the Asset Details panel closes because it's not relevant to the Branches page

**Implementation**:
- Each page has its own panel state managed through the `UniversalPanelWrapper` delegation pattern
- Panel state is not shared between pages
- Navigating triggers a component unmount/remount cycle that resets panel state

### Section Panel Behavior
**When navigating between tabs on the same page** (e.g., on the Decision Service Detail page):

1. **Panel Persistence**: Section panels can persist across tab changes *on the same page*
2. **Why**: Section panels relate to the page-level content, not tab-specific content
3. **Example**: If you open a "Filters" section panel on the "Overview" tab, it may remain open when switching to the "Deployment" tab if both tabs share the same filtering context

**However**:
- When navigating to a completely different page via the side rail, section panels close
- This is because the page component unmounts and the section panel state is lost

### Side Rail Navigation Flow

**Scenario**: User is on "Decision Service Detail" page with "Service Details" page panel open

1. User clicks "Decision Model" in side rail
2. React Router navigates to the new route
3. `AutomationDetailPage` unmounts
4. `DecisionModelPage` mounts
5. `UniversalPanelWrapper` on the new page initializes with no active panel
6. Previous panel state is lost

**Visual Result**:
- Panel slides closed (240ms animation)
- Side rail remains fixed at 48px width
- New page content loads
- User can trigger a different panel on the new page

### Grid Influencer Pattern with Side Rail

The side rail + section panel combination creates a unique layout challenge:

```
┌─────────────────────────────────────────────────────┐
│ Global Header                                       │
├────┬───────────────────────────────────────┬────────┤
│    │ Breadcrumb / Action Bar               │        │
│    ├───────────────────────────────────────┤        │
│ S  │ Page Header                           │ Section│
│ i  ├───────────────────────────────────────┤ Panel  │
│ d  │                                       │ (320px)│
│ e  │                                       │        │
│    │  Main Content (influenced left)      │        │
│ R  │                                       │        │
│ a  │                                       │        │
│ i  │                                       │        │
│ l  │                                       │        │
│    │                                       │        │
│ 48 │                                       │        │
│ px │                                       │        │
└────┴───────────────────────────────────────┴────────┘
```

**Layout Calculation**:
- Side rail: `48px` (fixed)
- Main content: `calc(100% - 48px - 320px)` when section panel is open
- Section panel: `320px` (fixed)

**Grid Implementation**:
- Uses CSS Grid with named grid areas
- Grid columns: `48px auto 320px` (when section panel open)
- Grid columns: `48px auto` (when section panel closed)
- Smooth transition between states using CSS transitions

### Page Panel vs Section Panel on Side Rail Pages

| Aspect | Page Panel | Section Panel |
|--------|------------|---------------|
| **Position** | Overlays from right, left offset 48px | Influences from right within content grid |
| **Side Rail Respect** | Yes - positioned with `left: 48px` | Yes - grid column starts after side rail |
| **Backdrop** | Yes - dims content | No - content remains visible |
| **Content Shift** | No - overlays content | Yes - content shifts left 320px |
| **Accessibility** | Content behind is blocked | All content remains accessible |
| **Navigation Persistence** | Closes on navigation | Closes on navigation |
| **Z-index** | Higher - floats above | Normal - part of content flow |

### Multi-Panel Interaction

**Can multiple panels be open simultaneously?**

No. The panel system enforces a single active panel at any time:

1. Opening a new panel automatically closes any open panel
2. This applies across all panel types (global, page, section)
3. Panel state is managed centrally through `SidePanelContext`

**Example Interaction Flow**:
1. User opens "Service Details" page panel → Panel opens, backdrop appears
2. User opens "Filters" section panel → Service Details panel closes first, then Filters panel opens (no backdrop, content shifts)
3. User clicks "Settings" in global header → Filters panel closes, Settings global panel opens (full overlay)

### Animation Coordination with Side Rail

When opening a section panel on a side rail page:

1. **Initial State**: Side rail (48px) + Content (rest of viewport)
2. **Animation Trigger**: Section panel trigger button clicked
3. **Layout Shift**: Grid recalculates to accommodate panel
4. **Content Animation**: Main content area smoothly shifts left (240ms)
5. **Panel Animation**: Section panel slides in from right (240ms)
6. **Final State**: Side rail (48px) + Content (reduced width) + Section panel (320px)

**Timing Coordination**:
- Both animations happen simultaneously
- Both use the same duration: `var(--cds-productive-02)` (240ms)
- Both use the same easing function for visual harmony
- No janky width adjustments due to proper CSS Grid implementation

### Developer Considerations

**When adding new automation pages**:

1. **Use UniversalPanelWrapper**: All automation detail pages should wrap content in `UniversalPanelWrapper`
2. **Specify Panel Type**: Decide if page-level or section-level panels are appropriate
3. **Respect Side Rail**: Ensure layout accounts for 48px side rail width
4. **Test Navigation**: Verify panel state resets when navigating to/from the page
5. **Animation Timing**: Don't override default timing - keep animations consistent

**Common Pitfalls**:
- ❌ Hardcoding panel width instead of using standard 320px
- ❌ Forgetting `left: 48px` offset for page panels on automation pages
- ❌ Attempting to persist panel state across navigation (not supported)
- ❌ Missing `requestAnimationFrame` delay for section panel animations
- ❌ Using different animation timing than `--cds-productive-02`

## Key Implementation Details

### Consistent Width
All panels default to **320px** width for visual consistency across the application. This matches the Carbon Design System's grid influencer pattern.

### Panel Renderers
- **GlobalPanelRenderer**: Handles global panels in `ApplicationLayoutTemplate`
- **AutomationShellPanelRenderer**: Handles page panels on automation detail pages
- **SectionInfluencedLayout**: Handles section panels with push/influence behavior

### Panel Manager
A centralized state management system that:
- Tracks which panel is currently open
- Manages panel level (global, page, section)
- Handles opening and closing animations
- Ensures only one panel is open at a time

## Usage Guidelines

**Use Global Panels for**:
- Application settings
- User preferences
- Help documentation
- Actions that apply across the entire application

**Use Page Panels for**:
- Detailed information about a specific item
- Actions related to the current page context
- Content that requires focused attention

**Use Section Panels for**:
- Filters and search options
- Quick reference information
- Tools that work alongside the main content
- Content that benefits from simultaneous viewing with the main area

## Accessibility

All panels include:
- **Keyboard Support**: Escape key closes panels
- **ARIA Labels**: Proper `aria-hidden` states
- **Focus Management**: Panel content is not accessible when `aria-hidden="true"`
- **Smooth Animations**: Using Carbon Design System timing tokens for consistent motion