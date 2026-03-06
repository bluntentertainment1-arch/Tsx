import React, { useEffect, useRef } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "autorelaxed";
  layout?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({
  slot,
  format = "auto",
  layout,
  responsive = "true",
  style = { display: "block" },
  className = "",
}) => {

  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      if (adRef.current && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1819215492028258"
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdSense;
