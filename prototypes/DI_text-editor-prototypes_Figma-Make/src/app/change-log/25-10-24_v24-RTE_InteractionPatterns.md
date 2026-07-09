# RTE Interaction Patterns Overhaul

**Date:** October 24, 2025  
**Version:** v24  
**Type:** Feature Enhancement  
**Status:** ✅ Complete

---

## Summary

Completely overhauled the Rich Text Editor (RTE) interaction patterns with proper drag-and-drop functionality, intelligent menu behavior, keyboard shortcuts, and polished visual feedback. The RTE now feels responsive, intuitive, and professional.

---

## Problems Identified

### 1. **Dragging Didn't Work** ❌
- Drag handle was just a button that opened a menu
- No actual drag-and-drop functionality
- Users couldn't reorder blocks by dragging
- Confusion: handle looked draggable but wasn't

### 2. **Menu Stuck Around** ❌
- Menu didn't close when clicking outside
- Menu stayed open after performing actions (Move Up, Delete, etc.)
- No keyboard shortcut to close (Escape)
- Created cluttered UI and poor UX

### 3. **Poor Visual Feedback** ❌
- No indication during drag operations
- No hover states to show what's interactive
- Unclear which block is being dragged
- No visual indication of drop target

### 4. **Limited Keyboard Support** ❌
- No keyboard shortcuts for common actions
- Only Enter and Backspace worked
- Power users couldn't efficiently reorder blocks

---

## Solutions Implemented

### 1. **Native HTML5 Drag-and-Drop** ✅

**Implementation:**
```tsx
// Block is draggable
<div
  draggable={!readOnly}
  onDragStart={(e) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  }}
  onDragOver={onDragOver}
  onDragLeave={onDragLeave}
  onDrop={onDrop}
  onDragEnd={onDragEnd}
>
```

**State Management:**
- `draggedBlockId` - Which block is being dragged
- `dragOverBlockId` - Which block is being hovered over during drag

**Visual Feedback:**
```css
.rteBlock.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.rteBlock.dragOver {
  border-top: 2px solid var(--background-interactive);
  padding-top: var(--spacing-03);
  margin-top: var(--spacing-03);
}
```

**Benefits:**
- ✅ Smooth drag-and-drop reordering
- ✅ Clear visual feedback during drag
- ✅ Native browser support (no library needed)
- ✅ Drag handle shows `grab` cursor, changes to `grabbing` when active

---

### 2. **Intelligent Menu Behavior** ✅

**Click-Outside Handling:**
```tsx
useEffect(() => {
  if (!showMenu) return;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      blockRef.current &&
      !blockRef.current.contains(e.target as Node)
    ) {
      onToggleMenu(false);
    }
  };

  // Add listener on next tick to avoid immediate closing
  setTimeout(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, 0);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showMenu, onToggleMenu]);
```

**Auto-Close After Actions:**
```tsx
const deleteBlock = (blockId: string) => {
  // ... delete logic ...
  setShowBlockMenu(null); // Close menu after delete
};

const moveBlock = (blockId: string, direction: 'up' | 'down') => {
  // ... move logic ...
  setShowBlockMenu(null); // Close menu after move
};

// Also close when changing block type
onChange={(e) => {
  onUpdate({ type: e.target.value as BlockType });
  onToggleMenu(false);
}}
```

**Close Menu When Dragging Starts:**
```tsx
const handleDragStart = (blockId: string) => {
  setDraggedBlockId(blockId);
  setShowBlockMenu(null); // Prevent menu from interfering with drag
};
```

**Benefits:**
- ✅ Menu closes when clicking anywhere outside
- ✅ Menu closes after actions (no lingering)
- ✅ Menu closes when dragging starts
- ✅ Escape key closes menu
- ✅ Clean, uncluttered UI

---

### 3. **Enhanced Visual Feedback** ✅

