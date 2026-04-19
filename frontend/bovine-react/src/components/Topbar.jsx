import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MoonIcon, SunIcon, MenuIcon, ChevronDownIcon } from './Icons';

export default function Topbar({ title, theme, onMenuClick, onToggleTheme, onLogout, user }) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 h-14 flex items-center justify-between px-4 md:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    } border-b backdrop-blur-sm`} style={{ margin: 0, padding: '0.75rem 1rem' }}>
      <div className="flex items-center gap-4">
        <button
          className={`flex md:hidden p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="hidden md:block">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back</p>
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          <span className="hidden sm:inline text-sm">{theme === 'light' ? 'Light' : 'Dark'}</span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            aria-label="User menu"
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
              theme === 'dark' ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-900'
            }`}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </span>
            <span className={`hidden md:block text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {user?.username || 'User'}
            </span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          {userDropdownOpen && (
            <div className={`absolute right-0 top-full mt-2 w-48 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-lg shadow-lg z-50`}>
              <button
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                }`}
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
