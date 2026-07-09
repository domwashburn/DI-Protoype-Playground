# Prompt 1: Initial PDF Viewer Setup

Create a PDF annotation interface with the following specifications:

## Core Requirements

1. **PDF Viewer Component**: Create a mock PDF viewer since react-pdf has CSS import issues. The mock should:
   - Display exactly 5 pages about "Basic Loan Approval Policy" with structured content
   - Page 1: "BASIC LOAN APPROVAL POLICY / United States Regulations / 1. OVERVIEW..."
   - Page 2: "2. BORROWER ELIGIBILITY CRITERIA / 2.1 MINIMUM REQUIREMENTS..."
   - Page 3: "3. LOAN AMOUNT AND TERMS / 3.1 LOAN AMOUNT LIMITS..."
   - Page 4: "4. APPROVAL PROCESS / 4.1 APPLICATION PROCESS..."
   - Page 5: "5. RISK MANAGEMENT / 5.1 RISK ASSESSMENT..."
   - Use realistic paragraphs with proper line height and spacing
   - Each page should have white background with shadow

2. **Three-Panel Layout**: 
   - **Left Panel**: Page selector/thumbnails (width: w-48, initially visible)
   - **Center Panel**: PDF viewer (flex-1, takes remaining space)
   - **Right Panel**: Annotations sidebar (collapsible, initially visible)
   - Overall layout: `flex flex-col h-screen bg-gray-100`

3. **Top Navigation Bar**:
   - Left side: FileText icon (lucide-react) + "PDF Annotation Tool" heading
   - Right side buttons (in order):
     - "Show/Hide Pages" toggle button with Layers icon
     - "Show/Hide Annotations" toggle button with PanelRight icon
   - Header styling: `bg-white border-b border-gray-200 px-4 py-3`

4. **Page Selector Component** (Left Panel):
   - Width: w-48
   - Background: bg-gray-50 with border-r border-gray-200
   - Header section:
     - Padding: p-3
     - Background: bg-white
     - Border: border-b border-gray-200
     - Title: "Pages" (text-sm font-medium text-gray-900)
     - Subtitle: "{numPages} total" (text-xs text-gray-500)
   - Scrollable area with mini page thumbnails (p-2 space-y-2)
   - Each thumbnail:
     - Container: relative cursor-pointer rounded-lg border-2
     - Aspect ratio container: [3/4] with p-2
     - Shows mini preview of page content:
       - Mini header with FileText icon (w-2 h-2) and "Loan Policy" text (text-[6px])
       - Content area with text-[6px] line-clamp-6
     - Page number badge: Absolute positioned bottom-1, inline-block with px-1.5 py-0.5
     - Current page: border-blue-500 bg-blue-50 shadow-md, badge is bg-blue-600 text-white
     - Non-current: border-gray-200 hover:border-gray-300, badge is bg-gray-600 text-white
   - Annotation count badge: Absolute top-1 right-1, bg-orange-500, circular (w-4 h-4)

5. **PDF Content Area**:
   - Background: bg-gray-100 or similar neutral color
   - Scrollable area showing pages vertically
   - Each page styled as a white card with shadow
   - Proper page spacing and padding

6. **Welcome Modal**:
   - Show when no annotations exist (controlled by `showWelcome` state)
   - Contains:
     - Sidebar icon (lucide-react) with size w-12 h-12, text-blue-600
     - h3: "Get Started with PDF Annotations"
     - Instructions paragraph (text-sm, text-gray-600):
       - "1. Select text in the PDF document"
       - "2. Add a comment and choose a tag category"
       - "3. View and manage your annotations in the sidebar"
       - "4. Click on annotations to navigate and edit them"
     - Button: "Got it!" that dismisses the modal
   - Styling: white rounded-lg shadow-lg p-6 max-w-md, centered
   - Backdrop: absolute inset-0 with pointer-events-none
   - Modal itself: pointer-events-auto

## Technical Notes
- Do NOT use react-pdf library (causes CSS import errors)
- Create components: `/App.tsx`, `/components/PDFViewer.tsx`, `/components/PageSelector.tsx`
- Use ShadCN components: Button, ScrollArea
- Use Lucide icons: FileText, Layers, PanelRight, Sidebar
- Main container: `h-screen flex flex-col`
- Content area: `flex-1 flex overflow-hidden`
