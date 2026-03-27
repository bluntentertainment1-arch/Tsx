import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import CountrySelection from './screens/CountrySelection';
import JobListing from './screens/JobListing';
import JobDetails from './screens/JobDetails';
import ApplyScreen from './screens/ApplyScreen';
import SavedJobs from './screens/SavedJobs';
import VisaTips from './screens/VisaTips';
import LegalPage from './screens/LegalPage';
import ContactPage from './screens/ContactPage';
import AboutPage from './screens/AboutPage';
import BlogHome from './screens/BlogHome';
import BlogPost from './screens/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('seenSplash');

    if (!hasSeenSplash) {
      setShowSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('seenSplash', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  // CRITICAL FIX: Handle resize and orientation changes
  useEffect(() => {
    const handleResize = () => {
      // Force body to recalculate width
      document.body.style.width = '100%';
      document.documentElement.style.width = '100%';
      document.body.style.zoom = '1.0';
      
      // Reset any scroll issues
      window.scrollTo(0, 0);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      // Delay to let iOS finish rotation animation
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* CRITICAL FIX: Full width wrapper with overflow control */}
      <div className="w-full max-w-full min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<CountrySelection />} />
          <Route path="/jobs/:country" element={<JobListing />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/apply/:jobId" element={<ApplyScreen />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/visa-tips" element={<VisaTips />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
