import React, { useEffect, useRef } from 'react';
import '../styles/ResultsSection.css';
import { TriangleAlertIcon } from './Icons';

const FILL_CLASS = ['is-top', 'is-2nd', 'is-3rd'];

function Bar({ pct, rank, animate }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!animate || !ref.current) return;
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.width = pct + '%';
    }, rank * 130 + 80);
    return () => clearTimeout(t);
  }, [animate, pct, rank]);

  return (
    <div className="pred-bar-track">
      <div ref={ref} className={`pred-bar-fill ${FILL_CLASS[rank - 1]}`} style={{ width: 0 }} />
    </div>
  );
}

export default function ResultsSection({ predictions, isRejection, rejectionMessage }) {
  const hasData = (predictions && predictions.length > 0) || isRejection;

  if (!hasData) {
    return (
      <div className="results-empty">
        Upload an image above to see breed predictions
      </div>
    );
  }

  if (isRejection) {
    return (
      <div className="rejection-wrap">
        <div className="rejection-title">
          <TriangleAlertIcon /> Validation Failed
        </div>
        <p className="rejection-msg">{rejectionMessage}</p>
        <div className="rejection-tips">
          <strong>For best results:</strong>
          <ul>
            <li>Upload a clear photo of a single cow or buffalo</li>
            <li>Animal should be the main subject, well-lit</li>
            <li>Front or side-facing angle works best</li>
            <li>Avoid heavily cluttered backgrounds</li>
          </ul>
        </div>
      </div>
    );
  }

  const top = predictions[0];

  return (
    <div className="results-container">
      {/* Hero — top prediction */}
      <div className="result-hero">
        <div className="result-hero-label">Identified as</div>
        <div className="result-hero-name">{top.display_name}</div>
        <div className="result-hero-meta">
          <span className="result-type-chip">{top.animal_type}</span>
          <span className="result-confidence-large">
            <strong>{top.confidence.toFixed(1)}%</strong> confidence
          </span>
        </div>
      </div>

      <div className="results-sep" />

      {/* Top 3 */}
      <div className="top3-label">Top 3 Predictions</div>
      <div className="pred-list">
        {predictions.map((pred, i) => (
          <div key={pred.label} className="pred-row">
            <span className="pred-rank">{i + 1}</span>
            <div className="pred-content">
              <div className="pred-name-row">
                <span className={`pred-name${i === 0 ? ' is-top' : ''}`}>{pred.display_name}</span>
                <span className={`pred-pct${i === 0 ? ' is-top' : ''}`}>{pred.confidence.toFixed(1)}%</span>
              </div>
              <Bar pct={pred.confidence} rank={i + 1} animate={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
