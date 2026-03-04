import React, { useEffect, useRef, useState } from 'react';
import { useAdMob } from '../context/AdMobProvider';

interface BannerAdProps {
  className?: string;
}

const BannerAd: React.FC<BannerAdProps> = ({ className = '' }) => {
  const { consentGiven, isAdLoaded } = useAdMob();
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);
  const [adError, setAdError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (consentGiven && isAdLoaded && adRef.current && !adInitialized.current) {
      const loadTimeout = setTimeout(() => {
        setIsLoading(false);
        setAdError(true);
      }, 5000);

      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        adInitialized.current = true;
        
        setTimeout(() => {
          clearTimeout(loadTimeout);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading banner ad:', error);
        clearTimeout(loadTimeout);
        setIsLoading(false);
        setAdError(true);
      }
    }
  }, [consentGiven, isAdLoaded]);

  if (!consentGiven) return null;

  return (
    <div className={`w-full flex justify-center items-center bg-slate-50 py-2 ${className}`}>
      {isLoading && (
        <div className="flex items-center space-x-2 text-slate-400">
          <i className="fa fa-spinner fa-spin"></i>
          <span className="text-sm">Loading ad...</span>
        </div>
      )}
      {adError && !isLoading && (
        <div className="text-xs text-slate-400 py-2">
          Advertisement
        </div>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: isLoading || adError ? 'none' : 'block' }}
        data-ad-client="ca-app-pub-3940256099942544"
        data-ad-slot="6300978111"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default BannerAd;