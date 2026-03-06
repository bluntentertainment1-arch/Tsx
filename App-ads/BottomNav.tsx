import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdSense from '../components/AdSense';

interface BottomNavProps {
  activeTab: 'home' | 'create';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/create-post');
    }
  };

  return (
    <>
      {/* Small Banner Ad Above Nav */}
      <div className="w-full flex justify-center bg-gray-50 border-t border-gray-200">
        <AdSense slot="8509863911" format="auto" responsive="true" className="w-full max-w-md mx-auto my-2" />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20 safe-bottom">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => navigate('/')}
              className={`flex flex-col items-center justify-center py-2 px-6 min-h-[56px] transition-colors duration-200 ${
                activeTab === 'home' ? 'text-secondary' : 'text-gray-600'
              }`}
              aria-label="Home"
            >
              <i className={`fa fa-home text-2xl mb-1`}></i>
              <span className="text-xs font-medium">Home</span>
            </button>

            <button
              onClick={handleCreateClick}
              className={`flex flex-col items-center justify-center py-2 px-6 min-h-[56px] transition-colors duration-200 ${
                activeTab === 'create' ? 'text-secondary' : 'text-gray-600'
              }`}
              aria-label="Create Post"
            >
              <i className={`fa fa-plus-circle text-2xl mb-1`}></i>
              <span className="text-xs font-medium">Create</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
