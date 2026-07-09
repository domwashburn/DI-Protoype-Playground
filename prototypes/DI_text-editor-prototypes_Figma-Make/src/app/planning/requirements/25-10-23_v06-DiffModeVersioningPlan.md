# Multi-Version Diff Mode with Synchronized Scrolling

**Date:** October 23, 2025  
**Version:** v06  
**Status:** 📋 Planned (Not Yet Implemented)

---

## Summary

Plan for implementing a comprehensive diff mode that compares different versions of documents across all editor types (BAL, Formula, Markdown, Rich Text). The diff view will display versions side-by-side with synchronized scrolling to maintain context while comparing changes.

---

## Context

Currently, the DiffViewer component exists but only displays a single static comparison. To enable meaningful version comparison workflows, we need:

1. **Versioned sample data** for all editor types
2. **Version selection UI** to choose which versions to compare
3. **Synchronized scrolling** between diff panes for better UX
4. **Cross-editor support** - diff should work for all editor types

This feature will help users:
- Review changes between document versions
- Understand evolution of rules/formulas over time
- Compare side-by-side while maintaining reading position

---

## Requirements

### Functional Requirements

1. **Version Management**
   - Each editor type has multiple versions of sample data (minimum 2)
   - Versions have metadata: id, version number, label, timestamp
   - Versions are selectable via UI

2. **Diff Display**
   - Side-by-side view with two panes (Version A | Version B)
   - Line-by-line comparison
   - Syntax highlighting preserved in both panes
   - Visual indicators for added/removed/modified lines

3. **Synchronized Scrolling**
   - Scrolling one pane automatically scrolls the other
   - Both vertical (scrollTop) and horizontal (scrollLeft) sync
   - Smooth, lag-free experience
   - No infinite scroll loops

4. **Version Selection UI**
   - Dropdowns/selects for "Version A" and "Version B"
   - Show version label and timestamp
   - Default: compare two most recent versions
   - Prevent comparing same version against itself

---

## Architecture Plan

### 1. Sample Data Versioning

**Update Files:**
- `/SampleData/balSamples.ts`
- `/SampleData/formulaSamples.ts`
- `/SampleData/markdownSamples.ts`
- `/SampleData/richTextSamples.ts`

**New Structure:**

```typescript
// New type definition
export interface DocumentVersion {
  id: string;
  version: number;
  label: string;
  timestamp: string; // ISO 8601 format
  content: string;
  description?: string; // Optional description of changes
}

// Example for BAL
export const balVersions: DocumentVersion[] = [
  {
    id: 'bal-v1',
    version: 1,
    label: 'Initial Draft',
    timestamp: '2025-10-20T10:00:00Z',
    description: 'First implementation of loan eligibility rules',
    content: `IF customer.creditScore >= 700 THEN
  eligibility = "Approved"
ELSE
  eligibility = "Denied"
END IF`
  },
  {
    id: 'bal-v2',
    version: 2,
    label: 'Added Income Check',
    timestamp: '2025-10-22T14:30:00Z',
    description: 'Enhanced logic to include income verification',
    content: `IF customer.creditScore >= 700 AND customer.income >= 50000 THEN
  eligibility = "Approved"
ELSE IF customer.creditScore >= 650 AND customer.income >= 75000 THEN
  eligibility = "Conditional Approval"
ELSE
  eligibility = "Denied"
END IF`
  },
  {
    id: 'bal-v3',
    version: 3,
    label: 'Debt Ratio Logic',
    timestamp: '2025-10-23T16:45:00Z',
    description: 'Added debt-to-income ratio calculation',
    content: `SET debtRatio = customer.totalDebt / customer.income

IF customer.creditScore >= 700 AND customer.income >= 50000 AND debtRatio <= 0.43 THEN
  eligibility = "Approved"
ELSE IF customer.creditScore >= 650 AND customer.income >= 75000 AND debtRatio <= 0.50 THEN
  eligibility = "Conditional Approval"
ELSE
  eligibility = "Denied"
END IF`
  }
];

// Keep current default export for backward compatibility
export const defaultBALContent = balVersions[balVersions.length - 1].content;
```

**Similar structure for:**
- `formulaVersions` - Different calculation logic versions
- `markdownVersions` - Documentation evolution
- `richTextVersions` - Rich content iterations

---

### 2. DiffViewer Enhancement

**File:** `/components/DiffViewer/DiffViewer.tsx`

**New Features:**
1. Accept two versions as props
2. Render side-by-side panes
3. Implement synchronized scrolling
4. Maintain existing diff highlighting

