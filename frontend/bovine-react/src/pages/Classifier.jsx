import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import UploadDropzone from '../components/UploadDropzone';
import BreedInfoGrid from '../components/BreedInfoGrid';
import { predictImage, fetchBreedInfo } from '../api';

export default function Classifier() {
  const { activePrediction, addPrediction } = useAppContext();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [breedInfo, setBreedInfo] = useState(null);
  const [topBreed, setTopBreed] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [error, setError] = useState('');
  const [breedError, setBreedError] = useState('');
  const [loading, setLoading] = useState(false);
  const [breedLoading, setBreedLoading] = useState(false);

  useEffect(() => {
    if (!activePrediction) {
      return;
    }
    setPreview(activePrediction.previewDataUrl || '');
    setFileName(activePrediction.fileName || 'Saved preview');
    setPredictions(activePrediction.predictions || []);
    setBreedInfo(activePrediction.breedInfo || null);
    setTopBreed(activePrediction.breedName || '');
    setAnimalType(activePrediction.animalType || '');
  }, [activePrediction]);

  const handleFileSelect = (nextFile, dataUrl) => {
    setFile(nextFile);
    setPreview(dataUrl);
    setFileName(nextFile.name);
    setPredictions([]);
    setBreedInfo(null);
    setTopBreed('');
    setError('');
    setBreedError('');
  };

  const handleRemove = () => {
    setFile(null);
    setPreview('');
    setFileName('');
    setPredictions([]);
    setBreedInfo(null);
    setTopBreed('');
    setError('');
    setBreedError('');
  };

  const loadBreedInfo = async (breedName) => {
    setBreedLoading(true);
    setBreedError('');

    try {
      const { info, warning } = await fetchBreedInfo(breedName);
      setBreedInfo(info);
      if (warning) {
        setBreedError(warning);
      }
      return info;
    } catch (err) {
      setBreedError(err.message);
      return null;
    } finally {
      setBreedLoading(false);
    }
  };

  const handleClassify = async () => {
    if (!file) {
      setError('Please select an image to classify.');
      return;
    }

    setLoading(true);
    setError('');
    setPredictions([]);
    setBreedInfo(null);
    setTopBreed('');
    setBreedError('');

    try {
      const result = await predictImage(file);
      setPredictions(result.predictions || []);
      setTopBreed(result.top_breed || 'Unknown');
      setAnimalType(result.animal_type || 'Unknown');

      const info = await loadBreedInfo(result.top_breed);
      const savedItem = {
        breedName: result.top_breed,
        animalType: result.animal_type,
        predictions: result.predictions || [],
        previewDataUrl: preview,
        fileName,
        breedInfo: info,
      };
      addPrediction(savedItem);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const topPrediction = useMemo(() => predictions[0] || null, [predictions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Classifier</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload image</h2>
          </div>

          <UploadDropzone
            preview={preview}
            fileName={fileName}
            onFileSelect={handleFileSelect}
            onRemove={handleRemove}
            onSubmit={handleClassify}
            isLoading={loading}
            error={error}
          />
        </section>

        <motion.section
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
        >
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Prediction</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top results</h2>
          </div>

          {!topPrediction ? (
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">Upload an image to see the breed, confidence and summary cards.</div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{topPrediction.display_name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{topPrediction.animal_type}</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{topPrediction.confidence.toFixed(1)}%</div>
            </div>
          )}

          {predictions.length > 0 && (
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={prediction.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{index + 1}. {prediction.display_name}</span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{prediction.confidence.toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-green-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(prediction.confidence, 100)}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </div>

      <BreedInfoGrid
        breedName={topBreed}
        info={breedInfo}
        loading={breedLoading}
        error={breedError}
      />
    </div>
  );
}
