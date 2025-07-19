import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, ExternalLink, ArrowRight } from 'lucide-react';

interface CommunityLinks {
  whatsapp: string;
  discord: string;
}

const CommunityJoinSection: React.FC = () => {
  const [links, setLinks] = useState<CommunityLinks>({
    whatsapp: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
    discord: 'https://discord.gg/6MVn2N9q'
  });
  const [loading, setLoading] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);

  useEffect(() => {
    // Since backend is not available, use default links
    // In a production environment, these would be fetched from your backend
    setLinks({
      whatsapp: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
      discord: 'https://discord.gg/6MVn2N9q'
    });
    setLoading(false);
  }, []);

  const handleJoinWhatsApp = () => {
    if (links.whatsapp) {
      window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
    } else {
      // Show a message that links need to be configured
      alert('WhatsApp group link needs to be configured. Please contact the administrator.');
    }
  };

  const handleJoinDiscord = () => {
    if (links.discord) {
      window.open(links.discord, '_blank', 'noopener,noreferrer');
    } else {
      // Show a message that links need to be configured
      alert('Discord server link needs to be configured. Please contact the administrator.');
    }
  };

  // SEO meta tags for community join section
  const communitySeoMetadata = {
    title: "Join Tech Dev Club Community - Connect with Developers Worldwide",
    description: "Join our global developer community on Discord and WhatsApp. Connect with thousands of developers worldwide and accelerate your growth.",
    keywords: "join developer community, tech discord server, coding whatsapp group, programming community, developer networking, tech collaboration platform"
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white bg-opacity-20 rounded mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-white bg-opacity-20 rounded mb-8 mx-auto max-w-lg"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-white bg-opacity-20 rounded-lg w-full sm:w-48 mx-auto sm:mx-0"></div>
              <div className="h-12 bg-white bg-opacity-20 rounded-lg w-full sm:w-48 mx-auto sm:mx-0"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
      {/* Hidden SEO metadata */}
      <meta name="community-join-title" content={communitySeoMetadata.title} />
      <meta name="community-join-description" content={communitySeoMetadata.description} />
      <meta name="community-join-keywords" content={communitySeoMetadata.keywords} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 animate-slide-up">
          Join Our Global Community
        </h2>
        <p className="text-lg sm:text-xl text-primary-100 mb-8 sm:mb-10 animate-slide-up animation-delay-200">
          Connect with thousands of developers worldwide and accelerate your growth
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
          <button
            onClick={handleJoinWhatsApp}
            onMouseEnter={() => setIsWhatsAppHovered(true)}
            onMouseLeave={() => setIsWhatsAppHovered(false)}
            className="group bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Join WhatsApp Group"
          >
            <MessageCircle className={`h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 ${isWhatsAppHovered ? 'animate-pulse' : ''}`} />
            <span>Join WhatsApp Group</span>
            <ExternalLink className={`h-4 w-4 ml-2 transition-opacity duration-300 ${isWhatsAppHovered ? 'opacity-100' : 'opacity-0'}`} />
          </button>
          
          <button
            onClick={handleJoinDiscord}
            onMouseEnter={() => setIsDiscordHovered(true)}
            onMouseLeave={() => setIsDiscordHovered(false)}
            className="group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Join Discord Server"
          >
            <Users className={`h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 ${isDiscordHovered ? 'animate-pulse' : ''}`} />
            <span>Join Discord Server</span>
            <ExternalLink className={`h-4 w-4 ml-2 transition-opacity duration-300 ${isDiscordHovered ? 'opacity-100' : 'opacity-0'}`} />
          </button>
        </div>
        
        <div className="mt-8 text-primary-100 text-sm animate-slide-up animation-delay-600">
          <p className="flex items-center justify-center">
            <ArrowRight className="h-4 w-4 mr-2" />
            Connect, learn, and grow with our amazing community
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunityJoinSection;