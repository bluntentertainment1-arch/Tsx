import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import FeaturedJobs from './FeaturedJobs';

// AdSense banner component
const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', margin: '1rem 0' }}
      data-ad-client="ca-pub-1819215492028258"
      data-ad-slot="8509863911"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

const CountrySelection: React.FC = () => {
  const navigate = useNavigate();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    setLoading(true);
    const response = await jobsApi.getAvailableCountries();
    
    if (response.data) {
      setCountries(response.data);
    }
    
    setLoading(false);
  };

  const getCountryFlag = (countryName: string): string => {
    const flagMap: { [key: string]: string } = {
      'poland': '🇵🇱',
      'czech republic': '🇨🇿',
      'germany': '🇩🇪',
      'romania': '🇷🇴',
      'hungary': '🇭🇺',
      'lithuania': '🇱🇹',
      'slovakia': '🇸🇰',
      'canada': '🇨🇦',
      'united kingdom': '🇬🇧',
      'uk': '🇬🇧',
    };
    
    return flagMap[countryName.toLowerCase()] || '🌍';
  };

  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleGermanJobsClick = () => {
    window.open('https://globalworkvisajobs.pages.dev', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="plane-animation">
          <i className="fa fa-plane text-blue-400 text-4xl"></i>
        </div>
        <div className="plane-animation">
          <i className="fa fa-plane text-indigo-400 text-3xl"></i>
        </div>
        <div className="plane-animation">
          <i className="fa fa-plane text-purple-400 text-5xl"></i>
        </div>
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-20 border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
                  <div className="earth-container absolute -bottom-2 left-1/2 transform -translate-x-1/2 scale-[0.15]">
                    <div className="earth"></div>
                  </div>
                  <i className="fa fa-plane text-2xl text-white relative z-10"></i>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Global Work Visa Jobs
                </h1>
                <p className="text-sm text-slate-600 font-medium">Your Gateway to European Opportunities</p>
              </div>
            </div>
            <div className="relative z-30">
              <button
                onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-white hover:scale-110 transform"
                aria-label="Menu"
              >
                <i className="fa fa-bars text-xl"></i>
              </button>
              {showMenuDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg w-48 z-30 border border-slate-200">
                  <button
                    onClick={() => {
                      navigate('/');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 rounded-t-xl border-b border-slate-100"
                  >
                    <i className="fa fa-home mr-2 text-blue-600"></i>
                    Home
                  </button>
                  <button
                    onClick={() => {
                      navigate('/blog');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-newspaper mr-2 text-indigo-600"></i>
                    Blog & Resources
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-bookmark mr-2 text-blue-600"></i>
                    Saved Jobs
                  </button>
                  <button
                    onClick={() => {
                      navigate('/visa-tips');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-lightbulb mr-2 text-purple-600"></i>
                    Visa Tips
                  </button>
                  <button
                    onClick={() => {
                      navigate('/about');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-info-circle mr-2 text-indigo-600"></i>
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      navigate('/contact');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-envelope mr-2 text-green-600"></i>
                    Contact
                  </button>
                  <button
                    onClick={() => {
                      navigate('/privacy');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-shield-alt mr-2 text-blue-600"></i>
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => {
                      navigate('/terms');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 border-b border-slate-100"
                  >
                    <i className="fa fa-file-text mr-2 text-green-600"></i>
                    Terms of Use
                  </button>
                  <button
                    onClick={() => {
                      navigate('/disclaimer');
                      setShowMenuDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors text-slate-700 rounded-b-xl"
                  >
                    <i className="fa fa-exclamation-triangle mr-2 text-amber-600"></i>
                    Disclaimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-blue-100">
              <p className="text-sm text-slate-600 font-medium">
                <i className="fa fa-calendar-alt mr-2 text-blue-600"></i>
                {getCurrentDate()}
              </p>
            </div>
          </div>
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-20"></div>
              <h2 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                Choose Your Destination
              </h2>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
            Discover visa-sponsored opportunities across Europe and start your journey today
          </p>
          <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-6 py-3 border border-blue-200 shadow-sm">
            <p className="text-sm text-blue-700 font-semibold">
              <i className="fa fa-sync-alt mr-2"></i>
              Jobs are updated every 24 hours
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : countries.length === 0 ? (
          <div className="text-center py-12">
            <i className="fa fa-inbox text-5xl text-slate-300 mb-4"></i>
            <p className="text-slate-500 text-lg">No countries available at the moment</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => navigate(`/jobs/${country.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="group relative bg-white rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                      {getCountryFlag(country)}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {country}
                    </h3>
                    <div className="mt-4 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold mr-2">Explore Jobs</span>
                      <i className="fa fa-arrow-right"></i>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* AdSense banner below country cards */}
            <AdBanner />

            {/* Featured jobs section */}
            <FeaturedJobs />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CountrySelection;
