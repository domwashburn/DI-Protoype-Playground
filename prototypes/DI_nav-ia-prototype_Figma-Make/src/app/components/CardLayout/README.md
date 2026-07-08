# CardLayout Component Library

A modular, reusable card layout system with composable components following Carbon Design System v11 patterns.

## Directory Structure

```
CardLayout/
├── index.ts                      # Main exports file
├── README.md                     # This file
├── CardLayoutTemplate.tsx        # Main layout component
├── CardLayoutTemplate.module.css
├── CardLayoutToolbar.tsx         # Search/filter/view controls
├── CardLayoutToolbar.module.css
├── CardGrid.tsx                  # Responsive grid container
├── CardGrid.module.css
├── Card.tsx                      # Individual card component
└── Card.module.css
```

## Components

### CardLayoutTemplate (Main Component)
Complete layout that combines toolbar and grid. Use this for full-featured card layouts.

**Features:**
- Integrated toolbar with sort, search, and view toggle
- Automatic grid layout with responsive behavior
- Can hide toolbar or use custom container

**Import:**
```tsx
import CardLayoutTemplate from "./components/CardLayout";
```

**Usage:**
```tsx
<CardLayoutTemplate
  toolbarProps={{
    sortOptions: [{ value: "recent", label: "Recently updated" }],
    sortValue: sortBy,
    onSortChange: setSortBy,
    searchValue: searchTerm,
    onSearchChange: setSearchTerm,
    viewMode: viewMode,
    onViewModeChange: setViewMode
  }}
  viewMode={viewMode}
>
  <Card title="Card 1" />
  <Card title="Card 2" />
</CardLayoutTemplate>
```

---

### Card (Standalone Component)
Flexible card component with two variants: "standard" and "ai-generated". Can be used anywhere with props or custom children.

**Variants:**
- **standard**: White background, gray border, standard shadow
- **ai-generated**: Gradient background, blue border, blue shadow with glow effect

**Import:**
```tsx
import { Card } from "./components/CardLayout";
// Or with sub-components:
import { Card, CardHeader, CardContent, CardMetadata, CardFooter } from "./components/CardLayout";
```

**Usage - Props (Recommended):**
```tsx
<Card
  title="Decision Automation"
  status="Deployed"
  description="This is the automation description"
  lastUpdatedDate="2025-06-30"
  lastUpdatedBy="user@email.com"
  tags={["Review updates", "tag"]}
  variant="ai-generated"
  onClick={() => handleClick()}
  onMenuClick={(e) => handleMenuClick(e)}
/>
```

**Usage - Custom Children:**
```tsx
<Card variant="standard" onClick={() => handleClick()}>
  <CardHeader title="Custom Title" status="Active" />
  <CardContent>
    <p>Custom content here</p>
  </CardContent>
  <CardMetadata 
    lastUpdatedDate="2025-06-30"
    lastUpdatedBy="user@email.com"
  />
  <CardFooter tags={["tag1", "tag2"]} variant="standard" />
</Card>
```

---

### CardGrid (Container Component)
Responsive grid container using CSS container queries. Automatically adjusts columns based on available width.

**Import:**
```tsx
import { CardGrid } from "./components/CardLayout";
```

**Usage:**
```tsx
<CardGrid viewMode="grid">
  <Card title="Card 1" />
  <Card title="Card 2" />
  <Card title="Card 3" />
</CardGrid>
```

**Grid Breakpoints:**
- < 480px: 1 column
- 480px+: 2 columns
- 768px+: 3 columns
- 1024px+: 4 columns
- 1280px+: Auto-fill (minmax 280px)

---

### CardLayoutToolbar (Toolbar Component)
Search, sort, and view toggle controls. All sections are optional.

**Import:**
```tsx
import { CardLayoutToolbar } from "./components/CardLayout";
```

**Usage:**
```tsx
<CardLayoutToolbar
  sortOptions={[
    { value: "recent", label: "Recently updated" },
    { value: "name", label: "Name" }
  ]}
  sortValue={sortBy}
  onSortChange={setSortBy}
  searchValue={searchTerm}
  onSearchChange={setSearchTerm}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  hideSort={false}
  hideSearch={false}
  hideViewToggle={false}
/>
```

---

## Examples

### Example 1: Full Layout
```tsx
import CardLayoutTemplate, { Card } from "./components/CardLayout";

function MyPage() {
  const [sortBy, setSortBy] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <CardLayoutTemplate
      toolbarProps={{
        sortOptions: [
          { value: "recent", label: "Recently updated" },
          { value: "name", label: "Name" }
        ],
        sortValue: sortBy,
        onSortChange: setSortBy,
        searchValue: searchTerm,
        onSearchChange: setSearchTerm,
        viewMode: viewMode,
        onViewModeChange: setViewMode
      }}
      viewMode={viewMode}
    >
      {items.map(item => (
        <Card
          key={item.id}
          title={item.name}
          status={item.status}
          description={item.description}
          lastUpdatedDate={item.date}
          lastUpdatedBy={item.user}
          tags={item.tags}
          variant={item.isAiGenerated ? "ai-generated" : "standard"}
          onClick={() => handleClick(item.id)}
          onMenuClick={(e) => handleMenuClick(e, item.id)}
        />
      ))}
    </CardLayoutTemplate>
  );
}
```

### Example 2: Standalone Cards
```tsx
import { Card } from "./components/CardLayout";

function MyComponent() {
  return (
    <div className={styles.customLayout}>
      <Card
        title="AI Automation"
        status="Deployed"
        description="Use cards anywhere!"
        lastUpdatedDate="2025-06-30"
        lastUpdatedBy="user@email.com"
        tags={["tag1", "tag2"]}
        variant="ai-generated"
        onClick={() => {}}
      />
    </div>
  );
}
```

### Example 3: Custom Card Layout (Replace Grid with Table)
```tsx
import CardLayoutTemplate from "./components/CardLayout";

function MyTableView() {
  return (
    <CardLayoutTemplate
      toolbarProps={{
        hideViewToggle: true,
        searchValue: searchTerm,
        onSearchChange: setSearchTerm
      }}
      customContainer={true}
    >
      <table className={styles.dataTable}>
        {/* Your table content */}
      </table>
    </CardLayoutTemplate>
  );
}
```

---

## TypeScript Support

All components are fully typed with TypeScript. Import types as needed:

```tsx
import type {
  CardProps,
  CardGridProps,
  CardLayoutToolbarProps,
  CardLayoutTemplateProps,
  SortOption
} from "./components/CardLayout";
```

---

## Styling

All components use CSS modules with Carbon Design System variables:
- Colors: `var(--cds-*)`
- Spacing: `var(--cds-spacing-*)`
- Typography: `var(--cds-font-family)`, `var(--cds-body-01-*)`, etc.

To customize, override styles in your own CSS modules or extend the components.

---

## Notes

- **Responsive by Default**: Uses CSS container queries for optimal responsiveness
- **Accessible**: Proper focus states, ARIA labels, keyboard navigation
- **Composable**: Mix and match components as needed
- **Carbon-Aligned**: Follows IBM Carbon Design System v11 patterns
