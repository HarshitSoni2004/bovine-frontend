import React from 'react';
import '../styles/BreedInfo.css';
import { MapPinIcon, EyeIcon, DropletIcon, WrenchIcon, SparkleIcon, AlertIcon } from './Icons';

const FIELDS = [
  { key: 'origin',          label: 'Origin',           Icon: MapPinIcon },
  { key: 'characteristics', label: 'Characteristics',  Icon: EyeIcon },
  { key: 'milk_production', label: 'Milk Production',  Icon: DropletIcon },
  { key: 'uses',            label: 'Uses',             Icon: WrenchIcon },
  { key: 'fun_fact',        label: 'Insight',          Icon: SparkleIcon },
];

function SkeletonLoader() {
  return (
    <div className="skeleton-row">
      {FIELDS.map((f) => (
        <div className="skeleton-item" key={f.key}>
          <div className="skel skel-label" />
          <div className={`skel skel-value ${f.key === 'origin' ? 'short' : f.key === 'characteristics' ? 'long' : 'med'}`} />
        </div>
      ))}
    </div>
  );
}

export default function BreedInfo({ breedName, info, isLoading, error }) {
  return (
    <div>
      <div className="breed-info-heading">
        <div className="breed-info-title">
          {breedName ? `About ${breedName}` : 'Breed Information'}
        </div>
        <div className="breed-info-sub">AI-generated overview</div>
      </div>

      {isLoading && <SkeletonLoader />}

      {error && !isLoading && (
        <div className="breed-info-err">
          <AlertIcon />
          <span>{error}</span>
        </div>
      )}

      {info && !isLoading && (
        <div className="info-rows">
          {FIELDS.map(({ key, label, Icon }) => (
            <div className="info-row" key={key}>
              <div className="info-row-label">
                <Icon /> {label}
              </div>
              <div className="info-row-value">{info[key] || '—'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
