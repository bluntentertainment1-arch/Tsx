import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData, formatBytes, deletePhotos, clearAppCaches, StorageData } from '../services/storage';

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [storageData, setStorageData] = useState<StorageData | null>(null);
  const [isQuickCleaning, setIsQuickCleaning] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = () => {
    const data = getStorageData();
    setStorageData(data);
  };

  const handleQuickClean = async () => {
    if (!storageData) return;
    
    setIsQuickCleaning(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const duplicatePhotos = storageData.photos.filter(p => p.isDuplicate).map(p => p.id);
    const largeCacheApps = storageData.appCaches
      .filter(a => a.cacheSize > 200000000)
      .map(a => a.id);
    
    let updatedData = storageData;
    if (duplicatePhotos.length > 0) {
      updatedData = deletePhotos(duplicatePhotos);
    }
    if (largeCacheApps.length > 0) {
      updatedData = clearAppCaches(largeCacheApps);
    }
    
    setStorageData(updatedData);
    setIsQuickCleaning(false);
  };

  if (!storageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  const usedPercentage = (storageData.usedStorage / storageData.totalStorage) * 100;

  return (
    <div className="min-h-screen bg-dark-bg pb-24 safe-bottom">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-8 safe-top">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <i className="fa fa-broom text-secondary mr-3"></i>
            Cleaner Guru
          </h1>
          <p className="text-gray-400">Optimize your device storage</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-effect rounded-3xl p-6 md:p-8 card-gradient">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-white">Storage Usage</h2>
              <i className="fa fa-chart-pie text-secondary text-2xl"></i>
            </div>
            
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${usedPercentage * 2.827} 282.7`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B80F9" />
                    <stop offset="100%" stopColor="#6B5FD9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {Math.round(usedPercentage)}%
                </span>
                <span className="text-sm text-gray-400 mt-1">Used</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Storage</span>
                <span className="text-white font-semibold">{formatBytes(storageData.totalStorage)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Used</span>
                <span className="text-orange-400 font-semibold">{formatBytes(storageData.usedStorage)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Free</span>
                <span className="text-green-400 font-semibold">{formatBytes(storageData.freeStorage)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleQuickClean}
              disabled={isQuickCleaning}
              className="w-full glass-effect rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 group disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className={`fa fa-magic text-white text-xl ${isQuickCleaning ? 'animate-spin' : ''}`}></i>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Quick Clean</h3>
                    <p className="text-sm text-gray-400">
                      {isQuickCleaning ? 'Cleaning...' : 'One-tap optimization'}
                    </p>
                  </div>
                </div>
                <i className="fa fa-chevron-right text-gray-400 group-hover:text-secondary transition-colors"></i>
              </div>
            </button>

            <button
              onClick={() => navigate('/photo-cleanup')}
              className="w-full glass-effect rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className="fa fa-images text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Photo Library</h3>
                    <p className="text-sm text-gray-400">{storageData.photos.length} photos</p>
                  </div>
                </div>
                <i className="fa fa-chevron-right text-gray-400 group-hover:text-secondary transition-colors"></i>
              </div>
            </button>

            <button
              onClick={() => navigate('/cache-cleanup')}
              className="w-full glass-effect rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className="fa fa-trash-restore text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">App Cache</h3>
                    <p className="text-sm text-gray-400">
                      {formatBytes(storageData.appCaches.reduce((sum, app) => sum + app.cacheSize, 0))}
                    </p>
                  </div>
                </div>
                <i className="fa fa-chevron-right text-gray-400 group-hover:text-secondary transition-colors"></i>
              </div>
            </button>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 card-gradient">
          <h2 className="text-xl font-semibold text-white mb-4">
            <i className="fa fa-lightbulb text-yellow-400 mr-2"></i>
            Quick Tips
          </h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <i className="fa fa-check-circle text-secondary mt-1"></i>
              <p className="text-gray-300 text-sm">Delete duplicate and blurry photos to free up space</p>
            </div>
            <div className="flex items-start space-x-3">
              <i className="fa fa-check-circle text-secondary mt-1"></i>
              <p className="text-gray-300 text-sm">Clear app caches regularly for better performance</p>
            </div>
            <div className="flex items-start space-x-3">
              <i className="fa fa-check-circle text-secondary mt-1"></i>
              <p className="text-gray-300 text-sm">Use Quick Clean for instant optimization</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-white border-opacity-10 safe-bottom">
        <div className="flex justify-around items-center h-20 max-w-7xl mx-auto px-4">
          <button className="flex flex-col items-center space-y-1 text-secondary">
            <i className="fa fa-tachometer-alt text-xl"></i>
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/photo-cleanup')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <i className="fa fa-images text-xl"></i>
            <span className="text-xs font-medium">Photos</span>
          </button>
          <button
            onClick={() => navigate('/cache-cleanup')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <i className="fa fa-trash-restore text-xl"></i>
            <span className="text-xs font-medium">Cache</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MainDashboard;