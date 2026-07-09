# BAL Editor Component

Production-ready code editor for Business Automation Language (BAL) with real-time syntax highlighting, autocomplete, and natural cursor behavior.

## Architecture

Uses the **textarea + overlay pattern** for zero cursor jumping:
- Real `<textarea>` handles all input (browser manages cursor)
- Absolutely positioned `<div>` displays syntax highlighting behind textarea
- Textarea is transparent - user sees syntax colors through it
- No DOM manipulation during typing = no cursor jumping!

## Quick Start

```tsx
import { BALEditor } from './components/BALEditor';

function MyApp() {
  const [code, setCode] = useState('');
  
  return (
    <BALEditor
      value={code}
      onChange={setCode}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Current BAL code content |
| `onChange` | `(value: string) => void` | ✅ | Callback when content changes |
| `errors` | `BALError[]` | ❌ | Array of validation errors to display |
| `onValidate` | `() => void` | ❌ | Callback triggered by Cmd/Ctrl+S |
| `vocabularyMappings` | `VocabularyMapping[]` | ❌ | Custom vocabulary terms with definitions |
| `className` | `string` | ❌ | Additional CSS class for container |

## With Validation & Errors

```tsx
import { BALEditor, type BALError } from './components/BALEditor';

function MyApp() {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<BALError[]>([]);
  
  const handleValidate = () => {
    // Run validation
    const validationErrors = validateBAL(code);
    setErrors(validationErrors);
  };
  
  return (
    <BALEditor
      value={code}
      onChange={setCode}
      errors={errors}
      onValidate={handleValidate}
    />
  );
}
```

## Features

✅ **Zero Cursor Jumping** - Browser owns cursor completely  
✅ **Real-time Syntax Highlighting** - Updates as you type  
✅ **Autocomplete** - Context-aware suggestions with keyboard nav  
✅ **Tab Support** - Custom Tab/Shift-Tab indentation  
✅ **Hanging Indent** - Wrapped lines visually indented  
✅ **Line Numbers** - Synced with content  
✅ **Error Highlighting** - Visual indicators on line numbers  
✅ **Auto-save Compatible** - External updates don't affect cursor  

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Insert 2 spaces |
| `Shift+Tab` | Remove indent |
| `Cmd/Ctrl+S` | Trigger validation |
| `Escape` | Dismiss autocomplete |
| `↑↓` | Navigate suggestions |
| `Enter` or `Tab` | Accept suggestion |

## Syntax Highlighting

Automatically highlights BAL syntax:
- **Keywords** (if, then, else) - Blue, bold
- **Strings** ('text') - Green
- **Numbers** (123, 45.67) - Purple
- **Operators** (and, or, is greater than) - Pink
- **Comments** ("" comment) - Gray, italic
- **Vocabulary** (custom terms) - Purple, dotted underline

Colors defined in `/styles/globals.css` following Carbon Design System.

## Integration with Auto-save

The editor is auto-save compatible:

```tsx
import { useAutoSave } from '../hooks/useAutoSave';

function MyComponent() {
  const [code, setCode] = useState('');
  
  useAutoSave({
    value: code,
    onSave: async (content) => {
      await saveToServer(content);
    },
    delay: 2000
  });
  
  return <BALEditor value={code} onChange={setCode} />;
}
```

Cursor position remains stable even when value updates from external sources.

## Styling

Styles in `BALEditor.module.css` use:
- **CSS Modules** for component scoping
- **CSS Variables** for all design values (colors, spacing, typography)
- **Carbon Design System** tokens from `/styles/globals.css`
- **IBM Plex Mono** typography

### Customization

Override CSS variables in your app's globals.css:

```css
:root {
  --editor-line-height: 1.8;      /* Increase line height */
  --editor-font-size: 16px;       /* Larger font */
  --bal-syntax-keyword: #0043ce;  /* Change keyword color */
}
```

## Carbon Design System

**Current Implementation** (temporary):
- Uses shadcn/ui `Alert` for error display
- Uses lucide-react `AlertCircle` icon

**Carbon Conversion** (for production):

```tsx
// Replace shadcn/ui with Carbon
import { InlineNotification } from '@carbon/react';
import { ErrorFilled } from '@carbon/icons-react';
```

See `/docs/carbon-conversion.md` for complete mapping.

## Technical Details

### How Cursor Stability Works

1. **Browser-Managed Cursor** - Textarea owns cursor completely
2. **No DOM Manipulation** - Overlay updates don't touch textarea
3. **Transparent Text** - Textarea text invisible, cursor visible
4. **Perfect Alignment** - Same font, size, padding as overlay
5. **Scroll Sync** - Both elements scroll together

Same pattern used by `react-simple-code-editor`, `react-live`, and similar libraries.

### Performance

- **React.memo** - Component is memoized to prevent unnecessary re-renders
- **Syntax highlighting** - Updates only when value or vocabularyMappings change
- **Autocomplete** - Debounced to avoid excessive calculations
- **Scroll sync** - Efficient event handlers with useCallback

## Migration from BALEditorRobust

If you're migrating from the old `BALEditorRobust`:

```tsx
// OLD
import { BALEditorRobust } from './components/BALEditorRobust';
<BALEditorRobust value={code} onChange={setCode} />

// NEW
import { BALEditor } from './components/BALEditor';
<BALEditor value={code} onChange={setCode} />
```

Same props, same behavior. Just a cleaner name and organized structure.

## Related Components

- **EditorContainer** - Smart container managing editor state
- **AutoSaveIndicator** - Visual auto-save status
- **DiffViewer** - Compare BAL documents

## Architecture Documentation

For detailed architecture discussion, see:
- `/docs/BAL_EDITOR_ARCHITECTURE_ANALYSIS.md` - Architecture decisions
- `/docs/BAL_EDITOR_IMPLEMENTATION_SUMMARY.md` - Implementation overview
- `/docs/BAL_EDITOR_TEST_CASES.md` - Test cases and validation

## License

Part of the BAL Editor Platform project.

---

**Questions?** Check the comprehensive documentation in `/docs/` or refer to the Guidelines in `/guidelines/Guidelines.md`.
