# Quick Reference Guide

This is a quick reference for the most important layout and design decisions in the PDF annotation interface.

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Header (bg-white border-b px-4 py-3)                           │
│ ┌─────────────────┐              ┌──────────────────────────┐ │
│ │ 📄 PDF Tool     │              │ ⚙️ Edit | 📑 Pages | 📊 │ │
│ └─────────────────┘              └──────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Main Content (flex-1 flex overflow-hidden)                     │
│ ┌──────┬────────────────────────────────┬──────────────────┐  │
│ │Pages │     PDF Viewer (flex-1)        │  Sidebar         │  │
│ │w-48  │                                 │  (collapsible)   │  │
│ │      │  ┌──────────────────────────┐  │                  │  │
│ │┌────┐│  │ Page 1                   │  │ 🔍 Search        │  │
│ ││ 1  ││  │ [PDF Content]            │  │ ────────────────  │  │
│ │└────┘│  │                          │  │ 📝 Annotation #1 │  │
│ │┌────┐│  │ [Highlights]             │  │ 📝 Annotation #2 │  │
│ ││ 2  ││  │                          │  │ 📝 Annotation #3 │  │
│ │└────┘│  └──────────────────────────┘  │                  │  │
│ │      │  [More pages...]               │                  │  │
│ └──────┴────────────────────────────────┴──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Color Palette

### Tag Categories
- **Data model**: Parent `#3B82F6`, Child `#60A5FA` (Blue)
- **Decision Logic**: Parent `#8B5CF6`, Child `#A78BFA` (Purple)
- **Business Objective**: Parent `#10B981`, Child `#34D399` (Green)
- **KPI**: Parent `#F59E0B`, Child `#FBBF24` (Amber/Yellow)

### UI Colors
- **Selected annotation outline**: `#3B82F6` (blue-600)
- **Filter dimming overlay**: `rgba(255, 255, 255, 0.8)` (white 80%)
- **Page selector current page**: `border-blue-500 bg-blue-50`
- **Annotation count badge**: `bg-orange-500`

## Key Measurements

### Widths
- **Page selector**: `w-48` (192px)
- **Main container**: `h-screen flex flex-col`
- **Content area**: `flex-1 flex overflow-hidden`
- **PDF viewer**: `flex-1` (takes remaining space)

### Spacing
- **Header padding**: `px-4 py-3`
- **Page thumbnail spacing**: `space-y-2`, container `p-2`
- **Page thumbnail aspect ratio**: `[3/4]`

### Font Sizes
- **Page thumbnail text**: `text-[6px]`
- **Page number badges**: `text-xs`
- **Edit mode label**: `text-sm`
- **Sidebar search**: Standard input size

## Component Hierarchy

```
App.tsx
├── Header
│   ├── Title (FileText icon + "PDF Annotation Tool")
│   └── Controls
│       ├── Switch (Edit Mode toggle)
│       ├── Button (Show/Hide Pages)
│       └── Button (Show/Hide Annotations)
├── Main Content
│   ├── PageSelector (conditional: pageSelectorVisible)
│   ├── PDFViewer (flex-1)
│   │   ├── Filter controls
│   │   ├── Page containers
│   │   ├── Highlights (overlapping support)
│   │   └── Annotation popover
│   └── AnnotationSidebar (conditional: sidebarVisible)
│       ├── Search input
│       ├── ScrollArea
│       └── Annotation cards
└── Welcome Modal (conditional: !annotations.length)
```

## State Management Flow

```
App.tsx (Parent State)
├── annotations: Annotation[]
├── selectedAnnotationId: string | undefined
├── selectionSource: 'pdf' | 'sidebar' | 'filter' | 'keyboard' | undefined
├── currentPage: number
├── tagFilter: string | null
├── isViewMode: boolean (true = view-only)
├── sidebarVisible: boolean
└── pageSelectorVisible: boolean

Props Flow:
├── PDFViewer
│   ├── receives: annotations, selectedAnnotationId, tagFilter, isViewMode
│   └── emits: onAddAnnotation, onAnnotationClick, onPageChange
├── AnnotationSidebar
│   ├── receives: annotations, selectedAnnotationId, selectionSource, isViewMode
│   └── emits: onAnnotationClick, onDeleteAnnotation, onEditAnnotation
└── PageSelector
    ├── receives: currentPage, annotations (for count)
    └── emits: onPageClick
```

