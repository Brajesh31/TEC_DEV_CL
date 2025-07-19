import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, UserPlus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Project', href: '/projects' }, // Changed from "Projects" to "Project"
    { name: 'Team', href: '/team' },
    { name: 'Volunteers', href: '/volunteers' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
      location.pathname === href || (href !== '/' && location.pathname.startsWith(href));

  // SEO meta tags for header
  const headerSeoMetadata = {
    title: "Tech Dev Club Navigation - Access Events, Projects, Team, Blog and More",
    description: "Navigate through Tech Dev Club's website to discover events, projects, team members, blog posts, and resources for developers.",
    keywords: "tech navigation, developer community menu, tech events navigation, coding resources menu, programming community links"
  };

  return (
      <>
        {/* Hidden SEO metadata */}
        <meta name="header-title" content={headerSeoMetadata.title} />
        <meta name="header-description" content={headerSeoMetadata.description} />
        <meta name="header-keywords" content={headerSeoMetadata.keywords} />
        
        <header
            className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? 'shadow-lg' : ''
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center min-h-[72px]">
              {/* Logo and Brand */}
              <Link
                  to="/"
                  className="flex items-center gap-2 sm:gap-3 font-display font-bold text-xl sm:text-2xl text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 transform hover:scale-105"
                  aria-label="Tech Dev Club Home"
              >
                <img
                    src="/logo.png"
                    alt="Tech Dev Club Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg"
                    draggable={false}
                />
                <span className="text-[20px] sm:text-[24px] md:text-[28px]">TDC</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-6 md:ml-12 lg:ml-24">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`text-base md:text-lg font-medium transition-all duration-300 relative px-1 ${
                            isActive(item.href)
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        style={{
                          background: "none",
                          borderRadius: 0,
                        }}
                    >
                      {item.name}
                      {isActive(item.href) && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full transition-transform duration-300"></span>
                      )}
                    </Link>
                ))}
              </nav>

              {/* Right side controls */}
              <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 transform hover:scale-110"
                    aria-label="Toggle theme"
                >
                  {isDark ? (
                      <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                  ) : (
                      <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Auth */}
                {user ? (
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="hidden sm:block text-base md:text-lg text-gray-700 dark:text-gray-300 font-semibold">
                        Hi, {user.name}
                      </span>
                      {isAdmin && (
                          <Link
                              to="/admin"
                              className="hidden sm:block text-base md:text-lg font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors duration-200"
                          >
                            Admin
                          </Link>
                      )}
                      <button
                          onClick={logout}
                          className="flex items-center gap-1 sm:gap-2 text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 transform hover:scale-105"
                          aria-label="Logout"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden sm:block">Logout</span>
                      </button>
                    </div>
                ) : (
                    <Link
                        to="/join"
                        className="flex items-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base md:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Join</span>
                    </Link>
                )}

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                      <X className="h-6 w-6 sm:h-7 sm:w-7 text-gray-600 dark:text-gray-400" />
                  ) : (
                      <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 animate-slide-down overflow-hidden">
                  <nav className="flex flex-col space-y-4 max-h-[70vh] overflow-y-auto">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-base sm:text-lg font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                                isActive(item.href)
                                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                          {item.name}
                        </Link>
                    ))}

                    {/* Mobile Auth Options */}
                    {user ? (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                          <div className="px-3 py-2 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Hi, {user.name}
                          </div>
                          {isAdmin && (
                              <Link
                                  to="/admin"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="px-3 py-2 text-base sm:text-lg font-medium text-accent-600 dark:text-accent-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                              >
                                Admin Dashboard
                              </Link>
                          )}
                          <button
                              onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-base sm:text-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Link
                              to="/join"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <UserPlus className="h-5 w-5" />
                            <span>Join Community</span>
                          </Link>
                        </div>
                    )}
                  </nav>
                </div>
            )}
          </div>
        </header>
      </>
  );
};

export default Header;