**Drag Handle Improvements:**
```css
.rteDragHandle {
  cursor: grab;
  color: var(--text-disabled);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
}

.rteBlock:hover .rteDragHandle,
.rteBlock.focused .rteDragHandle {
  opacity: 1;
}

.rteDragHandle:hover {
  color: var(--text-primary);
  background: var(--background-hover);
}

.rteDragHandle:active {
  cursor: grabbing;
  background: var(--background-selected);
}
```

**Menu Entrance Animation:**
```css
.rteBlockMenu {
  animation: menuFadeIn 0.15s ease;
}

@keyframes menuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Menu Interactions:**
```css
.rteMenuSection button:hover:not(:disabled) {
  background: var(--background-hover);
  border-color: var(--border-interactive);
}

.rteMenuSection button:active:not(:disabled) {
  background: var(--background-selected);
}

.rteDeleteBtn:hover:not(:disabled) {
  background: var(--background-error);
  border-color: var(--border-error);
  color: var(--text-error);
}
```

**Benefits:**
- ✅ Drag handle appears on hover (progressive disclosure)
- ✅ Cursor changes: `grab` → `grabbing`
- ✅ Smooth menu entrance animation
- ✅ Button hover states provide feedback
- ✅ Delete button has error state styling
- ✅ Disabled buttons are visually distinct (40% opacity)

---

### 4. **Keyboard Shortcuts** ✅

**Implemented Shortcuts:**

| Shortcut | Action |
|----------|--------|
| **Enter** | Create new paragraph block below |
| **Shift + Enter** | New line (in code blocks) |
| **Backspace** (empty block) | Delete current block |
| **Cmd/Ctrl + ↑** | Move block up |
| **Cmd/Ctrl + ↓** | Move block down |
| **Escape** | Close block menu |

**Implementation:**
```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  // Enter creates new block
  if (e.key === 'Enter' && !e.shiftKey) {
    if (block.type !== 'code') {
      e.preventDefault();
      onAddBlock('paragraph');
    }
  }

  // Backspace on empty block deletes it
  if (e.key === 'Backspace' && block.content === '') {
    e.preventDefault();
    onDelete();
  }

  // Cmd/Ctrl + Up/Down to move blocks
  if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp' && !isFirst) {
    e.preventDefault();
    onMoveUp();
  }

  if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown' && !isLast) {
    e.preventDefault();
    onMoveDown();
  }

  // Escape closes menu
  if (e.key === 'Escape' && showMenu) {
    e.preventDefault();
    onToggleMenu(false);
  }
};
```

**Benefits:**
- ✅ Power users can work without mouse
- ✅ Faster block reordering (keyboard > clicking buttons)
- ✅ Familiar shortcuts (Cmd+Arrow = move, Escape = close)
- ✅ Accessibility improvement

---

### 5. **Polish & UX Details** ✅

**Menu Label for Block Type:**
```tsx
<label className={styles.rteMenuLabel}>Block Type</label>
<select value={block.type} onChange={...}>
  {BLOCK_TYPES.map(...)}
</select>
```

```css
.rteMenuLabel {
  display: block;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-02);
  font-weight: 600;
}
```

**Drag Handle `tabIndex={-1}`:**
```tsx
<button
  className={styles.rteDragHandle}
  tabIndex={-1} // Don't interfere with tab navigation
  onClick={...}
