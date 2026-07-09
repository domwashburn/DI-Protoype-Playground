

# DataModelExtensionEditor Components

Composable components for managing automation-specific data model extensions.

## Overview

The DataModelExtensionEditor enables automations to extend global base models with:
- **Custom attributes** - Add automation-specific fields
- **Vocabulary customization** - Add natural language terms (additive, non-destructive)
- **Attribute visibility** - Hide base model attributes not needed
- **Visual distinction** - Clear indicators for global (🌍) vs custom (🔧) attributes

## Component Hierarchy

```
DataModelExtensionEditor (parent)
├─ BaseAttributeList
│  └─ AttributeRow
│     └─ VocabularyEditor
├─ CustomAttributeList
│  ├─ AttributeRow
│  │  └─ VocabularyEditor
│  └─ AttributeFormModal
│     └─ VocabularyEditor
```

## Components

### DataModelExtensionEditor

**Purpose:** Main editor component for managing data model extensions.

**Props:**
```typescript
interface DataModelExtensionEditorProps {
  automationId: string;     // Required: Automation to edit
  onSave?: () => void;      // Optional: Save callback
  onCancel?: () => void;    // Optional: Cancel callback
}
```

**Usage:**
```typescript
import { DataModelExtensionEditor } from './components/DataModelExtensionEditor';

function AutomationSettings({ automationId }) {
  return (
    <DataModelExtensionEditor
      automationId={automationId}
      onSave={() => console.log('Saved!')}
      onCancel={() => console.log('Cancelled')}
    />
  );
}
```

**Features:**
- Mode selector (global vs extended)
- Base model selection
- Extension creation/deletion
- Integrates BaseAttributeList and CustomAttributeList

---

### BaseAttributeList

**Purpose:** Displays and manages inherited attributes from base model.

**Props:**
```typescript
interface BaseAttributeListProps {
  attributes: DataModelAttribute[];
  vocabularyOverrides?: Map<string, string[]>;
  hiddenAttributes?: string[];
  onAddVocabulary?: (path: string, terms: string[]) => void;
  onResetVocabulary?: (path: string) => void;
  onHideAttribute?: (path: string) => void;
  onUnhideAttribute?: (path: string) => void;
}
```

**Usage:**
```typescript
<BaseAttributeList
  attributes={baseModel.attributes}
  vocabularyOverrides={extension.vocabularyOverrides}
  hiddenAttributes={extension.hiddenAttributes}
  onAddVocabulary={(path, terms) => console.log('Add vocab', path, terms)}
  onResetVocabulary={(path) => console.log('Reset vocab', path)}
  onHideAttribute={(path) => console.log('Hide', path)}
  onUnhideAttribute={(path) => console.log('Unhide', path)}
/>
```

**Features:**
- Shows all base model attributes
- Visual indicators (🌍) for global attributes
- Vocabulary editing per attribute
- Hide/unhide attributes
- Expand/collapse for nested attributes

---

### CustomAttributeList

**Purpose:** Displays and manages custom attributes added to automation.

**Props:**
```typescript
interface CustomAttributeListProps {
  attributes: DataModelAttribute[];
  onAddAttribute?: (attribute: DataModelAttribute) => void;
  onUpdateAttribute?: (name: string, updates: Partial<DataModelAttribute>) => void;
  onDeleteAttribute?: (name: string) => void;
}
```

**Usage:**
```typescript
<CustomAttributeList
  attributes={extension.addedAttributes}
  onAddAttribute={(attr) => console.log('Add', attr)}
  onUpdateAttribute={(name, updates) => console.log('Update', name, updates)}
  onDeleteAttribute={(name) => console.log('Delete', name)}
/>
```

**Features:**
- Shows all custom attributes
- Visual indicators (🔧) for custom attributes
- Full CRUD operations (create, read, update, delete)
- Vocabulary editing
- Empty state with CTA

---

### AttributeRow

**Purpose:** Reusable row component for displaying a single attribute.

**Props:**
```typescript
interface AttributeRowProps {
  attribute: DataModelAttribute;
  source: 'global' | 'custom';
  customVocabulary?: string[];
  isHidden?: boolean;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
  onVocabularyChange?: (vocabulary: string[]) => void;
  onResetVocabulary?: () => void;
  showEditControls?: boolean;
  canEditVocabulary?: boolean;
}
```

**Usage:**
```typescript
<AttributeRow
  attribute={attribute}
  source="custom"
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
  showEditControls={true}
  canEditVocabulary={true}
/>
```

**Features:**
- Displays attribute name, type, description
- Shows source indicator (🌍 or 🔧)
- Collapsible vocabulary editor
- Edit/delete buttons (for custom attributes)
- Hide/unhide button (for base attributes)
- Expand/collapse for nested attributes

---

### VocabularyEditor

