import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardIcon, ClassifierIcon, ChatIcon, AboutIcon } from './Icons';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'Classifier', path: '/classifier', icon: ClassifierIcon },
  { label: 'Chat', path: '/chat', icon: ChatIcon },
  { label: 'About', path: '/about', icon: AboutIcon },
];

export default function Sidebar({ open, onClose, user, onLogout, predictionHistory, chatHistory, restorePrediction, restoreChat, theme }) {
  const navigate = useNavigate();

  const handlePredictionClick = (item) => {
    restorePrediction(item);
    navigate('/classifier');
    onClose();
  };

  const handleChatClick = (item) => {
    restoreChat(item);
    navigate('/chat');
    onClose();
  };

  return (
    <>
    <aside className={`fixed md:static top-14 md:top-0 left-0 z-20 h-[calc(100vh-3.5rem)] md:h-screen transition-all duration-300 w-64 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-r shadow-lg flex flex-col overflow-hidden`}>
      <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 p-6">
        <div className="flex items-center justify-between pb-4 border-b" style={{
          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
        }}>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">Breeds Identifier</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              AI support for breed registration and BPA data quality
            </p>
          </div>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-yellow-400' 
              : 'bg-yellow-100 text-yellow-600'
          }`}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </div>
        </div>
      </div>

      <nav className="flex-shrink-0 px-6 space-y-2 mb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-900'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={onClose}
              title={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-6">
        <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          History
        </div>

        <div className="space-y-3 mb-6">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            Predictions
          </div>
          {predictionHistory.length ? (
            predictionHistory.slice(0, 4).map((item) => (
              <button
                type="button"
                key={item.id}
                className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
                onClick={() => handlePredictionClick(item)}
              >
                <div className="text-sm font-medium">{item.breedName}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))
          ) : (
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No saved predictions yet
            </div>
          )}
        </div>

        <div className="space-y-3 pb-6">
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            Chat sessions
          </div>
          {chatHistory.length ? (
            chatHistory.slice(0, 4).map((item) => (
              <button
                type="button"
                key={item.id}
                className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                }`}
                onClick={() => handleChatClick(item)}
              >
                <div className="text-sm font-medium">{item.title}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))
          ) : (
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No chats yet
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 p-6 border-t" style={{
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
      }}>
        <div className={`flex items-center gap-3 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
          theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-900'
        }`}>
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium truncate ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {user?.username}
          </div>
          <div className={`text-xs truncate ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {user?.email}
          </div>
        </div>
        <button
          type="button"
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          onClick={onLogout}
          title="Logout"
        >
          <span className="text-sm font-medium">Logout</span>
        </button>
        </div>
      </div>
    </div>
    </aside>
    {open && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
    )}
    </>
  );
}
