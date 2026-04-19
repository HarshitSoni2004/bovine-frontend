import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/StatCard';
import HistoryList from '../components/HistoryList';

export default function Dashboard() {
  const navigate = useNavigate();
  const { predictionHistory, chatHistory, restorePrediction, restoreChat } = useAppContext();

  const recentActivity = [
    ...predictionHistory.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.breedName,
      subtitle: 'Prediction',
      createdAt: item.createdAt,
      action: () => restorePrediction(item),
      path: '/classifier',
    })),
    ...chatHistory.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: 'Chat',
      createdAt: item.createdAt,
      action: () => restoreChat(item),
      path: '/chat',
    })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overview</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Activity at a glance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total predictions" value={predictionHistory.length} note="Saved in local history" />
            <StatCard label="Chat sessions" value={chatHistory.length} note="Recent conversations" />
            <StatCard label="Available pages" value="4" note="Classifier, Chat, About, Dashboard" />
          </div>

          <div className="mt-6">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick actions</p>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => navigate('/classifier')}
              >
                Run classifier
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => navigate('/chat')}
              >
                Open chat
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Recent activity</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Latest entries</h2>
          </div>

          {recentActivity.length ? (
            <div className="space-y-2">
              {recentActivity.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full text-left"
                  onClick={() => {
                    item.action();
                    navigate(item.path);
                  }}
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">No activity yet. Start by uploading an image or sending a chat message.</div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoryList
          title="Prediction history"
          items={predictionHistory.map((item) => ({
            ...item,
            title: item.breedName,
          }))}
          renderItem={(item) => {
            restorePrediction(item);
            navigate('/classifier');
          }}
          emptyText="No saved predictions yet"
        />

        <HistoryList
          title="Chat history"
          items={chatHistory.map((item) => ({
            ...item,
            title: item.title,
          }))}
          renderItem={(item) => {
            restoreChat(item);
            navigate('/chat');
          }}
          emptyText="No chat sessions yet"
        />
      </div>
    </div>
  );
}