>
```
Prevents drag handle from being in tab order (users tab through content, not controls).

**Better Menu Shadow:**
```css
.rteBlockMenu {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```
More prominent shadow makes menu feel elevated above content.

**Smooth Transitions:**
```css
.rteBlock {
  transition: opacity 0.2s, transform 0.2s;
}

.rteDragHandle {
  transition: opacity 0.2s, color 0.2s;
}

.rteMenuSection button {
  transition: background 0.15s, border-color 0.15s;
}
```

---

## Files Modified

```
/components/RichTextEditor/
  RichTextEditor.tsx           # Complete rewrite with drag-and-drop
  RichTextEditor.module.css    # Enhanced visual feedback and animations

/change-log/
  25-10-24_v24-RTE_InteractionPatterns.md  # This document
  index.md                                  # Updated index
```

---

## Code Changes Summary

### New State Variables

```tsx
const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);
```

### New Handler Functions

```tsx
const handleDragStart = (blockId: string) => { ... }
const handleDragOver = (e: React.DragEvent, blockId: string) => { ... }
const handleDragLeave = () => { ... }
const handleDrop = (e: React.DragEvent, targetBlockId: string) => { ... }
const handleDragEnd = () => { ... }
```

### New Props for RichTextBlock

```tsx
interface RichTextBlockProps {
  // ... existing props ...
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}
```

### New Refs for Click-Outside

```tsx
const menuRef = useRef<HTMLDivElement>(null);
const blockRef = useRef<HTMLDivElement>(null);
```

### New useEffect for Click-Outside

Handles menu closing when clicking outside, with proper cleanup.

---

## Testing Checklist

**Drag and Drop:**
- ✅ Click and hold drag handle
- ✅ Drag block up/down
- ✅ Visual feedback during drag (opacity, cursor, border)
- ✅ Drop block at new position
- ✅ Blocks reorder correctly

**Menu Behavior:**
- ✅ Click drag handle to open menu
- ✅ Click outside to close menu
- ✅ Press Escape to close menu
- ✅ Menu closes after Move Up
- ✅ Menu closes after Move Down
- ✅ Menu closes after changing block type
- ✅ Menu closes after Delete
- ✅ Menu closes when dragging starts

**Keyboard Shortcuts:**
- ✅ Enter creates new block (except in code blocks)
- ✅ Shift+Enter creates new line in code blocks
- ✅ Backspace on empty block deletes it
- ✅ Cmd/Ctrl + Up moves block up (disabled on first block)
- ✅ Cmd/Ctrl + Down moves block down (disabled on last block)
- ✅ Escape closes menu

**Visual Feedback:**
- ✅ Drag handle appears on hover
- ✅ Drag handle shows `grab` cursor
- ✅ Active drag shows `grabbing` cursor
- ✅ Dragged block has reduced opacity
- ✅ Drop target shows blue border
- ✅ Menu fades in smoothly
- ✅ Buttons have hover states
- ✅ Delete button has error styling on hover
- ✅ Disabled buttons are visually distinct

**Edge Cases:**
- ✅ Can't move first block up (button disabled)
- ✅ Can't move last block down (button disabled)
- ✅ Can't delete last block (just clears content)
- ✅ Dragging to same position does nothing
- ✅ Menu doesn't interfere with drag operations

---

## Architecture Decisions

### Decision 1: Native HTML5 Drag-and-Drop vs. Library

**Chose:** Native HTML5 drag-and-drop API

**Alternatives Considered:**
1. **react-dnd** - Full-featured drag-and-drop library
2. **react-beautiful-dnd** - Accessible drag-and-drop
3. **Native HTML5** ✅ - Built-in browser API

**Rationale:**
- Simple use case (just reordering blocks)
- No external dependencies needed
- Native API is performant and well-supported
- Easier to maintain and understand
- Can upgrade to library later if needed

### Decision 2: Click-Outside with useEffect vs. Context/Portal

**Chose:** useEffect with mousedown event listener

**Rationale:**
- Simple, localized solution
- No need for global context
- Easy to understand and debug
- Properly cleans up listeners
- setTimeout trick prevents immediate closing

### Decision 3: Menu Auto-Close After Actions

**Chose:** Close menu after all actions (Move, Delete, Change Type)

**Rationale:**
- Better UX - user performs action, menu closes, clean slate
- Prevents menu from lingering and cluttering UI
- User can reopen menu if needed
- Matches expected behavior from other editors (Notion, Google Docs)

### Decision 4: Progressive Disclosure for Drag Handle

**Chose:** Hide drag handle by default, show on hover/focus

```css
.rteDragHandle {
  opacity: 0;
}

