import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function UploadDropzone({ preview, fileName, onFileSelect, onRemove, onSubmit, isLoading, error }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const updateFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      onFileSelect(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    updateFile(event.dataTransfer.files[0]);
  };

  const handleChange = (event) => {
    updateFile(event.target.files[0]);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400 dark:hover:border-gray-500 ${
          dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <motion.div
          className=""
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {preview ? (
            <img className="max-w-full h-auto rounded-lg shadow-sm" src={preview} alt="Selected preview" />
          ) : (
            <div className="space-y-2">
              <strong className="text-lg font-semibold text-gray-900 dark:text-white">Drag & drop or browse</strong>
              <span className="text-sm text-gray-600 dark:text-gray-400">Upload a cow or buffalo image.</span>
            </div>
          )}
        </motion.div>
      </div>

      {preview && (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm text-gray-700 dark:text-gray-300">{fileName}</span>
          <button
            type="button"
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      )}

      {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

      <button
        type="button"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        onClick={onSubmit}
        disabled={!preview || isLoading}
      >
        {isLoading ? 'Analyzing image…' : 'Run classification'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
