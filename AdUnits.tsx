import React from 'react';
import { useLocation } from 'react-router-dom';
import AdSense from './AdSense';

const EXCLUDED_PATHS = ['/privacy-policy', '/about-us', '/contact'];

const useAdVisibility = () => {
  const location = useLocation();
  return !EXCLUDED_PATHS.includes(location.pathname);
};

export const TopBannerAd = () => {
  if (!useAdVisibility()) return null;
  return (
    <AdSense 
      slot="8509863911" 
      format="auto" 
      responsive="true" 
      className="w-full max-w-7xl mx-auto px-4"
    />
  );
};

export const InArticleAd = () => {
  if (!useAdVisibility()) return null;
  return (
    <AdSense 
      slot="9739185101" 
      format="fluid" 
      layout="in-article" 
      style={{ display: 'block', textAlign: 'center' }}
      className="w-full"
    />
  );
};

export const MultiplexAd = () => {
  if (!useAdVisibility()) return null;
  return (
    <AdSense 
      slot="4634556878" 
      format="autorelaxed" 
      className="w-full max-w-7xl mx-auto px-4"
    />
  );
};