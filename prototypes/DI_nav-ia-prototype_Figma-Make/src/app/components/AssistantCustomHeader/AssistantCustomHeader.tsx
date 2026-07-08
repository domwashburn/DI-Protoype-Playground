import { useEffect, useRef, useState } from 'react';
import {
  OverflowMenuVertical,
  SettingsAdjust,
  DocumentMultiple_02 as DocumentMultiple02,
  OpenPanelRight,
  RightPanelClose,
  Close,
  Edit,
  Misuse,
  CheckmarkOutline,
  Keyboard,
} from '@carbon/icons-react';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import styles from './AssistantCustomHeader.module.css';
import { IconBtn } from './IconBtn';
import type { AssistantCustomHeaderProps, MenuItemDef } from './types';
// --- Escape-to-close (optional, isolated). Remove the import + the
// `useEscapeToClose(...)` call below to fully disable the behavior. ---
import { useEscapeToClose } from './useEscapeToClose';

/**
 * Custom header for the assistant chat surface.
 * - `mode="full"`     → title + chat-mode tag + settings/artifacts actions
 * - `mode="side"`     → adds leading overflow menu; hides settings; adds expand + close
 * - `mode="expanded"` → like full + collapse + close
 * Inline rename is enabled via `editable` and committed through `onTitleChange`.
 */
export function AssistantCustomHeader({
  mode,
  title = 'Decision Assistant',
  onTitleChange,
  editable = true,
  chatMode,
  onExpand,
  onCollapse,
  onClose,
  onSettings,
  onArtifacts,
  onOpenChats,
  onNewChat,
  onAssistantSettings,
  onChatDetails,
  onChatSettings,
  onResetChat,
}: AssistantCustomHeaderProps) {
  const isSide = mode === 'side';
  const isExpanded = mode === 'expanded';
  const hasExpandCollapse = isSide || isExpanded;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [titleHover, setTitleHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) setDraft(title);
  }, [title, isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const startEdit = () => {
    if (!editable) return;
    setDraft(title);
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(title);
  };
  const confirmEdit = () => {
    const next = draft.trim() || title;
    onTitleChange?.(next);
    setIsEditing(false);
  };

  // Overflow menu items (side mode only). `topDivider` → Carbon `hasDivider`
  // on the same row, which renders a separator above it.
  const menuItems: MenuItemDef[] = [
    { id: 'chats', label: 'Chats', onClick: onOpenChats },
    { id: 'new', label: 'New chat', onClick: onNewChat },
    { id: 'assistant-settings', label: 'Assistant settings', onClick: onAssistantSettings },
    { id: 'rename', label: 'Rename chat', topDivider: true, onClick: startEdit },
    { id: 'details', label: 'Chat details', onClick: onChatDetails },
    { id: 'chat-settings', label: 'Chat settings', onClick: onChatSettings },
    { id: 'reset', label: 'Reset chat', shortcutIcon: Keyboard, onClick: onResetChat },
  ];

  const actionsDisabled = isEditing;

  // Escape-to-close: expanded → collapse, then close on a quick second tap;
  // any other mode → close. Disabled while editing so Esc still cancels rename.
  useEscapeToClose({
    enabled: !isEditing,
    isExpanded,
    onCollapse,
    onClose,
  });

  return (
    <div className={styles.root} data-name="Assistant Custom Header" data-mode={mode}>
      {isSide && (
        <div
          className={`${styles.menuAnchor} ${actionsDisabled ? styles.menuAnchorDisabled : ''}`}
          aria-disabled={actionsDisabled || undefined}
        >
          <OverflowMenu
            aria-label="More options"
            iconDescription="More options"
            renderIcon={OverflowMenuVertical}
            size="md"
            flipped={false}
            menuOptionsClass={styles.menuOptions}
          >
            {menuItems.map((item) => {
              // If the item carries a shortcutIcon, render itemText as a
              // ReactNode with a trailing 16px glyph (matches Figma "Reset chat").
              const Shortcut = item.shortcutIcon;
              const itemText = Shortcut ? (
                <span className={styles.menuItemRow}>
                  <span className={styles.menuItemLabel}>{item.label}</span>
                  <Shortcut size={16} />
                </span>
              ) : (
                item.label
              );
              return (
                <OverflowMenuItem
                  key={item.id}
                  itemText={itemText}
                  hasDivider={item.topDivider}
                  onClick={item.onClick}
                />
              );
            })}
          </OverflowMenu>
        </div>
      )}

      <div
        className={styles.titleBlock}
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
      >
        {isEditing ? (
          <div className={styles.editWrap}>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmEdit();
                if (e.key === 'Escape') cancelEdit();
              }}
              className={styles.editInput}
              aria-label="Chat title"
            />
            <div className={styles.editActions}>
              <button
                type="button"
                onClick={cancelEdit}
                aria-label="Cancel"
                title="Cancel"
                className={styles.editIconBtn}
              >
                <Misuse size={16} />
              </button>
              <button
                type="button"
                onClick={confirmEdit}
                aria-label="Confirm"
                title="Confirm"
                className={styles.editIconBtn}
              >
                <CheckmarkOutline size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className={styles.title}>{title}</span>
            {chatMode && <span className={styles.chatModeTag}>{chatMode}</span>}
            {editable && !isSide && titleHover && (
              <button
                type="button"
                onClick={startEdit}
                aria-label="Rename chat"
                title="Rename chat"
                className={styles.renameBtn}
              >
                <Edit size={16} />
              </button>
            )}
          </>
        )}
      </div>

      <div className={styles.trailing}>
        <IconBtn
          icon={SettingsAdjust}
          label="Chat settings"
          onClick={onSettings}
          disabled={actionsDisabled}
          invisible={isSide}
        />
        <IconBtn
          icon={DocumentMultiple02}
          label="Assets & Artifacts"
          onClick={onArtifacts}
          disabled={actionsDisabled}
        />

        {hasExpandCollapse && (
          <>
            <div
              aria-hidden="true"
              className={`${styles.divider} ${actionsDisabled ? styles.dividerDisabled : ''}`}
            />
            {isSide ? (
              <IconBtn
                icon={OpenPanelRight}
                label="Expand panel"
                onClick={onExpand}
                disabled={actionsDisabled}
              />
            ) : (
              <IconBtn
                icon={RightPanelClose}
                label="Collapse panel"
                onClick={onCollapse}
                disabled={actionsDisabled}
              />
            )}
            <IconBtn icon={Close} label="Close panel" onClick={onClose} disabled={actionsDisabled} />
          </>
        )}
      </div>
    </div>
  );
}

export default AssistantCustomHeader;
