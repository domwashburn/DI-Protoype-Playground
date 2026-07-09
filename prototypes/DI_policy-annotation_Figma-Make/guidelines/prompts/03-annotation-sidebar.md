# Prompt 3: Annotation Sidebar with Management Features

Build out the sidebar to display and manage annotations.

## Requirements

1. **Annotations List**:
   - Display all annotations in the sidebar as cards
   - Each card should show:
     - **Annotation number** (e.g., "Annotation #1") based on position in the original annotations array
     - Page number indicator (e.g., "Page 2")
     - Preview of highlighted text (truncated if long, use line-clamp)
     - Optional user note/comment
     - Tags as colored badges
   - Sort by annotation number (position in original array), NOT by page/position
   - This numbering persists through filtering and searching

2. **Add Notes to Annotations**:
   - Add a text input/textarea field in the annotation creation flow
   - Allow users to add optional notes when creating a highlight
   - Display notes in the annotation cards
   - Support editing notes (click to edit existing notes)

3. **Annotation Actions**:
   - Delete button for each annotation
   - Confirmation before deletion (use alert dialog)
   - Edit functionality to update notes

4. **Navigation from Sidebar**:
   - Clicking an annotation card should:
     - Navigate to the correct page
     - Scroll to the annotation
     - Highlight or pulse the annotation briefly for visual feedback

5. **Search Functionality**:
   - Add a search input at the top of the sidebar
   - Filter annotations by:
     - Highlighted text content
     - User notes
   - Update the list in real-time as user types
   - Show "No annotations found" message when search returns no results

## UI/UX Details
- Use Card component from ShadCN for each annotation
- Icons: Edit3 (edit button), Trash2 (delete button), MessageSquare (comment icon), BookOpen (text icon)
- Search icon: Search from lucide-react
- Use ScrollArea from ShadCN for the annotations list
- Clear visual hierarchy with proper spacing
- Smooth scrolling when navigating to annotations (use scrollIntoView with behavior: 'smooth')
- Accessible buttons with proper labels
- Empty state when no annotations exist ("No annotations yet")
- Separator between search and annotations list
