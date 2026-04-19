import React from 'react';

export default function StatCard({ label, value, note }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</div>
      {note && <div className="text-xs text-gray-500 dark:text-gray-400">{note}</div>}
    </div>
  );
}
