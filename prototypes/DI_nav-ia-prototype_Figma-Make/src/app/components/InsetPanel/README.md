# InsetPanel Component

A flexible, reusable inset panel system that provides inbox-style structure within a floating panel that sits 16px from the top, left, and bottom edges of its container.

## Architecture

The InsetPanel system follows Carbon Design System patterns and provides:

- **Modular Structure**: Separate components for header, toolbar, and content
- **Flexible Layout**: Optional header and toolbar sections
- **Consistent Spacing**: 16px inset from container edges (configured via parent CSS)
- **Scrollable Content**: Content area scrolls independently while header/toolbar remain fixed
- **Reusable**: Can be used in any asset type that needs an inset panel

## Components

### InsetPanel

Main container component that structures the panel layout.

```tsx
<InsetPanel
  header={<InsetPanelHeader title="Artifacts" />}
  toolbar={<InsetPanelToolbar />}
>
  {/* Content goes here */}
</InsetPanel>
```

**Props:**
- `header` (ReactNode, optional): Header section
- `toolbar` (ReactNode, optional): Toolbar section
- `children` (ReactNode, required): Main content area
- `className` (string, optional): Additional CSS class

### InsetPanelHeader

Header section with title and optional actions.

```tsx
<InsetPanelHeader
  title="Artifacts"
  actions={
    <button onClick={handleAdd}>
      <Add size={16} />
    </button>
  }
/>
```

**Props:**
- `title` (string, required): Panel title
- `actions` (ReactNode, optional): Action buttons on the right

### InsetPanelToolbar

Optional toolbar section for search, filters, and view controls.

```tsx
<InsetPanelToolbar
  search={<input placeholder="Search..." />}
  viewControls={<ViewModeButtons />}
/>
```

**Props:**
- `search` (ReactNode, optional): Search/filter section
- `viewControls` (ReactNode, optional): View control buttons
- `children` (ReactNode, optional): Custom toolbar content

## Usage with DecisionServiceAssetDetailsPage

The InsetPanel integrates seamlessly with the `DecisionServiceAssetDetailsPage` component:

```tsx
<DecisionServiceAssetDetailsPage
  layoutModifier="left-panel"  // Enables left panel
  leftPanelContent={
    <InsetPanel
      header={<InsetPanelHeader title="Artifacts" />}
      toolbar={<InsetPanelToolbar />}
    >
      <TreeNavigation items={treeData} />
    </InsetPanel>
  }
>
  {/* Main content */}
</DecisionServiceAssetDetailsPage>
```

## Panel Positioning

The inset positioning (16px from edges) is handled by the parent container CSS:

```css
.leftPanel {
  grid-area: left;
  background-color: transparent;
  padding: var(--cds-spacing-05) 0 var(--cds-spacing-05) var(--cds-spacing-05);
  overflow: hidden;
}
```

This approach allows:
- ✅ Flexible positioning controlled by parent
- ✅ Panel content is reusable in different contexts
- ✅ Easy to adjust spacing via CSS variables
- ✅ Maintains proper overflow behavior

## Common Use Cases

### Task Model Asset Navigation

```tsx
<InsetPanel
  header={<InsetPanelHeader title="Artifacts" />}
  toolbar={<InsetPanelToolbar search={<SearchInput />} />}
>
  <TreeNavigation items={artifactsTree} />
</InsetPanel>
```

### File Browser

```tsx
<InsetPanel
  header={<InsetPanelHeader title="Files" actions={<AddButton />} />}
  toolbar={<InsetPanelToolbar viewControls={<ViewToggle />} />}
>
  <FileList files={files} />
</InsetPanel>
```

### Custom Content

```tsx
<InsetPanel header={<InsetPanelHeader title="Custom Panel" />}>
  <YourCustomComponent />
</InsetPanel>
```

## Opt-In Architecture

Asset types can easily opt in or out of using the inset panel:

- **With panel**: Set `layoutModifier="left-panel"` and pass `leftPanelContent`
- **Without panel**: Set `layoutModifier="default"` (no panel content needed)

```tsx
// Decision Model (no panel)
<DecisionServiceAssetDetailsPage
  layoutModifier="default"
>
  {/* Full-width content */}
</DecisionServiceAssetDetailsPage>

// Task Model (with panel)
<DecisionServiceAssetDetailsPage
  layoutModifier="left-panel"
  leftPanelContent={<InsetPanel>...</InsetPanel>}
>
  {/* Content with left panel */}
</DecisionServiceAssetDetailsPage>
```

## Styling

All components use CSS variables from the Carbon Design System:

- **Colors**: `--cds-layer`, `--cds-text-primary`, `--cds-border-subtle`
- **Spacing**: `--cds-spacing-*` tokens
- **Typography**: `--cds-font-family`
- **Transitions**: `--cds-productive-02`

This ensures consistency with the design system and allows easy theming.

## Integration with TreeNavigation

The InsetPanel is designed to work perfectly with the TreeNavigation component:

```tsx
<InsetPanel
  header={<InsetPanelHeader title="Artifacts" />}
  toolbar={<InsetPanelToolbar />}
>
  <TreeNavigation
    items={treeData}
    selectedId={selectedId}
    onItemClick={handleItemClick}
  />
</InsetPanel>
```

See `/components/TreeNavigation/README.md` for TreeNavigation documentation.
