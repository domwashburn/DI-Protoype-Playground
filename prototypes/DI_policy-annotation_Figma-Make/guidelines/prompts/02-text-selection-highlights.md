# Prompt 2: Text Selection and Basic Highlighting

Add text selection and highlighting functionality to the PDF viewer.

## Requirements

1. **Text Selection**:
   - Allow users to select text within PDF pages using mouse
   - Highlight selected text with a temporary blue selection color
   - Track the selected text, page number, and position

2. **Create Annotation Button**:
   - Show a "Highlight" or "Create Annotation" button when text is selected
   - Position the button near the selection (floating above or to the side)
   - Button should be visually distinct and easy to click

3. **Basic Highlighting**:
   - When users click the create annotation button, save the highlight
   - Highlighted text should appear with a yellow background
   - Store annotations in state with:
     - Unique ID
     - Page number
     - Selected text content
     - Position information
     - Timestamp

4. **Highlight Display**:
   - Show all saved highlights persistently on the PDF
   - Highlights should remain visible when navigating between pages
   - Each page should only show its own highlights

## Technical Implementation
- Use `window.getSelection()` API for text selection
- Store annotations in React state with this structure:
  ```typescript
  interface Annotation {
    id: string;
    pageNumber: number;
    text: string;
    comment: string;
    tags: Tag[];
    positions: Array<{
      x: number;      // Relative position (0-1)
      y: number;      // Relative position (0-1)
      width: number;  // Relative width (0-1)
      height: number; // Relative height (0-1)
    }>;
    createdAt: Date;
  }
  ```
- Use Popover component from ShadCN for the annotation creation form
- Positions should be relative (0.0 to 1.0) to support different zoom levels
- Include proper z-index management for highlight layers
- Use `crypto.randomUUID()` for generating unique annotation IDs