**Synchronized Scrolling Implementation:**

```typescript
// Technique using refs and event listeners
function useSynchronizedScroll() {
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const [activePane, setActivePane] = useState<'left' | 'right' | null>(null);
  
  useEffect(() => {
    const leftPane = leftPaneRef.current;
    const rightPane = rightPaneRef.current;
    
    if (!leftPane || !rightPane) return;
    
    const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      return () => {
        if (source === leftPane && activePane === 'left') {
          target.scrollTop = source.scrollTop;
          target.scrollLeft = source.scrollLeft;
        } else if (source === rightPane && activePane === 'right') {
          target.scrollTop = source.scrollTop;
          target.scrollLeft = source.scrollLeft;
        }
      };
    };
    
    const handleLeftScroll = syncScroll(leftPane, rightPane);
    const handleRightScroll = syncScroll(rightPane, leftPane);
    
    const handleLeftMouseEnter = () => setActivePane('left');
    const handleRightMouseEnter = () => setActivePane('right');
    const handleMouseLeave = () => setActivePane(null);
    
    leftPane.addEventListener('scroll', handleLeftScroll);
    rightPane.addEventListener('scroll', handleRightScroll);
    leftPane.addEventListener('mouseenter', handleLeftMouseEnter);
    rightPane.addEventListener('mouseenter', handleRightMouseEnter);
    leftPane.addEventListener('mouseleave', handleMouseLeave);
    rightPane.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      leftPane.removeEventListener('scroll', handleLeftScroll);
      rightPane.removeEventListener('scroll', handleRightScroll);
      leftPane.removeEventListener('mouseenter', handleLeftMouseEnter);
      rightPane.removeEventListener('mouseenter', handleRightMouseEnter);
      leftPane.removeEventListener('mouseleave', handleMouseLeave);
      rightPane.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activePane]);
  
  return { leftPaneRef, rightPaneRef };
}
```

**Props Interface:**

```typescript
export interface DiffViewerProps {
  versionA: DocumentVersion;
  versionB: DocumentVersion;
  editorType: 'bal' | 'formula' | 'markdown' | 'richtext';
  showLineNumbers?: boolean;
}
```

---

### 3. Version Selector UI

**Location:** `/components/EditorContainer/` or new `/components/VersionSelector/`

**Component Structure:**

```typescript
export interface VersionSelectorProps {
  versions: DocumentVersion[];
  selectedVersionA: string; // version id
  selectedVersionB: string; // version id
  onVersionAChange: (versionId: string) => void;
  onVersionBChange: (versionId: string) => void;
}

export function VersionSelector({ 
  versions, 
  selectedVersionA, 
  selectedVersionB,
  onVersionAChange,
  onVersionBChange 
}: VersionSelectorProps) {
  return (
    <div className={styles.versionSelector}>
      <div className={styles.selectorGroup}>
        <label>Version A</label>
        <Select value={selectedVersionA} onValueChange={onVersionAChange}>
          {versions.map(v => (
            <SelectItem key={v.id} value={v.id} disabled={v.id === selectedVersionB}>
              {v.label} - {formatDate(v.timestamp)}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <div className={styles.divider}>vs</div>
      
      <div className={styles.selectorGroup}>
        <label>Version B</label>
        <Select value={selectedVersionB} onValueChange={onVersionBChange}>
          {versions.map(v => (
            <SelectItem key={v.id} value={v.id} disabled={v.id === selectedVersionA}>
              {v.label} - {formatDate(v.timestamp)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
```

**Default Behavior:**
- Version A: Second-to-last version
- Version B: Latest version
- Most common use case: comparing current with previous

---

### 4. Integration with EditorContainer

**File:** `/components/EditorContainer/EditorContainer.tsx`

**Changes:**
1. Add version selector when `viewMode === 'diff'`
2. Pass selected versions to DiffViewer
3. Handle version state management

