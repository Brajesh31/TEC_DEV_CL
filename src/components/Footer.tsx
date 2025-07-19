import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, MessageCircle, Mail, Heart, Edit, Instagram, FileText } from 'lucide-react';
import { getFormLink } from '../data/formLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    community: [
      { name: 'About Us', href: '/about' },
      { name: 'Join Us', href: '/join' },
      { name: 'Team', href: '/team' },
      { name: 'Volunteer Form', href: '/volunteer' },
      { name: 'Ambassadors', href: '/ambassadors' },
      { name: 'Who We Are', href: '/who-we-are' },
      { name: 'Give Back', href: '/give-back' },
    ],
    resources: [
      { name: 'Events', href: '/events' },
      { name: 'Events Calendar', href: '/events-calendar' },
      { name: 'Project', href: '/projects' }, // Changed from "Projects" to "Project"
      { name: 'Featured Project', href: '/featured-projects' }, // Changed from "Projects" to "Project"
      { name: 'Project Metrics', href: '/project-metrics' }, // Changed from "Projects" to "Project"
      { name: 'Blog', href: '/blog' },
      { name: 'Resources', href: '/resources' },
    ],
    connect: [
      { name: 'Gallery', href: '/gallery' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Spotlights', href: '/spotlights' },
      { name: 'Speakers', href: '/speakers' },
      { name: 'Community Groups', href: '/community-groups' },
      { name: 'Announcements', href: '/announcements' },
      { name: 'Newsletters', href: '/newsletters' },
      { name: 'Videos', href: '/videos' },
      { name: 'Reports & Insights', href: '/reports' },
    ],
    sponsors: [
      { name: 'All Sponsors', href: '/sponsors'  },
      { name: 'Become a Sponsor', href: '/become-sponsor' },
      { name: 'Sponsor Benefits', href: '/sponsor-benefits' },
      { name: 'Past Sponsors', href: '/past-sponsors' },
      { name: 'Sponsor Prospectus', href: '/files/TechDevClub-Sponsorship-Prospectus-2025.pdf' },
    ],
    learning: [
      { name: 'Certification', href: '/certification' },
      { name: 'Mentorship Program', href: '/mentorship' },
      { name: 'Learning Resources', href: '/learning-resources' },

    ],
    legal: [
      { name: 'Code of Conduct', href: '/code-of-conduct' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/tech-dev-club/' },
    { name: 'Discord', icon: MessageCircle, href: 'https://discord.gg/6MVn2N9q' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/techdevclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { name: 'Email', icon: Mail, href: 'mailto:techdevclub2025@gmail.com' },
  ];

  const handleBlogSubmission = () => {
    const blogFormLink = getFormLink('blog-submission');
    window.open(blogFormLink?.url || 'https://forms.gle/EGF9bNyuznLaS8CF6', '_blank', 'noopener,noreferrer');
  };

  // SEO meta tags for footer
  const footerSeoMetadata = {
    title: "Tech Dev Club Footer - Navigation, Social Links, and Resources",
    description: "Access Tech Dev Club's navigation links, social media profiles, community resources, and important pages from our footer section.",
    keywords: "tech dev club links, developer community navigation, tech social media, coding resources, programming community links, tech events calendar, tech blog, developer projects, tech team, tech volunteers, tech speakers, tech gallery1, tech testimonials, tech spotlights, tech community groups, tech announcements, tech newsletters, tech videos, tech reports, tech sponsors, tech certification, tech mentorship, tech learning resources, tech code of conduct, tech privacy policy, tech terms of service"
  };

  return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        {/* Hidden SEO metadata */}
        <meta name="footer-title" content={footerSeoMetadata.title} />
        <meta name="footer-description" content={footerSeoMetadata.description} />
        <meta name="footer-keywords" content={footerSeoMetadata.keywords} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex flex-row items-center space-x-3 font-display font-bold text-xl text-primary-600 dark:text-primary-400 mb-4 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                <img
                    src="/logo.png"
                    alt="Tech Dev Club Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow"
                    draggable={false}
                />
                <span>Tech Dev Club</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Empowering collaboration, innovation, and growth in the global tech community.
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                      <a
                          key={social.name}
                          href={social.href}
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 transform hover:scale-110"
                          aria-label={social.name}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 lg:col-span-3 gap-8 md:gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Community
                </h3>
                <ul className="space-y-3">
                  {footerLinks.community.map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <ul className="space-y-3">
                  {footerLinks.connect.slice(0, 7).map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contribute Box */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                Contribute
              </h3>

              {/* Blog Submission Button */}
              <div className="space-y-4">
                <button
                    onClick={handleBlogSubmission}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Submit Blog Post
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Share your knowledge with our community
                </p>

                <a
                    href="https://discord.gg/6MVn2N9q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discord Server
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Join our community on Discord
                </p>

                <a
                    href="https://chat.whatsapp.com/HtpadPkjf1S44FK7sTZMu4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join WhatsApp
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Connect on WhatsApp
                </p>

                <Link
                    to="/become-sponsor"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Sponsor
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Partner with Tech Dev Club
                </p>

                <a
                    href="/files/TechDevClub-Sponsorship-Prospectus-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Sponsor Prospectus
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  View sponsorship details
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Footer Links - Additional sections that collapse on mobile */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-4 mb-8">
              <div className="hidden md:block">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Sponsors
                </h3>
                <ul className="space-y-3">
                  {footerLinks.sponsors.map((link) => (
                      <li key={link.name}>
                        {link.href.startsWith('/files') ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm flex items-center"
                          >
                            {link.name}
                            {link.name === 'Sponsor Prospectus' && <FileText className="ml-1 h-3 w-3" />}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                  ))}
                </ul>
              </div>

              <div className="hidden md:block">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Learning
                </h3>
                <ul className="space-y-3">
                  {footerLinks.learning.map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>

              <div className="hidden sm:block">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                  More Links
                </h3>
                <ul className="space-y-3">
                  {footerLinks.connect.slice(7).map((link) => (
                      <li key={link.name}>
                        <Link
                            to={link.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {currentYear} Tech Dev Club. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 md:mt-0 flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> by the community
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;