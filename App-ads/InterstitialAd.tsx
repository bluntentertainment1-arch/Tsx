import React, { useEffect, useState } from 'react';
import { useAdMob } from '../context/AdMobProvider';

interface InterstitialAdProps {
  onAdClosed: () => void;
  show: boolean;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ onAdClosed, show }) => {
  const { consentGiven, isAdLoaded } = useAdMob();
  const [countdown, setCountdown] = useState(5);
  const [adShown, setAdShown] = useState(false);

  useEffect(() => {
    if (show && consentGiven && isAdLoaded && !adShown) {
      setAdShown(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimeout(() => {
              onAdClosed();
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [show, consentGiven, isAdLoaded, onAdClosed, adShown]);

  if (!show || !consentGiven || !isAdLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Advertisement</h3>
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
            {countdown}s
          </div>
        </div>
        
        <div className="bg-slate-100 rounded-xl p-8 mb-4 min-h-[250px] flex items-center justify-center">
          <div className="text-center">
            <i className="fa fa-ad text-6xl text-slate-400 mb-4"></i>
            <p className="text-slate-600">Interstitial Ad</p>
            <p className="text-sm text-slate-500 mt-2">Test Ad - ca-app-pub-3940256099942544/1033173712</p>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 text-center">
          Redirecting to application page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default InterstitialAd;