import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { sendChatMessage } from '../api';

const initialBotMessage = {
  id: 'welcome',
  role: 'bot',
  text: 'Ask me anything about Indian cattle breeds.',
};

export default function Chat() {
  const { activeChat, addChat } = useAppContext();
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeChat?.messages?.length) {
      setMessages(activeChat.messages);
      setInput('');
      setError('');
    }
  }, [activeChat]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [...messages, { id: `user-${Date.now()}`, role: 'user', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await sendChatMessage(trimmed);
      const updated = [...nextMessages, { id: `bot-${Date.now()}`, role: 'bot', text: response }];
      setMessages(updated);
      addChat({ title: trimmed, messages: updated });
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [...prev, { id: `bot-fail-${Date.now()}`, role: 'bot', text: 'Unable to fetch a response. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Cattle assistant</p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Chat with the breed expert</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.map((item) => (
            <motion.div
              key={item.id}
              className={`p-3 rounded-lg ${
                item.role === 'user'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 ml-auto max-w-xs'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 max-w-xs'
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24 }}
            >
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>

        {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && !loading && handleSend()}
            placeholder="Ask a breed question..."
            disabled={loading}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
