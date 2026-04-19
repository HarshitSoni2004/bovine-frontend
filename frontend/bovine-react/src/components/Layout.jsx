import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppContext } from '../context/AppContext';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/classifier': 'Classifier',
  '/chat': 'Chat',
  '/about': 'About',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { session, logout, toggleTheme, theme, predictionHistory, chatHistory, restorePrediction, restoreChat } = useAppContext();
  const title = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={session}
        onLogout={logout}
        predictionHistory={predictionHistory}
        chatHistory={chatHistory}
        restorePrediction={restorePrediction}
        restoreChat={restoreChat}
        theme={theme}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={title}
          user={session}
          theme={theme}
          onMenuClick={() => setSidebarOpen(true)}
          onToggleTheme={toggleTheme}
          onLogout={logout}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <motion.div
            className="w-full"
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
