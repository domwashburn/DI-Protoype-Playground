/**
 * RichTextEditor Component (Presentational) - Version 6
 * 
 * Block-based rich text editor with inline @mention rendering, drag-and-drop, and polished interactions.
 * 
 * New in v6:
 * - Fixed contentEditable crash issues
 * - Simplified mention rendering
 * - Mentions disabled in headings (only in body, lists, quotes, code, callouts)
 * - Horizontal line drag indicator (not dashed border)
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
// CARBON_CONVERT: Replace lucide-react icons with @carbon/icons-react:
// GripVertical → <Draggable />, Trash2 → <TrashCan />, Plus → <Add />
import { GripVertical, Trash2, Plus, MoreVertical } from 'lucide-react';
import type { ContentBlock, BlockType } from '../../SampleData/richTextSamples';
import { useMentionableEntities } from '../../hooks/useMentionableEntities';
import { Autocomplete, type AutocompleteHandle } from '../editors/core/components';
import { BlockTypeMenu, BLOCK_TYPE_OPTIONS } from './BlockTypeMenu';
import { useRichTextTypeahead } from './useRichTextTypeahead';
import type { MentionableEntity } from '../editors/core/types';
import { parseMentions, type ParsedMention } from '../../utils/mentionRenderer';
import styles from './RichTextEditor.module.css';

export interface RichTextEditorProps {
  /** Array of content blocks */
  blocks: ContentBlock[];
  /** Callback when blocks change */
  onChange: (blocks: ContentBlock[]) => void;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Custom className */
  className?: string;
}

const BLOCK_TYPES: Array<{ type: BlockType; label: string; icon: string }> = [
  { type: 'paragraph', label: 'Paragraph', icon: '¶' },
  { type: 'heading1', label: 'Heading 1', icon: 'H1' },
  { type: 'heading2', label: 'Heading 2', icon: 'H2' },
  { type: 'heading3', label: 'Heading 3', icon: 'H3' },
  { type: 'bulletList', label: 'Bullet List', icon: '•' },
  { type: 'numberedList', label: 'Numbered List', icon: '1.' },
  { type: 'quote', label: 'Quote', icon: '"' },
  { type: 'code', label: 'Code', icon: '</>' },
  { type: 'checkbox', label: 'Checkbox', icon: '☑' },
  { type: 'callout', label: 'Callout', icon: '!' },
  { type: 'table', label: 'Table', icon: '⊞' },
  { type: 'divider', label: 'Divider', icon: '—' }
];

// Block types where mentions are allowed
const MENTION_ALLOWED_BLOCKS: BlockType[] = [
  'paragraph',
  'bulletList',
  'numberedList',
  'quote',
  'code',
  'checkbox',
  'callout'
];

