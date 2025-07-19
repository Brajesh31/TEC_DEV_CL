import React from 'react';
import { Mail, Linkedin, Instagram, MessageCircle, Github } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.FC<{ className?: string }>;
  url: string;
  color: string;
  hoverColor: string;
  ariaLabel: string;
}

const MobileSocialBar: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:techdevclub2025@gmail.com',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400',
      ariaLabel: 'Send email to Tech Dev Club'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/6MVn2N9q',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-indigo-600 dark:hover:text-indigo-400',
      ariaLabel: 'Join Tech Dev Club Discord server'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-green-600 dark:hover:text-green-400',
      ariaLabel: 'Join WhatsApp Community'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/tech-dev-club/',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400',
      ariaLabel: 'Follow Tech Dev Club on LinkedIn'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/techdevclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-pink-600 dark:hover:text-pink-400',
      ariaLabel: 'Follow Tech Dev Club on Instagram'
    }
  ];

  // SEO meta tags for mobile social bar
  const mobileSocialSeoMetadata = {
    title: "Tech Dev Club Mobile Social Links - Connect on the Go",
    description: "Connect with Tech Dev Club through our social media channels on mobile devices.",
    keywords: "mobile social links, tech community mobile, developer social media, coding community contact, tech dev club mobile"
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 py-2 px-4 animate-slide-up">
      {/* Hidden SEO metadata */}
      <meta name="mobile-social-title" content={mobileSocialSeoMetadata.title} />
      <meta name="mobile-social-description" content={mobileSocialSeoMetadata.description} />
      <meta name="mobile-social-keywords" content={mobileSocialSeoMetadata.keywords} />
      
      <div className="flex justify-around">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} ${link.hoverColor} transition-all duration-300 transform hover:scale-125 p-2`}
            aria-label={link.ariaLabel}
            title={link.name}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileSocialBar;