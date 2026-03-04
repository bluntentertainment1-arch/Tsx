import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Global Work Visa Jobs</h3>
            <p className="text-sm text-slate-600">
              Your gateway to European job opportunities with visa sponsorship.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-slate-800 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Blog & Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/saved')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Saved Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/visa-tips')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Visa Tips
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-slate-800 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="text-slate-600 text-sm">
            © 2026 Global Work Visa Jobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;