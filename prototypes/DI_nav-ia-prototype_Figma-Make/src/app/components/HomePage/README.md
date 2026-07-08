# Home Page Components

This directory contains the component family for building the application home page following a **modular layout architecture**. The HomePage is treated as a layout template that composes sub-modules (header and sections), with each module handling its own height and spacing based on content.

## Architecture Overview

**HomePage as Layout:**
- HomePage is a **layout template** that composes sub-modules
- Each module (header, sections) is self-contained and content-driven
- Height responds to content, not forced by parent containers
- Follows Carbon Design System v11 grid patterns

**Key Principle:**
> Content drives height, layout provides structure

## Components

### HomePageHeader

The collapsible header module at the top of the home page. **Matches Figma import structure exactly** with content-driven height.

**Key Features:**
- **Single container div** - no nested wrapper divs forcing height
- **Content-driven height** - expands/collapses based on state
- Personalized welcome message
- Display settings and collapse/expand actions
- 12-column grid for task tiles (AI chat + 2 standard tiles)
- AI chat tile with Beta badge and gradient background
- Decorative hero image background
- Responsive across breakpoints

**Structure:**
```tsx
// Single container - height determined by content
<div className={styles.homePageHeader}>
  <WelcomeHeader />
  <ActionButtons />
  {!isCollapsed && (
    <>
      <HeaderContent />
      <HeroImage />
    </>
  )}
</div>
```

**Usage:**
```tsx
import { HomePageHeader } from './components/HomePage';

<HomePageHeader 
  userName="First name"
  onDisplaySettings={() => console.log('Display settings')}
/>
```

**Props:**
- `userName?: string` - User's name for welcome message (default: "First name")
- `onDisplaySettings?: () => void` - Callback when display settings is clicked

---

### HomePageSection

Full-width content section container that implements the Carbon 16-column grid.

**Features:**
- Full browser width
- Configurable background color
- Internal 16-column grid
- Responsive padding and breakpoints
- Centered content with max-width

**Usage:**
```tsx
import { HomePageSection, HomePageSectionTitle, HomePageSectionContent } from './components/HomePage';

<HomePageSection backgroundColor="var(--background-secondary)">
  <HomePageSectionTitle 
    title="Recent decision automations"
    subtitle="Open decision automations that you created, modified, or viewed"
  />
  <HomePageSectionContent>
    {/* Your content here */}
  </HomePageSectionContent>
</HomePageSection>
```

**Props:**
- `children: ReactNode` - Section content (title + content components)
- `backgroundColor?: string` - Background color (default: `var(--background-secondary)`)
- `className?: string` - Additional CSS classes

---

### HomePageSectionTitle

Title and subtitle area for content sections. Spans 4 columns in the 16-column grid.

**Features:**
- Primary title
- Optional subtitle
- Optional actions area
- Fixed width constraints (224px - 288px)
- Responsive full-width on smaller screens

**Usage:**
```tsx
<HomePageSectionTitle 
  title="Recent decision automations"
  subtitle="Open decision automations that you created, modified, or viewed"
  actions={
    <Button kind="ghost">View all</Button>
  }
/>
```

**Props:**
- `title: string` - Section title
- `subtitle?: string` - Optional subtitle text
- `actions?: ReactNode` - Optional action buttons or links
- `className?: string` - Additional CSS classes

---

### HomePageSectionContent

Flexible content area for sections. Spans 12 columns in the 16-column grid.

**Features:**
- Flexible container for any content type
- Full-width on smaller screens
- Vertical gap spacing for child elements

**Usage:**
```tsx
<HomePageSectionContent>
  <CardGrid columns={4}>
    <Card>...</Card>
    <Card>...</Card>
  </CardGrid>
</HomePageSectionContent>
```

**Props:**
- `children: ReactNode` - Content to display (cards, tables, lists, etc.)
- `className?: string` - Additional CSS classes

---

## Layout Structure

### Grid System

The home page uses Carbon's 16-column grid:

