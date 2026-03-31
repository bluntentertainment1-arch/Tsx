import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';

// Blog article data - curated selection for country page
const featuredArticles = [
  {
    slug: 'relocating-to-europe-from-africa',
    title: 'Complete Guide: Relocating to Europe from Africa in 2026',
    excerpt: 'Everything African professionals need to know about moving to Europe - from visa requirements and job search strategies to cultural adaptation.',
    category: 'Relocation Guide',
    readTime: '15 min read',
    icon: 'fa-plane-departure',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    slug: 'best-european-countries-africans',
    title: 'Top 7 European Countries Welcoming African Professionals',
    excerpt: 'Discover the most accessible European destinations for African job seekers, including visa policies, job opportunities, and African communities.',
    category: 'Country Guide',
    readTime: '12 min read',
    icon: 'fa-globe-africa',
    color: 'from-green-500 to-emerald-600'
  },
  {
    slug: 'work-visa-guide',
    title: 'Complete Guide to Getting a Work Visa in Europe',
    excerpt: 'Step-by-step process for UK, Germany, Netherlands, Sweden, and France. Learn about required documents, timelines, and fees.',
    category: 'Visa Guide',
    readTime: '8 min read',
    icon: 'fa-passport',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    slug: 'top-countries-visa-sponsorship',
    title: 'Top 5 European Countries Offering Jobs with Visa Sponsorship',
    excerpt: 'Discover the best countries for visa-sponsored employment, including industries, visa types, salary ranges, and official job portals.',
    category: 'Country Guide',
    readTime: '10 min read',
    icon: 'fa-globe-europe',
    color: 'from-purple-500 to-pink-600'
  },
  {
    slug: 'avoid-job-scams',
    title: 'How to Avoid Job Scams When Applying Abroad',
    excerpt: 'Essential tips to identify and avoid recruitment fraud, protect your personal information, and verify legitimate job offers.',
    category: 'Safety Guide',
    readTime: '6 min read',
    icon: 'fa-shield-alt',
    color: 'from-amber-500 to-orange-600'
  },
  {
    slug: 'interview-preparation',
    title: 'Mastering Remote Interviews for European Jobs',
    excerpt: 'Comprehensive guide to preparing for video interviews, common questions, cultural considerations, and follow-up strategies.',
    category: 'Career Tips',
    readTime: '7 min read',
    icon: 'fa-video',
    color: 'from-green-500 to-emerald-600'
  }
];

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
      data-ad-client="ca-app-pub-1819215492028258"
      data-ad-slot="8509863911"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

const InArticleAd: React.FC = () => {
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
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-app-pub-1819215492028258"
      data-ad-slot="9739185101"
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
              <h1 className="text-2xl font-bold">Global Work Visa Jobs</h1>
              <p className="text-sm text-slate-500">Your Gateway to European Opportunities</p>
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
              <div className="absolute right-0 top-full mt-2 bg-white shadow rounded-xl w-56 z-30">
                <button
                  onClick={() => { navigate('/'); setShowMenuDropdown(false); }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    document.getElementById('career-resources')?.scrollIntoView({ behavior: 'smooth' });
                    setShowMenuDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-50"
                >
                  Career Resources
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
        <p className="text-sm text-slate-500">{getCurrentDate()}</p>
        <h2 className="text-4xl font-bold mt-2">Choose Your Destination</h2>
        <p className="text-slate-600">Discover visa-sponsored jobs across Europe</p>
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
                <div className="text-5xl mb-4">{getCountryFlag(country)}</div>
                <h3 className="text-xl font-semibold">{country}</h3>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AD BANNER */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner />
      </div>

      {/* FEATURED BLOG POSTS - REPLACES FEATURED JOBS */}
      <section id="career-resources" className="bg-white py-16">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Career Resources & Guides
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Expert advice to help you secure visa sponsorship and relocate successfully
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredArticles.map((article) => (
              <article
                key={article.slug}
                onClick={() => navigate(`/blog/${article.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:scale-105"
              >
                <div className={`h-2 bg-gradient-to-r ${article.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${article.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <i className={`fa ${article.icon} text-white text-xl`}></i>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <span className={`inline-block text-xs font-bold uppercase tracking-wide mb-3 bg-gradient-to-r ${article.color} bg-clip-text text-transparent`}>
                    {article.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Read Article</span>
                    <i className="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/blog')}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View All Resources <i className="fa fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* IN-ARTICLE AD */}
      <div className="container mx-auto px-4 py-8">
        <InArticleAd />
      </div>

      {/* POPULAR DESTINATION BUTTONS */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <h3 className="text-2xl font-bold mb-6">Popular Job Destinations</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/jobs/germany')}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-md"
          >
            🇩🇪 Germany Jobs
          </button>
          <button
            onClick={() => navigate('/jobs/uk')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            🇬🇧 UK Jobs
          </button>
          <button
            onClick={() => navigate('/jobs/canada')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
          >
            🇨🇦 Canada Jobs
          </button>
        </div>
      </div>

      {/* SEO TEXT */}
      <div className="max-w-5xl mx-auto text-sm text-slate-700 px-4 py-16 leading-relaxed bg-white">
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
