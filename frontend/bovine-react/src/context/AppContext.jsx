import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  theme: 'theme',
  predictionHistory: 'prediction_history',
  chatHistory: 'chat_history',
  session: 'session',
};

const AppContext = createContext(null);

function parseStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => parseStorage(STORAGE_KEYS.theme, 'light'));
  const [session, setSession] = useState(() => parseStorage(STORAGE_KEYS.session, null));
  const [predictionHistory, setPredictionHistory] = useState(() => parseStorage(STORAGE_KEYS.predictionHistory, []));
  const [chatHistory, setChatHistory] = useState(() => parseStorage(STORAGE_KEYS.chatHistory, []));
  const [activePrediction, setActivePrediction] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.predictionHistory, JSON.stringify(predictionHistory));
  }, [predictionHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.chatHistory, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const login = ({ identifier, password }) => {
    if (!identifier || !password) {
      return { error: 'Username/email and password are required' };
    }
    const user = { username: identifier, email: identifier, password };
    setSession(user);
    return { success: true };
  };

  const signup = ({ username, email, password }) => {
    if (!username || !email || !password) {
      return { error: 'Username, email, and password are required' };
    }
    const user = { username, email, password };
    setSession(user);
    return { success: true };
  };

  const logout = () => {
    setSession(null);
    setActivePrediction(null);
    setActiveChat(null);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const addPrediction = (prediction) => {
    const item = {
      ...prediction,
      id: prediction.id || `pred-${Date.now()}`,
      createdAt: prediction.createdAt || new Date().toISOString(),
    };
    setPredictionHistory((prev) => [item, ...prev].slice(0, 20));
    setActivePrediction(item);
  };

  const restorePrediction = (item) => {
    setActivePrediction(item);
  };

  const addChat = (chat) => {
    const item = {
      ...chat,
      id: chat.id || `chat-${Date.now()}`,
      createdAt: chat.createdAt || new Date().toISOString(),
    };
    setChatHistory((prev) => [item, ...prev].slice(0, 20));
    setActiveChat(item);
  };

  const restoreChat = (item) => {
    setActiveChat(item);
  };

  const value = useMemo(
    () => ({
      theme,
      session,
      login,
      signup,
      logout,
      toggleTheme,
      predictionHistory,
      chatHistory,
      addPrediction,
      addChat,
      restorePrediction,
      restoreChat,
      activePrediction,
      activeChat,
    }),
    [theme, session, predictionHistory, chatHistory, activePrediction, activeChat]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
};