```
┌─────────────────────────────────────────────────────────────┐
│                        Full Width Section                    │
│  ┌────────────┬────────────────────────────────────────────┐ │
│  │  Title     │         Content Area                       │ │
│  │  (4 cols)  │         (12 cols)                          │ │
│  │            │                                            │ │
│  │  Title     │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐         │ │
│  │  Subtitle  │  │Card │ │Card │ │Card │ │Card │         │ │
│  │            │  └─────┘ └─────┘ └─────┘ └─────┘         │ │
│  └────────────┴────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

**MAX (≥1312px):**
- 16-column grid
- Title: 4 cols, Content: 12 cols (side-by-side)
- Max width: 1312px
- Padding: 64px vertical, 32px horizontal

**XL (1056px - 1311px):**
- 16-column grid
- Title: 4 cols, Content: 12 cols (side-by-side)
- Max width: 1056px
- Padding: 48px vertical, 16px horizontal

**Large (672px - 1055px):**
- Single column layout
- Title and content stacked vertically
- Max width: 672px
- Padding: 32px vertical, 16px horizontal

**Medium (<672px):**
- Single column layout
- Title and content stacked vertically
- Full width
- Padding: 24px

---

## Home Page Header Details

### Task Tiles Grid

The header contains a 12-column sub-grid for task tiles:

```
┌──────────────────────────────────────────────────────┐
│  AI Chat Tile          │  Task 1  │  Task 2         │
│  (6 cols)              │  (3 cols)│  (3 cols)       │
│  ┌───────────────┐     │  ┌─────┐ │  ┌─────┐       │
│  │ Beta | AI     │     │  │     │ │  │     │       │
│  │ Chat...        │     │  │     │ │  │     │       │
│  │ [Start...]     │     │  │     │ │  │     │       │
│  │ Open assistant │     │  │     │ │  │     │       │
│  └───────────────┘     │  └─────┘ │  └─────┘       │
└──────────────────────────────────────────────────────┘
```

### Gradient Background

The header uses a gradient from white to `var(--background-secondary)`:

```css
background: linear-gradient(to bottom, var(--background), var(--background-secondary));
```

### Collapse/Expand

The header can be collapsed to save vertical space:
- Collapsed: Shows only welcome text and action buttons
- Expanded: Shows full header with task tiles and hero image

---

## Content Section Examples

### Cards Grid

```tsx
<HomePageSection>
  <HomePageSectionTitle 
    title="Recent decision automations"
    subtitle="Open decision automations that you created, modified, or viewed"
  />
  <HomePageSectionContent>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 'var(--spacing-05)'
    }}>
      <Card>Automation 1</Card>
      <Card>Automation 2</Card>
      <Card>Automation 3</Card>
    </div>
  </HomePageSectionContent>
</HomePageSection>
```

### Split Layout (Table + Sidebar)

```tsx
<HomePageSection>
  <HomePageSectionTitle 
    title="Decision services"
    subtitle="Services available across projects"
  />
  <HomePageSectionContent>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-05)' }}>
      <DataTable />
      <SidebarList />
    </div>
  </HomePageSectionContent>
</HomePageSection>
```

---

## Design System Integration

### CSS Variables Used

All styling uses CSS variables from `/styles/globals.css`:

**Spacing:**
- `--spacing-03` through `--spacing-09`

**Colors:**
- `--background` - Base background
- `--background-secondary` - Section backgrounds
- `--text-01`, `--text-02`, `--text-05` - Text colors
- `--ui-01`, `--ui-04` - UI backgrounds and borders
- `--interactive-01`, `--interactive-02` - Interactive elements
- `--support-04`, `--support-04-hover` - Beta badge colors
- `--highlight` - AI tile border

**Border Radius:**
- `--radius-none`, `--radius-md`

**Typography:**
- IBM Plex Sans (defined in globals.css)

---

## Architecture Notes

### Composition Pattern

The home page uses a composition pattern:

```tsx
<HomePageSection>
  <HomePageSectionTitle />
  <HomePageSectionContent>
    {/* Any content */}
  </HomePageSectionContent>
</HomePageSection>
```

This provides:
- Maximum flexibility
- Clear structure
- Easy to understand
- Simple to extend

### vs. Configuration Pattern

We **avoid** configuration-heavy props:

```tsx
// ❌ Don't do this
<HomePageSection
  title="Title"
  subtitle="Subtitle"
  showActions
  actionButtons={[...]}
  contentType="cards"
  columns={4}
/>
```

Instead, use composition for clarity and flexibility.

---

## Implementation Notes

### Carbon Grid Alignment

- Follows Carbon 2x Grid specifications
- 16-column grid at max breakpoint
- Gutter: 16px (--spacing-05)
- Margin: 32px left, 16px right (at max)

### Hero Image

The decorative hero image:
- Absolute positioned top-right
- Opacity: 0.4
- Only visible when header is expanded
- Hidden on mobile breakpoints

### Responsive Behavior

Content gracefully adapts:
- **Desktop**: Side-by-side title + content
- **Tablet**: Stacked vertically
- **Mobile**: Full width, simplified layout

---

## Future Enhancements

Potential additions:
- Multiple task tile layouts (2-col, 3-col, 4-col)
- Different content section patterns
- Section actions toolbar
- View all / pagination for sections
- Animation between expanded/collapsed states

---

## References

- Carbon Design System Grid: https://carbondesignsystem.com/elements/2x-grid/usage/
- Guidelines: `/guidelines/Guidelines.md`
- Panel System: `/design-documentation/Panel-System.md`