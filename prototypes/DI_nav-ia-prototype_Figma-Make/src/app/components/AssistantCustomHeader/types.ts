import type { ComponentType } from 'react';

/** Public props for the AssistantCustomHeader. `mode` drives which controls render. */
export interface AssistantCustomHeaderProps {
  mode: 'full' | 'side' | 'expanded';
  title?: string;
  onTitleChange?: (next: string) => void;
  editable?: boolean;
  /** Optional small pill rendered next to the title (e.g. "Build"). */
  chatMode?: string;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
  onSettings?: () => void;
  onArtifacts?: () => void;
  onOpenChats?: () => void;
  onNewChat?: () => void;
  onAssistantSettings?: () => void;
  onChatDetails?: () => void;
  onChatSettings?: () => void;
  onResetChat?: () => void;
}

/** A single row in the overflow menu (rendered only in `mode="side"`). */
export interface MenuItemDef {
  id: string;
  label: string;
  shortcutIcon?: ComponentType<{ size?: number }>;
  topDivider?: boolean;
  onClick?: () => void;
}
