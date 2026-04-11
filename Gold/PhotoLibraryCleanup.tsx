import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData, deletePhotos, formatBytes, PhotoItem, addPhotosFromFiles } from '../services/storage';

type FilterType = 'all' | 'duplicate' | 'blurry' | 'old';

const PhotoLibraryCleanup: React.FC = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    const data = getStorageData();
    setPhotos(data.photos);
  };

  const filteredPhotos = useCallback(() => {
    switch (filter) {
      case 'duplicate':
        return photos.filter(p => p.isDuplicate);
      case 'blurry':
        return photos.filter(p => p.isBlurry);
      case 'old':
        return photos.filter(p => p.isOld);
      default:
        return photos;
    }
  }, [photos, filter]);

  const selectedPhotos = filteredPhotos().filter(p => p.selected);
  const selectedSize = selectedPhotos.reduce((sum, p) => sum + p.size, 0);

  const togglePhoto = (id: string) => {
    setPhotos(photos.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const toggleSelectAll = () => {
    const filtered = filteredPhotos();
    const allSelected = filtered.every(p => p.selected);
    setPhotos(photos.map(p => {
      if (filtered.find(fp => fp.id === p.id)) {
        return { ...p, selected: !allSelected };
      }
      return p;
    }));
  };

  const handleDelete = async () => {
    if (selectedPhotos.length === 0) return;
    
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedIds = selectedPhotos.map(p => p.id);
    deletePhotos(selectedIds);
    loadPhotos();
    setIsDeleting(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      addPhotosFromFiles(fileArray);
      loadPhotos();
    }
  };

  const filterOptions = [
    { value: 'all' as FilterType, label: 'All Photos', icon: 'fa-th' },
    { value: 'duplicate' as FilterType, label: 'Duplicates', icon: 'fa-copy' },
    { value: 'blurry' as FilterType, label: 'Blurry', icon: 'fa-eye-slash' },
    { value: 'old' as FilterType, label: 'Old Photos', icon: 'fa-clock' },
  ];

  const currentFilter = filterOptions.find(f => f.value === filter);

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
            <h1 className="text-xl md:text-2xl font-bold text-white">Photo Library</h1>
            <label className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center hover:bg-opacity-20 transition-all cursor-pointer">
              <i className="fa fa-plus text-white"></i>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full glass-effect rounded-xl px-4 py-3 flex items-center justify-between hover:bg-opacity-20 transition-all"
              >
                <div className="flex items-center space-x-2">
                  <i className={`fa ${currentFilter?.icon} text-secondary`}></i>
                  <span className="text-white font-medium">{currentFilter?.label}</span>
                </div>
                <i className={`fa fa-chevron-down text-gray-400 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {showFilterMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-xl overflow-hidden border border-white border-opacity-10 shadow-xl">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilter(option.value);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-white hover:bg-opacity-5 transition-all ${
                        filter === option.value ? 'bg-secondary bg-opacity-20' : ''
                      }`}
                    >
                      <i className={`fa ${option.icon} ${filter === option.value ? 'text-secondary' : 'text-gray-400'}`}></i>
                      <span className={`${filter === option.value ? 'text-secondary font-semibold' : 'text-white'}`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleSelectAll}
              className="glass-effect rounded-xl px-4 py-3 hover:bg-opacity-20 transition-all"
            >
              <i className={`fa ${filteredPhotos().every(p => p.selected) ? 'fa-check-square' : 'fa-square'} text-secondary`}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {filteredPhotos().length === 0 ? (
          <div className="text-center py-20">
            <i className="fa fa-images text-6xl text-gray-600 mb-4"></i>
            <p className="text-gray-400 text-lg">No photos found</p>
            <p className="text-gray-500 text-sm mt-2">
              {filter !== 'all' ? 'Try changing the filter' : 'Add photos to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredPhotos().map((photo) => (
              <div
                key={photo.id}
                onClick={() => togglePhoto(photo.id)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group ${
                  photo.selected ? 'ring-4 ring-secondary' : ''
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-2 right-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    photo.selected ? 'bg-secondary' : 'bg-white bg-opacity-30 backdrop-blur-sm'
                  }`}>
                    {photo.selected && <i className="fa fa-check text-white text-xs"></i>}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="flex flex-wrap gap-1">
                    {photo.isDuplicate && (
                      <span className="px-2 py-1 bg-orange-500 bg-opacity-80 backdrop-blur-sm rounded text-xs text-white">
                        Duplicate
                      </span>
                    )}
                    {photo.isBlurry && (
                      <span className="px-2 py-1 bg-red-500 bg-opacity-80 backdrop-blur-sm rounded text-xs text-white">
                        Blurry
                      </span>
                    )}
                    {photo.isOld && (
                      <span className="px-2 py-1 bg-blue-500 bg-opacity-80 backdrop-blur-sm rounded text-xs text-white">
                        Old
                      </span>
                    )}
                  </div>
                  <p className="text-white text-xs mt-1 truncate">{formatBytes(photo.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPhotos.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 safe-bottom">
          <div className="container mx-auto max-w-7xl">
            <div className="glass-effect rounded-2xl p-4 border border-white border-opacity-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{selectedPhotos.length} photos selected</p>
                  <p className="text-gray-400 text-sm">{formatBytes(selectedSize)} will be freed</p>
                </div>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {isDeleting ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fa fa-trash mr-2"></i>
                      Delete
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
          <button className="flex flex-col items-center space-y-1 text-secondary">
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

export default PhotoLibraryCleanup;