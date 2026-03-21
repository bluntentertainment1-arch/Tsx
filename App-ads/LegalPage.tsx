import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const navigate = useNavigate();

  const content = {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Privacy Policy for Global Work Visa Jobs',
          text: 'Effective Date: February 23, 2026',
        },
        {
          heading: '1. Information We Collect',
          text: 'Global Work Visa Jobs does not require users to create accounts or submit personal information.\n\nHowever, we may automatically collect non-personally identifiable information such as:\n• Browser type\n• Device type\n• Operating system\n• Pages visited\n• General usage statistics\n\nThis information helps improve website performance and user experience.',
        },
        {
          heading: '2. Cookies',
          text: 'Our website uses cookies to enhance user experience and analyze traffic.\n\nCookies are small data files stored on your device. You may disable cookies through your browser settings at any time.',
        },
        {
          heading: '3. Google AdSense & Advertising',
          text: 'We use Google AdSense, a third-party advertising service provided by Google Inc.\n\nGoogle may use cookies, including the DoubleClick Cookie, to display ads based on users\' visits to this and other websites.\n\nGoogle may collect information such as:\n• IP address\n• Browser information\n• Device identifiers\n• Browsing behavior\n\nUsers may opt out of personalized advertising by visiting:\nhttps://www.google.com/settings/ads\n\nFor more information, please review Google\'s Privacy Policy:\nhttps://policies.google.com/privacy',
        },
        {
          heading: '4. Third-Party Services',
          text: 'We may use trusted third-party services including advertising and analytics providers.\n\nThese services may use cookies or similar technologies to improve ad relevance and website functionality.\n\nWe do not sell, trade, or rent users\' personal data.',
        },
        {
          heading: '5. GDPR & EEA User Rights',
          text: 'Users located in the European Economic Area (EEA) or United Kingdom may be presented with consent options regarding personalized advertising.\n\nUsers can manage or withdraw consent through their browser settings.',
        },
        {
          heading: '6. Data Security',
          text: 'We implement reasonable technical measures to protect website data and maintain platform security.',
        },
        {
          heading: '7. Children\'s Information',
          text: 'Global Work Visa Jobs is not intended for children under the age of 13.\n\nWe do not knowingly collect personal information from children.',
        },
        {
          heading: '8. Changes to This Policy',
          text: 'We may update this Privacy Policy periodically. Updates will be posted on this page with a revised effective date.',
        },
        {
          heading: '9. Contact Us',
          text: 'If you have any questions regarding this Privacy Policy, please contact:\n\nEmail: globalworkvisajobs@gmail.com',
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        {
          heading: 'Acceptance of Terms',
          text: 'By using this app, you agree to these terms. If you do not agree, please do not use our service.',
        },
        {
          heading: 'Service Description',
          text: 'We provide a platform to discover publicly available job listings. We are not a recruitment agency and do not guarantee employment.',
        },
        {
          heading: 'User Responsibilities',
          text: 'You are responsible for verifying the authenticity of job listings and conducting your own due diligence before applying.',
        },
        {
          heading: 'No Employment Guarantee',
          text: 'We do not guarantee job placement, visa approval, or any employment outcomes. All job applications are subject to employer discretion.',
        },
        {
          heading: 'Third-Party Links',
          text: 'Our app contains links to external websites. We are not responsible for the content, privacy practices, or terms of these third-party sites.',
        },
        {
          heading: 'Prohibited Uses',
          text: 'You may not use this app for any illegal purposes, to transmit harmful code, or to interfere with the app\'s functionality.',
        },
        {
          heading: 'Intellectual Property',
          text: 'The app design, logo, and original content are our intellectual property. Job listings are property of their respective employers.',
        },
        {
          heading: 'Limitation of Liability',
          text: 'We are not liable for any damages arising from your use of this app, including but not limited to job application outcomes.',
        },
        {
          heading: 'Termination',
          text: 'We reserve the right to terminate or suspend access to our service at any time without notice.',
        },
      ],
    },
    disclaimer: {
      title: 'Disclaimer',
      sections: [
        {
          heading: 'No Recruitment Services',
          text: 'We are not a recruitment agency. We do not process visa applications or act as an intermediary between job seekers and employers.',
        },
        {
          heading: 'No Guarantees',
          text: 'We do not guarantee employment or visa approval. All job listings are publicly available information aggregated from various sources.',
        },
        {
          heading: 'Verification Required',
          text: 'Users must verify the authenticity of job listings independently. We are not responsible for fraudulent or misleading job postings.',
        },
        {
          heading: 'Information Accuracy',
          text: 'While we strive to provide accurate information, we do not guarantee the accuracy, completeness, or timeliness of job listings.',
        },
        {
          heading: 'No Legal Advice',
          text: 'Information provided in this app does not constitute legal, immigration, or professional advice. Consult qualified professionals for specific guidance.',
        },
        {
          heading: 'Scam Warning',
          text: 'Be cautious of job scams. Never pay upfront fees for job applications. Verify employer legitimacy before sharing personal information.',
        },
        {
          heading: 'External Content',
          text: 'Job descriptions and requirements are provided by employers. We do not endorse or verify the accuracy of this content.',
        },
        {
          heading: 'Use at Your Own Risk',
          text: 'You use this app at your own risk. We are not liable for any consequences arising from job applications or interactions with employers.',
        },
      ],
    },
  };

  const currentContent = content[type];

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      if (line.trim().startsWith('•')) {
        return (
          <li key={index} className="ml-6 mb-2 flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </li>
        );
      }
      
      if (line.includes('http://') || line.includes('https://')) {
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          const url = urlMatch[1];
          const parts = line.split(url);
          return (
            <p key={index} className="mb-2">
              {parts[0]}
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline break-all"
              >
                {url}
              </a>
              {parts[1]}
            </p>
          );
        }
      }
      
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-20 border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-blue-600"
              aria-label="Go back"
            >
              <i className="fa fa-arrow-left text-lg"></i>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {currentContent.title}
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-start">
                {section.heading.match(/^\d+\./) && (
                  <span className="text-blue-600 mr-3">{section.heading.match(/^\d+\./)?.[0]}</span>
                )}
                <span className={section.heading.match(/^\d+\./) ? '' : 'w-full'}>
                  {section.heading.replace(/^\d+\.\s*/, '')}
                </span>
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-2">
                {renderFormattedText(section.text)}
              </div>
            </div>
          ))}

          <div className="pt-6 border-t-2 border-slate-200 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <i className="fa fa-calendar-alt text-blue-600 text-xl mt-1"></i>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Last Updated</p>
                  <p className="text-slate-600">February 23, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <i className="fa fa-home"></i>
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;