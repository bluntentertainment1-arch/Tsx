import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ActivationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState('');
  const [localPrice, setLocalPrice] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [message, setMessage] = useState('');
  const [slots, setSlots] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const convertCurrency = (usdPrice: number) => {
    try {
      const locale = navigator.language || 'en-US';
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const rates: { [key: string]: { rate: number; symbol: string; code: string } } = {
        'ng': { rate: 1500, symbol: '₦', code: 'NGN' },
        'gb': { rate: 0.79, symbol: '£', code: 'GBP' },
        'de': { rate: 0.92, symbol: '€', code: 'EUR' },
        'fr': { rate: 0.92, symbol: '€', code: 'EUR' },
        'es': { rate: 0.92, symbol: '€', code: 'EUR' },
        'it': { rate: 0.92, symbol: '€', code: 'EUR' },
      };

      let currency = null;

      if (timezone.includes('Lagos') || locale.toLowerCase().includes('ng')) {
        currency = rates['ng'];
      } else {
        const countryCode = locale.toLowerCase().split('-')[1] || locale.toLowerCase();
        currency = rates[countryCode];
      }

      if (currency) {
        const converted = usdPrice * currency.rate;
        return {
          value: converted.toLocaleString(locale, { maximumFractionDigits: 0 }),
          symbol: currency.symbol,
          code: currency.code
        };
      }

      return {
        value: usdPrice.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        symbol: '$',
        code: 'USD'
      };
    } catch (error) {
      console.error('Currency conversion error:', error);
      return {
        value: usdPrice.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        symbol: '$',
        code: 'USD'
      };
    }
  };

  useEffect(() => {
    const initializePage = () => {
      window.scrollTo(0, 0);

      const pkgName = searchParams.get('package') || 'Promotion';
      const pkgPrice = searchParams.get('price') || '0';
      setPackageName(pkgName);
      setPrice(pkgPrice);
      
      const priceNum = parseFloat(pkgPrice);
      const converted = convertCurrency(priceNum);
      setLocalPrice(converted.value);
      setCurrencySymbol(converted.symbol);
      setCurrencyCode(converted.code);
      
      const generatedMessage = `Hi, I want to activate the ${pkgName} playlist promotion package ($${pkgPrice}).`;
      setMessage(generatedMessage);
      
      const randomSlots = Math.floor(Math.random() * 3) + 3;
      setSlots(randomSlots);
    };

    initializePage();
  }, [searchParams]);

  const handleDMClick = () => {
    const instagramUrl = 'instagram://user?username=bluntt_kidd';
    const webUrl = 'https://ig.me/m/bluntt_kidd';
    
    window.location.href = instagramUrl;
    
    setTimeout(() => {
      window.open(webUrl, '_blank');
    }, 500);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleBackClick = () => {
    navigate('/', { state: { scrollToPackages: true } });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div style={{
      margin: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial',
      background: 'radial-gradient(circle at top, #1db95422, #0a0a0a 60%)',
      color: 'white',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '30px',
      paddingTop: '100px',
      position: 'relative'
    }}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(29, 185, 84, 0.95)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 2000,
          fontSize: '15px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <i className="fas fa-check-circle"></i>
          Message Copied, kindly send To DM
        </div>
      )}

      <button
        onClick={handleHomeClick}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(29,185,84,0.2)';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.borderColor = '#1DB954';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        }}
        aria-label="Go to home page"
      >
        <i className="fas fa-home"></i>
      </button>

      <div style={{
        maxWidth: '720px',
        width: '100%',
        padding: '40px',
        borderRadius: '22px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '25px',
          color: '#1DB954',
          fontWeight: '700'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#1DB954',
            boxShadow: '0 0 18px #1db954'
          }}></div>
          Spotify Playlist Promotions
        </div>

        <div style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '10px',
          background: 'linear-gradient(90deg, #1db954, #ffffff, #1db954)',
          backgroundSize: '200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine 3s linear infinite',
          textShadow: '0 0 30px rgba(29, 185, 84, 0.5), 0 0 60px rgba(29, 185, 84, 0.3)'
        }}>
          Activate Your Package
        </div>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          borderRadius: '14px',
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {packageName} Package
          </div>
          <div style={{
            fontSize: '22px',
            color: '#1DB954',
            marginTop: '5px'
          }}>
            ${price}
          </div>
          {currencyCode !== 'USD' && (
            <>
              <div style={{
                fontSize: '18px',
                color: '#bdbdbd',
                marginTop: '8px'
              }}>
                ≈ {currencySymbol}{localPrice} {currencyCode}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '8px'
              }}>
                Estimated local value • Payment is in USD
              </div>
            </>
          )}
        </div>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          borderRadius: '10px',
          background: '#1DB95422',
          border: '1px solid #1DB95455',
          fontWeight: '600',
          color: '#1DB954'
        }}>
          ⚡ Only {slots} promotion slots left this week
        </div>

        <div style={{
          color: '#bdbdbd',
          marginBottom: '20px',
          marginTop: '20px'
        }}>
          Send us this message on Instagram to start your promotion
        </div>

        <div style={{
          marginTop: '20px',
          background: '#111',
          padding: '18px',
          borderRadius: '10px',
          fontSize: '15px',
          border: '1px solid #333',
          textAlign: 'left',
          wordWrap: 'break-word'
        }}>
          {message}
        </div>

        <div style={{
          marginTop: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleDMClick}
            style={{
              padding: '14px 26px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.25s',
              background: '#1DB954',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(29,185,84,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            DM @bluntt_kidd
          </button>

          <button
            onClick={handleCopyClick}
            style={{
              padding: '14px 26px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.25s',
              background: '#333',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(29,185,84,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Copy Message
          </button>

          <button
            onClick={handleBackClick}
            style={{
              padding: '14px 26px',
              border: '1px solid #444',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.25s',
              background: 'transparent',
              color: '#aaa'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(29,185,84,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Back to Packages
          </button>
        </div>

        <div style={{
          marginTop: '20px',
          fontSize: '13px',
          color: '#888'
        }}>
          Copy the message → open Instagram → paste and send.
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 0% }
          100% { background-position: 200% }
        }
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ActivationPage;