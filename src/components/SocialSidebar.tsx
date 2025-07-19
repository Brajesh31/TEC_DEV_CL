import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, MessageCircle, Github } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.FC<{ className?: string }>;
  url: string;
  color: string;
  hoverColor: string;
  hoverText: string;
}

const SocialSidebar: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:techdevclub2025@gmail.com',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400',
      hoverText: 'Send us an email'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/6MVn2N9q',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-indigo-600 dark:hover:text-indigo-400',
      hoverText: 'Join our Discord'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-green-600 dark:hover:text-green-400',
      hoverText: 'Join WhatsApp Community'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/tech-dev-club/',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400',
      hoverText: 'Follow on LinkedIn'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/techdevclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-pink-600 dark:hover:text-pink-400',
      hoverText: 'Follow on Instagram'
    }
  ];

  // SEO meta tags for social sidebar
  const sidebarSeoMetadata = {
    title: "Tech Dev Club Social Links - Connect with Our Community",
    description: "Connect with Tech Dev Club through our social media channels, Discord, WhatsApp, and email.",
    keywords: "tech social media, developer discord, programming community, coding whatsapp group, tech linkedin, tech instagram, developer community contact"
  };

  return (
    <>
      {/* Hidden SEO metadata */}
      <meta name="social-sidebar-title" content={sidebarSeoMetadata.title} />
      <meta name="social-sidebar-description" content={sidebarSeoMetadata.description} />
      <meta name="social-sidebar-keywords" content={sidebarSeoMetadata.keywords} />
      
      {/* Desktop sidebar - hidden on mobile/tablet */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 px-2 rounded-r-lg shadow-lg border-r border-t border-b border-gray-200 dark:border-gray-700 animate-slide-right">
          <div className="flex flex-col space-y-6">
            {socialLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} ${link.hoverColor} transition-all duration-300 transform hover:scale-125 block p-1`}
                  aria-label={link.name}
                  title={link.name}
                  onMouseEnter={() => setActiveTooltip(link.name)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <link.icon className="h-5 w-5" />
                </a>
                
                {/* Tooltip */}
                <div 
                  className={`absolute left-full ml-2 px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded shadow-md whitespace-nowrap transition-all duration-200 ${
                    activeTooltip === link.name 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                >
                  {link.hoverText}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialSidebar;