/**
 * Automation Relationships React Hooks
 * 
 * Custom hooks for accessing bidirectional relationships between automations and other entities:
 * - Automation → Objectives (strategic alignment)
 * - Automation → Conversations (AI generation tracking)
 * 
 * These hooks provide type-safe, performant access to related data with proper
 * memoization and null-safety handling.
 * 
 * @module useAutomationRelationships
 */

import { useMemo } from 'react';
// Fixed: no `automations.ts` file exists at this path. `decisionAutomations` is
// re-exported from the barrel (index.ts) as `allAutomations as decisionAutomations`.
import { decisionAutomations } from '../automations';
import { businessObjectives } from '../objectives/objectives';
import { conversations } from '../chats/conversations';
import type { DecisionAutomation } from '../automations/types';
import type { BusinessObjective } from '../objectives/types';
import type { Conversation } from '../chats/types';

// ============================================================================
// AUTOMATION → OBJECTIVES RELATIONSHIPS
// ============================================================================

/**
 * Get objectives linked to a specific automation
 * 
 * This hook provides bidirectional lookup by checking:
 * 1. automation.linkedObjectiveIds (forward reference)
 * 2. objective.automationIds (backward reference)
 * 
 * This dual-check ensures data consistency even if one direction is missing.
 * 
 * @param automationId - The automation ID to look up
 * @returns Object containing linked objectives and metadata
 * 
 * @example
 * ```tsx
 * const { objectives, count, isEmpty } = useAutomationObjectives('automation-6-24-20');
 * 
 * if (isEmpty) {
 *   return <EmptyState message="No linked objectives" />;
 * }
 * 
 * return objectives.map(obj => <ObjectiveCard key={obj.id} objective={obj} />);
 * ```
 */
export function useAutomationObjectives(automationId: string | undefined) {
  const result = useMemo(() => {
    if (!automationId) {
      return {
        objectives: [],
        count: 0,
        isEmpty: true,
        automation: null,
      };
    }

    // Find the automation
    const automation = decisionAutomations.find(a => a.id === automationId);
    
    if (!automation) {
      return {
        objectives: [],
        count: 0,
        isEmpty: true,
        automation: null,
      };
    }

    // Bidirectional lookup strategy:
    // 1. Get objectives explicitly linked from automation
    const forwardLinked = automation.linkedObjectiveIds 
      ? businessObjectives.filter(obj => automation.linkedObjectiveIds?.includes(obj.id))
      : [];

    // 2. Get objectives that reference this automation
    const backwardLinked = businessObjectives.filter(obj => 
      obj.automationIds.includes(automationId)
    );

    // 3. Merge and deduplicate
    const allObjectives = [...forwardLinked];
    backwardLinked.forEach(obj => {
      if (!allObjectives.find(o => o.id === obj.id)) {
        allObjectives.push(obj);
      }
    });

    // Sort by priority (critical first) then by progress
    const sorted = allObjectives.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.progress - a.progress;
    });

    return {
      objectives: sorted,
      count: sorted.length,
      isEmpty: sorted.length === 0,
      automation,
    };
  }, [automationId]);

  return result;
}

/**
 * Get automation statistics related to objectives
 * 
 * Provides aggregated metrics about how the automation contributes
 * to strategic objectives.
 * 
 * @param automationId - The automation ID to analyze
 * @returns Statistics object with objective-related metrics
 * 
 * @example
 * ```tsx
 * const stats = useAutomationObjectiveStats('automation-6-24-20');
 * 
 * return (
 *   <div>
 *     <Metric label="Linked Objectives" value={stats.linkedCount} />
 *     <Metric label="Avg Progress" value={`${stats.avgProgress}%`} />
 *     <Metric label="Critical" value={stats.criticalCount} />
 *   </div>
 * );
 * ```
 */
export function useAutomationObjectiveStats(automationId: string | undefined) {
  const { objectives } = useAutomationObjectives(automationId);

  const stats = useMemo(() => {
    if (objectives.length === 0) {
      return {
        linkedCount: 0,
        avgProgress: 0,
        onTrackCount: 0,
        atRiskCount: 0,
        criticalCount: 0,
        highCount: 0,
        categories: [] as string[],
        strategicImpact: 'none' as 'none' | 'low' | 'medium' | 'high',
      };
    }

    const avgProgress = Math.round(
      objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length
    );

    const onTrackCount = objectives.filter(o => o.status === 'on-track').length;
    const atRiskCount = objectives.filter(o => o.status === 'at-risk').length;
    const criticalCount = objectives.filter(o => o.priority === 'critical').length;
    const highCount = objectives.filter(o => o.priority === 'high').length;

    const categories = [...new Set(objectives.map(o => o.category))];

    // Calculate strategic impact based on objective count and priority
    let strategicImpact: 'none' | 'low' | 'medium' | 'high' = 'low';
    if (criticalCount >= 2) {
      strategicImpact = 'high';
    } else if (criticalCount >= 1 || (objectives.length >= 3 && highCount >= 2)) {
      strategicImpact = 'high';
    } else if (objectives.length >= 2 || highCount >= 1) {
      strategicImpact = 'medium';
    }

    return {
      linkedCount: objectives.length,
      avgProgress,
      onTrackCount,
      atRiskCount,
      criticalCount,
      highCount,
      categories,
      strategicImpact,
    };
  }, [objectives]);

  return stats;
}

// ============================================================================
// AUTOMATION → CONVERSATION RELATIONSHIPS (AI Generation Tracking)
// ============================================================================

