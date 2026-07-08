/**
 * CarbonDecisionAssistant
 *
 * Three display modes, all driven by the `mode` prop:
 *
 *   mode="full"     — full-page route via global nav. Custom header (Settings +
 *                     Artifacts only), Carbon AI Chat's own history sub-panel,
 *                     homescreen with conversation starters.
 *
 *   mode="side"     — narrow influence side panel (320 px). Custom header with
 *                     overflow menu, Artifacts, Expand + Close. No history panel.
 *
 *   mode="expanded" — the same panel expanded to full viewport width. Custom
 *                     header with Settings, Artifacts, Collapse + Close. Carbon
 *                     AI Chat's history sub-panel is enabled as the left rail.
 *
 * Expand / collapse is orchestrated by DecisionAssistantPanel via PanelManager's
 * expandPanel() / collapsePanel(). CarbonDecisionAssistant receives the resulting
 * mode as a prop and fires onExpand / onCollapse callbacks upward.
 */
import {
  ChatCustomElement,
  CarbonTheme,
  CornersType,
  MessageResponseTypes,
  WriteableElementName,
  type ChatInstance,
  type MessageRequest,
  type CustomSendMessageOptions,
  type HistoryItem,
} from '@carbon/ai-chat';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Add, ChatBot } from '@carbon/icons-react';
import { AssistantCustomHeader } from './AssistantCustomHeader';
import { ChatHistoryPanel } from './ChatHistoryPanel/ChatHistoryPanel';
import SideRailNavigation from './SideRailNavigation/SideRailNavigation';
import type { SideRailNavSection } from './SideRailNavigation/types';
import styles from './CarbonDecisionAssistant.module.css';

const ASSISTANT_RAIL_SECTIONS: SideRailNavSection[] = [
  {
    id: 'assistant-primary',
    items: [
      { id: 'assistant-chats', label: 'Chats', icon: <ChatBot size={16} /> },
    ],
  },
];

// ---------------------------------------------------------------------------
// Mock response generator
// ---------------------------------------------------------------------------

const RESPONSES: Record<string, string> = {
  credit:
    '**Credit Risk Analysis**\n\nI can help you build a credit risk assessment automation. Recommended components:\n\n1. **Credit Score Evaluation** — FICO score thresholds with tiered approval\n2. **Debt-to-Income Ratio** — Flag applications above 43% DTI\n3. **Fraud Detection Layer** — ML model for pattern anomalies\n\nShall I generate these as decision models?',
  churn:
    '**Churn Prediction Model**\n\nTo build an effective churn prediction automation:\n\n- Monitor engagement signals (login frequency, feature usage)\n- Track support ticket volume and sentiment\n- Apply 30/60/90-day time-series forecasting windows\n\nI can scaffold a predictive model with rule-based intervention triggers.',
  fraud:
    '**Fraud Detection Enhancement**\n\nTo reduce false positives in your existing model:\n\n1. Ensemble modeling (gradient boost + isolation forest)\n2. Behavioral biometrics signals\n3. Velocity rules for transaction frequency\n\nTypical false positive reduction: **30–45%** with these adjustments.',
  dashboard:
    '**Analytics Dashboard**\n\nKey metrics to surface:\n\n- Decision throughput and latency (P50/P95/P99)\n- Rule hit rates per policy\n- Model drift indicators\n- Exception queue size over time\n\nI can configure a Carbon Charts-based dashboard. What data sources should I connect?',
};

function generateResponse(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('credit') || lower.includes('risk')) return RESPONSES.credit;
  if (lower.includes('churn') || lower.includes('predict')) return RESPONSES.churn;
  if (lower.includes('fraud')) return RESPONSES.fraud;
  if (lower.includes('dashboard') || lower.includes('analytic')) return RESPONSES.dashboard;
  return `I understand: *"${userText}"*\n\nAs your Decision Assistant I can help you:\n\n- Design and optimize decision automation logic\n- Analyze risk factors and approval thresholds\n- Generate business rules and ML model configurations\n- Review compliance requirements\n\nWhat aspect would you like to explore?`;
}

// ---------------------------------------------------------------------------
// Messaging callbacks
// ---------------------------------------------------------------------------

