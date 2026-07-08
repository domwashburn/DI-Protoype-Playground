import { useState, useMemo } from 'react';
import { Add, Chat, Upload, Book, Archive } from '@carbon/icons-react';
import { SideRailNavigation, SideRailNavSection } from '../SideRailNavigation';
import { useConversations } from '../../data/hooks';
import styles from './ChatSidebar.module.css';

interface HistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ChatSidebarProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onCollapseRail?: () => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ChatSidebar({ 
  onNewChat, 
  onSelectChat, 
  onCollapseRail, 
  isExpanded = false,
  onToggle 
}: ChatSidebarProps) {
  const [activeChat, setActiveChat] = useState<string>('');

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    onSelectChat(chatId);
  };

  // Get real conversations from data layer
  const { conversations } = useConversations({
    sort: { field: 'lastMessageDate', direction: 'desc' }
  });

  // Group conversations by recency
  const historyGroups = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const todayConvos: HistoryItem[] = [];
    const yesterdayConvos: HistoryItem[] = [];
    const recentConvos: HistoryItem[] = [];
    const olderConvos: HistoryItem[] = [];

    conversations.forEach(conv => {
      const convDate = new Date(conv.lastMessageDate);
      const item: HistoryItem = {
        id: conv.id,
        title: conv.title,
        timestamp: convDate
      };

      if (convDate >= today) {
        todayConvos.push(item);
      } else if (convDate >= yesterday) {
        yesterdayConvos.push(item);
      } else if (convDate >= sevenDaysAgo) {
        recentConvos.push(item);
      } else {
        olderConvos.push(item);
      }
    });

    const groups = [];
    if (todayConvos.length > 0) {
      groups.push({ title: 'Today', items: todayConvos });
    }
    if (yesterdayConvos.length > 0) {
      groups.push({ title: 'Yesterday', items: yesterdayConvos });
    }
    if (recentConvos.length > 0) {
      groups.push({ title: 'Previous 7 days', items: recentConvos });
    }
    if (olderConvos.length > 0) {
      groups.push({ title: 'Older', items: olderConvos });
    }

    return groups;
  }, [conversations]);

  // Define navigation sections for chat interface
  const chatNavSections: SideRailNavSection[] = [
    {
      id: "library",
      sectionLabel: "Library",
      showWhenCollapsed: true,
      items: [
        {
          id: "knowledge-base",
          label: "Knowledge Base",
          icon: <Book size={16} />,
          section: 1
        },
        {
          id: "templates",
          label: "Templates",
          icon: <Archive size={16} />,
          section: 1
        }
      ],
      hasDividerAfter: false
    },
    {
      id: "attachments",
      sectionLabel: "Attachments",
      showWhenCollapsed: true,
      items: [
        {
          id: "upload-files",
          label: "Upload Files",
          icon: <Upload size={16} />,
          section: 2
        },
        {
          id: "recent-files",
          label: "Recent Files",
          icon: <Chat size={16} />,
          section: 2
        }
      ],
      hasDividerAfter: false
    }
  ];

  return (
    <SideRailNavigation
      isExpanded={isExpanded}
      onToggle={toggleSidebar}
      headerTitle="Decision Assistant"
      sections={chatNavSections}
      activeItemId={activeChat}
      onItemClick={handleSelectChat}
      behavior="overlay"
      onCollapseRail={onCollapseRail}
      panelAction={{
        onClick: onNewChat,
        icon: <Add size={16} />,
        label: "New chat"
      }}
      historyGroups={historyGroups}
      positioning="relative"
    />
  );
}