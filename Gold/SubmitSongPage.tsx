import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitSongPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const scrollToPackages = () => {
    navigate('/', { state: { scrollToPackages: true } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'radial-gradient(circle at top, #1db95420, #0a0a0a 60%)',
      color: 'white',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* HEADER WITH MENU */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: '900',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1DB954'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <img 
                src="https://i.ibb.co/mCp2LDGW/4-EF4-A1-DA-EFFC-4-F3-E-8559-025-CB843-F036.png" 
                alt="Blunt Playlists Logo" 
                style={{
                  height: '40px',
                  width: 'auto',
                  marginRight: '12px'
                }}
              />
              <span>Blunt Playlists</span>
            </button>
            
            {/* Desktop Navigation */}
            <nav style={{
              display: window.innerWidth < 768 ? 'none' : 'flex',
              alignItems: 'center',
              gap: '32px'
            }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B3B3B3',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#B3B3B3'}
              >
                Home
              </button>
              <button
                onClick={scrollToPackages}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B3B3B3',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#B3B3B3'}
              >
                Packages
              </button>
              <button
                onClick={() => navigate('/submit')}
                style={{
                  padding: '8px 24px',
                  background: '#1DB954',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Submit Song
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              style={{
                display: window.innerWidth < 768 ? 'block' : 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
              onClick={toggleMenu}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav style={{
              display: window.innerWidth < 768 ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '16px',
              marginTop: '16px',
              paddingBottom: '16px'
            }}>
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B3B3B3',
                  cursor: 'pointer',
                  fontWeight: '500',
                  textAlign: 'left',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#B3B3B3'}
              >
                Home
              </button>
              <button
                onClick={() => {
                  scrollToPackages();
                  setIsMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B3B3B3',
                  cursor: 'pointer',
                  fontWeight: '500',
                  textAlign: 'left',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#B3B3B3'}
              >
                Packages
              </button>
              <button
                onClick={() => {
                  navigate('/submit');
                  setIsMenuOpen(false);
                }}
                style={{
                  padding: '8px 24px',
                  background: '#1DB954',
                  color: 'black',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Submit Song
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* PAGE HEADER */}
      <div style={{
        textAlign: 'center',
        padding: '120px 20px 30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 'bold',
          color: '#1DB954',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '14px',
            height: '14px',
            background: '#1DB954',
            borderRadius: '50%',
            boxShadow: '0 0 20px #1db954'
          }}></div>
          Spotify Playlist Promotions
        </div>

        <div style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #1db954, #ffffff, #1db954)',
          backgroundSize: '200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine 3s linear infinite',
          textShadow: '0 0 30px rgba(29, 185, 84, 0.5), 0 0 60px rgba(29, 185, 84, 0.3)'
        }}>
          Submit Your Song
        </div>

        <div style={{
          marginTop: '10px',
          color: '#bbb',
          fontSize: '16px'
        }}>
          Get placed on curated playlists • Real listeners • Organic growth
        </div>

        <div style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '6px 12px',
          borderRadius: '50px',
          background: 'rgba(29,185,84,0.15)',
          color: '#1db954',
          fontSize: '12px'
        }}>
          🚀 Premium Playlist Placement Service
        </div>
      </div>

      {/* FORM */}
      <div style={{
        maxWidth: '780px',
        margin: '40px auto',
        padding: '25px',
        borderRadius: '18px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        <iframe
          data-tally-src="https://tally.so/embed/QKJAlG?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          style={{
            width: '100%',
            minHeight: '700px',
            border: 'none',
            borderRadius: '12px'
          }}
        ></iframe>
      </div>

      {/* NOTICE BOX */}
      <div style={{
        maxWidth: '780px',
        margin: '20px auto',
        padding: '20px 25px',
        borderRadius: '12px',
        background: 'rgba(29, 185, 84, 0.1)',
        border: '1px solid rgba(29, 185, 84, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1DB954',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-info-circle"></i>
          PLEASE NOTE
        </div>
        <div style={{
          fontSize: '14px',
          color: '#e0e0e0',
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          This is a free song submission service and placement is not guaranteed.
          For guaranteed placements, kindly select any of our Premium Packages.
        </div>
        <button
          onClick={scrollToPackages}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #1DB954, #1ed760)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(29, 185, 84, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(29, 185, 84, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 185, 84, 0.3)';
          }}
        >
          <i className="fas fa-crown" style={{ marginRight: '8px' }}></i>
          View Premium Packages
        </button>
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: 'center',
        padding: '30px',
        color: '#777',
        fontSize: '13px'
      }}>
        © 2026 Blunt Entertainment. All rights reserved.
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 0% }
          100% { background-position: 200% }
        }
      `}</style>
    </div>
  );
};

export default SubmitSongPage;