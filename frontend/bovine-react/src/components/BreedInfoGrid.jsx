import React from 'react';

const FIELDS = [
  { key: 'origin', label: 'Origin' },
  { key: 'characteristics', label: 'Characteristics' },
  { key: 'milk_production', label: 'Milk production' },
  { key: 'uses', label: 'Primary uses' },
  { key: 'fun_fact', label: 'Fun fact' },
];

export default function BreedInfoGrid({ breedName, info, loading, error }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Breed details</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{breedName || 'Breed profile'}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered insights for the selected prediction</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELDS.map((field) => (
            <div key={field.key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400 text-center py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELDS.map((field) => (
            <div key={field.key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="font-medium text-gray-900 dark:text-white mb-2">{field.label}</div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{info?.[field.key] || 'Information unavailable.'}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
