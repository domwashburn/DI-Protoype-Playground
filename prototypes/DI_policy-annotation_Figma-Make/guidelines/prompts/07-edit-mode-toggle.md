# Prompt 7: Edit Mode Toggle

Add a view/edit mode toggle to the interface.

## Requirements

1. **Toggle Switch in Top Bar**:
   - Add a toggle switch component to the top navigation bar
   - Label: "Edit Mode" (text-sm, cursor-pointer)
   - Default state: OFF (view mode, editing disabled)
   - State variable: `isViewMode` (defaults to true)
   - Position: Top right area, before the "Show Pages" and "Show Annotations" buttons
   - Layout: `flex items-center gap-2`
   - Use Switch component from ShadCN UI
   - Implementation:
     ```tsx
     <Switch
       checked={!isViewMode}
       onCheckedChange={(checked) => setIsViewMode(!checked)}
       id="edit-mode-toggle"
     />
     <label htmlFor="edit-mode-toggle" className="text-sm cursor-pointer">
       Edit Mode
     </label>
     ```

2. **Edit Mode OFF (View Only - isViewMode = true)**:
   - Disable text selection in the PDF (use CSS: `user-select: none`)
   - Hide the "Create Annotation" popover/button
   - Prevent creating new annotations
   - Allow viewing existing highlights
   - Allow clicking highlights to select and view in sidebar
   - Allow keyboard navigation (Tab/Shift+Tab)
   - Allow tag filtering
   - Sidebar shows annotations but hides Edit and Delete buttons
   - Sidebar cards are read-only (cannot edit comments)

3. **Edit Mode ON**:
   - Enable text selection in the PDF
   - Show "Create Annotation" button when text is selected
   - Allow creating new annotations
   - Allow editing annotation notes
   - Allow deleting annotations
   - Allow changing tags on existing annotations
   - Full editing capabilities

4. **Visual Indicators**:
   - Toggle switch should clearly show ON/OFF state
   - Different cursor style when hovering over PDF text:
     - Edit mode ON: text cursor
     - Edit mode OFF: default cursor
   - Optional: Show a subtle indicator in the UI about current mode

5. **State Persistence**:
   - Remember the toggle state during the session
   - Can default to either mode (suggest OFF for view-only default)

## UI/UX Details
- Smooth toggle animation
- Clear labeling
- Consistent behavior across all components
- Accessible toggle with proper ARIA attributes
- Visual feedback when attempting disabled actions
