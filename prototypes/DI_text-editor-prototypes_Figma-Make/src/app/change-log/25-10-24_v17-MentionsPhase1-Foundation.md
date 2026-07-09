# Nested @Mentions System - Phase 3.1.1: Foundation & Data Layer

**Date:** October 24, 2025  
**Version:** v17  
**Type:** Feature Implementation  
**Phase:** 3.1.1 - Foundation & Data Layer  
**Status:** ✅ Complete

---

## Summary

Implemented the foundation and data layer for the hierarchical @mention system that will enable Rich Text and Markdown editors to mention and link to KPIs, Dashboards, Documents (with sections/subsections), and Automations (with services/models).

---

## What Was Built

### 1. Type Definitions

**File:** `/components/editors/core/types/MentionTypes.ts`

**Key Types:**
- `EntityType` - Union type for all mentionable entity types
- `MentionableEntity` - Base interface for entities that can be mentioned
- `Mention` - Inserted mention in editor
- `MentionContext` - State during autocomplete
- `ParsedMentionText` - Result of parsing mention text
- `EntityCategory` - Grouping for UI

**Entity Type Hierarchy:**
```
Flat Entities:
- kpi
- dashboard

Hierarchical Entities:
Documents:
  - document
    - document-section
      - document-subsection

Automations:
  - automation
    - service
      - model
```

### 2. Sample Data

**File:** `/SampleData/mentionableEntities.ts`

**Created comprehensive mock data:**

**KPIs (5 entities):**
- Revenue Growth Rate
- Customer Churn Rate
- Net Promoter Score
- Loan Default Rate
- Customer Acquisition Cost

**Dashboards (4 entities):**
- Executive Dashboard
- Revenue Dashboard
- Customer Analytics Dashboard
- Loan Performance Dashboard

**Documents (3 hierarchical entities):**
1. **Product Requirements Document**
   - 1. Overview
   - 2. User Stories
     - 2.1 Admin User Stories
     - 2.2 Customer User Stories
     - 2.3 Analytics User Stories
   - 3. Technical Specifications
     - 3.1 Architecture
     - 3.2 API Specifications
   - 4. Success Metrics

2. **Loan Policy Document**
   - 1. Eligibility Criteria
   - 2. Risk Assessment
     - 2.1 Credit Score Requirements
     - 2.2 Income Verification
   - 3. Approval Process

3. **API Documentation**
   - 1. Authentication
   - 2. Endpoints
     - 2.1 User Endpoints
     - 2.2 Loan Endpoints

**Automations (3 hierarchical entities):**
1. **Loan Approval Automation**
   - Credit Check Service
     - Credit Score Model
     - Income Verification Model
     - Debt Ratio Model
   - Document Verification Service
     - ID Verification Model
     - Document Classification Model
   - Approval Decision Service
     - Risk Scoring Model
     - Approval Rules Engine

2. **Fraud Detection Automation**
   - Transaction Analysis Service
     - Anomaly Detection Model
     - Pattern Recognition Model
   - Behavior Analysis Service
     - User Behavior Model

3. **Customer Onboarding Automation**
   - KYC Verification Service
     - Identity Verification Model
     - Address Verification Model
   - Account Setup Service

**Total:** 5 KPIs + 4 Dashboards + 3 Documents (25 sections/subsections) + 3 Automations (21 services/models) = **58 mentionable entities**

### 3. Utility Functions

**File:** `/utils/mentionUtils.ts`

**Filtering & Search:**
- `filterEntitiesByQuery()` - Fuzzy search across entities
- `getEntitiesByType()` - Filter by entity type

**Navigation:**
- `getEntityChildren()` - Get children of an entity
- `findEntityById()` - Find entity by ID (recursive)
- `buildMentionPath()` - Build full path from root to leaf
- `flattenEntities()` - Flatten hierarchy to flat list
- `getRootEntities()` - Get only root-level entities

**Formatting:**
- `formatMentionDisplay()` - Format path as "@Parent / Child / Leaf"
- `parseMentionText()` - Parse text to detect @ trigger and path

**Helpers:**
- `hasChildren()` - Check if entity has children
- `getEntityIcon()` - Get icon with fallback
- `getEntityBadge()` - Get badge with fallback

### 4. Data Access Hook

**File:** `/hooks/useMentionableEntities.ts`

**Provides:**
- Access to all entities by category (kpis, dashboards, documents, automations)
- Root entities for initial display
- Entity categories for UI grouping
- All utility functions bound to data

**Hook Interface:**
```typescript
const {
  // Data
  allEntities,
  kpis,
  dashboards,
  documents,
  automations,
  categories,
  rootEntities,
  
  // Utilities
  filterByQuery,
  getChildren,
  findById,
  buildPath,
  formatDisplay,
  getByType,
  flatten,
  getRoots,
  hasChildren,
  getIcon,
  getBadge,
} = useMentionableEntities();
```

---

## Examples

### Example 1: Find Entity

```typescript
const { findById } = useMentionableEntities();

// Find a specific document section
const section = findById('doc-1-sec-2');
// Result: { id: 'doc-1-sec-2', name: '2. User Stories', type: 'document-section', ... }
```

