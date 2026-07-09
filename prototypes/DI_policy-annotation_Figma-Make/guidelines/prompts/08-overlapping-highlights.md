# Prompt 8: Overlapping Highlights Support

Implement support for multiple annotations covering the same text areas with proper visual layering.

## Background
Replace the previous segment-based approach with a character-level overlay system that allows highlights to overlap naturally.

## Requirements

1. **Character-Level Highlighting**:
   - Split text content into individual characters or small units
   - Each character can be covered by multiple annotations
   - Track which annotations cover which character positions

2. **Visual Layering**:
   - When multiple highlights overlap:
     - Show all highlight colors with partial transparency
     - Layer highlights using z-index
     - More recent or selected highlights appear on top
   - Use semi-transparent background colors (rgba with alpha ~0.3-0.4)

3. **Interaction with Overlapping Highlights**:
   - Clicking an overlapping area should:
     - Select the topmost annotation
     - Or show a menu/tooltip to choose which annotation to select
   - Allow cycling through overlapping annotations (click multiple times)

4. **Visual Differentiation**:
   - Use different opacity levels or borders to distinguish overlapping highlights
   - Selected annotation should be more prominent (darker or outlined)
   - Unselected overlapping highlights should be more subtle

5. **Performance Optimization**:
   - Efficient rendering of character-level overlays
   - Avoid excessive DOM elements
   - Smooth performance even with many overlapping highlights

## Technical Implementation
- **Character-level approach**: Wrap each character or word in the PDF content with a span
- Each span can have multiple highlight layers applied
- Store positions as relative coordinates (x, y, width, height from 0.0 to 1.0)
- Render highlights as absolutely positioned divs with:
  - Position calculated from relative coordinates × container dimensions
  - Semi-transparent background colors (rgba with alpha ~0.3-0.4)
  - CSS class: `.inline-highlight` with transition effects
  - Hover effect: `filter: brightness(0.9)`
- Selected highlight gets additional class: `.selected`
  - Adds outline: `2px solid #3B82F6` with `outline-offset: 1px`
- Z-index management:
  - Base highlights: z-10
  - Selected highlight: z-20
  - Annotation form popover: z-30+
- Handle multiple positions per annotation (for multi-line selections)
- Click handler on highlights to select them

## UI/UX Details
- Smooth visual experience with overlapping highlights
- Clear indication of which highlight is selected
- Intuitive interaction model
- Maintain readability of underlying text
- Accessible color combinations even when overlapping
