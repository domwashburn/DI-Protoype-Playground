# Prompt 9: Visual Dimming for Filtered Content

Implement a visual dimming effect that creates "spotlight" effects for filtered annotations.

## Requirements

1. **Dimming Overlay System**:
   - When tag filters are active, dim the entire PDF content
   - Create page-level overlay elements that dim non-matching content
   - Leave filtered (matching) annotations bright and visible
   - Use specific color: `rgba(255, 255, 255, 0.8)` for the dimming overlay (white with 80% opacity)
   - This creates a "washed out" effect while keeping text readable

2. **Spotlight Effect**:
   - Cut out "holes" or "windows" in the dimming overlay for matching annotations
   - Matching annotations should appear at full brightness
   - Create a spotlight effect that draws attention to relevant content
   - Smooth edges for the spotlight cutouts

3. **Filter Behavior**:
   - Apply dimming when one or more tag filters are selected
   - Remove dimming when filters are cleared
   - Update dimming in real-time as filters change
   - Smooth transition when applying/removing dimming

4. **Multiple Filtered Annotations**:
   - If multiple annotations match the filter on the same page:
     - Show multiple spotlight areas
     - Each matching annotation gets its own bright area
   - Handle overlapping spotlight areas gracefully

5. **Interaction with Dimmed Content**:
   - Dimmed areas should still be readable (not completely black)
   - Users can still scroll through dimmed pages
   - Page numbers remain visible
   - Only annotations are spotlighted (not entire paragraphs unless needed)

## Technical Implementation
- Use CSS overlays with clip-path or mask for spotlight cutouts
- Calculate highlight positions dynamically
- Apply overlays at the page level
- Use smooth CSS transitions for dimming effects
- Layer management: dimming overlay should be below highlights but above base content

## UI/UX Details
- Subtle but effective dimming
- Clear visual focus on filtered annotations
- Smooth animations (300-400ms transitions)
- Maintain accessibility (dimmed content still readable)
- Performance optimization for multiple spotlights
