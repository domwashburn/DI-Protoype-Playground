# Carbon React Conversion Guide

This document tracks all the temporary component replacements that should be converted to IBM Carbon React components when deploying this application to an environment that supports `@carbon/react` and `@carbon/icons-react`.

## Purpose
Due to import restrictions in the current development environment, we are using shadcn/ui components and lucide-react icons as temporary replacements. This file serves as a comprehensive mapping guide for converting these temporary components to their Carbon Design System equivalents.

## Component Conversion Map

### Navigation & Layout Components

| Current Implementation | Carbon React Equivalent | Priority | File Location | Notes |
|----------------------|------------------------|----------|---------------|-------|
| **shadcn/ui Tabs** | `<Tabs>` from `@carbon/react` | High | `/App.tsx` | Replace TabsList, TabsTrigger, TabsContent |
| Custom header div | `<Header>`, `<HeaderName>`, `<HeaderGlobalBar>`, `<HeaderGlobalAction>` | High | `/App.tsx` | Line 35-42 |

### Form Components

| Current Implementation | Carbon React Equivalent | Priority | File Location | Notes |
|----------------------|------------------------|----------|---------------|-------|
| **shadcn/ui Select** | `<Select>`, `<SelectItem>` from `@carbon/react` | High | `/components/EditorContainer.tsx` | Document selector (lines 227-242) |
| **shadcn/ui Switch** | `<Toggle>` from `@carbon/react` | High | `/components/EditorContainer.tsx` | Auto-save toggle (lines 250-254) |
| **shadcn/ui Label** | `<FormLabel>` from `@carbon/react` | Medium | `/components/EditorContainer.tsx`, `/components/FeatureList.tsx` | Multiple instances |
| **shadcn/ui Checkbox** | `<Checkbox>` from `@carbon/react` | High | `/components/FeatureList.tsx` | Testing checklist items (lines 413-418) |
| Custom textarea elements | `<TextArea>` from `@carbon/react` | Medium | `/components/BALEditor.tsx`, `/components/RichTextEditor.tsx`, `/components/MarkdownEditor.tsx` | Multiple editor instances |

### Notification Components

| Current Implementation | Carbon React Equivalent | Priority | File Location | Notes |
|----------------------|------------------------|----------|---------------|-------|
| **sonner Toast** | `<ToastNotification>`, `<InlineNotification>` from `@carbon/react` | High | `/App.tsx`, `/components/EditorContainer.tsx` | Import from sonner@2.0.3 |
| **shadcn/ui Alert** | `<InlineNotification>` from `@carbon/react` | High | `/components/BALEditor.tsx` | Error notifications (lines 126-131) |

### Display & Feedback Components

| Current Implementation | Carbon React Equivalent | Priority | File Location | Notes |
|----------------------|------------------------|----------|---------------|-------|
| **shadcn/ui Accordion** | `<Accordion>`, `<AccordionItem>` from `@carbon/react` | Medium | `/components/FeatureList.tsx` | Feature categories (lines 398-436) |
| Custom loading spinner | `<Loading>` from `@carbon/react` | Medium | `/components/EditorContainer.tsx` | Lines 267-270 |
| Custom progress bar | `<ProgressBar>` from `@carbon/react` | Low | `/components/FeatureList.tsx` | Lines 392-394 |

### Icons

| Current Implementation | Carbon React Equivalent | Priority | File Location | Notes |
|----------------------|------------------------|----------|---------------|-------|
| lucide-react icons | `@carbon/icons-react` | High | All component files | See detailed icon mapping below |

## Icon Conversion Map

### Icons by File

#### `/App.tsx`
- `Code` (lucide-react) → `<Code />` from `@carbon/icons-react`
- `FileText` → `<DocumentBlank />` or `<Document />` from `@carbon/icons-react`
- `Edit3` → `<Edit />` from `@carbon/icons-react`
- `BookOpen` → `<Book />` from `@carbon/icons-react`

#### `/components/BALEditor.tsx`
- `AlertCircle` → `<WarningAltFilled />` or `<ErrorFilled />` from `@carbon/icons-react`

#### `/components/RichTextEditor.tsx`
- `GripVertical` → `<Draggable />` from `@carbon/icons-react`
- `Trash2` → `<TrashCan />` from `@carbon/icons-react`
- `Plus` → `<Add />` from `@carbon/icons-react`

#### `/components/MarkdownEditor.tsx`
- `Eye` → `<View />` from `@carbon/icons-react`
- `EyeOff` → `<ViewOff />` from `@carbon/icons-react`
- `Code2` → `<Code />` from `@carbon/icons-react`

#### `/components/EditorContainer.tsx`
- `Loader2` → `<Loading />` component (not icon) from `@carbon/react`

#### `/components/AutoSaveIndicator.tsx`
- `CheckCircle2` → `<CheckmarkFilled />` from `@carbon/icons-react`
- `Loader2` → `<Loading />` from `@carbon/icons-react` (or use Carbon Loading component)
- `AlertCircle` → `<WarningFilled />` from `@carbon/icons-react`
- `CloudUpload` → `<CloudUpload />` from `@carbon/icons-react`

