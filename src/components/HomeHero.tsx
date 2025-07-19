import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Star, Zap, Users, Calendar, Award, Briefcase, Globe, Heart } from 'lucide-react';

const HomeHero: React.FC = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const textArray = [
    'Developers',
    'Innovators',
    'Problem Solvers',
    'Creators',
    'Collaborators'
  ];

  // Community metrics with icons - UPDATED as requested
  const metrics = [
    { label: 'Members', value: '1000+', icon: Users },
    { label: 'States', value: '20+', icon: Globe },
    { label: 'Events', value: '1+', icon: Calendar },
    { label: 'Projects', value: '5+', icon: Code },
    { label: 'Mentors', value: '4+', icon: Briefcase },
    { label: 'Partners', value: '3+', icon: Heart },
  ];

  // Journey milestones - UPDATED to start from May 2025
  const milestones = [
    { year: 'May 2025', title: 'Foundation', description: 'Tech Dev Club was founded with a vision to unite technology enthusiasts worldwide.' },
    { year: 'June 2025', title: 'Growth', description: 'Expanded to 1,000+ members across 20+ states, establishing local chapters.' },
    { year: 'July 2025', title: 'Impact', description: 'Launched comprehensive mentorship, certification, and project incubation programs.' },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current text being typed
      const currentText = textArray[textIndex];
      
      // If deleting, remove a character
      if (isDeleting) {
        setAnimatedText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setTypingSpeed(80); // Faster when deleting
      } 
      // If typing, add a character
      else {
        setAnimatedText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setTypingSpeed(150); // Normal typing speed
      }
      
      // If completed typing the word
      if (!isDeleting && charIndex === currentText.length) {
        setTypingSpeed(2000); // Pause at the end of the word
        setIsDeleting(true);
      } 
      // If completed deleting the word
      else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % textArray.length);
        setTypingSpeed(500); // Pause before typing the next word
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [animatedText, charIndex, isDeleting, textIndex, textArray, typingSpeed]);

  // SEO meta tags for home hero section
  const heroSeoMetadata = {
    title: "Tech Dev Club Hero - Join Our Global Developer Community",
    description: "Join Tech Dev Club, a thriving global community of developers. Connect, learn, and innovate with 1000+ developers worldwide.",
    keywords: "tech community hero, developer community join, coding community welcome, programming community metrics, tech dev club stats, developer collaboration, tech innovation, coding network"
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Hidden SEO metadata */}
      <meta name="hero-title" content={heroSeoMetadata.title} />
      <meta name="hero-description" content={heroSeoMetadata.description} />
      <meta name="hero-keywords" content={heroSeoMetadata.keywords} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Floating icons - visible on larger screens */}
      <div className="absolute top-1/4 left-1/6 text-white/10 animate-float hidden md:block" style={{ animationDelay: '0.5s' }}>
        <Code className="h-16 w-16" />
      </div>
      <div className="absolute top-1/3 right-1/6 text-white/10 animate-float hidden md:block" style={{ animationDelay: '1.5s' }}>
        <Star className="h-12 w-12" />
      </div>
      <div className="absolute bottom-1/4 left-1/5 text-white/10 animate-float hidden md:block" style={{ animationDelay: '2.5s' }}>
        <Zap className="h-14 w-14" />
      </div>
      <div className="absolute bottom-1/3 right-1/5 text-white/10 animate-float hidden md:block" style={{ animationDelay: '3.5s' }}>
        <Users className="h-10 w-10" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-up">
            A Global Community of <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              {animatedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-10 animate-slide-up animation-delay-200">
            Connect, Learn, and Innovate with 1000+ Developers Worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <Link to="/join" className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/events" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center">
              Explore Events
            </Link>
          </div>
        </div>

        {/* Interactive Stats Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto animate-slide-up animation-delay-600">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <Icon className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs text-blue-200">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="currentColor" 
            className="text-white dark:text-gray-900"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HomeHero;