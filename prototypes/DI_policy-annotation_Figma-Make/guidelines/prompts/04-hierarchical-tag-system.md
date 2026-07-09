# Prompt 4: Hierarchical Tag System

Implement a hierarchical tag system similar to the Things app, with nested tag categories.

## Tag Structure

Create a two-level hierarchy with the following categories:

### Data model (Blue color scheme)
- Parent color: #3B82F6
- Child color: #60A5FA
- Children:
  - attribute
  - inputs
  - Vocabulary
  - output

### Decision Logic (Purple color scheme)
- Parent color: #8B5CF6
- Child color: #A78BFA
- Children:
  - rules
  - validation

### Business Objective (Green color scheme)
- Parent color: #10B981
- Child color: #34D399
- Children:
  - strategic goals
  - compliance
  - risk management
  - customer service

### KPI (Amber/Yellow color scheme)
- Parent color: #F59E0B
- Child color: #FBBF24
- Children:
  - financial metrics
  - operational metrics
  - risk metrics
  - quality metrics

## Requirements

1. **Tag Data Structure**:
   - Define tags with: id, name, color, category, fullName (e.g., "Data model/attribute")
   - Include isParent and isChild flags
   - Use exact color hex values as specified above
   - Use proper TypeScript interface: `Tag { id: string; name: string; color: string; }`

2. **Tag Selector Component**:
   - Create a reusable TagSelector component
   - Display tags grouped by category
   - Use collapsible sections for each category (accordion style from ShadCN)
   - Show category names with their parent colors
   - Display child tags with their respective colors
   - Format displayed names as "Parent/child" (e.g., "Data model/attribute")

3. **Tag Selection**:
   - Allow selecting ONE tag when creating an annotation
   - Highlight the selected tag visually
   - Show the selected tag in the annotation creation popover/dialog
   - Use ShadCN Badge component for tag display

4. **Display Tags on Annotations**:
   - Show the selected tag on annotation cards in the sidebar
   - Display tag as a colored badge using the Badge component
   - Tag should show the full name (e.g., "Data model/attribute")
   - Use the child color for the background
   - Calculate proper text color for accessibility (white or black based on background luminance)

5. **Tag Colors & Accessibility**:
   - Exact parent colors: Data model (#3B82F6), Decision Logic (#8B5CF6), Business Objective (#10B981), KPI (#F59E0B)
   - Exact child colors: Use lighter versions as specified
   - Ensure WCAG AA contrast ratio (4.5:1 minimum for normal text)
   - Implement a helper function to determine text color based on background luminance
   - Use white text on darker backgrounds, dark text on lighter backgrounds

## UI/UX Details
- Clean, organized tag selector interface
- Visual feedback when hovering over tags
- Clear indication of selected tag
- Proper spacing and grouping
- Accessible color contrast ratios (WCAG AA minimum)
