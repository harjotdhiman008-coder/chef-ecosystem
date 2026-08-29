import { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [activePanel, setActivePanel] = useState(null); // 'recipe' | 'comments' | 'wallet' | 'notifications' | 'community'
  const [panelData, setPanelData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openPanel = useCallback((type, data = null) => {
    setActivePanel(type);
    setPanelData(data);
  }, []);

  const closePanel = useCallback(() => {
    setActivePanel(null);
    setPanelData(null);
  }, []);

  const openModal = useCallback((content) => setModalContent(content), []);
  const closeModal = useCallback(() => setModalContent(null), []);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);
  const toggleSearch = useCallback(() => setSearchOpen((prev) => !prev), []);

  return (
    <UIContext.Provider
      value={{
        activePanel,
        panelData,
        openPanel,
        closePanel,
        mobileMenuOpen,
        toggleMobileMenu,
        setMobileMenuOpen,
        searchOpen,
        toggleSearch,
        setSearchOpen,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
