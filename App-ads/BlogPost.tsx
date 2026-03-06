import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogContent } from '../data/blogContent';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = slug ? blogContent[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
          <p className="text-slate-600 mb-6">Article not found</p>
          <button onClick={() => navigate('/blog')} className="btn-primary">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-20 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
              aria-label="Go back"
            >
              <i className="fa fa-arrow-left text-lg"></i>
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              <i className="fa fa-home mr-2"></i>
              Home
            </button>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={`h-3 bg-gradient-to-r ${article.color}`}></div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className={`inline-block text-sm font-bold uppercase tracking-wide bg-gradient-to-r ${article.color} bg-clip-text text-transparent`}>
                {article.category}
              </span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-500">{article.readTime}</span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-500">{article.date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${article.color} rounded-full flex items-center justify-center`}>
                <i className={`fa ${article.icon} text-white text-xl`}></i>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Global Work Visa Jobs</p>
                <p className="text-sm text-slate-600">Career Resources Team</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {article.content}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
                  <i className="fa fa-lightbulb text-blue-600 mr-3"></i>
                  Ready to Start Your Journey?
                </h3>
                <p className="text-slate-700 mb-4">
                  Browse thousands of visa-sponsored job opportunities across Europe
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  <i className="fa fa-briefcase"></i>
                  <span>Browse Jobs Now</span>
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/blog')}
                className="flex-1 min-w-[200px] bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-all"
              >
                <i className="fa fa-arrow-left mr-2"></i>
                Back to Blog
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                <i className="fa fa-envelope mr-2"></i>
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogContent)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedArticle]) => (
                <button
                  key={key}
                  onClick={() => navigate(`/blog/${key}`)}
                  className="group text-left bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-slate-100"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${relatedArticle.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`fa ${relatedArticle.icon} text-white`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {relatedArticle.title}
                  </h4>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <span className="text-xs text-blue-600 font-semibold">
                    Read More <i className="fa fa-arrow-right ml-1"></i>
                  </span>
                </button>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;