```typescript
export function EditorContainer({ editorType }: EditorContainerProps) {
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'diff'>('edit');
  const [selectedVersionA, setSelectedVersionA] = useState<string>('');
  const [selectedVersionB, setSelectedVersionB] = useState<string>('');
  
  // Get versions based on editor type
  const versions = useMemo(() => {
    switch (editorType) {
      case 'bal': return balVersions;
      case 'formula': return formulaVersions;
      case 'markdown': return markdownVersions;
      case 'richtext': return richTextVersions;
      default: return [];
    }
  }, [editorType]);
  
  // Set default versions
  useEffect(() => {
    if (versions.length >= 2) {
      setSelectedVersionA(versions[versions.length - 2].id);
      setSelectedVersionB(versions[versions.length - 1].id);
    }
  }, [versions]);
  
  return (
    <div className={styles.container}>
      {/* Mode toggle buttons */}
      
      {viewMode === 'diff' && (
        <>
          <VersionSelector
            versions={versions}
            selectedVersionA={selectedVersionA}
            selectedVersionB={selectedVersionB}
            onVersionAChange={setSelectedVersionA}
            onVersionBChange={setSelectedVersionB}
          />
          
          <DiffViewer
            versionA={versions.find(v => v.id === selectedVersionA)!}
            versionB={versions.find(v => v.id === selectedVersionB)!}
            editorType={editorType}
          />
        </>
      )}
      
      {/* Other view modes... */}
    </div>
  );
}
```

---

## Implementation Plan

### Phase 1: Sample Data Versioning
1. Create `DocumentVersion` type in `/components/editors/core/types/`
2. Update all sample files with versioned data
   - BAL: 3 versions (initial, enhanced logic, complex rules)
   - Formula: 3 versions (simple calc, multi-variable, with thresholds)
   - Markdown: 3 versions (draft, updated, final)
   - Rich Text: 3 versions (initial, formatting added, complete)
3. Export both `versions` array and `defaultContent` for backward compatibility
4. Test that existing editors still work with default content

### Phase 2: DiffViewer Enhancement
1. Create `useSynchronizedScroll` hook
2. Update DiffViewer component to accept two versions
3. Implement side-by-side layout
4. Add synchronized scrolling behavior
5. Test scroll sync thoroughly (edge cases, performance)
6. Preserve existing diff highlighting

### Phase 3: Version Selector UI
1. Create VersionSelector component
2. Implement dropdown UI with version metadata
3. Handle version selection state
4. Prevent selecting same version twice
5. Format timestamps nicely

### Phase 4: Integration
1. Update EditorContainer to manage version state
2. Wire up VersionSelector to state
3. Pass selected versions to DiffViewer
4. Test all editor types in diff mode
5. Ensure mode switching works smoothly

### Phase 5: Polish & Documentation
1. Add loading states
2. Add empty states (if < 2 versions)
3. Keyboard shortcuts (optional)
4. Update component READMEs
5. Add usage examples
6. Create visual documentation

---

## Files to Create/Modify

### New Files
- `/components/VersionSelector/VersionSelector.tsx`
- `/components/VersionSelector/VersionSelector.module.css`
- `/components/VersionSelector/index.ts`
- `/components/VersionSelector/README.md`
- `/hooks/useSynchronizedScroll.ts` (or inline in DiffViewer)

### Modified Files
- `/SampleData/balSamples.ts` - Add versioned data
- `/SampleData/formulaSamples.ts` - Add versioned data
- `/SampleData/markdownSamples.ts` - Add versioned data
- `/SampleData/richTextSamples.ts` - Add versioned data
- `/components/DiffViewer/DiffViewer.tsx` - Enhanced for versions + sync scroll
- `/components/DiffViewer/DiffViewer.module.css` - Updated styles
- `/components/EditorContainer/EditorContainer.tsx` - Version management
- `/components/EditorContainer/EditorContainer.module.css` - Version selector layout
- `/components/editors/core/types/EditorTypes.ts` - Add DocumentVersion type

---

## Technical Considerations

### Synchronized Scrolling Challenges

1. **Infinite Loop Prevention**
   - Only sync when user is actively scrolling one pane
   - Track which pane is "active" via mouseenter/mouseleave
   - Prevent scroll events from triggering reciprocal scrolls

2. **Different Content Heights**
   - Left and right panes may have different total heights
   - Normalize scroll position if needed
   - Consider scroll percentage vs absolute position

3. **Performance**
   - Scroll events fire frequently
   - Consider debouncing/throttling if performance issues
   - Use requestAnimationFrame for smooth updates

4. **Horizontal Scroll**
   - Both scrollTop AND scrollLeft need to sync
   - Important for long lines in code

### Version Data Structure

1. **Backward Compatibility**
   - Keep `defaultContent` exports for existing code
   - Gradual migration to version-aware code
   - No breaking changes to current editors

2. **Version Metadata**
   - Timestamp for chronological ordering
   - Label for human-readable identification
   - Optional description for changelog-like info

