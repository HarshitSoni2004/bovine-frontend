import React from 'react';

export default function HistoryList({ title, items, renderItem, emptyText }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {items.length ? (
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <button
              type="button"
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
              key={item.id}
              onClick={() => renderItem(item)}
            >
              <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">{emptyText}</div>
      )}
    </section>
  );
}