async function customSendMessage(
  request: MessageRequest,
  _options: CustomSendMessageOptions,
  instance: ChatInstance,
): Promise<void> {
  const userText = request.input?.text ?? '';

  await new Promise<void>((resolve) =>
    setTimeout(resolve, 600 + Math.random() * 800),
  );

  await instance.messaging.addMessage({
    id: crypto.randomUUID(),
    output: {
      generic: [
        {
          response_type: MessageResponseTypes.TEXT,
          text: generateResponse(userText),
        },
      ],
    },
  });
}

// ---------------------------------------------------------------------------
// History panel content — Carbon AI Chat does not ship a built-in chats list.
// The HISTORY_PANEL_ELEMENT writeable slot is empty by default, so we render
// our own list of past conversations into it.
// ---------------------------------------------------------------------------

interface MockChat {
  id: string;
  title: string;
  group: 'Today' | 'Yesterday' | 'Last 7 days' | 'Last 30 days';
}

const MOCK_CHATS: MockChat[] = [
  { id: 'c1', title: 'Create a credit risk automation', group: 'Today' },
  { id: 'c2', title: 'Improve fraud detection accuracy', group: 'Today' },
  { id: 'c3', title: 'Predict customer churn', group: 'Yesterday' },
  { id: 'c4', title: 'Build an analytics dashboard', group: 'Last 7 days' },
  { id: 'c5', title: 'Review compliance requirements', group: 'Last 7 days' },
  { id: 'c6', title: 'Optimize approval thresholds', group: 'Last 30 days' },
];

