# InboxLayout

**Custom Carbon-compliant**: This component family implements a master-detail "inbox" panel layout following Carbon Design System v11 conventions. All components either delegate to `@carbon/react` or are structured to mirror Carbon's patterns without being direct clones.

**Carbon Reference**: https://carbondesignsystem.com/patterns/overview/

**Why custom**: No single Carbon component provides this specific inbox-style master-detail layout. The pattern composes Carbon's `Search`, `Button`, and panel width standards into a cohesive layout system.

## Component classification

| Component | Classification | Notes |
|-----------|---------------|-------|
| `InboxLayoutTemplate` | Custom Carbon-compliant | No off-the-shelf Carbon equivalent |
| `InboxPanelHeader` | Custom Carbon-compliant | No off-the-shelf Carbon equivalent |
| `InboxPanelToolbar` | Custom Carbon-compliant | Uses `@carbon/react` `Search` + `Button` (Phase 8) |
| `InboxActionButton` | Custom Carbon-compliant | Uses `@carbon/react` `Button` + `@carbon/ibm-products` `Tearsheet` |
| `InboxPanelList` | Custom Carbon-compliant | Composes `LargeListItem`; no Carbon equivalent |

## Composition Pattern

```tsx
import {
  InboxLayoutTemplate,
  InboxPanelHeader,
  InboxActionButton,
  InboxPanelToolbar,
  InboxPanelList,
  AddIcon,
} from './components/InboxLayout';

<InboxLayoutTemplate
  sidebar={
    <>
      <InboxPanelHeader title="Decision services" />
      <InboxActionButton
        label="New decision service"
        icon={<AddIcon />}
        variant="combo"
        size="sm"
        fullWidth
        menuItems={[
          { label: "From template", onClick: () => {} },
          { label: "Blank service", onClick: () => {} },
        ]}
      />
      <InboxPanelToolbar searchPlaceholder="Find a decision service" />
      <InboxPanelList
        items={services}
        selectedItemId={selectedId}
        onItemClick={handleClick}
      />
    </>
  }
>
  {/* Main content area */}
  <PageHeader title="Service Name" />
  <ContentArea />
</InboxLayoutTemplate>
```

## Icons

Icons are sourced from `@carbon/icons-react` internally. Legacy named exports (`SearchIcon`, `FilterIcon`, `AddIcon`) are kept for backward compatibility but wrap the Carbon icons.

## Styling

- All CSS values use Carbon tokens from `/styles/globals.css`
- CSS Modules for scoping (`*.module.css`)
- No hardcoded hex colors or pixel values
- Sidebar width: 320px (Carbon panel standard)
- Toolbar height: 40px (Carbon compact search)
- Header height: 48px (Carbon standard)

## Integration

Works with:
- `SectionInfluencedLayout` for panel-influenced content reflow
- `LargeListItem` for inbox list items
- `PageHeader` for content area headers
- `PanelManager` for panel state coordination