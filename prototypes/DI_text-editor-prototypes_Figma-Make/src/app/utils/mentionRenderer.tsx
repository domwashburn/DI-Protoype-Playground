/**
 * Mention Renderer Utility
 * 
 * Parses @mention syntax and renders as styled React elements.
 * 
 * **Nested Mention Format:**
 * - Simple: @[Entity Name](type:id)
 * - Nested: @[Parent/Child](parentType:parentId/childType:childId)
 * - Max 3 levels: @[Root/Level1/Level2](type1:id1/type2:id2/type3:id3)
 * 
 * **Display Format:**
 * - Slashes (/) in data are rendered as arrows (→) in UI
 * - Example: @[Dashboard/KPI](dashboard:d1/kpi:k1) → @Dashboard→KPI
 */

import React from 'react';

/**
 * Mention segment (one level in the path)
 */
export interface MentionSegment {
  /** Display name */
  name: string;
  /** Entity type */
  type: string;
  /** Entity ID */
  id: string;
}

/**
 * Mention data extracted from text
 */
export interface ParsedMention {
  /** Full match text including @ */
  fullMatch: string;
  /** Entity display name (full path with /) */
  name: string;
  /** Entity type (of leaf node) */
  type: string;
  /** Entity ID (of leaf node) */
  id: string;
  /** Path segments (for nested mentions) */
  segments: MentionSegment[];
  /** Whether this is a nested mention */
  isNested: boolean;
  /** Start index in text */
  startIndex: number;
  /** End index in text */
  endIndex: number;
}

/**
 * Regex pattern to match @[Name](type:id) or @[Name1/Name2](type1:id1/type2:id2) syntax
 */
const MENTION_PATTERN = /@\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Parse mentions from text
 */
export function parseMentions(text: string): ParsedMention[] {
  const mentions: ParsedMention[] = [];
  let match: RegExpExecArray | null;
  
  // Reset regex state
  MENTION_PATTERN.lastIndex = 0;
  
  while ((match = MENTION_PATTERN.exec(text)) !== null) {
    const fullMatch = match[0];
    const namesPath = match[1]; // e.g., "Dashboard/KPI" or "Document/Section/Subsection"
    const typesIdsPath = match[2]; // e.g., "dashboard:d1/kpi:k1"
    
    // Split by / to get segments
    const nameSegments = namesPath.split('/');
    const typeIdSegments = typesIdsPath.split('/');
    
    // Parse each segment
    const segments: MentionSegment[] = [];
    for (let i = 0; i < typeIdSegments.length; i++) {
      const [type, id] = typeIdSegments[i].split(':');
      const name = nameSegments[i] || '';
      segments.push({ name, type, id });
    }
    
    // Last segment is the leaf
    const lastSegment = segments[segments.length - 1];
    
    mentions.push({
      fullMatch,
      name: namesPath,
      type: lastSegment.type,
      id: lastSegment.id,
      segments,
      isNested: segments.length > 1,
      startIndex: match.index,
      endIndex: match.index + match[0].length
    });
  }
  
  return mentions;
}

/**
 * Render text with styled mentions
 * 
 * @param text - Raw text with @mention syntax
 * @param onMentionClick - Optional click handler for mentions
 * @returns Array of React elements (text + styled mentions)
 */
export function renderTextWithMentions(
  text: string,
  onMentionClick?: (mention: ParsedMention) => void,
  className?: string
): React.ReactNode[] {
  const mentions = parseMentions(text);
  
  if (mentions.length === 0) {
    return [text];
  }
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  
  mentions.forEach((mention, i) => {
    // Add text before mention
    if (mention.startIndex > lastIndex) {
      elements.push(
        <span key={`text-${i}`}>
          {text.substring(lastIndex, mention.startIndex)}
        </span>
      );
    }
    
    // Add styled mention
    elements.push(
      <span
        key={`mention-${i}`}
        className={className || 'mention'}
        data-mention-type={mention.type}
        data-mention-id={mention.id}
        onClick={() => onMentionClick?.(mention)}
        style={{ cursor: onMentionClick ? 'pointer' : 'default' }}
      >
        @{mention.name.replace(/\//g, '→')}
      </span>
    );
    
    lastIndex = mention.endIndex;
  });
  
  // Add remaining text after last mention
  if (lastIndex < text.length) {
    elements.push(
      <span key="text-end">
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return elements;
}

/**
 * Check if text contains mentions
 */
export function hasMentions(text: string): boolean {
  MENTION_PATTERN.lastIndex = 0;
  return MENTION_PATTERN.test(text);
}

/**
 * Extract all unique entity IDs from text
 */
export function extractMentionedEntityIds(text: string): string[] {
  const mentions = parseMentions(text);
  return [...new Set(mentions.map(m => m.id))];
}

/**
 * Replace mention text (useful for entity renames)
 */
export function replaceMentionName(
  text: string,
  entityId: string,
  newName: string
): string {
  const mentions = parseMentions(text);
  let result = text;
  
  // Replace from end to start to preserve indices
  mentions
    .filter(m => m.id === entityId)
    .reverse()
    .forEach(mention => {
      const newMention = `@[${newName}](${mention.type}:${mention.id})`;
      result = 
        result.substring(0, mention.startIndex) +
        newMention +
        result.substring(mention.endIndex);
    });
  
  return result;
}