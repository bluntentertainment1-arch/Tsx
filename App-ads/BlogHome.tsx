import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: string;
  color: string;
}

const BlogHome: React.FC = () => {
  const navigate = useNavigate();

  const articles: BlogArticle[] = [
    {
      slug: 'relocating-to-europe-from-africa',
      title: 'Complete Guide: Relocating to Europe from Africa in 2026',
      excerpt: 'Everything African professionals need to know about moving to Europe - from visa requirements and job search strategies to cultural adaptation and settling in your new home.',
      category: 'Relocation Guide',
      readTime: '15 min read',
      icon: 'fa-plane-departure',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      slug: 'best-european-countries-africans',
      title: 'Top 7 European Countries Welcoming African Professionals',
      excerpt: 'Discover the most accessible European destinations for African job seekers, including visa policies, job opportunities, African communities, and integration support.',
      category: 'Country Guide',
      readTime: '12 min read',
      icon: 'fa-globe-africa',
      color: 'from-green-500 to-emerald-600'
    },
    {
      slug: 'work-visa-guide',
      title: 'Complete Guide to Getting a Work Visa in Europe',
      excerpt: 'Step-by-step process for different countries including UK, Germany, Netherlands, Sweden, and France. Learn about required documents, timelines, fees, and tips.',
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
    },
    {
      slug: 'cv-writing-europe',
      title: 'Writing a Winning European CV',
      excerpt: 'Learn how to format your CV for European employers, what to include, common mistakes to avoid, and country-specific requirements.',
      category: 'Career Tips',
      readTime: '9 min read',
      icon: 'fa-file-alt',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      slug: 'relocation-checklist',
      title: 'Complete Relocation Checklist for Moving to Europe',
      excerpt: 'Everything you need to know before moving: documentation, housing, banking, healthcare, and settling in your new country.',
      category: 'Relocation',
      readTime: '12 min read',
      icon: 'fa-plane-departure',
      color: 'from-pink-500 to-rose-600'
    },
    {
      slug: 'cultural-adaptation',
      title: 'Cultural Adaptation Guide for European Expats',
      excerpt: 'Navigate cultural differences, build social connections, and integrate successfully into European society with practical tips and insights.',
      category: 'Relocation',
      readTime: '10 min read',
      icon: 'fa-users',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      slug: 'housing-guide',
      title: 'Finding Housing in Europe: Complete Guide',
      excerpt: 'Comprehensive guide to finding, securing, and managing accommodation across European countries including rental tips and legal requirements.',
      category: 'Relocation',
      readTime: '11 min read',
      icon: 'fa-home',
      color: 'from-orange-500 to-red-600'
    },
    {
      slug: 'eu-visa-updates-2026',
      title: 'Breaking: Major EU Visa Updates for 2026 - What You Need to Know',
      excerpt: 'Comprehensive breakdown of the latest EU visa policy changes including new Talent Pool system, revised Blue Card requirements, and fast-track processing for critical sectors.',
      category: 'Visa Updates',
      readTime: '12 min read',
      icon: 'fa-newspaper',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      slug: 'schengen-visa-changes-2026',
      title: 'Schengen Visa Changes 2026: Complete Guide to New Entry Requirements',
      excerpt: 'Everything you need to know about the new Entry/Exit System, digital visa applications, and updated Schengen visa policies affecting travelers and workers.',
      category: 'Visa Updates',
      readTime: '10 min read',
      icon: 'fa-passport',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // React-safe AdSense injection
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-20 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
            aria-label="Go back"
          >
            <i className="fa fa-arrow-left text-lg"></i>
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Career Resources & Blog
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* AdSense Banner */}
        <div className="my-8 flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-1819215492028258"
               data-ad-slot="8509863911"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <button
              key={article.slug}
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="group text-left bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:scale-105"
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
                
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-4 mt-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  <span>Read Article</span>
                  <i className="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* In-article Ad */}
        <div className="my-12 flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block', textAlign: 'center' }}
               data-ad-layout="in-article"
               data-ad-format="fluid"
               data-ad-client="ca-pub-1819215492028258"
               data-ad-slot="9739185101"></ins>
        </div>
      </main>
    </div>
  );
};

export default BlogHome;
