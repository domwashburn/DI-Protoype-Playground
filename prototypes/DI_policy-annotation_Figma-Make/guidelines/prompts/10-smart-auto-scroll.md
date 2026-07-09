# Prompt 10: Smart Auto-Scroll Behavior

Implement intelligent auto-scroll that differentiates between selection sources to prevent unnecessary scrolling.

## Requirements

1. **Selection Source Tracking**:
   - Track HOW an annotation was selected:
     - `'sidebar'`: User clicked an annotation card in the sidebar
     - `'pdf'`: User clicked a highlight in the PDF
     - `'keyboard'`: User used Tab/Shift+Tab navigation
     - `'filter'`: Auto-selected when applying a filter
   - Store the selection source in state: `const [selectionSource, setSelectionSource] = useState<'pdf' | 'sidebar' | 'filter' | 'keyboard' | undefined>()`
   - Always update both `selectedAnnotationId` and `selectionSource` together

2. **Scroll Behavior by Source**:
   
   **Sidebar Click** (sidebar-click):
   - Do NOT auto-scroll the PDF viewer
   - Only highlight the annotation in the PDF
   - Reason: User already sees the card; scrolling is disorienting
   
   **PDF Click** (pdf-click):
   - Do NOT auto-scroll the PDF viewer (already visible where they clicked)
   - DO auto-scroll the sidebar to show the annotation card
   - Highlight the card in the sidebar
   
   **Keyboard Navigation** (keyboard):
   - DO auto-scroll both PDF and sidebar
   - Navigate to the annotation's page if needed
   - Scroll PDF to show the highlight
   - Scroll sidebar to show the card
   
   **Filter Selection** (filter):
   - Navigate to the first matching annotation (unless current selection already matches)
   - DO auto-scroll both PDF and sidebar to the first match
   - If currently selected annotation matches the new filter, stay in place (no scroll)

3. **Implementation Details**:
   - Pass selection source through props/state updates
   - In AnnotationSidebar:
     - Check `selectionSource !== 'sidebar'` before scrolling to selected card
     - Use refs to store annotation card elements: `annotationRefs.current[annotationId]`
     - Scroll with: `selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' })`
   - In PDFViewer:
     - Check `selectionSource !== 'pdf'` before scrolling to selected highlight
     - Use similar scrollIntoView approach
   - Click handlers should pass the source parameter:
     - `onAnnotationClick(id, 'sidebar')` from sidebar
     - `onAnnotationClick(id, 'pdf')` from PDF viewer
     - `handleAnnotationClick(nextAnnotation.id, 'keyboard')` from Tab handler

4. **State Management**:
   - Update `selectedAnnotationId` and `selectionSource` together
   - Components check `selectionSource` before scrolling
   - Reset or update source appropriately on each selection change

5. **Visual Feedback**:
   - Maintain existing pulse animations for highlights
   - Maintain existing card highlighting in sidebar
   - Smooth scroll animations where applicable
   - No jarring jumps or unexpected scrolling

## Technical Implementation
- Add `selectionSource` to App.tsx state
- Pass down to PDFViewer and AnnotationSidebar components
- Implement conditional scroll logic in useEffect hooks
- Update all click handlers and keyboard handlers to set proper source
- Update filter logic to handle auto-selection with appropriate source

## UI/UX Details
- Natural, intuitive scrolling behavior
- Prevent disorienting automatic scrolls
- Maintain user's viewport when appropriate
- Smooth animations for intentional scrolls
- Consistent behavior across all interaction patterns
