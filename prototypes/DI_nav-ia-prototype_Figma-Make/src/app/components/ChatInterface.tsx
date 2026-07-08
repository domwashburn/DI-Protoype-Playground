import { useState, useRef, useEffect, useMemo } from 'react';
import { SendAlt, ChatBot, UserAvatar } from '@carbon/icons-react';
import { useConversation, useConversationMessages } from '../data/hooks';
import type { Message as DataMessage } from '../data/chats/types';
import styles from './ChatInterface.module.css';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatId?: string;
  onNewMessage?: (message: Message) => void;
}

export default function ChatInterface({ chatId, onNewMessage }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get conversation and messages from data layer
  const { conversation } = useConversation(chatId || '');
  const { messages: dataMessages } = useConversationMessages(chatId || '');

  // Convert data messages to component format
  const messages = useMemo(() => {
    if (!chatId || dataMessages.length === 0) return [];
    
    return dataMessages.map(msg => ({
      id: msg.id,
      type: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: msg.content,
      timestamp: new Date(msg.timestamp)
    }));
  }, [chatId, dataMessages]);

  const suggestedPrompts = [
    {
      title: 'Create Credit Risk Automation',
      description: 'Build a comprehensive credit risk assessment automation with fraud detection'
    },
    {
      title: 'Predict Customer Churn',
      description: 'Design ML-based churn prediction model with proactive intervention rules'
    },
    {
      title: 'Improve Fraud Detection',
      description: 'Analyze and enhance existing fraud detection model to reduce false positives'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Create real-time analytics dashboard with key business metrics'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll help you with "${userMessage.content}". This is a simulated response that would typically come from the Decision Assistant AI. In a real implementation, this would be connected to your organization's AI decision-making system to provide intelligent insights, recommendations, and analysis based on your specific business context and data.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      if (onNewMessage) {
        onNewMessage(assistantMessage);
      }
    }, 1500);

    if (onNewMessage) {
      onNewMessage(userMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: typeof suggestedPrompts[0]) => {
    setInputValue(prompt.title);
    textareaRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  return (
    <div className={styles.chatInterface}>
      {/* Chat Header */}
      <div className={styles.chatHeader}>
        <h1 className={styles.chatTitle}>
          {conversation ? conversation.title : 'Decision Assistant'}
        </h1>
        {conversation && conversation.description && (
          <p className={styles.chatDescription}>{conversation.description}</p>
        )}
      </div>

      {/* Chat Content */}
      <div className={styles.chatContent}>
        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            // Welcome Message with Suggested Prompts
            <div className={styles.welcomeMessage}>
              <h2 className={styles.welcomeTitle}>Welcome to Decision Assistant</h2>
              <p className={styles.welcomeDescription}>
                I'm here to help you make informed business decisions. Ask me about risk analysis, 
                compliance requirements, budget optimization, or any other business challenge you're facing.
              </p>
              <div className={styles.suggestedPrompts}>
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={styles.promptCard}
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <div className={styles.promptTitle}>{prompt.title}</div>
                    <div className={styles.promptDescription}>{prompt.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages
            <>
              {messages.map((message) => (
                <div key={message.id} className={`${styles.message} ${message.type === 'user' ? styles.userMessage : ''}`}>
                  <div className={message.type === 'assistant' ? styles.assistantAvatar : styles.userAvatar}>
                    {message.type === 'assistant' ? <ChatBot size={18} /> : <UserAvatar size={18} />}
                  </div>
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={styles.message}>
                  <div className={styles.assistantAvatar}>
                    <ChatBot size={18} />
                  </div>
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>Thinking...</p>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your business decisions..."
              className={styles.messageInput}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <SendAlt size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}