**Purpose:** Tag input component for editing vocabulary terms.

**Props:**
```typescript
interface VocabularyEditorProps {
  vocabulary: string[];
  customVocabulary?: string[];
  isCustomAttribute?: boolean;
  onVocabularyChange?: (vocabulary: string[]) => void;
  onReset?: () => void;
  readOnly?: boolean;
  placeholder?: string;
}
```

**Usage:**
```typescript
<VocabularyEditor
  vocabulary={['credit score', 'FICO score', 'credit rating']}
  customVocabulary={['FICO score', 'credit rating']}
  onVocabularyChange={(vocab) => console.log('New vocab', vocab)}
  onReset={() => console.log('Reset to base')}
/>
```

**Features:**
- Tag-based input (like email chips)
- Visual distinction: base terms (gray) vs custom terms (blue)
- Add terms by typing + Enter
- Remove terms with × button or Backspace
- Reset button to clear custom vocabulary
- 🔁 indicator when custom vocabulary exists

---

### AttributeFormModal

**Purpose:** Modal form for adding or editing custom attributes.

**Props:**
```typescript
interface AttributeFormModalProps {
  attribute?: DataModelAttribute;  // Undefined for adding new
  onSave: (attribute: DataModelAttribute) => void;
  onCancel: () => void;
}
```

**Usage:**
```typescript
<AttributeFormModal
  attribute={editingAttribute}  // undefined for new, object for edit
  onSave={(attr) => console.log('Save', attr)}
  onCancel={() => console.log('Cancel')}
/>
```

**Features:**
- Add or edit mode
- Name field (disabled when editing)
- Type selector (string, number, boolean, date, time, list, object)
- Description textarea
- Vocabulary editor integration
- Validation (name required, must be valid identifier)
- Keyboard shortcuts (Escape to cancel, Cmd+Enter to save)

---

## Composition Pattern

These components follow the **composition pattern** rather than configuration:

**✅ GOOD - Composition:**
```typescript
<DataModelExtensionEditor automationId={id}>
  <BaseAttributeList attributes={...}>
    <AttributeRow>
      <VocabularyEditor />
    </AttributeRow>
  </BaseAttributeList>
  <CustomAttributeList attributes={...}>
    <AttributeRow>
      <VocabularyEditor />
    </AttributeRow>
  </CustomAttributeList>
</DataModelExtensionEditor>
```

**❌ AVOID - Configuration:**
```typescript
<DataModelExtensionEditor
  automationId={id}
  showBaseAttributes={true}
  showCustomAttributes={true}
  enableVocabularyEditing={true}
  enableAttributeHiding={true}
  // ... prop explosion
/>
```

**Why composition?**
- More flexible - each piece is independently usable
- Clearer - you see the structure in JSX
- Easier to extend - add new sub-components without changing parent
- Better TypeScript - each component has focused props

---

## Vocabulary Strategy: Additive (Merge)

**Critical:** Vocabulary customization is **additive**, not replacement.

```typescript
// Base model
{
  name: 'creditScore',
  vocabulary: ['credit score']
}

// Extension adds custom vocabulary
vocabularyOverrides: {
  'creditScore': ['FICO score', 'credit rating']
}

// Resolved model MERGES both
{
  name: 'creditScore',
  vocabulary: ['credit score', 'FICO score', 'credit rating']
}
// ALL THREE TERMS WORK
```

**Benefits:**
- Non-destructive - existing formulas/BAL don't break
- Gradual refinement - add terms over time
- User-friendly - more ways to reference the same attribute

---

## Visual Design

### Icons

- **🌍 Globe** - Global/base model attributes
- **🔧 Wrench** - Custom attributes
- **🔁 Recycle** - Vocabulary override indicator

### Color Coding

**Base Vocabulary Terms:**
- Gray background (`--background-subtle`)
- Gray border (`--border-subtle`)
- Cannot be removed (unless custom attribute)

**Custom Vocabulary Terms:**
- Blue background (`--interactive-primary-subtle`)
- Blue border (`--interactive-primary`)
- Bold text
- Removable with × button

### States

**Hidden Attributes:**
- 50% opacity
- Gray background
- Eye-off icon
- Still shown in list (not removed)

**Expanded Attributes:**
- Shows sub-attributes
- Shows vocabulary editor
- Chevron-down icon

---

## Integration with Hooks

These components integrate with the hook layer (Phase 2):

```typescript
import { useAutomationDataModel } from '../../hooks/useAutomationDataModel';

function DataModelEditorPanel({ automationId }) {
  const {
    resolvedModel,
    baseModel,
    extension,
    addAttribute,
    addVocabulary,
    hideAttribute
  } = useAutomationDataModel(automationId);
  
  return (
    <div>
      <BaseAttributeList
        attributes={baseModel?.attributes || []}
        vocabularyOverrides={resolvedModel?.vocabularyOverrides}
        hiddenAttributes={extension?.hiddenAttributes || []}
        onAddVocabulary={addVocabulary}
        onHideAttribute={hideAttribute}
      />
      
      <CustomAttributeList
        attributes={extension?.addedAttributes || []}
        onAddAttribute={addAttribute}
      />
    </div>
  );
}
```

