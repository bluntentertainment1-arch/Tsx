import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-dark-bg to-secondary flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-secondary opacity-20 blur-3xl rounded-full animate-pulse-slow"></div>
          <i className="fa fa-broom text-8xl text-secondary relative z-10 animate-pulse"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Cleaner Guru
        </h1>
        <p className="text-gray-400 text-lg">
          Optimize Your Storage
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;