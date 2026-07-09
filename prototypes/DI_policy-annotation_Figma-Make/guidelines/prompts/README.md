# PDF Annotation Interface - Build Prompts

This directory contains a series of incremental prompts to build a complete PDF annotation interface from scratch.

## 📖 Start Here

1. **Read [00-quick-reference.md](00-quick-reference.md) first** - Visual layout guide and key decisions
2. **Review [11-implementation-notes.md](11-implementation-notes.md)** - Technical details and code patterns
3. **Check [12-sample-data.md](12-sample-data.md)** - Sample annotations and PDF content
4. **Follow prompts 01-10 in sequence** - Step-by-step feature implementation

## Overview

These prompts are designed to be used sequentially in Figma Make (or similar tools) to recreate a full-featured PDF annotation application with advanced features like overlapping highlights, hierarchical tags, keyboard navigation, and smart auto-scroll behavior.

## Prompt Sequence

Follow these prompts in order for best results:

1. **01-initial-setup.md** - Basic PDF viewer with mock implementation and page navigation
2. **02-text-selection-highlights.md** - Text selection and basic highlighting functionality
3. **03-annotation-sidebar.md** - Annotation management sidebar with search and navigation
4. **04-hierarchical-tag-system.md** - Two-level tag hierarchy with colored categories
5. **05-multiple-tag-selection.md** - Multi-tag selection and filtering
6. **06-keyboard-navigation.md** - Global Tab/Shift+Tab navigation through annotations
7. **07-edit-mode-toggle.md** - View/Edit mode toggle switch
8. **08-overlapping-highlights.md** - Character-level highlighting with overlap support
9. **09-visual-dimming-filter.md** - Spotlight dimming effect for filtered content
10. **10-smart-auto-scroll.md** - Intelligent auto-scroll based on selection source
11. **11-implementation-notes.md** - Technical reference (use throughout for specific details)

## Key Features

By the end of these prompts, you'll have built:

- ✅ Mock PDF viewer (no react-pdf dependency issues)
- ✅ Text selection and highlighting
- ✅ Annotation creation with notes
- ✅ Hierarchical tag system (Business Objective / KPI)
- ✅ Multiple tags per annotation
- ✅ Comprehensive keyboard navigation
- ✅ Tag-based filtering
- ✅ Edit/View mode toggle
- ✅ Overlapping highlight support
- ✅ Visual dimming for filtered content
- ✅ Smart auto-scroll behavior
- ✅ WCAG accessible color contrast
- ✅ Responsive design

## Technical Stack

- React with TypeScript
- Tailwind CSS for styling
- ShadCN UI components
- Lucide React icons
- No external PDF libraries (mock implementation)

## Notes

- Each prompt builds on the previous ones
- Some prompts may reference features from earlier steps
- Feel free to adapt the prompts based on your specific needs
- The mock PDF implementation avoids CSS import issues from react-pdf
- All styling follows WCAG accessibility guidelines

## Usage Tips

1. **Read 11-implementation-notes.md first** - It contains critical technical details referenced throughout
2. Copy each prompt in sequence (1-10)
3. Let the AI complete each step fully before moving to the next
4. Refer to implementation notes for specific code patterns and data structures
5. Test functionality after each major feature addition
6. All layout specifications use Tailwind CSS classes - follow them exactly for consistent styling
7. The final result should be a production-ready annotation interface

## Additional Resources

- **00-quick-reference.md** - Quick reference guide with:
  - Visual layout diagrams
  - Color palette and measurements
  - Component hierarchy
  - State management flow
  - Interaction patterns
  - Z-index layers
  - Testing checklist

- **11-implementation-notes.md** - Technical implementation guide with:
  - Complete TypeScript interfaces
  - State management patterns
  - Component props reference
  - Key implementation patterns (sorting, filtering, accessibility)
  - CSS customizations
  - Performance tips
  - Common pitfalls to avoid

- **12-sample-data.md** - Testing data with:
  - Mock PDF content (5 pages about loan policies)
  - 16 sample annotations with diverse tag combinations
  - Testing scenarios (overlapping, filtering, navigation)
  - Page preview text for thumbnails
  - Notes on position coordinates

---

Created for Figma Make - Web Application Builder
