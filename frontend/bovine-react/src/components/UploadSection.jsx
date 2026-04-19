import React, { useRef, useState } from 'react';
import '../styles/UploadSection.css';
import { UploadIcon, XIcon, SearchIcon, AlertIcon } from './Icons';

export default function UploadSection({ onFileSelected, onClassify, isLoading, hasFile, error }) {
  const inputRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const loadFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    onFileSelected(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDrag(true); };
  const handleDragLeave = () => setIsDrag(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsDrag(false);
    loadFile(e.dataTransfer.files[0]);
  };
  const handleChange = (e) => loadFile(e.target.files[0]);

  const handleReset = () => {
    setPreview(null); setFileName('');
    if (inputRef.current) inputRef.current.value = '';
    onFileSelected(null);
  };

  return (
    <div>
      {!preview ? (
        <div
          className={`drop-zone${isDrag ? ' drag-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="dz-icon"><UploadIcon /></div>
          <p className="dz-title"><span>Click to upload</span> or drag and drop</p>
          <p className="dz-sub">JPG, PNG, WebP supported</p>
        </div>
      ) : (
        <div className="preview-wrap">
          <img src={preview} alt="Uploaded preview" className="preview-img" />
          <div className="preview-controls">
            <span className="preview-filename">{fileName}</span>
            <button className="remove-btn" onClick={handleReset}>
              <XIcon /> Remove
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="file-input"
        onChange={handleChange}
      />

      {error && (
        <div className="upload-error">
          <AlertIcon /><span>{error}</span>
        </div>
      )}

      <button
        className="classify-btn"
        onClick={onClassify}
        disabled={!hasFile || isLoading}
      >
        {isLoading
          ? <><div className="spinner" />Analyzing…</>
          : <><SearchIcon />Identify Breed</>
        }
      </button>
    </div>
  );
}
