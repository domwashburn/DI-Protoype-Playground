# Implementation Notes & Technical Details

This document provides additional technical details and best practices for implementing the PDF annotation interface.

## State Management Structure

### App.tsx State Variables
```typescript
const [annotations, setAnnotations] = useState<Annotation[]>([]);
const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | undefined>();
const [selectionSource, setSelectionSource] = useState<'pdf' | 'sidebar' | 'filter' | 'keyboard' | undefined>();
const [sidebarVisible, setSidebarVisible] = useState(true);
const [pageSelectorVisible, setPageSelectorVisible] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [showWelcome, setShowWelcome] = useState(true);
const [tagFilter, setTagFilter] = useState<string | null>(null);
const [isViewMode, setIsViewMode] = useState(true); // true = view-only
```

### Annotation Interface
```typescript
interface Annotation {
  id: string;
  pageNumber: number;
  text: string;
  comment: string;
  tags: Tag[];
  positions: Array<{
    x: number;      // 0.0 to 1.0 (percentage of page width)
    y: number;      // 0.0 to 1.0 (percentage of page height)
    width: number;  // 0.0 to 1.0 (percentage of page width)
    height: number; // 0.0 to 1.0 (percentage of page height)
  }>;
  createdAt: Date;
}
```

### Tag Interface
```typescript
interface Tag {
  id: string;
  name: string;  // Full name like "Data model/attribute"
  color: string; // Hex color like "#60A5FA"
}
```

## Component Props Reference

### PDFViewer Props
```typescript
interface PDFViewerProps {
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
  selectedAnnotationId?: string;
  onAnnotationClick: (annotationId: string, source?: 'pdf' | 'sidebar' | 'filter' | 'keyboard') => void;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onScrollToPage?: (scrollFn: (pageNumber: number) => void) => void;
  tagFilter?: string | null;
  onTagFilterChange?: (filter: string | null) => void;
  allAnnotations?: Annotation[];
  tagCategories?: string[];
  isViewMode?: boolean;
}
```

### AnnotationSidebar Props
```typescript
interface AnnotationSidebarProps {
  annotations: Annotation[];
  onAnnotationClick: (annotationId: string) => void;
  onDeleteAnnotation: (annotationId: string) => void;
  onEditAnnotation: (annotationId: string, comment: string) => void;
  selectedAnnotationId?: string;
  selectionSource?: 'pdf' | 'sidebar' | 'filter' | 'keyboard';
  onNavigateToPage: (pageNumber: number) => void;
  allAnnotations?: Annotation[];
  isViewMode?: boolean;
}
```

### PageSelector Props
```typescript
interface PageSelectorProps {
  numPages: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  annotations: Annotation[];
}
```

## Key Implementation Patterns

### 1. Scroll Management with Refs
```typescript
// In App.tsx
const scrollToPageRef = useRef<((pageNumber: number) => void) | null>(null);

// Pass to PDFViewer
onScrollToPage={(scrollFn) => {
  scrollToPageRef.current = scrollFn;
}}

// Use when needed
const handleNavigateToPage = useCallback((pageNumber: number) => {
  if (scrollToPageRef.current) {
    scrollToPageRef.current(pageNumber);
  }
}, []);
```

### 2. Annotation Numbering
```typescript
// Always calculate based on position in original annotations array
const getAnnotationNumber = (annotationId: string) => {
  return allAnnotations.findIndex(ann => ann.id === annotationId) + 1;
};
```

### 3. Visual Position Sorting (for Tab navigation with filter)
```typescript
const sortAnnotationsByPosition = (annotations: Annotation[]) => {
  return [...annotations].sort((a, b) => {
    // First by page
    if (a.pageNumber !== b.pageNumber) {
      return a.pageNumber - b.pageNumber;
    }
    
    // Then by Y coordinate
    const aY = a.positions[0]?.y || 0;
    const bY = b.positions[0]?.y || 0;
    const yThreshold = 0.02; // Same line tolerance
    
    if (Math.abs(aY - bY) >= yThreshold) {
      return aY - bY;
    }
    
    // Same line: sort by X coordinate
    const aX = a.positions[0]?.x || 0;
    const bX = b.positions[0]?.x || 0;
    return aX - bX;
  });
};
```

### 4. Text Color Calculation for Accessibility
```typescript
const getTextColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
```

### 5. Filtering Annotations by Tag
```typescript
const filteredAnnotations = tagFilter 
  ? annotations.filter(annotation => 
      annotation.tags.some(tag => tag.name.startsWith(tagFilter))
    )
  : annotations;
```

## CSS Customizations

Add to `styles/globals.css`:

```css
/* Inline annotation highlighting styles */
.inline-highlight {
  transition: all 0.2s;
}

.inline-highlight.selected {
  outline: 2px solid #3B82F6;
  outline-offset: 1px;
  border-radius: 3px;
}

.inline-highlight:hover {
  filter: brightness(0.9);
}

/* Animation for selected annotation in sidebar */
@keyframes selectedAnnotationPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    transform: scale(1.01);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.annotation-selected {
  animation: selectedAnnotationPulse 0.6s ease-in-out;
}
```

## Performance Considerations

1. **Use useCallback for event handlers** to prevent unnecessary re-renders
2. **Use useMemo for expensive computations** like sorting and filtering
3. **Use React.memo for child components** that don't need frequent updates
4. **Limit the number of DOM elements** for highlights (avoid creating one element per character for long documents)
5. **Debounce search inputs** to avoid filtering on every keystroke

## Common Pitfalls to Avoid

1. **Don't modify positions in pixels** - always use relative coordinates (0.0-1.0)
2. **Don't forget to pass selectionSource** when calling onAnnotationClick
3. **Always check isViewMode** before allowing edit operations
4. **Remember to filter annotations in BOTH PDF viewer and sidebar**
5. **Include both page number and Y coordinate** when sorting by position
6. **Don't auto-scroll when selectionSource is 'sidebar'** (user already sees the card)

## ShadCN Components Used

- `Button` - All buttons
- `Switch` - Edit mode toggle
- `Input` - Search fields
- `Textarea` - Comment editing
- `Badge` - Tag display
- `Card` - Annotation cards
- `ScrollArea` - Scrollable containers
- `Popover` - Annotation creation form
- `Separator` - Visual dividers
- `Accordion` - Tag category grouping
- `AlertDialog` - Delete confirmation (optional)

## Lucide Icons Used

- `FileText` - Main app icon, page headers
- `Layers` - Show/hide pages button
- `PanelRight` - Show/hide sidebar button
- `Sidebar` - Welcome modal icon
- `Search` - Search input
- `Edit3` - Edit button
- `Trash2` - Delete button
- `MessageSquare` - Comment icon
- `BookOpen` - Text/content icon
- `ZoomIn`, `ZoomOut`, `RotateCw` - PDF controls (optional)
- `X` - Close buttons

## Sample Data Structure

Provide sample annotations with realistic content about loan approval policies. Each annotation should demonstrate different combinations of tags from the four categories (Data model, Decision Logic, Business Objective, KPI).

Example:
```typescript
{
  id: '1',
  pageNumber: 2,
  text: 'Minimum credit score of 620 for most loan types',
  comment: 'Key eligibility threshold - defines critical decision boundary',
  tags: [
    { id: 'data-model-attribute', name: 'Data model/attribute', color: '#60A5FA' },
    { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
  ],
  positions: [{ x: 0.133, y: 0.28, width: 0.58, height: 0.022 }],
  createdAt: new Date('2024-01-15T10:30:00')
}
```
