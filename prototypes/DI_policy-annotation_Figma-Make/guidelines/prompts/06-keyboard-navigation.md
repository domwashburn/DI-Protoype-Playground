# Prompt 6: Global Keyboard Navigation

Implement comprehensive keyboard navigation for cycling through annotations.

## Requirements

1. **Tab/Shift+Tab Navigation**:
   - Tab key: Navigate to next annotation
   - Shift+Tab: Navigate to previous annotation
   - **Navigation order changes based on context:**
     - **When tag filter is active**: Cycle by visual position (page number, then Y coordinate, then X coordinate)
     - **When no filter is active**: Cycle by annotation number (original array order)
   - Work globally (anywhere in the app)
   - Prevent default browser Tab behavior with `e.preventDefault()`

2. **Navigation Behavior**:
   - When an annotation is selected via keyboard:
     - Navigate to the correct page if needed
     - Scroll the PDF viewer to show the annotation
     - Scroll the sidebar to show the annotation card
     - Highlight the selected annotation card in the sidebar
     - Add visual feedback on the PDF highlight (pulse animation)

3. **Filtered Navigation**:
   - When tag filters are active:
     - Tab/Shift+Tab should only cycle through filtered annotations
     - Skip annotations that don't match the filter
     - Maintain the same visual feedback
   - When no filters are active:
     - Cycle through all annotations

4. **Visual Selection State**:
   - Clearly indicate which annotation is currently selected
   - Selected annotation card in sidebar should have distinct styling (border, background color, etc.)
   - PDF highlight for selected annotation should stand out
   - Use subtle pulse or glow animation for emphasis

5. **Edge Cases**:
   - Handle wrapping (last annotation → first annotation with Tab)
   - Handle no annotations state gracefully
   - Handle single annotation (Tab does nothing)
   - Prevent default browser Tab behavior in PDF area

## UI/UX Details
- Smooth scrolling animations using `scrollIntoView({ behavior: 'smooth', block: 'center' })`
- Selected annotation has distinct styling:
  - Sidebar card: border highlight, potentially different background
  - PDF highlight: outline with 2px solid #3B82F6
- Add CSS animation for pulse effect:
  ```css
  @keyframes selectedAnnotationPulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    50% { transform: scale(1.01); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
  }
  ```
- Apply animation class `.annotation-selected` with duration 0.6s
- Performance optimization (use useCallback and proper dependencies)
- Visual position sorting: Consider annotations on same line if Y positions are within 0.02 units
