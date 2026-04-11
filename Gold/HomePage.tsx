import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  streams: string;
  playlists: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const packages: Package[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 30,
      streams: '2,000 – 5,000',
      playlists: '10',
      features: [
        '10 Playlist Placements',
        '2,000 – 5,000 Estimated Streams',
        'Organic Growth',
        '1 Month Duration',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 60,
      streams: '7,000 – 10,000',
      playlists: '20',
      popular: true,
      features: [
        '20 Playlist Placements',
        '7,000 – 10,000 Estimated Streams',
        'Organic Growth',
        '1 Month Duration',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 120,
      streams: '15,000 – 20,000',
      playlists: '30',
      features: [
        '30 Playlist Placements',
        '15,000 – 20,000 Estimated Streams',
        'Organic Growth',
        '1 Month Duration',
      ],
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 270,
      streams: '50,000',
      playlists: '35',
      features: [
        '35 Playlist Placements',
        'Top-Tier Playlists',
        '50,000 Estimated Streams',
        'Priority Support',
      ],
    },
    {
      id: 'label',
      name: 'Label',
      price: 500,
      streams: '100k+',
      playlists: '40',
      features: [
        '40 Playlist Placements',
        'Top-Tier Playlists',
        '100k+ Estimated Streams',
        'Priority Support',
      ],
    },
  ];

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.state?.scrollToPackages) {
      setTimeout(() => {
        scrollToPackages();
      }, 100);
    }
  }, [location]);

  const handleGetStarted = (pkg: Package) => {
    navigate(`/activate?package=${encodeURIComponent(pkg.name)}&price=${pkg.price}`);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Music Notes */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <i className="fas fa-music absolute text-4xl text-spotify-green animate-float" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></i>
        <i className="fas fa-music absolute text-3xl text-spotify-green animate-float" style={{ top: '20%', right: '10%', animationDelay: '2s' }}></i>
        <i className="fas fa-music absolute text-5xl text-spotify-green animate-float" style={{ top: '60%', left: '15%', animationDelay: '4s' }}></i>
        <i className="fas fa-music absolute text-4xl text-spotify-green animate-float" style={{ bottom: '20%', right: '20%', animationDelay: '1s' }}></i>
        <i className="fas fa-music absolute text-3xl text-spotify-green animate-float" style={{ top: '40%', right: '5%', animationDelay: '3s' }}></i>
        <i className="fas fa-music absolute text-4xl text-spotify-green animate-float" style={{ bottom: '30%', left: '8%', animationDelay: '5s' }}></i>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-spotify-green/10 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Get Your Music on
              <span className="block text-spotify-green">Top Spotify Playlists</span>
            </h1>
            <p className="text-xl md:text-2xl text-spotify-lightgray mb-8 max-w-3xl mx-auto">
              Professional playlist promotion service trusted by thousands of artists worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/submit')}
                className="px-8 py-4 bg-spotify-green text-black font-bold rounded-full text-lg hover:scale-105 transition-transform"
              >
                Submit Your Song Free
              </button>
              <button
                onClick={scrollToPackages}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-full text-lg hover:bg-white/20 transition-colors"
              >
                View Premium Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-spotify-darkgray relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-spotify-green mb-2">50M+</div>
              <div className="text-spotify-lightgray text-lg">Streams Generated</div>
            </div>
            <div>
              <div className="text-5xl font-black text-spotify-green mb-2">2,300+</div>
              <div className="text-spotify-lightgray text-lg">Artists Promoted</div>
            </div>
            <div>
              <div className="text-5xl font-black text-spotify-green mb-2">500+</div>
              <div className="text-spotify-lightgray text-lg">Active Playlists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 glowing-text">Choose Your Promotion Package</h2>
            <p className="text-xl text-spotify-lightgray mb-4">Select the perfect playlist promotion for your music</p>
            <div className="text-spotify-green font-semibold text-lg">
              🔥 2,300+ artists promoted • 50M+ streams generated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-spotify-gray rounded-2xl p-6 hover:scale-105 transition-transform ${
                  pkg.popular ? 'ring-4 ring-spotify-green' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-spotify-green text-black px-6 py-2 rounded-full font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-black text-spotify-green mb-2">
                    ${pkg.price}
                  </div>
                  <div className="text-spotify-lightgray text-sm">
                    {pkg.streams} Streams
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <i className="fas fa-check-circle text-spotify-green mt-0.5 mr-2 flex-shrink-0"></i>
                      <span className="text-spotify-lightgray">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleGetStarted(pkg)}
                  className="w-full py-3 bg-spotify-green text-black font-bold rounded-full hover:bg-spotify-green/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-spotify-darkgray relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-xl text-spotify-lightgray">Simple process to get your music promoted</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: 'fa-upload', title: 'Submit Your Song', desc: 'Share your Spotify link and artist details' },
              { icon: 'fa-search', title: 'We Review', desc: 'Our team reviews your submission' },
              { icon: 'fa-list', title: 'Playlist Placement', desc: 'Your song gets added to relevant playlists' },
              { icon: 'fa-chart-line', title: 'Track Results', desc: 'Monitor your streams and growth' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${step.icon} text-3xl text-black`}></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-spotify-lightgray">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Grow Your Audience?
          </h2>
          <p className="text-xl text-spotify-lightgray mb-8">
            Submit your song for free placement consideration or choose a premium package
          </p>
          <button
            onClick={() => navigate('/submit')}
            className="px-12 py-5 bg-spotify-green text-black font-bold rounded-full text-xl hover:scale-105 transition-transform"
          >
            Submit Your Song Now
          </button>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(29, 185, 84, 0.5), 0 0 20px rgba(29, 185, 84, 0.3), 0 0 30px rgba(29, 185, 84, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(29, 185, 84, 0.8), 0 0 30px rgba(29, 185, 84, 0.5), 0 0 40px rgba(29, 185, 84, 0.3);
          }
        }
        .glowing-text {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;