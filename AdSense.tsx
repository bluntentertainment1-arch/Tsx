import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'autorelaxed';
  layout?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  slot, 
  format = 'auto', 
  layout, 
  responsive = 'true', 
  style = { display: 'block' },
  className = ''
}) => {
  const location = useLocation();

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense push error:', err);
    }
  }, [location.pathname]); // Re-run on route change

  return (
    <div className={`adsense-container my-6 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1819215492028258"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-layout={layout}
      />
    </div>
  );
};

export default AdSense;