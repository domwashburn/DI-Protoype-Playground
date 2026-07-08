import { createContext, useContext, useState, ReactNode } from 'react';

interface SidePanelContextType {
  isPanelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  openPanel: () => void;
}

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

export function useSidePanel() {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error('useSidePanel must be used within a SidePanelProvider');
  }
  return context;
}

interface SidePanelProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidePanelProvider({ children, defaultOpen = true }: SidePanelProviderProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(defaultOpen);

  const togglePanel = () => setIsPanelOpen(prev => !prev);
  const closePanel = () => setIsPanelOpen(false);
  const openPanel = () => setIsPanelOpen(true);

  return (
    <SidePanelContext.Provider value={{ isPanelOpen, togglePanel, closePanel, openPanel }}>
      {children}
    </SidePanelContext.Provider>
  );
}
