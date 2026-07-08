/**
 * Messages React Hooks
 * 
 * Custom hooks for accessing and filtering chat messages data.
 */

import { useMemo } from 'react';
import { messages, assetReferences } from '../chats/messages';
import type { Message, MessageFilter, MessageSort, AssetReference } from '../chats/types';

/**
 * Hook options
 */
export interface UseMessagesOptions {
  filter?: MessageFilter;
  sort?: MessageSort;
}

/**
 * Get all messages with optional filtering and sorting
 */
export function useMessages(options?: UseMessagesOptions) {
  const filtered = useMemo(() => {
    return filterMessages(messages, options?.filter);
  }, [options?.filter]);

  const sorted = useMemo(() => {
    return sortMessages(filtered, options?.sort);
  }, [filtered, options?.sort]);

  const stats = useMemo(() => {
    return {
      total: sorted.length,
      user: sorted.filter(m => m.role === 'user').length,
      assistant: sorted.filter(m => m.role === 'assistant').length,
      system: sorted.filter(m => m.role === 'system').length,
      withArtifacts: sorted.filter(m => m.artifactIds && m.artifactIds.length > 0).length,
      withAssetRefs: sorted.filter(m => m.assetReferenceIds && m.assetReferenceIds.length > 0).length,
    };
  }, [sorted]);

  return {
    messages: sorted,
    count: sorted.length,
    ...stats,
  };
}

/**
 * Get single message by ID
 */
export function useMessage(id: string) {
  const message = useMemo(() => {
    return messages.find(m => m.id === id);
  }, [id]);

  return {
    message,
    isLoading: false,
    error: message ? null : new Error(`Message ${id} not found`),
  };
}

/**
 * Get messages for a specific conversation
 */
export function useConversationMessages(conversationId: string) {
  const filtered = useMemo(() => {
    return messages.filter(m => m.conversationId === conversationId);
  }, [conversationId]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [filtered]);

  return {
    messages: sorted,
    count: sorted.length,
  };
}

/**
 * Get messages by role
 */
export function useMessagesByRole(role: Message['role']) {
  const filtered = useMemo(() => {
    return messages.filter(m => m.role === role);
  }, [role]);

  return {
    messages: filtered,
    count: filtered.length,
  };
}

/**
 * Get messages that have artifacts
 */
export function useMessagesWithArtifacts() {
  const filtered = useMemo(() => {
    return messages.filter(m => m.artifactIds && m.artifactIds.length > 0);
  }, []);

  return {
    messages: filtered,
    count: filtered.length,
  };
}

/**
 * Get messages that have asset references
 */
export function useMessagesWithAssetReferences() {
  const filtered = useMemo(() => {
    return messages.filter(m => m.assetReferenceIds && m.assetReferenceIds.length > 0);
  }, []);

  return {
    messages: filtered,
    count: filtered.length,
  };
}

/**
 * Get asset references for a message
 */
export function useMessageAssetReferences(messageId: string) {
  const refs = useMemo(() => {
    return assetReferences.filter(ref => ref.messageId === messageId);
  }, [messageId]);

  return {
    references: refs,
    count: refs.length,
  };
}

/**
 * Get all asset references
 */
export function useAssetReferences() {
  return {
    references: assetReferences,
    count: assetReferences.length,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function filterMessages(
  messages: Message[],
  filter?: MessageFilter
): Message[] {
  if (!filter) return messages;

  return messages.filter(message => {
    // Conversation filter
    if (filter.conversationId && message.conversationId !== filter.conversationId) return false;

    // Role filter
    if (filter.role) {
      const roles = Array.isArray(filter.role) ? filter.role : [filter.role];
      if (!roles.includes(message.role)) return false;
    }

    // Status filter
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      if (!statuses.includes(message.status)) return false;
    }

    // Artifact filter
    if (filter.hasArtifacts !== undefined) {
      const hasArtifacts = message.artifactIds && message.artifactIds.length > 0;
      if (hasArtifacts !== filter.hasArtifacts) return false;
    }

    // Asset reference filter
    if (filter.hasAssetReferences !== undefined) {
      const hasRefs = message.assetReferenceIds && message.assetReferenceIds.length > 0;
      if (hasRefs !== filter.hasAssetReferences) return false;
    }

    // Date filters
    if (filter.after && new Date(message.timestamp) < new Date(filter.after)) return false;
    if (filter.before && new Date(message.timestamp) > new Date(filter.before)) return false;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const contentMatch = message.content.toLowerCase().includes(searchLower);
      if (!contentMatch) return false;
    }

    return true;
  });
}

function sortMessages(
  messages: Message[],
  sort?: MessageSort
): Message[] {
  if (!sort) {
    // Default sort: chronological
    return [...messages].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  return [...messages].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'timestamp':
        aValue = new Date(a.timestamp).getTime();
        bValue = new Date(b.timestamp).getTime();
        break;
      case 'role':
        aValue = a.role;
        bValue = b.role;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}
