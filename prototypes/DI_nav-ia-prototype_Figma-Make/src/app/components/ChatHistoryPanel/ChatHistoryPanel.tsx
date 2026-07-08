import { useMemo, useState } from 'react';
import { Search, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import {
  ChevronUp,
  ChevronDown,
  Pin,
  Time,
} from '@carbon/icons-react';
import styles from './ChatHistoryPanel.module.css';

export interface ChatHistoryEntry {
  id: string;
  title: string;
  /** Group bucket — Pinned items use group: 'Pinned'. */
  group: string;
  pinned?: boolean;
}

export interface ChatHistoryPanelProps {
  chats?: ChatHistoryEntry[];
  activeChatId?: string;
  onSelect?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPinToggle?: (id: string) => void;
}

const DEFAULT_CHATS: ChatHistoryEntry[] = [
  { id: 'p1', title: "Here's the onboarding doc that includes everything", group: 'Pinned', pinned: true },
  { id: 'p2', title: "Let's use this as the master invoice template", group: 'Pinned', pinned: true },
  { id: 'p3', title: 'Noticed some discrepancies between the two reports', group: 'Pinned', pinned: true },
  { id: 'p4', title: 'Do we need a PO number on every invoice?', group: 'Pinned', pinned: true },
  { id: 't1', title: 'Create decision service', group: 'Today' },
  { id: 't2', title: "Let's use this as the master invoice template", group: 'Today' },
  { id: 't3', title: 'Noticed some discrepancies between the two reports', group: 'Today' },
  { id: 't4', title: 'Do we need a PO number on every invoice?', group: 'Today' },
  { id: 'y1', title: 'This chat outlines the invoice submission flow', group: 'Yesterday' },
  { id: 'y2', title: "We've agreed to add a late fee clause", group: 'Yesterday' },
  { id: 'y3', title: 'Send this template to all new vendors', group: 'Yesterday' },
  { id: 'y4', title: "Here's the transcript of the conversation", group: 'Yesterday' },
  { id: 'w1', title: "Here's the onboarding doc that includes everything", group: 'Previous 7 days' },
  { id: 'w2', title: "Let's use this as the master invoice template", group: 'Previous 7 days' },
  { id: 'w3', title: 'Noticed some discrepancies between the two reports', group: 'Previous 7 days' },
];

const GROUP_ORDER = ['Pinned', 'Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days'];

export function ChatHistoryPanel({
  chats = DEFAULT_CHATS,
  activeChatId,
  onSelect,
  onRename,
  onDelete,
  onPinToggle,
}: ChatHistoryPanelProps) {
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return chats;
    const q = query.toLowerCase();
    return chats.filter((c) => c.title.toLowerCase().includes(q));
  }, [chats, query]);

  const grouped = useMemo(() => {
    const m = new Map<string, ChatHistoryEntry[]>();
    for (const chat of filtered) {
      const key = chat.pinned ? 'Pinned' : chat.group;
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(chat);
    }
    return Array.from(m.entries()).sort(
      ([a], [b]) => GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b),
    );
  }, [filtered]);

  const toggleGroup = (g: string) =>
    setCollapsed((s) => ({ ...s, [g]: !s[g] }));

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Chats</span>
      </div>

      <div className={styles.searchRow}>
        <Search
          size="sm"
          labelText="Search chats"
          placeholder="Search"
          value={query}
          onChange={(e) =>
            setQuery((e.target as HTMLInputElement).value)
          }
          id="chat-history-search"
        />
      </div>

      <div className={styles.list}>
        {grouped.map(([group, items]) => {
          const isCollapsed = collapsed[group];
          const GroupIcon = group === 'Pinned' ? Pin : Time;
          return (
            <div key={group} className={styles.group}>
              <button
                type="button"
                className={styles.groupHeader}
                onClick={() => toggleGroup(group)}
                aria-expanded={!isCollapsed}
              >
                <GroupIcon size={16} className={styles.groupIcon} />
                <span className={styles.groupLabel}>{group}</span>
                {isCollapsed ? (
                  <ChevronDown size={16} className={styles.chevron} />
                ) : (
                  <ChevronUp size={16} className={styles.chevron} />
                )}
              </button>

              {!isCollapsed &&
                items.map((chat) => (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                    onSelect={onSelect}
                    onRename={onRename}
                    onDelete={onDelete}
                    onPinToggle={onPinToggle}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatRow({
  chat,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onPinToggle,
}: {
  chat: ChatHistoryEntry;
  isActive?: boolean;
  onSelect?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPinToggle?: (id: string) => void;
}) {
  return (
    <div
      className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
      data-active={isActive || undefined}
    >
      <button
        type="button"
        className={styles.rowLabel}
        onClick={() => onSelect?.(chat.id)}
        title={chat.title}
      >
        {chat.title}
      </button>
      <div className={styles.rowMenu}>
        <OverflowMenu size="sm" aria-label="Chat options" flipped align="bottom">
          <OverflowMenuItem
            itemText={chat.pinned ? 'Unpin' : 'Pin'}
            onClick={() => onPinToggle?.(chat.id)}
          />
          <OverflowMenuItem
            itemText="Rename"
            onClick={() => onRename?.(chat.id)}
          />
          <OverflowMenuItem
            hasDivider
            isDelete
            itemText="Delete"
            onClick={() => onDelete?.(chat.id)}
          />
        </OverflowMenu>
      </div>
    </div>
  );
}

export default ChatHistoryPanel;
