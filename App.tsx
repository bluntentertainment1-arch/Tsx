import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBannerAd } from './components/ads/AdUnits';
// Import other components as needed

const App: React.FC = () => {
  useEffect(() => {
    // Inject AdSense script globally only once
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1819215492028258";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      // Cleanup not strictly necessary for AdSense script but good practice
      const existingScript = document.querySelector(`script[src*="adsbygoogle"]`);
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header Component Placeholder */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4"> 
           <h1 className="font-bold">Kidurbhao</h1>
        </header>

        {/* 1. TOP BANNER DISPLAY AD - Below header */}
        <TopBannerAd />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            {/* Other routes */}
          </Routes>
        </main>

        {/* Multiplex Ad usually goes here, before footer */}
        <Routes>
           <Route path="/" element={<div className="mt-8"><MultiplexAd /></div>} />
           <Route path="/jobs/:id" element={<div className="mt-8"><MultiplexAd /></div>} />
        </Routes>

        <footer className="bg-gray-800 text-white p-8 mt-auto">
           <p>&copy; 2024 Kidurbhao</p>
        </footer>
      </div>
    </Router>
  );
};

// Example usage of In-Article Ad inside a list or content
const HomePage = () => {
  const items = Array.from({ length: 20 });
  return (
    <div className="max-w-4xl mx-auto p-4">
      {items.map((_, index) => (
        <React.Fragment key={index}>
          <div className="p-4 mb-4 bg-white border rounded">Job Listing Item {index + 1}</div>
          {/* 2. IN-ARTICLE AD - After every 8 items */}
          {(index + 1) % 8 === 0 && <InArticleAd />}
        </React.Fragment>
      ))}
    </div>
  );
};

const JobDetailPage = () => (
  <div className="max-w-3xl mx-auto p-4 prose">
    <p>Paragraph 1: Lorem ipsum dolor sit amet...</p>
    <p>Paragraph 2: Consectetur adipiscing elit...</p>
    {/* 2. IN-ARTICLE AD - After 2nd paragraph */}
    <InArticleAd />
    <p>Paragraph 3: Sed do eiusmod tempor incididunt...</p>
    <p>Paragraph 4: Ut labore et dolore magna aliqua...</p>
  </div>
);

export default App;