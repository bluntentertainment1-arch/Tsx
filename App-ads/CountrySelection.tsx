import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import FeaturedJobs from './FeaturedJobs';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
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

  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

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
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* HEADER */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl">
              <i className="fa fa-plane"></i>
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Global Work Visa Jobs
              </h1>
              <p className="text-sm text-slate-500">
                Your Gateway to European Opportunities
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="relative">

            <button
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center"
            >
              <i className="fa fa-bars"></i>
            </button>

            {showMenuDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow rounded-xl w-56">

                <button
                  onClick={() => {
                    navigate('/');
                    setShowMenuDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    document.getElementById('featured-jobs')?.scrollIntoView({ behavior: 'smooth' });
                    setShowMenuDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Featured Jobs
                </button>

                <button
                  onClick={() => { navigate('/blog'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Blog & Resources
                </button>

                <button
                  onClick={() => { navigate('/saved'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Saved Jobs
                </button>

                <button
                  onClick={() => { navigate('/visa-tips'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Visa Tips
                </button>

                <button
                  onClick={() => { navigate('/about'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  About Us
                </button>

                <button
                  onClick={() => { navigate('/contact'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Contact
                </button>

                <button
                  onClick={() => { navigate('/privacy'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Privacy Policy
                </button>

                <button
                  onClick={() => { navigate('/terms'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Terms of Use
                </button>

                <button
                  onClick={() => { navigate('/disclaimer'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Disclaimer
                </button>

              </div>
            )}

          </div>

        </div>
      </header>

      {/* HERO */}
      <div className="text-center py-10">

        <p className="text-sm text-slate-500">
          {getCurrentDate()}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          Choose Your Destination
        </h2>

        <p className="text-slate-600">
          Discover visa-sponsored jobs across Europe
        </p>

      </div>

      {/* COUNTRY GRID */}
      <div className="container mx-auto px-4 pb-10">

        {loading ? (
          <LoadingSpinner />
        ) : (

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {countries.map((country) => (

              <button
                key={country}
                onClick={() =>
                  navigate(`/jobs/${country.toLowerCase().replace(/\s+/g, '-')}`)
                }
                className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition"
              >

                <div className="text-5xl mb-4">
                  {getCountryFlag(country)}
                </div>

                <h3 className="text-xl font-semibold">
                  {country}
                </h3>

              </button>

            ))}

          </div>

        )}

      </div>

      {/* AD BANNER RESTORED */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner />
      </div>

      {/* FEATURED JOBS */}
      <div id="featured-jobs">
        <FeaturedJobs maxItems={6} />
      </div>

      {/* BLOG SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-12">

        <h2 className="text-3xl font-bold text-center mb-8">
          Career Resources & Guides
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => navigate('/blog/work-visa-guide')}
            className="p-6 bg-blue-50 rounded-xl text-left"
          >
            Complete Work Visa Guide
          </button>

          <button
            onClick={() => navigate('/blog/top-countries-visa-sponsorship')}
            className="p-6 bg-purple-50 rounded-xl text-left"
          >
            Top Countries for Visa Sponsorship
          </button>

          <button
            onClick={() => navigate('/blog/avoid-job-scams')}
            className="p-6 bg-yellow-50 rounded-xl text-left"
          >
            Avoid Job Scams
          </button>

          <button
            onClick={() => navigate('/blog/interview-preparation')}
            className="p-6 bg-green-50 rounded-xl text-left"
          >
            Interview Preparation Tips
          </button>

        </div>

      </div>

      {/* POPULAR DESTINATION BUTTONS */}
      <div className="text-center pb-12">

        <h3 className="text-2xl font-bold mb-6">
          Popular Job Destinations
        </h3>

        <div className="flex justify-center gap-4 flex-wrap">

          <button
            onClick={() => navigate('/jobs/germany')}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg"
          >
            🇩🇪 Germany Jobs
          </button>

          <button
            onClick={() => navigate('/jobs/uk')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            🇬🇧 UK Jobs
          </button>

          <button
            onClick={() => navigate('/jobs/canada')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            🇨🇦 Canada Jobs
          </button>

        </div>

      </div>

      {/* SEO TEXT */}
      <div className="max-w-5xl mx-auto text-sm text-slate-700 px-4 pb-16 leading-relaxed">

        <h2 className="text-2xl font-bold mb-4 text-center">
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
