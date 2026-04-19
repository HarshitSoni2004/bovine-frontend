import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from './Icons';

export default function LandingNavbar({ theme, onToggleTheme }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/" className="flex items-center gap-2 md:gap-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <span className="text-base md:text-lg font-semibold">Breeds Identifier</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            <span className="hidden sm:inline text-sm font-medium">{theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="px-3 md:px-4 py-2 text-sm md:text-base bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
          <button
            className="px-3 md:px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}