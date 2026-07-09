# Nested @Mentions System Plan

**Date:** October 24, 2025  
**Version:** v13  
**Type:** Feature Plan  
**Phase:** 3.1 - Cross-Editor Features (Mentions System)  
**Status:** Planning

---

## Executive Summary

Design and implement a **hierarchical @mention system** for Rich Text and Markdown editors that allows users to mention and link to:
- Decision KPIs
- Dashboards
- Documents → Sections → Subsections (nested)
- Automations → Services → Models (nested)

**Key Innovation:** Nested navigation using `/` character to drill down into parent entities, with breadcrumb context and real-time filtering.

---

## Table of Contents

1. [User Requirements](#user-requirements)
2. [User Experience Flow](#user-experience-flow)
3. [Data Model](#data-model)
4. [Component Architecture](#component-architecture)
5. [Implementation Phases](#implementation-phases)
6. [Technical Specifications](#technical-specifications)
7. [Integration Points](#integration-points)
8. [Carbon Design Patterns](#carbon-design-patterns)

---

## User Requirements

### Mention Types

**Entity Types to Mention:**
1. **Decision KPIs** - Flat list (no nesting)
2. **Dashboards** - Flat list (no nesting)
3. **Documents** - Hierarchical (Document → Section → Subsection)
4. **Automations** - Hierarchical (Automation → Service → Model)

### Interaction Patterns

**@ Trigger (Root Level):**
```
User types: @
Result: Show all entity types + top-level entities
```

**/ Trigger (Nested Level):**
```
User types: @Revenue Dashboard/
Result: Show children of "Revenue Dashboard" (widgets, sections, etc.)

User types: @Loan Approval Automation/Credit Check Service/
Result: Show models under "Credit Check Service"
```

### Visual Requirements

**Context Breadcrumb:**
```
┌─────────────────────────────────────────────────┐
│ @Loan Approval Automation / Credit Check Service│
│ ────────────────────────────────────────────────│
│ ▸ Credit Score Model                            │
│ ▸ Income Verification Model                     │
│ ▸ Debt Ratio Model                              │
└─────────────────────────────────────────────────┘
```

**Entity Type Indicators:**
```
┌─────────────────────────────────────────────────┐
│ @ (Start typing to mention...)                  │
│ ────────────────────────────────────────────────│
│ 📊 Decision KPIs                                │
│ 📈 Dashboards                                   │
│ 📄 Documents                                    │
│ ⚙️  Automations                                 │
│ ────────────────────────────────────────────────│
│ 📊 Revenue Growth Rate                          │
│ 📊 Customer Churn Rate                          │
│ 📈 Executive Dashboard                          │
│ 📄 Product Requirements Document                │
│ ⚙️  Loan Approval Automation                    │
└─────────────────────────────────────────────────┘
```

**Search/Filter:**
```
User types: @loan
┌─────────────────────────────────────────────────┐
│ @loan                                           │
│ ────────────────────────────────────────────────│
│ ⚙️  Loan Approval Automation                    │
│ ⚙️  Loan Servicing Automation                   │
│ 📊 Loan Default Rate (KPI)                      │
│ 📄 Loan Policy Document                         │
└─────────────────────────────────────────────────┘
```

---

## User Experience Flow

### Flow 1: Simple Mention (Flat Entity)

```
1. User types: @
2. Autocomplete appears with all entity types and entities
3. User types: @revenue
4. List filters to: "Revenue Growth Rate" (KPI), "Revenue Dashboard"
5. User selects "Revenue Growth Rate"
6. Text updates to: "@Revenue Growth Rate" (with link styling)
7. Autocomplete closes
```

### Flow 2: Nested Mention (Document)

```
1. User types: @
2. Autocomplete appears
3. User types: @product
4. List filters to: "Product Requirements Document"
5. User selects "Product Requirements Document"
6. Text updates to: "@Product Requirements Document"
7. User continues typing: @Product Requirements Document/
8. Autocomplete appears showing document sections:
   - "1. Overview"
   - "2. User Stories"
   - "3. Technical Specs"
9. User selects "2. User Stories"
10. Text updates to: "@Product Requirements Document / User Stories"
11. User continues: @Product Requirements Document / User Stories/
12. Autocomplete shows subsections:
    - "2.1 Admin User Stories"
    - "2.2 Customer User Stories"
13. User selects "2.1 Admin User Stories"
14. Final text: "@Product Requirements Document / User Stories / Admin User Stories"
15. Autocomplete closes
```

### Flow 3: Nested Mention (Automation)

```
1. User types: @loan approval/
   (Note: "loan approval" matches "Loan Approval Automation")
2. Autocomplete shows services under that automation:
   - "Credit Check Service"
   - "Document Verification Service"
   - "Approval Decision Service"
3. User selects "Credit Check Service"
4. Text: "@Loan Approval Automation / Credit Check Service"
5. User types: @Loan Approval Automation / Credit Check Service/
6. Autocomplete shows models:
   - "Credit Score Model"
   - "Income Verification Model"
7. User selects "Credit Score Model"
8. Final: "@Loan Approval Automation / Credit Check Service / Credit Score Model"
```

### Flow 4: Backspace Editing

```
1. Current: "@Product Requirements Document / User Stories / Admin User Stories"
2. User backspaces to: "@Product Requirements Document / User Stories/"
3. Autocomplete reopens showing subsections
4. User can select different subsection or continue editing
```

### Flow 5: Search at Any Level

```
1. User types: @loan approval/credit
2. System:
   - Matches "Loan Approval Automation"
   - Shows filtered children matching "credit"
   - Result: "Credit Check Service" (highlighted match)
3. User can select filtered item directly
```

---

## Data Model

### Entity Type Definitions

```typescript
/**
 * Base entity that can be mentioned
 */
export interface MentionableEntity {
  id: string;
  name: string;
  type: EntityType;
  description?: string;
  icon?: string;
  
  // For hierarchical entities
  parentId?: string;
  children?: MentionableEntity[];
  
  // For linking
  url?: string;
  
  // For display
  badge?: string; // e.g., "KPI", "Dashboard", "Section", "Model"
}

/**
 * Entity types that can be mentioned
 */
export type EntityType = 
  | 'kpi'
  | 'dashboard'
  | 'document'
  | 'document-section'
  | 'document-subsection'
  | 'automation'
  | 'service'
  | 'model';

/**
 * Mention in editor (inserted value)
 */
export interface Mention {
  id: string;
  displayText: string;      // "@Product Req Doc / User Stories / Admin"
  path: MentionableEntity[]; // Array of entities from root to leaf
  entityId: string;          // ID of final entity
  entityType: EntityType;
}

/**
 * Mention context during autocomplete
 */
export interface MentionContext {
  trigger: '@';
  query: string;                  // User's typed text after @
  path: MentionableEntity[];      // Currently selected parent entities
  level: number;                  // 0 = root, 1 = first child, etc.
  isNested: boolean;              // True if user typed /
}
```

### Sample Data Structure

```typescript
// KPIs (flat)
const kpis: MentionableEntity[] = [
  {
    id: 'kpi-1',
    name: 'Revenue Growth Rate',
    type: 'kpi',
    description: 'Year-over-year revenue growth percentage',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/revenue-growth-rate'
  },
  {
    id: 'kpi-2',
    name: 'Customer Churn Rate',
    type: 'kpi',
    description: 'Percentage of customers lost per month',
    icon: '📊',
    badge: 'KPI',
    url: '/kpis/customer-churn-rate'
  }
];

// Documents (hierarchical)
const documents: MentionableEntity[] = [
  {
    id: 'doc-1',
    name: 'Product Requirements Document',
    type: 'document',
    icon: '📄',
    badge: 'Document',
    url: '/documents/product-requirements',
    children: [
      {
        id: 'doc-1-sec-1',
        name: '1. Overview',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#overview'
      },
      {
        id: 'doc-1-sec-2',
        name: '2. User Stories',
        type: 'document-section',
        parentId: 'doc-1',
        icon: '📑',
        badge: 'Section',
        url: '/documents/product-requirements#user-stories',
        children: [
          {
            id: 'doc-1-sec-2-sub-1',
            name: '2.1 Admin User Stories',
            type: 'document-subsection',
            parentId: 'doc-1-sec-2',
            icon: '📝',
            badge: 'Subsection',
            url: '/documents/product-requirements#admin-stories'
          },
          {
            id: 'doc-1-sec-2-sub-2',
            name: '2.2 Customer User Stories',
            type: 'document-subsection',
            parentId: 'doc-1-sec-2',
            icon: '📝',
            badge: 'Subsection',
            url: '/documents/product-requirements#customer-stories'
          }
        ]
      }
    ]
  }
];

// Automations (hierarchical)
const automations: MentionableEntity[] = [
  {
    id: 'auto-1',
    name: 'Loan Approval Automation',
    type: 'automation',
    icon: '⚙️',
    badge: 'Automation',
    url: '/automations/loan-approval',
    children: [
      {
        id: 'auto-1-svc-1',
        name: 'Credit Check Service',
        type: 'service',
        parentId: 'auto-1',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/loan-approval/credit-check',
        children: [
          {
            id: 'auto-1-svc-1-model-1',
            name: 'Credit Score Model',
            type: 'model',
            parentId: 'auto-1-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/credit-check/credit-score'
          },
          {
            id: 'auto-1-svc-1-model-2',
            name: 'Income Verification Model',
            type: 'model',
            parentId: 'auto-1-svc-1',
            icon: '🧠',
            badge: 'Model',
            url: '/automations/loan-approval/credit-check/income-verification'
          }
        ]
      },
      {
        id: 'auto-1-svc-2',
        name: 'Document Verification Service',
        type: 'service',
        parentId: 'auto-1',
        icon: '🔧',
        badge: 'Service',
        url: '/automations/loan-approval/document-verification'
      }
    ]
  }
];
```

---

## Component Architecture

### Component Hierarchy

```
useMentions (Hook)
  ├── Manages mention state
  ├── Detects @ and / triggers
  ├── Tracks navigation path
  ├── Provides suggestions at current level
  └── Handles mention insertion

MentionPicker (Component)
  ├── MentionPickerHeader
  │   ├── Breadcrumb (navigation path)
  │   └── Search input (if needed)
  ├── MentionPickerList
  │   ├── MentionCategoryGroup (if at root)
  │   │   └── MentionItem[]
  │   └── MentionItem[]
  └── MentionPickerFooter
      └── Help text / keyboard shortcuts

MentionBadge (Component - rendered mention)
  ├── Displays inserted mention
  ├── Clickable link
  ├── Hover tooltip with full path
  └── Visual distinction from regular text
```

### File Structure

```
/components/editors/
  shared/
    Mentions/
      useMentions.ts              # Core hook
      MentionPicker.tsx           # Main autocomplete component
      MentionPicker.module.css
      MentionBadge.tsx            # Rendered mention in text
      MentionBadge.module.css
      MentionItem.tsx             # Individual suggestion item
      MentionItem.module.css
      index.ts
      
  document/
    shared/
      hooks/
        useMentionIntegration.ts  # Integration with MD/RTE
        
/data/
  mentionableEntities.ts          # Sample data
  hooks/
    useMentionableEntities.ts     # Data access hook
```

---

## Implementation Phases

### Phase 3.1.1: Foundation & Data Layer

**Objective:** Set up data structures and core utilities

**Tasks:**
- [ ] Create `MentionableEntity` type definitions
- [ ] Create sample data for all entity types (KPIs, Dashboards, Documents, Automations)
- [ ] Create `useMentionableEntities` hook for data access
- [ ] Create utility functions:
  - `filterEntitiesByQuery(entities, query)` - Fuzzy search
  - `getEntityChildren(entityId)` - Get child entities
  - `buildMentionPath(entityId)` - Build full path from root to entity
  - `formatMentionDisplay(path)` - Format as "@Parent / Child / Leaf"

**Validation:**
- [ ] Can access entity data via hook
- [ ] Can filter entities by search query
- [ ] Can navigate entity hierarchy
- [ ] Can format mention paths correctly

**Deliverables:**
```
/components/editors/core/types/
  MentionTypes.ts

/SampleData/
  mentionableEntities.ts

/utils/
  mentionUtils.ts

/data/hooks/
  useMentionableEntities.ts
```

---

### Phase 3.1.2: useMentions Hook (Core Logic)

**Objective:** Build core mention detection and state management hook

**Hook Interface:**
```typescript
export function useMentions(
  textareaRef: RefObject<HTMLTextAreaElement>,
  onMentionInsert?: (mention: Mention) => void
) {
  return {
    // State
    showMentionPicker: boolean;
    currentContext: MentionContext | null;
    suggestions: MentionableEntity[];
    selectedIndex: number;
    
    // Navigation
    navigateInto: (entity: MentionableEntity) => void;
    navigateUp: () => void;
    navigateToRoot: () => void;
    
    // Selection
    selectSuggestion: (entity: MentionableEntity) => void;
    
    // Keyboard
    navigateDown: () => void;
    navigateUpList: () => void;
    
    // Actions
    closePicker: () => void;
  };
}
```

**Trigger Detection Logic:**

```typescript
// Detect @ trigger (root level)
const detectMentionTrigger = (text: string, cursorPos: number) => {
  // Look backwards from cursor
  // Find @ character that's:
  // 1. At start of line OR preceded by whitespace
  // 2. Followed by 0+ characters until cursor
  // 3. Not already a completed mention
  
  // Examples:
  // "Hello @john" -> trigger detected, query = "john"
  // "See @Product Req/" -> trigger detected, query = "Product Req/", nested = true
  // "Email is john@example.com" -> NO trigger (@ not at word boundary)
};

// Detect / trigger (nested level)
const detectNestedTrigger = (context: MentionContext, text: string) => {
  // After an entity name, detect / character
  // Examples:
  // "@Product Requirements Document/" -> show children
  // "@Loan Approval/Credit Check/" -> show models
};
```

**Path Tracking:**

```typescript
// Track user's navigation through hierarchy
const [currentPath, setCurrentPath] = useState<MentionableEntity[]>([]);

// User selects "Product Requirements Document"
setCurrentPath([documentEntity]);

// User types /
// System shows children of documentEntity

// User selects "User Stories" section
setCurrentPath([documentEntity, sectionEntity]);

// User types /
// System shows children of sectionEntity
```

**Tasks:**
- [ ] Implement trigger detection (@)
- [ ] Implement nested trigger detection (/)
- [ ] Implement path tracking and navigation
- [ ] Implement suggestion filtering at current level
- [ ] Implement keyboard navigation (up/down/enter/escape)
- [ ] Implement mention insertion
- [ ] Handle edge cases (backspace, editing existing mention)

**Validation:**
- [ ] @ trigger detects correctly
- [ ] / trigger detects correctly
- [ ] Suggestions filter based on query
- [ ] Can navigate into children with /
- [ ] Can navigate up hierarchy
- [ ] Keyboard navigation works
- [ ] Mention inserts correctly into text

---

### Phase 3.1.3: MentionPicker Component (UI)

**Objective:** Build visual autocomplete picker

**Component Structure:**

```tsx
export function MentionPicker({
  context,
  suggestions,
  selectedIndex,
  onSelect,
  onNavigateInto,
  onNavigateUp,
  onClose
}: MentionPickerProps) {
  return (
    <div className={styles.mentionPicker}>
      {/* Breadcrumb showing current path */}
      {context.path.length > 0 && (
        <div className={styles.breadcrumb}>
          <button onClick={onNavigateUp}>←</button>
          {context.path.map(entity => (
            <span key={entity.id}>
              {entity.icon} {entity.name} /
            </span>
          ))}
        </div>
      )}
      
      {/* Suggestions list */}
      <div className={styles.suggestionsList}>
        {/* Group by type at root level */}
        {context.level === 0 && (
          <>
            {renderCategoryGroup('kpi', '📊 Decision KPIs')}
            {renderCategoryGroup('dashboard', '📈 Dashboards')}
            {renderCategoryGroup('document', '📄 Documents')}
            {renderCategoryGroup('automation', '⚙️ Automations')}
          </>
        )}
        
        {/* Flat list at nested levels */}
        {context.level > 0 && (
          suggestions.map((entity, index) => (
            <MentionItem
              key={entity.id}
              entity={entity}
              isSelected={index === selectedIndex}
              onClick={() => onSelect(entity)}
              onNavigateInto={() => onNavigateInto(entity)}
            />
          ))
        )}
      </div>
      
      {/* Footer with help */}
      <div className={styles.footer}>
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>/ View children</span>
        <span>Esc Close</span>
      </div>
    </div>
  );
}
```

**Visual Design:**

```
┌──────────────────────────────────────────────────┐
│ ← @Loan Approval Automation / Credit Check Svc  │ ← Breadcrumb (if nested)
├──────────────────────────────────────────────────┤
│                                                  │
│ 🧠 Credit Score Model                  Model    │ ← Suggestion item
│ 🧠 Income Verification Model           Model    │ ← Selected (highlighted)
│ 🧠 Debt Ratio Model                    Model    │
│                                                  │
├──────────────────────────────────────────────────┤
│ ↑↓ Navigate  ↵ Select  / View children  Esc Close│ ← Footer
└──────────────────────────────────────────────────┘
```

**Carbon Design Integration:**
- Use Carbon color tokens (--background-hover, --text-primary, etc.)
- Follow Carbon Tag component styling for badges
- Use Carbon spacing scale
- Smooth transitions (240ms productive)

**Tasks:**
- [ ] Create MentionPicker component
- [ ] Create MentionItem component
- [ ] Implement breadcrumb navigation
- [ ] Implement category grouping (root level)
- [ ] Implement hover states
- [ ] Implement selected state
- [ ] Implement keyboard highlight following
- [ ] Add smooth animations

**Validation:**
- [ ] Picker renders at correct position
- [ ] Suggestions display correctly
- [ ] Category groups show at root level
- [ ] Breadcrumb shows navigation path
- [ ] Hover and selected states work
- [ ] Visual design matches Carbon patterns

---

### Phase 3.1.4: MentionBadge Component (Rendered Mention)

**Objective:** Display inserted mentions in editor

**Component:**

```tsx
export function MentionBadge({
  mention,
  onClick
}: MentionBadgeProps) {
  const displayText = formatMentionDisplay(mention.path);
  const fullPath = mention.path.map(e => e.name).join(' → ');
  
  return (
    <Tooltip content={fullPath}>
      <span 
        className={styles.mentionBadge}
        onClick={onClick}
        data-mention-id={mention.id}
      >
        {mention.path[0].icon} {displayText}
      </span>
    </Tooltip>
  );
}
```

**Visual Design:**

```
Regular text with @Product Req Doc / User Stories mention and more text.
                   └────────────────────────────┘
                            ↑
                   Styled as interactive link
                   Blue background, rounded
                   Icon at start
```

**Hover Tooltip:**
```
┌────────────────────────────────────────────┐
│ Product Requirements Document              │
│   → User Stories                           │
│     → Admin User Stories                   │
│                                            │
│ Click to view                              │
└────────────────────────────────────────────┘
```

**Tasks:**
- [ ] Create MentionBadge component
- [ ] Style as interactive element
- [ ] Add hover tooltip with full path
- [ ] Add click handler to navigate to entity
- [ ] Support inline display in editor

**Validation:**
- [ ] Badge renders inline
- [ ] Badge is visually distinct
- [ ] Tooltip shows full path
- [ ] Click handler works
- [ ] Works in both Markdown and Rich Text editors

---

### Phase 3.1.5: Markdown Editor Integration

**Objective:** Integrate mentions into Markdown editor

**Approach:**

```tsx
export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const mentions = useMentions(textareaRef, (mention) => {
    // Insert mention into markdown
    const mentionText = `@${mention.displayText}`;
    // ... insertion logic
    onChange(newValue);
  });
  
  return (
    <div className={styles.editor}>
      <textarea ref={textareaRef} value={value} onChange={handleChange} />
      
      {mentions.showMentionPicker && (
        <MentionPicker
          context={mentions.currentContext}
          suggestions={mentions.suggestions}
          selectedIndex={mentions.selectedIndex}
          onSelect={mentions.selectSuggestion}
          onNavigateInto={mentions.navigateInto}
          onNavigateUp={mentions.navigateUp}
          onClose={mentions.closePicker}
        />
      )}
    </div>
  );
}
```

**Markdown Syntax:**

```markdown
# User types in plain text:
The @Loan Approval Automation / Credit Check Service / Credit Score Model has been updated.

# Stored in markdown:
The [@Loan Approval Automation / Credit Check Service / Credit Score Model](mention://auto-1-svc-1-model-1) has been updated.

# Rendered as:
The @Loan Approval Automation / Credit Check Service / Credit Score Model has been updated.
     └────────────────────────────────────────────────────────────────────┘
                  (styled as mention badge, clickable)
```

**Tasks:**
- [ ] Integrate useMentions hook
- [ ] Handle mention insertion in markdown syntax
- [ ] Render mentions as MentionBadge in preview mode
- [ ] Support editing existing mentions
- [ ] Test with preview toggle

**Validation:**
- [ ] Can trigger @mentions in markdown editor
- [ ] Mentions insert correctly
- [ ] Preview mode renders badges correctly
- [ ] Can edit existing mentions
- [ ] Markdown syntax is valid

---

### Phase 3.1.6: Rich Text Editor Integration

**Objective:** Integrate mentions into Rich Text editor

**Approach:**

```tsx
export function RichTextEditor({ blocks, onChange }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const mentions = useMentions(textareaRef, (mention) => {
    // Insert mention into current block
    const updatedBlocks = insertMentionIntoBlocks(blocks, mention);
    onChange(updatedBlocks);
  });
  
  // ... render logic with mention badges inline
}
```

**Rich Text Data Structure:**

```typescript
// ContentBlock with mentions
interface ContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | ...;
  content: string | ContentNode[]; // Array for rich content
}

// ContentNode for inline elements
type ContentNode = 
  | { type: 'text'; content: string }
  | { type: 'mention'; mention: Mention };

// Example:
const block = {
  id: 'block-1',
  type: 'paragraph',
  content: [
    { type: 'text', content: 'The ' },
    { 
      type: 'mention', 
      mention: {
        id: 'mention-1',
        displayText: 'Loan Approval Automation / Credit Check',
        path: [automationEntity, serviceEntity],
        entityId: 'auto-1-svc-1',
        entityType: 'service'
      }
    },
    { type: 'text', content: ' has been updated.' }
  ]
};
```

**Tasks:**
- [ ] Extend ContentBlock to support inline mentions
- [ ] Integrate useMentions hook
- [ ] Handle mention insertion in rich text blocks
- [ ] Render mentions as MentionBadge components
- [ ] Support editing and deletion
- [ ] Test with formatting (bold, italic, etc.)

**Validation:**
- [ ] Can trigger @mentions in rich text editor
- [ ] Mentions insert correctly into blocks
- [ ] Mentions render as badges
- [ ] Can edit/delete mentions
- [ ] Mentions work with text formatting

---

### Phase 3.1.7: Polish & Edge Cases

**Objective:** Handle edge cases and polish UX

**Edge Cases to Handle:**

1. **Editing Existing Mentions:**
   - User backspaces into mention → reopen picker at that level
   - User deletes mention → remove cleanly

2. **Invalid Paths:**
   - User types `@NonExistentEntity/` → show "No entity found"
   - Graceful error handling

3. **Performance:**
   - Debounce search queries
   - Lazy load nested children
   - Virtualize long suggestion lists

4. **Accessibility:**
   - Screen reader announcements
   - Keyboard navigation only (no mouse required)
   - Focus management

5. **Multiple Mentions:**
   - Multiple @mentions in same paragraph
   - Mentions next to each other
   - Mentions at start/end of line

**Tasks:**
- [ ] Handle backspace into mention
- [ ] Handle mention deletion
- [ ] Add error states
- [ ] Optimize search performance
- [ ] Add accessibility features (ARIA labels, announcements)
- [ ] Test edge cases extensively
- [ ] Add keyboard shortcut guide

**Validation:**
- [ ] All edge cases handled gracefully
- [ ] Performance is smooth with large entity lists
- [ ] Fully keyboard accessible
- [ ] Screen reader friendly
- [ ] No crashes or errors

---

## Technical Specifications

### Trigger Detection Algorithm

```typescript
/**
 * Detect if cursor is in a mention context
 */
function detectMentionContext(
  text: string,
  cursorPos: number
): MentionContext | null {
  // 1. Find last @ before cursor that's at word boundary
  const beforeCursor = text.slice(0, cursorPos);
  const lastAtIndex = findLastAtSymbol(beforeCursor);
  
  if (lastAtIndex === -1) return null;
  
  // 2. Check if @ is at word boundary (start of line or after space)
  const beforeAt = text[lastAtIndex - 1];
  if (beforeAt && !/\s/.test(beforeAt)) return null;
  
  // 3. Extract query after @
  const query = beforeCursor.slice(lastAtIndex + 1);
  
  // 4. Parse query for nested path
  const segments = query.split('/').map(s => s.trim());
  
  // 5. Build path by matching segments to entities
  const path = buildPathFromSegments(segments.slice(0, -1));
  const currentQuery = segments[segments.length - 1];
  
  // 6. Determine if nested
  const isNested = query.includes('/');
  
  return {
    trigger: '@',
    query: currentQuery,
    path,
    level: path.length,
    isNested
  };
}
```

### Fuzzy Search Algorithm

```typescript
/**
 * Fuzzy match entities by name
 */
function fuzzyMatch(entity: MentionableEntity, query: string): boolean {
  if (!query) return true;
  
  const normalizedQuery = query.toLowerCase();
  const normalizedName = entity.name.toLowerCase();
  
  // Exact substring match
  if (normalizedName.includes(normalizedQuery)) return true;
  
  // Match on word boundaries
  const words = normalizedName.split(/\s+/);
  return words.some(word => word.startsWith(normalizedQuery));
}

/**
 * Score and sort entities by relevance
 */
function scoreAndSort(
  entities: MentionableEntity[],
  query: string
): MentionableEntity[] {
  return entities
    .filter(e => fuzzyMatch(e, query))
    .sort((a, b) => {
      // Exact matches first
      const aExact = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bExact = b.name.toLowerCase().startsWith(query.toLowerCase());
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then alphabetical
      return a.name.localeCompare(b.name);
    });
}
```

### Mention Insertion Algorithm

```typescript
/**
 * Insert mention into text at cursor position
 */
function insertMention(
  text: string,
  cursorPos: number,
  mention: Mention,
  context: MentionContext
): { newText: string; newCursorPos: number } {
  // 1. Find start of mention (@ character)
  const mentionStart = cursorPos - context.query.length - 1; // -1 for @
  
  // 2. Build mention text
  const mentionText = `@${mention.displayText}`;
  
  // 3. Replace text
  const before = text.slice(0, mentionStart);
  const after = text.slice(cursorPos);
  const newText = before + mentionText + after;
  
  // 4. Calculate new cursor position (after mention)
  const newCursorPos = mentionStart + mentionText.length;
  
  return { newText, newCursorPos };
}
```

---

## Integration Points

### With Existing Autocomplete Infrastructure

**Reuse from Formula Editor:**
- Trigger detection patterns
- Keyboard navigation logic
- Suggestion filtering
- Position calculation

**Differences:**
- Mentions use @ trigger (vs $ and #)
- Mentions support nested navigation (/)
- Mentions insert as rich elements (not just text)
- Mentions render as interactive badges

### With Document Editors

**Markdown Editor:**
- Plain text editing
- Markdown link syntax for storage
- Badge rendering in preview mode

**Rich Text Editor:**
- Structured content blocks
- Inline mention nodes
- Real-time badge rendering

---

## Carbon Design Patterns

### Components to Reference

**Carbon ComboBox:**
- Dropdown pattern for suggestions
- Keyboard navigation
- Search/filter behavior

**Carbon Tag:**
- Visual styling for mention badges
- Color and size variants

**Carbon Breadcrumb:**
- Navigation path display
- Hierarchy visualization

**Carbon Search:**
- Search input styling
- Clear button behavior

### Color Tokens

```css
/* Mention Picker */
.mentionPicker {
  background: var(--background-primary);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-lg);
}

/* Mention Item */
.mentionItem {
  background: transparent;
  color: var(--text-primary);
}

.mentionItem:hover {
  background: var(--background-hover);
}

.mentionItem.selected {
  background: var(--background-selected);
  border-left: 3px solid var(--border-interactive);
}

/* Mention Badge */
.mentionBadge {
  background: var(--background-interactive);
  color: var(--text-on-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-01) var(--spacing-02);
}

.mentionBadge:hover {
  background: var(--background-interactive-hover);
  box-shadow: var(--shadow-sm);
}
```

---

## Success Metrics

**Functionality:**
- [ ] Can mention all entity types
- [ ] Can navigate nested hierarchies up to 3 levels deep
- [ ] Fuzzy search finds relevant entities
- [ ] Keyboard navigation is smooth and intuitive
- [ ] Mentions render correctly in both editors

**User Experience:**
- [ ] Picker appears within 50ms of trigger
- [ ] Search filters within 100ms
- [ ] Smooth animations (240ms)
- [ ] No jank or lag
- [ ] Clear visual feedback at all stages

**Code Quality:**
- [ ] Reusable across Markdown and Rich Text editors
- [ ] Clean separation of concerns
- [ ] Well-documented with examples
- [ ] Type-safe with TypeScript
- [ ] Follows Guidelines.md patterns

**Accessibility:**
- [ ] Fully keyboard navigable
- [ ] Screen reader announces state changes
- [ ] ARIA labels on all interactive elements
- [ ] Focus management is correct

---

## Future Enhancements (Out of Scope)

1. **Mention Autocomplete in Search:**
   - When user searches, suggest relevant mentions
   - "Did you mean @Loan Approval Automation?"

2. **Mention Previews:**
   - Hover over mention → show inline preview of entity
   - Quick peek at KPI value, dashboard chart, etc.

3. **Mention Notifications:**
   - When entity is mentioned → notify relevant users
   - "You were mentioned in [document]"

4. **Smart Suggestions:**
   - Based on document context, suggest relevant entities
   - "Since you mentioned loans, did you mean @Loan Default Rate?"

5. **Mention Analytics:**
   - Track most mentioned entities
   - Show relationship graphs

6. **Bi-directional Linking:**
   - Entity pages show "Mentioned in" backlinks
   - Navigate from entity to all mentions

---

## Implementation Timeline

**Phase 3.1.1:** Foundation & Data Layer (1 session)  
**Phase 3.1.2:** useMentions Hook (2 sessions)  
**Phase 3.1.3:** MentionPicker Component (1-2 sessions)  
**Phase 3.1.4:** MentionBadge Component (1 session)  
**Phase 3.1.5:** Markdown Integration (1 session)  
**Phase 3.1.6:** Rich Text Integration (1-2 sessions)  
**Phase 3.1.7:** Polish & Edge Cases (1 session)  

**Total: 8-11 sessions**

---

## Related Documentation

- **Parent Plan:** `/change-log/25-10-24_v01-EditorArchitectureRefactor.md`
- **Guidelines:** `/guidelines/Guidelines.md`
- **Existing Autocomplete:** `/components/editors/core/hooks/useAutocompleteTriggers.ts`
- **Formula Editor Reference:** `/components/editors/code/FormulaEditor/`

---

## Open Questions

1. **Storage Format:**
   - How should mentions be stored in database?
   - Markdown links? JSON references? Custom format?

2. **Mention Validation:**
   - What happens if mentioned entity is deleted?
   - Show as broken link? Remove mention? Gray out?

3. **Permissions:**
   - Should users see entities they don't have access to in mentions?
   - Filter suggestions by user permissions?

4. **Multi-tenancy:**
   - Do mentions work across organizational boundaries?
   - Scope to current workspace?

5. **URL Structure:**
   - What URLs should mentions link to?
   - Deep linking to specific sections/subsections?

---

**Status:** 📝 Planning Complete - Ready for implementation discussion
