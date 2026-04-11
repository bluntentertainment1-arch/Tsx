import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData, clearAppCaches, formatBytes, AppCacheItem } from '../services/storage';

const AppCacheCleanup: React.FC = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppCacheItem[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    const data = getStorageData();
    setApps(data.appCaches);
  };

  const selectedApps = apps.filter(a => a.selected);
  const selectedSize = selectedApps.reduce((sum, a) => sum + a.cacheSize, 0);

  const toggleApp = (id: string) => {
    setApps(apps.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const toggleSelectAll = () => {
    const allSelected = apps.every(a => a.selected || a.cacheSize === 0);
    setApps(apps.map(a => ({ ...a, selected: a.cacheSize > 0 ? !allSelected : false })));
  };

  const handleClearCache = async () => {
    if (selectedApps.length === 0) return;
    
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const selectedIds = selectedApps.map(a => a.id);
    clearAppCaches(selectedIds);
    loadApps();
    setIsClearing(false);
  };

  const totalCacheSize = apps.reduce((sum, a) => sum + a.cacheSize, 0);

  return (
    <div className="min-h-screen bg-dark-bg pb-24 safe-bottom">
      <div className="sticky top-0 z-10 bg-card-bg border-b border-white border-opacity-10 safe-top">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center hover:bg-opacity-20 transition-all"
            >
              <i className="fa fa-arrow-left text-white"></i>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-white">App Cache</h1>
            <button
              onClick={toggleSelectAll}
              className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center hover:bg-opacity-20 transition-all"
            >
              <i className={`fa ${apps.every(a => a.selected || a.cacheSize === 0) ? 'fa-check-square' : 'fa-square'} text-secondary`}></i>
            </button>
          </div>

          <div className="glass-effect rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Cache Size</p>
                <p className="text-white text-2xl font-bold">{formatBytes(totalCacheSize)}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center">
                <i className="fa fa-trash-restore text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => app.cacheSize > 0 && toggleApp(app.id)}
              className={`glass-effect rounded-2xl p-4 transition-all ${
                app.cacheSize > 0 ? 'cursor-pointer hover:bg-opacity-10' : 'opacity-50'
              } ${app.selected ? 'ring-2 ring-secondary' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    app.cacheSize > 0 ? 'from-blue-500 to-blue-600' : 'from-gray-600 to-gray-700'
                  } flex items-center justify-center flex-shrink-0`}>
                    <i className={`fab ${app.icon} text-white text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{app.name}</h3>
                    <p className={`text-sm ${app.cacheSize > 0 ? 'text-gray-400' : 'text-green-400'}`}>
                      {app.cacheSize > 0 ? formatBytes(app.cacheSize) : 'Cache cleared'}
                    </p>
                  </div>
                </div>
                {app.cacheSize > 0 && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all flex-shrink-0 ml-3 ${
                    app.selected ? 'bg-secondary' : 'bg-white bg-opacity-20'
                  }`}>
                    {app.selected && <i className="fa fa-check text-white text-xs"></i>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {apps.every(a => a.cacheSize === 0) && (
          <div className="text-center py-20">
            <i className="fa fa-check-circle text-6xl text-green-500 mb-4"></i>
            <p className="text-white text-lg font-semibold">All Clean!</p>
            <p className="text-gray-400 text-sm mt-2">No app caches to clear</p>
          </div>
        )}
      </div>

      {selectedApps.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 safe-bottom">
          <div className="container mx-auto max-w-7xl">
            <div className="glass-effect rounded-2xl p-4 border border-white border-opacity-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{selectedApps.length} apps selected</p>
                  <p className="text-gray-400 text-sm">{formatBytes(selectedSize)} will be freed</p>
                </div>
                <button
                  onClick={handleClearCache}
                  disabled={isClearing}
                  className="px-6 py-3 bg-gradient-to-r from-secondary to-purple-600 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {isClearing ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fa fa-broom mr-2"></i>
                      Clear Cache
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card-bg border-t border-white border-opacity-10 safe-bottom">
        <div className="flex justify-around items-center h-20 max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
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
          <button className="flex flex-col items-center space-y-1 text-secondary">
            <i className="fa fa-trash-restore text-xl"></i>
            <span className="text-xs font-medium">Cache</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppCacheCleanup;