import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import LandingNavbar from '../components/LandingNavbar';

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingNavbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="px-0">
        <motion.section
          className="py-16 md:py-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Breeds Identifier</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">AI-powered breed validation for the Bharat Pashudhan App.</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Help FLWs capture accurate cattle and buffalo breed data with image-based classification, improving BPA registration and research-quality records.
              </p>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  onClick={() => navigate('/signup')}
                >
                  Get started
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </button>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🐄</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Classification</h3>
                <p className="text-gray-600 dark:text-gray-400">Advanced machine learning identifies 10+ Indian cattle breeds with high accuracy.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">Track predictions, view history, and analyze breed characteristics in detail.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Chat Assistant</h3>
                <p className="text-gray-600 dark:text-gray-400">Get breed-specific insights and recommendations through our intelligent chatbot.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-16 md:py-20 px-4 bg-white dark:bg-gray-800 mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast & Accurate</h3>
              <p className="text-gray-600 dark:text-gray-400">Lightning-fast breed classification with industry-leading accuracy rates.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400">Your data stays private. All processing happens locally with secure encryption.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 dark:text-gray-500 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Breeds Identifier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
