import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsApi, Post } from '../services/api';
import PostCard from '../components/PostCard';
import BottomNav from '../components/BottomNav';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeFeed: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    const response = await postsApi.getAll();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      const sortedPosts = response.data.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
      setPosts(sortedPosts);
    }
    setLoading(false);
  };

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/create-post');
    }
  };

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-md sticky top-0 z-10 safe-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <i className="fa fa-hashtag text-3xl text-secondary"></i>
              <h1 className="text-2xl font-bold text-primary">Micro Social</h1>
            </div>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="text-sm text-primary hover:text-secondary transition-colors duration-200 min-h-[44px] px-4"
                aria-label="Logout"
              >
                <i className="fa fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
              aria-label="Search posts"
            />
            <i className="fa fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="card p-6 text-center">
            <i className="fa fa-exclamation-circle text-4xl text-secondary mb-4"></i>
            <p className="text-gray-600">{error}</p>
            <button onClick={loadPosts} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="card p-8 text-center">
            <i className="fa fa-inbox text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No posts found matching your search' : 'No posts yet. Be the first to share!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={handleCreatePost}
        className="fixed bottom-24 right-6 w-14 h-14 bg-secondary text-white rounded-full shadow-lg hover:bg-secondary-dark transition-all duration-200 active:scale-95 flex items-center justify-center z-20"
        aria-label="Create new post"
      >
        <i className="fa fa-plus text-xl"></i>
      </button>

      <BottomNav activeTab="home" />
    </div>
  );
};

export default HomeFeed;