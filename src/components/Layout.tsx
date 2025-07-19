import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSidebar from '../components/SocialSidebar';
import { useResponsive } from '../hooks/useResponsive';

const Layout: React.FC = () => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  
  // This effect handles the browser history to ensure page refreshes work correctly
  useEffect(() => {
    // Save the current URL to localStorage when navigating
    const handleBeforeUnload = () => {
      localStorage.setItem('lastPath', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initialize currentPath if it doesn't exist
    if (!localStorage.getItem('currentPath')) {
      localStorage.setItem('currentPath', window.location.pathname);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Set page-specific SEO metadata
  useEffect(() => {
    const path = location.pathname;
    let title = 'Tech Dev Club';
    let description = 'A global community of developers focused on learning, collaboration, and career growth';
    let keywords = 'tech community, developer community, coding community, programming, software development, iit delhi, edtech, meta, google, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup, developer, engineer, open source, college students, tech club, innovation, leadership';
    
    switch (path) {
      case '/':
        title = 'Tech Dev Club - Empowering Global Developer Community';
        description = 'Join Tech Dev Club, a thriving global community of developers. Access exclusive workshops, bootcamps, mentorship programs, and networking opportunities.';
        keywords = 'developer community, programming workshops, tech events, coding bootcamp, software development, React training, AI ML courses, Web3 development, developer mentorship, tech networking, programming tutorials, coding community, iit delhi, iit bombay, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/about':
        title = 'About Tech Dev Club - Our Mission and Values';
        description = 'Learn about Tech Dev Club\'s mission to empower developers worldwide through collaboration, knowledge sharing, and community support.';
        keywords = 'tech community, developer community, coding community, tech mission, developer values, tech collaboration, programming community, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/events':
        title = 'Tech Events & Workshops - Learn from Industry Experts';
        description = 'Discover upcoming tech workshops, bootcamps, and conferences. Join our events to learn cutting-edge skills from industry experts.';
        keywords = 'tech event, developer workshops, coding bootcamp, tech conference, programming meetup, web development workshop, AI ML training, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/projects':
        title = 'Open Source Project - Collaborate with Developers';
        description = 'Explore and contribute to exciting open-source project. Find opportunities to collaborate with developers worldwide.';
        keywords = 'open source project, developer collaboration, coding project, github project, tech collaboration, programming project, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/team':
        title = 'Our Team - The People Behind Tech Dev Club';
        description = 'Meet the passionate individuals who make Tech Dev Club a thriving global community of developers.';
        keywords = 'tech team, developer community team, tech leadership, community organizers, tech mentors, developer advocates, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/blog':
        title = 'Developer Blog - Insights, Tutorials & Tech Trends';
        description = 'Read insightful articles, tutorials, and stories from our community of developers. Stay updated with the latest tech trends.';
        keywords = 'developer blog, tech articles, programming tutorials, coding tips, software development, web development, tech trends, developer community, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/resources':
        title = 'Developer Resources - Tools, Tutorials & Learning Materials';
        description = 'Access our curated collection of developer resources, including tools, tutorials, and learning materials to accelerate your growth.';
        keywords = 'developer resources, programming tools, coding tutorials, web development resources, software engineering tools, learning resources, tech tutorials, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/contact':
        title = 'Contact Tech Dev Club - Get in Touch with Our Team';
        description = 'Have questions or want to collaborate? Get in touch with the Tech Dev Club team. We\'d love to hear from you!';
        keywords = 'contact tech dev club, tech community contact, developer community support, tech collaboration, programming community contact, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      case '/join':
        title = 'Join Tech Dev Club - Become Part of Our Developer Community';
        description = 'Join our global community of developers. Access exclusive events, mentorship, and networking opportunities to accelerate your tech career.';
        keywords = 'join tech community, developer membership, coding community, tech networking, programming community, developer events, tech mentorship, iit delhi, edtech, meta, google, facebook, instagram, coursera, udemy, openai, chatgpt, ai, ml, data science, python, javascript, java, c++, nodejs, react, coding, hackathon, startup';
        break;
      default:
        // Keep defaults for other pages
    }
    
    // Update document title and meta description
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update Open Graph and Twitter meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://techdevclub.com${path}`);
    }
    
    // IMPORTANT: Only scroll to top when changing pages, not on the same page
    // This prevents the auto-scrolling issue on the home page
    const previousPath = localStorage.getItem('currentPath');
    if (path !== previousPath) {
      window.scrollTo(0, 0);
      localStorage.setItem('currentPath', path);
    }
  }, [location]);

  // SEO meta tags for layout
  const layoutSeoMetadata = {
    title: "Tech Dev Club Layout - Website Structure and Navigation",
    description: "The main layout structure of Tech Dev Club website, featuring header navigation, main content area, and footer with important links.",
    keywords: "tech website layout, developer site structure, coding community navigation, programming website design, tech community UI"
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Hidden SEO metadata */}
      <meta name="layout-title" content={layoutSeoMetadata.title} />
      <meta name="layout-description" content={layoutSeoMetadata.description} />
      <meta name="layout-keywords" content={layoutSeoMetadata.keywords} />
      
      <Header />
      
      {/* Social Sidebar - Fixed on all pages, but only on desktop */}
      {!isMobile && <SocialSidebar />}
      
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;