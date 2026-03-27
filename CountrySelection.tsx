import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import FeaturedJobs from './FeaturedJobs';

const CountrySelection: React.FC = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  // FIX: Use useCallback to prevent unnecessary re-renders
  const loadCountries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await jobsApi.getAvailableCountries();
      
      if (response.data) {
        setCountries(response.data);
      }
    } catch (error) {
      console.error('Failed to load countries:', error);
      // Set default countries if API fails for faster loading
      setCountries(['Germany', 'Poland', 'Czech Republic', 'Romania', 'UK', 'Canada']);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  // FIX: Memoize flag map to prevent recreation on every render
  const getCountryFlag = useCallback((countryName: string): string => {
    const flagMap: { [key: string]: string } = {
      germany: '🇩🇪',
      poland: '🇵🇱',
      'czech republic': '🇨🇿',
      romania: '🇷🇴',
      hungary: '🇭🇺',
      lithuania: '🇱🇹',
      slovakia: '🇸🇰',
      canada: '🇨🇦',
      'united kingdom': '🇬🇧',
      uk: '🇬🇧'
    };

    return flagMap[countryName.toLowerCase()] || '🌍';
  }, []);

  // FIX: Memoize date to prevent recalculation on every render
  const currentDate = React.useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // FIX: Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-container')) {
        setShowMenuDropdown(false);
      }
    };

    if (showMenuDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMenuDropdown]);

  return (
    // FIX: Added w-full max-w-full to prevent scaling issues
    <div className="w-full max-w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden">

      {/* HEADER */}
      <header className="bg-white shadow sticky top-0 z-20">
        {/* FIX: Changed container to w-full max-w-full for proper scaling */}
        <div className="w-full max-w-full mx-auto px-4 py-6 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl shadow-lg">
              <i className="fa fa-plane text-xl"></i>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Global Work Visa Jobs
              </h1>
              <p className="text-sm text-slate-500">
                Your Gateway to European Opportunities
              </p>
            </div>
          </div>

          {/* MENU - FIX: Added menu-container class for click outside */}
          <div className="relative menu-container">

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenuDropdown(!showMenuDropdown);
              }}
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
              aria-label="Menu"
            >
              <i className="fa fa-bars"></i>
            </button>

            {showMenuDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl w-56 py-2 z-50 border border-slate-100">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Featured Jobs', action: () => document.getElementById('featured-jobs')?.scrollIntoView({ behavior: 'smooth' }) },
                  { label: 'Blog & Resources', path: '/blog' },
                  { label: 'Saved Jobs', path: '/saved' },
                  { label: 'Visa Tips', path: '/visa-tips' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                  { label: 'Privacy Policy', path: '/privacy' },
                  { label: 'Terms of Use', path: '/terms' },
                  { label: 'Disclaimer', path: '/disclaimer' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else if (item.path) {
                        navigate(item.path);
                      }
                      setShowMenuDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

          </div>

        </div>
      </header>

      {/* HERO */}
      <div className="text-center py-10 px-4">

        <p className="text-sm text-slate-500 font-medium">
          {currentDate}
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-800">
          Choose Your Destination
        </h2>

        <p className="text-slate-600 mt-2 max-w-md mx-auto">
          Discover visa-sponsored jobs across Europe and beyond
        </p>

      </div>

      {/* COUNTRY GRID */}
      <div className="w-full max-w-full px-4 pb-10">

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (

          // FIX: Changed max-w-6xl to w-full max-w-full for proper scaling
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-full md:max-w-6xl mx-auto">

            {countries.map((country) => (

              <button
                key={country}
                onClick={() =>
                  navigate(`/jobs/${country.toLowerCase().replace(/\s+/g, '-')}`)
                }
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 border border-slate-100"
              >

                <div className="text-4xl md:text-5xl mb-3 md:mb-4">
                  {getCountryFlag(country)}
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-slate-800">
                  {country}
                </h3>

              </button>

            ))}

          </div>

        )}

      </div>

      {/* FEATURED JOBS */}
      <div id="featured-jobs" className="w-full">
        <FeaturedJobs maxItems={6} />
      </div>

      {/* BLOG SECTION */}
      <div className="w-full max-w-5xl mx-auto px-4 py-12">

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
          Career Resources & Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {[
            { title: 'Complete Work Visa Guide', path: '/blog/work-visa-guide', color: 'bg-blue-50 hover:bg-blue-100' },
            { title: 'Top Countries for Visa Sponsorship', path: '/blog/top-countries-visa-sponsorship', color: 'bg-purple-50 hover:bg-purple-100' },
            { title: 'Avoid Job Scams', path: '/blog/avoid-job-scams', color: 'bg-yellow-50 hover:bg-yellow-100' },
            { title: 'Interview Preparation Tips', path: '/blog/interview-preparation', color: 'bg-green-50 hover:bg-green-100' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`p-5 md:p-6 rounded-xl text-left transition-colors shadow-sm hover:shadow-md ${item.color}`}
            >
              <span className="font-semibold text-slate-800">{item.title}</span>
            </button>
          ))}

        </div>

      </div>

      {/* POPULAR DESTINATION BUTTONS */}
      <div className="text-center pb-12 px-4">

        <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-800">
          Popular Job Destinations
        </h3>

        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">

          {[
            { name: 'Germany Jobs', flag: '🇩🇪', path: '/jobs/germany', color: 'bg-yellow-500 hover:bg-yellow-600' },
            { name: 'UK Jobs', flag: '🇬🇧', path: '/jobs/uk', color: 'bg-blue-600 hover:bg-blue-700' },
            { name: 'Canada Jobs', flag: '🇨🇦', path: '/jobs/canada', color: 'bg-red-600 hover:bg-red-700' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`px-4 md:px-6 py-2 md:py-3 text-white rounded-lg shadow-md transition-colors text-sm md:text-base font-medium`}
            >
              <span className={`${item.color} px-3 py-2 rounded-lg block`}>
                {item.flag} {item.name}
              </span>
            </button>
          ))}

        </div>

      </div>

      {/* SEO TEXT */}
      <div className="w-full max-w-5xl mx-auto text-sm text-slate-700 px-4 pb-16 leading-relaxed">

        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-slate-800">
          Visa Sponsorship Jobs for Foreign Workers
        </h2>

        <p className="mb-4">
          Global Work Visa Jobs helps international job seekers find visa-sponsored employment opportunities across Europe and other popular destinations including Germany, the United Kingdom, and Canada.
        </p>

        <p>
          Our platform gathers job listings from trusted employers looking for foreign workers in industries such as construction, agriculture, logistics, hospitality, and healthcare.
        </p>

      </div>

      <Footer />

    </div>
  );
};

export default CountrySelection;