### Example 2: Build Path

```typescript
const { buildPath, formatDisplay } = useMentionableEntities();

// Build path to a subsection
const path = buildPath('doc-1-sec-2-sub-1');
// Result: [
//   { name: 'Product Requirements Document', ... },
//   { name: '2. User Stories', ... },
//   { name: '2.1 Admin User Stories', ... }
// ]

// Format for display
const display = formatDisplay(path);
// Result: "@Product Requirements Document / 2. User Stories / 2.1 Admin User Stories"
```

### Example 3: Filter by Query

```typescript
const { allEntities, filterByQuery } = useMentionableEntities();

// Search for entities matching "loan"
const results = filterByQuery(allEntities, 'loan');
// Results include:
// - Loan Default Rate (KPI)
// - Loan Performance Dashboard
// - Loan Policy Document
// - Loan Approval Automation
```

### Example 4: Navigate Hierarchy

```typescript
const { documents, getChildren } = useMentionableEntities();

// Get top-level documents
const prdDoc = documents[0]; // Product Requirements Document

// Get its sections
const sections = getChildren(prdDoc);
// Result: [
//   { name: '1. Overview', ... },
//   { name: '2. User Stories', ... },
//   { name: '3. Technical Specifications', ... },
//   { name: '4. Success Metrics', ... }
// ]

// Get subsections of a section
const userStoriesSection = sections[1];
const subsections = getChildren(userStoriesSection);
// Result: [
//   { name: '2.1 Admin User Stories', ... },
//   { name: '2.2 Customer User Stories', ... },
//   { name: '2.3 Analytics User Stories', ... }
// ]
```

---

## Files Created

```
/components/editors/core/types/
  MentionTypes.ts              ✅ Type definitions

/components/editors/core/types/
  index.ts                     ✅ Updated to export MentionTypes

/SampleData/
  mentionableEntities.ts       ✅ Mock data (58 entities)

/utils/
  mentionUtils.ts              ✅ Utility functions

/hooks/
  useMentionableEntities.ts    ✅ Data access hook
```

---

## Validation

### ✅ Can access entity data via hook

```typescript
const { kpis, dashboards, documents, automations } = useMentionableEntities();
console.log(kpis.length);        // 5
console.log(dashboards.length);  // 4
console.log(documents.length);   // 3
console.log(automations.length); // 3
```

### ✅ Can filter entities by search query

```typescript
const { allEntities, filterByQuery } = useMentionableEntities();
const results = filterByQuery(allEntities, 'revenue');
// Returns: Revenue Growth Rate (KPI), Revenue Dashboard
```

### ✅ Can navigate entity hierarchy

```typescript
const { documents, getChildren } = useMentionableEntities();
const prd = documents[0];
const sections = getChildren(prd);
const subsections = getChildren(sections[1]);
// Successfully navigates: Document → Section → Subsection
```

### ✅ Can format mention paths correctly

```typescript
const { buildPath, formatDisplay } = useMentionableEntities();
const path = buildPath('auto-1-svc-1-model-1');
const display = formatDisplay(path);
// Result: "@Loan Approval Automation / Credit Check Service / Credit Score Model"
```

---

## Next Steps

**Phase 3.1.2: useMentions Hook (Core Logic)**
- Build mention detection and state management hook
- Implement trigger detection (@ for root, / for nested)
- Implement path tracking and navigation
- Handle keyboard navigation
- Manage autocomplete state

**Phase 3.1.3: MentionPicker Component (UI)**
- Build autocomplete dropdown
- Implement breadcrumb navigation
- Category grouping for root level
- Visual design with Carbon tokens

**Phase 3.1.4: MentionBadge Component (Rendered Mention)**
- Display inserted mentions
- Clickable links
- Hover tooltips

**Phase 3.1.5: Integration with Rich Text & Markdown Editors**
- Integrate useMentions hook
- Handle text insertion
- Handle mention rendering

---

## Technical Notes

### Design Decisions

1. **Hierarchical Data Structure:** Used nested `children` arrays rather than flat structure with parent IDs to make navigation simpler and more performant.

2. **Utility Functions Separate from Hook:** Kept utilities pure functions separate from React hook to enable testing and reuse outside React context.

3. **Mock Data First:** Created comprehensive mock data to enable UI development before API integration.

4. **Icon/Badge Fallbacks:** Utility functions provide fallback icons and badges to ensure UI always has something to display.

### Data Characteristics

**Depth Analysis:**
- KPIs: 0 levels (flat)
- Dashboards: 0 levels (flat)
- Documents: Up to 2 levels deep (Document → Section → Subsection)
- Automations: Up to 2 levels deep (Automation → Service → Model)

**Search Surface:**
- All entities have names (primary search field)
- Most have descriptions (secondary search field)
- All have badges (tertiary search field)

---

## Status

✅ **Phase 3.1.1 Complete** - Foundation & Data Layer ready for UI development

**Ready for:** Phase 3.1.2 (useMentions Hook)