/**
 * Get the conversation that generated an automation
 * 
 * For AI-generated automations, this returns the Decision Assistant
 * conversation that created it, allowing users to see the context
 * and requirements that led to the automation's creation.
 * 
 * @param automationId - The automation ID to look up
 * @returns Object containing the source conversation and metadata
 * 
 * @example
 * ```tsx
 * const { conversation, isAIGenerated, isEmpty } = useAutomationSourceChat('automation-6-24-20');
 * 
 * if (isAIGenerated && conversation) {
 *   return (
 *     <ChatPreview 
 *       conversation={conversation}
 *       label="Generated from Decision Assistant"
 *     />
 *   );
 * }
 * ```
 */
export function useAutomationSourceChat(automationId: string | undefined) {
  const result = useMemo(() => {
    if (!automationId) {
      return {
        conversation: null,
        isAIGenerated: false,
        isEmpty: true,
        automation: null,
      };
    }

    // Find the automation
    const automation = decisionAutomations.find(a => a.id === automationId);
    
    if (!automation) {
      return {
        conversation: null,
        isAIGenerated: false,
        isEmpty: true,
        automation: null,
      };
    }

    const isAIGenerated = automation.variant === 'ai-generated' || automation.aiGenerated === true;

    // If not AI-generated, return early
    if (!isAIGenerated || !automation.generatedFromConversationId) {
      return {
        conversation: null,
        isAIGenerated,
        isEmpty: true,
        automation,
      };
    }

    // Find the source conversation
    const conversation = conversations.find(
      c => c.id === automation.generatedFromConversationId
    );

    return {
      conversation: conversation || null,
      isAIGenerated,
      isEmpty: !conversation,
      automation,
    };
  }, [automationId]);

  return result;
}

/**
 * Check if an automation was AI-generated and get generation metadata
 * 
 * Lightweight check for AI generation status without loading full conversation.
 * Useful for badges, icons, and conditional rendering.
 * 
 * @param automationId - The automation ID to check
 * @returns Object with AI generation status and metadata
 * 
 * @example
 * ```tsx
 * const { isAIGenerated, hasSourceChat, variant } = useAutomationAIStatus('automation-6-24-20');
 * 
 * return (
 *   <div>
 *     {isAIGenerated && <Badge variant="ai">AI Generated</Badge>}
 *     {hasSourceChat && <ChatLink conversationId={...} />}
 *   </div>
 * );
 * ```
 */
export function useAutomationAIStatus(automationId: string | undefined) {
  const status = useMemo(() => {
    if (!automationId) {
      return {
        isAIGenerated: false,
        hasSourceChat: false,
        conversationId: null,
        variant: 'standard' as const,
        creationMethod: null as DecisionAutomation['creationMethod'],
      };
    }

    const automation = decisionAutomations.find(a => a.id === automationId);
    
    if (!automation) {
      return {
        isAIGenerated: false,
        hasSourceChat: false,
        conversationId: null,
        variant: 'standard' as const,
        creationMethod: null as DecisionAutomation['creationMethod'],
      };
    }

    const isAIGenerated = automation.variant === 'ai-generated' || automation.aiGenerated === true;
    const hasSourceChat = !!automation.generatedFromConversationId;

    return {
      isAIGenerated,
      hasSourceChat,
      conversationId: automation.generatedFromConversationId || null,
      variant: automation.variant,
      creationMethod: automation.creationMethod || null,
    };
  }, [automationId]);

  return status;
}

// ============================================================================
// BATCH LOOKUPS (Performance Optimization)
// ============================================================================

/**
 * Get objectives for multiple automations in one call
 * 
 * Optimized batch lookup to avoid multiple hook calls.
 * Useful for list views showing multiple automations.
 * 
 * @param automationIds - Array of automation IDs
 * @returns Map of automation ID → objectives array
 * 
 * @example
 * ```tsx
 * const automations = ['auto-1', 'auto-2', 'auto-3'];
 * const objectivesMap = useAutomationObjectivesBatch(automations);
 * 
 * return automations.map(id => (
 *   <AutomationCard 
 *     key={id}
 *     objectives={objectivesMap[id] || []}
 *   />
 * ));
 * ```
 */
export function useAutomationObjectivesBatch(automationIds: string[]) {
  const objectivesMap = useMemo(() => {
    const map: Record<string, BusinessObjective[]> = {};

    automationIds.forEach(automationId => {
      const automation = decisionAutomations.find(a => a.id === automationId);
      
      if (!automation) {
        map[automationId] = [];
        return;
      }

      // Bidirectional lookup
      const forwardLinked = automation.linkedObjectiveIds 
        ? businessObjectives.filter(obj => automation.linkedObjectiveIds?.includes(obj.id))
        : [];

      const backwardLinked = businessObjectives.filter(obj => 
        obj.automationIds.includes(automationId)
      );

      // Merge and deduplicate
      const allObjectives = [...forwardLinked];
      backwardLinked.forEach(obj => {
        if (!allObjectives.find(o => o.id === obj.id)) {
          allObjectives.push(obj);
        }
      });

      map[automationId] = allObjectives;
    });

    return map;
  }, [automationIds]);

  return objectivesMap;
}

/**
 * Get conversations for multiple AI-generated automations
 * 
 * Batch lookup for source conversations.
 * 
 * @param automationIds - Array of automation IDs
 * @returns Map of automation ID → conversation (or null)
 */
export function useAutomationChatsBatch(automationIds: string[]) {
  const chatsMap = useMemo(() => {
    const map: Record<string, Conversation | null> = {};

    automationIds.forEach(automationId => {
      const automation = decisionAutomations.find(a => a.id === automationId);
      
      if (!automation || !automation.generatedFromConversationId) {
        map[automationId] = null;
        return;
      }

      const conversation = conversations.find(
        c => c.id === automation.generatedFromConversationId
      );

      map[automationId] = conversation || null;
    });

    return map;
  }, [automationIds]);

  return chatsMap;
}