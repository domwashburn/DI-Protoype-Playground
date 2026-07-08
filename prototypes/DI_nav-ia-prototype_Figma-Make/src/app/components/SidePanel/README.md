# Side Panel System

A dual-pattern panel system for the IBM Carbon Design System with both Push/Influence and Overlay modes.

## Quick Reference

```tsx
import { usePanelManager } from './components/SidePanel';

const { closePanel } = usePanelManager();

// Manual close - smooth 300ms transition
closePanel();

// Navigation close - immediate unmount
closePanel({ immediate: true });
```

## Patterns

### Pattern 1: Push/Influence Pattern

Side panel that squeezes/influences/shrinks content width when open.

**Panel Levels:**
- **Page Level** (default): Panel influences all view content below breadcrumb within the Automation Shell
- **Section Level**: Panel influences only the view content section (breadcrumb + page header NOT influenced)

**Features:**
- Default state: Open
- Smooth slide in/out with simultaneous content area resize
- Independent scrolling
- No backdrop (content remains fully visible)
- Responsive: Adds backdrop and adjusts sizing on mobile

**Usage:**

```tsx
import { SidePanelProvider, InfluencedLayout, PanelTriggerButton } from './components/SidePanel';
import { Settings } from '@carbon/icons-react';

function MyPage() {
  return (
    <SidePanelProvider defaultOpen={true}>
      <InfluencedLayout
        panelLevel="page" // or "section"
        sidePanel={<YourSidePanelContent />}
      >
        {/* Breadcrumb - first child */}
        <div>Breadcrumb</div>

        {/* Page Header - second child (for section level) */}
        <div>
          <h1>Page Title</h1>
          <PanelTriggerButton 
            icon={<Settings />}
            ariaLabel="Toggle panel"
          />
        </div>

        {/* Content - remaining children */}
        <div>Your content here</div>
      </InfluencedLayout>
    </SidePanelProvider>
  );
}
```

### Pattern 2: Overlay Pattern

Side panel that floats over full-width content with backdrop.

**Panel Width Options:**
- `narrow`: 240px
- `standard`: 320px (default)
- `wide`: 384px

**Features:**
- Backdrop fades in when panel opens
- Panel slides in from right
- Content remains full-width underneath
- Escape key closes panel
- Responsive: Full-width on mobile

**Usage:**

```tsx
import { SidePanelProvider, GridLayout, PanelTriggerButton } from './components/SidePanel';
import { ChevronRight } from '@carbon/icons-react';

function MyPage() {
  return (
    <SidePanelProvider defaultOpen={false}>
      <GridLayout
        panelWidth="standard" // or "narrow" | "wide"
        sidePanel={<YourSidePanelContent />}
      >
        <div>
          <PanelTriggerButton 
            icon={<ChevronRight />}
            ariaLabel="Toggle panel"
          />
          {/* Your full-width content */}
        </div>
      </GridLayout>
    </SidePanelProvider>
  );
}
```

## Components

### PanelManagerProvider

Global context provider for panel state management with automatic route-based closing.

**Props:**
- `defaultOpen?: boolean` - Initial panel state (default: false)
- `defaultPanel?: PanelConfig` - Initial panel configuration
- `currentRoute?: string` - Current route identifier. When this changes, all open panels automatically close
- `children: ReactNode` - Child components

**Example:**
```tsx
<PanelManagerProvider currentRoute={currentRoute}>
  <AppContent />
</PanelManagerProvider>
```

### SidePanelProvider (Legacy)

Simple context provider for panel state management.

**Props:**
- `defaultOpen?: boolean` - Initial panel state (default: true for influence, false for overlay)
- `children: ReactNode` - Child components

### InfluencedLayout

Layout component for Push/Influence pattern.

**Props:**
- `children: ReactNode` - Layout children (breadcrumb, header, content)
- `sidePanel?: ReactNode` - Panel content
- `className?: string` - Additional CSS class
- `panelLevel?: 'page' | 'section'` - Panel influence level (default: 'page')

### GridLayout

Layout component for Overlay pattern.

**Props:**
- `children: ReactNode` - Full-width content
- `sidePanel?: ReactNode` - Panel content
- `className?: string` - Additional CSS class
- `panelWidth?: 'narrow' | 'standard' | 'wide'` - Panel width (default: 'standard')

### PanelTriggerButton

Button component to toggle panel state.

**Props:**
- `label?: string` - Button label text
- `icon?: ReactNode` - Button icon
- `className?: string` - Additional CSS class
- `ariaLabel?: string` - Accessibility label (default: 'Toggle side panel')

### useSidePanel Hook

Access panel state and controls.

```tsx
const { isPanelOpen, togglePanel, closePanel, openPanel } = useSidePanel();
```

### usePanelManager Hook

Access global panel state and controls (for PanelManagerProvider).

```tsx
const { 
  isPanelOpen, 
  currentPanel, 
  openPanel, 
  closePanel, 
  togglePanel,
  closeSectionPanels 
} = usePanelManager();
```

**Methods:**
- `closePanel()` - Close all panels (page and section level)
- `closeSectionPanels()` - Close only section-level panels, leave page-level panels open
- `openPanel(config)` - Open a panel with the specified config
- `togglePanel(config?)` - Toggle panel state

**Auto-close on navigation:**

```tsx
function MyPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSideRailItem, setActiveSideRailItem] = useState('details');
  const { closePanel, closeSectionPanels, isPanelOpen } = usePanelManager();
  
  // Close only section-level panels when side rail navigation changes
  useEffect(() => {
    if (isPanelOpen) {
      closeSectionPanels();
    }
  }, [activeSideRailItem]);
  
  // Close all panels when switching tabs (more significant navigation)
  useEffect(() => {
    if (isPanelOpen) {
      closePanel();
    }
  }, [activeTab]);
  
  return /* your page content */;
}
```

## Mobile Responsive Behavior

**Tablet (<672px):**
- Influence panels: Overlay with 320px width, 16px margin, backdrop added
- Overlay panels: Full-width, edge-to-edge

**Mobile (<320px):**
- All panels: Full-width, edge-to-edge, no margins
- Shadow changes to top shadow

## Z-Index Hierarchy

- Content: 0
- Backdrop: 5
- Overlay Panel: 10
- Influence Panel: 101
- Modals/Global Nav: Higher (always above panels)

## Accessibility

- Keyboard support: Escape key closes panel
- ARIA attributes: `aria-expanded`, `aria-hidden`, `aria-label`
- Focus management built-in

## Animation & Transitions

Panel close behavior adapts based on context for optimal user experience:

### Manual Close (with transition)
When users manually close panels (button click, Escape key):
- **Panel slide**: 300ms ease-in-out transform
- **Content margin**: 300ms ease-in-out (influence pattern)
- **Backdrop fade**: 300ms ease-in-out opacity
- **Unmount delay**: 300ms before removing content from DOM

This provides smooth visual feedback and polish for user-triggered actions.

### Navigation Close (immediate)
When navigating to a different page:
- **Immediate unmount**: No transition delay
- **Faster navigation**: Panel disappears instantly since page is changing

**Exception:** Global header panels (when implemented) will persist across page navigation.

## Styling

All colors, shadows, spacing use CSS variables from the design system.
Typography uses `var(--cds-font-family)` and Carbon typography tokens.
