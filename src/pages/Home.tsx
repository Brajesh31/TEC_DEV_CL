import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Star, Zap, Users, Calendar, ExternalLink, ChevronRight, ChevronLeft, Heart, Award, Briefcase, Globe, MessageCircle } from 'lucide-react';
import CommunityJoinSection from '../components/CommunityJoinSection';
import MobileSocialBar from '../components/MobileSocialBar';
import { useSEO } from '../hooks/useSEO';

// Import data
import { getEvents, getFeaturedEvents } from '../utils/dataLoader';
import EventCard from '../components/EventCard';

const Home: React.FC = () => {
  // Set SEO metadata
  useSEO({
    title: 'Tech Dev Club - Empowering Global Developer Community',
    description: 'Join Tech Dev Club, a thriving global community of 10,000+ developers. Access exclusive workshops, bootcamps, mentorship programs, and networking opportunities. Learn React, AI/ML, Web3, and more from industry experts.',
    keywords: 'developer community, programming workshops, tech events, coding bootcamp, software development, React training, AI ML courses, Web3 development, developer mentorship, tech networking, programming tutorials, coding community, iit delhi, iit bombay, iit madras, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup, developer, engineer, tech community, open source, college students, tech club, innovation, leadership, soft skills, full stack, backend, frontend, cloud, internships, women in tech, campus',
    structuredData: {
      type: 'Organization',
      data: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tech Dev Club',
        description: 'A global community of developers focused on learning, collaboration, and career growth',
        url: 'https://techdevclub.com',
        logo: 'https://techdevclub.com/logo.png',
        foundingDate: '2023',
        sameAs: [
          'https://github.com/techdevclub',
          'https://www.linkedin.com/company/tech-dev-club/',
          'https://discord.gg/6MVn2N9q',
          'https://www.instagram.com/techdevclub'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'techdevclub2025@gmail.com',
          contactType: 'customer service'
        },
        event: [
          {
            '@type': 'Event',
            name: 'TechFront AI and Blockchain',
            startDate: '2025-07-12T10:00:00+05:30',
            endDate: '2025-07-12T18:00:00+05:30',
            location: {
              '@type': 'Place',
              name: 'R&I Park',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                addressCountry: 'India'
              }
            },
            description: "Flagship AI & Blockchain Conference featuring visionary talks, hands-on workshops, and India's brightest tech minds.",
            image: 'https://techdevclub.com/event/techfront-banner.jpg',
            offers: {
              '@type': 'Offer',
              url: 'https://docs.google.com/forms/d/e/1FAIpQLSf7dp43vufUTABJyHaR8vwtMjDUVMT_iESb9tkFaNtFKaVNCw/viewform',
              price: '299',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock'
            }
          }
        ]
      }
    }
  });

  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Get events from data loader
  const upcomingEvents = getEvents().filter(event => event.isUpcoming);
  const featuredEvents = getFeaturedEvents();

  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: 'Community Platform',
      description: 'Open-source platform for developer communities',
      image: '/projects/Community Platform/tech_dev_club.png',
      tech: ['React', 'Node.js', 'MongoDB'],
      stars: 234,
      contributors: 12,
      category: 'Web App',
    },
    {
      id: 2,
      title: 'Learning Tracker',
      description: 'Track your coding progress and achievements',
      image: '/projects/Community Platform/tech_dev_club_2.png',
      tech: ['Vue.js', 'Firebase', 'Tailwind'],
      stars: 156,
      contributors: 8,
      category: 'Education',
    },
    {
      id: 3,
      title: 'Code Review Bot',
      description: 'AI-powered code review automation',
      image: '/projects/Community Platform/tech_dev_club.png',
      tech: ['Python', 'ML', 'GitHub API'],
      stars: 89,
      contributors: 5,
      category: 'AI Tool',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Brajesh Kumar',
      role: 'Full Stack Developer',
      content: 'Tech Dev Club transformed my career. The mentorship and project collaboration opportunities are incredible. I\'ve grown both technically and professionally since joining this community.',
      avatar: '/core/brajesh-kumar.jpg',
    },
    {
      id: 2,
      name: 'Vani Sen',
      role: 'Graphic Designer',
      content: 'The community here is amazing. I\'ve learned more in 6 months than I did in years of solo learning. The workshops and networking events have opened so many doors for me.',
      avatar: '/core/vani_community_manager.jpg',
    },
    {
      id: 3,
      name: 'Kumar Gaurav Tiwari',
      role: 'Frontend Engineer',
      content: 'From junior to senior developer - the growth opportunities and support here are unmatched. The mentors are incredibly knowledgeable and always willing to help.',
      avatar: '/core/kumar-gaurav-tiwari-founder.jpg',
    },
  ];

  // Sponsors data
  const sponsors = [
    { name: 'Devnovate', logo: '/sponsor/devnovate-logo.jpg' },
    { name: 'TruScholar', logo: '/sponsor/truscholar-logo.png' },
    { name: 'Physics Wallah', logo: '/sponsor/pw-logo.png' },
    { name: 'Devnovate', logo: '/sponsor/devnovate-logo.jpg' },
    // Add more sponsors as needed
  ];


  // Community metrics - UPDATED as requested
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

  // Next/prev testimonial handlers
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials - REMOVED to prevent auto-scrolling
  // Now testimonials will only change when user clicks the navigation buttons

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Bold, Gradient Background with Animated Text */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-slide-up">
              A Global Community of <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Problem Solvers</span>
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

      {/* Upcoming Events Section - Dynamic Event Cards */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Upcoming Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                Join our workshops, bootcamps, and conferences to level up your skills and connect with industry experts
              </p>
            </div>
            <Link to="/events" className="mt-4 md:mt-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center group">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Event Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 3).map((event) =>
                    event.title === 'TechFront AI and Blockchain' ? (
                        <Link
                            key={event.id}
                            to="/TechFrontPage.tsx"
                            className="block"
                            style={{ textDecoration: 'none' }}
                        >
                          <EventCard event={event} />
                        </Link>
                    ) : (
                        <EventCard key={event.id} event={event} />
                    )
                )
            )  : (
              <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check back soon for new events or subscribe to our newsletter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Modern Card Layout */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary-200/20 dark:bg-secondary-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Featured Project
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                Discover innovative open-source projects built by our community members
              </p>
            </div>
            <Link to="/projects" className="mt-4 md:mt-0 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center group">
              Explore All Project
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Project Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col"
              >
                {/* Project Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">{project.stars}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white dark:border-gray-900"
                        ></div>
                      ))}
                      {project.contributors > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400">+{project.contributors - 3}</span>
                        </div>
                      )}
                    </div>
                    <Link 
                      to="/projects" 
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
                    >
                      View Project
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey/Timeline Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to a thriving global community
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 md:transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-6 h-6 rounded-full bg-primary-600 border-4 border-white dark:border-gray-900 md:transform md:-translate-x-1/2 z-10"></div>
                  
                  <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className="pl-10 md:pl-0 md:w-1/2 md:pr-12 md:text-right">
                      <div className="bg-primary-600 text-white inline-block px-4 py-2 rounded-lg font-bold text-xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                    </div>
                    
                    <div className="pl-10 md:pl-0 md:w-1/2 md:pl-12">
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/testimonials-pattern.svg')] opacity-5"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Community Voices
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Hear from our members about their experiences and success stories
            </p>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 sm:p-10">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-20 h-20 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 ring-4 ring-white/20"
                        />
                        <div>
                          <blockquote className="text-lg sm:text-xl mb-4 italic">
                            "{testimonial.content}"
                          </blockquote>
                          <div className="font-semibold text-lg">{testimonial.name}</div>
                          <div className="text-blue-300">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                to="/testimonials" 
                className="inline-flex items-center text-blue-200 hover:text-white font-medium transition-colors"
              >
                Read More Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Partners & Sponsors
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Collaborating with industry leaders to empower our community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.name}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center h-32 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
            
            {/* Placeholder sponsors if needed */}
            {sponsors.length < 4 && Array(4 - sponsors.length).fill(0).map((_, i) => (
              <div 
                key={`placeholder-${i}`}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex items-center justify-center h-32 w-full"
              >
                <div className="text-gray-400 dark:text-gray-600 font-medium">Your Logo Here</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/become-sponsor" 
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
            >
              <Heart className="mr-2 h-5 w-5" />
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer Section - Icon Grid */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              What We Offer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Resources and opportunities to accelerate your growth as a developer
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Tech Events & Workshops',
                description: 'Attend workshops, bootcamps, and conferences led by industry experts',
                link: '/events'
              },
              {
                icon: Users,
                title: 'Mentorship Program',
                description: 'Get guidance from experienced professionals in your field of interest',
                link: '/mentorship'
              },
              {
                icon: Code,
                title: 'Open Source Projects',
                description: 'Contribute to meaningful projects and build your portfolio',
                link: '/projects'
              },
              {
                icon: MessageCircle,
                title: 'Community Forums',
                description: 'Connect with peers, ask questions, and share knowledge',
                link: '/join'
              },
              {
                icon: Award,
                title: 'Certification Programs',
                description: 'Validate your skills with industry-recognized certifications',
                link: '/certification'
              },
              {
                icon: Briefcase,
                title: 'Career Opportunities',
                description: 'Access job postings, internships, and networking events',
                link: '/resources'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col h-full"
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  <Link 
                    to={item.link}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center mt-auto"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Join Section - From Component */}
      <CommunityJoinSection />
      
      {/* Mobile Social Bar */}
      <MobileSocialBar />
    </div>
  );
};

export default Home;