3. **Storage Considerations**
   - Currently using mock data
   - Plan for future API integration
   - Version metadata should match backend schema

---

## User Experience Flow

1. **User selects "Diff" view mode**
   - UI switches to diff layout
   - Version selector appears at top
   - Defaults to comparing latest two versions

2. **User sees side-by-side comparison**
   - Version A on left, Version B on right
   - Headers show version label + timestamp
   - Syntax highlighting preserved
   - Changes are visually highlighted

3. **User scrolls to review changes**
   - Scrolling left pane auto-scrolls right pane
   - Scrolling right pane auto-scrolls left pane
   - Maintains perfect alignment

4. **User changes version selection**
   - Select different version from dropdown
   - Diff updates immediately
   - Scroll position resets to top

---

## CSS Variables Needed

```css
/* DiffViewer variables (add to globals.css) */
--diff-pane-border: var(--border-subtle-01);
--diff-added-bg: rgba(66, 184, 131, 0.1);
--diff-added-text: var(--text-primary);
--diff-removed-bg: rgba(255, 86, 86, 0.1);
--diff-removed-text: var(--text-primary);
--diff-modified-bg: rgba(255, 199, 95, 0.1);
--diff-header-bg: var(--background-secondary);
--diff-divider: var(--border-subtle-01);
```

---

## Testing Checklist

### Functional Testing
- [ ] Version selector shows all versions
- [ ] Cannot select same version for A and B
- [ ] Diff displays correctly for all editor types
- [ ] Syntax highlighting works in diff view
- [ ] Added/removed/modified lines are highlighted
- [ ] Version metadata displays correctly

### Scroll Sync Testing
- [ ] Vertical scroll syncs perfectly
- [ ] Horizontal scroll syncs perfectly
- [ ] No scroll lag or jank
- [ ] No infinite scroll loops
- [ ] Works with mouse wheel
- [ ] Works with scrollbar drag
- [ ] Works with keyboard (arrow keys, page up/down)
- [ ] Sync stops when pane loses focus

### Edge Cases
- [ ] Only 1 version available (disable diff mode)
- [ ] Very long documents (performance)
- [ ] Very wide lines (horizontal scroll)
- [ ] Switching versions mid-scroll
- [ ] Switching view modes (edit → diff → preview)
- [ ] Different content heights between versions

### Accessibility
- [ ] Keyboard navigation works
- [ ] Version selectors are keyboard accessible
- [ ] Screen reader support for version metadata
- [ ] Focus management when switching versions

---

## Future Enhancements

1. **Three-way diff** - Compare 3 versions simultaneously
2. **Inline diff mode** - Single pane with inline change indicators
3. **Diff statistics** - Count of added/removed/modified lines
4. **Change annotations** - Comments on specific changes
5. **Diff export** - Export diff as patch file or PDF
6. **Version branching** - Support branching version history
7. **Real-time collaboration diff** - Compare against collaborator's version

---

## Dependencies

### Existing Components to Leverage
- DiffViewer (enhance, don't replace)
- EditorContainer (add version management)
- Select component from shadcn/ui

### New Dependencies
- None - use existing tools

### CSS Variables
- All from `/styles/globals.css`
- May need to add diff-specific variables

---

## Success Criteria

✅ **Feature is successful when:**
1. All 4 editor types have at least 3 versions of sample data
2. Version selector UI is intuitive and accessible
3. Diff view renders side-by-side with perfect scroll sync
4. No performance degradation when scrolling
5. Switching versions is instant and smooth
6. All edge cases are handled gracefully
7. Code follows Guidelines.md v2.1 patterns
8. Components are documented with READMEs
9. Integration tests pass
10. User testing shows positive feedback on UX

---

## Related Documentation

- `/components/DiffViewer/README.md` (to be updated)
- `/components/EditorContainer/README.md` (to be updated)
- `/guidelines/Guidelines.md` - Component patterns
- `/design-documentation/` - (if panel system integration needed)

---

## Notes

- This is a planning document; implementation will be done in future sessions
- Synchronized scrolling is the most technically complex part
- Sample data versioning is straightforward but needs thoughtful content creation
- Consider creating realistic version history (initial → enhanced → optimized)
- Version labels should tell a story of document evolution

---

## Change Log Entry

**Status:** 📋 Planned - Documented in change log but not yet implemented

**Next Steps:**
1. Review this plan with team/user
2. Get approval on technical approach
3. Schedule implementation (likely multiple sessions)
4. Start with Phase 1 (sample data versioning) as it's low-risk
