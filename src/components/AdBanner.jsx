import React, { useEffect } from 'react';

const AdBanner = ({ slot, style = {} }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle error:', e);
    }
  }, []);

  return (
    <div className="ad-container" style={{ margin: '2rem 0', textAlign: 'center', overflow: 'hidden', ...style }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7740189048271049"
           data-ad-slot={slot || "auto"}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdBanner;