---

## Styling

**CSS Modules + CSS Variables:**

All components use:
- **CSS Modules** for scoping (`.module.css`)
- **CSS Variables** for design tokens (from `/styles/globals.css`)
- **IBM Plex Sans** for all typography
- **Carbon Design System** patterns

**Example:**
```css
/* VocabularyEditor.module.css */
.tag {
  padding: var(--spacing-02);
  background: var(--background-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-sans);
  color: var(--text-primary);
}
```

**Never hardcode values:**
```css
/* ❌ WRONG */
.tag {
  padding: 8px;
  background: #f4f4f4;
  color: #161616;
}
```

---

## Examples

### Complete Integration Example

```typescript
import { useState } from 'react';
import { DataModelExtensionEditor } from './components/DataModelExtensionEditor';

function AutomationSettingsPanel({ automationId, onClose }) {
  return (
    <div className="panel">
      <DataModelExtensionEditor
        automationId={automationId}
        onSave={() => {
          console.log('Extension saved!');
          onClose();
        }}
        onCancel={onClose}
      />
    </div>
  );
}
```

### Standalone BaseAttributeList

```typescript
import { BaseAttributeList } from './components/DataModelExtensionEditor';
import { useAutomationDataModel } from './hooks/useAutomationDataModel';

function BaseAttributesView({ automationId }) {
  const {
    baseModel,
    resolvedModel,
    addVocabulary,
    resetVocabulary,
    hideAttribute,
    unhideAttribute
  } = useAutomationDataModel(automationId);
  
  if (!baseModel) return <div>No base model</div>;
  
  return (
    <BaseAttributeList
      attributes={baseModel.attributes}
      vocabularyOverrides={resolvedModel?.vocabularyOverrides}
      hiddenAttributes={[]}
      onAddVocabulary={addVocabulary}
      onResetVocabulary={resetVocabulary}
      onHideAttribute={hideAttribute}
      onUnhideAttribute={unhideAttribute}
    />
  );
}
```

### Standalone VocabularyEditor

```typescript
import { useState } from 'react';
import { VocabularyEditor } from './components/DataModelExtensionEditor';

function VocabularyEditorDemo() {
  const [vocab, setVocab] = useState(['credit score']);
  const customVocab = ['FICO score', 'credit rating'];
  
  return (
    <VocabularyEditor
      vocabulary={[...vocab, ...customVocab]}
      customVocabulary={customVocab}
      onVocabularyChange={setVocab}
      onReset={() => setVocab(['credit score'])}
    />
  );
}
```

---

## Testing

### Manual Testing Checklist

**Base Attributes:**
- [ ] Can add custom vocabulary to base attribute
- [ ] Can remove custom vocabulary
- [ ] Can reset to base vocabulary
- [ ] Can hide base attribute
- [ ] Can unhide base attribute
- [ ] Hidden attributes shown with reduced opacity
- [ ] Can expand/collapse nested attributes

**Custom Attributes:**
- [ ] Can add new custom attribute
- [ ] Can edit custom attribute
- [ ] Can delete custom attribute
- [ ] Can edit vocabulary on custom attribute
- [ ] Custom attributes show 🔧 icon
- [ ] Empty state shows CTA

**Vocabulary Editor:**
- [ ] Can add term by typing + Enter
- [ ] Can remove term with × button
- [ ] Can remove term with Backspace (when input empty)
- [ ] Base terms shown in gray
- [ ] Custom terms shown in blue
- [ ] Reset button appears when custom vocab exists
- [ ] Reset clears custom vocabulary

**Modal:**
- [ ] Can open add attribute modal
- [ ] Can save new attribute
- [ ] Can cancel without saving
- [ ] Can edit existing attribute
- [ ] Validation prevents invalid names
- [ ] Escape key closes modal
- [ ] Cmd+Enter saves

---

## Related Documentation

- Hook Layer: `/hooks/README.md`
- Service Layer: `/services/README.md`
- EPIC Plan: `/planning/epics/EPIC-DataModelHierarchyAndTestingEnhancements.md`
- Phase 1: `/change-log/25-11-14_v01-DataModelServiceLayer.md`
- Phase 2: `/change-log/25-11-14_v02-DataModelHookLayer.md`
- Phase 3: `/change-log/25-11-14_v03-DataModelExtensionUI.md` (this phase)

---

**Last Updated:** November 14, 2025  
**Phase:** Phase 3 - UI Components Complete
