/**
 * Conversation React Hooks
 * 
 * Custom hooks for accessing and filtering conversations data.
 */

import { useMemo } from 'react';
import { conversations } from '../chats/conversations';
import type { Conversation, ConversationFilter, ConversationSort } from '../chats/types';

/**
 * Hook options
 */
export interface UseConversationsOptions {
  filter?: ConversationFilter;
  sort?: ConversationSort;
}

/**
 * Get all conversations with optional filtering and sorting
 */
export function useConversations(options?: UseConversationsOptions) {
  const filtered = useMemo(() => {
    return filterConversations(conversations, options?.filter);
  }, [options?.filter]);

  const sorted = useMemo(() => {
    return sortConversations(filtered, options?.sort);
  }, [filtered, options?.sort]);

  const stats = useMemo(() => {
    return {
      total: sorted.length,
      active: sorted.filter(c => c.status === 'active').length,
      archived: sorted.filter(c => c.status === 'archived').length,
      withArtifacts: sorted.filter(c => c.artifactCount > 0).length,
      favorites: sorted.filter(c => c.isFavorite).length,
      pinned: sorted.filter(c => c.isPinned).length,
    };
  }, [sorted]);

  return {
    conversations: sorted,
    count: sorted.length,
    ...stats,
  };
}

/**
 * Get single conversation by ID
 */
export function useConversation(id: string) {
  const conversation = useMemo(() => {
    return conversations.find(c => c.id === id);
  }, [id]);

  return {
    conversation,
    isLoading: false,
    error: conversation ? null : new Error(`Conversation ${id} not found`),
  };
}

/**
 * Get conversations by type
 */
export function useConversationsByType(type: Conversation['type']) {
  const filtered = useMemo(() => {
    return conversations.filter(c => c.type === type);
  }, [type]);

  return {
    conversations: filtered,
    count: filtered.length,
  };
}

/**
 * Get conversations for specific automation
 */
export function useConversationsByAutomation(automationId: string) {
  const filtered = useMemo(() => {
    return conversations.filter(c => c.contextAutomationId === automationId);
  }, [automationId]);

  return {
    conversations: filtered,
    count: filtered.length,
  };
}

/**
 * Get pinned conversations
 */
export function usePinnedConversations() {
  const pinned = useMemo(() => {
    return conversations.filter(c => c.isPinned);
  }, []);

  return {
    conversations: pinned,
    count: pinned.length,
  };
}

/**
 * Get favorite conversations
 */
export function useFavoriteConversations() {
  const favorites = useMemo(() => {
    return conversations.filter(c => c.isFavorite);
  }, []);

  return {
    conversations: favorites,
    count: favorites.length,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function filterConversations(
  conversations: Conversation[],
  filter?: ConversationFilter
): Conversation[] {
  if (!filter) return conversations;

  return conversations.filter(conversation => {
    // Status filter
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      if (!statuses.includes(conversation.status)) return false;
    }

    // Type filter
    if (filter.type) {
      const types = Array.isArray(filter.type) ? filter.type : [filter.type];
      if (!types.includes(conversation.type)) return false;
    }

    // User filter
    if (filter.userId && conversation.userId !== filter.userId) return false;

    // Context filters
    if (filter.contextAutomationId && conversation.contextAutomationId !== filter.contextAutomationId) return false;
    if (filter.contextServiceId && conversation.contextServiceId !== filter.contextServiceId) return false;
    if (filter.contextAssetId && conversation.contextAssetId !== filter.contextAssetId) return false;

    // Boolean filters
    if (filter.isFavorite !== undefined && conversation.isFavorite !== filter.isFavorite) return false;
    if (filter.isPinned !== undefined && conversation.isPinned !== filter.isPinned) return false;
    if (filter.isShared !== undefined && conversation.isShared !== filter.isShared) return false;
    if (filter.hasArtifacts !== undefined && (conversation.artifactCount > 0) !== filter.hasArtifacts) return false;

    // Date filters
    if (filter.createdAfter && new Date(conversation.createdDate) < new Date(filter.createdAfter)) return false;
    if (filter.createdBefore && new Date(conversation.createdDate) > new Date(filter.createdBefore)) return false;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const titleMatch = conversation.title.toLowerCase().includes(searchLower);
      const descMatch = conversation.description?.toLowerCase().includes(searchLower);
      if (!titleMatch && !descMatch) return false;
    }

    return true;
  });
}

function sortConversations(
  conversations: Conversation[],
  sort?: ConversationSort
): Conversation[] {
  if (!sort) {
    // Default sort: most recent first
    return [...conversations].sort((a, b) => 
      new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
    );
  }

  return [...conversations].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'createdDate':
        aValue = new Date(a.createdDate).getTime();
        bValue = new Date(b.createdDate).getTime();
        break;
      case 'lastMessageDate':
        aValue = new Date(a.lastMessageDate).getTime();
        bValue = new Date(b.lastMessageDate).getTime();
        break;
      case 'messageCount':
        aValue = a.messageCount;
        bValue = b.messageCount;
        break;
      case 'artifactCount':
        aValue = a.artifactCount;
        bValue = b.artifactCount;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}