function HistoryPanelContent({ onSelect }: { onSelect?: (id: string) => void }) {
  const groups = MOCK_CHATS.reduce<Record<string, MockChat[]>>((acc, chat) => {
    (acc[chat.group] ||= []).push(chat);
    return acc;
  }, {});
  return (
    <div className={styles.historyPanel}>
      <div className={styles.historyPanelHeader}>
        <span className={styles.historyPanelTitle}>Chats</span>
      </div>
      <div className={styles.historyPanelList}>
        {Object.entries(groups).map(([group, chats]) => (
          <div key={group} className={styles.historyGroup}>
            <div className={styles.historyGroupLabel}>{group}</div>
            {chats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                className={styles.historyItem}
                onClick={() => onSelect?.(chat.id)}
              >
                {chat.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

async function customLoadHistory(_instance: ChatInstance): Promise<HistoryItem[]> {
  const now = Date.now();
  const minutes = (n: number) => now - n * 60_000;
  return [
    {
      id: crypto.randomUUID(),
      time: minutes(5),
      message: {
        id: crypto.randomUUID(),
        input: { text: 'Create a credit risk automation' },
      } as unknown as HistoryItem['message'],
    },
    {
      id: crypto.randomUUID(),
      time: minutes(60),
      message: {
        id: crypto.randomUUID(),
        input: { text: 'Improve fraud detection accuracy' },
      } as unknown as HistoryItem['message'],
    },
    {
      id: crypto.randomUUID(),
      time: minutes(60 * 26),
      message: {
        id: crypto.randomUUID(),
        input: { text: 'Build an analytics dashboard' },
      } as unknown as HistoryItem['message'],
    },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export type DecisionAssistantMode = 'full' | 'side' | 'expanded';

export interface CarbonDecisionAssistantProps {
  mode?: DecisionAssistantMode;
  /**
   * @deprecated Use mode="side" instead. Kept for backward-compat.
   */
  variant?: 'full' | 'panel';
  onClose?: () => void;
  /** Called when the expand button is pressed (side mode only) */
  onExpand?: () => void;
  /** Called when the collapse button is pressed (expanded mode only) */
  onCollapse?: () => void;
}

export function CarbonDecisionAssistant({
  mode,
  variant,
  onClose,
  onExpand,
  onCollapse,
}: CarbonDecisionAssistantProps) {
  const effectiveMode: DecisionAssistantMode | 'panel-compat' =
    mode ?? (variant === 'panel' ? 'panel-compat' : 'full');

  const isFull = effectiveMode === 'full';
  const isExpanded = effectiveMode === 'expanded';
  const isPanelCompat = effectiveMode === 'panel-compat';
  const hasCustomHeader =
    effectiveMode === 'full' || effectiveMode === 'side' || effectiveMode === 'expanded';

  // History side rail: shown alongside the chat in full-page and expanded modes
  const showHistoryRail = isFull || isExpanded;

  const chatInstanceRef = useRef<ChatInstance | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('Decision Assistant');

  const handleNewChat = () => {
    void chatInstanceRef.current?.messaging.restartConversation();
  };

  const handleRailItemClick = (itemId: string) => {
    if (itemId !== 'assistant-chats') return;
    setIsHistoryOpen((open) => !open);
  };

  const handleCollapse = () => {
    if (isHistoryOpen) {
      setIsHistoryOpen(false);
      // Stagger: wait just 50ms before triggering the parent collapse
      setTimeout(() => onCollapse?.(), 50);
    } else {
      onCollapse?.();
    }
  };

  const handleClose = () => {
    if (isHistoryOpen) {
      setIsHistoryOpen(false);
      // Stagger: wait just 50ms before triggering the parent close
      setTimeout(() => onClose?.(), 50);
    } else {
      onClose?.();
    }
  };

  return (
    <div className={styles.wrapper} data-mode={effectiveMode}>
      <div className={styles.body}>
        {showHistoryRail && (
          <div className={styles.iconRail}>
            <SideRailNavigation
              isExpanded={false}
              positioning="relative"
              behavior="push"
              headerTitle="Decision Assistant"
              sections={ASSISTANT_RAIL_SECTIONS}
              activeItemId={isHistoryOpen ? 'assistant-chats' : undefined}
              onItemClick={handleRailItemClick}
              newChatAction={{
                onClick: handleNewChat,
                icon: <Add size={16} />,
                label: 'New chat',
              }}
            />
          </div>
        )}

        <AnimatePresence>
          {showHistoryRail && isHistoryOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', flexShrink: 0 }}
            >
              <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={styles.externalHistory}
              >
                <ChatHistoryPanel />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.chatArea}>
          {hasCustomHeader && (
            <AssistantCustomHeader
              mode={effectiveMode as DecisionAssistantMode}
              title={chatTitle}
              onTitleChange={setChatTitle}
              onExpand={effectiveMode === 'side' ? onExpand : undefined}
              onCollapse={effectiveMode === 'expanded' ? handleCollapse : undefined}
              onClose={handleClose}
            />
          )}
          <ChatCustomElement
          className={styles.chatElement}
          openChatByDefault
          aiEnabled
          injectCarbonTheme={CarbonTheme.WHITE}
          onBeforeRender={(instance) => {
            chatInstanceRef.current = instance;
          }}
          header={{
            isOn: false,
            title: 'Decision Assistant',
            showAiLabel: false,
            hideMinimizeButton: true,
            menuOptions: isFull
              ? [{ text: 'Help' }, { text: 'Settings' }]
              : undefined,
          }}
          layout={{
            corners: CornersType.SQUARE,
            showFrame: false,
          }}
          launcher={{ isOn: false }}
          history={{
            // Carbon AI Chat's built-in "Chats" history panel is used in side-mode only.
            // In full/expanded modes, we provide a custom history rail UI externally and
            // disable the built-in one entirely to prevent layout jumping/stuttering.
            isOn: !showHistoryRail,
            startClosed: true,
            showMobileMenu: false,
          }}
          homescreen={
            isFull
              ? {
                  isOn: true,
                  greeting:
                    "Hello!\n\nI'm your Decision Assistant. I can help you design, optimize, and analyze decision automations — from credit risk to fraud detection and beyond.",
                  starters: {
                    isOn: true,
                    buttons: [
                      { label: 'Create a credit risk automation' },
                      { label: 'Predict customer churn' },
                      { label: 'Improve fraud detection accuracy' },
                      { label: 'Build an analytics dashboard' },
                    ],
                  },
                }
              : { isOn: false }
          }
          messaging={{
            customSendMessage,
            customLoadHistory,
            skipWelcome: !isFull && !isPanelCompat,
          }}
          renderWriteableElements={
            // In full/expanded mode we render our own custom external history panel via AnimatePresence,
            // so we do not pass the writeable element, which prevents Carbon's built-in panel structure from rendering empty slots.
            showHistoryRail
              ? undefined
              : {
                  [WriteableElementName.HISTORY_PANEL_ELEMENT]: (
                    <HistoryPanelContent />
                  ),
                }
          }
        />
        </div>
      </div>
    </div>
  );
}

export default CarbonDecisionAssistant;