## Key Interaction Patterns

### Selection Sources and Scroll Behavior
| Source | Scrolls PDF? | Scrolls Sidebar? |
|--------|-------------|------------------|
| `'sidebar'` | ❌ No | ❌ No (already visible) |
| `'pdf'` | ❌ No (clicked location) | ✅ Yes |
| `'keyboard'` | ✅ Yes | ✅ Yes |
| `'filter'` | ✅ Yes (first match) | ✅ Yes (first match) |

### Tab Navigation Order
- **With filter active**: Visual position (page → Y → X)
- **No filter**: Annotation number (array index)

### Edit Mode States
- **View Mode (isViewMode = true)**: Can view, select, navigate, filter. Cannot create, edit, delete.
- **Edit Mode (isViewMode = false)**: Full functionality including create, edit, delete.

## Z-Index Layers

```
Layer 1 (z-10):     Base PDF content
Layer 2 (z-10):     Normal highlights
Layer 3 (z-20):     Selected highlight (with outline)
Layer 4 (z-30):     Filter dimming overlay
Layer 5 (z-40+):    Popovers and dialogs
```

## Animation Timings

- **Scroll behavior**: `smooth` with `behavior: 'smooth'`
- **Highlight transitions**: `transition: all 0.2s`
- **Pulse animation**: `0.6s ease-in-out`
- **Search debounce**: 300ms (recommended)

## Accessibility Features

1. **Text contrast**: Calculate based on luminance (WCAG AA: 4.5:1)
2. **Keyboard navigation**: Global Tab/Shift+Tab support
3. **ARIA labels**: Proper labels on all interactive elements
4. **Focus management**: Visible focus states
5. **Screen reader support**: Semantic HTML and ARIA attributes

## File Structure

```
/App.tsx                          Main application component
/components/
  ├── PDFViewer.tsx              PDF rendering and highlight management
  ├── AnnotationSidebar.tsx      Annotation list and management
  ├── PageSelector.tsx           Thumbnail navigation
  ├── TagSelector.tsx            Tag selection component
  └── ui/                        ShadCN UI components
/styles/
  └── globals.css                Custom CSS (animations, highlight styles)
```

## Critical Implementation Details

1. **Positions are relative**: Always use 0.0-1.0 range for x, y, width, height
2. **Annotation numbering is stable**: Based on position in original array, not filtered array
3. **Multi-position support**: Annotations can span multiple rectangles (multi-line)
4. **Tag names use full path**: "Data model/attribute" not just "attribute"
5. **Selection source must always be passed**: Required for smart scroll behavior
6. **Filter applies to both PDF and sidebar**: Keep in sync

## Common Component Patterns

### Creating an annotation
```typescript
const annotation: Annotation = {
  ...newAnnotation,
  id: crypto.randomUUID(),
  createdAt: new Date()
};
setAnnotations(prev => [...prev, annotation]);
```

### Handling annotation clicks
```typescript
// From sidebar
onAnnotationClick(id, 'sidebar')

// From PDF
onAnnotationClick(id, 'pdf')

// From keyboard
handleAnnotationClick(nextAnnotation.id, 'keyboard')
```

### Conditional scrolling
```typescript
// In AnnotationSidebar
if (selectedAnnotationId && selectionSource !== 'sidebar') {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// In PDFViewer
if (selectedAnnotationId && selectionSource !== 'pdf') {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
```

## Testing Checklist

- [ ] Create annotation in edit mode
- [ ] Cannot create annotation in view mode
- [ ] Click annotation in PDF → highlights in sidebar
- [ ] Click annotation in sidebar → highlights in PDF (no scroll)
- [ ] Tab navigation cycles through all annotations
- [ ] Tab with filter only cycles through filtered annotations
- [ ] Apply tag filter → PDF dims, only matching annotations visible
- [ ] Delete annotation removes from both PDF and sidebar
- [ ] Edit annotation comment updates in sidebar
- [ ] Page selector shows annotation counts
- [ ] Welcome modal appears when no annotations
- [ ] Overlapping highlights display correctly
- [ ] All colors meet WCAG contrast requirements