.rteBlock:hover .rteDragHandle,
.rteBlock.focused .rteDragHandle {
  opacity: 1;
}
```

**Rationale:**
- Cleaner UI when not interacting
- Still discoverable (appears on hover)
- Matches patterns from other modern editors
- Reduces visual noise

---

## User Experience Improvements

### Before ❌

- **Drag Handle:** Just a button that opens a menu
- **Reordering:** Click handle → click "Move Up" or "Move Down" → repeat
- **Menu:** Stays open forever, clutters UI
- **Keyboard:** Only Enter and Backspace
- **Visual Feedback:** Minimal, unclear what's interactive

### After ✅

- **Drag Handle:** Actually draggable! Click = menu, drag = reorder
- **Reordering:** Click and drag to new position (instant)
- **Menu:** Opens when needed, closes after actions or click-outside
- **Keyboard:** Cmd+Up/Down to move, Escape to close menu
- **Visual Feedback:** Clear hover states, drag feedback, smooth animations

---

## Performance Considerations

**Event Listeners:**
- Click-outside listener is added/removed with menu state
- Uses `setTimeout` to avoid immediate trigger
- Proper cleanup in useEffect return function

**Drag Operations:**
- Native browser API handles drag rendering
- State updates are minimal (just IDs)
- No heavy computations during drag

**CSS Transitions:**
- GPU-accelerated properties (opacity, transform)
- Short durations (0.15s-0.2s)
- No layout thrashing

---

## Next Steps

### Phase 3.1.2: Add @Mention Integration 🔜

Now that RTE foundations are solid, we can add:
- @ trigger detection in block inputs
- Method to insert mention at cursor
- Mention rendering with styled `<span>` elements

**Files to modify:**
- `/components/RichTextEditor/RichTextEditor.tsx`

**Time estimate:** 45 minutes

### Future Enhancements 💡

**Slash Commands (/):**
- Type `/` to open block type picker
- Filter types as you type
- Quick way to change block types

**Block Duplication:**
- Cmd/Ctrl + D to duplicate current block
- Useful for repeating structures

**Multi-Block Selection:**
- Shift+Click to select multiple blocks
- Drag/delete multiple blocks at once

**Block Actions Menu (+):**
- Hover between blocks to show "+" button
- Click to add block at specific position
- Alternative to Enter key

**Undo/Redo:**
- Track block changes in history
- Cmd/Ctrl + Z for undo
- Cmd/Ctrl + Shift + Z for redo

---

## Breaking Changes

None! All changes are backwards compatible.

---

## Related Documentation

- **Plan:** `/change-log/25-10-24_v22-RTE_MarkdownFoundationsPlan.md`
- **Markdown Fix:** `/change-log/25-10-24_v23-RTE_MarkdownFoundationsFix.md`
- **Guidelines:** `/guidelines/Guidelines.md` (v2.1)

---

## Success Criteria

✅ **Drag-and-Drop Working:**
- Users can drag blocks to reorder
- Visual feedback during drag
- Smooth, predictable behavior

✅ **Menu Behavior Fixed:**
- Menu closes on click-outside
- Menu closes after actions
- Escape closes menu
- No lingering menus

✅ **Visual Feedback Polished:**
- Drag handle appears on hover
- Cursor changes appropriately
- Hover states on all interactive elements
- Smooth animations

✅ **Keyboard Shortcuts Working:**
- Cmd+Up/Down moves blocks
- Enter creates blocks
- Backspace deletes empty blocks
- Escape closes menu

✅ **Production Ready:**
- No console errors
- Performant (no jank)
- Accessible (keyboard navigation)
- Polished feel

---

## Lessons Learned

1. **Native APIs are often enough** - Don't reach for a library if the native API works
2. **Progressive disclosure reduces noise** - Hide controls until needed (hover states)
3. **Auto-close is better UX** - Menus should close after actions, not linger
4. **Keyboard shortcuts matter** - Power users rely on them, worth implementing
5. **Visual feedback is critical** - Users need to know what's happening (drag states, hover, etc.)
6. **Click-outside is tricky** - Need setTimeout to prevent immediate closing
7. **Small animations add polish** - Menu fade-in, transitions on hover, etc. make it feel professional

---

## Status

✅ **COMPLETE** - RTE interaction patterns fully overhauled and polished. Ready for @mention integration (Phase 3.1.2).