#### `/components/FeatureList.tsx`
- `Check` → `<Checkmark />` from `@carbon/icons-react`

## Styling Considerations

### CSS Module Conversions
All CSS modules in `/styles/` directory are currently implementing Carbon Design System tokens and principles manually. When converting to Carbon React:

1. **Import Carbon Styles**: Replace manual token implementations with:
   ```tsx
   import '@carbon/react/scss/styles.scss';
   ```

2. **Use Carbon SCSS Variables**: Convert custom CSS variables to Carbon SCSS variables:
   - Custom colors → `$ui-01`, `$ui-02`, `$interactive-01`, etc.
   - Custom spacing → `$spacing-05`, `$spacing-06`, etc.
   - Custom typography → `$productive-heading-01`, `$body-short-01`, etc.

3. **Component-Specific Styles**: 
   - Keep CSS modules for custom styling that extends Carbon components
   - Remove CSS that duplicates Carbon component built-in styles

### Files with Manual Carbon Styling (to be reviewed):
- `/styles/globals.css` - Contains manual Carbon token implementations
- `/styles/App.module.css` - Header and layout styling
- `/styles/EditorContainer.module.css` - Editor controls styling
- `/styles/FeatureList.module.css` - Accordion and progress styling
- `/styles/BALEditor.module.css` - Syntax highlighting (keep custom)
- `/styles/RichTextEditor.module.css` - Block editor styling (keep custom)
- `/styles/MarkdownEditor.module.css` - Markdown toolbar styling (keep custom)

## Conversion Priority

### High Priority (Core Functionality)
1. Replace Tabs component in App.tsx
2. Replace Select and Toggle in EditorContainer.tsx
3. Replace Toast notifications throughout app
4. Replace Alert components in BALEditor.tsx
5. Convert all icons to @carbon/icons-react

### Medium Priority (Enhanced UX)
1. Replace Accordion in FeatureList.tsx
2. Replace Checkbox components
3. Replace Label components
4. Replace Loading spinner
5. Implement proper Carbon Header component

### Low Priority (Nice to Have)
1. Replace progress bar
2. Refine form components with Carbon FormGroup
3. Add Carbon Grid components for layout

## Testing Checklist After Conversion

- [ ] All imports from `@carbon/react` resolve correctly
- [ ] All imports from `@carbon/icons-react` resolve correctly
- [ ] No references to shadcn/ui components remain
- [ ] No references to lucide-react remain
- [ ] No references to sonner remain
- [ ] Carbon styles are imported correctly
- [ ] All interactive components function as before
- [ ] Auto-save functionality still works
- [ ] All three editors (BAL, RTE, Markdown) work properly
- [ ] Visual appearance matches Carbon Design System
- [ ] Responsive behavior is maintained
- [ ] Testing checklist in FeatureList works
- [ ] Keyboard navigation works on all components
- [ ] Accessibility features are preserved/improved

## Additional Carbon Components to Consider

### Components Not Currently Used (But May Enhance the App)
- `<ContentSwitcher>` - Alternative to tabs for editor type selection
- `<Tag>` - For labeling document types or status
- `<CodeSnippet>` - For displaying code examples in feature list
- `<StructuredList>` - Alternative to accordion for feature list
- `<ProgressIndicator>` - Alternative progress display
- `<Modal>` - For document management dialogs
- `<DataTable>` - If adding document management features

## Notes for LLM/Developer

When performing the conversion:

1. **Preserve Functionality**: All existing features must continue to work
2. **Maintain Carbon Design Principles**: Follow Carbon spacing, typography, and color guidelines
3. **Keep Custom Editors**: The BAL, RichText, and Markdown editors are custom implementations - only replace their UI components (buttons, selects, etc.)
4. **Test Auto-Save**: Ensure the auto-save hook still works with Carbon components
5. **Accessibility**: Carbon components have built-in a11y - ensure it's not broken by custom styling
6. **TypeScript**: Maintain strict typing with Carbon's TypeScript definitions

## Import Statement Examples

### Before (Current Implementation)
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Switch } from './components/ui/switch';
import { Checkbox } from './components/ui/checkbox';
import { Code, FileText, Edit3, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
```

### After (Carbon Implementation)
```tsx
import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Select,
  SelectItem,
  Toggle,
  Checkbox,
  ToastNotification,
  InlineNotification,
  Loading,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from '@carbon/react';

import { 
  Code, 
  DocumentBlank, 
  Edit, 
  Book, 
  WarningAltFilled,
  TrashCan,
  CheckmarkFilled,
  CloudUpload,
  View,
  ViewOff
} from '@carbon/icons-react';
```

## File Comments Guide

Every file that uses temporary replacements includes inline comments with the following format:

```tsx
// CARBON_CONVERT: Replace [current-component] with [carbon-component] from [carbon-package]
```

Look for these comments when converting to quickly identify what needs to be changed.

---

**Last Updated**: Initial creation  
**Maintained By**: Project Development Team  
**Related Files**: All files in `/components/` and `/App.tsx`
