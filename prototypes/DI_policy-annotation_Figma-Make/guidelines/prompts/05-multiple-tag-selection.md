# Prompt 5: Multiple Tag Selection

Upgrade the tag system to support multiple tag selection per annotation.

## Requirements

1. **Multi-Select Functionality**:
   - Change tag selector to allow selecting MULTIPLE tags
   - Users can select tags from different categories
   - No limit on number of tags per annotation
   - Click a tag to toggle selection (select/deselect)

2. **Selected Tags Display**:
   - Show all selected tags as removable chips
   - Display chips in a horizontal flow that wraps
   - Each chip should have:
     - Tag name
     - Category color
     - Remove button (X icon)
   - Clicking the X on a chip removes that tag from selection

3. **Tag Chips in Annotation Cards**:
   - Display all assigned tags on each annotation card
   - Show tags as colored badges/chips
   - Wrap to multiple lines if needed
   - Maintain consistent chip styling with the selector

4. **Tag Filtering in Sidebar**:
   - Add tag filter in the PDF viewer area (NOT in the sidebar)
   - Display as a dropdown or button that shows available tag categories
   - Filter by tag category prefix (e.g., "Data model", "Business Objective")
   - Implementation:
     - Store filter as string: `const [tagFilter, setTagFilter] = useState<string | null>(null)`
     - Filter annotations with: `annotations.filter(a => a.tags.some(tag => tag.name.startsWith(tagFilter)))`
   - Clear filter option to show all annotations (set tagFilter to null)
   - Filter affects both sidebar display and PDF dimming overlay

5. **Visual Feedback**:
   - Selected tags in the selector should be visually distinct
   - Smooth animations when adding/removing tags
   - Clear indication of active filters

## UI/UX Details
- Intuitive multi-select interface
- Clear visual distinction between selected and unselected tags
- Removable chip pattern for selected tags
- Proper spacing when multiple tags are displayed
- Accessible keyboard navigation for tag selection