/**
 * RichTextEditor - Block-based content editor
 */
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  blocks,
  onChange,
  readOnly = false,
  className = ''
}) => {
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<'before' | 'after' | null>(null);

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    const newBlocks = blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onChange(newBlocks);
  };

  const addBlock = (afterBlockId: string, type: BlockType = 'paragraph') => {
    const index = blocks.findIndex(b => b.id === afterBlockId);
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: ''
    };
    
    const newBlocks = [
      ...blocks.slice(0, index + 1),
      newBlock,
      ...blocks.slice(index + 1)
    ];
    onChange(newBlocks);
    setFocusedBlockId(newBlock.id);
  };

  const deleteBlock = (blockId: string) => {
    if (blocks.length === 1) {
      updateBlock(blockId, { content: '' });
      return;
    }
    
    const newBlocks = blocks.filter(block => block.id !== blockId);
    onChange(newBlocks);
    setShowBlockMenu(null);
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
    setShowBlockMenu(null);
  };

  const handleDragStart = (blockId: string) => {
    setDraggedBlockId(blockId);
    setShowBlockMenu(null);
  };

  const handleDragOver = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    if (draggedBlockId && draggedBlockId !== blockId) {
      setDragOverBlockId(blockId);
      
      // Determine if we should insert before or after based on mouse position
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const position = e.clientY < midpoint ? 'before' : 'after';
      setDragPosition(position);
    }
  };

  const handleDragLeave = () => {
    setDragOverBlockId(null);
    setDragPosition(null);
  };

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    
    if (!draggedBlockId || draggedBlockId === targetBlockId) {
      setDraggedBlockId(null);
      setDragOverBlockId(null);
      setDragPosition(null);
      return;
    }

    const draggedIndex = blocks.findIndex(b => b.id === draggedBlockId);
    const targetIndex = blocks.findIndex(b => b.id === targetBlockId);

    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    
    // Adjust target index if dragging down
    let insertIndex = targetIndex;
    if (draggedIndex < targetIndex) {
      insertIndex = targetIndex;
    }
    
    // Insert before or after based on drag position
    if (dragPosition === 'after') {
      insertIndex += 1;
    }

    newBlocks.splice(insertIndex, 0, draggedBlock);

    onChange(newBlocks);
    setDraggedBlockId(null);
    setDragOverBlockId(null);
    setDragPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedBlockId(null);
    setDragOverBlockId(null);
    setDragPosition(null);
  };

  return (
    <div className={`${styles.rteContainer} ${className}`}>
      <div className={styles.rteBlocks}>
        {blocks.map((block, index) => (
          <RichTextBlock
            key={block.id}
            block={block}
            isFocused={focusedBlockId === block.id}
            readOnly={readOnly}
            showMenu={showBlockMenu === block.id}
            isDragging={draggedBlockId === block.id}
            isDragOver={dragOverBlockId === block.id}
            dragPosition={dragPosition}
            onFocus={() => setFocusedBlockId(block.id)}
            onBlur={() => setFocusedBlockId(null)}
            onUpdate={(updates) => updateBlock(block.id, updates)}
            onDelete={() => deleteBlock(block.id)}
            onAddBlock={(type) => addBlock(block.id, type)}
            onMoveUp={() => moveBlock(block.id, 'up')}
            onMoveDown={() => moveBlock(block.id, 'down')}
            onToggleMenu={(show) => setShowBlockMenu(show ? block.id : null)}
            onDragStart={() => handleDragStart(block.id)}
            onDragOver={(e) => handleDragOver(e, block.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, block.id)}
            onDragEnd={handleDragEnd}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Individual block component with contentEditable for inline mention rendering
 */
interface RichTextBlockProps {
  block: ContentBlock;
  isFocused: boolean;
  readOnly: boolean;
  showMenu: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  dragPosition: 'before' | 'after' | null;
  onFocus: () => void;
  onBlur: () => void;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onAddBlock: (type: BlockType) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleMenu: (show: boolean) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({
  block,
  isFocused,
  readOnly,
  showMenu,
  isDragging,
  isDragOver,
  dragPosition,
  onFocus,
  onBlur,
  onUpdate,
  onDelete,
  onAddBlock,
  onMoveUp,
  onMoveDown,
  onToggleMenu,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isFirst,
  isLast
}) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<AutocompleteHandle>(null);
  
  // Mention system
  const { allEntities, filterByQuery } = useMentionableEntities();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteQuery, setAutocompleteQuery] = useState('');
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const [ghostTextPosition, setGhostTextPosition] = useState({ top: 0, left: 0 });
  const [mentionTriggerPos, setMentionTriggerPos] = useState<number | null>(null);
  
  // Nested mention system
  const [mentionPath, setMentionPath] = useState<MentionableEntity[]>([]); // Track current path
  const [isNestedMention, setIsNestedMention] = useState(false); // Whether we're in nested mode

  // Slash command system
  const [showBlockTypeMenu, setShowBlockTypeMenu] = useState(false);
  const [blockTypeMenuQuery, setBlockTypeMenuQuery] = useState('');
  const [selectedBlockTypeIndex, setSelectedBlockTypeIndex] = useState(0);
  const [blockTypeMenuPosition, setBlockTypeMenuPosition] = useState({ top: 0, left: 0 });
  const [blockTypeMenuTriggerPos, setBlockTypeMenuTriggerPos] = useState<number | null>(null);

  // Track selected autocomplete index for ghost text
  const [autocompleteSelectedIndex, setAutocompleteSelectedIndex] = useState(0);

  // Check if mentions are allowed for this block type
  const mentionsAllowed = MENTION_ALLOWED_BLOCKS.includes(block.type);

  // Stable callback for closing autocomplete (prevents useEffect churn in Autocomplete)
  const handleCloseAutocomplete = useCallback(() => {
    setShowAutocomplete(false);
  }, []);

  // Filter suggestions
  const suggestions = useMemo(() => {
    if (!showAutocomplete || !mentionsAllowed) return [];
    
    // If we're in nested mention mode, only show children of the last entity in path
    if (isNestedMention && mentionPath.length > 0) {
      const parentEntity = mentionPath[mentionPath.length - 1];
      if (parentEntity && parentEntity.children) {
        // Filter children by query
        return filterByQuery(parentEntity.children, autocompleteQuery);
      }
      return [];
    }
    
    // Otherwise show only ROOT entities (no parentId)
    const rootEntities = allEntities.filter(e => !e.parentId);
    return filterByQuery(rootEntities, autocompleteQuery);
  }, [showAutocomplete, autocompleteQuery, allEntities, filterByQuery, mentionsAllowed, isNestedMention, mentionPath]);

  // Filter block type options
  const blockTypeOptions = useMemo(() => {
    if (!showBlockTypeMenu) return [];
    return BLOCK_TYPE_OPTIONS.filter(option => {
      const searchText = blockTypeMenuQuery.toLowerCase();
      return (
        option.label.toLowerCase().includes(searchText) ||
        option.description.toLowerCase().includes(searchText)
      );
    });
  }, [showBlockTypeMenu, blockTypeMenuQuery]);

  // Ghost typeahead for mentions
  const ghostTextData = useMemo(() => {
    if (!showAutocomplete || suggestions.length === 0) {
      return null;
    }
    
    const selectedItem = suggestions[autocompleteSelectedIndex];
    if (!selectedItem) return null;
    
    const fullName = selectedItem.name;
    const upperQuery = autocompleteQuery.toUpperCase();
    const upperFullName = fullName.toUpperCase();
    
    if (upperFullName.startsWith(upperQuery)) {
      return fullName.substring(autocompleteQuery.length);
    }
    
    return null;
  }, [showAutocomplete, suggestions, autocompleteQuery, autocompleteSelectedIndex]);

  // Click-outside handler for menu
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

    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, onToggleMenu]);

  // Get plain text from contentEditable (strips HTML)
  const getPlainText = (element: HTMLElement): string => {
    // Reconstruct the text with proper mention syntax
    // Mentions are rendered as spans with data attributes, but we need the syntax
    let result = '';
    
    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        
        // If it's a mention span, reconstruct the syntax
        if (el.classList.contains(styles.mention)) {
          const name = el.getAttribute('data-mention-name');
          const type = el.getAttribute('data-mention-type');
          const id = el.getAttribute('data-mention-id');
          
          if (name && type && id) {
            // Reconstruct the mention syntax
            result += `@[${name}](${type}:${id})`;
          } else {
            // Fallback to text content
            result += el.textContent || '';
          }
        } else {
          // Process children recursively
          for (const child of Array.from(el.childNodes)) {
            processNode(child);
          }
        }
      }
    };
    
    for (const child of Array.from(element.childNodes)) {
      processNode(child);
    }
    
    return result;
  };

  // Set HTML content with mention spans
  const setContentWithMentions = (text: string, element: HTMLElement) => {
    const mentions = parseMentions(text);
    
    if (mentions.length === 0) {
      element.textContent = text;
      return;
    }

    // Build HTML with mention spans
    let html = '';
    let lastIndex = 0;

    mentions.forEach((mention) => {
      // Add text before mention (escape HTML)
      if (mention.startIndex > lastIndex) {
        const textBefore = text.substring(lastIndex, mention.startIndex);
        html += escapeHtml(textBefore);
      }

      // Display name with arrows instead of slashes for nested mentions
      const displayName = mention.name.replace(/\//g, '→');
      
      // Add mention span
      html += `<span class="${styles.mention}" data-mention-type="${mention.type}" data-mention-id="${mention.id}" data-mention-name="${mention.name}" contenteditable="false">@${escapeHtml(displayName)}</span>`;

      lastIndex = mention.endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      html += escapeHtml(text.substring(lastIndex));
    }

    element.innerHTML = html;
  };

  // Simple HTML escape
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Update contentEditable when block content changes externally
  useEffect(() => {
    if (contentEditableRef.current && document.activeElement !== contentEditableRef.current) {
      setContentWithMentions(block.content, contentEditableRef.current);
    }
  }, [block.content]);

  // Focus contentEditable when block becomes focused
  useEffect(() => {
    if (isFocused && contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, [isFocused]);

  // Handle mention click
  const handleMentionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(styles.mention)) {
      e.preventDefault();
      e.stopPropagation();
      const name = target.getAttribute('data-mention-name');
      const type = target.getAttribute('data-mention-type');
      const id = target.getAttribute('data-mention-id');
      alert(`Clicked: ${name} (${type}:${id})`);
    }
  };

  // Handle input change
  const handleInput = () => {
    if (!contentEditableRef.current) return;
    
    const text = getPlainText(contentEditableRef.current);
    onUpdate({ content: text });

    // Use the text we just extracted for all parsing (has proper mention syntax)
    const contentForParsing = text;

    // Check for slash command in empty block
    if (contentForParsing.startsWith('/')) {
      const query = contentForParsing.substring(1); // Remove leading "/"
      
      // Only show if no whitespace
      if (!query.includes(' ') && !query.includes('\n')) {
        setBlockTypeMenuQuery(query);
        setShowBlockTypeMenu(true);
        setSelectedBlockTypeIndex(0);
        updateBlockTypeMenuPosition();
        // Skip mention detection when slash command is active
        return;
      }
    }
    
    // Close menu if "/" removed or text doesn't start with "/"
    if (showBlockTypeMenu && !contentForParsing.startsWith('/')) {
      setShowBlockTypeMenu(false);
    }

    // Check for @ trigger (only if mentions allowed)
    if (!mentionsAllowed) {
      setShowAutocomplete(false);
      return;
    }

    // Get cursor position
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      setShowAutocomplete(false);
      return;
    }

    const cursorPos = getCursorPositionInText(contentForParsing);
    const textBeforeCursor = contentForParsing.substring(0, cursorPos);
    
    // Check for nested mention (typing / after a mention)
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    // If we have a slash after the last @, check if it's part of a mention path
    if (lastSlashIndex > lastAtIndex && lastAtIndex !== -1) {
      // Find the mention that contains this slash
      const mentions = parseMentions(contentForParsing);
      const currentMention = mentions.find(m => 
        m.startIndex <= lastSlashIndex && m.endIndex > lastSlashIndex
      );
      
      // If slash is inside a mention, it's part of the mention path, not a nested navigation trigger
      if (currentMention) {
        setShowAutocomplete(false);
        return;
      }
      
      // Check if there's a completed mention just before the slash
      const completedMention = mentions.find(m => m.endIndex === lastSlashIndex);
      
      if (completedMention && completedMention.segments.length < 3) {
        // We have a completed mention before the slash, and we're under the 3-level limit
        // Look up the entity to get its children
        const lastSegment = completedMention.segments[completedMention.segments.length - 1];
        const parentEntity = allEntities.find(e => e.id === lastSegment.id);
        
        if (parentEntity && parentEntity.children && parentEntity.children.length > 0) {
          // Show autocomplete with children of the parent entity
          const query = textBeforeCursor.substring(lastSlashIndex + 1);
          
          if (!query.includes(' ') && !query.includes('\n')) {
            setMentionPath(completedMention.segments.map(seg => {
              const entity = allEntities.find(e => e.id === seg.id);
              return entity!;
            }).filter(Boolean));
            setIsNestedMention(true);
            setMentionTriggerPos(completedMention.startIndex);
            setAutocompleteQuery(query);
            setShowAutocomplete(true);
            updateAutocompletePosition();
            return;
          }
        }
      }
    }
    
    // Normal @ mention detection
    if (lastAtIndex !== -1) {
      const query = textBeforeCursor.substring(lastAtIndex + 1);
      
      // Only show if no whitespace/newline and no slash (slash handled above)
      if (!query.includes(' ') && !query.includes('\n') && !query.includes('/')) {
        setMentionPath([]);
        setIsNestedMention(false);
        setMentionTriggerPos(lastAtIndex);
        setAutocompleteQuery(query);
        setShowAutocomplete(true);
        updateAutocompletePosition();
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  // Get cursor position in the plain text (with mention syntax)
  // This maps from rendered position to syntax position
  const getCursorPositionInText = (plainText: string): number => {
    if (!contentEditableRef.current) return 0;
    
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return 0;
    
    const range = sel.getRangeAt(0);
    let position = 0;
    let found = false;
    
    // Walk through all nodes in order, counting characters
    const walkNodes = (node: Node): boolean => {
      if (found) return true;
      
      if (node.nodeType === Node.TEXT_NODE) {
        // For text nodes, check if cursor is in this node
        if (range.endContainer === node) {
          position += range.endOffset;
          found = true;
          return true;
        } else {
          // Cursor is not in this text node, add full length
          position += (node.textContent || '').length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        
        // Special handling for mention spans
        if (el.classList.contains(styles.mention)) {
          // Reconstruct the mention syntax and add its length
          const name = el.getAttribute('data-mention-name');
          const type = el.getAttribute('data-mention-type');
          const id = el.getAttribute('data-mention-id');
          
          if (name && type && id) {
            const mentionSyntax = `@[${name}](${type}:${id})`;
            position += mentionSyntax.length;
          } else {
            // Fallback to text content
            position += (el.textContent || '').length;
          }
          
          // Don't process children of mention span (they're already counted)
          // And DON'T stop here - cursor might be after this span
          return false;
        }
        
        // For other elements, process children
        for (const child of Array.from(el.childNodes)) {
          if (walkNodes(child)) {
            return true; // Found cursor, stop
          }
        }
      }
      
      return false;
    };
    
    // Process all children of contentEditable
    for (const child of Array.from(contentEditableRef.current.childNodes)) {
      if (walkNodes(child)) {
        break;
      }
    }
    
    return position;
  };

  // Update autocomplete position
  const updateAutocompletePosition = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // Get the editor block's bounding rect for relative positioning
    const editorRect = blockRef.current?.getBoundingClientRect();
    if (!editorRect) return;

    // Position relative to the block, below the cursor line
    setAutocompletePosition({
      top: rect.bottom - editorRect.top + 4, // Below cursor with small gap
      left: rect.left - editorRect.left
    });
  };

  // Update block type menu position
  const updateBlockTypeMenuPosition = () => {
    if (!contentEditableRef.current) return;
    
    const rect = contentEditableRef.current.getBoundingClientRect();
    setBlockTypeMenuPosition({
      top: rect.bottom + 4,
      left: rect.left
    });
  };

  // Insert mention
  const insertMention = useCallback((entity: MentionableEntity, method: 'enter' | 'tab' | 'click') => {
    if (!contentEditableRef.current || mentionTriggerPos === null) return;

    const text = block.content;
    const cursorPos = getCursorPositionInText(text);
    const beforeTrigger = text.substring(0, mentionTriggerPos);
    const afterCursor = text.substring(cursorPos);
    
    // Build mention text (nested or simple)
    let mentionText: string;
    if (isNestedMention && mentionPath.length > 0) {
      // Build nested path: @[Parent/Child](parentType:parentId/childType:childId)
      const pathNames = [...mentionPath.map(e => e.name), entity.name].join('/');
      const pathTypeIds = [...mentionPath.map(e => `${e.type}:${e.id}`), `${entity.type}:${entity.id}`].join('/');
      mentionText = `@[${pathNames}](${pathTypeIds})`;
    } else {
      // Simple mention: @[Name](type:id)
      mentionText = `@[${entity.name}](${entity.type}:${entity.id})`;
    }
    
    // Check if we should continue to nested (Tab key + entity has children + not at max depth)
    const shouldContinueNested = 
      method === 'tab' && 
      entity.children && 
      entity.children.length > 0 &&
      (isNestedMention ? mentionPath.length < 2 : true); // Max 3 levels (0, 1, 2)
    
    // If continuing to nested, add "/" after mention, otherwise just mention
    const suffix = shouldContinueNested ? '/' : '';
    const newContent = beforeTrigger + mentionText + suffix + afterCursor;

    // Update content
    onUpdate({ content: newContent });
    
    // If continuing to nested, set up nested autocomplete
    if (shouldContinueNested) {
      // Update mention path to include this entity
      const newPath = isNestedMention ? [...mentionPath, entity] : [entity];
      setMentionPath(newPath);
      setIsNestedMention(true);
      setMentionTriggerPos(mentionTriggerPos); // Keep same trigger position
      setAutocompleteQuery(''); // Empty query to show all children
      setShowAutocomplete(true); // Keep autocomplete open
      
      // Update position after DOM updates
      requestAnimationFrame(() => {
        updateAutocompletePosition();
      });
    } else {
      // Close autocomplete
      handleCloseAutocomplete();
      setMentionTriggerPos(null);
      setMentionPath([]);
      setIsNestedMention(false);
    }

    // Focus and position cursor
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!contentEditableRef.current) return;
        
        const element = contentEditableRef.current;
        element.focus();
        
        if (shouldContinueNested) {
          // Position cursor after the "/" for continued typing
          const range = document.createRange();
          const sel = window.getSelection();
          if (sel) {
            // Find the text node that contains the "/"
            const findSlashPosition = (node: Node): { node: Node; offset: number } | null => {
              if (node.nodeType === Node.TEXT_NODE) {
                const slashIndex = node.textContent?.lastIndexOf('/');
                if (slashIndex !== undefined && slashIndex !== -1) {
                  return { node, offset: slashIndex + 1 };
                }
              }
              for (let i = 0; i < node.childNodes.length; i++) {
                const result = findSlashPosition(node.childNodes[i]);
                if (result) return result;
              }
              return null;
            };
            
            const slashPos = findSlashPosition(element);
            if (slashPos) {
              range.setStart(slashPos.node, slashPos.offset);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
          return;
        }
        
        // Find all mention spans for non-nested completion
        const mentionSpans = element.querySelectorAll(`.${styles.mention}`);
        
        if (mentionSpans.length === 0) {
          // No mentions rendered yet, position at end
          const range = document.createRange();
          const sel = window.getSelection();
          if (sel) {
            range.selectNodeContents(element);
            range.collapse(false); // Collapse to end
            sel.removeAllRanges();
            sel.addRange(range);
          }
          return;
        }
        
        // Find the mention span we just inserted by matching the entity ID
        let targetMention: Element | null = null;
        for (const span of Array.from(mentionSpans)) {
          const mentionId = span.getAttribute('data-mention-id');
          if (mentionId === entity.id) {
            targetMention = span;
            break;
          }
        }
        
        if (!targetMention) {
          // Fallback: use the last mention span
          targetMention = mentionSpans[mentionSpans.length - 1];
        }
        
        // Position cursor right after the mention span
        const sel = window.getSelection();
        if (sel && targetMention) {
          const range = document.createRange();
          
          // Set cursor after the mention span
          const parent = targetMention.parentNode;
          if (parent) {
            const mentionIndex = Array.from(parent.childNodes).indexOf(targetMention as ChildNode);
            
            // Check if there's a text node after the mention
            const nextNode = parent.childNodes[mentionIndex + 1];
            if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
              // Position at start of next text node
              range.setStart(nextNode, 0);
              range.collapse(true);
            } else {
              // No text node after, insert a zero-width space to position cursor
              const textNode = document.createTextNode('');
              parent.insertBefore(textNode, targetMention.nextSibling);
              range.setStart(textNode, 0);
              range.collapse(true);
            }
            
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      });
    });
  }, [block.content, mentionTriggerPos, isNestedMention, mentionPath, onUpdate, handleCloseAutocomplete]);

  // Select block type from slash command
  const selectBlockType = (type: BlockType) => {
    // For tables, initialize with default 2x2 grid
    const updates: Partial<ContentBlock> = { type, content: '' };
    if (type === 'table') {
      updates.tableData = {
        rows: [
          ['', ''],
          ['', '']
        ],
        hasHeader: true
      };
    }
    
    // Change block type and clear content
    onUpdate(updates);
    
    // Directly clear contentEditable (useEffect guard might prevent update when focused)
    if (contentEditableRef.current) {
      contentEditableRef.current.textContent = '';
    }
    
    // Close menu
    setShowBlockTypeMenu(false);
    setBlockTypeMenuQuery('');
    
    // Focus block
    setTimeout(() => {
      if (contentEditableRef.current) {
        contentEditableRef.current.focus();
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // PRIORITY 1: Mention Autocomplete
    // Let autocomplete handle keyboard events first if it's showing
    if (showAutocomplete && suggestions.length > 0 && mentionsAllowed) {
      // Delegate to Autocomplete - simple direct call, no ref needed
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseAutocomplete();
        return;
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setAutocompleteSelectedIndex(i => (i + 1) % suggestions.length);
        return;
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setAutocompleteSelectedIndex(i => (i - 1 + suggestions.length) % suggestions.length);
        return;
      }
      
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (suggestions[autocompleteSelectedIndex]) {
          insertMention(suggestions[autocompleteSelectedIndex], e.key === 'Tab' ? 'tab' : 'enter');
        }
        return;
      }
    }

    // PRIORITY 2: Block Type Menu (slash command)
    if (showBlockTypeMenu && blockTypeOptions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBlockTypeIndex(i => (i + 1) % blockTypeOptions.length);
        return;
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedBlockTypeIndex(i => (i - 1 + blockTypeOptions.length) % blockTypeOptions.length);
        return;
      }
      
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (blockTypeOptions[selectedBlockTypeIndex]) {
          selectBlockType(blockTypeOptions[selectedBlockTypeIndex].type);
        }
        return;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowBlockTypeMenu(false);
        return;
      }
    }

    // PRIORITY 3: Normal block operations (only if no menus showing)
    // Enter creates new block (same type for lists/checkboxes, paragraph for others)
    if (e.key === 'Enter' && !e.shiftKey && block.type !== 'code') {
      e.preventDefault();
      // For lists and checkboxes, create same type. For others, create paragraph.
      const newBlockType = (block.type === 'bulletList' || block.type === 'numberedList' || block.type === 'checkbox') 
        ? block.type 
        : 'paragraph';
      onAddBlock(newBlockType);
      return;
    }

    // Backspace on empty block - lists/checkboxes convert to paragraph first, then delete
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      
      // If it's a list or checkbox, convert to paragraph
      if (block.type === 'bulletList' || block.type === 'numberedList' || block.type === 'checkbox') {
        onUpdate({ type: 'paragraph' });
        
        // Focus contentEditable after conversion
        setTimeout(() => {
          if (contentEditableRef.current) {
            contentEditableRef.current.focus();
          }
        }, 0);
        return;
      }
      
      // Otherwise delete the block
      onDelete();
      return;
    }

    // Cmd/Ctrl + Up/Down to move blocks
    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp' && !isFirst) {
      e.preventDefault();
      onMoveUp();
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown' && !isLast) {
      e.preventDefault();
      onMoveDown();
      return;
    }

    // Escape closes menu
    if (e.key === 'Escape' && showMenu) {
      e.preventDefault();
      onToggleMenu(false);
      return;
    }
  };

  const renderBlockContent = () => {
    if (block.type === 'divider') {
      return <hr className={styles.rteDivider} />;
    }

    if (block.type === 'table') {
      return (
        <TableBlock
          tableData={block.tableData || { rows: [['', '']], hasHeader: false }}
          readOnly={readOnly}
          onUpdate={(tableData) => onUpdate({ tableData })}
          onFocus={onFocus}
        />
      );
    }

    if (block.type === 'checkbox') {
      return (
        <div className={styles.rteCheckboxBlock}>
          <input
            type="checkbox"
            checked={block.checked || false}
            onChange={(e) => onUpdate({ checked: e.target.checked })}
            className={styles.rteCheckbox}
          />
          <div
            ref={contentEditableRef}
            contentEditable={!readOnly}
            onInput={handleInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            onClick={handleMentionClick}
            className={`${styles.rteContentEditable} ${styles.rteCheckboxText}`}
            data-placeholder={getPlaceholder(block.type)}
            suppressContentEditableWarning
          />
        </div>
      );
    }

    if (block.type === 'bulletList' || block.type === 'numberedList') {
      return (
        <div className={styles.rteListBlock}>
          <span className={styles.rteListMarker}>
            {block.type === 'bulletList' ? '•' : '1.'}
          </span>
          <div
            ref={contentEditableRef}
            contentEditable={!readOnly}
            onInput={handleInput}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            onClick={handleMentionClick}
            className={styles.rteContentEditable}
            data-placeholder={getPlaceholder(block.type)}
            suppressContentEditableWarning
          />
        </div>
      );
    }

    // Standard content editable for other block types
    const classNames = [styles.rteContentEditable];
    
    if (block.type === 'heading1') classNames.push(styles.rteH1);
    else if (block.type === 'heading2') classNames.push(styles.rteH2);
    else if (block.type === 'heading3') classNames.push(styles.rteH3);
    else if (block.type === 'code') classNames.push(styles.rteCode);
    else if (block.type === 'quote') classNames.push(styles.rteQuote);
    else if (block.type === 'callout') classNames.push(styles.rteCallout);

    return (
      <div
        ref={contentEditableRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onClick={handleMentionClick}
        className={classNames.join(' ')}
        data-placeholder={getPlaceholder(block.type)}
        suppressContentEditableWarning
      />
    );
  };

  return (
    <>
      {/* Drag indicator - horizontal line BEFORE */}
      {isDragOver && dragPosition === 'before' && (
        <div className={styles.rteDragIndicator} />
      )}
      
      <div
        ref={blockRef}
        className={`${styles.rteBlock} ${isFocused ? styles.focused : ''} ${isDragging ? styles.dragging : ''}`}
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
        <div className={styles.rteBlockControls}>
          <button
            className={styles.rteDragHandle}
            title="Drag to reorder or click for options"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleMenu(!showMenu);
            }}
            tabIndex={-1}
          >
            {/* CARBON_CONVERT: Replace GripVertical with <Draggable /> */}
            <GripVertical size={16} />
          </button>

          {showMenu && (
            <div ref={menuRef} className={styles.rteBlockMenu}>
              <div className={styles.rteMenuSection}>
                <button onClick={onMoveUp} disabled={isFirst}>
                  Move Up
                </button>
                <button onClick={onMoveDown} disabled={isLast}>
                  Move Down
                </button>
              </div>
              <div className={styles.rteMenuSection}>
                {/* CARBON_CONVERT: Replace native select with Carbon Select */}
                <label className={styles.rteMenuLabel}>Block Type</label>
                <select
                  value={block.type}
                  onChange={(e) => {
                    onUpdate({ type: e.target.value as BlockType });
                    onToggleMenu(false);
                  }}
                >
                  {BLOCK_TYPES.map(({ type, label }) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.rteMenuSection}>
                <button onClick={onDelete} className={styles.rteDeleteBtn}>
                  {/* CARBON_CONVERT: Replace Trash2 with <TrashCan /> */}
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.rteBlockContent}>
          {renderBlockContent()}
          
          {/* Mention autocomplete - use shared Autocomplete component */}
          {showAutocomplete && suggestions.length > 0 && mentionsAllowed && (
            <Autocomplete
              ref={autocompleteRef}
              suggestions={suggestions}
              query={autocompleteQuery}
              position={autocompletePosition}
              onSelect={insertMention}
              onClose={handleCloseAutocomplete}
              onSelectedIndexChange={setAutocompleteSelectedIndex}
              renderItem={(entity, isSelected) => (
                <>
                  <div className={styles.suggestionMain}>
                    <div className={styles.suggestionLabel}>
                      {entity.icon && <span className={styles.entityIcon}>{entity.icon}</span>}
                      <span className={styles.entityName}>{entity.name}</span>
                    </div>
                    {entity.badge && (
                      <span className={styles.entityBadge}>{entity.badge}</span>
                    )}
                  </div>
                  {entity.description && (
                    <div className={styles.suggestionDescription}>{entity.description}</div>
                  )}
                </>
              )}
              hintText="↑↓ Navigate · ⏎ Select · Tab Continue · Esc Close"
            />
          )}
          
          {/* Ghost typeahead text */}
          {ghostTextData && mentionsAllowed && (
            <span 
              className={styles.rteGhostText}
              style={{
                top: `${autocompletePosition.top - 24}px`, // Same line as cursor (autocomplete is positioned below, so offset up)
                left: `${autocompletePosition.left + (autocompleteQuery.length * 8)}px`, // Offset by query width
              }}
            >
              {ghostTextData}
            </span>
          )}
          
          {/* Block type menu (slash command) */}
          {showBlockTypeMenu && blockTypeOptions.length > 0 && (
            <BlockTypeMenu
              query={blockTypeMenuQuery}
              selectedIndex={selectedBlockTypeIndex}
              position={blockTypeMenuPosition}
              onSelect={selectBlockType}
              onHover={setSelectedBlockTypeIndex}
            />
          )}
        </div>
      </div>
      
      {/* Drag indicator - horizontal line AFTER */}
      {isDragOver && dragPosition === 'after' && (
        <div className={styles.rteDragIndicator} />
      )}
    </>
  );
};

/**
 * TableBlock Component
 * 
 * Editable table with add/remove row/column functionality.
 */
interface TableBlockProps {
  tableData: { rows: string[][]; hasHeader?: boolean };
  readOnly: boolean;
  onUpdate: (tableData: { rows: string[][]; hasHeader?: boolean }) => void;
  onFocus: () => void;
}

const TableBlock: React.FC<TableBlockProps> = ({ tableData, readOnly, onUpdate, onFocus }) => {
  const { rows, hasHeader = false } = tableData;

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = rows.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    );
    onUpdate({ rows: newRows, hasHeader });
  };

  const addRow = () => {
    const colCount = rows[0]?.length || 2;
    const newRow = Array(colCount).fill('');
    onUpdate({ rows: [...rows, newRow], hasHeader });
  };

  const addColumn = () => {
    const newRows = rows.map(row => [...row, '']);
    onUpdate({ rows: newRows, hasHeader });
  };

  const deleteRow = (rowIndex: number) => {
    if (rows.length <= 1) return; // Keep at least 1 row
    const newRows = rows.filter((_, idx) => idx !== rowIndex);
    onUpdate({ rows: newRows, hasHeader });
  };

  const deleteColumn = (colIndex: number) => {
    if (rows[0]?.length <= 1) return; // Keep at least 1 column
    const newRows = rows.map(row => row.filter((_, idx) => idx !== colIndex));
    onUpdate({ rows: newRows, hasHeader });
  };

  const toggleHeader = () => {
    onUpdate({ rows, hasHeader: !hasHeader });
  };

  return (
    <div className={styles.rteTableWrapper}>
      <div className={styles.rteTableControls}>
        {/* CARBON_CONVERT: Replace buttons with Carbon Button components */}
        <button onClick={addRow} className={styles.rteTableBtn} title="Add row">
          <Plus size={14} /> Row
        </button>
        <button onClick={addColumn} className={styles.rteTableBtn} title="Add column">
          <Plus size={14} /> Column
        </button>
        <button onClick={toggleHeader} className={styles.rteTableBtn} title="Toggle header">
          {hasHeader ? '☑' : '☐'} Header
        </button>
      </div>
      
      <table className={styles.rteTable}>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx === 0 && hasHeader ? styles.rteTableHeaderRow : ''}>
              {row.map((cell, colIdx) => (
                <td key={colIdx} className={styles.rteTableCell}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                    onFocus={onFocus}
                    readOnly={readOnly}
                    className={styles.rteTableInput}
                    placeholder={rowIdx === 0 && hasHeader ? 'Header' : ''}
                  />
                  {!readOnly && rowIdx === 0 && (
                    <button
                      onClick={() => deleteColumn(colIdx)}
                      className={styles.rteTableDeleteCol}
                      title="Delete column"
                    >
                      ×
                    </button>
                  )}
                </td>
              ))}
              {!readOnly && (
                <td className={styles.rteTableActionCell}>
                  <button
                    onClick={() => deleteRow(rowIdx)}
                    className={styles.rteTableDeleteRow}
                    title="Delete row"
                  >
                    ×
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getPlaceholder(type: BlockType): string {
  switch (type) {
    case 'heading1': return 'Heading 1';
    case 'heading2': return 'Heading 2';
    case 'heading3': return 'Heading 3';
    case 'code': return '// Enter code here';
    case 'quote': return 'Enter quote...';
    case 'callout': return 'Enter callout message...';
    case 'checkbox': return 'To-do item';
    case 'bulletList':
    case 'numberedList': return 'List item';
    default: return 'Type @ to mention...';
  }
}