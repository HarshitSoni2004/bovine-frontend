import React from 'react';

export default function About() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">About the project</p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Breeds Identifier</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What it does</h3>
          <p className="text-gray-700 dark:text-gray-300">
            This frontend is a professional dashboard for the existing FastAPI backend. It keeps the backend API contract unchanged and provides a secure, browser-based user session and history layer.
          </p>
          <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
            Visit the official BPA portal: <a href="https://bharatpashudhan.ndlm.co.in/" target="_blank" rel="noreferrer" className="underline">bharatpashudhan.ndlm.co.in</a>
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tech stack</h3>
          <ul className="space-y-2">
            <li className="text-gray-700 dark:text-gray-300">FastAPI backend</li>
            <li className="text-gray-700 dark:text-gray-300">PyTorch image classifier</li>
            <li className="text-gray-700 dark:text-gray-300">EfficientNet-B3 model</li>
            <li className="text-gray-700 dark:text-gray-300">React with React Router</li>
            <li className="text-gray-700 dark:text-gray-300">Framer Motion animations</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Model summary</h3>
          <p className="text-gray-700 dark:text-gray-300">
            The classifier identifies Indian cow and buffalo breeds, returns top-3 predictions, and provides a breed info assistant powered by the existing backend endpoints.
          </p>
        </section>
      </div>
    </div>
  );
}
